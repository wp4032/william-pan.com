'use client';

import React, { useState, useRef } from 'react'
import { motion } from "framer-motion";
import ShowcaseBackdrop from './ShowcaseBackdrop';
import './showcasepopup.css'

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

interface ShowcaseModalProps {
  // modalOpen: Boolean; 
  handleClose: () => void; 
  // title: string;
  alt?: string; 
  img?: string;
  pdf?: string;
  mp4?: string;
}

interface ImageComponentProps {
  src?: string; 
  alt?: string;
}

interface PDFComponentProps {
  doc?: string; 
}

interface VideoComponentProps {
  video?: string;
}


const ImageComponent: React.FC<ImageComponentProps> = ({ src, alt }) => {
  const image = useRef<HTMLImageElement | null>(null); // Explicitly define ref type
  const [valid, setValid] = useState(true);

  const checkValid = () => {
    if (!image.current || !image.current.complete || image.current.naturalWidth < 1 || image.current.naturalHeight < 1) {
      setValid(false);
    }
  };

  if (valid) {
    return (
      <img
        src={src}
        onLoad={checkValid}
        onError={() => setValid(false)}
        ref={image}
        width="100%"
        alt={alt}
        className="william__showcase-modal-image"
      />
    );
  }

  return <div>Image not valid</div>;
};

const PDFComponent: React.FC<PDFComponentProps> = ({ doc }) => {
  const document = useRef<HTMLObjectElement | null>(null); // Explicitly define ref type
  const [valid, setValid] = useState(true);

  const checkValid = () => {
    if (!document.current) {
      setValid(false);
    }
  };

  if (valid) {
    return (
      <object
        className="william__showcase-modal-document"
        data={doc}
        onLoad={checkValid}
        type="application/pdf"
        width="100%"
        height="100%"
        ref={document}
      >
        <p>Link <a href={doc}>to the PDF!</a></p>
      </object>
    );
  }

  return <div><p>Link <a href={doc}>to the PDF!</a></p></div>;
};

const VideoComponent: React.FC<VideoComponentProps> = ({ video }) => {
  const vid = useRef<HTMLVideoElement | null>(null); // Explicitly define ref type
  const [valid, setValid] = useState(true);

  const checkValid = () => {
    if (!vid.current) {
      setValid(false);
    }
  };

  if (valid) {
    return (
      <video
        className="william__showcase-modal-video"
        width="100%"
        height="100%"
        onLoad={checkValid}
        controls
        ref={vid}
      >
        <source src={video} type="video/mp4" />
      </video>
    );
  }

  return <div><p>Link <a href={video}>to the video!</a></p></div>;
};


const ShowcaseModal: React.FC<ShowcaseModalProps> = ({ handleClose, alt, img, pdf, mp4 }) => {
  return (
    <ShowcaseBackdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="william__showcase-modal"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <ImageComponent src={img} alt={alt} />
        <VideoComponent video={mp4} />
        <PDFComponent doc={pdf} />

        <button className="william__showcase-modal_closeButton" onClick={handleClose}>
          <svg className="svg-icon" viewBox="-2.5 -2.5 25 25">
            <path fill="white" d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"></path>
          </svg>
        </button>
      </motion.div>
    </ShowcaseBackdrop>
  )
}

export default ShowcaseModal;