import { Space_Grotesk, Inter } from 'next/font/google';
import './globals.css';
import type { Metadata } from 'next';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space',
  weight: ['700', '500'],
  preload: true,
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
});

export const metadata: Metadata = {
  title: 'Megatron | Financialize Reality',
  description: 'Trade what moves the world. AI-powered markets for every data trend. Join the waitlist for early access.',
  keywords: ['megatron', 'trading', 'AI markets', 'prediction markets', 'data trading'],
  authors: [{ name: 'Megatron Core Team' }],
  openGraph: {
    title: 'Megatron | Financialize Reality',
    description: 'Trade what moves the world. AI-powered markets for every data trend.',
    type: 'website',
    siteName: 'Megatron',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Megatron | Financialize Reality',
    description: 'Trade what moves the world. AI-powered markets for every data trend.',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="font-inter antialiased bg-void text-white overflow-x-hidden scroll-smooth">
        {children}
      </body>
    </html>
  );
}
