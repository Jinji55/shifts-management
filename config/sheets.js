import { google } from 'googleapis';

// קריאה למשתני הסביבה מ-Vercel
export const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID;

export const SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/drive.file',
];

export async function getAuthenticatedClient() {
  try {
    // במקום להשתמש בקובץ, נשתמש במשתני סביבה
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

// [שאר הפונקציות נשארות ללא שינוי]
