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
        <div>{currentUser}</div>
        <button 
          onClick={() => setIsEditMode(!isEditMode)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {isEditMode ? 'שמור שינויים' : 'ערוך שיבוץ'}
        </button>
      </div>
      
      <div>
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

      <div className="mt-4">
        תאריך נבחר: {formatDate(selectedDate)}
      </div>
    </div>
  );
};

export default ShiftManagement;
