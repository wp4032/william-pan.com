"use client"

import { CopyButton } from './CopyButton'
import { Highlight, themes } from 'prism-react-renderer'

interface CodeBlockProps {
  children: string
  className?: string
}

export function CodeBlock({ children, className }: CodeBlockProps) {
  // Extract language from className (e.g., "language-javascript" -> "javascript")
  const language = className?.split(' ').find(c => c.startsWith('language-'))?.replace('language-', '') || ''

  return (
    <div className="group relative rounded-[0.25rem] bg-[#1E1E1E] overflow-hidden border border-neutral-800">
      <div className="flex items-center justify-between px-4 py-2 bg-[#2D2D2D]">
        <span className="text-sm text-gray-400">{language}</span>
        <CopyButton text={children} />
      </div>
      <Highlight theme={themes.vsDark} code={children.trim()} language={language || 'text'}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className="p-4 overflow-x-auto text-sm scrollbar" style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  )
}