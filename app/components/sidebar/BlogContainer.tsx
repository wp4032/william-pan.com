import React from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/app/components/sidebar/Sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import BlogBreadcrumb from "@/app/components/sidebar/BlogBreadcrumb";
import { CopyButtonScript } from '../blog/CopyButtonScript'

interface FlexibleLayoutProps {
  children: React.ReactNode;
  home: boolean;
}

export default function BlogContainer({ children, home }: FlexibleLayoutProps) {
  return (
    <>
      <CopyButtonScript />
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          {!home && (
            <header className="flex h-16 shrink-0 items-center gap-2 border-b">
              <BlogBreadcrumb />
            </header>
          )}
          <div className="flex flex-1 flex-col gap-4 p-4">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}