import React, { useState } from 'react';

const ShiftManagement = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentUser] = useState('מפקד');
  const NOT_ASSIGNED = 'NOT_ASSIGNED';

  const [weekDates] = useState(() => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const diff = dayOfWeek === 0 ? 0 : -dayOfWeek;
    
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() + diff + i);
      return date;
    });
  });

  const [selectedDate, setSelectedDate] = useState(weekDates[0]);

  const soldiers = [
    'בנימין פזמנטר', 'סלומון סינגסון', 'ינון גונן', 'אורן טביב', 'יעקב סביליה',
    'יאיר תדמור', 'משה בר יוסף', 'יהודה ביתן', 'נתנאל אלמליח', 'דן טהומטה',
    'שלומי כהן', 'דביר לרנר', 'דוד פאסי', 'חגי קאופמן', 'אלי סעדיה',
    'חיים פרידמן', 'שי שמואל', 'ברוך שיינדמן'
  ].sort((a, b) => a.localeCompare(b, 'he'));

  const [shifts] = useState({
    'שג מערבי': {
      peoplePerShift: 1,
      shiftHours: ['08:00-12:00', '12:00-16:00', '16:00-20:00', '20:00-00:00', '00:00-04:00', '04:00-08:00'],
      assignments: weekDates.reduce((acc, date) => ({
        ...acc,
        [date.toISOString()]: {
          '08:00-12:00': ['בנימין פזמנטר'],
          '12:00-16:00': ['סלומון סינגסון'],
          '16:00-20:00': ['ינון גונן'],
          '20:00-00:00': ['אורן טביב'],
          '00:00-04:00': ['יעקב סביליה'],
          '04:00-08:00': ['יאיר תדמור']
        }
      }), {})
    },
    'גל': {
      peoplePerShift: 2,
      shiftHours: ['08:00-12:00', '12:00-16:00', '16:00-20:00', '20:00-00:00', '00:00-04:00', '04:00-08:00'],
      assignments: weekDates.reduce((acc, date) => ({
        ...acc,
        [date.toISOString()]: {
          '08:00-12:00': ['משה בר יוסף', 'יהודה ביתן'],
          '12:00-16:00': ['נתנאל אלמליח', 'דן טהומטה'],
          '16:00-20:00': ['שלומי כהן', 'דביר לרנר'],
          '20:00-00:00': [NOT_ASSIGNED, NOT_ASSIGNED],
          '00:00-04:00': ['דוד פאסי', NOT_ASSIGNED],
          '04:00-08:00': [NOT_ASSIGNED, NOT_ASSIGNED]
        }
      }), {})
    },
    'פטרול': {
      peoplePerShift: 2,
      shiftHours: ['04:30-08:00', '17:00-21:00'],
      assignments: weekDates.reduce((acc, date) => ({
        ...acc,
        [date.toISOString()]: {
          '04:30-08:00': ['יהודה ביתן', 'חגי קאופמן'],
          '17:00-21:00': ['ברוך שיינדמן', 'חיים פרידמן']
        }
      }), {})
    },
    'אליאס': {
      peoplePerShift: 1,
      shiftHours: ['06:00-10:00', '10:00-14:00', '14:00-18:00', '18:00-22:00', '22:00-02:00', '02:00-06:00'],
      assignments: weekDates.reduce((acc, date) => ({
        ...acc,
        [date.toISOString()]: {
          '06:00-10:00': ['חגי קאופמן'],
          '10:00-14:00': ['אלי סעדיה'],
          '14:00-18:00': ['דביר לרנר'],
          '18:00-22:00': ['חיים פרידמן'],
          '22:00-02:00': ['שי שמואל'],
          '02:00-06:00': ['יהודה ביתן']
        }
      }), {})
    }
  });

  const formatDate = (date) => {
    return date.toLocaleDateString('he-IL', { 
      weekday: 'long',
      day: 'numeric',
      month: 'numeric'
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 rtl">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <div className="px-2 py-1 bg-gray-100 rounded">{currentUser}</div>
          {isEditMode && (
            <div className="px-2 py-1 bg-red-100 text-red-700 rounded">מצב עריכה</div>
          )}
          <select 
            value={selectedDate.toISOString()}
            onChange={(e) => setSelectedDate(new Date(e.target.value))}
            className="w-48 p-2 border rounded"
          >
            {weekDates.map((date) => (
              <option key={date.toISOString()} value={date.toISOString()}>
                {formatDate(date)}
              </option>
            ))}
          </select>
        </div>
        <button 
          onClick={() => setIsEditMode(!isEditMode)}
          className={`px-4 py-2 rounded ${isEditMode ? 'bg-red-500' : 'bg-blue-500'} text-white`}
        >
          {isEditMode ? 'שמור שינויים' : 'ערוך שיבוץ'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(shifts).map(([position, data]) => (
          <div key={position} className="border rounded-lg p-4">
            <div className="font-bold text-lg mb-2">
              {position}
              <span className="text-sm font-normal mr-2">
                ({data.peoplePerShift} {data.peoplePerShift === 1 ? 'חייל' : 'חיילים'} למשמרת)
              </span>
            </div>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-right p-2">שעות</th>
                  <th className="text-right p-2">חיילים</th>
                </tr>
              </thead>
              <tbody>
                {data.shiftHours.map(hours => (
                  <tr key={hours} className="hover:bg-gray-50">
                    <td className="p-2 border">{hours}</td>
                    <td className="p-2 border">
                      {isEditMode ? (
                        <select 
                          value={data.assignments[selectedDate.toISOString()][hours][0] || NOT_ASSIGNED}
                          className="w-full p-1 border rounded"
                        >
                          <option value={NOT_ASSIGNED}>לא משובץ</option>
                          {soldiers.map(soldier => (
                            <option key={soldier} value={soldier}>
                              {soldier}
                            </option>
                          ))}
                        </select>
                      ) : (
                        data.assignments[selectedDate.toISOString()][hours].map((soldier, i) => (
                          <div 
                            key={i}
                            className={`${soldier === NOT_ASSIGNED ? 'text-red-500' : ''} ${i > 0 ? 'mt-1' : ''}`}
                          >
                            {soldier === NOT_ASSIGNED ? 'לא משובץ' : soldier}
                          </div>
                        ))
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShiftManagement;
