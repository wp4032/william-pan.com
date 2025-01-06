// import Link from 'next/link';
// import { getSortedPostsData } from '../../lib/posts';
// import fs from 'fs';
// import path from 'path';
// import matter from 'gray-matter';
// import { unified } from 'unified';
// import remarkParse from 'remark-parse';
// import remarkHtml from 'remark-html';
// import Navbar from '@/app/components/navbar/Navbar';

// export default function Blog({ allPostsData }: { allPostsData: any }) {
//   return (
//     <div>
//       <Navbar />
//       <div className="w-screen mt-[110px]">
//         <h1>Blog</h1>
//         <ul>
//           {allPostsData.map(({ id, subdir, date, title, content }: { id: string, subdir: string, date: string, title: string, content: string }) => (
//             <li key={id}>
//               <Link href={`/blog/${subdir}/${id}`}>
//                 <h2>{title}</h2>
//               </Link>
//               <small>{date}</small>
//               <div dangerouslySetInnerHTML={{ __html: content }} />
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export async function getStaticProps() {
//   const postsDirectory = path.join(process.cwd(), 'posts');
//   const fileNames = fs.readdirSync(postsDirectory);
  
//   const allPostsData = await Promise.all(fileNames.map(async fileName => {
//     const id = fileName.replace(/\.md$/, '');
//     const fullPath = path.join(postsDirectory, fileName);
//     const fileContents = fs.readFileSync(fullPath, 'utf8');
//     const matterResult = matter(fileContents);

//     const processedContent = await unified()
//       .use(remarkParse)
//       .use(remarkHtml)
//       .process(matterResult.content);
//     const content = processedContent.toString();

//     return {
//       id,
//       content,
//       date: matterResult.data.date,
//       ...matterResult.data,
//     };
//   }));

//   return {
//     props: {
//       allPostsData: allPostsData.sort((a, b) => {
//         if (a.date < b.date) {
//           return 1;
//         } else {
//           return -1;
//         }
//       }),
//     },
//   };
// }