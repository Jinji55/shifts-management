import ShiftsTable from '../components/ShiftsTable';
import ShiftManagement from '../components/ShiftManagement';

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">מערכת ניהול משמרות</h1>
        <ShiftManagement />
        <div className="mt-8">
          <ShiftsTable />
        </div>
      </div>
    </main>
  );
}
