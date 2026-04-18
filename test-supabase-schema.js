import dotenv from 'dotenv';
dotenv.config();
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_SERVICE_KEY);

async function test() {
  const { data, error } = await supabase.from('products').select('*').limit(1);
  if (data && data.length > 0) {
    console.log('Columns in products table:', Object.keys(data[0]));
  } else {
    console.log('No rows found to inspect schema', error);
  }
}
test();
