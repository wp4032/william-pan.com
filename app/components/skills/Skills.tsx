'use client';

import React, { useEffect, useState } from 'react';
import './skills.css';
import {CounterAPI} from "counterapi";

const Skills = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await fetch('/api/views');
        const data = await response.json();
        setCount(data.count);
      } catch (error) {
        console.error("Error fetching counter:", error);
      }
    };

    fetchCount();
  }, []);

  return (
    <div className="william__misc section__padding">
      <div className='william__skills'>

        <div className="william__skills-columns">
          <div className="william__skills-container">
            <h2>PROGRAMMING SKILLS</h2>
            <div className="william__skills-logos-container">
              <div className="william__skills-logos">
                <h3>Python</h3>
                <h3>C++</h3>
                <h3>C</h3>
                <h3>PyTorch</h3>
                <h3>React</h3>
                <h3>NextJS</h3>
                <h3>CSS</h3>
                <h3>HTML</h3>
                <h3>JavaScript</h3>
                <h3>Latex</h3>
                <h3>Numpy</h3>
                <h3>OpenCV</h3>
                <h3>Arm Assembly</h3>
              </div>
            </div>
          </div>

          <div className="william__skills-container">
            <h2>ENGINEERING SKILLS</h2>
            <div className="william__skills-logos">
              <h3>SolidWorks</h3>
              <h3>Fusion 360 CAD & CAM</h3>
              <h3>Altium</h3>
              <h3>MATLAB</h3>
              <h3>STM32 CubeIDE</h3>
              <h3>NTopology</h3>
              <h3>LTSpice</h3>
              <h3>Electro-mechanical Design</h3>
              <h3>GD&T</h3>
              <h3>DFM</h3>
              <h3>DFA</h3>
              <h3>Hydraulic Circuits</h3>
              <h3>Lithium Ion Battery Modules</h3>
              <h3>Power Electronics</h3>
              <h3>PCB Design Schematics and Layout</h3>
              <h3>CAN Bus</h3>
              <h3>I2C/SPI/UART</h3>
              <h3>Wire Harnesses</h3>
              <h3>FDM / SLA 3D Printing</h3>
              <h3>3-Axis Mill</h3>
              <h3>3-Axis CNC</h3>
              <h3>Water Jet</h3>
            </div>
          </div>

          <div className="william__skills-container">
            <h2>DESIGN SKILLS</h2>
            <div className="william__skills-logos">
              <h3>Adobe Photoshop</h3>
              <h3>Adobe Illustrator</h3>
              <h3>Adobe Lightroom</h3>
              <h3>Adobe InDesign</h3>
              <h3>Adobe Premiere Pro</h3>
            </div>
          </div>
        </div>

      </div>

      <div className="william__inspirations">
        <div className="william__inspirations-people">
          <h1> People who inspire William</h1>
          <div className="william__inspirations-people_container">
            <p>Alexandr Wang</p>
            <p>Bon Iver</p>
            <p>Claude Shannon</p>
            <p>David Packard</p>
            <p>Elon Musk</p>
            <p>Esteban Ocon</p>
            <p>Frank Ocean</p>
            <p>Kendrick Lamar</p>
            <p>Hyunwoo Yuk</p>
            <p>Jamie XX</p>
            <p>Jen Hsun Huang</p>
            <p>Joseph DeSimone</p>
            <p>Josh Wolfe</p>
            <p>Leslie Groves</p>
            <p>Krishna Shenoy</p>
            <p>Max Verstappen</p>
            <p>Michael Jordan</p>
            <p>Morris Chang</p>
            <p>Ravi Gupta</p>
            <p>Sam Walton</p>
            <p>Tony Fadell</p>
            <p>Tyler, the Creator</p>
            <p>Vinod Khosla</p>
            <p>Zhenan Bao</p>
          </div>
        </div>

        <div className="william__inspirations-count">
          <h1> All-time Views: <b>{count}</b></h1> 
        </div>
      </div>
    </div>
  )
}

export default Skills