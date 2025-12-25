import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mwmvkfgxpmxivgbqvvpw.supabase.co'
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'sb_secret_kxETT_68ZkwkkejKm7OZ2g_lD0kpg6H'

const supabase = createClient(supabaseUrl, supabaseKey)

console.log('Verifying database tables...\n')

// Check each table
const tables = ['seo_pages', 'keywords', 'analytics', 'content_generations', 'page_keywords']

for (const table of tables) {
  const { data, error, count } = await supabase
    .from(table)
    .select('*', { count: 'exact', head: true })

  if (error) {
    console.log(`❌ ${table}: Error - ${error.message}`)
  } else {
    console.log(`✅ ${table}: Table exists (${count || 0} rows)`)
  }
}

console.log('\n✨ Database verification complete!')
