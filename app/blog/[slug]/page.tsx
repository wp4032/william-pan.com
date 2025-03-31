import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkImages from 'remark-images';
// import remarkEmoji from 'remark-emoji';
import remarkMath from 'remark-math';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeRaw from 'rehype-raw';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeKatex from 'rehype-katex';
import BlogContainer from '@/app/components/sidebar/BlogContainer';
import 'katex/dist/katex.min.css';
import '../../components/blog/wp-dark.css';
import { getAllPosts } from '@/lib/getPosts';
import { notFound } from 'next/navigation';
import { BlogHeader } from '@/app/components/sidebar/BlogHeader';
import PostNavigation from '@/app/components/blog/PostNavigation';
import { visit } from 'unist-util-visit';
import { Root, Element } from 'hast';
import { BlogContent } from '@/app/components/blog/BlogContent';

const posts = getAllPosts();

interface PageProps {
  params: Promise<{ slug: string }>;
}

const idSlug = () => {
  return (tree: Root) => {
    visit(tree, 'element', (node: Element) => {
      if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(node.tagName)) {
        if (node.properties && node.properties.id) {
          const id = node.properties.id;
          if (typeof id === 'string' && /^\d/.test(id)) {
            node.properties.id = `id-${id}`; // Prepend "id-" if the ID starts with a number
          }
        }
      }
    });
  };
};

// Add this type definition
type CustomComponent = {
  name: string;
  props: Record<string, unknown>;
};

// Add this function to parse custom component syntax
function parseCustomComponent(line: string): CustomComponent | null {
  const match = line.match(/<(\w+)\s*(.*)\/>/);
  if (!match) return null;

  const [, name, propsString] = match;
  const props: Record<string, unknown> = {};
  // Updated regex to handle both JSON-like values in {} and regular string values in ""
  const propMatches = propsString.matchAll(/(\w+)=(?:{([^}]+)}|"([^"]*)")/g);
  
  for (const [, key, jsonValue, stringValue] of propMatches) {
    if (jsonValue !== undefined) {
      try {
        // Handle JSON-like values (arrays, booleans, numbers)
        props[key] = JSON.parse(jsonValue.replace(/'/g, '"'));
      } catch (e) {
        console.error(e, `Failed to parse JSON value for ${key}:`, jsonValue);
        props[key] = jsonValue;
      }
    } else {
      // Handle string values and convert to appropriate types
      if (stringValue === 'true') props[key] = true;
      else if (stringValue === 'false') props[key] = false;
      else if (!isNaN(Number(stringValue))) props[key] = Number(stringValue);
      else props[key] = stringValue;
    }
  }

  return { name, props };
}

// Add this component map
// const ComponentMap: Record<string, React.ComponentType<any>> = {
//   InputMatrix: InputMatrix,
// };

export default async function Post({ params }: PageProps) {
  const { slug } = await params;
  
  const postsDirectory = path.join(process.cwd(), 'posts');
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  try {
    const fileContents = await fs.readFile(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    // Process the entire content first
    // const processedContent = await unified()
    //   .use(remarkParse)
    //   .use(remarkGfm)
    //   .use(remarkMath)
    //   .use(remarkImages)
    //   .use(remarkEmoji)
    //   .use(remarkRehype, { allowDangerousHtml: true })
    //   .use(rehypeRaw)
    //   .use(rehypeKatex)
    //   .use(rehypeSlug)
    //   .use(idSlug)
    //   .use(rehypeAutolinkHeadings)
    //   .use(rehypeStringify)
    //   .process(matterResult.content);

    // Split content by custom components while preserving code blocks
    const contentStr = matterResult.content;
    const processedLines: Array<{ type: string; content?: string; component?: CustomComponent }> = [];
    let currentBlock = '';
    let isInCodeBlock = false;
    
    const lines = contentStr.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Check for custom component
      const customComponent = parseCustomComponent(line);
      if (customComponent && !isInCodeBlock) {
        // If we have accumulated content, process it first
        if (currentBlock) {
          const processed = await unified()
            .use(remarkParse)
            .use(remarkGfm)
            .use(remarkMath)
            .use(remarkImages)
            .use(remarkRehype, { allowDangerousHtml: true })
            .use(rehypeRaw)
            .use(rehypeKatex)
            .use(rehypeSlug)
            .use(idSlug)
            .use(rehypeAutolinkHeadings)
            .use(rehypeStringify)
            .process(currentBlock);
          
          processedLines.push({
            type: 'markdown',
            content: processed.toString()
          });
          currentBlock = '';
        }
        
        processedLines.push({
          type: 'component',
          component: customComponent
        });
        continue;
      }

      // Check for code block boundaries
      if (line.startsWith('```')) {
        if (!isInCodeBlock) {
          // Starting a new code block
          isInCodeBlock = true;
          // Clear the current block and start fresh with this line
          if (currentBlock.trim()) {
            const processed = await unified()
              .use(remarkParse)
              .use(remarkGfm)
              .use(remarkMath)
              .use(remarkImages)
              .use(remarkRehype, { allowDangerousHtml: true })
              .use(rehypeRaw)
              .use(rehypeKatex)
              .use(rehypeSlug)
              .use(idSlug)
              .use(rehypeAutolinkHeadings)
              .use(rehypeStringify)
              .process(currentBlock);
            
            processedLines.push({
              type: 'markdown',
              content: processed.toString()
            });
          }
          currentBlock = line + '\n';
        } else {
          // Ending a code block
          isInCodeBlock = false;
          currentBlock += line + '\n';
          
          // Process the code block immediately
          const processed = await unified()
            .use(remarkParse)
            .use(remarkGfm)
            .use(remarkMath)
            .use(remarkImages)
            .use(remarkRehype, { allowDangerousHtml: true })
            .use(rehypeRaw)
            .use(rehypeKatex)
            .use(rehypeSlug)
            .use(idSlug)
            .use(rehypeAutolinkHeadings)
            .use(rehypeStringify)
            .process(currentBlock);
          
          processedLines.push({
            type: 'markdown',
            content: processed.toString()
          });
          currentBlock = ''; // Reset current block
          continue;
        }
      } else {
        currentBlock += line + '\n';
      }

      // If we're not in a code block and we hit a blank line or it's the last line,
      // process the accumulated content
      if (!isInCodeBlock && (line.trim() === '' || i === lines.length - 1)) {
        if (currentBlock.trim()) {
          const processed = await unified()
            .use(remarkParse)
            .use(remarkGfm)
            .use(remarkMath)
            .use(remarkImages)
            .use(remarkRehype, { allowDangerousHtml: true })
            .use(rehypeRaw)
            .use(rehypeKatex)
            .use(rehypeSlug)
            .use(idSlug)
            .use(rehypeAutolinkHeadings)
            .use(rehypeStringify)
            .process(currentBlock);

          processedLines.push({
            type: 'markdown',
            content: processed.toString()
          });
        }
        currentBlock = '';
      }
    }

    return (
      <BlogContainer home={false} posts={posts} collaspsible={true}>
        <article className="flex h-full flex-col pb-16 pt-16">
          <div className="flex-auto justify-start max-w-sm md:max-w-md lg:max-w-lg xl:max-w-3xl mx-auto">
            <BlogHeader
              date={matterResult.data.date}
              title={matterResult.data.title}
              subtitle={matterResult.data.subtitle}
              minutes={matterResult.data.minutes}
            />
            
            <BlogContent processedLines={processedLines} />
            
            <PostNavigation currentSlug={slug} posts={posts} />
            <footer className="mt-16 flex items-center justify-between border-t border-neutral-800 pt-4 mb-8">
              <div className="text-xs md:text-sm text-neutral-400">Copyright © 2025 William Pan.<br className="md:hidden visible" /> All rights reserved.</div>
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
          </div>
        </article>
      </BlogContainer>
    );
  } catch {
    notFound();
  }
}