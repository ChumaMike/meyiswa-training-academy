const TICKETS = [
  { id: 'TK01', student: 'Sipho Dlamini', course: 'IT Systems Support NQF5', issue: 'Cannot access e-learning portal — password reset needed', priority: 'high', status: 'open', date: '2026-03-28' },
  { id: 'TK02', student: 'Nomsa Khumalo', course: 'Business Management NQF6', issue: 'Missing module 3 study materials — not received after class', priority: 'medium', status: 'in-progress', date: '2026-03-27' },
  { id: 'TK03', student: 'Thabo Nkosi', course: 'Project Management NQF5', issue: 'Struggling with assessment brief — requesting extra support session', priority: 'high', status: 'escalated', date: '2026-03-26' },
  { id: 'TK04', student: 'Cebile Ndlovu', course: 'IT Systems Support NQF5', issue: 'Transport difficulty getting to campus on Mondays — requesting schedule change', priority: 'medium', status: 'in-progress', date: '2026-03-25' },
  { id: 'TK05', student: 'Fanele Gumede', course: 'Health & Safety NQF4', issue: 'Certificate of attendance not received after Q1 module completion', priority: 'low', status: 'open', date: '2026-03-24' },
  { id: 'TK06', student: 'Obakeng Molefe', course: 'IT Systems Development NQF4', issue: 'At risk of failing — requested counseling and academic support', priority: 'high', status: 'escalated', date: '2026-03-23' },
  { id: 'TK07', student: 'Refiloe Tau', course: 'Community Development NQF5', issue: 'Fee payment arrangement request — financial hardship', priority: 'medium', status: 'open', date: '2026-03-22' },
];

const PRIORITY_COLORS: Record<string, string> = {
  high: 'bg-red-900 text-red-300 border-red-800',
  medium: 'bg-yellow-900 text-yellow-300 border-yellow-800',
  low: 'bg-gray-800 text-gray-400 border-gray-700',
};

const STATUS_COLORS: Record<string, string> = {
  open: 'bg-blue-900 text-blue-300',
  'in-progress': 'bg-yellow-900 text-yellow-300',
  escalated: 'bg-red-900 text-red-300',
  resolved: 'bg-green-900 text-green-300',
};

export default function SupportTicketsPage() {
  const open = TICKETS.filter(t => t.status === 'open').length;
  const escalated = TICKETS.filter(t => t.status === 'escalated').length;

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="font-heading font-bold text-white text-2xl">Support Tickets</h1>
        <p className="text-gray-400 text-sm mt-1">{TICKETS.length} total · {open} open · {escalated} escalated</p>
      </div>

      {escalated > 0 && (
        <div className="mb-5 bg-red-900/20 border border-red-800 rounded-xl p-4 flex items-start gap-3">
          <span className="text-red-400">⚠️</span>
          <p className="text-red-300 text-sm">{escalated} ticket{escalated > 1 ? 's' : ''} escalated — requires immediate attention.</p>
        </div>
      )}

      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left text-gray-500 font-medium px-5 py-3">Student</th>
              <th className="text-left text-gray-500 font-medium px-5 py-3 hidden md:table-cell">Issue</th>
              <th className="text-left text-gray-500 font-medium px-5 py-3">Priority</th>
              <th className="text-left text-gray-500 font-medium px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {TICKETS.map((t, i) => (
              <tr key={t.id} className={`border-b border-gray-800 hover:bg-gray-800/50 ${i === TICKETS.length - 1 ? 'border-b-0' : ''}`}>
                <td className="px-5 py-3">
                  <p className="text-white font-medium text-sm">{t.student}</p>
                  <p className="text-gray-500 text-xs">{t.course}</p>
                  <p className="text-gray-600 text-xs">{t.date}</p>
                </td>
                <td className="px-5 py-3 text-gray-400 text-sm hidden md:table-cell max-w-xs">{t.issue}</td>
                <td className="px-5 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${PRIORITY_COLORS[t.priority]}`}>{t.priority}</span>
                </td>
                <td className="px-5 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${STATUS_COLORS[t.status]}`}>{t.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
