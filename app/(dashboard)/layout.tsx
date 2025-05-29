import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import '../../styles/globals.css';
import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';
export const metadata = {
  title: 'Teach Teach',
  description: 'Teach Teach',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SidebarProvider
          style={
            {
              '--sidebar-width': 'calc(var(--spacing) * 72)',
              '--header-height': 'calc(var(--spacing) * 12)',
            } as React.CSSProperties
          }
        >
          <AppSidebar variant="inset" />
          <SidebarInset>
            <SiteHeader />
            <div className="flex flex-1 flex-col">
              <div className="@container/main flex flex-1 flex-col gap-6">
                <main className="flex flex-col gap-8 py-4 md:gap-10 md:py-6 px-4 lg:px-6">
                  {children}
                </main>
              </div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
