// Lecturer — My Students
const MY_STUDENTS = [
  { id: 'S1', name: 'Ayanda Zulu', course: 'IT Systems Support NQF5', enrolled: '2026-03-01', progress: 45, status: 'active' },
  { id: 'S2', name: 'Bongani Makena', course: 'IT Systems Support NQF5', enrolled: '2026-03-01', progress: 38, status: 'active' },
  { id: 'S3', name: 'Cebile Nkomo', course: 'IT Systems Support NQF5', enrolled: '2026-03-01', progress: 52, status: 'active' },
  { id: 'S4', name: 'Duduzile Sithole', course: 'IT Technical Support NQF4', enrolled: '2026-03-15', progress: 28, status: 'active' },
  { id: 'S5', name: 'Elihle Khubone', course: 'IT Technical Support NQF4', enrolled: '2026-03-15', progress: 35, status: 'at-risk' },
];

export default function LecturerStudentsPage() {
  return (
    <div className="p-8">
      <h1 className="font-heading font-bold text-white text-2xl mb-2">My Students</h1>
      <p className="text-gray-400 text-sm mb-6">{MY_STUDENTS.length} students enrolled across your courses</p>

      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left text-gray-500 font-medium px-5 py-3">Name</th>
              <th className="text-left text-gray-500 font-medium px-5 py-3 hidden sm:table-cell">Course</th>
              <th className="text-left text-gray-500 font-medium px-5 py-3 hidden md:table-cell">Enrolled</th>
              <th className="text-left text-gray-500 font-medium px-5 py-3">Progress</th>
              <th className="text-left text-gray-500 font-medium px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {MY_STUDENTS.map((s, i) => (
              <tr key={s.id} className={`border-b border-gray-800 hover:bg-gray-800/50 transition-colors ${i === MY_STUDENTS.length - 1 ? 'border-b-0' : ''}`}>
                <td className="px-5 py-3 text-white font-medium">{s.name}</td>
                <td className="px-5 py-3 text-gray-400 hidden sm:table-cell">{s.course}</td>
                <td className="px-5 py-3 text-gray-400 hidden md:table-cell">{s.enrolled}</td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2 w-24">
                    <div className="flex-1 bg-gray-800 rounded-full h-1.5">
                      <div className="bg-mta-gold h-1.5 rounded-full" style={{ width: `${s.progress}%` }}></div>
                    </div>
                    <span className="text-xs text-gray-400">{s.progress}%</span>
                  </div>
                </td>
                <td className="px-5 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    s.status === 'active' ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'
                  }`}>
                    {s.status === 'active' ? 'Active' : 'At Risk'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
