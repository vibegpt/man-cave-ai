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
    const { category, status, priority_min, limit = 100, offset = 0 } = req.query

    let query = supabaseAdmin.from('keywords').select('*')

    if (category) {
      query = query.eq('category', category)
    }
    if (status) {
      query = query.eq('status', status)
    }
    if (priority_min) {
      query = query.gte('priority', Number(priority_min))
    }

    query = query
      .order('priority', { ascending: false })
      .order('search_volume', { ascending: false })
      .range(Number(offset), Number(offset) + Number(limit) - 1)

    const { data, error } = await query

    if (error) {
      return res.status(500).json({ error: error.message })
    }

    res.status(200).json({ keywords: data })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { data, error } = await supabaseAdmin
      .from('keywords')
      .insert(req.body)
      .select()
      .single()

    if (error) {
      return res.status(500).json({ error: error.message })
    }

    res.status(201).json({ keyword: data })
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

    const { data, error } = await supabaseAdmin
      .from('keywords')
      .update(req.body)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      return res.status(500).json({ error: error.message })
    }

    res.status(200).json({ keyword: data })
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

    const { error } = await supabaseAdmin
      .from('keywords')
      .delete()
      .eq('id', id)

    if (error) {
      return res.status(500).json({ error: error.message })
    }

    res.status(200).json({ success: true })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}
