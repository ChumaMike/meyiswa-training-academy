'use client';

import { useState } from 'react';

const INITIAL_DRAFTS = [
  {
    id: 'D001',
    week: 'Week 1',
    day: 'Monday',
    platform: 'Facebook + WhatsApp',
    type: 'Announcement',
    caption: `🎓 April 2026 intake is OPEN at Meyiswa Training Academy!\n\nAre you ready to change your life? MTA offers 71 nationally accredited qualifications across IT, Business, HR, Health & Safety, and Retail.\n\n✅ NQF Level 4–7\n✅ SETA accredited\n✅ Learnership-eligible\n✅ Study while you work\n\nApply now — limited seats available. Reply "COURSES" for our full brochure.\n\n📞 Contact us today to secure your spot!\n\n#MTA #Training #NQF #SETA #Accredited #April2026`,
    canvaLink: '',
    status: 'draft',
  },
  {
    id: 'D002',
    week: 'Week 1',
    day: 'Wednesday',
    platform: 'Instagram',
    type: 'Course Spotlight',
    caption: `💻 Spotlight: IT Systems Support (NQF Level 5)\n\nDid you know that IT support is one of the fastest-growing careers in South Africa?\n\nWith MTA's MICT SETA-accredited IT Systems Support qualification you'll be ready for:\n→ IT Support Technician\n→ Helpdesk Analyst\n→ Network Support Officer\n\n12 months · 147 credits · NQF 5\n\nApply for April 2026 intake! Link in bio 🔗\n\n#ITCareers #MICT #NQF5 #MTA #TechSA`,
    canvaLink: '',
    status: 'draft',
  },
  {
    id: 'D003',
    week: 'Week 1',
    day: 'Friday',
    platform: 'Instagram',
    type: 'Student Story',
    caption: `"MTA changed my life."\n\nThabo Mokoena came to MTA with just a matric and a dream. Today he's a junior cybersecurity analyst in Sandton.\n\n🏆 NQF Level 5 Occupational Certificate\n📍 From Soweto to Sandton\n⏱️ Completed in 2025\n\nYour success story starts here. April 2026 intake is open.\n\nApply now 👇\n\n#MTA #StudentSuccess #Cybersecurity #NQF5 #ChangeYourLife`,
    canvaLink: '',
    status: 'draft',
  },
];

type DraftStatus = 'draft' | 'approved' | 'rejected';

export default function SocialDraftsPage() {
  const [drafts, setDrafts] = useState(INITIAL_DRAFTS);
  const [expanded, setExpanded] = useState<string | null>('D001');

  const updateStatus = (id: string, status: DraftStatus) => {
    setDrafts((prev) => prev.map((d) => (d.id === id ? { ...d, status } : d)));
  };

  const STATUS_COLORS: Record<string, string> = {
    draft: 'bg-yellow-900 text-yellow-300 border-yellow-800',
    approved: 'bg-green-900 text-green-300 border-green-800',
    rejected: 'bg-red-900 text-red-300 border-red-800',
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="font-heading font-bold text-white text-2xl">Post Drafts</h1>
        <p className="text-gray-400 text-sm mt-1">
          Review and approve posts before they go to Canva design.
          {' '}{drafts.filter(d => d.status === 'draft').length} pending · {drafts.filter(d => d.status === 'approved').length} approved · {drafts.filter(d => d.status === 'rejected').length} rejected
        </p>
      </div>

      <div className="space-y-3">
        {drafts.map((draft) => (
          <div key={draft.id} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
            {/* Header row */}
            <button
              onClick={() => setExpanded(expanded === draft.id ? null : draft.id)}
              className="w-full px-5 py-4 flex items-center gap-4 text-left hover:bg-gray-800/50 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-white font-medium text-sm">{draft.week} · {draft.day}</span>
                  <span className="text-gray-500 text-sm">{draft.platform}</span>
                  <span className="text-gray-600 text-xs bg-gray-800 px-2 py-0.5 rounded">{draft.type}</span>
                </div>
              </div>
              <span className={`text-xs px-2.5 py-0.5 rounded-full border shrink-0 ${STATUS_COLORS[draft.status]}`}>
                {draft.status}
              </span>
              <span className="text-gray-600 text-sm">{expanded === draft.id ? '▲' : '▼'}</span>
            </button>

            {/* Expanded content */}
            {expanded === draft.id && (
              <div className="px-5 pb-5 border-t border-gray-800">
                <div className="mt-4 bg-gray-800 rounded-lg p-4 mb-4">
                  <pre className="text-gray-300 text-sm whitespace-pre-wrap font-sans leading-relaxed">
                    {draft.caption}
                  </pre>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  {draft.status !== 'approved' && (
                    <button
                      onClick={() => updateStatus(draft.id, 'approved')}
                      className="px-4 py-2 bg-green-700 text-white text-sm font-medium rounded-lg hover:bg-green-600 transition-colors"
                    >
                      ✓ Approve
                    </button>
                  )}
                  {draft.status !== 'rejected' && (
                    <button
                      onClick={() => updateStatus(draft.id, 'rejected')}
                      className="px-4 py-2 bg-red-900 text-red-300 text-sm font-medium rounded-lg hover:bg-red-800 transition-colors"
                    >
                      ✕ Reject
                    </button>
                  )}
                  {draft.status !== 'draft' && (
                    <button
                      onClick={() => updateStatus(draft.id, 'draft')}
                      className="px-4 py-2 bg-gray-800 text-gray-400 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      Reset to Draft
                    </button>
                  )}
                  <p className="text-gray-600 text-xs ml-auto">
                    {draft.status !== 'draft' ? `Status updated — changes are not persisted (no backend yet)` : 'Tap to approve or reject this caption'}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
