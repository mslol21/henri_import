'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { useConfig } from '@/contexts/ConfigContext';

export default function AdminLoginPage() {
  const router = useRouter();
  const { config } = useConfig();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Simple secure authentication check
    setTimeout(() => {
      // Default initial admin credentials or custom login
      if ((email === 'admin@henriimports.com.br' || email === 'admin') && password === 'admin123') {
        localStorage.setItem('henri_admin_auth', 'true');
        document.cookie = 'henri_admin_auth=true; path=/; max-age=86400';
        setLoading(false);
        router.push('/admin');
      } else {
        setLoading(false);
        setError('E-mail ou senha incorretos. Utilize admin@henriimports.com.br e senha admin123');
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6 text-white">
        <div className="text-center space-y-2">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-600 text-white mx-auto shadow-lg shadow-sky-600/30">
            <ShieldCheck className="h-8 w-8" />
          </div>
          <h1 className="text-2xl font-black uppercase tracking-tight">{config.name}</h1>
          <p className="text-xs text-sky-400 font-semibold">Acesso Restrito ao Painel Administrativo</p>
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-400 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">E-mail Administrativo</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
              <input
                type="text"
                placeholder="admin@henriimports.com.br"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 py-2.5 pl-10 pr-3 text-xs text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Senha de Acesso</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 py-2.5 pl-10 pr-3 text-xs text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-sky-600 py-3.5 text-xs font-black text-white hover:bg-sky-500 shadow-lg shadow-sky-600/30 transition-all mt-2"
          >
            <span>{loading ? 'Autenticando...' : 'Entrar no Painel'}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>


      </div>
    </div>
  );
}
