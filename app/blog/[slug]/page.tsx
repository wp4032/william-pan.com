import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkHtml from 'remark-html';
import BlogContainer from '@/app/components/sidebar/BlogContainer';

export default async function Post({ params }: { params: { slug: string } }) {
  // Await params before using
  const { slug } = await params;
  
  const postsDirectory = path.join(process.cwd(), 'posts');
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  try {
    const fileContents = await fs.readFile(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    const processedContent = await unified()
      .use(remarkParse)
      .use(remarkHtml)
      .process(matterResult.content);
    const contentHtml = processedContent.toString();

    return (
      <BlogContainer home={false}>
        <article className="prose prose-invert max-w-none">
          <h1>{matterResult.data.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </article>
      </BlogContainer>
    );
  } catch (error) {
    throw new Error('Post not found');
  }
}