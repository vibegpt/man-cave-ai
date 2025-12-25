import pg from 'pg'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const { Client } = pg

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:Trademe%2054%21%21@db.mwmvkfgxpmxivgbqvvpw.supabase.co:5432/postgres'

console.log('📊 Starting keyword import from CSV using PostgreSQL...\n')

const client = new Client({ connectionString })

try {
  await client.connect()
  console.log('✅ Connected to database\n')

  // Read CSV file
  const csvPath = join(__dirname, '../data/keyword_mapping.csv')
  const csvContent = readFileSync(csvPath, 'utf-8')

  // Parse CSV
  const lines = csvContent.split('\n')
  let imported = 0

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

      const notes = `Intent: ${intent} | CPC: $${cpc} | Density: ${competitiveDensity}`

      // Insert into database
      await client.query(
        `INSERT INTO keywords (keyword, search_volume, difficulty, category, priority, status, notes)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         ON CONFLICT (keyword) DO UPDATE SET
           search_volume = EXCLUDED.search_volume,
           difficulty = EXCLUDED.difficulty,
           category = EXCLUDED.category,
           priority = EXCLUDED.priority,
           notes = EXCLUDED.notes`,
        [keyword, volume, difficulty, category, priority, 'pending', notes]
      )

      imported++
      if (imported % 100 === 0) {
        console.log(`✅ Imported ${imported} keywords...`)
      }
    } catch (err) {
      console.error(`Error on line ${i}: ${err.message}`)
    }
  }

  console.log(`\n✨ Import complete! Imported ${imported} keywords`)

} catch (error) {
  console.error('❌ Error:', error.message)
} finally {
  await client.end()
}
