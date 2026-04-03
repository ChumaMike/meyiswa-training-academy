'use client';

import { motion } from 'framer-motion';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, Legend,
} from 'recharts';
import { DEMO_ENROLMENTS } from '@/lib/data/demo/enrolments';
import { DEMO_LEADS } from '@/lib/data/demo/leads';
import { COURSES } from '@/lib/data/courses';
import { FACULTIES } from '@/lib/data/faculties';
import {
  TrendingUp, Users, BookOpen, Award, BarChart2,
  ArrowUp, ArrowDown, Download, Filter,
} from 'lucide-react';

// ─── Demo chart data ───────────────────────────────────────────────────────
const MONTHLY_ENROLMENTS = [
  { month: 'Jan', enrolments: 18, leads: 32 },
  { month: 'Feb', enrolments: 24, leads: 41 },
  { month: 'Mar', enrolments: 31, leads: 55 },
  { month: 'Apr', enrolments: 27, leads: 48 },
  { month: 'May', enrolments: 38, leads: 62 },
  { month: 'Jun', enrolments: 42, leads: 70 },
  { month: 'Jul', enrolments: 35, leads: 58 },
  { month: 'Aug', enrolments: 46, leads: 77 },
  { month: 'Sep', enrolments: 53, leads: 84 },
  { month: 'Oct', enrolments: 49, leads: 79 },
  { month: 'Nov', enrolments: 58, leads: 91 },
  { month: 'Dec', enrolments: 44, leads: 67 },
];

const NQF_DATA = [
  { level: 'NQF 4', count: 22, color: '#D4A017' },
  { level: 'NQF 5', count: 18, color: '#F5D980' },
  { level: 'NQF 6', count: 14, color: '#A07C10' },
  { level: 'NQF 7', count: 8, color: '#6B5010' },
];

const FACULTY_PERFORMANCE = [
  { faculty: 'IT & Computing', enrolments: 34, target: 40, completion: 82 },
  { faculty: 'Business', enrolments: 28, target: 35, completion: 76 },
  { faculty: 'Health & Safety', enrolments: 19, target: 25, completion: 91 },
  { faculty: 'HR & Labour', enrolments: 15, target: 20, completion: 68 },
  { faculty: 'Retail', enrolments: 12, target: 15, completion: 85 },
];

const RECENT_TABLE_DATA = [
  { name: 'Thabo Nkosi', course: 'End User Computing NQF 4', faculty: 'IT', nqf: 4, status: 'accepted', date: '2025-01-28' },
  { name: 'Lerato Dlamini', course: 'Business Administration NQF 5', faculty: 'Business', nqf: 5, status: 'under-review', date: '2025-01-27' },
  { name: 'Sipho Mahlangu', course: 'Occupational Health & Safety', faculty: 'Health', nqf: 5, status: 'new', date: '2025-01-26' },
  { name: 'Ayanda Zulu', course: 'HR Management NQF 6', faculty: 'HR', nqf: 6, status: 'accepted', date: '2025-01-25' },
  { name: 'Nomsa Khumalo', course: 'Retail Management NQF 5', faculty: 'Retail', nqf: 5, status: 'accepted', date: '2025-01-24' },
  { name: 'Bongani Mokoena', course: 'MCSA Windows Server', faculty: 'IT', nqf: 6, status: 'new', date: '2025-01-23' },
  { name: 'Zanele Mthembu', course: 'Business Administration NQF 4', faculty: 'Business', nqf: 4, status: 'under-review', date: '2025-01-22' },
];

const STATUS_BADGE: Record<string, string> = {
  accepted: 'bg-green-900/60 text-green-300 border border-green-800/50',
  'under-review': 'bg-yellow-900/60 text-yellow-300 border border-yellow-800/50',
  new: 'bg-blue-900/60 text-blue-300 border border-blue-800/50',
  rejected: 'bg-red-900/60 text-red-300 border border-red-800/50',
};

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.08, ease: 'easeOut' as const },
  }),
};

// Custom tooltips
const LineTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2.5 text-xs shadow-xl">
        <p className="text-gray-400 mb-2 font-medium">{label}</p>
        {payload.map((p: any) => (
          <p key={p.dataKey} style={{ color: p.color }} className="mb-0.5">
            {p.dataKey === 'enrolments' ? 'Enrolments' : 'Leads'}: <span className="font-bold">{p.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const BarTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-xs shadow-xl">
        <p className="text-gray-400 mb-1">{label}</p>
        <p className="text-[#D4A017] font-bold">{payload[0].value} courses</p>
      </div>
    );
  }
  return null;
};

export default function ReportsPage() {
  const totalEnrolments = DEMO_ENROLMENTS.length;
  const acceptedCount = DEMO_ENROLMENTS.filter((e) => e.status === 'accepted').length;
  const acceptanceRate = Math.round((acceptedCount / totalEnrolments) * 100);
  const avgNqf = Math.round(COURSES.reduce((sum, c) => sum + (c.nqfLevel || 5), 0) / COURSES.length * 10) / 10;

  const enrolmentsByFaculty = FACULTIES.map((f) => ({
    faculty: f.shortLabel,
    count: DEMO_ENROLMENTS.filter(
      (e) =>
        e.faculty.toLowerCase().includes(f.shortLabel.toLowerCase()) ||
        e.faculty.toLowerCase().includes(f.label.toLowerCase().split(' ')[0])
    ).length,
  }));

  const nqfGroups = [4, 5, 6, 7].map((level) => ({
    level,
    count: COURSES.filter((c) => c.nqfLevel === level).length,
  }));

  const enrolmentStatuses = [
    { status: 'Accepted', count: acceptedCount, color: 'bg-green-500' },
    { status: 'Under Review', count: DEMO_ENROLMENTS.filter((e) => e.status === 'under-review').length, color: 'bg-yellow-500' },
    { status: 'New', count: DEMO_ENROLMENTS.filter((e) => e.status === 'new').length, color: 'bg-blue-500' },
    { status: 'Rejected', count: DEMO_ENROLMENTS.filter((e) => e.status === 'rejected').length, color: 'bg-red-500' },
  ];

  const topStats = [
    {
      label: 'Total Revenue',
      value: 'R 842K',
      sub: '+18% YoY',
      trendUp: true,
      icon: TrendingUp,
      iconBg: 'bg-[#D4A017]/15',
      iconColor: 'text-[#D4A017]',
      highlight: 'text-[#D4A017]',
      border: 'border-l-[#D4A017]',
    },
    {
      label: 'Total Students',
      value: totalEnrolments,
      sub: 'Across all faculties',
      trendUp: true,
      icon: Users,
      iconBg: 'bg-blue-500/15',
      iconColor: 'text-blue-400',
      highlight: 'text-blue-400',
      border: 'border-l-blue-500',
    },
    {
      label: 'Completion Rate',
      value: `${acceptanceRate}%`,
      sub: 'Acceptance rate',
      trendUp: acceptanceRate > 50,
      icon: Award,
      iconBg: 'bg-green-500/15',
      iconColor: 'text-green-400',
      highlight: 'text-green-400',
      border: 'border-l-green-500',
    },
    {
      label: 'Avg NQF Level',
      value: avgNqf || '5.2',
      sub: `${COURSES.length} courses catalogued`,
      trendUp: true,
      icon: BookOpen,
      iconBg: 'bg-purple-500/15',
      iconColor: 'text-purple-400',
      highlight: 'text-purple-400',
      border: 'border-l-purple-500',
    },
  ];

  return (
    <div className="p-6 lg:p-8 min-h-screen bg-gray-950">

      {/* ── Header ────────────────────────────────────────────────── */}
      <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0} className="mb-7">
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <h1 className="font-heading font-bold text-white text-2xl lg:text-3xl tracking-tight">
              Reports &amp; Analytics
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Enrolment trends, lead data, NQF distribution. <span className="text-[#D4A017]">Demo data</span> — live backend coming in Phase 2.
            </p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-lg text-xs text-gray-400 hover:text-white hover:border-gray-600 transition-colors">
              <Filter className="w-3.5 h-3.5" /> Filter
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#D4A017] text-gray-950 rounded-lg text-xs font-semibold hover:bg-[#F5D980] transition-colors">
              <Download className="w-3.5 h-3.5" /> Export
            </button>
          </div>
        </div>
      </motion.div>

      {/* ── Top KPI Stats ─────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {topStats.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.label}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={i + 1}
              className={`bg-gray-900 border border-gray-800 border-l-4 ${s.border} rounded-xl p-4 hover:border-[#D4A017]/30 transition-all hover:-translate-y-0.5 duration-300`}
            >
              <div className={`w-8 h-8 rounded-lg ${s.iconBg} flex items-center justify-center mb-3`}>
                <Icon className={`w-4 h-4 ${s.iconColor}`} />
              </div>
              <p className="font-heading font-bold text-white text-2xl tabular-nums">{s.value}</p>
              <p className="text-gray-500 text-xs mt-0.5 mb-2">{s.label}</p>
              <div className="flex items-center gap-1">
                {s.trendUp
                  ? <ArrowUp className={`w-3 h-3 ${s.highlight}`} />
                  : <ArrowDown className="w-3 h-3 text-red-400" />
                }
                <span className={`text-xs ${s.highlight}`}>{s.sub}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── Monthly Enrolments Trend ───────────────────────────────── */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={5}
        className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-5"
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="font-heading font-semibold text-white text-sm">Monthly Enrolments &amp; Leads</h2>
            <p className="text-gray-500 text-xs mt-0.5">12-month trend overview — 2025</p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 rounded bg-[#D4A017] inline-block" /> Enrolments</span>
            <span className="flex items-center gap-1.5 text-gray-500"><span className="w-3 h-0.5 rounded bg-gray-600 inline-block" /> Leads</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={MONTHLY_ENROLMENTS}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
            <XAxis
              dataKey="month"
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
            <Tooltip content={<LineTooltip />} />
            <Line
              type="monotone"
              dataKey="enrolments"
              stroke="#D4A017"
              strokeWidth={2.5}
              dot={{ fill: '#D4A017', r: 3, strokeWidth: 0 }}
              activeDot={{ r: 5, fill: '#F5D980' }}
            />
            <Line
              type="monotone"
              dataKey="leads"
              stroke="#374151"
              strokeWidth={1.5}
              dot={false}
              strokeDasharray="4 2"
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* ── Two column: NQF + Faculty Performance ─────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">

        {/* NQF Level Distribution */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={6}
          className="bg-gray-900 border border-gray-800 rounded-xl p-5"
        >
          <h2 className="font-heading font-semibold text-white text-sm mb-1">NQF Level Distribution</h2>
          <p className="text-gray-500 text-xs mb-5">Courses by qualification level</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={nqfGroups.map(n => ({ level: `NQF ${n.level}`, count: n.count }))} barSize={36}>
              <XAxis
                dataKey="level"
                tick={{ fill: '#6B7280', fontSize: 11 }}
                axisLine={{ stroke: '#374151' }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: '#6B7280', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={24}
              />
              <Tooltip content={<BarTooltip />} cursor={{ fill: 'rgba(212,160,23,0.06)' }} />
              <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                {nqfGroups.map((_, i) => (
                  <rect key={i} fill={NQF_DATA[i]?.color || '#D4A017'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          {/* NQF breakdown bars */}
          <div className="mt-4 space-y-2.5">
            {nqfGroups.map((n, i) => (
              <div key={n.level} className="flex items-center gap-3">
                <span className="text-gray-400 text-xs w-12">NQF {n.level}</span>
                <div className="flex-1 bg-gray-800 rounded-full h-1.5">
                  <div
                    className="h-1.5 rounded-full transition-all duration-700"
                    style={{
                      width: `${(n.count / COURSES.length) * 100}%`,
                      backgroundColor: NQF_DATA[i]?.color || '#D4A017',
                    }}
                  />
                </div>
                <span className="text-gray-400 text-xs w-8 text-right">{n.count}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Faculty Performance */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={7}
          className="bg-gray-900 border border-gray-800 rounded-xl p-5"
        >
          <h2 className="font-heading font-semibold text-white text-sm mb-1">Faculty Performance</h2>
          <p className="text-gray-500 text-xs mb-5">Enrolments vs target &amp; completion rate</p>
          <div className="space-y-4">
            {FACULTY_PERFORMANCE.map((fp) => (
              <div key={fp.faculty}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-gray-300 text-xs font-medium">{fp.faculty}</span>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-[#D4A017]">{fp.enrolments}</span>
                    <span className="text-gray-600">/</span>
                    <span className="text-gray-500">{fp.target}</span>
                    <span className="text-gray-700 text-[10px] ml-1">{fp.completion}%</span>
                  </div>
                </div>
                {/* Target bar */}
                <div className="relative h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#D4A017]/30 rounded-full absolute"
                    style={{ width: `${(fp.target / 50) * 100}%` }}
                  />
                  <div
                    className="h-full bg-[#D4A017] rounded-full absolute transition-all duration-700"
                    style={{ width: `${(fp.enrolments / 50) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Enrolment status breakdown */}
          <div className="mt-5 pt-4 border-t border-gray-800">
            <p className="text-gray-600 text-[10px] uppercase tracking-wider mb-3">Enrolment Status</p>
            <div className="space-y-2">
              {enrolmentStatuses.map((s) => (
                <div key={s.status} className="flex items-center gap-3">
                  <div className="w-20 text-gray-400 text-xs">{s.status}</div>
                  <div className="flex-1 bg-gray-800 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full ${s.color}`}
                      style={{ width: `${(s.count / totalEnrolments) * 100}%` }}
                    />
                  </div>
                  <div className="text-gray-400 text-xs w-5 text-right">{s.count}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Data Table ────────────────────────────────────────────── */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={8}
        className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-5"
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="font-heading font-semibold text-white text-sm">Recent Enrolment Records</h2>
            <p className="text-gray-500 text-xs mt-0.5">Latest student enrolment submissions</p>
          </div>
          <span className="text-xs text-gray-600 bg-gray-800 px-2.5 py-1 rounded-lg">{RECENT_TABLE_DATA.length} records</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800">
                {['Student Name', 'Course', 'Faculty', 'NQF Level', 'Status', 'Date'].map((h) => (
                  <th
                    key={h}
                    className="text-left text-[10px] font-semibold text-gray-600 uppercase tracking-wider pb-3 pr-4 whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RECENT_TABLE_DATA.map((row, idx) => (
                <motion.tr
                  key={idx}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={idx * 0.3 + 9}
                  className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors"
                >
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 border border-gray-700 flex items-center justify-center shrink-0">
                        <span className="text-xs font-bold text-gray-400">{row.name.charAt(0)}</span>
                      </div>
                      <span className="text-gray-200 font-medium whitespace-nowrap">{row.name}</span>
                    </div>
                  </td>
                  <td className="py-3 pr-4">
                    <span className="text-gray-400 text-xs">{row.course}</span>
                  </td>
                  <td className="py-3 pr-4">
                    <span className="text-gray-400 text-xs px-2 py-0.5 bg-gray-800 rounded">{row.faculty}</span>
                  </td>
                  <td className="py-3 pr-4">
                    <span className="text-[#D4A017] text-xs font-medium">{row.nqf}</span>
                  </td>
                  <td className="py-3 pr-4">
                    <span className={`text-xs px-2.5 py-0.5 rounded-full capitalize ${STATUS_BADGE[row.status] || ''}`}>
                      {row.status === 'under-review' ? 'Review' : row.status}
                    </span>
                  </td>
                  <td className="py-3">
                    <span className="text-gray-600 text-xs">{row.date}</span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* ── WSP/ATR Reports Notice ─────────────────────────────────── */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={10}
        className="bg-gray-900 border border-gray-800 rounded-xl p-5"
      >
        <div className="flex items-center gap-2 mb-4">
          <BarChart2 className="w-4 h-4 text-[#D4A017]" />
          <h2 className="font-heading font-semibold text-white text-sm">WSP / ATR Compliance Reports</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            { label: 'Annual Training Report (ATR)', status: 'Pending System 03', icon: '📊' },
            { label: 'Workplace Skills Plan (WSP)', status: 'Pending System 03', icon: '📋' },
            { label: 'Employment Equity Report', status: 'Pending System 03', icon: '⚖️' },
            { label: 'SETA Learnership Report', status: 'Pending System 03', icon: '🎓' },
          ].map((r) => (
            <div
              key={r.label}
              className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/40 border border-gray-800 hover:border-gray-700 transition-colors"
            >
              <span className="text-lg">{r.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-gray-300 text-xs font-medium truncate">{r.label}</p>
                <p className="text-gray-600 text-[10px] mt-0.5">{r.status}</p>
              </div>
              <span className="text-[10px] text-gray-700 bg-gray-800 px-1.5 py-0.5 rounded shrink-0">Phase 2</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
