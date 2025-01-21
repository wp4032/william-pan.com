"use client"

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { SidebarTrigger } from '@/components/ui/sidebar';
import { sanitizeHeadingId } from '@/lib/utils';

export default function BlogBreadcrumb({ posts }: { posts: { title: string, url: string, subheadings: string[], sidebar: string }[] }) {
  const pathname = usePathname();
  const pathParts = pathname?.split('/').filter(Boolean);
  const [currentHeading, setCurrentHeading] = useState('');

  useEffect(() => {
    // Initial scroll adjustment for page load with hash
    const initialScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          const headerOffset = 100;
          setTimeout(() => {
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
              top: offsetPosition,
              behavior: 'instant' // Use 'instant' for initial load to prevent jarring animation
            });
          }, 0); // Small timeout to ensure DOM is ready
        }
      }
    };

    initialScroll();

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

    // Add click handler for breadcrumb links
    const handleBreadcrumbClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      if (link?.href.includes('#')) {
        e.preventDefault();
        const hash = link.href.split('#')[1];
        const element = document.getElementById(hash);
        if (element) {
          const headerOffset = 100; // Adjust this value based on your header height
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });

          // Update URL without triggering scroll
          history.pushState(null, '', `#${hash}`);
        }
      }
    };

    document.addEventListener('click', handleBreadcrumbClick);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleBreadcrumbClick);
    };
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
                <BreadcrumbLink href={`#${sanitizeHeadingId(currentHeading)}`}>
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