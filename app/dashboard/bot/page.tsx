import { DEMO_LEADS } from '@/lib/data/demo/leads';

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-blue-900 text-blue-300 border-blue-800',
  contacted: 'bg-yellow-900 text-yellow-300 border-yellow-800',
  enrolled: 'bg-green-900 text-green-300 border-green-800',
  closed: 'bg-gray-800 text-gray-400 border-gray-700',
};

const SOURCE_ICONS: Record<string, string> = {
  'WhatsApp Bot': '🤖',
  Website: '🌐',
  Referral: '👥',
};

export default function BotLeadsPage() {
  const newCount = DEMO_LEADS.filter((l) => l.status === 'new').length;
  const enrolledCount = DEMO_LEADS.filter((l) => l.status === 'enrolled').length;

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="font-heading font-bold text-white text-2xl">WhatsApp Bot — Leads</h1>
        <p className="text-gray-400 text-sm mt-1">
          {DEMO_LEADS.length} total leads · {newCount} new · {enrolledCount} enrolled
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {(['new', 'contacted', 'enrolled', 'closed'] as const).map((status) => {
          const count = DEMO_LEADS.filter((l) => l.status === status).length;
          return (
            <div key={status} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
              <p className="text-2xl font-bold font-heading text-white">{count}</p>
              <p className="text-gray-500 text-xs capitalize mt-0.5">{status}</p>
            </div>
          );
        })}
      </div>

      {/* Leads Table */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left text-gray-500 font-medium px-5 py-3">Name</th>
              <th className="text-left text-gray-500 font-medium px-5 py-3 hidden md:table-cell">Course Interest</th>
              <th className="text-left text-gray-500 font-medium px-5 py-3 hidden lg:table-cell">Phone</th>
              <th className="text-left text-gray-500 font-medium px-5 py-3 hidden sm:table-cell">Source</th>
              <th className="text-left text-gray-500 font-medium px-5 py-3 hidden lg:table-cell">Date</th>
              <th className="text-left text-gray-500 font-medium px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {DEMO_LEADS.map((lead, i) => (
              <tr
                key={lead.id}
                className={`border-b border-gray-800 hover:bg-gray-800/50 transition-colors ${
                  i === DEMO_LEADS.length - 1 ? 'border-b-0' : ''
                }`}
              >
                <td className="px-5 py-3">
                  <p className="text-white font-medium">{lead.name}</p>
                  <p className="text-gray-500 text-xs">{lead.email || '—'}</p>
                </td>
                <td className="px-5 py-3 text-gray-400 hidden md:table-cell">{lead.courseInterest}</td>
                <td className="px-5 py-3 text-gray-400 hidden lg:table-cell">{lead.phone}</td>
                <td className="px-5 py-3 hidden sm:table-cell">
                  <span className="text-gray-400 text-sm">
                    {SOURCE_ICONS[lead.source] ?? '📌'} {lead.source}
                  </span>
                </td>
                <td className="px-5 py-3 text-gray-400 hidden lg:table-cell">{lead.date}</td>
                <td className="px-5 py-3">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize ${
                      STATUS_COLORS[lead.status]
                    }`}
                  >
                    {lead.status}
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
