// Support — Student Progress Tracking
const STUDENT_PROGRESS = [
  { id: 'SP1', name: 'Ayanda Zulu', course: 'IT Systems Support NQF5', enrolled: '2026-03-01', progress: 45, riskFactors: ['Missed 2 classes'], intervention: 'Assign peer mentor' },
  { id: 'SP2', name: 'Bongani Makena', course: 'IT Systems Support NQF5', enrolled: '2026-03-01', progress: 52, riskFactors: [], intervention: 'Quarterly check-in' },
  { id: 'SP3', name: 'Cebile Nkomo', course: 'IT Systems Support NQF5', enrolled: '2026-03-01', progress: 58, riskFactors: [], intervention: 'On track' },
  { id: 'SP4', name: 'Duduzile Sithole', course: 'IT Technical Support NQF4', enrolled: '2026-03-15', progress: 28, riskFactors: ['Low quiz scores', 'Financial issue'], intervention: 'Urgent support plan' },
];

export default function SupportProgressPage() {
  const atRiskCount = STUDENT_PROGRESS.filter(s => s.riskFactors.length > 0).length;

  return (
    <div className="p-8">
      <h1 className="font-heading font-bold text-white text-2xl mb-2">Student Progress Tracking</h1>
      <p className="text-gray-400 text-sm mb-6">{STUDENT_PROGRESS.length} students · {atRiskCount} requiring intervention</p>

      <div className="space-y-4">
        {STUDENT_PROGRESS.map((s) => (
          <div key={s.id} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-white font-semibold">{s.name}</h3>
                <p className="text-gray-500 text-sm">{s.course}</p>
              </div>
              <span className={`text-xs px-2.5 py-0.5 rounded-full ${
                s.progress >= 50 ? 'bg-green-900 text-green-300' :
                s.progress >= 30 ? 'bg-yellow-900 text-yellow-300' :
                'bg-red-900 text-red-300'
              }`}>
                {s.progress}% complete
              </span>
            </div>

            <div className="flex h-2 bg-gray-800 rounded-full mb-3">
              <div className="bg-mta-gold h-2 rounded-full" style={{ width: `${s.progress}%` }}></div>
            </div>

            {s.riskFactors.length > 0 && (
              <div className="mb-3 p-3 bg-red-900/20 border border-red-900/40 rounded-lg">
                <p className="text-red-300 text-sm font-medium mb-1">🚨 Risk Factors:</p>
                <ul className="text-red-200 text-xs space-y-0.5">
                  {s.riskFactors.map((rf, i) => (
                    <li key={i}>• {rf}</li>
                  ))}
                </ul>
              </div>
            )}

            <p className="text-gray-400 text-sm mb-3"><span className="text-gray-500">Intervention:</span> {s.intervention}</p>
            <button className="text-mta-gold text-sm hover:underline">Schedule Check-in →</button>
          </div>
        ))}
      </div>
    </div>
  );
}
