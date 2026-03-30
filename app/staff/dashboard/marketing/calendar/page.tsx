const WEEKS = [
  {
    week: 'Week 1 — 31 Mar – 4 Apr',
    posts: [
      { day: 'Mon 31 Mar', platform: 'Facebook + WhatsApp', type: 'Announcement', topic: 'April 2026 intake opening', status: 'approved' },
      { day: 'Wed 2 Apr', platform: 'Instagram', type: 'Spotlight', topic: 'IT Systems Support NQF5', status: 'approved' },
      { day: 'Fri 4 Apr', platform: 'Instagram', type: 'Student Story', topic: 'Thabo Mokoena — Cybersecurity', status: 'pending' },
    ],
  },
  {
    week: 'Week 2 — 7–11 Apr',
    posts: [
      { day: 'Mon 7 Apr', platform: 'Facebook + WhatsApp', type: 'Announcement', topic: 'Business Management faculty', status: 'draft' },
      { day: 'Wed 9 Apr', platform: 'Instagram', type: 'Spotlight', topic: 'Project Manager NQF5', status: 'draft' },
      { day: 'Fri 11 Apr', platform: 'Instagram + Facebook', type: 'CTA', topic: 'Enrolment closing soon', status: 'scheduled' },
    ],
  },
  {
    week: 'Week 3 — 14–17 Apr',
    posts: [
      { day: 'Mon 14 Apr', platform: 'Facebook + WhatsApp', type: 'Announcement', topic: 'Health & Safety faculty', status: 'scheduled' },
      { day: 'Wed 16 Apr', platform: 'Instagram', type: 'Spotlight', topic: 'HR Management NQF5', status: 'scheduled' },
      { day: 'Fri 17 Apr', platform: 'All platforms', type: 'CTA', topic: 'Last call — April 2026 intake', status: 'scheduled' },
    ],
  },
];

const STATUS_COLORS: Record<string, string> = {
  approved: 'bg-green-900 text-green-300',
  pending: 'bg-yellow-900 text-yellow-300',
  draft: 'bg-gray-800 text-gray-400',
  scheduled: 'bg-blue-900 text-blue-300',
  delivered: 'bg-purple-900 text-purple-300',
};

const TYPE_ICONS: Record<string, string> = {
  Announcement: '📣', Spotlight: '🔦', 'Student Story': '💬', CTA: '🎯',
};

export default function MarketingCalendarPage() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="font-heading font-bold text-white text-2xl">Content Calendar</h1>
        <p className="text-gray-400 text-sm mt-1">April 2026 intake campaign · 9 posts across 3 weeks</p>
      </div>
      <div className="space-y-5">
        {WEEKS.map(week => (
          <div key={week.week} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-800 bg-gray-800/40">
              <h2 className="text-white font-semibold text-sm">{week.week}</h2>
            </div>
            <div className="divide-y divide-gray-800">
              {week.posts.map(post => (
                <div key={post.day} className="px-5 py-3 flex items-center gap-4">
                  <div className="w-28 shrink-0">
                    <p className="text-gray-300 text-sm font-medium">{post.day}</p>
                    <p className="text-gray-600 text-xs">{post.platform}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span>{TYPE_ICONS[post.type] || '📋'}</span>
                    <p className="text-gray-400 text-sm truncate">{post.topic}</p>
                  </div>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full shrink-0 ${STATUS_COLORS[post.status]}`}>{post.status}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
