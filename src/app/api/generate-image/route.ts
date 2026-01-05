import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/genai';
import { buildManCavePrompt } from '@/lib/ManCavePromptBuilder';
import { supabaseAdmin } from '@/lib/supabase';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  let generationId: string | null = null;

  const ipAddress = request.headers.get('x-forwarded-for') || 
                    request.headers.get('x-real-ip') || 
                    'anonymous';

  try {
    const body = await request.json();
    const { imageBase64, styleId, customDescription } = body;

    if (!imageBase64 || !styleId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: imageBase64 and styleId' },
        { status: 400 }
      );
    }

    const prompt = buildManCavePrompt(styleId, customDescription);

    try {
      const { data: generation, error: insertError } = await supabaseAdmin
        .from('generations')
        .insert({
          user_id: null,
          project_id: null,
          style: styleId,
          prompt_used: prompt,
          status: 'processing',
          ip_address: ipAddress,
          started_at: new Date().toISOString(),
          model_version: 'gemini-2.0-flash-exp'
        })
        .select()
        .single();

      if (!insertError && generation) {
        generationId = generation.id;
      }
    } catch (dbError) {
      console.error('Database logging error:', dbError);
    }

    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.0-flash-exp',
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 8192,
        responseModalities: ['TEXT', 'IMAGE'],
      }
    });

    const imageData = imageBase64.replace(/^data:image\/\w+;base64,/, '');
    
    const result = await model.generateContent([
      {
        inlineData: {
          data: imageData,
          mimeType: 'image/jpeg'
        }
      },
      { text: prompt }
    ]);

    const response = await result.response;
    
    let generatedImageUrl: string | null = null;
    
    if (response.candidates && response.candidates.length > 0) {
      const candidate = response.candidates[0];
      
      if (candidate.content && candidate.content.parts) {
        for (const part of candidate.content.parts) {
          if (part.inlineData && part.inlineData.mimeType?.startsWith('image/')) {
            generatedImageUrl = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
            break;
          }
        }
      }
    }

    if (!generatedImageUrl) {
      throw new Error('No image generated in response');
    }

    const processingTime = Date.now() - startTime;
    
    if (generationId) {
      await supabaseAdmin
        .from('generations')
        .update({
          status: 'completed',
          generated_image_url: 'base64_image',
          completed_at: new Date().toISOString(),
          processing_time_ms: processingTime,
          generation_time: Math.round(processingTime / 1000)
        })
        .eq('id', generationId);
    }

    return NextResponse.json({
      success: true,
      generatedImageUrl,
      processingTime,
      message: 'Design generated successfully!'
    });

  } catch (error: any) {
    console.error('Generation error:', error);

    if (generationId) {
      await supabaseAdmin
        .from('generations')
        .update({
          status: 'failed',
          error_message: error.message || 'Unknown error',
          error_type: error.name || 'UnknownError',
          failed_at: new Date().toISOString(),
          processing_time_ms: Date.now() - startTime
        })
        .eq('id', generationId);
    }

    return NextResponse.json(
      { success: false, error: error.message || 'Failed to generate design. Please try again.' },
      { status: 500 }
    );
  }
}
