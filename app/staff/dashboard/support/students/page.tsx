const SUPPORT_STUDENTS = [
  { id: 'S001', name: 'Ayanda Zulu', course: 'IT Systems Support', risk: false },
  { id: 'S002', name: 'Bongani Cele', course: 'Business Management', risk: true },
  { id: 'S003', name: 'Cebile Ndlovu', course: 'Project Management', risk: true },
];

export default function SupportStudentsPage() {
  return (
    <div className="p-8">
      <h1 className="font-heading font-bold text-white text-2xl mb-2">My Students</h1>
      <p className="text-gray-400 text-sm mb-6">{SUPPORT_STUDENTS.length} students</p>

      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left px-5 py-3 text-gray-500 font-medium">Student</th>
              <th className="text-left px-5 py-3 text-gray-500 font-medium hidden md:table-cell">Course</th>
              <th className="text-left px-5 py-3 text-gray-500 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {SUPPORT_STUDENTS.map((s) => (
              <tr key={s.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                <td className="px-5 py-3 text-white font-medium">{s.name}</td>
                <td className="px-5 py-3 text-gray-400 hidden md:table-cell">{s.course}</td>
                <td className="px-5 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${s.risk ? 'bg-red-900 text-red-300' : 'bg-green-900 text-green-300'}`}>
                    {s.risk ? 'At Risk' : 'On Track'}
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
