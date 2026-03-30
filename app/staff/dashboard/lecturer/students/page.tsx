const STUDENTS = [
  { id: 'S01', name: 'Sipho Dlamini', course: 'IT Systems Support NQF5', enrolled: '2026-01-15', progress: 72, status: 'active', email: 'sipho.d@gmail.com' },
  { id: 'S02', name: 'Nomsa Khumalo', course: 'IT Systems Support NQF5', enrolled: '2026-01-15', progress: 85, status: 'active', email: 'nomsa.k@yahoo.com' },
  { id: 'S03', name: 'Thabo Nkosi', course: 'Software Developer NQF5', enrolled: '2026-01-20', progress: 44, status: 'at-risk', email: 'thabo.n@hotmail.com' },
  { id: 'S04', name: 'Zanele Mokoena', course: 'IT Systems Support NQF5', enrolled: '2026-01-15', progress: 91, status: 'active', email: 'zanele.m@gmail.com' },
  { id: 'S05', name: 'Lungelo Sithole', course: 'Software Developer NQF5', enrolled: '2026-01-20', progress: 38, status: 'at-risk', email: 'lungelo.s@gmail.com' },
  { id: 'S06', name: 'Ayanda Zulu', course: 'IT Systems Support NQF5', enrolled: '2026-01-15', progress: 67, status: 'active', email: 'ayanda.z@gmail.com' },
  { id: 'S07', name: 'Innocent Dlamini', course: 'Software Developer NQF5', enrolled: '2026-01-20', progress: 55, status: 'active', email: 'innocent.d@gmail.com' },
  { id: 'S08', name: 'Obakeng Molefe', course: 'IT Systems Development NQF4', enrolled: '2026-02-01', progress: 28, status: 'at-risk', email: 'obakeng.m@yahoo.com' },
  { id: 'S09', name: 'Sibusiso Hadebe', course: 'Cybersecurity Analyst NQF5', enrolled: '2026-02-01', progress: 60, status: 'active', email: 'sibusiso.h@gmail.com' },
  { id: 'S10', name: 'Hlanganani Ntuli', course: 'IT Technical Support NQF4', enrolled: '2026-02-10', progress: 45, status: 'active', email: 'hlanganani.n@gmail.com' },
];

export default function LecturerStudentsPage() {
  const atRisk = STUDENTS.filter(s => s.status === 'at-risk').length;

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="font-heading font-bold text-white text-2xl">My Students</h1>
        <p className="text-gray-400 text-sm mt-1">{STUDENTS.length} enrolled · {atRisk} at risk</p>
      </div>

      {atRisk > 0 && (
        <div className="mb-5 bg-red-900/20 border border-red-800 rounded-xl p-4 flex items-start gap-3">
          <span className="text-red-400 text-lg">⚠️</span>
          <p className="text-red-300 text-sm">{atRisk} students are below 50% progress and may need immediate support. Consider scheduling check-in sessions.</p>
        </div>
      )}

      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left text-gray-500 font-medium px-5 py-3">Student</th>
              <th className="text-left text-gray-500 font-medium px-5 py-3 hidden md:table-cell">Course</th>
              <th className="text-left text-gray-500 font-medium px-5 py-3 hidden lg:table-cell">Enrolled</th>
              <th className="text-left text-gray-500 font-medium px-5 py-3">Progress</th>
              <th className="text-left text-gray-500 font-medium px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {STUDENTS.map((s, i) => (
              <tr key={s.id} className={`border-b border-gray-800 hover:bg-gray-800/50 ${i === STUDENTS.length - 1 ? 'border-b-0' : ''}`}>
                <td className="px-5 py-3">
                  <p className="text-white font-medium">{s.name}</p>
                  <p className="text-gray-500 text-xs">{s.email}</p>
                </td>
                <td className="px-5 py-3 text-gray-400 text-xs hidden md:table-cell">{s.course}</td>
                <td className="px-5 py-3 text-gray-500 text-xs hidden lg:table-cell">{s.enrolled}</td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-800 rounded-full h-1.5">
                      <div className={`h-1.5 rounded-full ${s.progress >= 60 ? 'bg-green-500' : s.progress >= 40 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${s.progress}%` }} />
                    </div>
                    <span className="text-gray-400 text-xs">{s.progress}%</span>
                  </div>
                </td>
                <td className="px-5 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${s.status === 'active' ? 'bg-green-900 text-green-300 border-green-800' : 'bg-red-900 text-red-300 border-red-800'}`}>
                    {s.status === 'at-risk' ? 'At Risk' : 'Active'}
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
