export interface OrderWhatsAppItem {
  productName: string;
  flavorName?: string;
  quantity: number;
  price: number;
}

export interface OrderWhatsAppPayload {
  orderNumber?: number;
  clientName: string;
  clientPhone: string;
  addressText: string;
  items: OrderWhatsAppItem[];
  notes?: string;
  distanceKm?: number;
  deliveryFee: number;
  subtotal: number;
  total: number;
  paymentMethod: string;
  storePhone: string;
}

export function buildWhatsAppMessage(payload: OrderWhatsAppPayload): string {
  const paymentLabels: Record<string, string> = {
    PIX: 'PIX',
    CASH: 'Dinheiro',
    CARD_ON_DELIVERY: 'Cartão na Entrega',
  };

  const paymentStr = paymentLabels[payload.paymentMethod] || payload.paymentMethod;

  const itemsList = payload.items
    .map((item) => {
      const flavorStr = item.flavorName ? ` | Sabor: ${item.flavorName}` : '';
      return `• *${item.productName}*${flavorStr}\n  Qtd: ${item.quantity}x | Valor: R$ ${(
        item.price * item.quantity
      ).toFixed(2)}`;
    })
    .join('\n\n');

  const deliveryStr =
    payload.deliveryFee > 0
      ? `R$ ${payload.deliveryFee.toFixed(2)} (${payload.distanceKm ? payload.distanceKm + ' km' : 'Entrega por Delivery'})`
      : 'Grátis';

  const message = `🔥 *Novo Pedido Henri Imports* ${payload.orderNumber ? `#${payload.orderNumber}` : ''}

👤 *Cliente:* ${payload.clientName}
📱 *Telefone:* ${payload.clientPhone}
📍 *Endereço:* ${payload.addressText}

🛍️ *Produtos:*
${itemsList}

${payload.notes ? `📝 *Observação:* ${payload.notes}\n` : ''}🚚 *Entrega:* ${deliveryStr}
💰 *Subtotal:* R$ ${payload.subtotal.toFixed(2)}
💵 *Total:* R$ ${payload.total.toFixed(2)}
💳 *Forma de pagamento:* ${paymentStr}

Obrigado por comprar na Henri Imports! Acompanhe seu pedido pelo WhatsApp.`;

  return message;
}

export function getWhatsAppUrl(payload: OrderWhatsAppPayload): string {
  const cleanPhone = payload.storePhone.replace(/\D/g, '');
  const message = buildWhatsAppMessage(payload);
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
