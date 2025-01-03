'use client';

import React, { useState } from 'react';
// import Modal from 'react-modal';
import './showcasepopup.css';
import { AnimatePresence, motion } from 'framer-motion';
import ShowcaseModal from './ShowcaseModal';

interface ShowcasePopupProps {
  buttonText: string;   // Button label
  alt?: string;          // Alt text for the image
  img?: string;          // Image source URL or path
  pdf?: string;          // PDF file source URL or path
  mp4?: string;          // MP4 video source URL or path
}

// Modal.setAppElement('#root');

const ShowcasePopup: React.FC<ShowcasePopupProps> = ({ buttonText, alt, img, pdf, mp4 }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const close = () => {
    document.body.style.overflow = 'unset';
    setModalOpen(false);
  };

  const open = () => {
    document.body.style.overflow = 'hidden';
    setModalOpen(true);
  };

  return (
    <div>
      <AnimatePresence
        initial={false}
        onExitComplete={() => null}
      >
        {modalOpen && (
          <ShowcaseModal
            handleClose={close}
            alt={alt}
            img={img}
            pdf={pdf}
            mp4={mp4}
          />
        )}
      </AnimatePresence>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <button
          type="button"
          className="px-2 lg:px-3 text-black bg-white font-[--font-family] font-medium text-sm leading-[25px] rounded-[20px] border-0 outline-none cursor-pointer mt-4"
          onClick={() => (modalOpen ? close() : open())}
        >
          {buttonText}
        </button>
      </motion.div>
    </div>
  );
};

export default ShowcasePopup;
