import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkImages from 'remark-images';
import remarkEmoji from 'remark-emoji';
import remarkMath from 'remark-math';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeKatex from 'rehype-katex';
import BlogContainer from '@/app/components/sidebar/BlogContainer';
import 'katex/dist/katex.min.css';
import { visit } from 'unist-util-visit';
import '../../components/blog/wp-dark.css';
import { getAllPosts } from '@/lib/getPosts';

const posts = await getAllPosts();

export default async function Post({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  
  const postsDirectory = path.join(process.cwd(), 'posts');
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  try {
    const fileContents = await fs.readFile(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    const processedContent = await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkMath)
      .use(remarkImages)
      .use(remarkEmoji)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeRaw)
      .use(rehypeKatex)
      .use(rehypeSlug)
      .use(rehypeAutolinkHeadings)
      .use(rehypeHighlight, {
        detect: true,
        ignoreMissing: true,
      })
      .use(rehypeStringify)
      .process(matterResult.content);

    const contentHtml = processedContent.toString();

    return (
      <BlogContainer home={false} posts={posts}>
        <article className="flex h-full flex-col pb-16 pt-16">
          <div className="flex-auto justify-start max-w-2xl lg:max-w-3xl lg:ml-24">
            <h3 className="text-sm font-light mt-2 text-neutral-400">{matterResult.data.date}</h3>
            <h1 className="text-5xl font-bold mt-4">{matterResult.data.title}</h1>
            {matterResult.data.subtitle && (
              <h2 className="text-xl font-md mt-4 text-neutral-400">{matterResult.data.subtitle}</h2>
            )}
            <hr className="my-4 border-neutral-800" />
            <div className='h-4'></div>

            <div dangerouslySetInnerHTML={{ __html: contentHtml }} 
                    className="prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl 
                    prose-h1:font-bold prose-h2:font-semibold prose-h3:font-medium prose-h4:font-bold
                    prose-h1:my-6 prose-h2:my-4 prose-h3:my-4 prose-h4:my-4 prose-p:my-2
                    prose-headings:text-white prose-hr:my-6
                    prose-pre:bg-neutral-800 prose-pre:rounded-[0.5rem]
                    prose-code:bg-neutral-800 prose-code:rounded-[0.5rem] prose-code:px-2 prose-code:py-1 prose-code:my-2  prose-code:text-sm
                    prose-a:text-white prose-a:underline prose-a:decoration-white/75 prose-a:underline-offset-4 hover:prose-a:decoration-white prose-a:transition-all
                    prose-ul:list-none prose-ul:pl-0
                    [&_ul_li]:relative [&_ul_li]:pl-7
                    [&_ul_li:before]:content-['•'] [&_ul_li:before]:absolute [&_ul_li:before]:pl-2
                    [&_ul_li:before]:left-0 [&_ul_li:before]:text-white
                    [&_ol_li]:relative [&_ol_li]:pl-7
                    [&_ol_li:before]:absolute [&_ol_li:before]:left-0 
                    [&_ol_li:before]:text-white [&_ol_li:before]:content-[counter(list-item)'.'] [&_ol_li:before]:pl-1
                    prose-table:overflow-hidden prose-table:w-full prose-table:rounded-[0.5rem]
                    prose-table:border-separate prose-table:border-spacing-0 prose-table:border prose-table:border-neutral-800
                    prose-td:border-[0.5px] prose-td:border-neutral-800 prose-td:p-2
                    prose-th:border-[0.5px] prose-th:border-neutral-800 prose-th:p-1
                    prose-th:bg-white/5
                    prose-img:rounded-[0.5rem] prose-img:my-4 prose-img:w-full
                    [&_.task-list-item]:list-none [&_.task-list-item]:pl-0
                    [&_.task-list-item]:before:content-none
                    [&_.task-list-item_input]:mr-2 [&_.task-list-item_input]:ml-1
                    [&_.task-list-item_input]:accent-white
                    prose-blockquote:border-l-2 prose-blockquote:border-neutral-800 prose-blockquote:pl-4 prose-blockquote:my-4 prose-blockquote:text-neutral-400 prose-blockquote:rounded-md
                    "/>
            <footer className="mt-16 flex items-center justify-between border-t border-neutral-800 pt-4">
              <div className="text-sm text-neutral-400">Copyright © 2025 William Pan. All rights reserved.</div>
              <div className="flex space-x-4">
                <a href="https://x.com/thewilliampan" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/-william-pan/" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/>
                  </svg>
                </a>
              </div>
            </footer>
          </div>
        </article>
      </BlogContainer>
    );
  } catch (error) {
    throw new Error('Post not found');
  }
}