import { DEMO_ENROLMENTS } from '@/lib/data/demo/enrolments';
import { DEMO_LEADS } from '@/lib/data/demo/leads';
import { COURSES } from '@/lib/data/courses';
import { FACULTIES } from '@/lib/data/faculties';

export default function ReportsPage() {
  const enrolmentsByFaculty = FACULTIES.map((f) => ({
    faculty: f.shortLabel,
    icon: f.icon,
    count: DEMO_ENROLMENTS.filter((e) => e.faculty.toLowerCase().includes(f.shortLabel.toLowerCase()) || e.faculty.toLowerCase().includes(f.label.toLowerCase().split(' ')[0])).length,
    total: f.courseCount,
  }));

  const nqfGroups = [4, 5, 6, 7].map((level) => ({
    level,
    count: COURSES.filter((c) => c.nqfLevel === level).length,
  }));

  const leadSources = [
    { source: 'WhatsApp Bot', count: DEMO_LEADS.filter((l) => l.source === 'WhatsApp Bot').length },
    { source: 'Website', count: DEMO_LEADS.filter((l) => l.source === 'Website').length },
    { source: 'Referral', count: DEMO_LEADS.filter((l) => l.source === 'Referral').length },
  ];

  const enrolmentStatuses = [
    { status: 'Accepted', count: DEMO_ENROLMENTS.filter((e) => e.status === 'accepted').length, color: 'bg-green-500' },
    { status: 'Under Review', count: DEMO_ENROLMENTS.filter((e) => e.status === 'under-review').length, color: 'bg-yellow-500' },
    { status: 'New', count: DEMO_ENROLMENTS.filter((e) => e.status === 'new').length, color: 'bg-blue-500' },
    { status: 'Rejected', count: DEMO_ENROLMENTS.filter((e) => e.status === 'rejected').length, color: 'bg-red-500' },
  ];

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="font-heading font-bold text-white text-2xl">Reports & Analytics</h1>
        <p className="text-gray-400 text-sm mt-1">Overview of enrolments, leads, and course catalogue. Live data requires System 03 backend.</p>
      </div>

      {/* Top stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Courses', value: COURSES.length, icon: '📚' },
          { label: 'Total Enrolments', value: DEMO_ENROLMENTS.length, icon: '📝' },
          { label: 'Total Leads', value: DEMO_LEADS.length, icon: '💬' },
          { label: 'Acceptance Rate', value: `${Math.round((DEMO_ENROLMENTS.filter(e => e.status === 'accepted').length / DEMO_ENROLMENTS.length) * 100)}%`, icon: '✅' },
        ].map((stat) => (
          <div key={stat.label} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <span className="text-2xl">{stat.icon}</span>
            <p className="font-heading font-bold text-white text-3xl mt-2">{stat.value}</p>
            <p className="text-gray-500 text-xs mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Enrolment Status Breakdown */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <h2 className="font-heading font-semibold text-white text-base mb-4">Enrolment Status</h2>
          <div className="space-y-3">
            {enrolmentStatuses.map((s) => (
              <div key={s.status} className="flex items-center gap-3">
                <div className="w-24 text-gray-400 text-sm">{s.status}</div>
                <div className="flex-1 bg-gray-800 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${s.color}`}
                    style={{ width: `${(s.count / DEMO_ENROLMENTS.length) * 100}%` }}
                  />
                </div>
                <div className="text-gray-400 text-sm w-6 text-right">{s.count}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Lead Sources */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <h2 className="font-heading font-semibold text-white text-base mb-4">Lead Sources</h2>
          <div className="space-y-3">
            {leadSources.map((s) => (
              <div key={s.source} className="flex items-center gap-3">
                <div className="w-28 text-gray-400 text-sm">{s.source}</div>
                <div className="flex-1 bg-gray-800 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-mta-gold"
                    style={{ width: `${(s.count / DEMO_LEADS.length) * 100}%` }}
                  />
                </div>
                <div className="text-gray-400 text-sm w-6 text-right">{s.count}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Courses by NQF Level */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <h2 className="font-heading font-semibold text-white text-base mb-4">Courses by NQF Level</h2>
          <div className="space-y-3">
            {nqfGroups.map((n) => (
              <div key={n.level} className="flex items-center gap-3">
                <div className="text-gray-400 text-sm w-16">NQF {n.level}</div>
                <div className="flex-1 bg-gray-800 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-blue-500"
                    style={{ width: `${(n.count / COURSES.length) * 100}%` }}
                  />
                </div>
                <div className="text-gray-400 text-sm w-8 text-right">{n.count}</div>
              </div>
            ))}
          </div>
        </div>

        {/* WSP/ATR Notice */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <h2 className="font-heading font-semibold text-white text-base mb-3">WSP / ATR Reports</h2>
          <div className="space-y-3">
            {[
              { label: 'Annual Training Report (ATR)', status: 'Pending System 03' },
              { label: 'Workplace Skills Plan (WSP)', status: 'Pending System 03' },
              { label: 'Employment Equity Report', status: 'Pending System 03' },
              { label: 'SETA Learnership Report', status: 'Pending System 03' },
            ].map((r) => (
              <div key={r.label} className="flex items-center justify-between py-2 border-b border-gray-800 last:border-0">
                <span className="text-gray-300 text-sm">{r.label}</span>
                <span className="text-gray-600 text-xs">{r.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
