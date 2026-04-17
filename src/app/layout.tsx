import type { Metadata, Viewport } from 'next';
import { Anton } from 'next/font/google';
import './globals.css';
import BottomNav from '@/components/layout/BottomNav';
import { AuthProvider } from '@/context/AuthContext';
import { LoginModalProvider } from '@/context/LoginModalContext';
import LoginModal from '@/components/auth/LoginModal';

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Web3 Builders' Summit 2026 | LFBUIDL",
  description: "Official event app for Web3 Builders' Summit — Da Nang, Vietnam, May 24–27, 2026",
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'LFBUIDL 2026',
  },
  openGraph: {
    title: "Web3 Builders' Summit 2026",
    description: 'Da Nang, Vietnam | May 24–27, 2026',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/favicon/favicon.ico', sizes: 'any' },
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/favicon/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#000000',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${anton.variable} h-full`}>
      <body className="min-h-full bg-black text-white">
        <AuthProvider>
          <LoginModalProvider>
            {children}
            <BottomNav />
            <LoginModal />
          </LoginModalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
