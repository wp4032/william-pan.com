'use client';

import React, { useEffect, useState } from 'react';
import { InputMatrix } from '@/app/components/nnaccelerator/InputMatrix';
import { CodeBlock } from '@/app/components/blog/CodeBlock';
import SystolicSimulator from '../nnaccelerator/SystolicSimulator';

// type CustomComponent = {
//   name: string;
//   props: Record<string, any>;
// };

const ComponentMap: Record<string, React.ComponentType<any>> = {
  InputMatrix: InputMatrix,
  SystolicSimulator: SystolicSimulator
};

export function BlogContent({ processedLines }: { processedLines: any[] }) {
  const [parsedContent, setParsedContent] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    // Move the HTML parsing logic inside useEffect where we're guaranteed to have browser APIs
    const parseContent = () => {
      return processedLines.map((line, index) => {
        if (line.type === 'component') {
          const Component = ComponentMap[line.component.name];
          return Component ? (
            <div key={index} className="my-8">
              <Component {...line.component.props} />
            </div>
          ) : (
            <div key={index}>Unknown component: {line.component.name}</div>
          );
        }

        // Parse the HTML string to find and replace code blocks
        const parser = new DOMParser();
        const doc = parser.parseFromString(line.content, 'text/html');
        const preElements = doc.querySelectorAll('pre');

        if (preElements.length > 0) {
          const contentPieces = [];
          let currentPosition = 0;

          Array.from(preElements).forEach((pre, preIndex) => {
            const code = pre.querySelector('code');
            
            // Get the exact position of this pre element
            const preStart = line.content.indexOf(pre.outerHTML);
            
            // Add any text that comes before this pre element
            if (preStart > currentPosition) {
              contentPieces.push(
                <div key={`${index}-text-${preIndex}`} 
                     dangerouslySetInnerHTML={{ 
                       __html: line.content.slice(currentPosition, preStart) 
                     }} 
                />
              );
            }

            // Add the code block, being careful to only include the actual code content
            if (code) {
              const language = code.className.replace('language-', '');
              // Clean the code content by removing any trailing semicolons or extra content
              const codeContent = (code.textContent || '').trim();
              
              contentPieces.push(
                <CodeBlock key={`${index}-code-${preIndex}`} className={`language-${language}`}>
                  {codeContent}
                </CodeBlock>
              );
            }

            // Update the current position to be exactly after this pre element
            currentPosition = preStart + pre.outerHTML.length;
          });

          // Add any remaining text after the last pre element
          if (currentPosition < line.content.length) {
            contentPieces.push(
              <div key={`${index}-text-final`} 
                   dangerouslySetInnerHTML={{ 
                     __html: line.content.slice(currentPosition) 
                   }} 
              />
            );
          }

          return contentPieces;
        }

        return (
          <div key={index} dangerouslySetInnerHTML={{ __html: line.content }} />
        );
      });
    };

    setParsedContent(parseContent());
  }, [processedLines]); // Re-run when processedLines changes

  // Initial render with basic content, skipping code blocks
  if (parsedContent.length === 0) {
    return (
      <div className="prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg 
      prose-h2:anchor-offset
      prose-h1:font-bold prose-h2:font-semibold prose-h3:font-medium prose-h4:font-medium
      prose-h1:my-6 prose-h1:mt-12 prose-h2:my-4 prose-h2:mt-8 prose-h3:my-4 prose-h4:my-4 prose-p:mb-6
      prose-headings:text-white prose-hr:my-6
      prose-code:bg-neutral-800 prose-code:rounded-[0.5rem] prose-code:px-2 prose-code:py-1 prose-code:my-2  prose-code:text-sm
      prose-a:text-white prose-a:underline prose-a:decoration-white/75 prose-a:underline-offset-4 hover:prose-a:decoration-white prose-a:transition-all
      prose-ul:list-none prose-ul:pl-0 prose-ul:mb-6
      [&_ul_li]:relative [&_ul_li]:pl-7
      [&_ul_li:before]:content-['•'] [&_ul_li:before]:absolute [&_ul_li:before]:pl-2
      [&_ul_li:before]:left-0 [&_ul_li:before]:text-white
      [&_ol_li]:relative [&_ol_li]:pl-7
      [&_ol_li:before]:absolute [&_ol_li:before]:left-0 
      [&_ol_li:before]:text-white [&_ol_li:before]:content-[counter(list-item)'.'] [&_ol_li:before]:pl-1
      prose-table:overflow-hidden prose-table:w-full prose-table:rounded-[0.5rem]
      prose-table:border-separate prose-table:border-spacing-0 prose-table:border prose-table:border-neutral-800 prose-table:mb-6
      prose-td:border-[0.5px] prose-td:border-neutral-800 prose-td:p-2
      prose-th:border-[0.5px] prose-th:border-neutral-800 prose-th:p-1
      prose-th:bg-white/5
      prose-img:rounded-[0.5rem] prose-img:my-4 prose-img:w-full
      [&_.task-list-item]:list-none [&_.task-list-item]:pl-0
      [&_.task-list-item]:before:content-none
      [&_.task-list-item_input]:mr-2 [&_.task-list-item_input]:ml-1
      [&_.task-list-item_input]:accent-white
      prose-blockquote:border-l-2 prose-blockquote:border-neutral-800 prose-blockquote:pl-4 prose-blockquote:my-4 prose-blockquote:text-neutral-400 prose-blockquote:rounded-md
      ">
        {processedLines.map((line, index) => {
          // Skip code blocks in initial render
          if (line.content?.includes('<pre>') || line.content?.includes('</pre>')) {
            return <div key={index} className="h-32 bg-neutral-800/30 rounded-lg animate-pulse" />;
          }
          return (
            <div key={index} dangerouslySetInnerHTML={{ __html: line.content }} />
          );
        })}
      </div>
    );
  }

  // Render parsed content once available
  const proseStyles = "prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg" +
    " prose-h2:anchor-offset" +
    " prose-h1:font-bold prose-h2:font-semibold prose-h3:font-medium prose-h4:font-medium" +
    " prose-h1:my-6 prose-h1:mt-12 prose-h2:my-4 prose-h2:mt-8 prose-h3:my-4 prose-h4:my-4" +
    " prose-headings:text-white prose-hr:my-6" +
    " prose-code:bg-neutral-800 prose-code:rounded-[0.5rem] prose-code:px-2 prose-code:py-1 prose-code:my-2 prose-code:text-sm" +
    " prose-a:text-white prose-a:underline prose-a:decoration-white/75 prose-a:underline-offset-4 hover:prose-a:decoration-white prose-a:transition-all" +
    " prose-ul:list-none prose-ul:pl-0 prose-ul:mb-6" +
    " [&_ul_li]:relative [&_ul_li]:pl-7" +
    " [&_ul_li:before]:content-['•'] [&_ul_li:before]:absolute [&_ul_li:before]:pl-2" +
    " [&_ul_li:before]:left-0 [&_ul_li:before]:text-white" +
    " [&_ol_li]:relative [&_ol_li]:pl-7" +
    " [&_ol_li:before]:absolute [&_ol_li:before]:left-0" +
    " [&_ol_li:before]:text-white [&_ol_li:before]:content-[counter(list-item)'.'] [&_ol_li:before]:pl-1" +
    " prose-table:overflow-hidden prose-table:w-full prose-table:rounded-[0.5rem]" +
    " prose-table:border-separate prose-table:border-spacing-0 prose-table:border prose-table:border-neutral-800 prose-table:mb-6" +
    " prose-td:border-[0.5px] prose-td:border-neutral-800 prose-td:p-2" +
    " prose-th:border-[0.5px] prose-th:border-neutral-800 prose-th:p-1" +
    " prose-th:bg-white/5" +
    " prose-img:rounded-[0.5rem] prose-img:my-4 prose-img:w-full" +
    " [&_.task-list-item]:list-none [&_.task-list-item]:pl-0" +
    " [&_.task-list-item]:before:content-none" +
    " [&_.task-list-item_input]:mr-2 [&_.task-list-item_input]:ml-1" +
    " [&_.task-list-item_input]:accent-white" +
    " prose-blockquote:border-l-2 prose-blockquote:border-neutral-800 prose-blockquote:pl-4 prose-blockquote:my-4 prose-blockquote:text-neutral-400 prose-blockquote:rounded-md" +
    " [&>div>p]:mb-6"; // More specific selector for paragraphs

  return (
    <div className={proseStyles}>
      {parsedContent}
    </div>
  );
}
