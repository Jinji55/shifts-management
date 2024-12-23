import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Edit2, Save } from 'lucide-react';

const ShiftManagement = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentUser, setCurrentUser] = useState('מפקד');

  const NOT_ASSIGNED = 'NOT_ASSIGNED';
  
  const [shifts, setShifts] = useState({
    'שג מערבי': {
      peoplePerShift: 1,
      shiftHours: ['08:00-12:00', '12:00-16:00', '16:00-20:00', '20:00-00:00', '00:00-04:00', '04:00-08:00'],
      assignments: {
        '08:00-12:00': ['בנימין פזמנטר'],
        '12:00-16:00': ['סלומון סינגסון'],
        '16:00-20:00': ['ינון גונן'],
        '20:00-00:00': ['אורן טביב'],
        '00:00-04:00': ['יעקב סביליה'],
        '04:00-08:00': ['יאיר תדמור']
      }
    },
    'גל': {
      peoplePerShift: 2,
      shiftHours: ['08:00-12:00', '12:00-16:00', '16:00-20:00', '20:00-00:00', '00:00-04:00', '04:00-08:00'],
      assignments: {
        '08:00-12:00': ['משה בר יוסף', 'יהודה ביתן'],
        '12:00-16:00': ['נתנאל אלמליח', 'דן טהומטה'],
        '16:00-20:00': ['שלומי כהן', 'דביר לרנר'],
        '20:00-00:00': [NOT_ASSIGNED, NOT_ASSIGNED],
        '00:00-04:00': ['דוד פאסי', NOT_ASSIGNED],
        '04:00-08:00': [NOT_ASSIGNED, NOT_ASSIGNED]
      }
    },
    'פטרול 300 + צפוני': {
      peoplePerShift: 2,
      shiftHours: ['04:30-08:00', '08:00-12:00', '12:00-16:00', '16:00-20:00', '20:00-00:00', '00:00-04:00'],
      assignments: {
        '04:30-08:00': ['יהודה ביתן', 'חגי קאופמן'],
        '08:00-12:00': ['מנחם פורטער', 'אלי סעדיה'],
        '12:00-16:00': ['דן טהומטה', 'דביר לרנר'],
        '16:00-20:00': ['ברוך שיינדמן', 'חיים פרידמן'],
        '20:00-00:00': [NOT_ASSIGNED, NOT_ASSIGNED],
        '00:00-04:00': [NOT_ASSIGNED, NOT_ASSIGNED]
      }
    },
    'אליאס': {
      peoplePerShift: 1,
      shiftHours: ['06:00-10:00', '10:00-14:00', '14:00-18:00', '18:00-22:00', '22:00-02:00', '02:00-06:00'],
      assignments: {
        '06:00-10:00': ['חגי קאופמן'],
        '10:00-14:00': ['אלי סעדיה'],
        '14:00-18:00': ['דביר לרנר'],
        '18:00-22:00': ['חיים פרידמן'],
        '22:00-02:00': ['שי שמואל'],
        '02:00-06:00': ['יהודה ביתן']
      }
    }
  });

  const soldiers = [
    'בנימין פזמנטר', 'סלומון סינגסון', 'ינון גונן', 'אורן טביב', 'יעקב סביליה', 
    'יאיר תדמור', 'משה בר יוסף', 'יהודה ביתן', 'נתנאל אלמליח', 'דן טהומטה',
    'שלומי כהן', 'דביר לרנר', 'דוד פאסי', 'חגי קאופמן', 'אלי סעדיה',
    'חיים פרידמן', 'שי שמואל', 'ברוך שיינדמן'
  ];

  const handleAssignmentChange = (position, hours, soldierIndex, newSoldier) => {
    setShifts(prev => {
      const newShifts = { ...prev };
      const assignments = [...newShifts[position].assignments[hours]];
      assignments[soldierIndex] = newSoldier;
      newShifts[position].assignments[hours] = assignments;
      return newShifts;
    });
  };

  const EditableCell = ({ position, hours, assignments }) => (
    <div className="space-y-2">
      {Array.from({ length: shifts[position].peoplePerShift }).map((_, index) => (
        <Select
          key={index}
          value={assignments[index] || NOT_ASSIGNED}
          onValueChange={(value) => handleAssignmentChange(position, hours, index, value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="בחר חייל" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={NOT_ASSIGNED}>לא משובץ</SelectItem>
            {soldiers.map(soldier => (
              <SelectItem key={soldier} value={soldier}>
                {soldier}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ))}
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto p-4 rtl">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Badge variant="outline">{currentUser}</Badge>
          {isEditMode ? (
            <Badge variant="destructive">מצב עריכה</Badge>
          ) : null}
        </div>
        <div className="flex gap-2">
          <Button
            variant={isEditMode ? "destructive" : "default"}
            onClick={() => setIsEditMode(!isEditMode)}
          >
            {isEditMode ? (
              <>
                <Save className="ml-2 h-4 w-4" />
                שמור שינויים
              </>
            ) : (
              <>
                <Edit2 className="ml-2 h-4 w-4" />
                ערוך שיבוץ
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(shifts).map(([position, data]) => (
          <Card key={position} className="w-full">
            <CardHeader>
              <CardTitle className="text-right">
                <span>
                  {position}
                  <span className="text-sm font-normal mr-2">
                    ({data.peoplePerShift} {data.peoplePerShift === 1 ? 'חייל' : 'חיילים'} למשמרת)
                  </span>
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
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
                          <EditableCell 
                            position={position}
                            hours={hours}
                            assignments={data.assignments[hours]}
                          />
                        ) : (
                          data.assignments[hours]?.map((soldier, i) => (
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
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ShiftManagement;
