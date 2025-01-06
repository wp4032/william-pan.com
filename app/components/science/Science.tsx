'use client';

import React from 'react'
import './science.css';
import Feature from '../feature/Feature';
import { motion } from 'framer-motion';
import ContentModal from '../modal/ContentModal';


const Science = () => {
  return (
    <div className="william__science-container">
      <div className="anchor" id="science" />
      <div className="william__science-title">
        <h1>Science</h1>
        <h2>Inventions, builds, and research by William Pan</h2>
      </div>

      <div>
        <Feature 
          title='High-resolution stereolithography: Negative spaces enabled by control of fluid mechanics' 
          position='Undergraduate Research Assistant @ Stanford University DeSimone Lab' 
          text='Injection continuous liquid interface production (iCLIP) technology revolutionizes stereolithography by mitigating overcuring in 3D-printed microstructures. Through precise control of fluid mechanics, iCLIP enables high-resolution fabrication of complex microfluidic devices with enhanced design freedom, overcoming historical limitations in negative space resolution.' />
        <div className="william__science-buttons">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ContentModal 
              title="Paper"
              contentType="pdf"
              contentUrl="/iclippaper2.pdf"
            />
          </motion.div>
        </div>
      </div>

      <div>
        <Feature 
          title='OccFacto: Controllable Part-Based Mesh Generation with Occupancy Networks' 
          position='CS 236 Final Project with Aniketh Iyengar @ Stanford University' 
          text='OccFacto is a novel model that: (1) takes an input of part-segmented styles of 3D objects, (2) learns an implicit function that outputs occupancy to represent 3D objects as meshes, (3) enables generation of coherent and plausible 3D objects with part-based control'/>
        <div className="william__science-buttons">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ContentModal 
              title="Poster"
              contentType="pdf"
              contentUrl="/occFacto.pdf"
            />
          </motion.div>
        </div>
      </div>

      <div>
        <Feature 
          title='Music Synthesizer with Chord Player, Harmonics, Dynamics, and PMOD Integration' 
          position=' ' 
          text='For this project, we designed and implemented a digital music synthesizer capable of playing chords, harmonic tones, and dynamic audio effects. We also integrated a PMOD numpad for real-time note control. The system was implemented using Verilog and simulated on an FPGA.'/>
        <div className="william__science-buttons">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              type="button"
              className="px-2 lg:px-3 text-black bg-white font-[--font-family] font-medium text-sm leading-[25px] rounded-[20px] border-0 outline-none cursor-pointer mt-4"
              onClick={() => window.open('https://github.com/wp4032/musicPlayerFPGA', '_blank')}
            >
              GitHub
            </button>
          </motion.div>
        </div>
      </div>

      <div>
        <Feature 
          title='Moonwalker Brain Computer Interface' 
          position='CS 107E Final Project @ Stanford University' 
          text='Inspired by CTRL Labs, Moonwalker reads EMG signals from the wrist to allow for seamless interaction between the real and digital world. Truly fullstack (designed wrist band, circuitry, backend control, frontend software).' />
          <div className="william__science-buttons">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                type="button"
                className="px-2 lg:px-3 text-black bg-white font-[--font-family] font-medium text-sm leading-[25px] rounded-[20px] border-0 outline-none cursor-pointer mt-4"
                onClick={() => window.open('https://github.com/wp4032/cs107e-final-project/', '_blank')}
              >
                GitHub
              </button>
            </motion.div>
          </div>
      </div>

      <div>
        <Feature 
          title='Kinesthetic Lattice Programmable (KLaP) Tape' 
          position='Undergraduate Research Fellow @ Stanford University Wu Tsai Human Performance Alliance & DeSimone Lab' 
          text='Kinesthetic latticed programmable (KLaP) tape aims to solve patellofemoral pain through its customized and programmable mechanical properties and robust adhesion with triggerable on-demand detachment for after use.' />
        <div className="william__science-buttons">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ContentModal 
              title="Poster"
              contentType="pdf"
              contentUrl="/KLAPposter.pdf"
            />
          </motion.div>
        </div>
      </div>

      <div>
        <Feature 
          title='Injection Continuous Liquid Interface Production' 
          position='Undergraduate Research Assistant @ Stanford University DeSimone Lab' 
          text='Injection continuous liquid interface production accelerates 3D printing speeds 5 to 10-fold over current methods, can utilize more viscous resins, and can readily pattern an object with different resins.'/>
        <div className="william__science-buttons">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ContentModal 
              title="Paper"
              contentType="pdf"
              contentUrl="/iclippaper1.pdf"
            />
          </motion.div>
        </div>
      </div>

      <div>
        <Feature 
          title='Biocompatible Hydrogel Ostomy Adhesive' 
          position='Independent Researcher @ Northwood High School' 
          text='The hydrogel ostomy adhesive (HOA) is a novel hydrogel patch that strongly adheres and creates a fluid-tight seal to prevent ostomy bag leaks that plauge almost all ostomy patients.'/>
        <div className="william__science-buttons">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ContentModal 
              title="Poster"
              contentType="pdf"
              contentUrl="/HOAposter.pdf"
            />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ContentModal 
              title="Paper"
              contentType="pdf"
              contentUrl="/HOApaper.pdf"
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Science