'use client';

import React from 'react'
import { motion, useScroll, useTransform } from "framer-motion";
import Ventures from '../ventures/Ventures';
import Science from '../science/Science';
import Design from '../design/Design';
import ContactForm from '../contactForm/ContactForm';
import Image from 'next/image';
import './header.css';
import william_website_1 from '/public/william-website-1.png'
import william_website_2 from '/public/william-website-2.png'
import william_website_3 from '/public/william-website-3.png'

const Header = () => {

  const refdiv = React.useRef(null);

  const { scrollYProgress } = useScroll({
    target: refdiv
  });

  // Use this to change the points of where to change colors
  const ventureend = 0.32;
  const scienceend = 0.75;
  const distance = 1000;

  const grayscalescience = useTransform(scrollYProgress, [0, 0.05, ventureend, ventureend + 0.05, scienceend, scienceend + 0.05], ['grayscale(0%) blur(0px) brightness(100%)', 'grayscale(100%) blur(1px) brightness(65%)', 'grayscale(100%) blur(1px) brightness(65%)', 'grayscale(0%) blur(0px) brightness(100%)', 'grayscale(0%) blur(0px) brightness(100%)', 'grayscale(100%) blur(1px) brightness(65%)'])
  const grayscaleventure = useTransform(scrollYProgress, [0, ventureend, ventureend + 0.05], ['grayscale(0%) blur(0px) brightness(100%)', 'grayscale(0%) blur(0px) brightness(100%)', 'grayscale(100%) blur(1px) brightness(75%)'])
  const grayscaledesign = useTransform(scrollYProgress, [0, 0.05, scienceend, scienceend + 0.05, 0.99, 1.0], ['grayscale(0%) blur(0px)', 'grayscale(100%) blur(1px)', 'grayscale(100%) blur(1px)', 'grayscale(0%) blur(0px)', 'grayscale(0%) blur(0px)', 'grayscale(100%) blur(1px)'])

  const ventureParallax = useTransform(scrollYProgress,
    [0.10, 0.12, 0.30, 0.32],
    [0, -distance / 2 + 25, -distance / 2 + 25, -distance])

  const scienceParallax = useTransform(scrollYProgress,
    [0.36, 0.38, 0.75, 0.77],
    [0, -distance / 2 + 25, -distance / 2 + 25, -distance])

  const designParallax = useTransform(scrollYProgress,
    [0.80, 0.82, 0.98, 1],
    [0, -distance / 2 + 75, -distance / 2 + 75, -distance])

  const ventureParallaxFilter = useTransform(scrollYProgress, [0.10, 0.101, 0.12], ["transparent", 'rgb(0,0,0)', 'rgb(255,255,255)'])

  const scienceParallaxFilter = useTransform(scrollYProgress, [0.36, 0.361, 0.38], ["transparent", 'rgb(0,0,0)', 'rgb(255,255,255)'])

  const designParallaxFilter = useTransform(scrollYProgress, [0.75, 0.751, 0.77], ["transparent", 'rgb(0,0,0)', 'rgb(255,255,255)'])

  return (
    <>
      <div className="william__header section__padding" id="home" ref={refdiv}>
        <div className="william__header-content">
          <div className="william__header-content-title flex flex-col items-center">
            <h1 className="black-text"> The intersection of innovation, entrepreneurship, engineering, and design. </h1>
            <p> William Pan is a junior at Stanford University studying mechanical engineering, electrical engineering, and computer science. His goal in life is to change the world through science-based technologies and purposeful ventures. </p>
            <ContactForm />
          </div>

          {/* <div className="william__header-content__people">
          <img src={people} alt="people"/>
          <p> Answered 500 people using GPT-3. </p>
        </div> */}


          <div className="william__header-image">
            <div className="william__header-image_backdrop" />
            <div className="william__header-balls">
              <div className="william__header-blur-circle1"></div>
              <div className="william__header-blur-circle2"></div>
              <div className="william__header-blur-circle3"></div>
            </div>
            <div className="william__header-imageholder">
              <div className="william__header-imagecontainer">
                <motion.div
                  style={{
                    filter: grayscaledesign
                  }}
                  className="william__header-img3"
                >
                  <Image src={william_website_3} alt='Artist William' width={500} height={500}/>
                </motion.div>

                <motion.div
                  style={{
                    filter: grayscalescience
                  }}
                  className="william__header-img1"
                >
                  <Image src={william_website_1} alt='Scientist William' width={500} height={500}/>
                </motion.div>

                <motion.div
                  style={{
                    transform: "rotateY(180deg)",
                    filter: grayscaleventure
                  }}
                  className="william__header-img2"
                >
                  <Image src={william_website_2} alt='Venture William' width={500} height={500}/>
                </motion.div>
              </div>
            </div>
            <div className="william__header-image_buffer" />
            <motion.h2 className="william__header-parallax_text ptext1" style={{ y: ventureParallax, width: "60%", color: ventureParallaxFilter }} animate={{ color: ventureParallaxFilter.get() }}> I remember ... <br /> <b> the globetrotter finding ways to change the world ... </b> </motion.h2>
            <motion.h2 className="william__header-parallax_text ptext2" style={{ y: scienceParallax, textAlign: "right", width: "75%", color: scienceParallaxFilter }} animate={{ color: scienceParallaxFilter.get() }}> I remember ... <br /> <b> the explorer deep in the realms of knowledge and the unknown … </b> </motion.h2>
            <motion.h2 className="william__header-parallax_text ptext3" style={{ y: designParallax, textAlign: "right", width: "50%", color: designParallaxFilter }} animate={{ color: designParallaxFilter.get() }}> I remember ... <br /> <b> the painter crafting the masterpiece with the filbert brush … </b> </motion.h2>
          </div>

          <div className="william__header-content__experiences">
            <div>
              <Ventures />
            </div>

            <div>
              <Science />
            </div>

            <div>
              <Design />
            </div>
          </div>


        </div>

      </div>
      <div className="william__header-content__experiencesmobile section__padding">
        <div className="william__header-content__experiencesmobile-container">
          <div>
            <Ventures />
          </div>

          <div>
            <Science />
          </div>

          <div>
            <Design />
          </div>
        </div>
      </div>
    </>
  )
}

export default Header