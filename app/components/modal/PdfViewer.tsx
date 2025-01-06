"use client";

import { useRef, useState } from 'react';

interface PDFViewerProps {
  url: string;
}

export default function PDFViewer({ url }: PDFViewerProps) {
  const document = useRef<HTMLObjectElement | null>(null);
  const [valid, setValid] = useState(true);

  const checkValid = () => {
    if (!document.current) {
      setValid(false);
    }
  };

  if (valid) {
    return (
      <object
        className="rounded-xl h-[40vh]"
        data={url}
        onLoad={checkValid}
        type="application/pdf"
        width="100%"
        height="100%"
        ref={document}
      >
        <p>Link <a href={url}>to the PDF!</a></p>
      </object>
    );
  }

  return <div><p>Link <a href={url}>to the PDF!</a></p></div>;
}