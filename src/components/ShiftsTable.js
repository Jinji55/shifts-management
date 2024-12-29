import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const ShiftsTable = () => {
  const [shifts, setShifts] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const response = await fetch('/api/shifts');
        if (!response.ok) {
          throw new Error('Failed to fetch shifts data');
        }
        const data = await response.json();
        setShifts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchShifts();
  }, []);

  if (loading) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-6">
          <div className="text-center">טוען נתונים...</div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-6">
          <div className="text-center text-red-500">
            שגיאה בטעינת הנתונים: {error}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!shifts) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-6">
          <div className="text-center">אין נתונים להצגה</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">טבלת משמרות</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-2 border text-right">שעות</th>
                <th className="p-2 border text-right">ראשון</th>
                <th className="p-2 border text-right">שני</th>
                <th className="p-2 border text-right">שלישי</th>
                <th className="p-2 border text-right">רביעי</th>
                <th className="p-2 border text-right">חמישי</th>
                <th className="p-2 border text-right">שישי</th>
                <th className="p-2 border text-right">שבת</th>
              </tr>
            </thead>
            <tbody>
              {shifts.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="p-2 border text-right">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShiftsTable;
