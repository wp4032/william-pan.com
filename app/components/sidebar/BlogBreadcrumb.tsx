"use client"

import { usePathname, useSearchParams } from 'next/navigation';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";

export default function BlogBreadcrumb() {
  const pathname = usePathname();
  const pathParts = pathname?.split('/').filter(Boolean);
  const hash = typeof window !== 'undefined' ? window.location.hash.slice(1) : '';

  // Assuming the structure is /blog/[slug]#subheading
  const slug = pathParts?.[1] || '';
  const subheading = hash || '';

  return (
    <div className="flex items-center gap-2 px-6">
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
                {hash ? (
                  <BreadcrumbLink href={`/blog/${slug}`}>
                    {slug}
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{slug}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
            </>
          )}
          {subheading && (
            <>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>{subheading}</BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}