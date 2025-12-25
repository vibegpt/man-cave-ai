import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mwmvkfgxpmxivgbqvvpw.supabase.co'
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'sb_secret_kxETT_68ZkwkkejKm7OZ2g_lD0kpg6H'

const supabase = createClient(supabaseUrl, supabaseKey)

console.log('📊 Starting keyword import from CSV...\n')

// Read CSV file
const csvPath = join(__dirname, '../data/keyword_mapping.csv')
const csvContent = readFileSync(csvPath, 'utf-8')

// Parse CSV (simple parser for this specific format)
const lines = csvContent.split('\n')
const headers = lines[0].split(',')

let imported = 0
let errors = 0
const batchSize = 100
let batch = []

for (let i = 1; i < lines.length; i++) {
  const line = lines[i].trim()
  if (!line) continue

  try {
    // Parse CSV line (handling quotes)
    const values = []
    let current = ''
    let inQuotes = false

    for (let char of line) {
      if (char === '"') {
        inQuotes = !inQuotes
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim())
        current = ''
      } else {
        current += char
      }
    }
    values.push(current.trim())

    const keyword = values[0]
    const intent = values[1]
    const volume = parseInt(values[2]) || 0
    const difficulty = parseInt(values[4]) || 0
    const cpc = parseFloat(values[5]) || 0
    const competitiveDensity = parseFloat(values[6]) || 0

    // Determine category from keyword
    let category = 'general'
    if (keyword.includes('basement')) category = 'location'
    else if (keyword.includes('garage')) category = 'location'
    else if (keyword.includes('shed')) category = 'location'
    else if (keyword.includes('bar')) category = 'feature'
    else if (keyword.includes('golf')) category = 'feature'
    else if (keyword.includes('storage')) category = 'feature'
    else if (keyword.includes('decor') || keyword.includes('sign')) category = 'decor'
    else if (keyword.includes('furniture')) category = 'furniture'

    // Determine priority based on volume and difficulty
    let priority = 0
    if (volume > 500 && difficulty < 20) priority = 10
    else if (volume > 300 && difficulty < 25) priority = 8
    else if (volume > 150 && difficulty < 30) priority = 6
    else if (volume > 100) priority = 4
    else priority = 2

    batch.push({
      keyword,
      search_volume: volume,
      difficulty,
      category,
      priority,
      status: 'pending',
      notes: `Intent: ${intent} | CPC: $${cpc} | Density: ${competitiveDensity}`
    })

    // Insert batch when it reaches batchSize
    if (batch.length >= batchSize) {
      const { data, error } = await supabase
        .from('keywords')
        .upsert(batch, { onConflict: 'keyword' })

      if (error) {
        console.error(`❌ Error inserting batch: ${error.message}`)
        errors += batch.length
      } else {
        imported += batch.length
        console.log(`✅ Imported ${imported} keywords...`)
      }
      batch = []
    }
  } catch (err) {
    console.error(`Error parsing line ${i}: ${err.message}`)
    errors++
  }
}

// Insert remaining batch
if (batch.length > 0) {
  const { data, error } = await supabase
    .from('keywords')
    .upsert(batch, { onConflict: 'keyword' })

  if (error) {
    console.error(`❌ Error inserting final batch: ${error.message}`)
    errors += batch.length
  } else {
    imported += batch.length
  }
}

console.log(`\n✨ Import complete!`)
console.log(`   Imported: ${imported} keywords`)
if (errors > 0) {
  console.log(`   Errors: ${errors}`)
}
