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

    // Database logging disabled until generations table is created
    // TODO: Create 'generations' table in Supabase and regenerate types

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
    
    // TODO: Log successful generation to database

    return NextResponse.json({
      success: true,
      generatedImageUrl,
      processingTime,
      message: 'Design generated successfully!'
    });

  } catch (error: any) {
    console.error('Generation error:', error);

    // TODO: Log failed generation to database

    return NextResponse.json(
      { success: false, error: error.message || 'Failed to generate design. Please try again.' },
      { status: 500 }
    );
  }
}
