'use client';

import { useState } from 'react';

const INITIAL_CONTENT = [
  { id: 'C01', topic: 'April 2026 intake — General announcement', platform: 'Facebook + WhatsApp', type: 'Announcement', week: 'Week 1 · Mon 31 Mar', status: 'pending', caption: '🎓 April 2026 intake is OPEN at Meyiswa Training Academy!\n\nAre you ready to change your life? MTA offers 71 nationally accredited qualifications across IT, Business, HR, Health & Safety, and Retail.\n\n✅ NQF Level 4–7\n✅ SETA accredited\n✅ Learnership-eligible\n\nReply "COURSES" for our full brochure.\n\n#MTA #Training #NQF #SETA #April2026' },
  { id: 'C02', topic: 'IT Systems Support NQF5 — Course spotlight', platform: 'Instagram', type: 'Course Spotlight', week: 'Week 1 · Wed 2 Apr', status: 'pending', caption: '💻 Spotlight: IT Systems Support (NQF Level 5)\n\nOne of the fastest-growing careers in South Africa.\n\nWith MTA\'s MICT SETA-accredited qualification you\'ll be ready for:\n→ IT Support Technician\n→ Helpdesk Analyst\n→ Network Support Officer\n\n12 months · 147 credits\n\n#ITCareers #MICT #NQF5 #MTA' },
  { id: 'C03', topic: 'Thabo Mokoena student success story', platform: 'Instagram', type: 'Student Story', week: 'Week 1 · Fri 4 Apr', status: 'pending', caption: '"MTA changed my life."\n\nThabo came to MTA with just a matric. Today he\'s a junior cybersecurity analyst in Sandton.\n\n🏆 NQF Level 5 · Class of 2025\n📍 From Soweto to Sandton\n\nYour story starts here. April intake now open.\n\n#MTA #StudentSuccess #Cybersecurity' },
  { id: 'C04', topic: 'Business Management faculty — Spotlight', platform: 'Facebook + WhatsApp', type: 'Announcement', week: 'Week 2 · Mon 7 Apr', status: 'draft', caption: '' },
  { id: 'C05', topic: 'Project Manager NQF5 — Course spotlight', platform: 'Instagram', type: 'Course Spotlight', week: 'Week 2 · Wed 9 Apr', status: 'draft', caption: '' },
];

type Status = 'pending' | 'approved' | 'rejected' | 'draft';
const STATUS_COLORS: Record<Status, string> = {
  pending: 'bg-yellow-900 text-yellow-300 border-yellow-800',
  approved: 'bg-green-900 text-green-300 border-green-800',
  rejected: 'bg-red-900 text-red-300 border-red-800',
  draft: 'bg-gray-800 text-gray-400 border-gray-700',
};

export default function MarketingContentPage() {
  const [posts, setPosts] = useState(INITIAL_CONTENT);
  const [expanded, setExpanded] = useState<string | null>('C01');

  const update = (id: string, status: Status) =>
    setPosts(prev => prev.map(p => p.id === id ? { ...p, status } : p));

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="font-heading font-bold text-white text-2xl">Content Queue</h1>
        <p className="text-gray-400 text-sm mt-1">
          {posts.filter(p => p.status === 'pending').length} pending approval · {posts.filter(p => p.status === 'approved').length} approved · {posts.filter(p => p.status === 'draft').length} drafts
        </p>
      </div>

      <div className="space-y-3">
        {posts.map(post => (
          <div key={post.id} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
            <button
              onClick={() => setExpanded(expanded === post.id ? null : post.id)}
              className="w-full px-5 py-4 flex items-center gap-4 text-left hover:bg-gray-800/50 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium">{post.week} · <span className="text-gray-400">{post.platform}</span></p>
                <p className="text-gray-500 text-xs mt-0.5">{post.topic}</p>
              </div>
              <span className={`text-xs px-2.5 py-0.5 rounded-full border shrink-0 ${STATUS_COLORS[post.status as Status]}`}>{post.status}</span>
              <span className="text-gray-600">{expanded === post.id ? '▲' : '▼'}</span>
            </button>
            {expanded === post.id && (
              <div className="px-5 pb-5 border-t border-gray-800 pt-4">
                {post.caption ? (
                  <pre className="bg-gray-800 rounded-lg p-4 text-gray-300 text-sm whitespace-pre-wrap font-sans leading-relaxed mb-4">{post.caption}</pre>
                ) : (
                  <p className="text-gray-600 text-sm italic mb-4">Caption not yet written — this is a placeholder for Week 2 content.</p>
                )}
                <div className="flex gap-3 flex-wrap">
                  {post.status !== 'approved' && post.caption && (
                    <button onClick={() => update(post.id, 'approved')} className="px-4 py-2 bg-green-700 text-white text-sm font-medium rounded-lg hover:bg-green-600 transition-colors">✓ Approve</button>
                  )}
                  {post.status !== 'rejected' && post.caption && (
                    <button onClick={() => update(post.id, 'rejected')} className="px-4 py-2 bg-red-900 text-red-300 text-sm font-medium rounded-lg hover:bg-red-800 transition-colors">✕ Reject</button>
                  )}
                  {post.status !== 'pending' && post.caption && (
                    <button onClick={() => update(post.id, 'pending')} className="px-4 py-2 bg-gray-800 text-gray-400 text-sm rounded-lg hover:bg-gray-700 transition-colors">Reset</button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
