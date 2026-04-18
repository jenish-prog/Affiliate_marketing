import dotenv from 'dotenv';
dotenv.config();
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_SERVICE_KEY);

async function test() {
  const formData = {
    name: 'test-item',
    category: 'Electronics',
    price: '999',
    original_price: '1999',
    platform: 'Amazon',
    badge: 'Sale',
    affiliate_url: 'http',
    description: 'test',
    image_url: 'http://example.com/img.png'
  };

  const { data, error } = await supabase
    .from('products')
    .insert([formData]);
  console.log('Insert check:', { data, error });
}
test();
