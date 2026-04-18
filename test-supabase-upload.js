import dotenv from 'dotenv';
dotenv.config();
import { createClient } from '@supabase/supabase-js';
import process from 'process';

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_SERVICE_KEY);

async function test() {
  const fileName = `test-${Date.now()}.txt`;
  console.log('Uploading...', fileName);
  const { data, error } = await supabase.storage
    .from('product-images')
    .upload(fileName, 'Hello world');
  console.log('Upload check:', { data, error });
  
  if (data) {
    const { data: urlData } = supabase.storage
      .from('product-images')
      .getPublicUrl(data.path);
    console.log('Public URL check:', urlData);
  }
}
test();
