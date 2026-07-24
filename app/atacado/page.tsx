import React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import WholesaleLoginForm from '@/components/wholesale/WholesaleLoginForm';

export const metadata = {
  title: 'Acesso Atacado | Henri Imports',
};

export default async function WholesalePage() {
  const cookieStore = await cookies();
  const isWholesale = cookieStore.get('wholesale_auth')?.value === 'true';

  if (isWholesale) {
    redirect('/?atacado=true');
  }

  const config = await db.storeConfig.findUnique({
    where: { id: 'default' },
    select: { name: true, wholesalePassword: true }
  });

  const hasWholesaleConfigured = !!config?.wholesalePassword;

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-8 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-600 text-white mx-auto shadow-lg shadow-purple-600/30">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-package-check"><path d="m16 16 2 2 4-4"/><path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"/><path d="m7.5 4.27 9 5.15"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" x2="12" y1="22" y2="12"/></svg>
          </div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-slate-900">Portal do Atacado</h1>
          <p className="text-xs text-purple-600 font-semibold">{config?.name || 'Henri Imports'}</p>
        </div>

        {!hasWholesaleConfigured ? (
          <div className="text-center p-4 bg-orange-50 border border-orange-200 rounded-2xl text-orange-800 text-sm font-semibold">
            O ambiente de atacado não está ativado no momento.
          </div>
        ) : (
          <WholesaleLoginForm />
        )}
      </div>
    </div>
  );
}
