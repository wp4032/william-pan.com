---
title: 'Building a Blog from Scratch with the Future Model of Programming'
subtitle: 'Built using NextJS, Tailwind CSS, and more...'
date: '2025-01-20'
minutes: '15'
image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVAIHHph1avjN7Yr-r--0J5VHXlM-UhfdSJA&s'
sidebar: 'Building a Blog from Scratch'
---

Blogs are easy to start they say — you just start writing. However, I opted too much time in wanting to build one from scratch on NextJS, which the website is currently built on. I am a sucker for design, and wanted every detail to be perfect. Some inspiration for this blog were blogs like [Matt Pharr's blog](https://pharr.org/matt/blog/) where he goes into the story of ISPC and also long form technical analysis like [SemiAnalysis](https://semianalysis.com/) where there is just long form posts on the big players in the semiconductor, GPU, and LLM industries. As well, I wanted it to look like some technical documentation where it is easy to follow along and also provide some tutorials and projects in the future. 

Hence, I want to start by documenting my (ongoing) process in creating this blog, so that others can also get started. 


# Web Development with Cursor

This was the first time that I fully utilized [Cursor](https://cursor.com), and I can say that LLM-enabled programming can get you quite far if you know what you want to build and part of the technical aspects you need to consider. However, coming from primarily C++ and C programming, it takes a lot to remember all the syntax and special structures in Javascript, hence Cursor does a lot of the heavy lifting in building functional components and functions. [Cursor](https://cursor.com) and [v0](https://v0.dev) are always good starting points for boilerplate code especially for web design, but getting the right look and design is extremely difficult. (Sidenote: v0 is getting better, I can copy and paste a design element and can get quite close to the design of the component). Once most of the components are in place, the rest of the work can easily be modified in Tailwind CSS like colors, padding, margins, size, etc. can be easily adjusted if you know what you are doing. 

> <b>Hot take:</b> Figma is not needed, just get good with Tailwind CSS

![cursor](/blog/blogfromscratch/cursor.jpg)

Cursor's ability to sift through the whole codebase makes is extremely easy to create components and functions that rely on components on other files, making it so much easier compared to copying into ChatGPT all the time. It is time consuming to copy and paste code into ChatGPT again and again especially when there are errors and bugs you do not know the root cause of. 


# How to Build The Blog

## 1. Dependencies
You can load these libraries through `npm` or `yarn` in your NextJS project:
- **[Tailwind CSS](https://tailwindcss.com/)**: A utility-first CSS framework for building custom user interfaces quickly and efficiently.
- **[Gray Matter](https://github.com/jonschlinkert/gray-matter)**: A front-matter parser for Node.js that parses YAML, JSON, or TOML front-matter of a string or file.
- **[Remark](https://github.com/unifiedjs/unified)**: A markdown processor powered by plugins part of the unified collective.
- **[Rehype](https://github.com/rehypejs/rehype)**: A HTML processor powered by plugins part of the unified collective.
- **[shadcn/ui](https://ui.shadcn.com/)**: An off-the-shelf UI library for React applications.


## 2. Building the Page Routing
In the `app` directory of your project, create a new directory called `blog` and add a directory called `[slug]` to house the individual blog pages. NextJS requires all pages to be named `page.tsx`.
```plaintext
app/
└── blog/
    ├── [slug]/
    │   └── page.tsx
    ├── page.tsx       
```
> <b>Note:</b> you unfortunately cannot make nested slug folders like blog/[slug]/[subslug]/page.tsx. I wanted to do this to organize the blog posts by month but NextJS interprets the two as one slug all together.

## 3. Storing the Blog Posts in Markdown
- **Markdown Files**: Store your blog posts as markdown files in a `posts` directory. Each file includes front-matter for metadata like title, date, and description. This metadata is parsed using Gray Matter. Also, the name of the markdown file will end up being the slug in the link for the website.
(i.e. `blogfromscratch.md` will become [william-pan.com/blog/blogfromscratch](https://william-pan.com/blog/blogfromscratch))

```plaintext
posts/
├── post_1.md
└── post_2.md
```

- **Front-Matter Example**: Use YAML front-matter to define metadata for each post including the title, subtitle, date, time it takes to read the article, and header image.

```yaml
---
title: 'Building a Blog from Scratch with the Future Model of Programming'
subtitle: 'Built using NextJS, Tailwind CSS, and more...'
date: '2024-01-09'
minutes: '2'
image: 'https://example.com/image.jpg'
---
```

## 4. Understanding the Helper Functions

The `getAllPosts` function is a key utility that allows you to fetch metadata from all the markdown files in your `posts` directory. It uses Node.js `fs` and `path` modules along with the `gray-matter` library for parsing the front-matter.

### Code Breakdown

#### a. **Extracting Subheadings**
```typescript
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
```
This function scans the markdown content line by line to extract all secondary headings (`##` in Markdown syntax). It:
1. Splits the content into an array of lines.
2. Checks each line to see if it starts with `##` (indicating a secondary heading).
3. Cleans up the heading by removing the `##` prefix and trimming whitespace.
4. Returns an array of subheadings, which can be used to generate a table of contents or in-page navigation.

#### b. **Fetching All Posts**
```typescript
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
    image: string
  }[] = [];
```
This function initializes:
- `postsDirectory`: The path to the `posts` folder, calculated using `process.cwd()` (current working directory) and `path.join`.
- `allPosts`: An array to store metadata from each markdown file.

#### c. **Iterating Over Files**
```typescript
  const files = fs.readdirSync(postsDirectory);

  files.forEach(file => {
    if (file.endsWith('.md')) {
      const id = file.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, file);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      const subheadings = getSubheadings(content);
```
- Reads all files in the `posts` directory using `fs.readdirSync`.
- Filters files ending with `.md` to process only markdown files.
- Extracts the `id` (file name without `.md`) to use as a slug.
- Reads the file contents using `fs.readFileSync`.
- Parses the front-matter using `matter`, separating metadata (`data`) from the content.
- Extracts subheadings using the `getSubheadings` function.

#### d. **Storing Post Metadata**
```typescript
      allPosts.push({
        title: data.title,
        subtitle: data.subtitle,
        url: `/blog/${id}`,
        slug: id,
        date: data.date,
        subheadings, 
        minutes: data.minutes,
        image: data.image,
      });
    }
  });

  return allPosts;
}
```
Each post’s metadata is added to the `allPosts` array. Key details include:
- `title` and `subtitle` from the front-matter.
- `url`: The slug-based URL (e.g., `/blog/blogfromscratch`).
- `slug`: The file name for easy referencing.
- `date`, `minutes`, and `image` from the front-matter.
- `subheadings`: Extracted from the content.

Finally, the array of all posts is returned for use in generating blog listings, archives, or feeds.


## 5. Creating the Blog Home Page

I wanted to use `app/blog/page.tsx` to list my three latest blog posts. Below, the code first fetches the most recent posts from the `posts` directory.

```typescript
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
    ...
  );
}
```

From here you can design how you want the front page to look like in the return section of the code above. I chose to have a large block for the most recent post, and then two smaller blocks for the second and third most recent post. See [here](https://github.com/wp4032/william-pan.com/tree/main/app/blog/page.tsx) for the source code of the design.

## 6. Creating the Slug Page

To render individual pages, you can use `[slug]/page.tsx` to render individual blog posts. This section is a lot more complicated than the previous ones because you need to load the markdown files and then you have to you can use Remark and Rehype to format the markdown content so it is beautifully displayed. 

```typescript
// See the source code for all of the imports
const posts = getAllPosts();

export default async function Post({ params }: PageProps) {
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
      .use(idSlug)
      .use(rehypeAutolinkHeadings)
      .use(rehypeHighlight)
      .use(rehypeStringify)
      .process(matterResult.content);

    const contentHtml = processedContent.toString();
```

I used these Remark and Rehype libraries because I wanted to display math using LaTeX for future technical blog posts. As well, there is one that formats code blocks like the one above and colors based on the syntax. the last major one is the ability to parse the block for headers and create an tag so when you click on the subheadings on the sidebar, it will automatically scroll to the correct section. This will constantly need updating depending on how complicated I decide to make the heading titles. One big issue I face was when I included numbers in the beginning of the subheadings, it would create issues with the router, so I decided to create the tag to include `id` in the beginning like: [www.william-pan.com/blog/blogfromscratch#id-5-dynamic-routing-for-blog-posts](www.william-pan.com/blog/blogfromscratch#id-5-dynamic-routing-for-blog-posts)

```typescript
const idSlug = () => {
  return (tree: any) => {
    visit(tree, 'element', (node: any) => {
      if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(node.tagName)) {
        if (node.properties && node.properties.id) {
          let id = node.properties.id;
          if (/^\d/.test(id)) {
            node.properties.id = `id-${id}`; // Prepend "id-" if the ID starts with a number
          }
        }
      }
    });
  };
};
```

Once all of the markdown file is parsed and converted into HTML elements, I was able to use a library called Tailwind Typography that provides a set of `prose` classes to make any CSS changes to any vanilla HTML elements such as all the content from the markdown file.
```typescript
<div dangerouslySetInnerHTML={{ __html: contentHtml }} 
                    className="prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg 
                    prose-h2:anchor-offset
                    prose-h1:font-bold prose-h2:font-semibold prose-h3:font-medium prose-h4:font-medium
                    prose-h1:my-6 prose-h1:mt-12 prose-h2:my-4 prose-h2:mt-8 prose-h3:my-4 prose-h4:my-4 prose-p:my-2
                    prose-headings:text-white prose-hr:my-6
                    // it goes on an on... check it out in the code base
                    "/>
```

## 7. Using shadcn/ui for the Sidebar
Shadcn is an excellent starting place to build web applications, and I was inspired by technical documentation, so I decided to build a sidebar with all of the blog posts with collapsible buttons along with breadcrumbs on the top bar. The main UI is awesome; however, I had to make some edits to change the UI to what I wanted it to look like.

### a. Sidebar
The sidebar needed to dynamically load the subheadings from the blog and display them in the sidebar, so we would need to pass in the posts into the sidebar and pull certain parameters such as the `title`, `url`, and `subheadings`. See the [source code](https://github.com/wp4032/william-pan.com/tree/main/app/components/sidebar/Sidebar.tsx) for more info.

```typescript
export function AppSidebar({ posts, collaspsible, ...props }: { posts: { title: string, url: string, subheadings: string[], sidebar: string }[], collaspsible: boolean }) {
  const pathname = usePathname();

  React.useEffect(() => {
    const adjustScrollPosition = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element && element instanceof HTMLElement) {
          window.scrollTo({
            top: element.offsetTop, // Removed the additional padding
            behavior: 'smooth'
          });
        }
      }
    };

    adjustScrollPosition();

    window.addEventListener('hashchange', adjustScrollPosition);

    return () => {
      window.removeEventListener('hashchange', adjustScrollPosition);
    };
  }, []);
```

### b. Breadcrumb
This breadcrumb is the one that is sitting at the top of this blog. The component reads the current path name and parses for the current blog and tag that is sitting at currently. As well, it dynamically detects which subheading that you are currently on. See the [source code](https://github.com/wp4032/william-pan.com/tree/main/app/components/sidebar/BlogBreadcrumb.tsx) for more info.


## 8. Future Enhancements

Although this is an excellent base for a start of a technical blog, there are several other additions that I would love to add in the near future:
- **Comments and Interactions**: I would love to add a comment section below.
- **Search and Filtering**: I want to implement a search bar for all my posts; however, I don't have too many posts, so I can wait.

---

By following these steps, you can build a fully functional and customizable blog using modern web development tools and practices. That's it for me and have fun creating your own blog!
