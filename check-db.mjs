import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

// Query to get all tables in the public schema
const { data, error } = await supabase
  .from('information_schema.tables')
  .select('table_name')
  .eq('table_schema', 'public')

if (error) {
  console.log('Attempting alternative method...')
  // Try using RPC or raw SQL if direct query doesn't work
  const { data: rpcData, error: rpcError } = await supabase.rpc('get_tables')
  if (rpcError) {
    console.error('Error:', rpcError)
  } else {
    console.log('Tables found:', rpcData)
  }
} else {
  if (data && data.length > 0) {
    console.log('Tables in your database:')
    data.forEach(table => console.log(`  - ${table.table_name}`))
  } else {
    console.log('No tables found in the public schema.')
    console.log('Your database is empty - you need to create a schema.')
  }
}
