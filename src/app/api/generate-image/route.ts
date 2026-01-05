import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { buildManCavePrompt } from '@/lib/ManCavePromptBuilder';
import { supabaseAdmin } from '@/lib/supabase';

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY || '' });

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

    const base64Data = imageBase64.includes(',')
      ? imageBase64.split(',')[1]
      : imageBase64;

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp',
      contents: [
        { text: prompt },
        {
          inlineData: {
            mimeType: 'image/jpeg',
            data: base64Data
          }
        }
      ],
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      }
    });

    const generatedPart = response.candidates?.[0]?.content?.parts?.find(
      (part: any) => part.inlineData
    );

    if (!generatedPart?.inlineData?.data) {
      throw new Error('No image generated in response');
    }

    const generatedImageUrl = `data:${generatedPart.inlineData.mimeType};base64,${generatedPart.inlineData.data}`;

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
