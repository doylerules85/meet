import { generateRoomId } from '@/lib/client-utils';
import '../../styles/globals.css';
import '@livekit/components-styles';
import '@livekit/components-styles/prefabs';
import type { Metadata, Viewport } from 'next';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: {
    default: 'LiveKit Meet | Conference app build with LiveKit open source',
    template: '%s',
  },
  description:
    'LiveKit is an open source WebRTC project that gives you everything needed to build scalable and real-time audio and/or video experiences in your applications.',
  twitter: {
    creator: '@livekitted',
    site: '@livekitted',
    card: 'summary_large_image',
  },
  openGraph: {
    url: 'https://meet.livekit.io',
    images: [
      {
        url: 'https://meet.livekit.io/images/livekit-meet-open-graph.png',
        width: 2000,
        height: 1000,
        type: 'image/png',
      },
    ],
    siteName: 'LiveKit Meet',
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
      { rel: 'mask-icon', url: '/images/livekit-safari-pinned-tab.svg', color: '#070707' },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: '#070707',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body data-lk-theme="default" className="min-h-screen">
        <header className="fixed top-0 left-0 w-full z-20 bg-secondary shadow-md">
          <nav className="mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <Link
              href="/"
              className="text-foreground text-2xl font-bold hover:text-accent-foreground transition-colors"
            >
              Teach Teach
            </Link>
            <ul className="flex flex-wrap gap-4 text-accent-foreground">
              <li>
                <Link href="/blog" className="hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href={`/login`}
                  className="bg-primary text-white px-4 py-2 rounded-md hover:bg-accent-foreground transition-colors"
                >
                  Login
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
