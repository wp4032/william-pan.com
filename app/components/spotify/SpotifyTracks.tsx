'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import './spotify.css';

interface Track {
  songUrl: string;      // The URL to the song
  albumCover: string;   // The URL to the album cover image
  song: string;         // The song's name
  artists: string;      // The artists of the song
}

interface SpotifyTracksProps {
  tracks: Track[];      // An array of Track objects
}

const SpotifyTracks: React.FC<SpotifyTracksProps> = ({ tracks }) => {
  return (
    <>
      {tracks.map((recentTrack, index) => (
        <div key={index} className="william__spotify-track">
          <a href={recentTrack.songUrl}>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Image
                src={recentTrack.albumCover}
                alt={recentTrack.song}
                width={64}
                height={64}
              />
            </motion.div>
          </a>
          <h2>{recentTrack.song}</h2>
          <p className='mt-2'>{recentTrack.artists}</p>
        </div>
      ))}
    </>
  );
};

export default SpotifyTracks;
