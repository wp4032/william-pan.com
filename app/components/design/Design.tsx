'use client';

import React from 'react'
import './design.css';
import Feature from '../feature/Feature';
import { motion } from 'framer-motion';
import ContentModal from '../modal/ContentModal';

const Design = () => {
  return (
    <div className="relative flex flex-col items-start mt-24 border border-white/50 rounded-[10px] p-8">
      <div className="absolute -top-[200px] left-0" id="design"/>
      <div className="mb-3">
        <h1 className="font-[--font-family] font-bold text-[30px] leading-[30px] tracking-[0.01em] text-left items-center mt-0 text-white">Design</h1>
        <h2 className="font-[--font-family] font-semibold text-[18px] leading-[18px] tracking-[0.01em] text-left items-center mt-2 text-[#b5b5b5]">Magazines, photographs, designs by William Pan</h2>
      </div>

      <div>
        <Feature 
          title='Coinception' 
          position={'ME 102 Final Project @ Stanford University'}
          text='A coin sorter that requires 3 inches of vertical input motion that is reset by a spring. The input motion is further translated into rotational motion to sort the coins into sorted compartments.'/>
        <div className="flex gap-4 flex-wrap">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ContentModal 
              title="Presentation"
              contentType="pdf"
              contentUrl="/coinception.pdf"
            />
          </motion.div>
        </div>
      </div>

      <div>
        <Feature 
          title='Personal Website' 
          text='The website you are on right now made with Next.js, Tailwind CSS, Framer Motion, various Javascript Libraries. It was made to document the three sides of William (the globetrotter, the explorer, and the painter). '/>
        <div className="flex gap-4 flex-wrap">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              type="button"
              className="px-2 lg:px-3 text-black bg-white font-[--font-family] font-medium text-sm leading-[25px] rounded-[20px] border-0 outline-none cursor-pointer mt-4"
              onClick={() => window.open('https://github.com/wp4032/william-website', '_blank')}
            >
              GitHub
            </button>
          </motion.div>
        </div>
      </div>

      <div>
        <Feature 
          title='Dreams Don&#39;t Die Bicycle' 
          text='A vintage 1970&#39;s Centurion LeMans Mixte bicycle refurbrished, painted, and cleaned as the 2022 Dreams Don&#39;t Die Bicycle used for transport at Stanford University Campus.'/>
        <div className="flex gap-4 flex-wrap">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ContentModal 
              title="Video"
              contentType="video"
              contentUrl="/DreamsDontDieBike.mp4"
            />
          </motion.div>
        </div>
      </div>

      <div>
        <Feature 
          title='Dreams Don&#39;t Die' 
          text='A zine made in the summer of 2021 documenting the events and thoughts presented by William&#39;s alter-ego racing through a modern psychedelic iridescent metropolis.'/>
        <div className="flex gap-4 flex-wrap">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ContentModal 
              title="Excerpt of Zine"
              contentType="pdf"
              contentUrl="/DreamsDontDie.pdf"
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Design