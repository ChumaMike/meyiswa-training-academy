const METRICS = [
  { label: 'Total Reach', value: '2,847', change: '+12%', icon: '👁️', up: true },
  { label: 'Post Engagements', value: '634', change: '+8%', icon: '❤️', up: true },
  { label: 'WhatsApp Leads', value: '27', change: '+34%', icon: '💬', up: true },
  { label: 'Link Clicks', value: '189', change: '-3%', icon: '🔗', up: false },
];

const POSTS = [
  { post: 'April 2026 intake — General announcement', platform: 'Facebook', reach: 1240, likes: 87, comments: 14, shares: 31, date: '2026-03-28' },
  { post: 'IT Systems Support NQF5 spotlight', platform: 'Instagram', reach: 920, likes: 143, comments: 22, shares: 18, date: '2026-03-26' },
  { post: 'Thabo Mokoena student success story', platform: 'Instagram', reach: 687, likes: 201, comments: 38, shares: 45, date: '2026-03-24' },
];

export default function MarketingAnalyticsPage() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="font-heading font-bold text-white text-2xl">Analytics</h1>
        <p className="text-gray-400 text-sm mt-1">March 2026 · April campaign performance</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {METRICS.map(m => (
          <div key={m.label} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <span className="text-2xl">{m.icon}</span>
            <p className="text-white font-bold font-heading text-2xl mt-2">{m.value}</p>
            <p className="text-gray-500 text-xs mt-0.5">{m.label}</p>
            <p className={`text-xs mt-1 font-medium ${m.up ? 'text-green-400' : 'text-red-400'}`}>{m.change} this month</p>
          </div>
        ))}
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden mb-5">
        <div className="px-5 py-3 border-b border-gray-800">
          <h2 className="text-white font-semibold text-sm">Post Performance</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left text-gray-500 font-medium px-5 py-3">Post</th>
              <th className="text-left text-gray-500 font-medium px-5 py-3 hidden sm:table-cell">Platform</th>
              <th className="text-left text-gray-500 font-medium px-5 py-3">Reach</th>
              <th className="text-left text-gray-500 font-medium px-5 py-3 hidden md:table-cell">Likes</th>
              <th className="text-left text-gray-500 font-medium px-5 py-3 hidden lg:table-cell">Shares</th>
            </tr>
          </thead>
          <tbody>
            {POSTS.map((p, i) => (
              <tr key={p.post} className={`border-b border-gray-800 hover:bg-gray-800/50 ${i === POSTS.length - 1 ? 'border-b-0' : ''}`}>
                <td className="px-5 py-3 text-gray-300 text-sm max-w-xs truncate">{p.post}</td>
                <td className="px-5 py-3 hidden sm:table-cell"><span className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded">{p.platform}</span></td>
                <td className="px-5 py-3 text-mta-gold font-medium">{p.reach.toLocaleString()}</td>
                <td className="px-5 py-3 text-gray-400 hidden md:table-cell">{p.likes}</td>
                <td className="px-5 py-3 text-gray-400 hidden lg:table-cell">{p.shares}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <p className="text-gray-500 text-sm"><span className="text-mta-gold font-medium">Note:</span> Live analytics from Meta and WhatsApp APIs require System 05 backend integration. Current data is representative of the demo campaign.</p>
      </div>
    </div>
  );
}
