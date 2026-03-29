import type { Metadata } from 'next';
import { Montserrat, Open_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-montserrat',
  display: 'swap',
});

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-open-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Meyiswa Training Academy — It\'s All Possible!',
    template: '%s | Meyiswa Training Academy',
  },
  description: 'SETA-accredited training and qualifications in IT, Business, Health & Safety, HR and Retail. 60+ NQF-registered qualifications. B-BBEE Level 1 EME. Based in Soweto.',
  keywords: ['SETA accredited training', 'NQF qualifications', 'learnerships South Africa', 'MICT SETA', 'Soweto training academy', 'Meyiswa Training Academy'],
  openGraph: {
    title: 'Meyiswa Training Academy — It\'s All Possible!',
    description: '60+ SETA-accredited qualifications across IT, Business, Health & Safety, HR and Retail. Register for 2026 intake.',
    siteName: 'Meyiswa Training Academy',
    locale: 'en_ZA',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${openSans.variable}`}>
      <body className="antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
