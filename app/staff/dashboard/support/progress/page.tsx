const STUDENTS = [
  { id: 'SP01', name: 'Sipho Dlamini', course: 'IT Systems Support NQF5', progress: 72, attendance: 88, assessments: 3, risk: 'low', notes: 'Performing well — on track to complete by June 2026.' },
  { id: 'SP02', name: 'Thabo Nkosi', course: 'Project Management NQF5', progress: 38, attendance: 55, assessments: 1, risk: 'high', notes: 'Missed 4 classes. Assessment 2 not submitted. Counseling session scheduled.' },
  { id: 'SP03', name: 'Cebile Ndlovu', course: 'IT Systems Support NQF5', progress: 65, attendance: 80, assessments: 3, risk: 'medium', notes: 'Transport issues affecting Monday attendance. Alternative arrangement being explored.' },
  { id: 'SP04', name: 'Obakeng Molefe', course: 'IT Systems Development NQF4', progress: 28, attendance: 42, assessments: 0, risk: 'high', notes: 'At serious risk. No assessments submitted in Module 2. Emergency academic support recommended.' },
  { id: 'SP05', name: 'Nomsa Khumalo', course: 'Business Management NQF6', progress: 89, attendance: 95, assessments: 4, risk: 'low', notes: 'Top performer. Distinction track.' },
  { id: 'SP06', name: 'Lungelo Sithole', course: 'Software Developer NQF5', progress: 44, attendance: 68, assessments: 2, risk: 'medium', notes: 'Struggling with programming concepts. Peer study group arranged.' },
  { id: 'SP07', name: 'Zanele Mokoena', course: 'IT Systems Support NQF5', progress: 91, attendance: 97, assessments: 4, risk: 'low', notes: 'Excellent progress — considering NQF6 pathway after completion.' },
  { id: 'SP08', name: 'Refiloe Tau', course: 'Community Development NQF5', progress: 52, attendance: 72, assessments: 2, risk: 'medium', notes: 'Financial difficulties. Fee deferral arrangement in place.' },
];

const RISK_COLORS: Record<string, string> = {
  low: 'bg-green-900 text-green-300 border-green-800',
  medium: 'bg-yellow-900 text-yellow-300 border-yellow-800',
  high: 'bg-red-900 text-red-300 border-red-800',
};

export default function SupportProgressPage() {
  const highRisk = STUDENTS.filter(s => s.risk === 'high').length;

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="font-heading font-bold text-white text-2xl">Student Progress</h1>
        <p className="text-gray-400 text-sm mt-1">{STUDENTS.length} students tracked · {highRisk} high risk</p>
      </div>

      {highRisk > 0 && (
        <div className="mb-5 bg-red-900/20 border border-red-800 rounded-xl p-4">
          <p className="text-red-300 text-sm font-medium">⚠️ {highRisk} student{highRisk > 1 ? 's' : ''} at high risk — immediate intervention recommended</p>
        </div>
      )}

      <div className="space-y-3">
        {STUDENTS.map(s => (
          <div key={s.id} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <p className="text-white font-semibold text-sm">{s.name}</p>
                <p className="text-gray-500 text-xs">{s.course}</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full border shrink-0 ${RISK_COLORS[s.risk]}`}>
                {s.risk} risk
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-3">
              {[
                { label: 'Progress', value: `${s.progress}%`, bar: s.progress },
                { label: 'Attendance', value: `${s.attendance}%`, bar: s.attendance },
                { label: 'Assessments', value: `${s.assessments} done`, bar: s.assessments * 25 },
              ].map(stat => (
                <div key={stat.label}>
                  <p className="text-gray-500 text-xs mb-1">{stat.label}</p>
                  <div className="w-full bg-gray-800 rounded-full h-1.5 mb-1">
                    <div className={`h-1.5 rounded-full ${stat.bar >= 60 ? 'bg-green-500' : stat.bar >= 40 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${Math.min(stat.bar, 100)}%` }} />
                  </div>
                  <p className="text-gray-300 text-xs font-medium">{stat.value}</p>
                </div>
              ))}
            </div>
            <p className="text-gray-500 text-xs italic">{s.notes}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
