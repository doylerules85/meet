import { generateRoomId } from '@/lib/client-utils';
import '../../styles/globals.css';
import '@livekit/components-styles';
import '@livekit/components-styles/prefabs';
import type { Metadata, Viewport } from 'next';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';
import { Navigation } from '@/components/navigation';

export const metadata: Metadata = {
  title: {
    default: 'Teach Teach | Teacher collaboration platform',
    template: '%s',
  },
  description:
    'Teach Teach is a teacher collaboration platform that allows teachers to connect with each other and share resources.',
  twitter: {
    creator: '@teachteach',
    site: '@teachteach',
    card: 'summary_large_image',
  },
  openGraph: {
    url: 'https://teachteach.org',
    images: [
      {
        url: 'https://teachteach.org/images/teachteach-open-graph.png',
        width: 2000,
        height: 1000,
        type: 'image/png',
      },
    ],
    siteName: 'Teach Teach',
  },
  icons: {
    icon: {
      rel: 'icon',
      url: '/favicon.ico',
    },
    apple: [
      {
        rel: 'apple-touch-icon',
        url: '/images/livekit-apple-touch.png',
        sizes: '180x180',
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: '#070707',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen relative">
        <header className="sticky top-0 w-full z-20 bg-background">
          <Navigation />
        </header>
        <Toaster />
        <div className="flex-1 w-full">{children}</div>
        <footer className="w-full z-10 bg-neutral-900 py-2 mt-auto">
          <div className="mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex gap-4">
              <Link href="/terms" className="text-sm text-accent hover:text-primary">
                Terms
              </Link>
              <Link href="/privacy" className="text-sm text-accent hover:text-primary">
                Privacy
              </Link>
              <Link href="/contact" className="text-sm text-accent hover:text-primary">
                Contact
              </Link>
            </div>
            <div className="">
              <p className="text-sm text-accent">
                Teach Teach. All rights reserved. &copy; {new Date().getFullYear()}
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
