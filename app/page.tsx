import React from 'react'
import Navbar from './components/navbar/Navbar';
import Header from './components/header/Header';
import Skills from './components/skills/Skills';
import Spotify from './components/spotify/Spotify';
import Footer from './components/footer/Footer';
// import { Navbar, Skills, Spotify } from './components';
// import { Footer, Header } from './containers';

export default function Home() {
  return (
    <div className='w-screen'>
      <div>
        <Navbar />
      </div>
      <Header />
      <Skills />
      <Spotify />
      <Footer />
    </div>
  );
}
