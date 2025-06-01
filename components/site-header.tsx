'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';

export function SiteHeader() {
  const pathname = usePathname();

  const navMain: {
    title: string;
    url: string;
  }[] = [
    {
      title: 'Dashboard',
      url: '/dashboard',
    },
    {
      title: 'New Meeting',
      url: '/meetings/new',
    },
    {
      title: 'Meetings',
      url: '/meetings',
    },
    {
      title: 'Resources',
      url: '/resources',
    },
  ];

  // Extract the title from the pathname
  const pathSegment = pathname.split('/').filter(Boolean).pop();
  const title = pathSegment && navMain.find((item) => item.url === pathname)?.title;

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1 text-accent-foreground" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4 bg-accent-foreground"
        />
        <h1 className="text-base font-medium text-foreground uppercase tracking-wider">{title}</h1>
      </div>
    </header>
  );
}
