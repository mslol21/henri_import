import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Henri Imports | Tabacaria & Vape Shop Premium',
  description:
    'Sua tabacaria e vape shop premium de confiança. Encontre Pods Descartáveis, Vapes, Essências de Narguilé, Carvões e Acessórios com entrega expressa via Delivery e atendimento WhatsApp.',
  keywords: [
    'Henri Imports',
    'Tabacaria',
    'Vape Shop',
    'Pods Descartáveis',
    'Ignite V250',
    'Elf Bar',
    'Essência Zomo',
    'Narguilé',
    'Delivery Tabacaria',
    'São Paulo',
  ],
  authors: [{ name: 'Henri Imports' }],
  manifest: '/manifest.json',
  openGraph: {
    title: 'Henri Imports | Tabacaria & Vape Shop Premium',
    description:
      'As melhores marcas de Pods, Vapes, Essências e Narguilés com entrega rápida e atendimento exclusivo.',
    siteName: 'Henri Imports',
    locale: 'pt_BR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen bg-white text-slate-900 selection:bg-purple-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
