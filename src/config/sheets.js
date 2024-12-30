import { google } from 'googleapis';

// השם של הגיליון שאליו נתחבר
export const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID;

// הרשאות נדרשות
export const SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/drive.file',
];

// פונקציה ליצירת לקוח מאומת
export async function getAuthenticatedClient() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        project_id: process.env.GOOGLE_PROJECT_ID
      },
      scopes: SCOPES,
    });

    const client = await auth.getClient();
    return google.sheets({ version: 'v4', auth: client });
  } catch (error) {
    console.error('Error authenticating with Google:', error);
    throw error;
  }
}

// פונקציה לקריאת נתונים מהגיליון
export async function readSheetData(range) {
  const sheets = await getAuthenticatedClient();
  
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range,
    });
    
    return response.data.values;
  } catch (error) {
    console.error('Error reading sheet data:', error);
    throw error;
  }
}
