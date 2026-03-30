const CLASSES = [
  {
    course: 'IT Systems Support NQF5',
    date: '2026-03-28',
    time: '08:00–12:00',
    venue: 'Pimville Room A',
    total: 18,
    present: 16,
    students: [
      { name: 'Sipho Dlamini', present: true },
      { name: 'Nomsa Khumalo', present: true },
      { name: 'Thabo Nkosi', present: false },
      { name: 'Zanele Mokoena', present: true },
      { name: 'Ayanda Zulu', present: true },
      { name: 'Bongani Cele', present: false },
      { name: 'Cebile Ndlovu', present: true },
      { name: 'Duduzile Mthembu', present: true },
    ],
  },
  {
    course: 'Software Developer NQF5',
    date: '2026-03-28',
    time: '13:00–17:00',
    venue: 'Pimville Room B',
    total: 14,
    present: 13,
    students: [
      { name: 'Lungelo Sithole', present: true },
      { name: 'Innocent Dlamini', present: true },
      { name: 'Obakeng Molefe', present: false },
      { name: 'Sibusiso Hadebe', present: true },
      { name: 'Refiloe Tau', present: true },
      { name: 'Hlanganani Ntuli', present: true },
    ],
  },
];

export default function LecturerAttendancePage() {
  const totalPresent = CLASSES.reduce((a, c) => a + c.present, 0);
  const totalStudents = CLASSES.reduce((a, c) => a + c.total, 0);
  const rate = Math.round((totalPresent / totalStudents) * 100);

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="font-heading font-bold text-white text-2xl">Attendance</h1>
        <p className="text-gray-400 text-sm mt-1">Today · {totalPresent}/{totalStudents} present · {rate}% attendance rate</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Total Today', value: totalStudents },
          { label: 'Present', value: totalPresent },
          { label: 'Attendance Rate', value: `${rate}%` },
        ].map(s => (
          <div key={s.label} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <p className="text-white font-bold font-heading text-2xl">{s.value}</p>
            <p className="text-gray-500 text-xs mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {CLASSES.map((cls) => (
          <div key={cls.course} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-800 flex items-center justify-between">
              <div>
                <h2 className="text-white font-semibold text-sm">{cls.course}</h2>
                <p className="text-gray-500 text-xs">{cls.date} · {cls.time} · {cls.venue}</p>
              </div>
              <span className="text-gray-400 text-sm">{cls.present}/{cls.total} present</span>
            </div>
            <div className="p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {cls.students.map(s => (
                <div key={s.name} className={`flex items-center gap-2 p-2 rounded-lg text-xs ${s.present ? 'bg-green-900/30 border border-green-800' : 'bg-red-900/20 border border-red-800'}`}>
                  <span>{s.present ? '✓' : '✗'}</span>
                  <span className={s.present ? 'text-green-300' : 'text-red-400'}>{s.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
