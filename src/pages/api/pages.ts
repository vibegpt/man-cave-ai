import type { NextApiRequest, NextApiResponse } from 'next'
import { supabaseAdmin } from '../../lib/supabase'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req

  switch (method) {
    case 'GET':
      return handleGet(req, res)
    case 'POST':
      return handlePost(req, res)
    case 'PUT':
      return handlePut(req, res)
    case 'DELETE':
      return handleDelete(req, res)
    default:
      return res.status(405).json({ error: 'Method not allowed' })
  }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { slug, published, category, limit = 50, offset = 0 } = req.query

    let query = supabaseAdmin.from('seo_pages').select('*')

    if (slug) {
      const slugStr = Array.isArray(slug) ? slug[0] : slug
      query = query.eq('slug', slugStr)
    }
    if (published !== undefined) {
      const publishedStr = Array.isArray(published) ? published[0] : published
      query = query.eq('published', publishedStr === 'true')
    }
    if (category) {
      const categoryStr = Array.isArray(category) ? category[0] : category
      query = query.eq('category', categoryStr)
    }

    query = query
      .order('created_at', { ascending: false })
      .range(Number(offset), Number(offset) + Number(limit) - 1)

    const { data, error } = await query

    if (error) {
      return res.status(500).json({ error: error.message })
    }

    res.status(200).json({ pages: data })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { data, error } = await supabaseAdmin
      .from('seo_pages')
      .insert(req.body)
      .select()
      .single()

    if (error) {
      return res.status(500).json({ error: error.message })
    }

    res.status(201).json({ page: data })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

async function handlePut(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query

    if (!id) {
      return res.status(400).json({ error: 'ID is required' })
    }

    const idStr = Array.isArray(id) ? id[0] : id

    const { data, error } = await supabaseAdmin
      .from('seo_pages')
      .update(req.body)
      .eq('id', idStr)
      .select()
      .single()

    if (error) {
      return res.status(500).json({ error: error.message })
    }

    res.status(200).json({ page: data })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query

    if (!id) {
      return res.status(400).json({ error: 'ID is required' })
    }

    const idStr = Array.isArray(id) ? id[0] : id

    const { error } = await supabaseAdmin
      .from('seo_pages')
      .delete()
      .eq('id', idStr)

    if (error) {
      return res.status(500).json({ error: error.message })
    }

    res.status(200).json({ success: true })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}
