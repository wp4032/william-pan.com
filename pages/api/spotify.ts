// pages/api/spotify.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import querystring from 'querystring';
import axios from 'axios';

const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played`;

// Access environment variables on the server
const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Fetch Spotify API token
    const tokenResponse = await axios.post(
      TOKEN_ENDPOINT,
      querystring.stringify({
        grant_type: 'refresh_token',
        refresh_token,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${basic}`,
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;

    // Fetch recently played tracks using the access token
    const recentResponse = await axios.get(RECENTLY_PLAYED_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const tracks = recentResponse.data.items.slice(0, 5).map((recentTrack: any) => ({
      song: recentTrack.track.name,
      songUrl: recentTrack.track.external_urls.spotify,
      artists: recentTrack.track.artists.map((artist: any) => artist.name).join(', '),
      albumCover: recentTrack.track.album.images[0].url,
    }));

    // Return the tracks data to the client
    res.status(200).json({ tracks });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Spotify data' });
  }
}
