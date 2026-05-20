import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/lib/auth-context';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  metadataBase: new URL('https://docappoint.vercel.app'),
  title: {
    template: '%s | DocAppoint',
    default: 'DocAppoint - Book Doctor Appointments Online',
  },
  description: 'DocAppoint is a modern doctor appointment booking system. Browse top-rated doctors, view details, and book appointments with ease. Secure authentication and real-time management.',
  keywords: ['doctor appointment', 'healthcare', 'medical booking', 'online doctor', 'appointment system'],
  authors: [{ name: 'DocAppoint' }],
  openGraph: {
    title: 'DocAppoint - Book Doctor Appointments Online',
    description: 'Find and book appointments with top-rated doctors. Easy, fast, and secure healthcare booking platform.',
    url: 'https://docappoint.vercel.app',
    siteName: 'DocAppoint',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'DocAppoint - Healthcare Booking Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DocAppoint - Book Doctor Appointments Online',
    description: 'Find and book appointments with top-rated doctors.',
    images: ['https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=630&fit=crop'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      maxSnippet: -1,
      maxImagePreview: 'large',
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        <ScrollToTop />
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#0f172a',
                color: '#fff',
                borderRadius: '12px',
                padding: '16px',
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
