"use client"

import { Button } from "@/components/ui/button"
import { ShareIcon } from "lucide-react"

interface BlogHeaderProps {
  date: string
  title: string
  subtitle?: string
}

export function BlogHeader({ date, title, subtitle }: BlogHeaderProps) {
  return (
    <div className="flex-auto justify-start">
      <h3 className="text-sm font-light mt-2 text-neutral-400">{date}</h3>
      <h1 className="text-5xl font-bold mt-4">{title}</h1>
      {subtitle && (
        <h2 className="text-xl font-md mt-4 text-neutral-400">{subtitle}</h2>
      )}
      <div className="flex items-center gap-2 mt-4">
        <Button
          variant="outline"
          size="sm"
          className="text-sm rounded-[0.5rem]"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
          }}
        >
          <ShareIcon className="mr-2 h-4 w-4" />
          Share this post
        </Button>
      </div>
      <hr className="my-4 border-neutral-800" />
      <div className='h-4'></div>
    </div>
  )
}