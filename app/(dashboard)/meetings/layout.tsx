'use client';
import { ReactNode } from 'react';

export default function MeetingLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-background">
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
