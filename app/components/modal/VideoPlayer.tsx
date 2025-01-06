interface VideoPlayerProps {
  url: string
}

export default function VideoPlayer({ url }: VideoPlayerProps) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <video 
        src={url} 
        controls 
        className="max-w-full max-h-full rounded-xl"
      >
        Your browser does not support the video tag.
      </video>
    </div>
  )
}

