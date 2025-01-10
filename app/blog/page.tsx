import BlogContainer from "@/app/components/sidebar/BlogContainer";
import { getAllPosts } from '@/lib/getPosts';
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image";
import { notFound } from 'next/navigation';

const posts = getAllPosts();

export default function BlogHomePage() {
  if (!posts || posts.length === 0) {
    notFound();
  }

  const top3Posts = [...posts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <BlogContainer home={true} posts={posts} collaspsible={false}>
      <div className="text-white p-6 md:p-8 lg:p-12">
        {/* Header */}
        <header className="mb-8 md:mb-8">
          <h1 className="mt-4 text-5xl font-bold mb-2">Blog</h1>
          <p className="text-gray-400 mt-2">Some thoughts worth sharing</p>
        </header>

        {/* Featured Post */}
        <Card className="border-zinc-800 hover:border-zinc-400 mb-8 overflow-hidden rounded-2xl transition-colors">
          <a href={`/blog/${top3Posts[0].slug}`} className="block group">
            <div className="grid lg:grid-cols-2 gap-0 lg:gap-6">
              <div className="relative aspect-[16/9] md:aspect-auto m-4">
                <Image
                  src={top3Posts[0].image}
                  alt="Featured post cover"
                  width={600}
                  height={400}
                  className="object-cover w-full h-full rounded-[0.5rem]"
                  priority
                />
              </div>
              <div className="p-6">
                <div className="font-mono text-gray-400 mb-4 text-sm">{top3Posts[0].date}</div>
                <h2 className="text-3xl font-bold mb-4 group-hover:text-gray-300 transition-colors">
                  {top3Posts[0].title}
                </h2>
                <p className="text-gray-400 mb-8">
                  {top3Posts[0].subtitle}
                </p>
                <div className="flex items-center gap-3">
                  <div>
                    <div className="text-sm">By William Pan</div>
                    <div className="text-xs text-gray-400">{top3Posts[0].minutes} minutes read</div>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </Card>

        {/* Featured Section */}
        {(top3Posts[1] || top3Posts[2]) && (
          <section>
            <h2 className="text-2xl font-bold mb-4">Featured</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {top3Posts[1] && (
                <Card className="border-zinc-800 hover:border-zinc-400 rounded-2xl transition-colors">
                  <CardContent className="p-6">
                    <a href={`/blog/${top3Posts[1].slug}`} className="block group">
                      <div className="font-mono text-gray-400 mb-4 text-sm">{top3Posts[1].date}</div>
                      <h3 className="text-2xl font-bold mb-2 group-hover:text-gray-300 transition-colors">
                        {top3Posts[1].title}
                      </h3>
                      <p className="text-gray-400 mb-8">
                        {top3Posts[1].subtitle}
                      </p>
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="text-sm">By William Pan</div>
                          <div className="text-xs text-gray-400">{top3Posts[1].minutes} minutes read</div>
                        </div>
                      </div>
                    </a>
                  </CardContent>
                </Card>
              )}

              {top3Posts[2] && (
                <Card className="border-zinc-800 hover:border-zinc-400  rounded-2xl transition-colors">
                  <CardContent className="p-6">
                    <a href={`/blog/${top3Posts[2].slug}`} className="block group">
                      <div className="font-mono text-gray-400 mb-4 text-sm">{top3Posts[2].date}</div>
                      <h3 className="text-2xl font-bold mb-4 group-hover:text-gray-300 transition-colors">
                        {top3Posts[2].title}
                      </h3>
                      <p className="text-gray-400 mb-8">
                        {top3Posts[2].subtitle}
                      </p>
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="text-sm">By William Pan</div>
                          <div className="text-xs text-gray-400">{top3Posts[2].minutes} minutes read</div>
                        </div>
                      </div>
                    </a>
                  </CardContent>
                </Card>
              )}
            </div>
          </section>
        )}
      </div>
      <footer className="mt-16 flex items-center justify-between border-t border-neutral-800 pt-4 mx-12 mb-16">
        <div className="text-xs md:text-sm text-neutral-400">Copyright © 2025 William Pan. <br className="md:hidden visible" /> All rights reserved.</div>
        <div className="flex space-x-4">
          <a href="https://x.com/thewilliampan" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors">
            <svg viewBox="0 0 24 24" width="16" height="16" className="w-4 h-4 md:w-5 md:h-5" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/-william-pan/" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors">
            <svg viewBox="0 0 24 24" width="16" height="16" className="w-4 h-4 md:w-5 md:h-5" fill="currentColor">
              <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/>
            </svg>
          </a>
        </div>
      </footer>
    </BlogContainer>
  );
}