import { google } from 'googleapis';

export const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID;

export const SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/drive.file',
];

export async function getAuthenticatedClient() {
  try {
    // בדיקת משתני סביבה
    if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_PROJECT_ID) {
      throw new Error('Missing required environment variables');
    }

    // וידוא שה-private key מעוצב נכון
    const privateKey = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n');
    
    const auth = new google.auth.GoogleAuth({
      credentials: {
        type: 'service_account',
        project_id: process.env.GOOGLE_PROJECT_ID,
        private_key: privateKey,
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
      },
      scopes: SCOPES,
    });

    const client = await auth.getClient();
    return google.sheets({ version: 'v4', auth: client });
  } catch (error) {
    console.error('Auth Error:', {
      missingVars: {
        client_email: !process.env.GOOGLE_CLIENT_EMAIL,
        private_key: !process.env.GOOGLE_PRIVATE_KEY,
        project_id: !process.env.GOOGLE_PROJECT_ID,
      },
      error: error.message
    });
    throw error;
  }
}

export async function readSheetData(range) {
  try {
    if (!SPREADSHEET_ID) {
      throw new Error('GOOGLE_SPREADSHEET_ID is not set');
    }

    const sheets = await getAuthenticatedClient();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range,
    });
    
    return response.data.values;
  } catch (error) {
    console.error('Sheet read error:', error);
    throw error;
  }
}
