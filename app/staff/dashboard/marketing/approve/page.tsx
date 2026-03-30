const PENDING_POSTS = [
  { id: 1, content: 'April intake announcement', type: 'Announcement', platform: 'Facebook' },
  { id: 2, content: 'Course spotlight - IT', type: 'Spotlight', platform: 'Instagram' },
  { id: 3, content: 'Student success story', type: 'Story', platform: 'Instagram' },
];

export default function MarketingApprovePage() {
  return (
    <div className="p-8">
      <h1 className="font-heading font-bold text-white text-2xl mb-2">Approve Posts</h1>
      <p className="text-gray-400 text-sm mb-6">{PENDING_POSTS.length} posts awaiting approval</p>

      <div className="space-y-4">
        {PENDING_POSTS.map((post) => (
          <div key={post.id} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <p className="text-white font-semibold mb-2">{post.content}</p>
            <div className="flex gap-2 mb-3">
              <span className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded">{post.type}</span>
              <span className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded">{post.platform}</span>
            </div>
            <div className="flex gap-2">
              <button className="bg-green-700 text-white px-3 py-1 rounded text-sm hover:bg-green-600">✓ Approve</button>
              <button className="bg-red-900 text-red-300 px-3 py-1 rounded text-sm hover:bg-red-800">✕ Reject</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
