// Admin Staff — Enrolments
const PENDING_ENROLMENTS = [
  { id: 'E1', name: 'Ayanda Zulu', course: 'IT Systems Support NQF5', applied: '2026-03-20', phone: '+27 72 111 2222', status: 'new' },
  { id: 'E2', name: 'Bongani Cele', course: 'Business Management NQF6', applied: '2026-03-22', phone: '+27 83 222 3333', status: 'under-review' },
  { id: 'E3', name: 'Cebile Ndlovu', course: 'Project Management NQF5', applied: '2026-03-25', phone: '+27 74 333 4444', status: 'new' },
];

export default function AdminEnrolmentsPage() {
  return (
    <div className="p-8">
      <h1 className="font-heading font-bold text-white text-2xl mb-2">Enrolment Applications</h1>
      <p className="text-gray-400 text-sm mb-6">{PENDING_ENROLMENTS.length} applications requiring review</p>

      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left text-gray-500 font-medium px-5 py-3">Name</th>
              <th className="text-left text-gray-500 font-medium px-5 py-3 hidden sm:table-cell">Course</th>
              <th className="text-left text-gray-500 font-medium px-5 py-3 hidden md:table-cell">Phone</th>
              <th className="text-left text-gray-500 font-medium px-5 py-3">Status</th>
              <th className="text-center text-gray-500 font-medium px-5 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {PENDING_ENROLMENTS.map((e, i) => (
              <tr key={e.id} className={`border-b border-gray-800 hover:bg-gray-800/50 transition-colors ${i === PENDING_ENROLMENTS.length - 1 ? 'border-b-0' : ''}`}>
                <td className="px-5 py-3 text-white font-medium">{e.name}</td>
                <td className="px-5 py-3 text-gray-400 hidden sm:table-cell">{e.course}</td>
                <td className="px-5 py-3 text-gray-400 hidden md:table-cell">{e.phone}</td>
                <td className="px-5 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    e.status === 'new' ? 'bg-blue-900 text-blue-300' : 'bg-yellow-900 text-yellow-300'
                  }`}>
                    {e.status === 'new' ? 'New' : 'Under Review'}
                  </span>
                </td>
                <td className="px-5 py-3 text-center">
                  <button className="text-mta-gold text-sm hover:underline">Review</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
