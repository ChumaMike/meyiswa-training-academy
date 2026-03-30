const REPORTS = [
  { id: 'R01', name: 'March 2026 Enrolment Report', type: 'Enrolment', generated: '2026-03-28', status: 'ready', size: '245 KB' },
  { id: 'R02', name: 'Q1 2026 Attendance Summary', type: 'Attendance', generated: '2026-03-25', status: 'ready', size: '182 KB' },
  { id: 'R03', name: 'March Student Progress Report', type: 'Progress', generated: '2026-03-20', status: 'ready', size: '310 KB' },
  { id: 'R04', name: 'April 2026 Intake Forecast', type: 'Enrolment', generated: '—', status: 'pending', size: '—' },
  { id: 'R05', name: 'SETA Submission — Q1 2026', type: 'Compliance', generated: '—', status: 'pending', size: '—' },
];

export default function AdminReportsPage() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="font-heading font-bold text-white text-2xl">Reports</h1>
        <p className="text-gray-400 text-sm mt-1">{REPORTS.filter(r => r.status === 'ready').length} ready · {REPORTS.filter(r => r.status === 'pending').length} pending generation</p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden mb-5">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left text-gray-500 font-medium px-5 py-3">Report</th>
              <th className="text-left text-gray-500 font-medium px-5 py-3 hidden sm:table-cell">Type</th>
              <th className="text-left text-gray-500 font-medium px-5 py-3 hidden md:table-cell">Generated</th>
              <th className="text-left text-gray-500 font-medium px-5 py-3">Status</th>
              <th className="text-left text-gray-500 font-medium px-5 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {REPORTS.map((r, i) => (
              <tr key={r.id} className={`border-b border-gray-800 hover:bg-gray-800/50 ${i === REPORTS.length - 1 ? 'border-b-0' : ''}`}>
                <td className="px-5 py-3">
                  <p className="text-white text-sm">{r.name}</p>
                  {r.size !== '—' && <p className="text-gray-600 text-xs">{r.size}</p>}
                </td>
                <td className="px-5 py-3 hidden sm:table-cell">
                  <span className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded">{r.type}</span>
                </td>
                <td className="px-5 py-3 text-gray-500 text-xs hidden md:table-cell">{r.generated}</td>
                <td className="px-5 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${r.status === 'ready' ? 'bg-green-900 text-green-300' : 'bg-yellow-900 text-yellow-300'}`}>
                    {r.status}
                  </span>
                </td>
                <td className="px-5 py-3">
                  {r.status === 'ready' ? (
                    <button className="text-mta-gold text-xs hover:underline">Download →</button>
                  ) : (
                    <button className="text-gray-500 text-xs hover:text-white transition-colors">Generate</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <p className="text-gray-500 text-sm">
          <span className="text-mta-gold font-medium">System 03:</span> Full automated reporting (WSP/ATR, EE Reports, SETA submissions) activates with System 03 backend integration.
        </p>
      </div>
    </div>
  );
}
