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
  const allPosts: {
    title: string, 
    url: string, 
    slug: string, 
    date: string, 
    subheadings: string[], 
    subtitle: string, 
    minutes: string, 
    sidebar: string,
    image: string}[] = [];

  const files = fs.readdirSync(postsDirectory);

  files.forEach(file => {
    if (file.endsWith('.md')) {
      const id = file.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, file);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      const subheadings = getSubheadings(content);
      
      allPosts.push({
        title: data.title,
        subtitle: data.subtitle,
        url: `/blog/${id}`,
        slug: id,
        date: data.date,
        subheadings, 
        minutes: data.minutes,
        image: data.image,
        sidebar: data.sidebar,
      });
    }
  });

  return allPosts;
}