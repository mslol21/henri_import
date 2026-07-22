'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { formatCurrency } from '@/lib/utils';
import { X, Trash2, Plus, Minus, Tag, ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function CartDrawer() {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    discount,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    total,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success: boolean; message: string } | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;

    const res = applyCoupon(couponInput);
    setCouponFeedback(res);
    if (res.success) {
      setCouponInput('');
    }
  };

  if (!isCartOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartOpen(false)}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
        />

        <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-screen max-w-md bg-white shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-950 text-white">
              <div className="flex items-center gap-2.5">
                <img src="/mascote.png" alt="Mascote Henri" className="h-7 w-7 object-contain" />
                <h2 className="text-lg font-black tracking-tight">Seu Carrinho</h2>
                <span className="rounded-full bg-sky-500/20 px-2.5 py-0.5 text-xs font-bold text-sky-300 border border-sky-400/30">
                  {items.length} itens
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                aria-label="Fechar carrinho de compras"
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4 text-slate-400">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-sky-50 p-2">
                    <img src="/mascote.png" alt="Mascote" className="h-16 w-16 object-contain" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-700">Seu carrinho está vazio</h3>
                    <p className="text-xs text-slate-400 mt-1">Explore nossas ofertas e adicione vapes ou essências!</p>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="rounded-xl bg-sky-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-sky-500 transition-colors shadow-md"
                  >
                    Ver Produtos
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-3 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white transition-colors"
                  >
                    {/* Item Image */}
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-white border border-slate-200">
                      <img
                        src={item.selectedFlavor?.imageUrl || item.product.mainImageUrl}
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 truncate">
                          {item.product.name}
                        </h4>
                        {item.selectedFlavor && (
                          <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-sky-700 mt-0.5">
                            <Sparkles className="h-3 w-3" />
                            <span>Sabor: {item.selectedFlavor.name}</span>
                          </div>
                        )}
                        {item.notes && (
                          <p className="text-[10px] text-slate-400 italic truncate mt-0.5">
                            Obs: {item.notes}
                          </p>
                        )}
                      </div>

                      {/* Controls & Subtotal */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center rounded-lg border border-slate-300 bg-white">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 text-slate-600 hover:bg-slate-100 rounded-l-lg"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-slate-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-slate-600 hover:bg-slate-100 rounded-r-lg"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-xs font-black text-slate-900">
                            {formatCurrency(item.unitPrice * item.quantity)}
                          </span>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-slate-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {items.length > 0 && (
              <div className="border-t border-slate-200 bg-slate-50 p-6 space-y-4">
                {/* Discount Coupon Input */}
                <form onSubmit={handleApplyCoupon} className="space-y-1">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Cupom (Ex: HENRI10)"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        className="w-full rounded-xl border border-slate-300 bg-white py-2 pl-9 pr-3 text-xs uppercase font-bold text-slate-900 placeholder-slate-400 focus:border-sky-600 focus:outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 transition-colors"
                    >
                      Aplicar
                    </button>
                  </div>
                  {appliedCoupon && (
                    <div className="flex items-center justify-between text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                      <span>Cupom <strong>{appliedCoupon}</strong> ativado!</span>
                      <button onClick={removeCoupon} className="text-slate-400 hover:text-red-600">
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}
                  {couponFeedback && !appliedCoupon && (
                    <p className={`text-[11px] font-medium ${couponFeedback.success ? 'text-emerald-600' : 'text-red-600'}`}>
                      {couponFeedback.message}
                    </p>
                  )}
                </form>

                {/* Subtotal / Total Summary */}
                <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-200">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-slate-900">{formatCurrency(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-medium">
                      <span>Desconto do Cupom</span>
                      <span>-{formatCurrency(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-200">
                    <span>Total estimado</span>
                    <span className="text-sky-600 text-base">{formatCurrency(total)}</span>
                  </div>
                </div>

                {/* Checkout Link */}
                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="flex w-full items-center justify-center gap-3 rounded-xl bg-sky-600 py-3.5 text-sm font-black text-white shadow-lg shadow-sky-600/30 hover:bg-sky-500 transition-all"
                >
                  <span>Finalizar Pedido</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
