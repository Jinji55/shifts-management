import React from 'react';
import ShiftManagement from '../components/ShiftManagement';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto py-8">
        <ShiftManagement />
      </main>
    </div>
  );
};

export default HomePage;
