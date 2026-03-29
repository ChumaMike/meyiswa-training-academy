// Admin Staff — Schedules
const SCHEDULES = [
  { id: 'SC1', course: 'IT Systems Support NQF5', day: 'Monday', time: '09:00 - 13:00', venue: 'Lab 1 (Pimville)', students: 25 },
  { id: 'SC2', course: 'IT Systems Support NQF5', day: 'Wednesday', time: '14:00 - 17:00', venue: 'Classroom 3 (Pimville)', students: 25 },
  { id: 'SC3', course: 'IT Technical Support NQF4', day: 'Tuesday', time: '09:00 - 13:00', venue: 'Lab 2 (Pimville)', students: 22 },
  { id: 'SC4', course: 'IT Technical Support NQF4', day: 'Thursday', time: '14:00 - 17:00', venue: 'Classroom 2 (Pimville)', students: 22 },
];

export default function AdminSchedulesPage() {
  return (
    <div className="p-8">
      <h1 className="font-heading font-bold text-white text-2xl mb-2">Class Schedules</h1>
      <p className="text-gray-400 text-sm mb-6">{SCHEDULES.length} classes scheduled for this week</p>

      <div className="space-y-3">
        {SCHEDULES.map((s) => (
          <div key={s.id} className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex items-start gap-4">
            <div className="text-2xl">📍</div>
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-semibold">{s.course}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2 text-sm">
                <div>
                  <p className="text-gray-500 text-xs">Day</p>
                  <p className="text-gray-300">{s.day}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Time</p>
                  <p className="text-gray-300">{s.time}</p>
                </div>
               <div>
                  <p className="text-gray-500 text-xs">Venue</p>
                  <p className="text-gray-300">{s.venue}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Students</p>
                  <p className="text-gray-300">{s.students} enrolled</p>
                </div>
              </div>
            </div>
            <button className="text-mta-gold text-sm hover:underline shrink-0">Edit →</button>
          </div>
        ))}
      </div>
    </div>
  );
}
