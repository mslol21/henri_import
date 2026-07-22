'use client';

import React, { useState } from 'react';
import { ProductData, FlavorData } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { useCart } from '@/contexts/CartContext';
import { ShoppingBag, Check, Sparkles, ShieldCheck, AlertCircle, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function FlavorSelector({ product }: { product: ProductData }) {
  const { addToCart } = useCart();

  // Initial selected flavor defaults to the first active flavor if available
  const initialFlavor = product.hasFlavors && product.flavors && product.flavors.length > 0
    ? product.flavors[0]
    : null;

  const [selectedFlavor, setSelectedFlavor] = useState<FlavorData | null>(initialFlavor);
  const [quantity, setQuantity] = useState<number>(1);
  const [notes, setNotes] = useState<string>('');
  const [addedToast, setAddedToast] = useState<boolean>(false);

  // Computed values
  const activeImage = selectedFlavor?.imageUrl || product.mainImageUrl;
  const activePrice = selectedFlavor?.price ?? product.basePromoPrice ?? product.basePrice;
  const activeStock = selectedFlavor ? selectedFlavor.stock : product.baseStock;
  const activeSku = selectedFlavor ? selectedFlavor.sku : product.baseSku;

  const handleAddToCart = () => {
    addToCart(product, selectedFlavor, quantity, notes);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
      {/* Product Image Section with Smooth Framer Motion Image Swap */}
      <div className="lg:col-span-6 space-y-4">
        <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-slate-100 border border-slate-200 shadow-lg">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeImage}
              src={activeImage}
              alt={selectedFlavor ? selectedFlavor.name : product.name}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="h-full w-full object-cover object-center"
            />
          </AnimatePresence>

          {/* Flavor Name Floating Overlay Badge */}
          {selectedFlavor && (
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl bg-slate-900/85 backdrop-blur-md px-4 py-3 text-white border border-slate-700/50 shadow-md">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-purple-400" />
                <span className="text-xs font-bold text-slate-300">Sabor selecionado:</span>
                <span className="text-sm font-black text-purple-300">{selectedFlavor.name}</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 uppercase">SKU: {activeSku}</span>
            </div>
          )}
        </div>

        {/* Gallery thumbnails */}
        {product.gallery && product.gallery.length > 0 && (
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedFlavor(null)}
              className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                selectedFlavor === null ? 'border-purple-600 ring-2 ring-purple-600/30' : 'border-slate-200'
              }`}
            >
              <img src={product.mainImageUrl} alt="Principal" className="h-full w-full object-cover" />
            </button>
            {product.flavors?.map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFlavor(f)}
                className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                  selectedFlavor?.id === f.id ? 'border-purple-600 ring-2 ring-purple-600/30' : 'border-slate-200'
                }`}
              >
                <img src={f.imageUrl || product.mainImageUrl} alt={f.name} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product & Flavor Info Section */}
      <div className="lg:col-span-6 space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
            {product.brand}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
            {product.name}
          </h1>

          {/* Pricing & Stock Banner */}
          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-black text-slate-900">
              {formatCurrency(activePrice)}
            </span>
            {product.basePromoPrice && (
              <span className="text-sm text-slate-400 line-through">
                {formatCurrency(product.basePrice)}
              </span>
            )}

            {/* Stock indicator */}
            {activeStock > 0 ? (
              <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
                <Check className="h-3.5 w-3.5" />
                <span>Em estoque ({activeStock} un)</span>
              </span>
            ) : (
              <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-700 border border-red-200">
                <AlertCircle className="h-3.5 w-3.5" />
                <span>Esgotado</span>
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-600 leading-relaxed border-t border-b border-slate-200 py-4">
          {selectedFlavor?.description || product.description}
        </p>

        {/* Mandatory Flavor Selection Options */}
        {product.hasFlavors && product.flavors && product.flavors.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-purple-600" />
                <span>Escolha o Sabor Obrigatório</span>
              </label>
              <span className="text-xs text-slate-500 font-medium">
                {product.flavors.length} opções disponíveis
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
              {product.flavors.map((flavor) => {
                const isSelected = selectedFlavor?.id === flavor.id;
                return (
                  <button
                    key={flavor.id}
                    type="button"
                    onClick={() => setSelectedFlavor(flavor)}
                    className={`flex items-center gap-3 p-3 rounded-2xl border text-left transition-all relative overflow-hidden ${
                      isSelected
                        ? 'border-purple-600 bg-purple-50/70 shadow-sm ring-2 ring-purple-600/20'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {/* Sabor Miniature Photo */}
                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-slate-100 border border-slate-200">
                      <img
                        src={flavor.imageUrl || product.mainImageUrl}
                        alt={flavor.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-extrabold text-slate-900 truncate">
                        {flavor.name}
                      </h4>
                      <span className="text-[10px] text-slate-500 font-medium">
                        {flavor.stock > 0 ? `Estoque: ${flavor.stock}` : 'Esgotado'}
                      </span>
                    </div>

                    {isSelected && (
                      <div className="h-5 w-5 rounded-full bg-purple-600 text-white flex items-center justify-center shrink-0">
                        <Check className="h-3 w-3" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Quantity & Item Notes */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center gap-4">
            <div className="flex items-center rounded-xl border border-slate-300 bg-white p-1">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                aria-label="Diminuir quantidade"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center font-extrabold text-slate-900 text-sm">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                aria-label="Aumentar quantidade"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <button
              type="button"
              disabled={activeStock <= 0}
              onClick={handleAddToCart}
              className="flex-1 inline-flex items-center justify-center gap-3 rounded-xl bg-purple-600 px-6 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-purple-600/30 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ShoppingBag className="h-5 w-5" />
              <span>Adicionar ao Carrinho • {formatCurrency(activePrice * quantity)}</span>
            </button>
          </div>

          {/* Optional item observation */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Observação para o item (Opcional):
            </label>
            <input
              type="text"
              placeholder="Ex: Embalar para presente ou preferência..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs text-slate-900 placeholder-slate-400 focus:border-purple-600 focus:bg-white focus:outline-none"
            />
          </div>

          {addedToast && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl bg-emerald-600 p-3 text-white text-xs font-bold text-center flex items-center justify-center gap-2"
            >
              <Check className="h-4 w-4" />
              <span>Item adicionado ao carrinho com sucesso!</span>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
