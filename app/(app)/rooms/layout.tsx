import '@livekit/components-styles';
import '@livekit/components-styles/prefabs';
import '@/styles/globals.css';

export const metadata = {
  title: 'TeachTeach Room',
  description: 'TeachTeach Room',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
