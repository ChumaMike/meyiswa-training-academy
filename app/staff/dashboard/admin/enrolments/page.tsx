import { DEMO_ENROLMENTS } from '@/lib/data/demo/enrolments';

export default function AdminEnrolmentsPage() {
  const newEnrolments = DEMO_ENROLMENTS.filter(e => e.status === 'new');

  return (
    <div className="p-8">
      <h1 className="font-heading font-bold text-white text-2xl mb-2">New Enrolments</h1>
      <p className="text-gray-400 text-sm mb-6">{newEnrolments.length} pending review</p>

      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left px-5 py-3 text-gray-500 font-medium">Name</th>
              <th className="text-left px-5 py-3 text-gray-500 font-medium hidden md:table-cell">Course</th>
              <th className="text-left px-5 py-3 text-gray-500 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {newEnrolments.map((e) => (
              <tr key={e.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                <td className="px-5 py-3">
                  <p className="text-white">{e.name}</p>
                  <p className="text-gray-500 text-xs">{e.email}</p>
                </td>
                <td className="px-5 py-3 hidden md:table-cell text-gray-400">{e.course}</td>
                <td className="px-5 py-3"><button className="text-mta-gold text-sm hover:underline">Review →</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
