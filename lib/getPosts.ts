import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

function getSubheadings(content: string): string[] {
  const headings: string[] = [];
  const lines = content.split('\n');
  
  lines.forEach(line => {
    if (line.startsWith('## ')) {
      headings.push(line.replace('## ', '').trim());
    }
  });

  return headings;
}

export function getAllPosts() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const allPosts: {title: string, url: string, subheadings: string[]}[] = [];

  const files = fs.readdirSync(postsDirectory);

  files.forEach(file => {
    if (file.endsWith('.md')) {
      const id = file.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, file);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { content } = matter(fileContents);
      const subheadings = getSubheadings(content);
      
      allPosts.push({
        title: id,
        url: `/blog/${id}`,
        subheadings
      });
    }
  });

  return allPosts;
}