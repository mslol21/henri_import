import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-supabase-url.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function uploadImage(file: File, bucket = 'products'): Promise<string> {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { data, error } = await supabase.storage.from(bucket).upload(filePath, file);

    if (error) {
      console.warn('Supabase storage upload error, returning local preview fallback:', error.message);
      return URL.createObjectURL(file);
    }

    const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(data.path);
    return publicUrlData.publicUrl;
  } catch (err) {
    console.error('Error uploading file:', err);
    return URL.createObjectURL(file);
  }
}
