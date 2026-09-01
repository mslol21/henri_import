'use client';

import React, { useState, useEffect } from 'react';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Printer, X, Copy, Check, Bluetooth, ExternalLink, Info, Share2 } from 'lucide-react';

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

// Helper: Strip accents & non-ASCII characters for 100% thermal printer firmware compatibility
function stripAccents(str: string): string {
  if (!str) return '';
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\x00-\x7F]/g, '');
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
  const [isIOSDevice, setIsIOSDevice] = useState(false);

  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent || '') || 
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
      setIsIOSDevice(isIOS);
    }
  }, []);

  const cleanCurrency = (val: number) => {
    const formatted = formatCurrency(val || 0).replace(/\u00a0/g, ' ');
    return stripAccents(formatted);
  };

  // Generate 32-column formatted pure ASCII text receipt for 58mm thermal paper
  const generatePlainTextReceipt = () => {
    const width = 32;
    const divider = '-'.repeat(width);
    const doubleDivider = '='.repeat(width);
    const dateStr = order?.createdAt ? formatDate(order.createdAt) : '';
    const statusText = STATUS_LABELS[order?.status || 'NEW'] || order?.status || 'NOVO';
    const paymentText = PAYMENT_LABELS[order?.paymentMethod || 'PIX'] || order?.paymentMethod || 'PIX';

    const padCenter = (str: string) => {
      const clean = stripAccents(str);
      const len = clean.length;
      if (len >= width) return clean.substring(0, width);
      const left = Math.floor((width - len) / 2);
      return ' '.repeat(left) + clean;
    };

    const formatLine = (left: string, right: string) => {
      const cLeft = stripAccents(left);
      const cRight = stripAccents(right);
      const spaceNeeded = width - cLeft.length - cRight.length;
      if (spaceNeeded > 0) {
        return cLeft + ' '.repeat(spaceNeeded) + cRight;
      }
      return cLeft + ' ' + cRight;
    };

    let lines: string[] = [];

    // Header
    lines.push(doubleDivider);
    lines.push(padCenter(storeName.toUpperCase()));
    lines.push(doubleDivider);

    // Order Info
    lines.push(`PEDIDO: #${order?.number || '0'}`);
    lines.push(`DATA: ${dateStr}`);
    lines.push(`STATUS: ${statusText.toUpperCase()}`);
    lines.push(divider);

    // Client Info
    const clientName = order?.client?.name ? order.client.name.toUpperCase() : 'CLIENTE';
    const clientPhone = order?.client?.phone ? order.client.phone : '';
    lines.push(`CLIENTE: ${clientName}`);
    if (clientPhone) {
      lines.push(`FONE: ${clientPhone}`);
    }
    lines.push(divider);

    // Address Info - 100% Pure ASCII extraction to prevent thermal printer buffer truncations
    lines.push('ENDERECO DE ENTREGA:');
    const addr = order?.address;
    const streetText = addr?.street && addr.street.trim() !== '' ? addr.street.trim().toUpperCase() : null;
    const cepText = addr?.cep && addr.cep.trim() !== '' ? addr.cep.trim() : null;
    const neighText = addr?.neighborhood && addr.neighborhood.trim() !== '' ? addr.neighborhood.trim().toUpperCase() : null;
    const cityText = addr?.city && addr.city.trim() !== '' ? addr.city.trim().toUpperCase() : null;
    const stateText = addr?.state && addr.state.trim() !== '' ? addr.state.trim().toUpperCase() : null;

    if (streetText || cepText || neighText || cityText) {
      const numText = addr?.number && addr.number.trim() !== '' ? `N ${addr.number.trim()}` : 'S/N';
      lines.push(`${streetText || 'ENDERECO NAO ESPECIFICADO'}, ${numText}`);
      if (addr?.complement && addr.complement.trim() !== '') {
        lines.push(`COMPL: ${addr.complement.trim().toUpperCase()}`);
      }
      if (neighText) {
        lines.push(`BAIRRO: ${neighText}`);
      }
      if (cityText || stateText) {
        lines.push(`CIDADE: ${cityText || ''}${stateText ? '/' + stateText : ''}`);
      }
      if (cepText) {
        lines.push(`CEP: ${cepText}`);
      }
      if (addr?.distanceKm) {
        lines.push(`DISTANCIA: ~${addr.distanceKm} KM`);
      }
    } else {
      lines.push('RETIRADA NA LOJA / ENTREGA A COMBINAR');
    }
    lines.push(divider);

    // Items List
    lines.push('ITENS SOLICITADOS:');
    if (order?.items && order.items.length > 0) {
      order.items.forEach((item) => {
        const qty = item.quantity || 1;
        const priceStr = cleanCurrency((item.price || 0) * qty);
        const itemTitle = `${qty}x ${(item.productName || 'PRODUTO').toUpperCase()}`;
        
        if (stripAccents(itemTitle).length + priceStr.length + 1 > width) {
          lines.push(itemTitle);
          lines.push(formatLine('', priceStr));
        } else {
          lines.push(formatLine(itemTitle, priceStr));
        }

        if (item.flavorName) {
          lines.push(`   SABOR: ${item.flavorName.toUpperCase()}`);
        }
      });
    } else {
      lines.push('NENHUM ITEM');
    }
    lines.push(divider);

    // Totals
    lines.push(formatLine('SUBTOTAL:', cleanCurrency(order?.subtotal || 0)));
    lines.push(formatLine('TAXA FRETE:', cleanCurrency(order?.deliveryFee || 0)));
    lines.push(formatLine('TOTAL GERAL:', cleanCurrency(order?.total || 0)));
    lines.push(divider);

    // Payment & Notes
    lines.push(`PAGAMENTO: ${paymentText.toUpperCase()}`);
    if (order?.notes) {
      lines.push(`OBS: ${order.notes.toUpperCase()}`);
    }
    lines.push(doubleDivider);
    lines.push(padCenter('OBRIGADO PELA PREFERENCIA!'));
    lines.push(doubleDivider);
    lines.push('\n\n');

    // Normalize entire text to pure 7-bit ASCII for 100% thermal printer firmware compatibility
    return lines.map((line) => stripAccents(line)).join('\n');
  };

  const openDedicatedPrintWindow = () => {
    const textReceipt = generatePlainTextReceipt();
    const printWin = window.open('', '_blank');
    if (printWin) {
      printWin.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Comprovante Pedido #${order?.number || ''}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
                margin: 0 auto;
                padding: 4mm 2mm;
                white-space: pre-wrap;
                word-break: break-word;
              }
            </style>
          </head>
          <body>
            <pre>${textReceipt.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
            <script>
              window.onload = function() {
                window.focus();
                window.print();
              };
            </script>
          </body>
        </html>
      `);
      printWin.document.close();
      return true;
    }
    return false;
  };

  const handleNativePrint = () => {
    const success = openDedicatedPrintWindow();
    if (!success) {
      window.print();
    }
  };

  const handleCopyText = () => {
    const text = generatePlainTextReceipt();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  // Direct RawBT / Thermal Printer Deep Link Trigger (Android & iOS)
  const handleRawBTPrint = () => {
    const text = generatePlainTextReceipt();
    const encoded = encodeURIComponent(text);
    // RawBT protocol scheme trigger
    window.location.href = `intent:${encoded}#Intent;scheme=rawbt;package=ru.a404m.rawbtprinter;end;`;
  };

  // Direct Web Bluetooth Printer Connection for iGET / 58mm printers
  const handleBluetoothPrint = async () => {
    if (!('bluetooth' in navigator)) {
      if (isIOSDevice) {
        alert(
          'No iOS (iPhone/iPad), o navegador Safari/Chrome não permite acesso direto ao Bluetooth via Web API.\n\nUtilize o botão "Imprimir (58mm)" para abrir o cupom completo ou "Copiar Texto" para colar no seu app de impressora (RawBT / POS Printer).'
        );
      } else {
        alert('Seu navegador não suporta a API Web Bluetooth. Utilize o botão "Imprimir (58mm)" ou "Copiar Texto".');
      }
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

        {/* iOS Notice Banner */}
        {isIOSDevice && (
          <div className="bg-sky-50 border border-sky-200 rounded-2xl p-3.5 flex items-start gap-3">
            <Info className="h-5 w-5 text-sky-600 shrink-0 mt-0.5" />
            <div className="text-xs text-sky-900 space-y-1">
              <p className="font-bold">No iOS (Chrome / Safari no iPhone/iPad):</p>
              <p className="text-[11px] text-sky-800 leading-snug">
                Clique em <strong className="text-purple-700">Imprimir (58mm)</strong> ou <strong className="text-sky-700">Abrir em Nova Aba</strong> para gerar a página limpa sem cortes, ou <strong className="text-slate-800">Copiar Texto</strong> para seu app de impressão.
              </p>
            </div>
          </div>
        )}

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
              onClick={openDedicatedPrintWindow}
              className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 font-bold text-xs px-4 py-3 transition-all"
            >
              <ExternalLink className="h-4 w-4 text-sky-600" />
              <span>Abrir em Nova Aba</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              onClick={handleCopyText}
              className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-4 py-3 transition-all"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4 text-slate-600" />}
              <span>{copied ? 'Copiado!' : 'Copiar Texto'}</span>
            </button>

            {!isIOSDevice ? (
              <button
                onClick={handleBluetoothPrint}
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 font-bold text-xs px-4 py-2.5 transition-all"
              >
                <Bluetooth className="h-4 w-4 text-emerald-600" />
                <span>Bluetooth Direct</span>
              </button>
            ) : (
              <button
                onClick={handleRawBTPrint}
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 font-bold text-xs px-4 py-2.5 transition-all"
                title="Imprimir via App de Impressora (RawBT)"
              >
                <Printer className="h-4 w-4 text-amber-700" />
                <span>App Impressora</span>
              </button>
            )}
          </div>

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
