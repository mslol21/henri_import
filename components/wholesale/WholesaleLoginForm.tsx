'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Loader2, ArrowRight } from 'lucide-react';

export default function WholesaleLoginForm() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/atacado/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Erro ao autenticar.');
        return;
      }

      router.push('/?atacado=true');
      router.refresh();
    } catch (err) {
      setError('Erro de conexão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 text-red-600 text-sm font-semibold rounded-2xl text-center">
          {error}
        </div>
      )}

      <div className="space-y-1">
        <label className="block text-xs font-bold text-slate-700">Código de Acesso B2B</label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite a senha do atacado"
            className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading || !password}
        className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-black py-3 px-4 rounded-2xl shadow-lg shadow-slate-900/20 transition-all disabled:opacity-50"
      >
        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Acessar Catálogo Exclusivo'}
        {!loading && <ArrowRight className="w-4 h-4" />}
      </button>

      <div className="pt-4 text-center border-t border-slate-100">
        <button
          type="button"
          onClick={() => router.push('/')}
          className="text-xs font-bold text-slate-500 hover:text-purple-600"
        >
          &larr; Voltar para a loja de varejo
        </button>
      </div>
    </form>
  );
}
