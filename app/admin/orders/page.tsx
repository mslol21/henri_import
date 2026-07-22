'use client';

import React, { useState } from 'react';
import { formatCurrency, formatDate } from '@/lib/utils';
import { OrderStatusType } from '@/types';
import { updateOrderStatus } from '@/actions/orders';
import {
  ShoppingBag,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  Phone,
  MapPin,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

const mockOrders = [
  {
    id: 'ord-101',
    number: 1042,
    client: { name: 'Matheus Oliveira', phone: '(11) 98888-7777' },
    address: {
      cep: '01310-100',
      street: 'Av. Paulista',
      number: '1000',
      neighborhood: 'Bela Vista',
      city: 'São Paulo',
      state: 'SP',
      distanceKm: 2.4,
    },
    items: [
      { productName: 'Ignite V250 Pod Descartável', flavorName: 'Blueberry Ice', quantity: 2, price: 149.9 },
      { productName: 'Carvão de Coco Zomo 1kg', flavorName: null, quantity: 1, price: 34.9 },
    ],
    subtotal: 334.7,
    deliveryFee: 10.0,
    total: 344.7,
    paymentMethod: 'PIX',
    status: 'NEW' as OrderStatusType,
    createdAt: new Date().toISOString(),
    history: [
      { status: 'NEW' as OrderStatusType, changedBy: 'Cliente', createdAt: new Date().toISOString(), notes: 'Pedido realizado pelo site' },
    ],
  },
  {
    id: 'ord-102',
    number: 1041,
    client: { name: 'Carolina Mendes', phone: '(11) 97777-6666' },
    address: {
      cep: '04538-132',
      street: 'Rua Itaim',
      number: '450',
      neighborhood: 'Itaim Bibi',
      city: 'São Paulo',
      state: 'SP',
      distanceKm: 4.8,
    },
    items: [
      { productName: 'Elf Bar BC10000 Puffs', flavorName: 'Watermelon Ice', quantity: 1, price: 119.9 },
    ],
    subtotal: 119.9,
    deliveryFee: 15.0,
    total: 134.9,
    paymentMethod: 'CARD_ON_DELIVERY',
    status: 'SHIPPED' as OrderStatusType,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    history: [
      { status: 'NEW' as OrderStatusType, changedBy: 'Cliente', createdAt: new Date(Date.now() - 3600000).toISOString(), notes: 'Criado' },
      { status: 'CONFIRMED' as OrderStatusType, changedBy: 'Admin', createdAt: new Date(Date.now() - 2500000).toISOString(), notes: 'Pagamento OK' },
      { status: 'SHIPPED' as OrderStatusType, changedBy: 'Motoboy', createdAt: new Date(Date.now() - 900000).toISOString(), notes: 'Saiu para entrega' },
    ],
  },
];

const statusBadgeMap: Record<OrderStatusType, { label: string; bg: string; text: string }> = {
  NEW: { label: 'Novo Pedido', bg: 'bg-purple-100', text: 'text-purple-700' },
  CONFIRMED: { label: 'Confirmado', bg: 'bg-blue-100', text: 'text-blue-700' },
  PREPARING: { label: 'Preparando', bg: 'bg-amber-100', text: 'text-amber-700' },
  SHIPPED: { label: 'Saiu p/ Entrega', bg: 'bg-indigo-100', text: 'text-indigo-700' },
  DELIVERED: { label: 'Entregue', bg: 'bg-emerald-100', text: 'text-emerald-700' },
  CANCELLED: { label: 'Cancelado', bg: 'bg-red-100', text: 'text-red-700' },
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState(mockOrders);
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>('ord-101');

  const handleStatusChange = async (orderId: string, newStatus: OrderStatusType) => {
    await updateOrderStatus(orderId, newStatus);
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          const newHist = [
            ...o.history,
            { status: newStatus, changedBy: 'Admin', createdAt: new Date().toISOString(), notes: `Status alterado para ${newStatus}` },
          ];
          return { ...o, status: newStatus, history: newHist };
        }
        return o;
      })
    );
  };

  const filteredOrders = orders.filter((o) => {
    if (selectedFilter === 'ALL') return true;
    return o.status === selectedFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
            CONTROLE DE PEDIDOS E DELIVERY
          </span>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight sm:text-3xl mt-0.5">
            Gestão de Pedidos
          </h1>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {['ALL', 'NEW', 'CONFIRMED', 'PREPARING', 'SHIPPED', 'DELIVERED', 'CANCELLED'].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-colors ${
                selectedFilter === st
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {st === 'ALL' ? 'Todos' : statusBadgeMap[st as OrderStatusType]?.label || st}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredOrders.map((order) => {
          const badge = statusBadgeMap[order.status];
          const isExpanded = expandedOrderId === order.id;

          return (
            <div
              key={order.id}
              className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-black text-slate-900">Pedido #{order.number}</span>
                    <span className={`text-xs font-extrabold px-3 py-1 rounded-full ${badge.bg} ${badge.text}`}>
                      {badge.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                    <span>{formatDate(order.createdAt)}</span>
                    <span>•</span>
                    <span>Cliente: <strong>{order.client.name}</strong> ({order.client.phone})</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatusType)}
                    className="rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-900 focus:border-purple-600 focus:outline-none"
                  >
                    <option value="NEW">Novo Pedido</option>
                    <option value="CONFIRMED">Confirmado</option>
                    <option value="PREPARING">Preparando</option>
                    <option value="SHIPPED">Saiu para Entrega</option>
                    <option value="DELIVERED">Entregue</option>
                    <option value="CANCELLED">Cancelado</option>
                  </select>

                  <button
                    onClick={() => setExpandedOrderId(isExpanded ? null : order.id)}
                    className="p-2 text-slate-500 hover:text-purple-600 rounded-xl hover:bg-slate-100"
                  >
                    {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Summary details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-700">
                <div className="space-y-1">
                  <span className="font-bold text-slate-900 block">Endereço de Entrega:</span>
                  <p>{order.address.street}, Nº {order.address.number} - {order.address.neighborhood}</p>
                  <p>{order.address.city}/{order.address.state} - Distância: {order.address.distanceKm} km</p>
                </div>

                <div className="space-y-1">
                  <span className="font-bold text-slate-900 block">Forma de Pagamento:</span>
                  <p className="font-extrabold text-purple-600">{order.paymentMethod}</p>
                  <p>Taxa de Entrega: {formatCurrency(order.deliveryFee)}</p>
                </div>

                <div className="space-y-1 text-right sm:text-right">
                  <span className="font-bold text-slate-900 block">Total do Pedido:</span>
                  <p className="text-xl font-black text-slate-900">{formatCurrency(order.total)}</p>
                </div>
              </div>

              {/* Expanded items & History log timeline */}
              {isExpanded && (
                <div className="pt-4 border-t border-slate-100 space-y-4 bg-slate-50 p-4 rounded-2xl">
                  <div>
                    <h4 className="text-xs font-black uppercase text-slate-800 tracking-wider mb-2">
                      Itens do Pedido
                    </h4>
                    <div className="space-y-2">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex justify-between text-xs bg-white p-2.5 rounded-xl border border-slate-200">
                          <div>
                            <span className="font-bold text-slate-900">{item.quantity}x {item.productName}</span>
                            {item.flavorName && (
                              <span className="ml-2 font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md">
                                Sabor: {item.flavorName}
                              </span>
                            )}
                          </div>
                          <span className="font-bold text-slate-900">{formatCurrency(item.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-black uppercase text-slate-800 tracking-wider mb-2">
                      Histórico de Alterações de Status
                    </h4>
                    <div className="space-y-1.5 text-xs text-slate-600">
                      {order.history.map((h, i) => (
                        <div key={i} className="flex items-center justify-between text-[11px] bg-white px-3 py-1.5 rounded-lg border border-slate-100">
                          <span className="font-semibold">{h.status} por <strong>{h.changedBy}</strong> ({h.notes})</span>
                          <span className="text-slate-400">{formatDate(h.createdAt)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
