import type { NextApiRequest, NextApiResponse } from 'next'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { supabaseAdmin } from '../../lib/supabase'
import type { SEOPageInsert, ContentGenerationInsert } from '../../types/supabase'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { keyword, category } = req.body

    if (!keyword) {
      return res.status(400).json({ error: 'Keyword is required' })
    }

    console.log(`Generating content for keyword: ${keyword}`)

    // Create prompt for content generation
    const prompt = `You are an expert SEO content writer specializing in man cave design and decor.

Write a comprehensive, SEO-optimized article about "${keyword}".

The article should:
1. Be 1000-1500 words
2. Include practical tips and ideas
3. Be engaging and informative
4. Target homeowners looking to create or improve their man cave
5. Include relevant product recommendations naturally
6. Be formatted in HTML with proper headings (h2, h3), paragraphs, and lists

Format the response as JSON with these fields:
- title: SEO-optimized title (50-60 characters)
- meta_description: Meta description (150-160 characters)
- h1: Main H1 heading
- content: Full HTML content with h2, h3 headings, paragraphs, and lists
- keywords: Array of 5-7 relevant keywords

Return only valid JSON, no additional text.`

    const startTime = Date.now()

    // Generate content using Google AI (Nano Banana - Gemini 3 Pro)
    const model = genAI.getGenerativeModel({ model: 'gemini-3-pro' })
    const result = await model.generateContent(prompt)
    const response = result.response
    const text = response.text()

    const generationTime = Date.now() - startTime

    // Parse the JSON response
    let generatedData
    try {
      // Extract JSON from markdown code blocks if present
      const jsonMatch = text.match(/```json\n?([\s\S]*?)\n?```/) || text.match(/\{[\s\S]*\}/)
      const jsonText = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : text
      generatedData = JSON.parse(jsonText)
    } catch (parseError) {
      console.error('Failed to parse AI response as JSON:', text)
      return res.status(500).json({
        error: 'Failed to parse AI response',
        details: text.substring(0, 500)
      })
    }

    // Create slug from keyword
    const slug = keyword.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

    // Save to database
    const seoPage: SEOPageInsert = {
      slug,
      title: generatedData.title,
      meta_description: generatedData.meta_description,
      h1: generatedData.h1,
      content: generatedData.content,
      keywords: generatedData.keywords,
      category: category || 'general',
      published: false
    }

    const { data: page, error: pageError } = await supabaseAdmin
      .from('seo_pages')
      .insert(seoPage)
      .select()
      .single()

    if (pageError) {
      console.error('Error saving page:', pageError)
      return res.status(500).json({ error: 'Failed to save page', details: pageError.message })
    }

    // Save generation record
    const contentGen: ContentGenerationInsert = {
      page_id: (page as any).id,
      prompt,
      generated_content: text,
      model_used: 'gemini-3-pro',
      version: 1,
      generation_time: generationTime,
      status: 'completed',
      metadata: {
        keyword,
        category
      }
    }

    await supabaseAdmin
      .from('content_generations')
      .insert(contentGen)

    res.status(200).json({
      success: true,
      page,
      generationTime
    })

  } catch (error: any) {
    console.error('Generation error:', error)
    res.status(500).json({
      error: 'Failed to generate content',
      details: error.message
    })
  }
}
