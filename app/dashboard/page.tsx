import Link from 'next/link';
import { DEMO_ACTIVITY } from '@/lib/data/demo/activity';
import { DEMO_ENROLMENTS } from '@/lib/data/demo/enrolments';
import { DEMO_LEADS } from '@/lib/data/demo/leads';
import { COURSES } from '@/lib/data/courses';

const ACTIVITY_ICONS: Record<string, string> = {
  post: '📣',
  lead: '💬',
  enrolment: '📝',
  settings: '⚙️',
  bot: '🤖',
};

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-blue-900 text-blue-300',
  'under-review': 'bg-yellow-900 text-yellow-300',
  accepted: 'bg-green-900 text-green-300',
  rejected: 'bg-red-900 text-red-300',
};

export default function DashboardPage() {
  const newLeads = DEMO_LEADS.filter((l) => l.status === 'new').length;
  const pendingEnrolments = DEMO_ENROLMENTS.filter(
    (e) => e.status === 'new' || e.status === 'under-review'
  ).length;
  const recentEnrolments = DEMO_ENROLMENTS.slice(0, 5);

  const kpis = [
    { label: 'Total Leads', value: DEMO_LEADS.length, sub: `${newLeads} new`, icon: '💬', href: '/dashboard/bot' },
    { label: 'Pending Enrolments', value: pendingEnrolments, sub: 'awaiting action', icon: '📝', href: '/dashboard/students' },
    { label: 'Total Courses', value: COURSES.length, sub: '5 faculties', icon: '📚', href: '/dashboard/courses' },
    { label: 'Posts This Month', value: 3, sub: '2 delivered', icon: '📣', href: '/dashboard/social' },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading font-bold text-white text-2xl">Overview</h1>
        <p className="text-gray-400 text-sm mt-1">Welcome back, Thandile — here's what's happening at MTA.</p>
      </div>

      {/* System Status Banner */}
      <div className="mb-8 bg-gray-900 border border-gray-800 rounded-xl p-5">
        <h2 className="font-heading font-semibold text-white text-sm mb-3">System Overview</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { num: '01', name: 'WhatsApp Bot', desc: 'Student inquiries & leads', status: 'demo', link: '/dashboard/bot' },
            { num: '03', name: 'Reports', desc: 'WSP/ATR & enrolment stats', status: 'demo', link: '/dashboard/reports' },
            { num: '05', name: 'Social Media', desc: 'Content calendar & posts', status: 'active', link: '/dashboard/social' },
            { num: '08', name: 'Brochures', desc: 'Faculty PDF management', status: 'active', link: '/dashboard/brochures' },
          ].map((sys) => (
            <Link
              key={sys.num}
              href={sys.link}
              className={`rounded-lg p-3 border transition-colors hover:border-mta-gold group ${
                sys.status === 'active'
                  ? 'border-mta-gold/40 bg-mta-gold/5'
                  : 'border-gray-700 bg-gray-800/50'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-gray-600 font-mono text-xs">#{sys.num}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  sys.status === 'active' ? 'bg-green-900 text-green-400' : 'bg-gray-800 text-gray-500'
                }`}>
                  {sys.status === 'active' ? 'Active' : 'Demo'}
                </span>
              </div>
              <p className="text-white text-sm font-medium group-hover:text-mta-gold transition-colors">{sys.name}</p>
              <p className="text-gray-500 text-xs mt-0.5">{sys.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {kpis.map((kpi) => (
          <Link
            key={kpi.label}
            href={kpi.href}
            className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-mta-gold transition-colors group"
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-2xl">{kpi.icon}</span>
              <span className="text-gray-600 text-xs group-hover:text-mta-gold transition-colors">View →</span>
            </div>
            <p className="font-heading font-bold text-white text-3xl">{kpi.value}</p>
            <p className="text-gray-400 text-sm mt-0.5">{kpi.label}</p>
            <p className="text-gray-600 text-xs mt-1">{kpi.sub}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <h2 className="font-heading font-semibold text-white text-base mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {DEMO_ACTIVITY.map((a) => (
              <div key={a.id} className="flex items-start gap-3">
                <span className="text-lg leading-none mt-0.5">{ACTIVITY_ICONS[a.type]}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-300 text-sm leading-snug">{a.action}</p>
                  <p className="text-gray-600 text-xs mt-0.5">{a.user} · {a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Enrolments */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading font-semibold text-white text-base">Recent Enrolments</h2>
            <Link href="/dashboard/students" className="text-mta-gold text-xs hover:underline">
              View all →
            </Link>
          </div>
          <div className="space-y-3">
            {recentEnrolments.map((e) => (
              <div key={e.id} className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-gray-300 text-sm font-medium truncate">{e.name}</p>
                  <p className="text-gray-500 text-xs truncate">{e.course}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${STATUS_COLORS[e.status]}`}>
                  {e.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 bg-gray-900 border border-gray-800 rounded-xl p-5">
        <h2 className="font-heading font-semibold text-white text-base mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/dashboard/social/drafts" className="px-4 py-2 bg-mta-gold text-mta-black text-sm font-semibold rounded-lg hover:bg-mta-light-gold transition-colors">
            Review Post Drafts
          </Link>
          <Link href="/dashboard/students" className="px-4 py-2 bg-gray-800 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors border border-gray-700">
            Review Enrolments
          </Link>
          <Link href="/dashboard/bot" className="px-4 py-2 bg-gray-800 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors border border-gray-700">
            View Bot Leads
          </Link>
          <Link href="/dashboard/reports" className="px-4 py-2 bg-gray-800 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors border border-gray-700">
            View Reports
          </Link>
        </div>
      </div>
    </div>
  );
}
