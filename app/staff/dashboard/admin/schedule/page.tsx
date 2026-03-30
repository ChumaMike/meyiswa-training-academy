const SCHEDULE = [
  { id: 'SC01', course: 'IT Systems Support NQF5', day: 'Monday & Wednesday', time: '08:00–12:00', venue: 'Pimville Campus 1 — Room A', lecturer: 'Mr. Dlamini', students: 18, status: 'active' },
  { id: 'SC02', course: 'Software Developer NQF5', day: 'Monday & Wednesday', time: '13:00–17:00', venue: 'Pimville Campus 1 — Room B', lecturer: 'Ms. Khumalo', students: 14, status: 'active' },
  { id: 'SC03', course: 'Business Management NQF6', day: 'Tuesday & Thursday', time: '08:00–12:00', venue: 'Pimville Campus 2 — Room 3', lecturer: 'Mr. Mokoena', students: 21, status: 'active' },
  { id: 'SC04', course: 'HR Management NQF5', day: 'Tuesday & Thursday', time: '13:00–17:00', venue: 'Pimville Campus 2 — Room 4', lecturer: 'Ms. Nkosi', students: 16, status: 'active' },
  { id: 'SC05', course: 'Health & Safety NQF4', day: 'Friday', time: '08:00–16:00', venue: 'Roodepoort Campus — Lab 1', lecturer: 'Mr. Sithole', students: 12, status: 'active' },
  { id: 'SC06', course: 'Retail Store Manager NQF6', day: 'Saturday', time: '08:00–13:00', venue: 'Pimville Campus 1 — Room C', lecturer: 'Ms. Vilakazi', students: 9, status: 'upcoming' },
];

export default function AdminSchedulePage() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="font-heading font-bold text-white text-2xl">Class Schedule</h1>
        <p className="text-gray-400 text-sm mt-1">{SCHEDULE.length} active classes · {SCHEDULE.reduce((a, s) => a + s.students, 0)} students enrolled</p>
      </div>

      <div className="space-y-3">
        {SCHEDULE.map((cls) => (
          <div key={cls.id} className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h3 className="text-white font-semibold text-sm">{cls.course}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full ${cls.status === 'active' ? 'bg-green-900 text-green-300' : 'bg-blue-900 text-blue-300'}`}>
                  {cls.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-x-6 gap-y-1 mt-2 text-xs text-gray-500">
                <span>📅 {cls.day}</span>
                <span>🕐 {cls.time}</span>
                <span>📍 {cls.venue}</span>
                <span>👨‍🏫 {cls.lecturer}</span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="text-mta-gold text-xl font-bold">{cls.students}</p>
              <p className="text-gray-600 text-xs">students</p>
              <button className="mt-2 text-xs text-gray-500 hover:text-white transition-colors">Edit →</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
