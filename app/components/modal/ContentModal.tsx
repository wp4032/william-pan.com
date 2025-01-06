"use client"

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import VideoPlayer from './VideoPlayer'
import dynamic from 'next/dynamic';
import Image from 'next/image'

const DynamicPdfViewer = dynamic(() => import('./PdfViewer'), {
  ssr: false,
});

type ContentType = 'pdf' | 'video' | 'image'

interface ContentModalProps {
  title: string
  contentType: ContentType
  contentUrl: string
}

export default function ContentModal({ title, contentType, contentUrl }: ContentModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button type="button" className="px-2 lg:px-3 text-black bg-white font-[--font-family] font-medium text-sm leading-[25px] rounded-[20px] border-0 outline-none cursor-pointer mt-4">{title}</button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl w-full h-[50vh] rounded-xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="flex overflow-auto items-center justify-center">
          {contentType === 'pdf' && <DynamicPdfViewer url={contentUrl} />}
          {contentType === 'video' && <VideoPlayer url={contentUrl} />}
          {contentType === 'image' && (
            <div className="relative h-[40vh] w-full">
              <Image 
                src={contentUrl}
                alt={title}
                fill
                className="object-contain rounded-xl"
              />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
