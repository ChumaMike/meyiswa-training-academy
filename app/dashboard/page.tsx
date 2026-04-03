'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import {
  MessageSquare, ClipboardList, BookOpen, Megaphone,
  ArrowUpRight, CheckCircle2, FileText, BarChart2,
  Users, TrendingUp, TrendingDown, Activity, Wifi,
  Clock, Star, Zap,
} from 'lucide-react';
import { DEMO_ACTIVITY } from '@/lib/data/demo/activity';
import { DEMO_ENROLMENTS } from '@/lib/data/demo/enrolments';
import { DEMO_LEADS } from '@/lib/data/demo/leads';
import { COURSES } from '@/lib/data/courses';
import AgentHub from '@/components/agents/AgentHub';

// ─── Admin Automation Agents ─────────────────────────────────────────────────
const ADMIN_AGENTS = [
  {
    name: 'Invoice Email Agent',
    description: 'Automatically generates and sends a PDF invoice to students when their enrolment is accepted.',
    icon: '📧',
    trigger: 'Enrolment Accepted',
    triggerType: 'event' as const,
    accentColor: '#D4A017',
    logLines: [
      '⏳ Scanning enrolments for newly accepted students...',
      '✓ Found 3 accepted enrolments: Sipho D., Nomsa K., Zanele M.',
      '⏳ Generating PDF invoice for Sipho Dlamini (IT Systems Support NQF5)...',
      '✓ Invoice #INV-2026-0047 generated — R 12,500.00',
      '📤 Sending invoice to sipho.d@gmail.com via SendGrid...',
      '✓ Invoice delivered — Message ID: sg-0047a',
      '⏳ Generating invoice for Nomsa Khumalo (Business Management NQF6)...',
      '✓ Invoice #INV-2026-0048 generated — R 9,800.00',
      '📤 Sending to nomsa.k@yahoo.com...',
      '✓ Invoice delivered — Message ID: sg-0048b',
      '✓ All 3 invoices sent. CRM updated. Enrolments marked as Invoiced.',
    ],
  },
  {
    name: 'Lead Follow-up Agent',
    description: 'Detects new WhatsApp bot leads and sends a personalised follow-up message within 5 minutes.',
    icon: '💬',
    trigger: 'New Bot Lead',
    triggerType: 'event' as const,
    accentColor: '#25D366',
    logLines: [
      '⏳ Checking WhatsApp Bot for new leads in last 15 minutes...',
      '✓ 2 new leads detected: Thabo N., Ayanda Z.',
      '⏳ Looking up course interest for Thabo Nkosi → "Software Developer"...',
      '✓ Matched course: Software Developer NQF5 (MICT SETA)',
      '📤 Sending WhatsApp reply to +27 82 *** 4521...',
      '✓ Message delivered: "Hi Thabo! 👋 Thanks for your interest in MTA..."',
      '⏳ Looking up Ayanda Zulu → "IT Support"...',
      '✓ Matched course: IT Systems Support NQF5',
      '📤 Sending reply to +27 71 *** 8834...',
      '✓ Message delivered. Both leads tagged as "Contacted" in CRM.',
      'ℹ Auto follow-up scheduled in 48h if no response.',
    ],
  },
  {
    name: 'Weekly Report Agent',
    description: 'Every Monday at 8am, compiles a summary report of enrolments, leads, and revenue — then emails it to management.',
    icon: '📊',
    trigger: 'Every Monday 08:00',
    triggerType: 'scheduled' as const,
    accentColor: '#8B5CF6',
    logLines: [
      '⏳ Compiling weekly report for week ending 6 Apr 2026...',
      '✓ Enrolments this week: 14 new, 3 accepted, 2 rejected',
      '✓ WhatsApp leads this week: 47 new (+12% vs last week)',
      '✓ Revenue this week: R 156,200.00',
      '⏳ Generating PDF report document...',
      '✓ Report generated: MTA_Weekly_Report_W14_2026.pdf (2.1 MB)',
      '📤 Emailing to admin@meyiswatraining.co.za...',
      '✓ Report delivered to 3 recipients',
      '⏳ Archiving report to Google Drive → /MTA Reports/2026/...',
      '✓ Archived. Next report scheduled for Mon 13 Apr 2026 at 08:00.',
    ],
  },
  {
    name: 'Social Auto-Post Agent',
    description: 'Monitors the content calendar and automatically publishes approved posts to Facebook and Instagram on schedule.',
    icon: '📱',
    trigger: 'Per Content Calendar',
    triggerType: 'scheduled' as const,
    accentColor: '#E1306C',
    logLines: [
      '⏳ Checking content calendar for posts due today (3 Apr 2026)...',
      '✓ Found 1 approved post due: "IT Systems Support NQF5 Spotlight"',
      '⏳ Fetching post caption and media from content queue...',
      '✓ Caption loaded (287 chars) · Media: course-spotlight-it.jpg',
      '⏳ Publishing to Facebook Page (MTA Official)...',
      '✓ Posted to Facebook — Post ID: fb_291047abc',
      '⏳ Publishing to Instagram (@meyiswatraining)...',
      '✓ Posted to Instagram — Post ID: ig_48392xyz',
      '✓ Calendar entry updated: status → "Delivered"',
      'ℹ Next scheduled post: Wed 9 Apr — Business Management spotlight.',
    ],
  },
];

// ─── Static chart data ────────────────────────────────────────────────────
const ENROLMENT_BY_FACULTY = [
  { faculty: 'IT', count: 34 },
  { faculty: 'Business', count: 28 },
  { faculty: 'Health', count: 19 },
  { faculty: 'HR', count: 15 },
  { faculty: 'Retail', count: 12 },
];

const LEAD_SOURCES = [
  { name: 'WhatsApp Bot', value: 45 },
  { name: 'Social Media', value: 30 },
  { name: 'Website', value: 15 },
  { name: 'Referral', value: 10 },
];

const PIE_COLORS = ['#D4A017', '#F5D980', '#A07C10', '#6B5010'];

const STATUS_COLORS: Record<string, string> = {
  new: 'badge-info',
  'under-review': 'badge-warning',
  accepted: 'badge-success',
  rejected: 'badge-danger',
};

const ACTIVITY_DOT: Record<string, string> = {
  post: 'bg-pink-400',
  lead: 'bg-blue-400',
  enrolment: 'bg-green-400',
  settings: 'bg-gray-400',
  bot: 'bg-yellow-400',
};

const ACTIVITY_BG: Record<string, string> = {
  post: 'bg-pink-500/10 text-pink-400',
  lead: 'bg-blue-500/10 text-blue-400',
  enrolment: 'bg-green-500/10 text-green-400',
  settings: 'bg-gray-500/10 text-gray-400',
  bot: 'bg-yellow-500/10 text-yellow-400',
};

const ACTIVITY_ICONS: Record<string, React.ReactNode> = {
  post: <Megaphone className="w-3.5 h-3.5" />,
  lead: <MessageSquare className="w-3.5 h-3.5" />,
  enrolment: <ClipboardList className="w-3.5 h-3.5" />,
  settings: <FileText className="w-3.5 h-3.5" />,
  bot: <Zap className="w-3.5 h-3.5" />,
};

// Framer animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.07, ease: 'easeOut' as const },
  }),
};

// Custom tooltip for recharts
const CustomBarTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-xs shadow-xl">
        <p className="text-gray-400 mb-1">{label}</p>
        <p className="text-[#D4A017] font-bold">{payload[0].value} enrolments</p>
      </div>
    );
  }
  return null;
};

const CustomPieTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-xs shadow-xl">
        <p className="text-white font-semibold">{payload[0].name}</p>
        <p className="text-[#D4A017]">{payload[0].value}%</p>
      </div>
    );
  }
  return null;
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
      value: 847,
      sub: '+12% this month',
      trendUp: true,
      trendVal: '12%',
      accent: 'from-blue-500/20 to-blue-500/0',
      border: 'border-blue-500/40',
      iconBg: 'bg-blue-500/15',
      iconColor: 'text-blue-400',
      icon: MessageSquare,
      href: '/dashboard/bot',
      highlight: 'text-blue-400',
    },
    {
      label: 'Pending Enrolments',
      value: pendingEnrolments || 23,
      sub: 'Needs action',
      trendUp: false,
      trendVal: '3 new',
      accent: 'from-orange-500/20 to-orange-500/0',
      border: 'border-orange-500/40',
      iconBg: 'bg-orange-500/15',
      iconColor: 'text-orange-400',
      icon: ClipboardList,
      href: '/dashboard/students',
      highlight: 'text-orange-400',
    },
    {
      label: 'Active Courses',
      value: COURSES.length,
      sub: 'Across 5 faculties',
      trendUp: true,
      trendVal: 'SETA accredited',
      accent: 'from-green-500/20 to-green-500/0',
      border: 'border-green-500/40',
      iconBg: 'bg-green-500/15',
      iconColor: 'text-green-400',
      icon: BookOpen,
      href: '/dashboard/courses',
      highlight: 'text-green-400',
    },
    {
      label: 'Posts This Month',
      value: 18,
      sub: '4 scheduled',
      trendUp: true,
      trendVal: 'On track',
      accent: 'from-purple-500/20 to-purple-500/0',
      border: 'border-purple-500/40',
      iconBg: 'bg-purple-500/15',
      iconColor: 'text-purple-400',
      icon: Megaphone,
      href: '/dashboard/social',
      highlight: 'text-purple-400',
    },
  ];

  return (
    <div className="p-6 lg:p-8 min-h-screen bg-gray-950">

      {/* ── System Status Bar ─────────────────────────────────────── */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0}
        className="mb-6 flex items-center gap-4 px-4 py-2.5 bg-gray-900/80 border border-gray-800 rounded-xl backdrop-blur-sm text-xs overflow-x-auto"
      >
        <span className="flex items-center gap-1.5 shrink-0">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
          </span>
          <span className="text-green-400 font-semibold">Online</span>
        </span>
        <span className="text-gray-700">|</span>
        <span className="text-gray-400 shrink-0"><span className="text-white font-medium">99.9%</span> uptime</span>
        <span className="text-gray-700">|</span>
        <span className="flex items-center gap-1.5 shrink-0">
          <Wifi className="w-3 h-3 text-[#D4A017]" />
          <span className="text-gray-400">API <span className="text-[#D4A017] font-medium">Active</span></span>
        </span>
        <span className="text-gray-700">|</span>
        <span className="flex items-center gap-1.5 shrink-0">
          <Zap className="w-3 h-3 text-[#D4A017]" />
          <span className="text-gray-400">Bot <span className="text-[#D4A017] font-medium">Active</span></span>
        </span>
        <div className="ml-auto shrink-0 text-gray-600 hidden sm:block">
          Last sync: <span className="text-gray-400">just now</span>
        </div>
      </motion.div>

      {/* ── Page Header ───────────────────────────────────────────── */}
      <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={1} className="mb-7">
        <h1 className="font-heading font-bold text-white text-2xl lg:text-3xl tracking-tight">
          Overview
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Welcome back, <span className="text-[#D4A017] font-medium">Thandile</span> — here&apos;s what&apos;s happening at MTA today.
        </p>
      </motion.div>

      {/* ── KPI Row ───────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <motion.div
              key={kpi.label}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={i + 2}
            >
              <Link
                href={kpi.href}
                className={`group block bg-gray-900 border ${kpi.border} rounded-xl p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 relative overflow-hidden`}
              >
                {/* Gradient accent background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${kpi.accent} opacity-60 pointer-events-none rounded-xl`} />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-10 h-10 rounded-xl ${kpi.iconBg} flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${kpi.iconColor}`} />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-gray-700 group-hover:text-[#D4A017] transition-colors" />
                  </div>

                  <p className="font-heading font-bold text-white text-3xl tabular-nums leading-none mb-1">
                    {kpi.value}
                  </p>
                  <p className="text-gray-400 text-sm font-medium">{kpi.label}</p>

                  <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-gray-800/60">
                    {kpi.trendUp
                      ? <TrendingUp className={`w-3.5 h-3.5 ${kpi.highlight} shrink-0`} />
                      : <TrendingDown className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                    }
                    <span className={`text-xs font-medium ${kpi.highlight}`}>{kpi.trendVal}</span>
                    <span className="text-gray-600 text-xs">· {kpi.sub}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* ── Charts Row ────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">

        {/* Enrolments by Faculty — Bar Chart */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={6}
          className="bg-gray-900 border border-gray-800 rounded-xl p-5"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-heading font-semibold text-white text-sm">Enrolments by Faculty</h2>
              <p className="text-gray-500 text-xs mt-0.5">Current intake breakdown</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <Activity className="w-3.5 h-3.5 text-[#D4A017]" />
              <span>Live data</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={ENROLMENT_BY_FACULTY} barSize={32}>
              <XAxis
                dataKey="faculty"
                tick={{ fill: '#6B7280', fontSize: 11 }}
                axisLine={{ stroke: '#374151' }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: '#6B7280', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={28}
              />
              <Tooltip content={<CustomBarTooltip />} cursor={{ fill: 'rgba(212,160,23,0.06)' }} />
              <Bar dataKey="count" fill="#D4A017" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Lead Sources — Pie/Donut Chart */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={7}
          className="bg-gray-900 border border-gray-800 rounded-xl p-5"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-heading font-semibold text-white text-sm">Lead Sources</h2>
              <p className="text-gray-500 text-xs mt-0.5">Where students find MTA</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <Star className="w-3.5 h-3.5 text-[#D4A017]" />
              <span>All time</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width="55%" height={180}>
              <PieChart>
                <Pie
                  data={LEAD_SOURCES}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {LEAD_SOURCES.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomPieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2.5">
              {LEAD_SOURCES.map((src, i) => (
                <div key={src.name} className="flex items-center gap-2.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: PIE_COLORS[i] }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 text-xs truncate">{src.name}</span>
                      <span className="text-[#D4A017] text-xs font-semibold ml-2">{src.value}%</span>
                    </div>
                    <div className="mt-1 h-1 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${src.value}%`, backgroundColor: PIE_COLORS[i] }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Bottom Row ────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">

        {/* Recent Activity Feed */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={8}
          className="bg-gray-900 border border-gray-800 rounded-xl p-5"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-heading font-semibold text-white text-sm">Recent Activity</h2>
            <span className="text-xs text-gray-600">Last 24h</span>
          </div>
          <div className="space-y-1">
            {DEMO_ACTIVITY.map((a, idx) => (
              <motion.div
                key={a.id}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={idx * 0.5 + 9}
                className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-gray-800/50 transition-colors group"
              >
                {/* Icon badge */}
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${ACTIVITY_BG[a.type] || 'bg-gray-700/50 text-gray-400'}`}>
                  {ACTIVITY_ICONS[a.type]}
                </div>
                {/* Dot line connector */}
                <div className="flex-1 min-w-0">
                  <p className="text-gray-300 text-sm leading-snug group-hover:text-white transition-colors">{a.action}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${ACTIVITY_DOT[a.type] || 'bg-gray-600'}`} />
                    <p className="text-gray-600 text-xs">{a.user}</p>
                    <span className="text-gray-700 text-xs">·</span>
                    <p className="text-gray-600 text-xs flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" /> {a.time}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Enrolments Table */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={9}
          className="bg-gray-900 border border-gray-800 rounded-xl p-5"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-heading font-semibold text-white text-sm">Recent Enrolments</h2>
            <Link
              href="/dashboard/students"
              className="text-[#D4A017] text-xs hover:underline flex items-center gap-1 group"
            >
              View all <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* Table header */}
          <div className="grid grid-cols-[1fr_auto] gap-2 px-2 pb-2 border-b border-gray-800 mb-2">
            <span className="text-gray-600 text-[10px] font-semibold uppercase tracking-wider">Student</span>
            <span className="text-gray-600 text-[10px] font-semibold uppercase tracking-wider">Status</span>
          </div>

          <div className="space-y-1">
            {recentEnrolments.map((e, idx) => (
              <motion.div
                key={e.id}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={idx * 0.4 + 10}
                className="flex items-center justify-between gap-2 p-2 rounded-lg hover:bg-gray-800/50 transition-colors group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  {/* Avatar */}
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 border border-gray-700 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-gray-400">
                      {e.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-gray-200 text-sm font-medium truncate group-hover:text-white transition-colors">{e.name}</p>
                    <p className="text-gray-600 text-xs truncate">{e.course}</p>
                  </div>
                </div>
                <span className={`text-xs px-2.5 py-0.5 rounded-full shrink-0 capitalize ${STATUS_COLORS[e.status] || 'badge-info'}`}>
                  {e.status === 'under-review' ? 'Review' : e.status}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Quick Actions + Active Systems ────────────────────────── */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={12}
        className="bg-gray-900 border border-gray-800 rounded-xl p-5"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading font-semibold text-white text-sm">Quick Actions</h2>
          <span className="text-gray-600 text-xs">Active Systems</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Quick action buttons */}
          <div className="flex flex-wrap gap-2.5">
            <Link
              href="/dashboard/social/drafts"
              className="flex items-center gap-2 px-4 py-2 bg-[#D4A017] text-gray-950 text-sm font-semibold rounded-lg hover:bg-[#F5D980] transition-all hover:shadow-lg hover:shadow-yellow-900/30 hover:-translate-y-0.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              Review Post Drafts
            </Link>
            <Link
              href="/dashboard/students"
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-all border border-gray-700 hover:-translate-y-0.5"
            >
              <ClipboardList className="w-4 h-4 text-gray-400" />
              Review Enrolments
            </Link>
            <Link
              href="/dashboard/bot"
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-all border border-gray-700 hover:-translate-y-0.5"
            >
              <MessageSquare className="w-4 h-4 text-gray-400" />
              View Bot Leads
            </Link>
            <Link
              href="/dashboard/reports"
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-all border border-gray-700 hover:-translate-y-0.5"
            >
              <BarChart2 className="w-4 h-4 text-gray-400" />
              View Reports
            </Link>
          </div>

          {/* Active system pills */}
          <div className="flex flex-wrap gap-2 items-start">
            {[
              { num: '01', name: 'WhatsApp Bot', status: 'demo', link: '/dashboard/bot', icon: MessageSquare },
              { num: '03', name: 'Reports', status: 'demo', link: '/dashboard/reports', icon: BarChart2 },
              { num: '05', name: 'Social Media', status: 'active', link: '/dashboard/social', icon: Megaphone },
              { num: '08', name: 'Brochures', status: 'active', link: '/dashboard/brochures', icon: FileText },
            ].map((sys) => {
              const Icon = sys.icon;
              return (
                <Link
                  key={sys.num}
                  href={sys.link}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all hover:-translate-y-0.5 ${
                    sys.status === 'active'
                      ? 'border-[#D4A017]/30 bg-[#D4A017]/5 text-[#D4A017] hover:border-[#D4A017]/60'
                      : 'border-gray-700 bg-gray-800/50 text-gray-500 hover:border-gray-600 hover:text-gray-400'
                  }`}
                >
                  {sys.status === 'active' && (
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400"></span>
                    </span>
                  )}
                  <Icon className="w-3 h-3" />
                  {sys.name}
                  <span className="text-[9px] opacity-50">#{sys.num}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* ── Agent Automation Hub ───────────────────────────────────── */}
      <AgentHub agents={ADMIN_AGENTS} title="Automation Agents" />
    </div>
  );
}
