import React from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/app/components/sidebar/Sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import BlogBreadcrumb from "@/app/components/sidebar/BlogBreadcrumb";
import { CopyButtonScript } from '../blog/CopyButtonScript'

interface FlexibleLayoutProps {
  children: React.ReactNode;
  home: boolean;
  posts?: { title: string, url: string, subheadings: string[], sidebar: string }[];
  collaspsible: boolean;
}
export default function BlogContainer({ children, home, posts, collaspsible }: FlexibleLayoutProps) {
  // Ensure posts is defined before passing to components
  const safePosts = posts || [];

  return (
    <div className="flex min-h-screen">
      <CopyButtonScript />
      <SidebarProvider>
        <AppSidebar posts={safePosts} collaspsible={collaspsible} />
        <SidebarInset className="flex-1 w-full">
          {!home && (
            <header className="flex h-16 shrink-0 items-center gap-2 border-b sticky top-0 z-10 backdrop-blur-[40px] px-4 lg:px-6">
              <div className="w-full max-w-7xl mx-auto">
                <BlogBreadcrumb posts={safePosts}/>
              </div>
            </header>
          )}
          <div className="flex flex-1 flex-col gap-4 pl-4 pr-4 md:pl-6 md:pr-0">
            <div className="w-full max-w-7xl mx-auto">
              {children}
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}