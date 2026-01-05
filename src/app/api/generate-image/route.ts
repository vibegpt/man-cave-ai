import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { buildManCavePrompt } from '@/lib/ManCavePromptBuilder';
import { supabaseAdmin } from '@/lib/supabase';
import type { ImageGenerationInsert } from '@/types/supabase';

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY || '' });

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  let generationId: string | null = null;

  // Get request metadata
  const ipAddress = request.headers.get('x-forwarded-for')?.split(',')[0] || 
                    request.headers.get('x-real-ip') || 
                    'anonymous';
  const userAgent = request.headers.get('user-agent') || 'unknown';

  try {
    const body = await request.json();
    const { imageBase64, styleId, customDescription, sessionId } = body;

    if (!imageBase64 || !styleId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: imageBase64 and styleId' },
        { status: 400 }
      );
    }

    const prompt = buildManCavePrompt(styleId, customDescription);

    // Log generation start to database
    const generationRecord: ImageGenerationInsert = {
      session_id: sessionId || null,
      style: styleId,
      custom_description: customDescription || null,
      status: 'pending',
      ip_address: ipAddress,
      user_agent: userAgent,
    };

    const { data: genData, error: insertError } = await supabaseAdmin
      .from('image_generations')
      .insert(generationRecord)
      .select('id')
      .single();

    if (!insertError && genData) {
      generationId = genData.id;
    }

    // Prepare image data
    const base64Data = imageBase64.includes(',')
      ? imageBase64.split(',')[1]
      : imageBase64;

    // Generate with Gemini
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

    // Update generation record with success
    if (generationId) {
      await supabaseAdmin
        .from('image_generations')
        .update({
          status: 'completed',
          processing_time: processingTime,
        })
        .eq('id', generationId);
    }

    return NextResponse.json({
      success: true,
      generatedImageUrl,
      processingTime,
      generationId,
      message: 'Design generated successfully!'
    });

  } catch (error: any) {
    console.error('Generation error:', error);
    const processingTime = Date.now() - startTime;

    // Update generation record with failure
    if (generationId) {
      await supabaseAdmin
        .from('image_generations')
        .update({
          status: 'failed',
          processing_time: processingTime,
          error_message: error.message || 'Unknown error',
        })
        .eq('id', generationId);
    }

    return NextResponse.json(
      { success: false, error: error.message || 'Failed to generate design. Please try again.' },
      { status: 500 }
    );
  }
}
