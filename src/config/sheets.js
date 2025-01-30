import { google } from 'googleapis';

export const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID;

export const SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/drive.file',
];

export async function getAuthenticatedClient() {
  const serviceAccount = {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    project_id: process.env.GOOGLE_PROJECT_ID
  };

  console.log('Service Account:', {
    hasEmail: !!serviceAccount.client_email,
    hasKey: !!serviceAccount.private_key,
    hasProject: !!serviceAccount.project_id,
    projectId: serviceAccount.project_id,
    emailDomain: serviceAccount.client_email?.split('@')[1]
  });

  if (!serviceAccount.client_email || !serviceAccount.private_key || !serviceAccount.project_id) {
    throw new Error('Missing required service account credentials');
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      ...serviceAccount,
      type: 'service_account'
    },
    scopes: SCOPES
  });

  return google.sheets({ version: 'v4', auth: await auth.getClient() });
}

export async function readSheetData(range) {
  if (!SPREADSHEET_ID) {
    throw new Error('GOOGLE_SPREADSHEET_ID is required');
  }

  const sheets = await getAuthenticatedClient();
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range
  });

  return response.data.values;
}
