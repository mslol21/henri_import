import React from 'react';
import { getProductBySlug } from '@/actions/products';
import { FlavorSelector } from '@/components/shop/FlavorSelector';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Home, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-slate-50 min-h-screen py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link href="/" className="flex items-center gap-1 hover:text-purple-600">
            <Home className="h-3.5 w-3.5" />
            <span>Início</span>
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
          <Link href={`/search?category=${product.category?.slug}`} className="hover:text-purple-600">
            {product.category?.name || 'Categoria'}
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
          <span className="text-slate-900 truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Product Details Container */}
        <div className="rounded-3xl bg-white p-6 sm:p-10 border border-slate-200/80 shadow-xs">
          <FlavorSelector product={product} />
        </div>

        {/* Information Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-slate-200/80">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600 shrink-0">
              <Truck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Entrega via Delivery Express</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Calculada pelo CEP com recebimento rápido no mesmo dia.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-slate-200/80">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600 shrink-0">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Produto 100% Original</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Adquirido diretamente com os fabricantes autorizados.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-slate-200/80">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600 shrink-0">
              <RotateCcw className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Suporte Dedicado</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Atendimento em tempo real diretamente pelo WhatsApp.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
