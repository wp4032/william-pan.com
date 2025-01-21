// pages/api/views.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { CounterAPI } from 'counterapi';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check if request is from home page by checking referer
  const referer = req.headers.referer;
  if (!referer || !referer.endsWith('/')) {
    return res.status(403).json({ error: 'Access denied' });
  }

  try {
    const counter = new CounterAPI(); // Initialize the CounterAPI

    const counter_website = process.env.COUNTER_WEBSITE;
    const counter_name = process.env.COUNTER_NAME;

    if (!counter_website || !counter_name) {
      return res.status(400).json({ error: 'Environment variables COUNTER_WEBSITE and COUNTER_NAME are required' });
    }

    const result = await counter.up(counter_website, counter_name);

    // Assuming 'result.Count' is the correct structure
    res.status(200).json({ count: result.Count });
  } catch (error) {
    console.error("Error updating counter:", error);
    res.status(500).json({ error: 'Error updating counter' });
  }
}
