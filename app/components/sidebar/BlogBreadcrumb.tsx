"use client"

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { SidebarTrigger } from '@/components/ui/sidebar';

export default function BlogBreadcrumb({ posts }: { posts: { title: string, url: string, subheadings: string[] }[] }) {
  const pathname = usePathname();
  const pathParts = pathname?.split('/').filter(Boolean);
  const [hash, setHash] = useState('');

  useEffect(() => {
    const handleHashChange = () => {
      setHash(window.location.hash.slice(1));
    };

    handleHashChange(); // Initial hash
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const slug = pathParts?.[1] || '';
  const currentPost = posts.find(post => post.url === pathname);
  const postTitle = currentPost?.title || '';
  const currentSubheading = currentPost?.subheadings.find(heading => 
    heading.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-') === hash
  );

  return (
    <div className="flex items-center gap-4 px-4">
      <SidebarTrigger />
      <div className="h-6 w-[1px] bg-neutral-800" />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink href="/blog">
              Blog
            </BreadcrumbLink>
          </BreadcrumbItem>
          {postTitle && (
            <>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href={`/blog/${slug}`}>
                  {postTitle}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}
          {currentSubheading && (
            <>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/blog/${slug}#${hash}`}>
                  {currentSubheading}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}