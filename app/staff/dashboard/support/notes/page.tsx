const NOTES = [
  { id: 'N01', student: 'Thabo Nkosi', course: 'Project Management NQF5', date: '2026-03-27', type: 'Counseling', author: 'Support Staff', note: 'Student came in distressed about assessment deadlines. Arranged 2-week extension with lecturer approval. Follow-up session booked for 3 April.' },
  { id: 'N02', student: 'Obakeng Molefe', course: 'IT Systems Development NQF4', date: '2026-03-25', type: 'Academic Support', author: 'Support Staff', note: 'Emergency session held. Student struggling with programming fundamentals. Enrolled in peer mentorship program with Sipho Dlamini (IT NQF5). Weekly check-ins scheduled.' },
  { id: 'N03', student: 'Refiloe Tau', course: 'Community Development NQF5', date: '2026-03-24', type: 'Financial', author: 'Support Staff', note: 'Student experiencing financial hardship. Fee deferral of R1,200 approved until April 30. Student to resume normal payment schedule from May 2026.' },
  { id: 'N04', student: 'Cebile Ndlovu', course: 'IT Systems Support NQF5', date: '2026-03-22', type: 'General', author: 'Support Staff', note: 'Student flagged transport issue — cannot attend Monday 08:00 class due to Soweto commute. Exploring Saturday makeup class option with admin team.' },
  { id: 'N05', student: 'Lungelo Sithole', course: 'Software Developer NQF5', date: '2026-03-20', type: 'Academic Support', author: 'Support Staff', note: 'Arranged peer study group sessions on Thursdays. Student responded positively. Progress improving — up from 28% to 38% over two weeks.' },
];

const TYPE_COLORS: Record<string, string> = {
  Counseling: 'bg-purple-900 text-purple-300',
  'Academic Support': 'bg-blue-900 text-blue-300',
  Financial: 'bg-yellow-900 text-yellow-300',
  General: 'bg-gray-800 text-gray-400',
};

export default function SupportNotesPage() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="font-heading font-bold text-white text-2xl">Counseling Notes</h1>
        <p className="text-gray-400 text-sm mt-1">{NOTES.length} notes logged · confidential — staff only</p>
      </div>

      <div className="space-y-4">
        {NOTES.map(n => (
          <div key={n.id} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <p className="text-white font-semibold text-sm">{n.student}</p>
                <p className="text-gray-500 text-xs">{n.course}</p>
              </div>
              <div className="text-right shrink-0">
                <span className={`text-xs px-2 py-0.5 rounded-full ${TYPE_COLORS[n.type]}`}>{n.type}</span>
                <p className="text-gray-600 text-xs mt-1">{n.date}</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">{n.note}</p>
            <p className="text-gray-600 text-xs mt-3">Logged by: {n.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
