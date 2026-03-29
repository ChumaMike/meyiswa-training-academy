// Admin Staff — Tasks
const TASKS = [
  { id: 'T1', title: 'Send April intake reminder emails', deadline: '2026-03-31', priority: 'high', assigned: 'Thandile', status: 'in-progress' },
  { id: 'T2', title: 'Update course materials in LMS', deadline: '2026-04-02', priority: 'medium', assigned: 'You', status: 'pending' },
  { id: 'T3', title: 'Process payment for 5 new students', deadline: '2026-03-30', priority: 'high', assigned: 'You', status: 'pending' },
  { id: 'T4', title: 'Schedule lecturer meetings for April', deadline: '2026-04-05', priority: 'medium', assigned: 'Chuma', status: 'pending' },
  { id: 'T5', title: 'Prepare class attendance sheets', deadline: '2026-03-29', priority: 'low', assigned: 'You', status: 'in-progress' },
];

export default function AdminTasksPage() {
  const pendingCount = TASKS.filter(t => t.status === 'pending').length;
  const inProgressCount = TASKS.filter(t => t.status === 'in-progress').length;

  return (
    <div className="p-8">
      <h1 className="font-heading font-bold text-white text-2xl mb-2">Tasks</h1>
      <p className="text-gray-400 text-sm mb-6">{pendingCount} pending · {inProgressCount} in progress</p>

      <div className="space-y-3">
        {TASKS.map((t) => (
          <div key={t.id} className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-start gap-4">
            <input type="checkbox" className="mt-1 w-5 h-5 accent-mta-gold rounded" defaultChecked={t.status === 'in-progress'} />
            <div className="flex-1 min-w-0">
              <h3 className={`font-semibold ${t.status === 'in-progress' ? 'text-mta-gold' : 'text-white'}`}>
                {t.title}
              </h3>
              <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                <span>📅 {t.deadline}</span>
                <span>{t.assigned === 'You' ? '👤' : '👥'} {t.assigned}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className={`text-xs px-2 py-1 rounded-full ${
                t.priority === 'high' ? 'bg-red-900 text-red-300' :
                t.priority === 'medium' ? 'bg-yellow-900 text-yellow-300' :
                'bg-gray-800 text-gray-400'
              }`}>
                {t.priority}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
