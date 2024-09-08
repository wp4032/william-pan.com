'use client';

import React from 'react'
import './ventures.css';
import Feature from '../feature/Feature';
import ShowcasePopup from '../showcasePopup/ShowcasePopup';

const Ventures = () => {
  return (
    <div className="william__ventures-container">
      <div className="anchor" id="ventures" />
      <div className="william__ventures-title">
        <h1>Ventures</h1>
        <h2>Projects, organizations, and ideas of William Pan</h2>
      </div>
      <div>
        <Feature 
          title='TUNL Industries' 
          position='Co-founder, President, & Chief Engineer'
          text='Bringing Sandworm from Dune into real life. TUNL Industries was developing a self tunneling untethered robot for defense and commercial applications. Won a $1.25M contract from AFWERX and raised a preseed from 1517 Fund and Champion Hill Ventures.' link='https://tunlcompany.com'  />
        <div className="william__ventures-buttons">
          <a href="https://tunlcompany.com/">  <button className="william__ventures-linkedbutton"> Website </button>  </a> 
        </div>
      </div>
      <div>
        <Feature 
          title='Discipulus Ventures' 
          position='Entrepreneur in Residence'
          text='Discipulus Ventures is cultivating a visionary vanguard of young founders from top universities to solve the hardest problems in America. Through a week-long cohort program, value-driven founders receive mentorship from industry leaders and gain access to a network of investors and advisors to build transformative solutions in hardtech and defense tech.' link='https://discipulusventures.com/'  />
        <div className="william__ventures-buttons">
          <a href="https://discipulusventures.com/">  <button className="william__ventures-linkedbutton"> Website </button>  </a> 
          <a href="https://techcrunch.com/2024/03/26/discipluus-ventures-mentors-founders-norman-rockwell-america/?guccounter=1&guce_referrer=aHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS8&guce_referrer_sig=AQAAAGtMXVyHd8sUaHBU5WZd0kXaXOkf3ni2VF3SV2Vc5jTgiaM9_0iyvFI-0aunyYv3C9seqasXZj_-z_xtvy6sOB-XwD-KNTFmb5EKZ8z7JdiVIEoaDlllJk9PGLBO7in3n-5ezT6d0r2aFNvFeUFUHHXFAYdxz3Md9eAr0NtMAGwh">  <button className="william__ventures-linkedbutton"> TechCrunch Article </button>  </a> 
          <a href="https://x.com/DiscipulusVent">  <button className="william__ventures-linkedbutton"> X </button>  </a>
        </div>
      </div>
      <div>
        <Feature 
          title='Bosch Ventures' 
          position='Venture Capital Intern'
          text='Conducted due diligence on startups in additive manufacturing, cloud infrastructure, robotic fleets, and silicon carbide. Modeled cap tables, IRR, and 5-year projections for companies in global deal flow across 6 offices for Bosch.' link='https://tunlcompany.com'  />
        <div className="william__ventures-buttons">
          <a href="https://bosch.ventures/">  <button className="william__ventures-linkedbutton"> Website </button>  </a> 
        </div>
      </div>
      <div>
        <Feature
          title='health{hacks}' 
          position='Co-Founder & Chief Executive Officer' 
          text='health{hacks} was a 48 hour healthcare innovation event dedicated to connecting people from around the world to change the world. Our goal is to bring people from a wide variety of backgrounds and fields to provide new perspectives and collaborate on projects.' link='https://health-hacks.tech/'/>
        <div className="william__ventures-buttons">
          <ShowcasePopup 
            buttonText='health{hacks} 2023' 
            pdf='/healthhacks2023-recap.pdf' 
            alt='health{hacks} 2023'/>
          <ShowcasePopup 
            buttonText='health{hacks} 2022' 
            img='/healthhacks2022-recap.pdf'
            alt='health{hacks} 2022'/>
          <ShowcasePopup 
            buttonText='health{hacks} 2021' 
            pdf='/healthhacks2021-recap.pdf'
            alt='health{hacks} 2021'/>  
          <ShowcasePopup 
            buttonText='health{hacks} 2020' 
            pdf='/healthhacks2020-recap.pdf'
            alt='health{hacks} 2021'/> 
          <a href="https://joinhealthhacks.com/">  <button className="william__ventures-linkedbutton"> Website </button>  </a>
          <a href="https://www.instagram.com/healthhacks.tech/?hl=en">  <button className="william__ventures-linkedbutton"> Instagram </button>  </a>
          <a href="https://x.com/joinhealthhacks">  <button className="william__ventures-linkedbutton"> X </button>  </a>
        </div>
      </div>
    </div>
  )
}

export default Ventures