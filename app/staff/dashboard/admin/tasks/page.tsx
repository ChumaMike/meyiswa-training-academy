const TASKS = [
  { id: 'T01', title: 'Process April intake enrolment applications', deadline: '2026-04-01', assigned: 'Thandile', priority: 'high', done: false },
  { id: 'T02', title: 'Update venue bookings for Q2 schedule', deadline: '2026-03-31', assigned: 'Admin Team', priority: 'high', done: false },
  { id: 'T03', title: 'Send welcome letters to new students (March intake)', deadline: '2026-03-30', assigned: 'Thandile', priority: 'medium', done: true },
  { id: 'T04', title: 'Generate attendance report for March', deadline: '2026-04-05', assigned: 'Admin Team', priority: 'medium', done: false },
  { id: 'T05', title: 'Confirm SETA submission dates for Q1', deadline: '2026-04-10', assigned: 'Thandile', priority: 'medium', done: false },
  { id: 'T06', title: 'Order stationery and materials for April classes', deadline: '2026-03-30', assigned: 'Admin Team', priority: 'low', done: true },
  { id: 'T07', title: 'Update student contact list for Roodepoort campus', deadline: '2026-04-07', assigned: 'Admin Team', priority: 'low', done: false },
  { id: 'T08', title: 'Book venue for Q2 open day', deadline: '2026-04-15', assigned: 'Thandile', priority: 'medium', done: false },
];

const PRIORITY_COLORS: Record<string, string> = {
  high: 'bg-red-900 text-red-300 border-red-800',
  medium: 'bg-yellow-900 text-yellow-300 border-yellow-800',
  low: 'bg-gray-800 text-gray-400 border-gray-700',
};

export default function AdminTasksPage() {
  const pending = TASKS.filter(t => !t.done).length;

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="font-heading font-bold text-white text-2xl">Tasks</h1>
        <p className="text-gray-400 text-sm mt-1">{pending} pending · {TASKS.filter(t => t.done).length} completed</p>
      </div>

      <div className="space-y-2">
        {TASKS.map((task) => (
          <div key={task.id} className={`bg-gray-900 border rounded-xl p-4 flex items-start gap-4 transition-colors ${task.done ? 'border-gray-800 opacity-60' : 'border-gray-700'}`}>
            <div className={`w-5 h-5 mt-0.5 rounded border-2 flex items-center justify-center shrink-0 ${task.done ? 'bg-mta-gold border-mta-gold' : 'border-gray-600'}`}>
              {task.done && <span className="text-mta-black text-xs font-bold">✓</span>}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium ${task.done ? 'line-through text-gray-500' : 'text-white'}`}>{task.title}</p>
              <div className="flex items-center gap-3 mt-1 flex-wrap">
                <span className="text-gray-600 text-xs">Due {task.deadline}</span>
                <span className="text-gray-600 text-xs">· {task.assigned}</span>
              </div>
            </div>
            <span className={`text-xs px-2 py-0.5 rounded-full border shrink-0 ${PRIORITY_COLORS[task.priority]}`}>
              {task.priority}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
