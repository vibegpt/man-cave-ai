import { GoogleGenerativeAI } from '@google/generative-ai'
import { createClient } from '@supabase/supabase-js'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '')
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mwmvkfgxpmxivgbqvvpw.supabase.co'
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'sb_secret_kxETT_68ZkwkkejKm7OZ2g_lD0kpg6H'
const supabase = createClient(supabaseUrl, supabaseKey)

async function generateContent(keyword, category = 'general') {
  console.log(`\n🚀 Generating content for: "${keyword}"`)
  console.log(`📁 Category: ${category}\n`)

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

  try {
    // Generate content using Google AI
    console.log('🤖 Calling Google AI...')
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
    const result = await model.generateContent(prompt)
    const response = result.response
    const text = response.text()

    const generationTime = Date.now() - startTime
    console.log(`⏱️  Generation time: ${generationTime}ms\n`)

    // Parse the JSON response
    let generatedData
    try {
      const jsonMatch = text.match(/```json\n?([\s\S]*?)\n?```/) || text.match(/\{[\s\S]*\}/)
      const jsonText = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : text
      generatedData = JSON.parse(jsonText)
    } catch (parseError) {
      console.error('❌ Failed to parse AI response as JSON')
      console.log('Response preview:', text.substring(0, 500))
      throw parseError
    }

    // Create slug from keyword
    const slug = keyword.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

    console.log(`📝 Saving to database...`)
    console.log(`   Slug: ${slug}`)
    console.log(`   Title: ${generatedData.title}`)

    // Save page to database
    const { data: page, error: pageError } = await supabase
      .from('seo_pages')
      .insert({
        slug,
        title: generatedData.title,
        meta_description: generatedData.meta_description,
        h1: generatedData.h1,
        content: generatedData.content,
        keywords: generatedData.keywords,
        category,
        published: false
      })
      .select()
      .single()

    if (pageError) {
      console.error('❌ Error saving page:', pageError.message)
      throw pageError
    }

    // Save generation record
    await supabase
      .from('content_generations')
      .insert({
        page_id: page.id,
        prompt,
        generated_content: text,
        model_used: 'gemini-pro',
        version: 1,
        generation_time: generationTime,
        status: 'completed',
        metadata: { keyword, category }
      })

    console.log(`\n✅ Successfully generated and saved content!`)
    console.log(`   Page ID: ${page.id}`)
    console.log(`   View at: /${slug}`)
    console.log(`   Word count: ${generatedData.content.split(/\s+/).length}`)

    return page

  } catch (error) {
    console.error('\n❌ Error:', error.message)
    throw error
  }
}

// Get keyword from command line argument
const keyword = process.argv[2]
const category = process.argv[3] || 'general'

if (!keyword) {
  console.log('Usage: node scripts/generate-content.mjs "keyword" [category]')
  console.log('Example: node scripts/generate-content.mjs "man cave bar" "feature"')
  process.exit(1)
}

generateContent(keyword, category)
  .then(() => {
    console.log('\n🎉 Done!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n💥 Failed:', error)
    process.exit(1)
  })
