import { readSheetData } from '../../config/sheets';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Debug logs
    console.log('Environment Variables Check:', {
      SPREADSHEET_ID: !!process.env.GOOGLE_SPREADSHEET_ID,
      CLIENT_EMAIL: !!process.env.GOOGLE_CLIENT_EMAIL,
      PROJECT_ID: !!process.env.GOOGLE_PROJECT_ID,
      PRIVATE_KEY: !!process.env.GOOGLE_PRIVATE_KEY
    });

    // בדיקת טווח הנתונים הרצוי בגיליון
    const data = await readSheetData('A1:H15');  // התאמה לטווח הנכון בגיליון שלך
    
    if (!data) {
      throw new Error('No data received from sheet');
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('API Error Details:', error);
    
    res.status(500).json({
      message: 'Error fetching shifts data',
      error: error.message,
      details: {
        type: error.name,
        stack: error.stack
      }
    });
  }
}
