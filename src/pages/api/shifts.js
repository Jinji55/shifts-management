import { readSheetData } from '../../config/sheets';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    console.log('Starting API request');
    console.log('Environment check:', {
      has_spreadsheet_id: !!process.env.GOOGLE_SPREADSHEET_ID,
      has_client_email: !!process.env.GOOGLE_CLIENT_EMAIL,
      has_private_key: !!process.env.GOOGLE_PRIVATE_KEY,
      has_project_id: !!process.env.GOOGLE_PROJECT_ID
    });

    const data = await readSheetData('A1:L15');
    res.status(200).json(data);
  } catch (error) {
    console.error('API Error:', {
      message: error.message,
      name: error.name,
      stack: error.stack
    });

    res.status(500).json({
      message: 'Error fetching shifts data',
      error: error.message,
      name: error.name
    });
  }
}
