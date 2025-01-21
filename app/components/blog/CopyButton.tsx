"use client"

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

interface CopyButtonProps {
  text: string
}

export function CopyButton({ text }: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(text)
    setIsCopied(true)

    setTimeout(() => {
      setIsCopied(false)
    }, 2000)
  }

  return (
    <button
      onClick={copy}
      className="flex flex-row items-center gap-2 z-20 rounded-md  text-xs"
    >
      {isCopied ? <Check className="md:h-3 md:w-3" /> : <Copy className="h-3 w-3" />}
      {isCopied ? "Copied" : "Copy code"}
    </button>
  )
}