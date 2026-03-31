'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, CheckCircle, Clock } from 'lucide-react';

const ROLE_CONFIGS: Record<string, {
  title: string;
  emoji: string;
  accent: string;
  accentBg: string;
  accentBorder: string;
  accentLight: string;
  focus: string;
  tasks: { key: string; label: string; count: string | number; href: string }[];
  pending: string[];
}> = {
  lecturer: {
    title: 'Lecturer Dashboard',
    emoji: '👨‍🏫',
    accent: 'text-purple-400',
    accentBg: 'bg-purple-500/15',
    accentBorder: 'border-l-purple-500',
    accentLight: 'text-purple-300',
    focus: 'Assessment submissions due today — review and provide feedback to students.',
    tasks: [
      { key: 'courses', label: 'My Courses', count: 3, href: '/staff/dashboard/lecturer/courses' },
      { key: 'students', label: 'Active Students', count: 42, href: '/staff/dashboard/lecturer/students' },
      { key: 'attendance', label: 'Attendance Today', count: '38/40', href: '/staff/dashboard/lecturer/attendance' },
      { key: 'materials', label: 'Materials Uploaded', count: 15, href: '/staff/dashboard/lecturer/materials' },
    ],
    pending: ['Assessment submissions pending review', 'Student attendance report due', 'Update course schedule for Q2'],
  },
  'admin-staff': {
    title: 'Admin Dashboard',
    emoji: '👩‍💼',
    accent: 'text-blue-400',
    accentBg: 'bg-blue-500/15',
    accentBorder: 'border-l-blue-500',
    accentLight: 'text-blue-300',
    focus: '5 new enrolment applications received — process before end of day.',
    tasks: [
      { key: 'enrol', label: 'New Enrolments', count: 5, href: '/staff/dashboard/admin/enrolments' },
      { key: 'schedule', label: 'Schedule Changes', count: 2, href: '/staff/dashboard/admin/schedule' },
      { key: 'tasks', label: 'My Tasks', count: 8, href: '/staff/dashboard/admin/tasks' },
      { key: 'reports', label: 'Reports Due', count: 3, href: '/staff/dashboard/admin/reports' },
    ],
    pending: ['Process new student enrolments', 'Update venue bookings for April', 'Generate monthly attendance report'],
  },
  marketing: {
    title: 'Marketing Dashboard',
    emoji: '📱',
    accent: 'text-pink-400',
    accentBg: 'bg-pink-500/15',
    accentBorder: 'border-l-pink-500',
    accentLight: 'text-pink-300',
    focus: '3 posts require approval before they can be scheduled for this week.',
    tasks: [
      { key: 'queue', label: 'Content Pending', count: 7, href: '/staff/dashboard/marketing/content' },
      { key: 'approve', label: 'Posts to Approve', count: 3, href: '/staff/dashboard/marketing/approve' },
      { key: 'calendar', label: 'Scheduled Posts', count: 12, href: '/staff/dashboard/marketing/calendar' },
      { key: 'analytics', label: 'Engagement This Month', count: '2.4K', href: '/staff/dashboard/marketing/analytics' },
    ],
    pending: ['Approve 3 pending posts', 'Schedule next week content', 'Review analytics report'],
  },
  'student-support': {
    title: 'Student Support Dashboard',
    emoji: '🤝',
    accent: 'text-green-400',
    accentBg: 'bg-green-500/15',
    accentBorder: 'border-l-green-500',
    accentLight: 'text-green-300',
    focus: '6 at-risk students need follow-up — check progress reports and reach out.',
    tasks: [
      { key: 'students', label: 'Students Assigned', count: 25, href: '/staff/dashboard/support/students' },
      { key: 'tickets', label: 'Open Tickets', count: 4, href: '/staff/dashboard/support/tickets' },
      { key: 'progress', label: 'At-Risk Students', count: 6, href: '/staff/dashboard/support/progress' },
      { key: 'notes', label: 'Notes Updated', count: 12, href: '/staff/dashboard/support/notes' },
    ],
    pending: ['Follow up on 4 students', 'Counseling session due', 'Update progress reports'],
  },
};

export default function StaffDashboardPage() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const roleCookie = document.cookie.split('; ').find(row => row.startsWith('staff_role='))?.split('=')[1];
    setRole(roleCookie || 'lecturer');
  }, []);

  if (!role) return null;

  const config = ROLE_CONFIGS[role] || ROLE_CONFIGS.lecturer;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl">{config.emoji}</span>
          <h1 className="font-heading font-bold text-white text-2xl">{config.title}</h1>
        </div>
        <p className="text-gray-400 text-sm mt-1">Welcome back! Here&apos;s your overview for today.</p>
      </div>

      {/* Today's Focus banner */}
      <div className={`mb-8 p-4 rounded-xl border ${config.accentBorder} border-l-4 bg-gray-900 border-gray-800`}>
        <div className="flex items-start gap-3">
          <div className={`w-8 h-8 rounded-lg ${config.accentBg} flex items-center justify-center shrink-0`}>
            <CheckCircle className={`w-4 h-4 ${config.accent}`} />
          </div>
          <div>
            <p className={`text-xs font-semibold uppercase tracking-widest ${config.accent} mb-1`}>Today&apos;s Focus</p>
            <p className="text-gray-300 text-sm">{config.focus}</p>
          </div>
        </div>
      </div>

      {/* Task Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {config.tasks.map((task) => (
          <Link
            key={task.key}
            href={task.href}
            className={`bg-gray-900 border border-gray-800 border-l-4 ${config.accentBorder} rounded-xl p-5 hover:border-mta-gold/30 transition-all group`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-8 h-8 rounded-lg ${config.accentBg} flex items-center justify-center`}>
                <span className={`text-sm font-bold ${config.accent}`}>#</span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-gray-700 group-hover:text-mta-gold transition-colors" />
            </div>
            <p className={`font-heading font-bold text-3xl ${config.accentLight}`}>{task.count}</p>
            <p className="text-gray-400 text-sm mt-1">{task.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Tasks */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="font-heading font-semibold text-white text-base mb-4">Pending Tasks</h2>
          <ul className="space-y-3">
            {config.pending.map((task, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className={`w-5 h-5 rounded-full ${config.accentBg} flex items-center justify-center shrink-0 mt-0.5`}>
                  <CheckCircle className={`w-3 h-3 ${config.accent}`} />
                </div>
                <span className="text-gray-300 text-sm">{task}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Time Tracking */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="font-heading font-semibold text-white text-base mb-4">Time Tracking</h2>
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-16 h-16 rounded-full border-4 ${config.accentBorder.replace('border-l-', 'border-')} flex items-center justify-center`}>
              <Clock className={`w-6 h-6 ${config.accent}`} />
            </div>
            <div>
              <p className="text-white text-3xl font-bold font-heading">7.5h</p>
              <p className="text-gray-500 text-sm">Today&apos;s hours</p>
            </div>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2 mb-4">
            <div
              className={`h-2 rounded-full ${config.accentBg.replace('/15', '')}`}
              style={{ width: '78%' }}
            />
          </div>
          <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
            <span>0h</span>
            <span className={config.accent}>7.5h of 8h goal</span>
            <span>8h</span>
          </div>
          <button className={`w-full py-2.5 rounded-lg font-semibold text-sm transition-colors bg-mta-gold text-mta-black hover:bg-mta-light-gold`}>
            Clock Out
          </button>
        </div>
      </div>
    </div>
  );
}
