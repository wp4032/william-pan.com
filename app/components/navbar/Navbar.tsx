'use client';
import { useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { motion } from 'framer-motion'
import './navbar.css'
import Image from 'next/image';
import Logo from '/public/logo_white.png'

import React from 'react'

interface MenuProps {
  setToggleMenu: (value: boolean) => void; // The function takes a boolean and returns void
};

const Menu: React.FC<MenuProps> = ({ setToggleMenu }) => (
  <>
    <p><a href="#home" onClick={() => setToggleMenu(false)}>Home</a></p>
    <p><a href="#ventures" onClick={() => setToggleMenu(false)}>Ventures</a></p>
    <p><a href="#science" onClick={() => setToggleMenu(false)}>Science</a></p>
    <p><a href="#design" onClick={() => setToggleMenu(false)}>Design</a></p>
    {/* <p><a href="#news" onClick={() => setToggleMenu(false)}>News</a></p> */}
  </>
);

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false)

  return (
    <div className="william__navbar">
      <div className="william__navbar-links">
        <div className="william__navbar-links_logo">
            <Image className="logo" src={Logo} alt="logo"/>
        </div>
        <div className="william__navbar-links_container">
          <Menu setToggleMenu={setToggleMenu} />
        </div>
      </div>
      <div className="william__navbar-sign">
        <a href="mailto: williampan@stanford.edu"> <motion.button whileHover={{scale: 1.05}} whileTap={{scale: 0.95}} type="button">Contact</motion.button> </a>
      </div>
      <div className="william__navbar-menu">
        {toggleMenu
          ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />
        }
        {toggleMenu && (
          <div className="william__navbar-menu_container scale-up-center bg-[#000e] w-screen">
            <div className="william__navbar-menu_container-links text-center">
              <Menu setToggleMenu={setToggleMenu} />
              {/* <div className="william__navbar-menu_container-links-sign">
                <p>Sign in</p>
                <button type="button">Sign up</button>
              </div> */}
            </div>  
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar