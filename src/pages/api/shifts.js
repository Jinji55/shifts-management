import { readSheetData } from '../../../config/sheets';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // נקרא את הנתונים מהגיליון - נשתמש בטווח A1:L15 כדוגמה
    // תצטרך להתאים את הטווח בהתאם למבנה הגיליון שלך
    const data = await readSheetData('A1:L15');
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching shifts:', error);
    res.status(500).json({ message: 'Error fetching shifts data', error: error.message });
  }
}
