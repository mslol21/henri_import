'use client';

import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from '@/contexts/ConfigContext';
import { CartProvider } from '@/contexts/CartContext';
import { StoreConfigData } from '@/types';

export function Providers({
  children,
  initialConfig,
}: {
  children: React.ReactNode;
  initialConfig?: StoreConfigData | null;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes cache
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider initialConfig={initialConfig}>
        <CartProvider>{children}</CartProvider>
      </ConfigProvider>
    </QueryClientProvider>
  );
}
