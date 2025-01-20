"use client"

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { SidebarTrigger } from '@/components/ui/sidebar';

export default function BlogBreadcrumb({ posts }: { posts: { title: string, url: string, subheadings: string[], sidebar: string }[] }) {
  const pathname = usePathname();
  const pathParts = pathname?.split('/').filter(Boolean);
  const [currentHeading, setCurrentHeading] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const headings = document.querySelectorAll('h2');
      const scrollPosition = window.scrollY + 200; // Offset to account for header

      // Reset currentHeading if scrolled to top
      if (window.scrollY < 100) {
        setCurrentHeading('');
        return;
      }

      for (let i = headings.length - 1; i > 0; i--) {
        const heading = headings[i];
        if (heading.offsetTop <= scrollPosition) {
          setCurrentHeading(heading.textContent || '');
          break;
        }
      }
    };

    handleScroll(); // Initial position
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const slug = pathParts?.[1] || '';
  const currentPost = posts.find(post => post.url === pathname);
  const postTitle = currentPost?.sidebar || '';

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
          {currentHeading && (
            <>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbLink href={`#${currentHeading.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-')}`}>
                  {currentHeading}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}