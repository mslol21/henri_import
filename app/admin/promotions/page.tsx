'use client';

import React, { useState } from 'react';
import { mockBanners, mockPromotions } from '@/lib/mockData';
import { Plus, Edit, Trash2, CheckCircle, Image as ImageIcon } from 'lucide-react';

export default function AdminPromotionsPage() {
  const [banners, setBanners] = useState(mockBanners);
  const [promos, setPromos] = useState(mockPromotions);
  const [notification, setNotification] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 2500);
  };

  return (
    <div className="space-y-8">
      {notification && (
        <div className="fixed top-4 right-4 z-50 rounded-2xl bg-purple-600 px-4 py-3 text-white text-xs font-extrabold shadow-xl animate-bounce">
          {notification}
        </div>
      )}

      {/* Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
          MARKETING & BANNERS PROMOCIONAIS
        </span>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight sm:text-3xl mt-0.5">
          Promoções & Banners
        </h1>
      </div>

      {/* Section 1: Hero Banners */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
            Banners Principais da Landing Page
          </h3>
          <button
            onClick={() => showToast('Adicionar novo banner')}
            className="inline-flex items-center gap-1.5 rounded-xl bg-purple-600 px-4 py-2 text-xs font-black text-white hover:bg-purple-500 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Novo Banner</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {banners.map((b) => (
            <div key={b.id} className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 text-white group">
              <img src={b.imageUrl} alt={b.title} className="h-48 w-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 p-5 flex flex-col justify-between bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent">
                <span className="self-end rounded-full bg-purple-500/30 px-2.5 py-0.5 text-[10px] font-bold text-purple-300 border border-purple-400/30">
                  Ordem #{b.displayOrder}
                </span>
                <div>
                  <h4 className="text-base font-extrabold">{b.title}</h4>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2">{b.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
