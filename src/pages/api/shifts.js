import { readSheetData } from '../../config/sheets';  // שים לב לנתיב - שני ../

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const data = await readSheetData('A1:L15');
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching shifts:', error);
    res.status(500).json({ message: 'Error fetching shifts data', error: error.message });
  }
}
