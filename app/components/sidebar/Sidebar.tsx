import * as React from "react"
import { GalleryVerticalEnd } from "lucide-react"
import Image from "next/image"
import fs from 'fs';
import path from 'path';

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

function getAllPosts() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const allPosts: {title: string, url: string}[] = [];

  const files = fs.readdirSync(postsDirectory);

  files.forEach(file => {
    if (file.endsWith('.md')) {
      const id = file.replace(/\.md$/, '');
      allPosts.push({
        title: id,
        url: `/blog/${id}`,
      });
    }
  });

  return allPosts;
}

const data = {
  posts: getAllPosts()
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
            {data.posts.map((post) => (
              <SidebarMenuItem key={post.title}>
                <SidebarMenuButton asChild>
                  <a href={post.url} className="font-medium">
                    {post.title}
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
