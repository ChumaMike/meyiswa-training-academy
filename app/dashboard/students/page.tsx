import { DEMO_ENROLMENTS } from '@/lib/data/demo/enrolments';

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-blue-900 text-blue-300 border-blue-800',
  'under-review': 'bg-yellow-900 text-yellow-300 border-yellow-800',
  accepted: 'bg-green-900 text-green-300 border-green-800',
  rejected: 'bg-red-900 text-red-300 border-red-800',
};

const STATUS_LABELS: Record<string, string> = {
  new: 'New',
  'under-review': 'Under Review',
  accepted: 'Accepted',
  rejected: 'Rejected',
};

const STATUSES = ['all', 'new', 'under-review', 'accepted', 'rejected'];

export default function StudentsPage({
  searchParams,
}: {
  searchParams: { status?: string };
}) {
  const filter = searchParams.status || 'all';
  const enrolments =
    filter === 'all'
      ? DEMO_ENROLMENTS
      : DEMO_ENROLMENTS.filter((e) => e.status === filter);

  const counts = {
    all: DEMO_ENROLMENTS.length,
    new: DEMO_ENROLMENTS.filter((e) => e.status === 'new').length,
    'under-review': DEMO_ENROLMENTS.filter((e) => e.status === 'under-review').length,
    accepted: DEMO_ENROLMENTS.filter((e) => e.status === 'accepted').length,
    rejected: DEMO_ENROLMENTS.filter((e) => e.status === 'rejected').length,
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="font-heading font-bold text-white text-2xl">Student Enrolments</h1>
        <p className="text-gray-400 text-sm mt-1">
          {DEMO_ENROLMENTS.length} total applications · {counts.new} new · {counts['under-review']} under review
        </p>
      </div>

      {/* Status filter tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {STATUSES.map((s) => (
          <a
            key={s}
            href={s === 'all' ? '/dashboard/students' : `/dashboard/students?status=${s}`}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              filter === s
                ? 'bg-mta-gold text-mta-black border-mta-gold'
                : 'bg-gray-900 text-gray-400 border-gray-700 hover:border-gray-500 hover:text-gray-200'
            }`}
          >
            {STATUS_LABELS[s] ?? 'All'} ({counts[s as keyof typeof counts] ?? counts.all})
          </a>
        ))}
      </div>

      {/* Table */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left text-gray-500 font-medium px-5 py-3">ID</th>
              <th className="text-left text-gray-500 font-medium px-5 py-3">Name</th>
              <th className="text-left text-gray-500 font-medium px-5 py-3 hidden md:table-cell">Course</th>
              <th className="text-left text-gray-500 font-medium px-5 py-3 hidden lg:table-cell">Phone</th>
              <th className="text-left text-gray-500 font-medium px-5 py-3 hidden lg:table-cell">Applied</th>
              <th className="text-left text-gray-500 font-medium px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {enrolments.map((e, i) => (
              <tr
                key={e.id}
                className={`border-b border-gray-800 hover:bg-gray-800/50 transition-colors ${
                  i === enrolments.length - 1 ? 'border-b-0' : ''
                }`}
              >
                <td className="px-5 py-3 text-gray-600 font-mono text-xs">{e.id}</td>
                <td className="px-5 py-3">
                  <p className="text-white font-medium">{e.name}</p>
                  <p className="text-gray-500 text-xs">{e.email}</p>
                </td>
                <td className="px-5 py-3 text-gray-400 hidden md:table-cell">
                  <p>{e.course}</p>
                  <p className="text-gray-600 text-xs">{e.faculty}</p>
                </td>
                <td className="px-5 py-3 text-gray-400 hidden lg:table-cell">{e.phone}</td>
                <td className="px-5 py-3 text-gray-400 hidden lg:table-cell">{e.applied}</td>
                <td className="px-5 py-3">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                      STATUS_COLORS[e.status]
                    }`}
                  >
                    {STATUS_LABELS[e.status]}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {enrolments.length === 0 && (
          <div className="text-center py-12 text-gray-600">No enrolments match this filter.</div>
        )}
      </div>
    </div>
  );
}
