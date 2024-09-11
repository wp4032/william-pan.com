'use client';

import React from 'react'
import './science.css';
import Feature from '../feature/Feature';
import ShowcasePopup from '../showcasePopup/ShowcasePopup';


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
          <ShowcasePopup 
            buttonText='Paper' 
            pdf='iclippaper2.pdf' />
        </div>
      </div>

      <div>
        <Feature 
          title='OccFacto: Controllable Part-Based Mesh Generation with Occupancy Networks' 
          position='CS 236 Final Project with Aniketh Iyengar @ Stanford University' 
          text='OccFacto is a novel model that: (1) takes an input of part-segmented styles of 3D objects, (2) learns an implicit function that outputs occupancy to represent 3D objects as meshes, (3) enables generation of coherent and plausible 3D objects with part-based control'/>
        <div className="william__science-buttons">
          <ShowcasePopup 
            buttonText='Poster' 
            pdf='occFacto.pdf' />
        </div>
      </div>

      <div>
        <Feature 
          title='Moonwalker Brain Computer Interface' 
          position='CS 107E Final Project @ Stanford University' 
          text='Inspired by CTRL Labs, Moonwalker reads EMG signals from the wrist to allow for seamless interaction between the real and digital world. Truly fullstack (designed wrist band, circuitry, backend control, frontend software).' />
          <a href="https://github.com/wp4032/cs107e-final-project/tree/master">  <button className="william__ventures-linkedbutton"> Github </button>  </a>
      </div>

      <div>
        <Feature 
          title='Kinesthetic Lattice Programmable (KLaP) Tape' 
          position='Undergraduate Research Fellow @ Stanford University Wu Tsai Human Performance Alliance & DeSimone Lab' 
          text='Kinesthetic latticed programmable (KLaP) tape aims to solve patellofemoral pain through its customized and programmable mechanical properties and robust adhesion with triggerable on-demand detachment for after use.' />
        <div className="william__science-buttons">
          <ShowcasePopup 
            buttonText='Poster' 
            pdf='KLAPposter.pdf' />
        </div>
      </div>

      <div>
        <Feature 
          title='Injection Continuous Liquid Interface Production' 
          position='Undergraduate Research Assistant @ Stanford University DeSimone Lab' 
          text='Injection continuous liquid interface production accelerates 3D printing speeds 5 to 10-fold over current methods, can utilize more viscous resins, and can readily pattern an object with different resins.'/>
        <div className="william__science-buttons">
          <ShowcasePopup 
            buttonText='Paper' 
            pdf='iclippaper1.pdf'/>
        </div>
      </div>

      <div>
        <Feature 
          title='Biocompatible Hydrogel Ostomy Adhesive' 
          position='Independent Researcher @ Northwood High School' 
          text='The hydrogel ostomy adhesive (HOA) is a novel hydrogel patch that strongly adheres and creates a fluid-tight seal to prevent ostomy bag leaks that plauge almost all ostomy patients.'/>
        <div className="william__science-buttons">
          <ShowcasePopup 
            buttonText='Poster' 
            pdf='HOAposter.pdf' />
          <ShowcasePopup 
            buttonText='Paper' 
            pdf='HOApaper.pdf' />
        </div>
      </div>
    </div>
  )
}

export default Science