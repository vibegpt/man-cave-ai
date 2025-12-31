import type { NextApiRequest, NextApiResponse } from 'next';
import { GoogleGenAI } from '@google/genai';
import { buildManCavePrompt } from '../../lib/ManCavePromptBuilder';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { imageBase64, styleId, customDescription } = req.body;

    if (!imageBase64 || !styleId) {
      return res.status(400).json({ success: false, error: 'Image and style required' });
    }

    if (!process.env.GOOGLE_API_KEY) {
      return res.status(500).json({ success: false, error: 'Google API key not configured' });
    }

    // Initialize Nano Banana (Google GenAI)
    const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

    // Build prompt based on style
    const prompt = buildManCavePrompt(styleId, customDescription);
    console.log('Generated prompt:', prompt);

    // Strip base64 prefix if present (data:image/jpeg;base64,...)
    const base64Data = imageBase64.includes(',')
      ? imageBase64.split(',')[1]
      : imageBase64;

    console.log('Image data length:', base64Data.length);
    console.log('API Key present:', !!process.env.GOOGLE_API_KEY);

    // Call Nano Banana Pro (Gemini 3 Pro Image Preview)
    console.log('Calling Nano Banana with model: gemini-3-pro-image-preview');

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: [
        {
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType: 'image/jpeg',
                data: base64Data
              }
            }
          ]
        }
      ],
      config: {
        // Required to get an image back!
        responseModalities: ['TEXT', 'IMAGE'],
        temperature: 1.0,
        topP: 0.95,
        topK: 40,
      }
    });

    console.log('Nano Banana response received');

    // Extract generated image from response
    const generatedPart = response.candidates?.[0]?.content?.parts?.find(
      (part: any) => part.inlineData
    );

    if (!generatedPart?.inlineData?.data) {
      console.error('No image in response:', JSON.stringify(response, null, 2));
      return res.status(500).json({
        success: false,
        error: 'No image returned from Nano Banana API',
        details: 'The model may have returned text only. Ensure responseModalities includes IMAGE.'
      });
    }

    // Return as base64 data URL
    const generatedImageUrl = `data:${generatedPart.inlineData.mimeType};base64,${generatedPart.inlineData.data}`;

    console.log('Successfully generated man cave image with Nano Banana');

    res.status(200).json({
      success: true,
      generatedImageUrl,
      message: 'Generated with Nano Banana Pro (Gemini 3 Pro Image Preview)',
    });

  } catch (error: any) {
    console.error('=== NANO BANANA API ERROR ===');
    console.error('Error:', error);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    console.error('=============================');

    res.status(500).json({
      success: false,
      error: 'Generation failed',
      details: error.message,
    });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};
