'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useConfig } from '@/contexts/ConfigContext';
import { formatCurrency } from '@/lib/utils';
import {
  lookupAddressByCep,
  estimateCoordsFromCep,
  calculateDeliveryFee,
} from '@/services/distance';
import { getWhatsAppUrl, OrderWhatsAppPayload } from '@/services/whatsapp';
import { createOrder } from '@/actions/orders';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { checkoutSchema, CheckoutFormData } from '@/validators/schemas';
import { useRouter } from 'next/navigation';
import {
  ShoppingBag,
  Truck,
  MapPin,
  CreditCard,
  QrCode,
  Banknote,
  Sparkles,
  Phone,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Clock,
} from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const { items, subtotal, discount, total: cartTotal, clearCart } = useCart();
  const { config } = useConfig();
  const router = useRouter();

  const [isCalculatingDelivery, setIsCalculatingDelivery] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState<{
    distanceKm: number;
    deliveryFee: number;
    estimatedTimeMin: number;
  } | null>(null);
  const [cepError, setCepError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: '',
      phone: '',
      cep: '',
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
      paymentMethod: 'PIX',
      notes: '',
    },
  });

  const watchCep = watch('cep');

  // Trigger automatic address lookup & distance computation when CEP reaches 8 digits
  useEffect(() => {
    const cleanCep = watchCep ? watchCep.replace(/\D/g, '') : '';
    if (cleanCep.length === 8) {
      handleCalculateDelivery(cleanCep);
    }
  }, [watchCep]);

  const handleCalculateDelivery = async (cep: string) => {
    setIsCalculatingDelivery(true);
    setCepError(null);

    try {
      // 1. Fetch address data from ViaCEP
      const addr = await lookupAddressByCep(cep);
      setValue('street', addr.street);
      setValue('neighborhood', addr.neighborhood);
      setValue('city', addr.city);
      setValue('state', addr.state);

      // 2. Estimate client coordinates & calculate distance
      const clientCoords = estimateCoordsFromCep(cep, config.latitude, config.longitude);

      const feeResult = calculateDeliveryFee({
        storeLat: config.latitude,
        storeLon: config.longitude,
        clientLat: clientCoords.lat,
        clientLon: clientCoords.lon,
        mode: config.deliveryMode,
        kmRate: config.deliveryKmRate,
        ranges: config.deliveryRanges,
      });

      setDeliveryInfo(feeResult);
    } catch (err: any) {
      setCepError(err.message || 'Erro ao calcular frete para este CEP');
      setDeliveryInfo(null);
    } finally {
      setIsCalculatingDelivery(false);
    }
  };

  const deliveryFee = deliveryInfo ? deliveryInfo.deliveryFee : 0;
  const grandTotal = Math.max(0, cartTotal + deliveryFee);

  const onSubmit = async (formData: CheckoutFormData) => {
    if (items.length === 0) return;
    setIsSubmitting(true);

    try {
      const addressText = `${formData.street}, Nº ${formData.number} ${
        formData.complement ? `- ${formData.complement}` : ''
      }, Bairro ${formData.neighborhood}, ${formData.city}/${formData.state} - CEP ${formData.cep}`;

      // 1. Prepare items payload
      const orderItems = items.map((i) => ({
        productId: i.product.id,
        flavorId: i.selectedFlavor?.id || null,
        quantity: i.quantity,
        unitPrice: i.unitPrice,
      }));

      // 2. Save order via Server Action
      const result = await createOrder(
        formData,
        orderItems,
        subtotal,
        deliveryFee,
        grandTotal,
        deliveryInfo?.distanceKm
      );

      // 3. Build WhatsApp payload & message
      const whatsappPayload: OrderWhatsAppPayload = {
        orderNumber: result.orderNumber,
        clientName: formData.name,
        clientPhone: formData.phone,
        addressText,
        items: items.map((i) => ({
          productName: i.product.name,
          flavorName: i.selectedFlavor?.name,
          quantity: i.quantity,
          price: i.unitPrice,
        })),
        notes: formData.notes,
        distanceKm: deliveryInfo?.distanceKm,
        deliveryFee,
        subtotal,
        total: grandTotal,
        paymentMethod: formData.paymentMethod,
        storePhone: config.whatsapp,
      };

      const waUrl = getWhatsAppUrl(whatsappPayload);

      // Clear local cart
      clearCart();

      // Open WhatsApp automatically in a new tab / app trigger
      window.open(waUrl, '_blank');

      // Redirect user to success screen
      router.push(
        `/order-success?orderNumber=${result.orderNumber || '1001'}&total=${grandTotal}`
      );
    } catch (err) {
      console.error('Error completing checkout:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="bg-slate-50 min-h-screen py-16 flex items-center justify-center">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs max-w-md text-center space-y-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-50 text-purple-600 mx-auto">
            <ShoppingBag className="h-8 w-8" />
          </div>
          <h2 className="text-xl font-black text-slate-900">Seu carrinho está vazio</h2>
          <p className="text-xs text-slate-500">
            Adicione itens ao carrinho antes de finalizar seu pedido.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl bg-purple-600 px-6 py-3 text-xs font-bold text-white hover:bg-purple-500 transition-colors"
          >
            Voltar para a loja
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
            FINALIZAR COMPRA
          </span>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight sm:text-4xl mt-0.5">
            Checkout & Delivery Express
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Preencha seus dados de entrega para calcular a distância e gerar o pedido direto no WhatsApp.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form Fields */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Dados Pessoais */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-600 text-[11px] text-white">
                  1
                </span>
                Identificação do Cliente
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nome Completo *</label>
                  <input
                    type="text"
                    placeholder="Ex: João da Silva"
                    {...register('name')}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 focus:border-purple-600 focus:bg-white focus:outline-none"
                  />
                  {errors.name && <p className="text-[11px] font-semibold text-red-600 mt-1">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Telefone com DDD (WhatsApp) *</label>
                  <input
                    type="text"
                    placeholder="(11) 99999-9999"
                    {...register('phone')}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 focus:border-purple-600 focus:bg-white focus:outline-none"
                  />
                  {errors.phone && <p className="text-[11px] font-semibold text-red-600 mt-1">{errors.phone.message}</p>}
                </div>
              </div>
            </div>

            {/* 2. Endereço de Entrega & Cálculo Automático */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-600 text-[11px] text-white">
                  2
                </span>
                Endereço de Entrega & Distância
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">CEP *</label>
                  <input
                    type="text"
                    placeholder="00000-000"
                    {...register('cep')}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 font-mono focus:border-purple-600 focus:bg-white focus:outline-none"
                  />
                  {errors.cep && <p className="text-[11px] font-semibold text-red-600 mt-1">{errors.cep.message}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Rua / Logradouro *</label>
                  <input
                    type="text"
                    placeholder="Ex: Av. Paulista"
                    {...register('street')}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 focus:border-purple-600 focus:bg-white focus:outline-none"
                  />
                  {errors.street && <p className="text-[11px] font-semibold text-red-600 mt-1">{errors.street.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Número *</label>
                  <input
                    type="text"
                    placeholder="1000"
                    {...register('number')}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 focus:border-purple-600 focus:bg-white focus:outline-none"
                  />
                  {errors.number && <p className="text-[11px] font-semibold text-red-600 mt-1">{errors.number.message}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Complemento (Apto, Bloco)</label>
                  <input
                    type="text"
                    placeholder="Apto 42 / Bloco B"
                    {...register('complement')}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 focus:border-purple-600 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Bairro *</label>
                  <input
                    type="text"
                    placeholder="Bela Vista"
                    {...register('neighborhood')}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 focus:border-purple-600 focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Cidade *</label>
                  <input
                    type="text"
                    placeholder="São Paulo"
                    {...register('city')}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 focus:border-purple-600 focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">UF *</label>
                  <input
                    type="text"
                    placeholder="SP"
                    {...register('state')}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 focus:border-purple-600 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Delivery distance feedback card */}
              {isCalculatingDelivery && (
                <div className="p-3 bg-purple-50 rounded-2xl text-purple-700 text-xs font-semibold flex items-center gap-2 animate-pulse">
                  <Truck className="h-4 w-4" />
                  <span>Buscando endereço e calculando distância com a loja...</span>
                </div>
              )}

              {cepError && (
                <div className="p-3 bg-red-50 rounded-2xl text-red-700 text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{cepError}</span>
                </div>
              )}

              {deliveryInfo && (
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-950 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold flex items-center gap-1.5 text-emerald-800">
                      <MapPin className="h-4 w-4 text-emerald-600" />
                      Distância da Loja: <strong>{deliveryInfo.distanceKm} km</strong>
                    </span>
                    <span className="text-xs font-extrabold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                      Taxa: {formatCurrency(deliveryInfo.deliveryFee)}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-700">
                    <Clock className="h-3.5 w-3.5" />
                    <span>Tempo estimado de entrega: <strong>~{deliveryInfo.estimatedTimeMin} minutos</strong></span>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Forma de Pagamento */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-600 text-[11px] text-white">
                  3
                </span>
                Forma de Pagamento
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label className="flex flex-col items-center justify-center p-4 rounded-2xl border border-slate-200 bg-slate-50 cursor-pointer hover:border-purple-600 transition-all has-[:checked]:border-purple-600 has-[:checked]:bg-purple-50">
                  <input
                    type="radio"
                    value="PIX"
                    {...register('paymentMethod')}
                    className="sr-only"
                  />
                  <QrCode className="h-6 w-6 text-purple-600 mb-2" />
                  <span className="text-xs font-bold text-slate-900">PIX</span>
                  <span className="text-[10px] text-slate-500">Aprovação na hora</span>
                </label>

                <label className="flex flex-col items-center justify-center p-4 rounded-2xl border border-slate-200 bg-slate-50 cursor-pointer hover:border-purple-600 transition-all has-[:checked]:border-purple-600 has-[:checked]:bg-purple-50">
                  <input
                    type="radio"
                    value="CASH"
                    {...register('paymentMethod')}
                    className="sr-only"
                  />
                  <Banknote className="h-6 w-6 text-emerald-600 mb-2" />
                  <span className="text-xs font-bold text-slate-900">Dinheiro</span>
                  <span className="text-[10px] text-slate-500">Pague na entrega</span>
                </label>

                <label className="flex flex-col items-center justify-center p-4 rounded-2xl border border-slate-200 bg-slate-50 cursor-pointer hover:border-purple-600 transition-all has-[:checked]:border-purple-600 has-[:checked]:bg-purple-50">
                  <input
                    type="radio"
                    value="CARD_ON_DELIVERY"
                    {...register('paymentMethod')}
                    className="sr-only"
                  />
                  <CreditCard className="h-6 w-6 text-blue-600 mb-2" />
                  <span className="text-xs font-bold text-slate-900">Maquininha</span>
                  <span className="text-[10px] text-slate-500">Débito ou Crédito</span>
                </label>
              </div>

              {/* Order notes */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Observações do Pedido (Troco para quanto? Instruções de entrega):
                </label>
                <textarea
                  rows={2}
                  placeholder="Ex: Levar troco para R$ 100 / Deixar com o porteiro..."
                  {...register('notes')}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 p-3 text-xs text-slate-900 focus:border-purple-600 focus:bg-white focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-lg space-y-6 sticky top-24">
              <h3 className="text-base font-black text-slate-900 tracking-tight border-b border-slate-100 pb-3 flex items-center justify-between">
                <span>Resumo do Pedido</span>
                <span className="text-xs font-bold text-purple-600">{items.length} itens</span>
              </h3>

              {/* Items List */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-xs text-slate-700">
                    <div className="flex items-center gap-2 min-w-0 pr-2">
                      <span className="font-bold text-purple-600">{item.quantity}x</span>
                      <span className="truncate font-medium">{item.product.name}</span>
                      {item.selectedFlavor && (
                        <span className="text-[10px] font-bold text-purple-700 bg-purple-100 px-1.5 py-0.5 rounded-md">
                          {item.selectedFlavor.name}
                        </span>
                      )}
                    </div>
                    <span className="font-bold text-slate-900 shrink-0">
                      {formatCurrency(item.unitPrice * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Financial Calculation breakdown */}
              <div className="space-y-2 text-xs text-slate-600 pt-4 border-t border-slate-100">
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
                <div className="flex justify-between">
                  <span>Taxa de Entrega</span>
                  <span className="font-semibold text-slate-900">
                    {deliveryInfo ? formatCurrency(deliveryFee) : 'Informe o CEP'}
                  </span>
                </div>

                <div className="flex justify-between text-base font-black text-slate-900 pt-3 border-t border-slate-200">
                  <span>Total a Pagar</span>
                  <span className="text-purple-600 text-lg">{formatCurrency(grandTotal)}</span>
                </div>
              </div>

              {/* WhatsApp Submit Action */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-3 rounded-2xl bg-emerald-600 py-4 text-base font-black text-white shadow-xl shadow-emerald-600/30 hover:bg-emerald-500 disabled:opacity-50 transition-all"
              >
                <Phone className="h-5 w-5 fill-white" />
                <span>{isSubmitting ? 'Gerando Pedido...' : 'Enviar Pedido no WhatsApp'}</span>
              </button>

              <p className="text-[11px] text-center text-slate-400">
                Ao finalizar, o WhatsApp da loja Henri Imports será aberto com a mensagem formatada.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
