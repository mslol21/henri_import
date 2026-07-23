import React, { useState } from 'react';
import { UploadCloud, Loader2, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';
import { uploadImage } from '@/lib/supabase';

interface ImageUploadInputProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  bucket?: string;
}

export function ImageUploadInput({ label, value, onChange, bucket = 'products' }: ImageUploadInputProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    try {
      const url = await uploadImage(file, bucket);
      
      if (url.startsWith('blob:')) {
        // If uploadImage falls back to blob, it means the Supabase upload failed (e.g., bucket doesn't exist)
        setError('Falha ao enviar imagem. Verifique se o bucket "'+bucket+'" está criado e público no Supabase.');
      }
      
      onChange(url);
    } catch (err: any) {
      setError('Erro ao enviar: ' + err.message);
    } finally {
      setUploading(false);
      // Reset input so the same file can be selected again if needed
      e.target.value = '';
    }
  };

  return (
    <div className="space-y-1">
      <label className="block text-xs font-bold text-slate-700">{label}</label>
      
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="URL da imagem (https://...)"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-sky-400"
            />
          </div>
          <span className="text-xs font-bold text-slate-400">OU</span>
          <label className={`relative flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-slate-300 bg-slate-50 hover:bg-sky-50 hover:border-sky-300 transition-colors cursor-pointer ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
            {uploading ? <Loader2 className="h-4 w-4 text-sky-600 animate-spin" /> : <UploadCloud className="h-4 w-4 text-slate-500" />}
            <span className="text-xs font-bold text-slate-600">{uploading ? 'Enviando...' : 'Carregar do PC'}</span>
            <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          </label>
        </div>
        
        {error && <p className="text-xs font-bold text-red-500">{error}</p>}
      </div>
    </div>
  );
}
