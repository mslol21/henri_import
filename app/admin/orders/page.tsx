'use client';

import React, { useState, useEffect, useCallback } from 'react';
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
  Loader2,
  RefreshCw,
  AlertCircle,
  Check,
  Send,
  MessageSquare,
} from 'lucide-react';

interface OrderItemUI {
  id: string;
  productName: string;
  flavorName?: string | null;
  quantity: number;
  price: number;
}

interface OrderUI {
  id: string;
  number: number;
  client: { id: string; name: string; phone: string; email?: string | null };
  address: {
    cep: string;
    street: string;
    number: string;
    complement?: string | null;
    neighborhood: string;
    city: string;
    state: string;
    distanceKm?: number | null;
  };
  items: OrderItemUI[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: 'PIX' | 'CASH' | 'CARD_ON_DELIVERY';
  notes?: string | null;
  status: OrderStatusType;
  whatsappSent: boolean;
  createdAt: string;
  history: { id: string; status: OrderStatusType; notes?: string | null; changedBy: string; createdAt: string }[];
}

const statusBadgeMap: Record<OrderStatusType, { label: string; bg: string; text: string }> = {
  NEW: { label: 'Novo Pedido (Pendente)', bg: 'bg-purple-100 border border-purple-300', text: 'text-purple-700 font-black' },
  CONFIRMED: { label: 'Confirmado / Aprovado', bg: 'bg-blue-100 border border-blue-300', text: 'text-blue-700 font-black' },
  PREPARING: { label: 'Em Separação', bg: 'bg-amber-100 border border-amber-300', text: 'text-amber-700 font-black' },
  SHIPPED: { label: 'Saiu p/ Entrega', bg: 'bg-indigo-100 border border-indigo-300', text: 'text-indigo-700 font-black' },
  DELIVERED: { label: 'Entregue', bg: 'bg-emerald-100 border border-emerald-300', text: 'text-emerald-700 font-black' },
  CANCELLED: { label: 'Cancelado', bg: 'bg-red-100 border border-red-300', text: 'text-red-700 font-black' },
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderUI[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/orders');
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
        // Expand the first NEW order automatically
        const firstNew = data.find((o: OrderUI) => o.status === 'NEW');
        if (firstNew) {
          setExpandedOrderId(firstNew.id);
        } else if (data.length > 0) {
          setExpandedOrderId(data[0].id);
        }
      }
    } catch (e) {
      console.error('Error loading orders:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
    // Auto refresh every 20 seconds for new orders
    const interval = setInterval(fetchOrders, 20000);
    return () => clearInterval(interval);
  }, [fetchOrders]);

  const handleStatusChange = async (orderId: string, newStatus: OrderStatusType, notes?: string) => {
    setUpdatingId(orderId);
    try {
      const res = await updateOrderStatus(orderId, newStatus, notes);
      if (res.success) {
        setOrders((prev) =>
          prev.map((o) => {
            if (o.id === orderId) {
              const newHist = [
                ...o.history,
                {
                  id: `hist-${Date.now()}`,
                  status: newStatus,
                  changedBy: 'Admin',
                  createdAt: new Date().toISOString(),
                  notes: notes || `Status alterado para ${newStatus}`,
                },
              ];
              return { ...o, status: newStatus, history: newHist };
            }
            return o;
          })
        );
      }
    } catch (e) {
      console.error(e);
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredOrders = orders.filter((o) => {
    if (selectedFilter === 'ALL') return true;
    return o.status === selectedFilter;
  });

  const pendingCount = orders.filter((o) => o.status === 'NEW').length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
            PAINEL DE CONTROLE • ENTREGAS & PEDIDOS
          </span>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight sm:text-3xl mt-0.5">
            Gestão & Aprovação de Pedidos
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchOrders}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-xs"
          >
            <RefreshCw className={`h-4 w-4 text-purple-600 ${loading ? 'animate-spin' : ''}`} />
            <span>Atualizar Pedidos</span>
          </button>
        </div>
      </div>

      {/* Pending Orders Alert Banner */}
      {pendingCount > 0 && (
        <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-3xl p-5 text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-purple-500/30">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-400 text-slate-950 font-black text-sm shrink-0 shadow-md">
              {pendingCount}
            </div>
            <div>
              <h3 className="text-sm font-black text-white">
                {pendingCount === 1
                  ? 'Existe 1 novo pedido aguardando aprovação!'
                  : `Existem ${pendingCount} novos pedidos aguardando aprovação!`}
              </h3>
              <p className="text-xs text-purple-200 mt-0.5">
                Revise os itens e clique em "Aprovar Pedido" para dar andamento na entrega.
              </p>
            </div>
          </div>

          <button
            onClick={() => setSelectedFilter('NEW')}
            className="inline-flex items-center gap-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs px-4 py-2.5 shadow-md transition-all shrink-0"
          >
            <span>Ver Pedidos Pendentes</span>
          </button>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
        {[
          { id: 'ALL', label: `Todos (${orders.length})` },
          { id: 'NEW', label: `Novos (${orders.filter((o) => o.status === 'NEW').length})` },
          { id: 'CONFIRMED', label: `Aprovados (${orders.filter((o) => o.status === 'CONFIRMED').length})` },
          { id: 'PREPARING', label: `Separando (${orders.filter((o) => o.status === 'PREPARING').length})` },
          { id: 'SHIPPED', label: `Em Entrega (${orders.filter((o) => o.status === 'SHIPPED').length})` },
          { id: 'DELIVERED', label: `Entregues (${orders.filter((o) => o.status === 'DELIVERED').length})` },
          { id: 'CANCELLED', label: `Cancelados (${orders.filter((o) => o.status === 'CANCELLED').length})` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedFilter(tab.id)}
            className={`px-3 py-2 rounded-xl text-xs font-black transition-all ${
              selectedFilter === tab.id
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Orders List */}
      {loading && orders.length === 0 ? (
        <div className="flex items-center justify-center py-16 text-slate-400 gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="text-xs font-semibold">Carregando lista de pedidos do banco...</span>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-3">
          <ShoppingBag className="h-10 w-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">Nenhum pedido encontrado neste filtro</h3>
          <p className="text-xs text-slate-500">
            Os novos pedidos realizados pelos clientes no site aparecerão aqui automaticamente.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const badge = statusBadgeMap[order.status] || statusBadgeMap.NEW;
            const isExpanded = expandedOrderId === order.id;
            const isPendingApproval = order.status === 'NEW';
            const cleanPhone = order.client.phone.replace(/\D/g, '');
            const waUrl = `https://wa.me/55${cleanPhone}?text=${encodeURIComponent(
              `Olá ${order.client.name}! Sou da Henri Imports referente ao seu Pedido #${order.number} no valor de ${formatCurrency(order.total)}.`
            )}`;

            return (
              <div
                key={order.id}
                className={`bg-white rounded-3xl border shadow-xs p-6 space-y-4 transition-all ${
                  isPendingApproval ? 'border-amber-400 ring-2 ring-amber-400/20' : 'border-slate-200'
                }`}
              >
                {/* Order Top Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-lg font-black text-slate-900">Pedido #{order.number}</span>
                      <span className={`text-xs px-3 py-1 rounded-full ${badge.bg} ${badge.text}`}>
                        {badge.label}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-500 mt-1 flex-wrap">
                      <span>Data: <strong>{formatDate(order.createdAt)}</strong></span>
                      <span>•</span>
                      <span>Cliente: <strong>{order.client.name}</strong> ({order.client.phone})</span>
                    </div>
                  </div>

                  {/* Actions & Status Dropdown */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {/* Approve Button if pending */}
                    {isPendingApproval && (
                      <button
                        onClick={() => handleStatusChange(order.id, 'CONFIRMED', 'Pedido aprovado pelo administrador')}
                        disabled={updatingId === order.id}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs px-4 py-2 shadow-md transition-all disabled:opacity-50"
                      >
                        {updatingId === order.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Check className="h-4 w-4" />
                        )}
                        <span>Aprovar Pedido</span>
                      </button>
                    )}

                    {/* WhatsApp Chat Link */}
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 font-bold text-xs px-3.5 py-2 transition-all"
                    >
                      <Phone className="h-3.5 w-3.5 fill-current" />
                      <span>WhatsApp</span>
                    </a>

                    {/* Status Dropdown */}
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatusType)}
                      disabled={updatingId === order.id}
                      className="rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-900 focus:border-purple-600 focus:outline-none"
                    >
                      <option value="NEW">Novo Pedido (Pendente)</option>
                      <option value="CONFIRMED">Aprovado / Confirmado</option>
                      <option value="PREPARING">Em Separação</option>
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
                    <p>{order.address.street}, Nº {order.address.number} {order.address.complement ? `- ${order.address.complement}` : ''}</p>
                    <p>{order.address.neighborhood}, {order.address.city}/{order.address.state} - CEP {order.address.cep}</p>
                    {order.address.distanceKm && (
                      <p className="text-purple-600 font-bold">Distância da loja: ~{order.address.distanceKm} km</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <span className="font-bold text-slate-900 block">Forma de Pagamento & Frete:</span>
                    <p className="font-extrabold text-purple-700 uppercase">{order.paymentMethod}</p>
                    <p>Taxa de Entrega: <strong>{formatCurrency(order.deliveryFee)}</strong></p>
                    {order.notes && (
                      <p className="text-[11px] text-amber-700 bg-amber-50 p-2 rounded-lg border border-amber-200 mt-1">
                        Obs: {order.notes}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1 text-right sm:text-right">
                    <span className="font-bold text-slate-900 block">Total do Pedido:</span>
                    <p className="text-2xl font-black text-slate-900">{formatCurrency(order.total)}</p>
                  </div>
                </div>

                {/* Expanded items & History log timeline */}
                {isExpanded && (
                  <div className="pt-4 border-t border-slate-100 space-y-4 bg-slate-50 p-4 rounded-2xl">
                    <div>
                      <h4 className="text-xs font-black uppercase text-slate-800 tracking-wider mb-2">
                        Itens Solicitados ({order.items.length})
                      </h4>
                      <div className="space-y-2">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex justify-between text-xs bg-white p-3 rounded-xl border border-slate-200">
                            <div>
                              <span className="font-extrabold text-slate-900">{item.quantity}x {item.productName}</span>
                              {item.flavorName && (
                                <span className="ml-2 font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-md text-[11px]">
                                  Sabor: {item.flavorName}
                                </span>
                              )}
                            </div>
                            <span className="font-bold text-slate-900">{formatCurrency(item.price * item.quantity)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* History Timeline */}
                    <div>
                      <h4 className="text-xs font-black uppercase text-slate-800 tracking-wider mb-2">
                        Histórico de Alterações de Status
                      </h4>
                      <div className="space-y-1.5 text-xs text-slate-600">
                        {order.history.map((h) => (
                          <div key={h.id} className="flex items-center justify-between text-[11px] bg-white px-3 py-2 rounded-lg border border-slate-100">
                            <span className="font-semibold">
                              Status <strong>{h.status}</strong> alterado por <strong>{h.changedBy}</strong> ({h.notes})
                            </span>
                            <span className="text-slate-400 font-mono">{formatDate(h.createdAt)}</span>
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
      )}
    </div>
  );
}
