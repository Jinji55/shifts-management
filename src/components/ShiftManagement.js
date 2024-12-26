import React, { useState, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Edit2, Save } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const ShiftManagement = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentUser, setCurrentUser] = useState('מפקד');
  const [searchQuery, setSearchQuery] = useState('');
  
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

  const soldiers = [
    'בנימין פזמנטר', 'סלומון סינגסון', 'ינון גונן', 'אורן טביב', 'יעקב סביליה', 
    'יאיר תדמור', 'משה בר יוסף', 'יהודה ביתן', 'נתנאל אלמליח', 'דן טהומטה',
    'שלומי כהן', 'דביר לרנר', 'דוד פאסי', 'חגי קאופמן', 'אלי סעדיה',
    'חיים פרידמן', 'שי שמואל', 'ברוך שיינדמן'
  ].sort((a, b) => a.localeCompare(b, 'he'));

  const handleKeyPress = (e, setSearch) => {
    const key = e.key;
    if (/^[\u0590-\u05FF]$/.test(key)) { // Hebrew letters only
      setSearch(key);
    }
  };

  const filteredSoldiers = soldiers.filter(soldier => 
    !searchQuery || soldier.startsWith(searchQuery)
  );

  // ... rest of your state and shifts code remains the same ...

  const EditableCell = ({ position, date, hours, assignments }) => (
    <div className="space-y-2">
      {Array.from({ length: shifts[position].peoplePerShift }).map((_, index) => (
        <Select
          key={index}
          value={assignments[index] || NOT_ASSIGNED}
          onValueChange={(value) => handleAssignmentChange(position, date, hours, index, value)}
          onOpenChange={() => setSearchQuery('')}
        >
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="בחר חייל" />
          </SelectTrigger>
          <SelectContent 
            className="bg-white shadow-lg border-gray-200"
            onKeyDown={(e) => handleKeyPress(e, setSearchQuery)}
          >
            <ScrollArea className="h-[200px]">
              <SelectItem value={NOT_ASSIGNED} className="bg-white hover:bg-gray-100">
                לא משובץ
              </SelectItem>
              {filteredSoldiers.map(soldier => (
                <SelectItem key={soldier} value={soldier} className="bg-white hover:bg-gray-100">
                  {soldier}
                </SelectItem>
              ))}
            </ScrollArea>
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
            <SelectTrigger className="w-48 bg-white">
              <SelectValue>{formatDate(selectedDate)}</SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-white shadow-lg border-gray-200">
              <ScrollArea className="h-[200px]">
                {weekDates.map((date) => (
                  <SelectItem key={date.toISOString()} value={date.toISOString()} className="bg-white hover:bg-gray-100">
                    {formatDate(date)}
                  </SelectItem>
                ))}
              </ScrollArea>
            </SelectContent>
          </Select>
        </div>

        {/* ... rest of your UI code remains the same ... */}
      </div>
    </div>
  );
};

export default ShiftManagement;
