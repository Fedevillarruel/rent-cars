import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import DemoModal from '@/components/DemoModal';
import { LangProvider } from '@/lib/i18n';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'MiamiDrive — Car Rentals in Miami',
  description: 'Alquila los mejores autos en Miami. Proceso 100% online, entregas en aeropuerto y toda la ciudad. Demo desarrollado por Fedini.',
  keywords: 'rent car miami, alquiler autos miami, car rental miami, cars miami',
  openGraph: {
    title: 'MiamiDrive — Car Rentals in Miami',
    description: 'Alquila los mejores autos en Miami. Proceso 100% online, entregas en aeropuerto.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        <LangProvider>
          <Header />
          <DemoModal />
          <main>{children}</main>
          <Footer />
        </LangProvider>
      </body>
    </html>
  );
}
