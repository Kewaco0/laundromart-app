import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://sgnxnvrhnmnfivfmayuw.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnbnhudnJobm1uZml2Zm1heXV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0MjkxOTMsImV4cCI6MjA4MDAwNTE5M30.aLdG_TekAaADhzM5tQ6zQ_k7mOMYeSMt60xDAddg5Gk'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)