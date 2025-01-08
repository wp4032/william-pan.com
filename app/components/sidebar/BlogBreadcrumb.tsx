"use client"

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { SidebarTrigger } from '@/components/ui/sidebar';

export default function BlogBreadcrumb() {
  const pathname = usePathname();
  const pathParts = pathname?.split('/').filter(Boolean);
  const [hash, setHash] = useState('');

  useEffect(() => {
    setHash(window.location.hash.slice(1));
  }, []);

  // Assuming the structure is /blog/[slug]#subheading
  const slug = pathParts?.[1] || '';
  const subheading = hash || '';

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
          {slug && (
            <>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href={`/blog/${slug}`}>
                  {slug}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}
          {subheading && (
            <>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/blog/${slug}#${subheading}`}>
                  {subheading}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}