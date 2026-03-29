// Support — Support Tickets
const TICKETS = [
  { id: 'TK1', student: 'Ayanda Zulu', course: 'IT Systems Support NQF5', issue: 'Cannot access course materials', priority: 'high', status: 'open', created: '2026-03-27' },
  { id: 'TK2', student: 'Bongani Makena', course: 'IT Systems Support NQF5', issue: 'Missing assignment feedback', priority: 'medium', status: 'open', created: '2026-03-26' },
  { id: 'TK3', student: 'Cebile Nkomo', course: 'IT Systems Support NQF5', issue: 'Request for deadline extension', priority: 'medium', status: 'in-progress', created: '2026-03-25' },
  { id: 'TK4', student: 'Duduzile Sithole', course: 'IT Technical Support NQF4', issue: 'Requires learning support assessment', priority: 'high', status: 'open', created: '2026-03-28' },
  { id: 'TK5', student: 'Elihle Khubone', course: 'IT Technical Support NQF4', issue: 'Financial hardship assistance', priority: 'high', status: 'escalated', created: '2026-03-28' },
];

export default function SupportTicketsPage() {
  const openCount = TICKETS.filter(t => t.status === 'open').length;
  const highPriorityCount = TICKETS.filter(t => t.priority === 'high').length;

  return (
    <div className="p-8">
      <h1 className="font-heading font-bold text-white text-2xl mb-2">Support Tickets</h1>
      <p className="text-gray-400 text-sm mb-6">{openCount} open · {highPriorityCount} high priority</p>

      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left text-gray-500 font-medium px-5 py-3">Student</th>
              <th className="text-left text-gray-500 font-medium px-5 py-3 hidden sm:table-cell">Issue</th>
              <th className="text-left text-gray-500 font-medium px-5 py-3 hidden md:table-cell">Priority</th>
              <th className="text-left text-gray-500 font-medium px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {TICKETS.map((t, i) => (
              <tr key={t.id} className={`border-b border-gray-800 hover:bg-gray-800/50 transition-colors ${i === TICKETS.length - 1 ? 'border-b-0' : ''}`}>
                <td className="px-5 py-3">
                  <p className="text-white font-medium">{t.student}</p>
                  <p className="text-gray-500 text-xs">{t.course}</p>
                </td>
                <td className="px-5 py-3 text-gray-400 hidden sm:table-cell">{t.issue}</td>
                <td className="px-5 py-3 hidden md:table-cell">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    t.priority === 'high' ? 'bg-red-900 text-red-300' : 'bg-yellow-900 text-yellow-300'
                  }`}>
                    {t.priority}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    t.status === 'open' ? 'bg-blue-900 text-blue-300' :
                    t.status === 'in-progress' ? 'bg-yellow-900 text-yellow-300' :
                    'bg-red-900 text-red-300'
                  }`}>
                    {t.status}
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
