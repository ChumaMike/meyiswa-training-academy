import Link from 'next/link';

const CALENDAR = [
  {
    week: 'Week 1 — 31 Mar – 6 Apr',
    posts: [
      { day: 'Monday', platform: 'Facebook + WhatsApp', topic: 'April intake announcement — General', status: 'draft', type: 'announcement' },
      { day: 'Wednesday', platform: 'Instagram', topic: 'Course spotlight — IT Systems Support NQF5', status: 'draft', type: 'spotlight' },
      { day: 'Friday', platform: 'Instagram', topic: 'Student success story — Thabo Mokoena', status: 'draft', type: 'testimonial' },
    ],
  },
  {
    week: 'Week 2 — 7–13 Apr',
    posts: [
      { day: 'Monday', platform: 'Facebook + WhatsApp', topic: 'Business Management faculty spotlight', status: 'scheduled', type: 'announcement' },
      { day: 'Wednesday', platform: 'Instagram', topic: 'Course spotlight — Project Manager NQF5', status: 'scheduled', type: 'spotlight' },
      { day: 'Friday', platform: 'Instagram + Facebook', topic: 'Enrolment CTA — closing soon', status: 'scheduled', type: 'cta' },
    ],
  },
  {
    week: 'Week 3 — 14–20 Apr',
    posts: [
      { day: 'Monday', platform: 'Facebook + WhatsApp', topic: 'Health & Safety faculty spotlight', status: 'pending', type: 'announcement' },
      { day: 'Wednesday', platform: 'Instagram', topic: 'Course spotlight — HR Management NQF5', status: 'pending', type: 'spotlight' },
      { day: 'Friday', platform: 'All platforms', topic: 'Last call — April 2026 intake', status: 'pending', type: 'cta' },
    ],
  },
];

const STATUS_COLORS: Record<string, string> = {
  draft: 'bg-yellow-900 text-yellow-300 border-yellow-800',
  scheduled: 'bg-blue-900 text-blue-300 border-blue-800',
  delivered: 'bg-green-900 text-green-300 border-green-800',
  pending: 'bg-gray-800 text-gray-400 border-gray-700',
};

const TYPE_ICONS: Record<string, string> = {
  announcement: '📣',
  spotlight: '🔦',
  testimonial: '💬',
  cta: '🎯',
};

export default function SocialCalendarPage() {
  const draftCount = CALENDAR.flatMap(w => w.posts).filter(p => p.status === 'draft').length;

  return (
    <div className="p-8">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="font-heading font-bold text-white text-2xl">Content Calendar</h1>
          <p className="text-gray-400 text-sm mt-1">April 2026 intake campaign · {draftCount} posts awaiting approval</p>
        </div>
        <Link
          href="/dashboard/social/drafts"
          className="bg-mta-gold text-mta-black text-sm font-semibold px-4 py-2 rounded-lg hover:bg-mta-light-gold transition-colors shrink-0"
        >
          Review Drafts ({draftCount})
        </Link>
      </div>

      <div className="space-y-6">
        {CALENDAR.map((week) => (
          <div key={week.week} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-800 bg-gray-800/50">
              <h2 className="font-heading font-semibold text-white text-sm">{week.week}</h2>
            </div>
            <div className="divide-y divide-gray-800">
              {week.posts.map((post) => (
                <div key={post.day} className="px-5 py-4 flex items-center gap-4">
                  <div className="w-24 shrink-0">
                    <p className="text-gray-400 text-sm font-medium">{post.day}</p>
                    <p className="text-gray-600 text-xs">{post.platform}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="text-lg">{TYPE_ICONS[post.type]}</span>
                    <p className="text-gray-300 text-sm truncate">{post.topic}</p>
                  </div>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full border shrink-0 ${STATUS_COLORS[post.status]}`}>
                    {post.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
