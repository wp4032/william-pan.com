'use client';

import React, { useRef, RefObject } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Ventures from '../ventures/Ventures';
import Science from '../science/Science';
import Design from '../design/Design';
import ContactForm from '../contactForm/ContactForm';
import Image from 'next/image';
import william_website_1 from '@/public/william-website-1.png';
import william_website_2 from '@/public/william-website-2.png';
import william_website_3 from '@/public/william-website-3.png';
import HeroImage from './HeroImage';

const Header = () => {
  const refdiv = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: refdiv as RefObject<HTMLElement>,
  });

  // Use this to change the points of where to change colors
  const ventureend = 0.27;
  const scienceend = 0.67;
  const distance = 600;

  const grayscalescience = useTransform(
    scrollYProgress,
    [0, 0.05, ventureend, ventureend + 0.05, scienceend, scienceend + 0.05],
    [
      'grayscale(0%) blur(0px) brightness(100%)',
      'grayscale(100%) blur(1px) brightness(65%)',
      'grayscale(100%) blur(1px) brightness(65%)',
      'grayscale(0%) blur(0px) brightness(100%)',
      'grayscale(0%) blur(0px) brightness(100%)',
      'grayscale(100%) blur(1px) brightness(65%)',
    ]
  );

  const grayscaleventure = useTransform(
    scrollYProgress,
    [0, ventureend, ventureend + 0.05],
    [
      'grayscale(0%) blur(0px) brightness(100%)',
      'grayscale(0%) blur(0px) brightness(100%)',
      'grayscale(100%) blur(1px) brightness(75%)',
    ]
  );

  const grayscaledesign = useTransform(
    scrollYProgress,
    [0, 0.05, scienceend, scienceend + 0.05, 0.99, 1.0],
    [
      'grayscale(0%) blur(0px)',
      'grayscale(100%) blur(1px)',
      'grayscale(100%) blur(1px)',
      'grayscale(0%) blur(0px)',
      'grayscale(0%) blur(0px)',
      'grayscale(100%) blur(1px)',
    ]
  );

  const ventureParallax = useTransform(
    scrollYProgress,
    [0.1, 0.12, 0.3, 0.32],
    [0, -distance / 2 + 405, -distance / 2 + 405, -distance]
  );

  const scienceParallax = useTransform(
    scrollYProgress,
    [0.36, 0.38, 0.75, 0.77],
    [0, -distance / 2 + 205, -distance / 2 + 205, -distance]
  );

  const designParallax = useTransform(
    scrollYProgress,
    [0.8, 0.82, 0.98, 1],
    [0, -distance / 2 + 305, -distance / 2 + 305, -distance]
  );

  const ventureParallaxFilter = useTransform(
    scrollYProgress,
    [0.1, 0.101, 0.12],
    ['transparent', 'rgb(0,0,0)', 'rgb(255,255,255)']
  );

  const scienceParallaxFilter = useTransform(
    scrollYProgress,
    [0.36, 0.361, 0.38],
    ['transparent', 'rgb(0,0,0)', 'rgb(255,255,255)']
  );

  const designParallaxFilter = useTransform(
    scrollYProgress,
    [0.75, 0.751, 0.77],
    ['transparent', 'rgb(0,0,0)', 'rgb(255,255,255)']
  );

  return (
    <>
      {/* Header Container */}
      <div
        className="relative w-full py-16 max-w-xl lg:max-w-4xl xl:max-w-7xl mx-auto min-h-[200vh]"
        id="home"
        ref={refdiv}
      >
        {/* Main Content Wrapper */}
        <div className="flex flex-wrap flex-row justify-start items-start gap-x-8 w-full h-auto">
          {/* Title & Contact Form Section */}
          <div className="w-full lg:w-[48%] mb-16 flex flex-col items-center px-4 lg:px-0">
            <h1 className="font-bold text-4xl md:text-5xl leading-[44px] md:leading-[52px] tracking-[0.01em] text-center lg:text-left text-white mt-28 max-w-[90%] md:max-w-full">
              The intersection of innovation, entrepreneurship, engineering, and
              design.
            </h1>
            <p className="text-white text-base md:text-[18px] leading-6 mt-8 lg:mr-16 text-center lg:text-left max-w-[90%] md:max-w-full">
              William Pan is a junior at Stanford University studying mechanical
              engineering, electrical engineering, and computer science. His
              goal in life is to change the world through science-based
              technologies and purposeful ventures.
            </p>
            <div className="mt-2 lg:mt-6 w-full max-w-[90%] md:max-w-full flex justify-center lg:justify-start">
              <ContactForm />
            </div>
          </div>

          {/* Sticky Images & Parallax Text Section */}
          <div className="w-[100vw] lg:w-[48%] sticky lg:top-1/3 lg:h-[calc(full-500px)]">

            <HeroImage
              grayscaledesign={grayscaledesign}
              grayscalescience={grayscalescience}
              grayscaleventure={grayscaleventure}
              ventureParallax={ventureParallax}
              scienceParallax={scienceParallax}
              designParallax={designParallax}
              ventureParallaxFilter={ventureParallaxFilter}
              scienceParallaxFilter={scienceParallaxFilter}
              designParallaxFilter={designParallaxFilter}
              william_website_1={william_website_1}
              william_website_2={william_website_2}
              william_website_3={william_website_3}
            />
          </div>

          {/* Experiences Section - Desktop */}
          <div className="hidden lg:block w-[48%]">
            <Ventures />
            <Science />
            <Design />
          </div>
        </div>
      </div>

      {/* Experiences Section - Mobile */}
      <div className="block lg:hidden py-16">
        <div className="flex flex-col items-start max-w-[80%] mx-auto">
          <Ventures />
          <Science />
          <Design />
        </div>
      </div>
    </>
  );
};

export default Header;
