'use client';

import React from 'react';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Users, Phone, ShoppingBag, Calendar, MapPin } from 'lucide-react';

const mockClients = [
  {
    id: 'cli-1',
    name: 'Matheus Oliveira',
    phone: '(11) 98888-7777',
    totalSpent: 1420.5,
    ordersCount: 6,
    lastPurchase: '2026-07-19T14:20:00Z',
    address: 'Av. Paulista, 1000 - Bela Vista, SP',
  },
  {
    id: 'cli-2',
    name: 'Carolina Mendes',
    phone: '(11) 97777-6666',
    totalSpent: 890.0,
    ordersCount: 4,
    lastPurchase: '2026-07-15T18:45:00Z',
    address: 'Rua Itaim, 450 - Itaim Bibi, SP',
  },
  {
    id: 'cli-3',
    name: 'Gabriel Santos',
    phone: '(11) 96666-5555',
    totalSpent: 540.9,
    ordersCount: 3,
    lastPurchase: '2026-07-10T11:10:00Z',
    address: 'Rua Augusta, 1200 - Consolação, SP',
  },
];

export default function AdminClientsPage() {
  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
          BASE DE CLIENTES CADASTRADOS
        </span>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight sm:text-3xl mt-0.5">
          Clientes & Histórico
        </h1>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="divide-y divide-slate-100">
          {mockClients.map((client) => (
            <div key={client.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-black text-lg">
                  {client.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">{client.name}</h3>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                    <span className="flex items-center gap-1">
                      <Phone className="h-3.5 w-3.5 text-emerald-600" />
                      {client.phone}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-purple-600" />
                      {client.address}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 text-xs text-slate-700">
                <div className="text-center sm:text-right">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Pedidos</span>
                  <span className="font-extrabold text-slate-900">{client.ordersCount} pedidos</span>
                </div>

                <div className="text-center sm:text-right">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Total Gasto</span>
                  <span className="font-black text-purple-600 text-sm">{formatCurrency(client.totalSpent)}</span>
                </div>

                <div className="text-center sm:text-right">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Última Compra</span>
                  <span className="font-semibold text-slate-600">{formatDate(client.lastPurchase)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
