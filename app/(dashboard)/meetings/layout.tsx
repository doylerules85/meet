'use client';
import { ReactNode } from 'react';

export default function MeetingLayout({ children }: { children: ReactNode }) {
  return (
    <section className="min-h-screen bg-background">
      <div className="flex-1">{children}</div>
    </section>
  );
}
