'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function StaffDashboardPage() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const roleCookie = document.cookie.split('; ').find(row => row.startsWith('staff_role='))?.split('=')[1];
    setRole(roleCookie || 'lecturer');
  }, []);

  if (!role) return null;

  const roleConfigs: Record<string, any> = {
    lecturer: {
      title: "Lecturer Dashboard",
      icon: "👨‍🏫",
      tasks: [
        { key: 'courses', label: 'My Courses', icon: '📚', count: 3, href: '/staff/dashboard/lecturer/courses' },
        { key: 'students', label: 'Active Students', icon: '👥', count: 42, href: '/staff/dashboard/lecturer/students' },
        { key: 'attendance', label: 'Attendance Today', icon: '✓', count: '38/40', href: '/staff/dashboard/lecturer/attendance' },
        { key: 'materials', label: 'Materials Uploaded', icon: '📄', count: 15, href: '/staff/dashboard/lecturer/materials' },
      ],
      pending: ['Assessment submissions pending review', 'Student attendance report due', 'Update course schedule'],
    },
    'admin-staff': {
      title: "Admin Dashboard",
      icon: "👩‍💼",
      tasks: [
        { key: 'enrol', label: 'New Enrolments', icon: '📝', count: 5, href: '/staff/dashboard/admin/enrolments' },
        { key: 'schedule', label: 'Schedule Changes', icon: '📅', count: 2, href: '/staff/dashboard/admin/schedule' },
        { key: 'tasks', label: 'My Tasks', icon: '✓', count: 8, href: '/staff/dashboard/admin/tasks' },
        { key: 'reports', label: 'Reports due this week', icon: '📊', count: 3, href: '/staff/dashboard/admin/reports' },
      ],
      pending: ['Process new student enrolments', 'Update venue bookings', 'Generate attendance report'],
    },
    marketing: {
      title: "Marketing Dashboard",
      icon: "📱",
      tasks: [
        { key: 'queue', label: 'Content Pending', icon: '📣', count: 7, href: '/staff/dashboard/marketing/content' },
        { key: 'approve', label: 'Posts to Approve', icon: '✏️', count: 3, href: '/staff/dashboard/marketing/approve' },
        { key: 'calendar', label: 'Scheduled Posts', icon: '📅', count: 12, href: '/staff/dashboard/marketing/calendar' },
        { key: 'analytics', label: 'This Month Engagement', icon: '📊', count: '2.4K', href: '/staff/dashboard/marketing/analytics' },
      ],
      pending: ['Approve 3 pending posts', 'Schedule next week content', 'Review analytics report'],
    },
    'student-support': {
      title: "Student Support Dashboard",
      icon: "🤝",
      tasks: [
        { key: 'students', label: 'Students Assigned', icon: '👥', count: 25, href: '/staff/dashboard/support/students' },
        { key: 'tickets', label: 'Open Tickets', icon: '🎟️', count: 4, href: '/staff/dashboard/support/tickets' },
        { key: 'progress', label: 'At Risk Students', icon: '📈', count: 6, href: '/staff/dashboard/support/progress' },
        { key: 'notes', label: 'Notes Updated', icon: '📋', count: 12, href: '/staff/dashboard/support/notes' },
      ],
      pending: ['Follow up on 4 students', 'Counseling session due', 'Update progress reports'],
    },
  };

  const config = roleConfigs[role];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-heading font-bold text-white text-2xl">{config.title}</h1>
        <p className="text-gray-400 text-sm mt-1">Welcome back! Here's your overview for today.</p>
      </div>

      {/* Task Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {config.tasks.map((task: any) => (
          <Link key={task.key} href={task.href} className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-mta-gold transition-colors group">
            <span className="text-2xl">{task.icon}</span>
            <p className="text-white font-semibold mt-2">{task.label}</p>
            <p className="text-mta-gold text-3xl font-bold mt-3">{task.count}</p>
            <p className="text-gray-600 text-xs group-hover:text-mta-gold transition-colors mt-2">View →</p>
          </Link>
        ))}
      </div>

      {/* Pending Tasks */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h2 className="font-heading font-semibold text-white text-base mb-4">Pending Tasks</h2>
        <ul className="space-y-3">
          {config.pending.map((task: string, i: number) => (
            <li key={i} className="flex items-start gap-3">
              <span className="text-mta-gold mt-1">✓</span>
              <span className="text-gray-300">{task}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Time Tracking */}
      <div className="mt-6 bg-gray-900 border border-gray-800 rounded-xl p-5">
        <h2 className="font-heading font-semibold text-white text-sm mb-3">Time Tracking</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Today's Hours</p>
            <p className="text-white text-2xl font-bold">7.5h</p>
          </div>
          <button className="bg-mta-gold text-mta-black px-4 py-2 rounded-lg font-semibold text-sm hover:bg-mta-light-gold transition-colors">
            Clock Out
          </button>
        </div>
      </div>
    </div>
  );
}
