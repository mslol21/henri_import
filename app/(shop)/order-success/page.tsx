import React from 'react';
import Link from 'next/link';
import { formatCurrency } from '@/lib/utils';
import { ShoppingBag } from 'lucide-react';

interface OrderSuccessProps {
  searchParams: Promise<{
    orderNumber?: string;
    total?: string;
  }>;
}

export default async function OrderSuccessPage({ searchParams }: OrderSuccessProps) {
  const params = await searchParams;
  const orderNum = params.orderNumber || '1001';
  const totalVal = parseFloat(params.total || '0');

  return (
    <div className="bg-slate-50 min-h-screen py-16 flex items-center justify-center">
      <div className="mx-auto max-w-lg px-4 text-center">
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xl space-y-6">
          <div className="relative inline-block">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-purple-100 text-purple-600 mx-auto shadow-inner p-3 border-2 border-purple-300">
              <img src="/mascote.png" alt="Mascote Henri Imports" className="h-full w-full object-contain" />
            </div>
            <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-white text-xs font-bold shadow-md">
              ✓
            </span>
          </div>

          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-extrabold text-emerald-700 border border-emerald-200">
              PEDIDO ENVIADO COM SUCESSO!
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Pedido #{orderNum}
            </h1>
            {totalVal > 0 && (
              <p className="text-sm font-bold text-purple-600">
                Valor Total: {formatCurrency(totalVal)}
              </p>
            )}
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Seu pedido foi registrado e encaminhado diretamente para a nossa equipe no WhatsApp. 
            Em alguns instantes responderemos para confirmar a entrega!
          </p>

          <div className="pt-4 border-t border-slate-100 space-y-3">
            <Link
              href="/"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 py-3.5 text-xs font-extrabold text-white hover:bg-purple-500 transition-colors shadow-md"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Voltar para a Loja</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
