import { readSheetData } from '../../config/sheets';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // הדפסת ערכי משתני הסביבה לבדיקה
    const envVars = {
      SPREADSHEET_ID: process.env.GOOGLE_SPREADSHEET_ID,
      CLIENT_EMAIL: process.env.GOOGLE_CLIENT_EMAIL,
      PROJECT_ID: process.env.GOOGLE_PROJECT_ID,
      HAS_PRIVATE_KEY: !!process.env.GOOGLE_PRIVATE_KEY
    };
    
    console.log('Environment Variables:', envVars);

    // ניסיון לקרוא את הנתונים
    const data = await readSheetData('A1:H15');
    res.status(200).json(data);
  } catch (error) {
    const errorDetails = {
      message: error.message,
      name: error.name,
      stack: error.stack,
      envVarsExist: {
        SPREADSHEET_ID: !!process.env.GOOGLE_SPREADSHEET_ID,
        CLIENT_EMAIL: !!process.env.GOOGLE_CLIENT_EMAIL,
        PROJECT_ID: !!process.env.GOOGLE_PROJECT_ID,
        PRIVATE_KEY: !!process.env.GOOGLE_PRIVATE_KEY
      }
    };
    console.error('Full error details:', errorDetails);
    res.status(500).json(errorDetails);
  }
}
