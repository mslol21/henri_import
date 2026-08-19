'use client';

import React, { useState } from 'react';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Printer, X, Copy, Check, Bluetooth, Share2 } from 'lucide-react';

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
  client: { name: string; phone: string };
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
  paymentMethod: string;
  notes?: string | null;
  status: string;
  createdAt: string;
}

export default function ThermalPrintModal58mm({
  order,
  storeName = 'HENRI IMPORTS TABACARIA & VAPES',
  onClose,
}: {
  order: OrderUI;
  storeName?: string;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const [btStatus, setBtStatus] = useState<string | null>(null);

  // Format plain text representation for ESC/POS / Bluetooth printing apps
  const generatePlainTextReceipt = () => {
    const divider = '--------------------------------';
    const doubleDivider = '================================';
    const dateStr = formatDate(order.createdAt);

    let itemsList = '';
    order.items.forEach((item) => {
      itemsList += `${item.quantity}x ${item.productName.toUpperCase()}\n`;
      if (item.flavorName) {
        itemsList += `   SABOR: ${item.flavorName.toUpperCase()}\n`;
      }
      itemsList += `   VALOR: ${formatCurrency(item.price * item.quantity)}\n`;
    });

    const addrStr = `${order.address.street}, ${order.address.number}${
      order.address.complement ? ` - ${order.address.complement}` : ''
    }\n${order.address.neighborhood} - ${order.address.city}/${order.address.state}\nCEP: ${order.address.cep}`;

    return `${doubleDivider}
    ${storeName.toUpperCase()}
${doubleDivider}
PEDIDO: #${order.number}
DATA: ${dateStr}
STATUS: ${order.status}
${divider}
CLIENTE: ${order.client.name.toUpperCase()}
FONE: ${order.client.phone}
${divider}
ENDERECO DE ENTREGA:
${addrStr}
${order.address.distanceKm ? `DISTANCIA: ~${order.address.distanceKm} KM\n` : ''}${divider}
ITENS SOLICITADOS:
${itemsList}${divider}
SUBTOTAL:             ${formatCurrency(order.subtotal)}
TAXA DE FRETE:        ${formatCurrency(order.deliveryFee)}
TOTAL GERAL:          ${formatCurrency(order.total)}
${divider}
FORMA DE PAGAMENTO:   ${order.paymentMethod.toUpperCase()}
${order.notes ? `OBS: ${order.notes.toUpperCase()}\n` : ''}${doubleDivider}
  OBRIGADO PELA PREFERENCIA!
${doubleDivider}

`;
  };

  const handleNativePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const text = generatePlainTextReceipt();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  // Direct Web Bluetooth Printer Connection for iGET / 58mm printers
  const handleBluetoothPrint = async () => {
    if (!('bluetooth' in navigator)) {
      alert('Seu navegador não suporta a API Web Bluetooth. Utilize o botão "Imprimir Comprovante" ou "Copiar Texto".');
      return;
    }

    try {
      setBtStatus('Procurando impressora iGET Bluetooth...');
      const device = await (navigator as any).bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: ['000018f0-0000-1000-8000-00005f9b34fb', '49535343-fe7d-4ae5-8fa9-9fafd205e455'],
      });

      setBtStatus(`Conectando a ${device.name || 'Impressora 58mm'}...`);
      const server = await device.gatt.connect();

      // Find writable characteristic
      const services = await server.getPrimaryServices();
      let targetCharacteristic: any = null;

      for (const service of services) {
        const characteristics = await service.getCharacteristics();
        for (const char of characteristics) {
          if (char.properties.write || char.properties.writeWithoutResponse) {
            targetCharacteristic = char;
            break;
          }
        }
        if (targetCharacteristic) break;
      }

      if (!targetCharacteristic) {
        throw new Error('Não foi possível encontrar o canal de escrita da impressora Bluetooth.');
      }

      setBtStatus('Enviando dados de impressão...');
      const encoder = new TextEncoder();
      const data = encoder.encode(generatePlainTextReceipt());

      // Send in 512 byte chunks
      const chunkSize = 512;
      for (let i = 0; i < data.length; i += chunkSize) {
        const chunk = data.slice(i, i + chunkSize);
        await targetCharacteristic.writeValue(chunk);
      }

      setBtStatus('Impressão enviada com sucesso!');
      setTimeout(() => setBtStatus(null), 4000);
    } catch (err: any) {
      console.error('Bluetooth print error:', err);
      setBtStatus(null);
      alert('Informação de Bluetooth: ' + (err.message || 'Dispositivo cancelado ou não conectado.'));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs overflow-y-auto print:p-0 print:bg-white">
      {/* Modal Box — hidden during native printing except receipt container */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 space-y-6 my-8 print:shadow-none print:p-0 print:my-0 print:w-full">
        {/* Header (Screen only) */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 print:hidden">
          <div className="flex items-center gap-2">
            <Printer className="h-5 w-5 text-purple-600" />
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
              Comprovante Térmico (58mm iGET)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Action Buttons (Screen only) */}
        <div className="space-y-2 print:hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              onClick={handleNativePrint}
              className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-black text-xs px-4 py-3 shadow-lg transition-all"
            >
              <Printer className="h-4 w-4" />
              <span>Imprimir (58mm)</span>
            </button>

            <button
              onClick={handleCopyText}
              className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-4 py-3 transition-all"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4 text-slate-600" />}
              <span>{copied ? 'Copiado!' : 'Copiar Texto'}</span>
            </button>
          </div>

          <button
            onClick={handleBluetoothPrint}
            className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 font-bold text-xs px-4 py-2.5 transition-all"
          >
            <Bluetooth className="h-4 w-4 text-emerald-600" />
            <span>Conectar Impressora Bluetooth (iGET 58mm)</span>
          </button>

          {btStatus && (
            <p className="text-[11px] font-bold text-purple-600 text-center animate-pulse pt-1">
              {btStatus}
            </p>
          )}
        </div>

        {/* 58mm THERMAL RECEIPT VISUAL CONTAINER */}
        <div className="thermal-receipt-container font-mono text-[11px] leading-tight text-black bg-white p-4 border border-slate-300 rounded-2xl shadow-inner mx-auto max-w-[260px] print:max-w-none print:w-[58mm] print:p-0 print:border-none print:shadow-none">
          {/* Custom Print CSS specifically targeting 58mm thermal roll paper */}
          <style jsx global>{`
            @media print {
              body * {
                visibility: hidden;
              }
              .thermal-receipt-container,
              .thermal-receipt-container * {
                visibility: visible;
              }
              .thermal-receipt-container {
                position: absolute;
                left: 0;
                top: 0;
                width: 58mm !important;
                max-width: 58mm !important;
                margin: 0 !important;
                padding: 2mm !important;
                border: none !important;
                font-family: 'Courier New', Courier, monospace !important;
                font-size: 10pt !important;
                color: #000 !important;
              }
              @page {
                size: 58mm auto;
                margin: 0;
              }
            }
          `}</style>

          <div className="text-center font-bold text-xs uppercase mb-1">
            ================================<br />
            {storeName}<br />
            ================================
          </div>

          <div className="my-1.5">
            <strong>PEDIDO:</strong> #{order.number}<br />
            <strong>DATA:</strong> {formatDate(order.createdAt)}<br />
            <strong>STATUS:</strong> {order.status}
          </div>

          <div className="my-1.5 border-t border-dashed border-black pt-1">
            <strong>CLIENTE:</strong> {order.client.name.toUpperCase()}<br />
            <strong>FONE:</strong> {order.client.phone}
          </div>

          <div className="my-1.5 border-t border-dashed border-black pt-1">
            <strong>ENDEREÇO DE ENTREGA:</strong><br />
            {order.address.street}, Nº {order.address.number}
            {order.address.complement ? ` - ${order.address.complement}` : ''}<br />
            {order.address.neighborhood} - {order.address.city}/{order.address.state}<br />
            CEP: {order.address.cep}<br />
            {order.address.distanceKm && <span>DISTÂNCIA: ~{order.address.distanceKm} KM</span>}
          </div>

          <div className="my-1.5 border-t border-dashed border-black pt-1">
            <strong>ITENS SOLICITADOS:</strong>
            <div className="space-y-1 mt-1">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex flex-col">
                  <div className="flex justify-between font-bold">
                    <span>{item.quantity}x {item.productName.toUpperCase()}</span>
                    <span>{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                  {item.flavorName && (
                    <span className="pl-3 text-[10px] text-slate-700">SABOR: {item.flavorName.toUpperCase()}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="my-1.5 border-t border-dashed border-black pt-1 space-y-0.5">
            <div className="flex justify-between">
              <span>SUBTOTAL:</span>
              <span>{formatCurrency(order.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>TAXA FRETE:</span>
              <span>{formatCurrency(order.deliveryFee)}</span>
            </div>
            <div className="flex justify-between font-extrabold text-xs border-t border-black pt-1 mt-1">
              <span>TOTAL GERAL:</span>
              <span>{formatCurrency(order.total)}</span>
            </div>
          </div>

          <div className="my-1.5 border-t border-dashed border-black pt-1">
            <strong>PAGAMENTO:</strong> {order.paymentMethod.toUpperCase()}<br />
            {order.notes && <span><strong>OBS:</strong> {order.notes.toUpperCase()}</span>}
          </div>

          <div className="text-center font-bold text-[10px] uppercase mt-3 pt-1 border-t border-dashed border-black">
            ================================<br />
            OBRIGADO PELA PREFERÊNCIA!<br />
            ================================
          </div>
        </div>
      </div>
    </div>
  );
}
