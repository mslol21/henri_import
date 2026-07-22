'use client';

import React, { useState } from 'react';
import { mockCategories } from '@/lib/mockData';
import { CategoryData } from '@/types';
import { Plus, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<CategoryData[]>(mockCategories);
  const [notification, setNotification] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 2500);
  };

  const toggleCategoryStatus = (id: string) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, active: !c.active } : c))
    );
    showToast('Status da categoria alterado');
  };

  return (
    <div className="space-y-6">
      {notification && (
        <div className="fixed top-4 right-4 z-50 rounded-2xl bg-purple-600 px-4 py-3 text-white text-xs font-extrabold shadow-xl animate-bounce">
          {notification}
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
            ORGANIZAÇÃO DO CATÁLOGO
          </span>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight sm:text-3xl mt-0.5">
            Gerenciador de Categorias
          </h1>
        </div>

        <button
          onClick={() => showToast('Nova categoria iniciada')}
          className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-xs font-black text-white hover:bg-purple-500 shadow-md transition-all"
        >
          <Plus className="h-4 w-4" />
          <span>Criar Nova Categoria</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <div
                className="h-12 w-12 rounded-2xl text-white flex items-center justify-center font-bold text-lg shadow-md"
                style={{ backgroundColor: cat.color || '#7c3aed' }}
              >
                {cat.name.charAt(0)}
              </div>

              <span
                onClick={() => toggleCategoryStatus(cat.id)}
                className={`cursor-pointer inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full ${
                  cat.active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'
                }`}
              >
                {cat.active ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                {cat.active ? 'Ativa' : 'Inativa'}
              </span>
            </div>

            <div>
              <h3 className="text-base font-black text-slate-900">{cat.name}</h3>
              <span className="text-xs text-slate-400 font-mono">slug: /{cat.slug}</span>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>{cat.productCount ?? 12} produtos</span>
              <button
                onClick={() => showToast(`Editando categoria: ${cat.name}`)}
                className="font-bold text-purple-600 hover:underline"
              >
                Editar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
