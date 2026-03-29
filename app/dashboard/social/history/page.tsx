const HISTORY = [
  {
    id: 'H001',
    date: '2026-03-28',
    week: 'Demo Week 1',
    day: 'Friday',
    platform: 'Facebook + WhatsApp',
    type: 'Announcement',
    topic: 'April 2026 intake opening announcement',
    canvaLink: 'https://canva.com/design/demo1',
    status: 'delivered',
  },
  {
    id: 'H002',
    date: '2026-03-26',
    week: 'Demo Week 1',
    day: 'Wednesday',
    platform: 'Instagram',
    type: 'Course Spotlight',
    topic: 'IT Systems Support NQF5 spotlight',
    canvaLink: 'https://canva.com/design/demo2',
    status: 'delivered',
  },
  {
    id: 'H003',
    date: '2026-03-24',
    week: 'Demo Week 1',
    day: 'Monday',
    platform: 'Instagram',
    type: 'Student Story',
    topic: 'Thabo Mokoena success story',
    canvaLink: '',
    status: 'delivered',
  },
];

const PLATFORM_COLORS: Record<string, string> = {
  'Facebook + WhatsApp': 'text-blue-400',
  'Instagram': 'text-pink-400',
  'All platforms': 'text-purple-400',
};

export default function SocialHistoryPage() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="font-heading font-bold text-white text-2xl">Post History</h1>
        <p className="text-gray-400 text-sm mt-1">
          {HISTORY.length} posts delivered · All approved content with Canva design links
        </p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left text-gray-500 font-medium px-5 py-3">Date</th>
              <th className="text-left text-gray-500 font-medium px-5 py-3">Post</th>
              <th className="text-left text-gray-500 font-medium px-5 py-3 hidden md:table-cell">Platform</th>
              <th className="text-left text-gray-500 font-medium px-5 py-3 hidden sm:table-cell">Type</th>
              <th className="text-left text-gray-500 font-medium px-5 py-3">Canva</th>
            </tr>
          </thead>
          <tbody>
            {HISTORY.map((h, i) => (
              <tr
                key={h.id}
                className={`border-b border-gray-800 hover:bg-gray-800/50 transition-colors ${
                  i === HISTORY.length - 1 ? 'border-b-0' : ''
                }`}
              >
                <td className="px-5 py-3 text-gray-400 text-xs whitespace-nowrap">{h.date}</td>
                <td className="px-5 py-3">
                  <p className="text-gray-300 text-sm">{h.topic}</p>
                </td>
                <td className="px-5 py-3 hidden md:table-cell">
                  <span className={`text-sm ${PLATFORM_COLORS[h.platform] ?? 'text-gray-400'}`}>
                    {h.platform}
                  </span>
                </td>
                <td className="px-5 py-3 hidden sm:table-cell">
                  <span className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded">{h.type}</span>
                </td>
                <td className="px-5 py-3">
                  {h.canvaLink ? (
                    <a
                      href={h.canvaLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-mta-gold text-xs hover:underline"
                    >
                      View design →
                    </a>
                  ) : (
                    <span className="text-gray-600 text-xs">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {HISTORY.length === 0 && (
        <div className="text-center py-16 text-gray-600">
          No posts delivered yet. Approve drafts to get started.
        </div>
      )}
    </div>
  );
}
