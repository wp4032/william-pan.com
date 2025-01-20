"use client"

import { Button } from "@/components/ui/button"
import { ShareIcon, CheckCircle } from "lucide-react"
import { useState } from "react";

interface BlogHeaderProps {
  date: string
  title: string
  subtitle?: string
  minutes?: string // Added minutes prop
}

export function BlogHeader({ date, title, subtitle, minutes }: BlogHeaderProps) {
  const [copied, setCopied] = useState(false);

  const handleShareClick = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
  };

  return (
    <div className="flex-auto justify-start">
      <h3 className="text-sm font-light mt-2 text-neutral-400"><b>{date}</b> {minutes && `• ${minutes} minute read`}</h3> {/* Added minute read */}
      <h1 className="text-3xl md:text-5xl font-bold mt-4">{title}</h1>
      {subtitle && (
        <h2 className="text-md md:text-xl font-md mt-4 text-neutral-400">{subtitle}</h2>
      )}
      <div className="flex items-center gap-2 mt-4">
        <Button
          variant="outline"
          size="sm"
          className="text-xs md:text-sm rounded-[0.5rem]"
          onClick={handleShareClick}
        >
          {copied ? (
            <>
              <CheckCircle className="mr-2 h-2 w-2 md:h-4 md:w-4" />
              Link copied!
            </>
          ) : (
            <>
              <ShareIcon className="mr-2 h-2 w-2 md:h-4 md:w-4" />
              Share this post
            </>
          )}
        </Button>
      </div>
      <hr className="my-4 border-neutral-800" />
      <div className='h-4'></div>
    </div>
  )
}