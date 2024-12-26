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

 const formatDate = (date) => {
   return date.toLocaleDateString('he-IL', { 
     weekday: 'long',
     day: 'numeric',
     month: 'numeric'
   });
 };

 const [shifts, setShifts] = useState({
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

 const soldiers = [
   'בנימין פזמנטר', 'סלומון סינגסון', 'ינון גונן', 'אורן טביב', 'יעקב סביליה', 
   'יאיר תדמור', 'משה בר יוסף', 'יהודה ביתן', 'נתנאל אלמליח', 'דן טהומטה',
   'שלומי כהן', 'דביר לרנר', 'דוד פאסי', 'חגי קאופמן', 'אלי סעדיה',
   'חיים פרידמן', 'שי שמואל', 'ברוך שיינדמן'
 ];

 const handleAssignmentChange = (position, date, hours, soldierIndex, newSoldier) => {
   setShifts(prev => {
     const newShifts = { ...prev };
     const assignments = [...newShifts[position].assignments[date][hours]];
     assignments[soldierIndex] = newSoldier;
     newShifts[position].assignments[date][hours] = assignments;
     return newShifts;
   });
 };

 const EditableCell = ({ position, date, hours, assignments }) => (
   <div className="space-y-2 bg-white">
     {Array.from({ length: shifts[position].peoplePerShift }).map((_, index) => (
       <Select
         key={index}
         value={assignments[index] || NOT_ASSIGNED}
         onValueChange={(value) => handleAssignmentChange(position, date, hours, index, value)}
       >
         <SelectTrigger className="w-full">
           <SelectValue placeholder="בחר חייל" />
         </SelectTrigger>
         <SelectContent className="bg-white">
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
       <div className="flex items-center gap-4">
         <Badge variant="outline">{currentUser}</Badge>
         {isEditMode && <Badge variant="destructive">מצב עריכה</Badge>}
         <Select 
           value={selectedDate.toISOString()} 
           onValueChange={(value) => setSelectedDate(new Date(value))}
         >
           <SelectTrigger className="w-48">
             <SelectValue>{formatDate(selectedDate)}</SelectValue>
           </SelectTrigger>
           <SelectContent>
             {weekDates.map((date) => (
               <SelectItem key={date.toISOString()} value={date.toISOString()}>
                 {formatDate(date)}
               </SelectItem>
             ))}
           </SelectContent>
         </Select>
       </div>
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
                           date={selectedDate.toISOString()}
                           hours={hours}
                           assignments={data.assignments[selectedDate.toISOString()][hours]}
                         />
                       ) : (
                         data.assignments[selectedDate.toISOString()][hours]?.map((soldier, i) => (
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
