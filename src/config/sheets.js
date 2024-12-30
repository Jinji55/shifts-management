import { google } from 'googleapis';

export const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID;

export const SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/drive.file',
];

export async function getAuthenticatedClient() {
  try {
    // נדפיס את המשתנים לבדיקה
    const credentials = {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      project_id: process.env.GOOGLE_PROJECT_ID
    };
    
    console.log('Credentials check:', {
      has_client_email: !!credentials.client_email,
      has_private_key: !!credentials.private_key,
      has_project_id: !!credentials.project_id
    });

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: SCOPES,
    });

    const client = await auth.getClient();
    return google.sheets({ version: 'v4', auth: client });
  } catch (error) {
    // נדפיס את השגיאה המלאה
    console.error('Full authentication error:', {
      message: error.message,
      stack: error.stack,
      details: error
    });
    throw error;
  }
}

export async function readSheetData(range) {
  try {
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
