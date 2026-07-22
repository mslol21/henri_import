import React from 'react';
import { Navbar } from '@/components/shop/Navbar';
import { Footer } from '@/components/shop/Footer';
import { CartDrawer } from '@/components/shop/CartDrawer';
import { getStoreConfig } from '@/actions/settings';
import { Providers } from '../providers';

export default async function ShopLayout({ children }: { children: React.ReactNode }) {
  const config = await getStoreConfig();

  return (
    <Providers initialConfig={config}>
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <CartDrawer />
        <Footer />
      </div>
    </Providers>
  );
}
