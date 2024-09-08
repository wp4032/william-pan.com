// 'use client';

// import React, { useEffect, useState } from 'react';
// import querystring from 'querystring';
// import axios from 'axios';
// import SpotifyTracks from './SpotifyTracks';
// import SpotifyLogo from './SpotifyLogo';
// import './spotify.css';
// import { Buffer } from 'buffer';

// // Define interfaces for the transformed data
// interface TrackInfo {
//   song: string;
//   songUrl: string;
//   artists: string;
//   albumCover: string;
// }

// // Define interfaces for Spotify API response
// interface SpotifyArtist {
//   name: string;
// }

// interface SpotifyAlbum {
//   images: { url: string }[];
// }

// interface SpotifyTrack {
//   name: string;
//   external_urls: { spotify: string };
//   artists: SpotifyArtist[];
//   album: SpotifyAlbum;
// }

// interface SpotifyRecentItem {
//   track: SpotifyTrack;
// }

// interface SpotifyRecentlyPlayedResponse {
//   items: SpotifyRecentItem[];
// }

// const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played`;
// const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

// // Ensure environment variables are set properly
// const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
// const client_secret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;
// const refresh_token = process.env.NEXT_PUBLIC_SPOTIFY_REFRESH_TOKEN;

// const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

// const Spotify = () => {
//   const [tracks, setTracks] = useState<TrackInfo[]>([]);  // Use the new TrackInfo type

//   useEffect(() => {
//     const fetchTokenAndTracks = async () => {
//       try {
//         const tokenResponse = await axios.post(
//           TOKEN_ENDPOINT,
//           querystring.stringify({
//             grant_type: 'refresh_token',
//             refresh_token,
//           }),
//           {
//             headers: {
//               'Content-Type': 'application/x-www-form-urlencoded',
//               Authorization: `Basic ${basic}`,
//             },
//           }
//         );

//         const recentResponse = await axios.get<SpotifyRecentlyPlayedResponse>(
//           RECENTLY_PLAYED_ENDPOINT,
//           {
//             headers: {
//               Authorization: `Bearer ${tokenResponse.data.access_token}`,
//             },
//           }
//         );

//         const tracksFromAPI = recentResponse.data.items.slice(0, 5).map((recentTrack) => ({
//           song: recentTrack.track.name,
//           songUrl: recentTrack.track.external_urls.spotify,
//           artists: recentTrack.track.artists.map((artist) => artist.name).join(', '),
//           albumCover: recentTrack.track.album.images[0].url,
//         }));

//         setTracks(tracksFromAPI);  // Use the correct type (TrackInfo[])
//       } catch (error) {
//         console.error('Error fetching Spotify data:', error);
//       }
//     };

//     fetchTokenAndTracks();
//   }, []);  // Empty dependency array ensures it runs once after the component mounts

//   return (
//     <div className="william__spotify">
//       <div className="william__spotify-container">
//         <div className="william__spotify-container-header">
//           <h1> Recently played on Spotify </h1>
//           <SpotifyLogo />
//         </div>
//         <div className="william__spotify-songscontainer">
//           <SpotifyTracks tracks={tracks} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Spotify;

'use client';

import React, { useEffect, useState } from 'react';
import SpotifyTracks from './SpotifyTracks';
import SpotifyLogo from './SpotifyLogo';
import './spotify.css';

interface TrackInfo {
  song: string;
  songUrl: string;
  artists: string;
  albumCover: string;
}

const Spotify = () => {
  const [tracks, setTracks] = useState<TrackInfo[]>([]);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await fetch('/api/spotify');
        const data = await response.json();
        setTracks(data.tracks);
      } catch (error) {
        console.error('Error fetching tracks:', error);
      }
    };

    fetchTracks();
  }, []);

  return (
    <div className="william__spotify section__padding">
      <div className="william__spotify-container">
        <div className="william__spotify-container-header">
          <h1> Recently played on Spotify </h1>
          <SpotifyLogo />
        </div>
        <div className="william__spotify-songscontainer">
          <SpotifyTracks tracks={tracks} />
        </div>
      </div>
    </div>
  );
};

export default Spotify;

