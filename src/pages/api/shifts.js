import { readSheetData } from '../../config/sheets';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Added timestamp for debugging
  const timestamp = new Date().toISOString();
  console.log(`API request started at ${timestamp}`);

  try {
    const data = await readSheetData('A1:L15');
    res.status(200).json(data);
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({
      message: 'Error fetching shifts data',
      error: error.message,
      timestamp
    });
  }
}
