'use client';

import React from 'react'
import ContactForm from '../contactForm/ContactForm'
import './footer.css';

const Footer = () => {

  return (
    <div className="william__footer section__padding">
      <div className="william__footer-heading flex flex-col items-center">
        <h1>Let's change the world together.</h1>
        <ContactForm />
      </div>
      <div className="william__footer-links">
        <div className="william__footer-links_logo">
          <img src='/logo_white.png' alt="logo"></img>
          <p><b>Email:</b> williampan@stanford.edu <br />
            <b>Phone:</b> (714) 633 2888</p>
        </div>
        <div className="william__footer-links_container">
          <div className="william__footer-links_div">
            <h4>Organizations</h4>
            <a href="https://tunlcompany.com/"> <p>TUNL Industries</p> </a>
            <a href="https://discipulusventures.com/"> <p>Discipulus Ventures</p> </a>
            <a href="https://joinhealthhacks.com/"> <p>health&#123;hacks&#125;</p> </a>
            <a href="https://desimonegroup.stanford.edu/"> <p>DeSimone Lab @ Stanford University</p> </a>
          </div>
          <div className="william__footer-links_div">
            <h4>Social</h4>
            <div className='william__footer-links_social'>
              <a href='https://www.x.com/thewilliampan?lang=en'> <img src='/social/x.png' alt='x' /> </a>
              <a href='https://www.linkedin.com/in/-william-pan/'> <img src='/social/linkedin.png' alt='linkedin' /> </a>
              <a href='https://open.spotify.com/user/wp4032?si=3b1d8a1830734ef6'> <img src='/social/spotify.png' alt='spotify' /> </a>
            </div>
          </div>
        </div>
      </div>
      <div className="william__footer-copyright">
        <p>Copyright © 2024 William Pan. All rights reserved.</p>
      </div>


    </div>
  )
}

export default Footer;