import Link from 'next/link';
import { MessageSquare, ClipboardList, BookOpen, Megaphone, ArrowUpRight, CheckCircle2, Clock, FileText, BarChart2, Users } from 'lucide-react';
import { DEMO_ACTIVITY } from '@/lib/data/demo/activity';
import { DEMO_ENROLMENTS } from '@/lib/data/demo/enrolments';
import { DEMO_LEADS } from '@/lib/data/demo/leads';
import { COURSES } from '@/lib/data/courses';

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-blue-900/60 text-blue-300 border border-blue-800/50',
  'under-review': 'bg-yellow-900/60 text-yellow-300 border border-yellow-800/50',
  accepted: 'bg-green-900/60 text-green-300 border border-green-800/50',
  rejected: 'bg-red-900/60 text-red-300 border border-red-800/50',
};

const ACTIVITY_ICONS: Record<string, React.ReactNode> = {
  post: <Megaphone className="w-4 h-4 text-pink-400" />,
  lead: <MessageSquare className="w-4 h-4 text-blue-400" />,
  enrolment: <ClipboardList className="w-4 h-4 text-green-400" />,
  settings: <FileText className="w-4 h-4 text-gray-400" />,
  bot: <MessageSquare className="w-4 h-4 text-yellow-400" />,
};

export default function DashboardPage() {
  const newLeads = DEMO_LEADS.filter((l) => l.status === 'new').length;
  const pendingEnrolments = DEMO_ENROLMENTS.filter(
    (e) => e.status === 'new' || e.status === 'under-review'
  ).length;
  const recentEnrolments = DEMO_ENROLMENTS.slice(0, 5);

  const kpis = [
    {
      label: 'Total Leads',
      value: DEMO_LEADS.length,
      sub: `${newLeads} new this week`,
      trend: '+12%',
      trendUp: true,
      icon: MessageSquare,
      iconBg: 'bg-blue-500/15',
      iconColor: 'text-blue-400',
      border: 'border-l-blue-500',
      href: '/dashboard/bot',
    },
    {
      label: 'Pending Enrolments',
      value: pendingEnrolments,
      sub: 'awaiting action',
      trend: '+3 new',
      trendUp: true,
      icon: ClipboardList,
      iconBg: 'bg-yellow-500/15',
      iconColor: 'text-yellow-400',
      border: 'border-l-yellow-500',
      href: '/dashboard/students',
    },
    {
      label: 'Total Courses',
      value: COURSES.length,
      sub: '5 faculties',
      trend: 'SETA accredited',
      trendUp: true,
      icon: BookOpen,
      iconBg: 'bg-purple-500/15',
      iconColor: 'text-purple-400',
      border: 'border-l-purple-500',
      href: '/dashboard/courses',
    },
    {
      label: 'Posts This Month',
      value: 3,
      sub: '2 delivered',
      trend: 'On schedule',
      trendUp: true,
      icon: Megaphone,
      iconBg: 'bg-green-500/15',
      iconColor: 'text-green-400',
      border: 'border-l-green-500',
      href: '/dashboard/social',
    },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading font-bold text-white text-2xl">Overview</h1>
        <p className="text-gray-400 text-sm mt-1">Welcome back, Thandile — here&apos;s what&apos;s happening at MTA.</p>
      </div>

      {/* System Status Banner */}
      <div className="mb-8 bg-gray-900 border border-gray-800 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading font-semibold text-white text-sm">Active Systems</h2>
          <span className="text-[10px] text-gray-600 uppercase tracking-widest">Phase 1</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { num: '01', name: 'WhatsApp Bot', desc: 'Student inquiries & leads', status: 'demo', link: '/dashboard/bot', icon: MessageSquare },
            { num: '03', name: 'Reports', desc: 'WSP/ATR & enrolment stats', status: 'demo', link: '/dashboard/reports', icon: BarChart2 },
            { num: '05', name: 'Social Media', desc: 'Content calendar & posts', status: 'active', link: '/dashboard/social', icon: Megaphone },
            { num: '08', name: 'Brochures', desc: 'Faculty PDF management', status: 'active', link: '/dashboard/brochures', icon: FileText },
          ].map((sys) => {
            const Icon = sys.icon;
            return (
              <Link
                key={sys.num}
                href={sys.link}
                className={`rounded-xl p-3.5 border transition-all hover:border-mta-gold/50 group ${
                  sys.status === 'active'
                    ? 'border-mta-gold/30 bg-mta-gold/5'
                    : 'border-gray-800 bg-gray-800/40'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-700 font-mono text-[10px]">#{sys.num}</span>
                  <div className="flex items-center gap-1">
                    {sys.status === 'active' && (
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    )}
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      sys.status === 'active' ? 'bg-green-900/60 text-green-400' : 'bg-gray-800 text-gray-600'
                    }`}>
                      {sys.status === 'active' ? 'Active' : 'Demo'}
                    </span>
                  </div>
                </div>
                <Icon className={`w-4 h-4 mb-1.5 ${sys.status === 'active' ? 'text-mta-gold' : 'text-gray-600'}`} />
                <p className="text-white text-sm font-medium group-hover:text-mta-gold transition-colors">{sys.name}</p>
                <p className="text-gray-600 text-xs mt-0.5">{sys.desc}</p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Link
              key={kpi.label}
              href={kpi.href}
              className={`bg-gray-900 border border-gray-800 border-l-4 ${kpi.border} rounded-xl p-5 hover:border-mta-gold/30 hover:gold-glow transition-all group`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-lg ${kpi.iconBg} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${kpi.iconColor}`} />
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-700 group-hover:text-mta-gold transition-colors" />
              </div>
              <p className="font-heading font-bold text-white text-3xl">{kpi.value}</p>
              <p className="text-gray-400 text-sm mt-0.5">{kpi.label}</p>
              <div className="flex items-center gap-1.5 mt-2">
                <span className={`text-xs ${kpi.trendUp ? 'text-green-400' : 'text-red-400'}`}>↑ {kpi.trend}</span>
                <span className="text-gray-600 text-xs">· {kpi.sub}</span>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <h2 className="font-heading font-semibold text-white text-base mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {DEMO_ACTIVITY.map((a) => (
              <div key={a.id} className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-gray-800 flex items-center justify-center shrink-0 mt-0.5">
                  {ACTIVITY_ICONS[a.type]}
                </div>
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
            <Link href="/dashboard/students" className="text-mta-gold text-xs hover:underline flex items-center gap-1">
              View all <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {recentEnrolments.map((e) => (
              <div key={e.id} className="flex items-center justify-between gap-2 py-1">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-full bg-gray-800 flex items-center justify-center shrink-0">
                    <Users className="w-3.5 h-3.5 text-gray-500" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-gray-300 text-sm font-medium truncate">{e.name}</p>
                    <p className="text-gray-600 text-xs truncate">{e.course}</p>
                  </div>
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
        <h2 className="font-heading font-semibold text-white text-sm mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/dashboard/social/drafts" className="flex items-center gap-2 px-4 py-2 bg-mta-gold text-mta-black text-sm font-semibold rounded-lg hover:bg-mta-light-gold transition-colors">
            <CheckCircle2 className="w-4 h-4" />
            Review Post Drafts
          </Link>
          <Link href="/dashboard/students" className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors border border-gray-700">
            <ClipboardList className="w-4 h-4 text-gray-400" />
            Review Enrolments
          </Link>
          <Link href="/dashboard/bot" className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors border border-gray-700">
            <MessageSquare className="w-4 h-4 text-gray-400" />
            View Bot Leads
          </Link>
          <Link href="/dashboard/reports" className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors border border-gray-700">
            <BarChart2 className="w-4 h-4 text-gray-400" />
            View Reports
          </Link>
        </div>
      </div>
    </div>
  );
}
