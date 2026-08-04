import React from 'react';
import { getActivePromotions, getPromoProducts } from '@/actions/promotions';
import { PromotionsView } from '@/components/shop/PromotionsView';

export const metadata = {
  title: 'Central de Promoções & Ofertas | Henri Imports',
  description: 'Confira os cupons de desconto ativos, frete grátis na cidade e produtos com preços promocionais.',
};

export const dynamic = 'force-dynamic';

export default async function PromotionsPage() {
  const promoData = await getActivePromotions();
  const promoProducts = await getPromoProducts();

  return (
    <PromotionsView
      rules={promoData.rules}
      coupons={promoData.coupons}
      banners={promoData.banners}
      promoProducts={promoProducts}
    />
  );
}
