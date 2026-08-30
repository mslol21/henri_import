'use client';

import React, { useState } from 'react';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Printer, X, Copy, Check, Bluetooth } from 'lucide-react';

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

const PAYMENT_LABELS: Record<string, string> = {
  PIX: 'PIX',
  CASH: 'Dinheiro',
  CARD_ON_DELIVERY: 'Cartão na Entrega',
  CARD: 'Cartão de Crédito/Débito',
};

const STATUS_LABELS: Record<string, string> = {
  NEW: 'Novo (Pendente)',
  CONFIRMED: 'Aprovado',
  PREPARING: 'Em Separação',
  SHIPPED: 'Saiu para Entrega',
  DELIVERED: 'Entregue',
  CANCELLED: 'Cancelado',
};

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

  const cleanCurrency = (val: number) => {
    return formatCurrency(val).replace(/\u00a0/g, ' ');
  };

  // Generate 32-column formatted plain text receipt for 58mm thermal paper
  const generatePlainTextReceipt = () => {
    const width = 32;
    const divider = '-'.repeat(width);
    const doubleDivider = '='.repeat(width);
    const dateStr = formatDate(order.createdAt);
    const statusText = STATUS_LABELS[order.status] || order.status;
    const paymentText = PAYMENT_LABELS[order.paymentMethod] || order.paymentMethod;

    const padCenter = (str: string) => {
      const len = str.length;
      if (len >= width) return str.substring(0, width);
      const left = Math.floor((width - len) / 2);
      return ' '.repeat(left) + str;
    };

    const formatLine = (left: string, right: string) => {
      const spaceNeeded = width - left.length - right.length;
      if (spaceNeeded > 0) {
        return left + ' '.repeat(spaceNeeded) + right;
      }
      return left + ' ' + right;
    };

    let lines: string[] = [];

    // Header
    lines.push(doubleDivider);
    lines.push(padCenter(storeName.toUpperCase()));
    lines.push(doubleDivider);

    // Order Info
    lines.push(`PEDIDO: #${order.number}`);
    lines.push(`DATA: ${dateStr}`);
    lines.push(`STATUS: ${statusText.toUpperCase()}`);
    lines.push(divider);

    // Client Info
    lines.push(`CLIENTE: ${order.client.name.toUpperCase()}`);
    lines.push(`FONE: ${order.client.phone}`);
    lines.push(divider);

    // Address Info
    lines.push('ENDERECO DE ENTREGA:');
    lines.push(`${order.address.street.toUpperCase()}, N ${order.address.number}`);
    if (order.address.complement) {
      lines.push(`COMPL: ${order.address.complement.toUpperCase()}`);
    }
    lines.push(`BAIRRO: ${order.address.neighborhood.toUpperCase()}`);
    lines.push(`CIDADE: ${order.address.city.toUpperCase()}/${order.address.state.toUpperCase()}`);
    lines.push(`CEP: ${order.address.cep}`);
    if (order.address.distanceKm) {
      lines.push(`DISTANCIA: ~${order.address.distanceKm} KM`);
    }
    lines.push(divider);

    // Items List
    lines.push('ITENS SOLICITADOS:');
    order.items.forEach((item) => {
      const priceStr = cleanCurrency(item.price * item.quantity);
      const itemTitle = `${item.quantity}x ${item.productName.toUpperCase()}`;
      
      // If item title + price exceeds 32 chars, break onto 2 lines cleanly
      if (itemTitle.length + priceStr.length + 1 > width) {
        lines.push(itemTitle);
        lines.push(formatLine('', priceStr));
      } else {
        lines.push(formatLine(itemTitle, priceStr));
      }

      if (item.flavorName) {
        lines.push(`   SABOR: ${item.flavorName.toUpperCase()}`);
      }
    });
    lines.push(divider);

    // Totals
    lines.push(formatLine('SUBTOTAL:', cleanCurrency(order.subtotal)));
    lines.push(formatLine('TAXA FRETE:', cleanCurrency(order.deliveryFee)));
    lines.push(formatLine('TOTAL GERAL:', cleanCurrency(order.total)));
    lines.push(divider);

    // Payment & Notes
    lines.push(`PAGAMENTO: ${paymentText.toUpperCase()}`);
    if (order.notes) {
      lines.push(`OBS: ${order.notes.toUpperCase()}`);
    }
    lines.push(doubleDivider);
    lines.push(padCenter('OBRIGADO PELA PREFERENCIA!'));
    lines.push(doubleDivider);
    lines.push('\n\n');

    return lines.join('\n');
  };

  const handleNativePrint = () => {
    const textReceipt = generatePlainTextReceipt();
    
    // Create an isolated printable iframe to avoid page clipping or CSS hide issues
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document;
    if (!doc) {
      window.print();
      return;
    }

    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Imprimir Pedido #${order.number}</title>
          <style>
            @page {
              size: 58mm auto;
              margin: 0;
            }
            body {
              font-family: 'Courier New', Courier, monospace;
              font-size: 10pt;
              font-weight: bold;
              color: #000;
              width: 58mm;
              margin: 0;
              padding: 2mm;
              white-space: pre-wrap;
              word-break: break-word;
            }
          </style>
        </head>
        <body>${textReceipt.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</body>
      </html>
    `);
    doc.close();

    setTimeout(() => {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 1000);
    }, 250);
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
      const text = generatePlainTextReceipt();
      const encoder = new TextEncoder();
      const data = encoder.encode(text);

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

  const plainTextDisplay = generatePlainTextReceipt();
  const paymentLabel = PAYMENT_LABELS[order.paymentMethod] || order.paymentMethod;
  const statusLabel = STATUS_LABELS[order.status] || order.status;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs overflow-y-auto print:hidden">
      {/* Modal Box */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 space-y-6 my-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
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

        {/* Action Buttons */}
        <div className="space-y-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              onClick={handleNativePrint}
              className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-black text-xs px-4 py-3 shadow-lg transition-all hover:scale-[1.02]"
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

        {/* 58mm RECEIPT DISPLAY CONTAINER */}
        <div className="font-mono text-[11px] leading-tight text-black bg-white p-4 border border-slate-300 rounded-2xl shadow-inner mx-auto max-w-[260px] whitespace-pre-wrap word-break-break-word select-all">
          {plainTextDisplay}
        </div>
      </div>
    </div>
  );
}
