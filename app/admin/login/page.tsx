'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Flame, Lock, Mail, ArrowRight } from 'lucide-react';
import { useConfig } from '@/contexts/ConfigContext';

export default function AdminLoginPage() {
  const router = useRouter();
  const { config } = useConfig();
  const [email, setEmail] = useState('admin@henriimports.com.br');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      router.push('/admin');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6 text-white">
        <div className="text-center space-y-2">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-600 text-white mx-auto shadow-lg shadow-purple-600/30">
            <Flame className="h-8 w-8 fill-purple-300" />
          </div>
          <h1 className="text-2xl font-black uppercase tracking-tight">{config.name}</h1>
          <p className="text-xs text-slate-400">Acesso Restrito ao Painel Administrativo</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">E-mail Administrativo</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 py-2.5 pl-10 pr-3 text-xs text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 py-2.5 pl-10 pr-3 text-xs text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-purple-600 py-3.5 text-xs font-black text-white hover:bg-purple-500 shadow-lg shadow-purple-600/30 transition-all mt-2"
          >
            <span>{loading ? 'Autenticando...' : 'Entrar no Painel'}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <p className="text-[11px] text-center text-slate-500">
          Credenciais demonstrativas pré-preenchidas. Clique em Entrar para prosseguir.
        </p>
      </div>
    </div>
  );
}
