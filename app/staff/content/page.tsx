// Marketing — Content Approval
'use client';

import { useState } from 'react';

const DRAFT_POSTS = [
  { id: 'P1', platform: 'Instagram', topic: 'Course Spotlight — HR Management', status: 'draft', submitted: '2026-03-28' },
  { id: 'P2', platform: 'Facebook + WhatsApp', topic: 'Success Story — Nomvula Dlamini', status: 'draft', submitted: '2026-03-28' },
  { id: 'P3', platform: 'Instagram', topic: 'April intake announcement (reminder)', status: 'draft', submitted: '2026-03-27' },
];

type ApprovalStatus = 'draft' | 'approved' | 'rejected';

export default function MarketingContentPage() {
  const [posts, setPosts] = useState(DRAFT_POSTS);

  const updateStatus = (id: string, newStatus: ApprovalStatus) => {
    setPosts(posts.map(p => p.id === id ? { ...p, status: newStatus } : p));
  };

  return (
    <div className="p-8">
      <h1 className="font-heading font-bold text-white text-2xl mb-2">Content Approval</h1>
      <p className="text-gray-400 text-sm mb-6">{posts.filter(p => p.status === 'draft').length} posts awaiting approval</p>

      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-white font-semibold">{post.topic}</h3>
                <p className="text-gray-500 text-sm mt-1">{post.platform}</p>
              </div>
              <span className={`text-xs px-2.5 py-0.5 rounded-full border ${
                post.status === 'approved' ? 'bg-green-900 text-green-300 border-green-800' :
                post.status === 'rejected' ? 'bg-red-900 text-red-300 border-red-800' :
                'bg-yellow-900 text-yellow-300 border-yellow-800'
              }`}>
                {post.status}
              </span>
            </div>

            <div className="flex gap-2">
              {post.status === 'draft' && (
                <>
                  <button
                    onClick={() => updateStatus(post.id, 'approved')}
                    className="flex-1 px-4 py-2 bg-green-700 text-white text-sm font-medium rounded-lg hover:bg-green-600 transition-colors"
                  >
                    ✓ Approve
                  </button>
                  <button
                    onClick={() => updateStatus(post.id, 'rejected')}
                    className="flex-1 px-4 py-2 bg-red-900 text-red-300 text-sm font-medium rounded-lg hover:bg-red-800 transition-colors"
                  >
                    ✕ Reject
                  </button>
                </>
              )}
              <button className="flex-1 text-mta-gold text-sm font-medium hover:underline border border-gray-700 rounded-lg py-2">
                Preview →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
