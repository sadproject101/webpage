import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Replace with your actual Supabase URL and Anon Key
const supabaseUrl = 'https://vrjzxlcjpbwheosycrmg.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZyanp4bGNqcGJ3aGVvc3ljcm1nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyNDc3MTUsImV4cCI6MjA4NjgyMzcxNX0.2pekNrEY8K16Tpu_sihuon5P-VpP5FdOTQXgeoManT0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
