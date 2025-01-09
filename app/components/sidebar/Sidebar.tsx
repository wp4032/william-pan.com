"use client"

import * as React from "react"
import { GalleryVerticalEnd, ChevronDown } from "lucide-react"
import Image from "next/image"
import { usePathname } from 'next/navigation';
import { getAllPosts } from '@/lib/getPosts';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

function sanitizeForUrl(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export function AppSidebar({ posts, ...props }: { posts: { title: string, url: string, subheadings: string[] }[] }) {
  const pathname = usePathname();

  React.useEffect(() => {
    const adjustScrollPosition = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          window.scrollTo({
            top: element.offsetTop - 200,
            behavior: 'smooth'
          });
        }
      }
    };

    adjustScrollPosition();

    window.addEventListener('hashchange', adjustScrollPosition);

    return () => {
      window.removeEventListener('hashchange', adjustScrollPosition);
    };
  }, []);

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Image src="/favicon.ico" alt="Favicon" width={16} height={16} />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">William Pan</span>
                  <span className="">Blog</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <hr className="-mt-2 border-sidebar-border" />
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/blog" className="font-medium font-bold">
                  Welcome
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <hr className="my-2 border-sidebar-border" />
            </SidebarMenuItem>
            {posts.map((post) => (
              post.subheadings.length > 0 ? (
                <Collapsible key={post.title} className="group/collapsible" defaultOpen={pathname === post.url}>
                  <SidebarMenuItem>

                    <SidebarMenuButton>
                      <div className="font-medium flex items-center w-full">
                        <a href={post.url} className="flex-grow">
                          {post.title}
                        </a>
                        <CollapsibleTrigger asChild>
                          <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </CollapsibleTrigger>
                      </div>
                    </SidebarMenuButton>
                    
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {post.subheadings.map((heading, index) => (
                          <SidebarMenuSubItem key={index}>
                            <SidebarMenuSubButton asChild>
                              <a href={`${post.url}#${sanitizeForUrl(heading)}`} className="text-sm">
                                {heading}
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ) : (
                <SidebarMenuItem key={post.title}>
                  <SidebarMenuButton asChild>
                    <a href={post.url} className="font-medium">
                      {post.title}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
