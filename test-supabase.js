import dotenv from 'dotenv';
dotenv.config();
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_SERVICE_KEY);

async function test() {
  const { data, error } = await supabase.storage.getBucket('product-images');
  console.log('Bucket check:', { data, error });
}
test();
