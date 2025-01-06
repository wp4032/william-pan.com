"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { StaticHeroImage } from "./components/header/HeroImage";
import william_website_1 from '@/public/william-website-1.png';
import william_website_2 from '@/public/william-website-2.png';
import william_website_3 from '@/public/william-website-3.png';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4">
      <StaticHeroImage
        william_website_1={william_website_1}
        william_website_2={william_website_2}
        william_website_3={william_website_3}
        blackAndWhite={true}
      />
      <h1 className="font-[--font-family] font-bold text-6xl md:text-8xl mb-4 -mt-32 md:-mt-20">
        404
      </h1>
      <p className="font-[--font-family] text-xl md:text-2xl mb-8 text-center">
        Looks like you&apos;ve ventured into uncharted territory.
      </p>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link href="/">
          <button
            type="button"
            className="px-4 py-2 text-black bg-white font-[--font-family] font-medium text-sm leading-[25px] rounded-[20px] border-0 outline-none cursor-pointer"
          >
            Return Home
          </button>
        </Link>
      </motion.div>
    </div>
  );
}