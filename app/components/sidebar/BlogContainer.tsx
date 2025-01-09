import React from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/app/components/sidebar/Sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import BlogBreadcrumb from "@/app/components/sidebar/BlogBreadcrumb";
import { CopyButtonScript } from '../blog/CopyButtonScript'
import { getAllPosts } from '@/lib/getPosts';

interface FlexibleLayoutProps {
  children: React.ReactNode;
  home: boolean;
  posts: { title: string, url: string, subheadings: string[] }[];
}
export default function BlogContainer({ children, home, posts }: FlexibleLayoutProps) {
  // Ensure posts is defined before passing to components
  const safePosts = posts || [];

  return (
    <div className="flex">
      <CopyButtonScript />
      <SidebarProvider>
        <AppSidebar posts={safePosts}/>
        <SidebarInset>
          {!home && (
            <header className="flex h-16 shrink-0 items-center gap-2 border-b sticky top-0 z-10 backdrop-blur-[40px] mx-2">
              <div className="max-w-7xl mx-auto w-full">
                <BlogBreadcrumb posts={safePosts}/>
              </div>
            </header>
          )}
          <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="max-w-7xl mx-auto w-full">
              {children}
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}