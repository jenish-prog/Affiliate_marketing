import { supabase, supabaseAdmin } from './supabase'

export const fetchProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data?.map(p => ({
    ...p,
    image_url: p.image_url ? (p.image_url.includes('?t=') ? p.image_url : `${p.image_url}?t=${Date.now()}`) : null
  })) || []
}

export const fetchProductById = async (id) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()
  if (error) throw error
  return data
}

export const fetchProductsByCategory = async (category) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export const searchProducts = async (query) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .ilike('name', `%${query}%`)
  if (error) throw error
  return data
}

export const uploadImage = async (file) => {
  const fileName = `${Date.now()}_${file.name}`
  const { data, error } = await supabaseAdmin.storage
    .from('product-images')
    .upload(fileName, file)
  if (error) throw error
  const { data: urlData } = supabaseAdmin.storage
    .from('product-images')
    .getPublicUrl(data.path)
  return `${urlData.publicUrl}?t=${Date.now()}`
}

export const addProduct = async (product) => {
  const { error } = await supabaseAdmin
    .from('products')
    .insert([product])
  if (error) throw error
}

export const updateProduct = async (id, product) => {
  const { error } = await supabaseAdmin
    .from('products')
    .update(product)
    .eq('id', id)
  if (error) throw error
}

export const deleteProduct = async (id) => {
  const { error } = await supabaseAdmin
    .from('products')
    .delete()
    .eq('id', id)
  if (error) throw error
}