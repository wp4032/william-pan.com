'use client';

import React from 'react';
import { motion, MotionValue } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';

interface HeroImageProps {
  grayscaledesign: MotionValue<string>;
  grayscalescience: MotionValue<string>;
  grayscaleventure: MotionValue<string>;
  ventureParallax: MotionValue<number>;
  scienceParallax: MotionValue<number>;
  designParallax: MotionValue<number>;
  ventureParallaxFilter: MotionValue<string>;
  scienceParallaxFilter: MotionValue<string>;
  designParallaxFilter: MotionValue<string>;
  william_website_1: StaticImageData;
  william_website_2: StaticImageData;
  william_website_3: StaticImageData;
}

interface StaticHeroImageProps {
  william_website_1: StaticImageData;
  william_website_2: StaticImageData;
  william_website_3: StaticImageData;
  blackAndWhite?: boolean;
}

const StaticHeroImage: React.FC<StaticHeroImageProps> = ({
  william_website_1,
  william_website_2,
  william_website_3,
  blackAndWhite = false,
}) => {
  const imageFilter = blackAndWhite ? 'grayscale(100%)' : 'none';

  return (
    <div className="w-full flex justify-center">
      {/* Image Container */}
      <div className="relative w-[400px] h-[500px] -top-20 z-0">
        {/* Circles Backdrop */}
        <div className="absolute inset-0 flex justify-center items-center z-[-1] transform filter contrast-150">
          <div className="w-[100px] h-[100px] lg:w-[200px] lg:h-[300px] rounded-full blur-[100px] animate-[blurCircle1_10s_infinite_alternate_linear]" />
          <div className="w-[100px] h-[100px] lg:w-[100px] lg:h-[250px] rounded-full blur-[100px] animate-[blurCircle2_12s_infinite_alternate_linear]" />
          <div className="w-[100px] h-[100px] lg:w-[150px] lg:h-[300px] rounded-full blur-[100px] animate-[blurCircle3_13s_infinite_alternate_linear]" />
        </div>

        {/* Three Images */}
        <div className="relative h-full">
          {/* Image 3 */}
          <div className="absolute z-[300] transform top-[-20px] left-[80px] md:left-[80px] w-[250px] md:w-[320px]">
            <div style={{ filter: imageFilter }}>
              <Image
                src={william_website_3}
                alt="Artist William"
                width={500}
                height={500}
                draggable="false"
              />
            </div>
          </div>

          {/* Image 1 */}
          <div className="absolute z-[350] transform top-[30%] left-[20px] md:-left-[20px] w-[200px] md:w-[250px]">
            <div style={{ filter: imageFilter }}>
              <Image
                src={william_website_1}
                alt="Scientist William"
                width={500}
                height={500}
                draggable="false"
              />
            </div>
          </div>

          {/* Image 2 */}
          <div className="absolute z-[400] transform top-[35%] left-[160px] w-[205px] md:w-[250px]">
            <div style={{ transform: 'rotateY(180deg)', filter: imageFilter }}>
              <Image
                src={william_website_2}
                alt="Venture William"
                width={500}
                height={500}
                draggable="false"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HeroImage: React.FC<HeroImageProps> = ({
  grayscaledesign,
  grayscalescience,
  grayscaleventure,
  ventureParallax,
  scienceParallax,
  designParallax,
  ventureParallaxFilter,
  scienceParallaxFilter,
  designParallaxFilter,
  william_website_1,
  william_website_2,
  william_website_3,
}) => {
  return (
    <div>
      {/* Image Container */}
      <div className="absolute w-full h-[500px] -top-20 z-0">
        {/* Circles Backdrop */}
        <div className="absolute inset-0 flex justify-center items-center z-[-1] transform filter contrast-150">
          <div className="w-[100px] h-[100px] lg:w-[200px] lg:h-[300px] rounded-full blur-[100px] animate-[blurCircle1_10s_infinite_alternate_linear]" />
          <div className="w-[100px] h-[100px] lg:w-[100px] lg:h-[250px] rounded-full blur-[100px] animate-[blurCircle2_12s_infinite_alternate_linear]" />
          <div className="w-[100px] h-[100px] lg:w-[150px] lg:h-[300px] rounded-full blur-[100px] animate-[blurCircle3_13s_infinite_alternate_linear]" />
        </div>

        {/* Three Images */}
        <div className="relative h-full">
          {/* Image 3 */}
          <div className="absolute z-[300] transform top-[-20px] left-[25%] w-4/6 md:w-[312px] xl:w-[410px]">
            <motion.div style={{ filter: grayscaledesign }}>
              <Image
                src={william_website_3}
                alt="Artist William"
                width={500}
                height={500}
                draggable="false"
              />
            </motion.div>
          </div>

          {/* Image 1 */}
          <div className="absolute z-[350] transform top-[30%] left-[5%] w-3/6 md:w-[250px] xl:w-[312px]">
            <motion.div style={{ filter: grayscalescience }}>
              <Image
                src={william_website_1}
                alt="Scientist William"
                width={500}
                height={500}
                draggable="false"
              />
            </motion.div>
          </div>

          {/* Image 2 */}
          <div className="absolute z-[400] transform top-[35%] left-[45%] w-3/6 md:w-[275px] xl:w-[324px]">
            <motion.div
              style={{
                transform: 'rotateY(180deg)',
                filter: grayscaleventure,
              }}
            >
              <Image
                src={william_website_2}
                alt="Venture William"
                width={500}
                height={500}
                draggable="false"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Parallax Text Container */}
      <div className="relative h-full select-none">
        {/* Parallax Text 1 */}
        <div className="ml-12 w-[60%] lg:w-[80%] xl:w-[70%] text-md lg:text-xl xl:text-2xl">
          <motion.div 
            style={{ 
              y: ventureParallax, 
              width: "60%", 
              color: ventureParallaxFilter,
              userSelect: "none"
            }} 
            animate={{ color: ventureParallaxFilter.get() }}
          >
            I remember ... <br /> 
            <b> the globetrotter finding ways to change the world ... </b>
          </motion.div>
        </div>

        {/* Parallax Text 2 */}
        <div className="translate-x-3/4 lg:translate-x-full w-[50%] text-sm lg:text-xl xl:text-2xl">
          <motion.h2 
            style={{ 
              y: scienceParallax, 
              textAlign: "right", 
              width: "100%", 
              color: scienceParallaxFilter,
              userSelect: "none"
            }} 
            animate={{ color: scienceParallaxFilter.get() }}
          >
            I remember ... <br /> 
            <b> the explorer deep in the realms of knowledge and the unknown … </b>
          </motion.h2>
        </div>

        {/* Parallax Text 3 */}
        <div className="translate-x-3/4 lg:translate-x-full w-[50%] text-sm lg:text-xl xl:text-2xl">
          <motion.h2 
            style={{ 
              y: designParallax, 
              textAlign: "right", 
              width: "100%", 
              color: designParallaxFilter,
              userSelect: "none"
            }} 
            animate={{ color: designParallaxFilter.get() }}
          >
            I remember ... <br /> 
            <b> the painter crafting the masterpiece with the filbert brush … </b>
          </motion.h2>
        </div>
      </div>
    </div>
  );
};

export { HeroImage, StaticHeroImage };
export default HeroImage;