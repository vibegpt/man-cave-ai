import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (!process.env.GOOGLE_API_KEY) {
      return res.status(500).json({ error: 'No API key' });
    }

    // Test 1: Simple text-only image generation
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': process.env.GOOGLE_API_KEY,
      },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: 'A simple red circle on white background' }
          ]
        }]
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        test: 'text-only generation',
        success: false,
        status: response.status,
        error: data,
      });
    }

    return res.status(200).json({
      test: 'text-only generation',
      success: true,
      message: 'API key works! Image generation is available.',
      hasImage: !!data.candidates?.[0]?.content?.parts?.find((p: any) => p.inline_data),
    });

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}
