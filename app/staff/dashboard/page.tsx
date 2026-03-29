import { cookies } from 'next/headers';
import Link from 'next/link';

type StaffRole = 'lecturer' | 'admin' | 'marketing' | 'support';

const ROLE_ICONS: Record<StaffRole, string> = {
  lecturer: '👨‍🏫',
  admin: '📋',
  marketing: '📱',
  support: '💬',
};

const ROLE_NAMES: Record<StaffRole, string> = {
  lecturer: 'Lecturer',
  admin: 'Admin Staff',
  marketing: 'Marketing',
  support: 'Student Support',
};

async function getRoleContent(role: StaffRole) {
  const content: Record<StaffRole, { title: string; description: string; tasks: Array<{ icon: string; label: string; count: number; href: string }> }> = {
    lecturer: {
      title: 'Welcome back! 👨‍🏫',
      description: 'Manage your courses, students, and teaching materials.',
      tasks: [
        { icon: '📚', label: 'Courses Assigned', count: 3, href: '/staff/courses' },
        { icon: '👥', label: 'Students Enrolled', count: 47, href: '/staff/students' },
        { icon: '📤', label: 'Materials to Upload', count: 2, href: '/staff/materials' },
        { icon: '⏱️', label: 'Time Logged Today', count: 6, href: '/staff/time-tracking' },
      ],
    },
    admin: {
      title: 'Administration Dashboard 📋',
      description: 'Handle enrolments, schedules, and office tasks.',
      tasks: [
        { icon: '📝', label: 'Pending Enrolments', count: 8, href: '/staff/enrolments' },
        { icon: '📅', label: 'Classes This Week', count: 12, href: '/staff/schedules' },
        { icon: '✓', label: 'Tasks Assigned', count: 5, href: '/staff/tasks' },
        { icon: '⏱️', label: 'Time Logged Today', count: 7, href: '/staff/time-tracking' },
      ],
    },
    marketing: {
      title: 'Content Management 📱',
      description: 'Approve posts, manage campaigns, and track social media.',
      tasks: [
        { icon: '⏳', label: 'Posts Awaiting Approval', count: 3, href: '/staff/content' },
        { icon: '📢', label: 'Active Campaigns', count: 2, href: '/staff/campaigns' },
        { icon: '✅', label: 'Posts Approved This Week', count: 12, href: '/staff/content' },
        { icon: '⏱️', label: 'Time Logged Today', count: 5, href: '/staff/time-tracking' },
      ],
    },
    support: {
      title: 'Student Support 💬',
      description: 'Manage support tickets and track student progress.',
      tasks: [
        { icon: '🎫', label: 'Open Support Tickets', count: 6, href: '/staff/tickets' },
        { icon: '👥', label: 'Students You Support', count: 34, href: '/staff/students' },
        { icon: '📊', label: 'Progress Check-ins Due', count: 4, href: '/staff/progress' },
        { icon: '⏱️', label: 'Time Logged Today', count: 6, href: '/staff/time-tracking' },
      ],
    },
  };
  return content[role];
}

export default async function StaffDashboard() {
  const cookieStore = await cookies();
  const roleHeader = cookieStore.get('mta_staff_role');
  const role = (roleHeader?.value as StaffRole) || 'lecturer';

  const content = await getRoleContent(role);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading font-bold text-white text-2xl">{content.title}</h1>
        <p className="text-gray-400 text-sm mt-1">{content.description}</p>
      </div>

      {/* Task Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {content.tasks.map((task) => (
          <Link
            key={task.label}
            href={task.href}
            className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-mta-gold transition-colors group"
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-2xl">{task.icon}</span>
              <span className="text-gray-600 text-xs group-hover:text-mta-gold transition-colors">Go →</span>
            </div>
            <p className="font-heading font-bold text-white text-3xl">{task.count}</p>
            <p className="text-gray-400 text-sm mt-0.5">{task.label}</p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <h2 className="font-heading font-semibold text-white text-base mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          {role === 'lecturer' && (
            <>
              <Link href="/staff/courses" className="px-4 py-2 bg-mta-gold text-mta-black text-sm font-semibold rounded-lg hover:bg-mta-light-gold transition-colors">
                View My Courses
              </Link>
              <Link href="/staff/materials" className="px-4 py-2 bg-gray-800 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors border border-gray-700">
                Upload Materials
              </Link>
            </>
          )}
          {role === 'admin' && (
            <>
              <Link href="/staff/enrolments" className="px-4 py-2 bg-mta-gold text-mta-black text-sm font-semibold rounded-lg hover:bg-mta-light-gold transition-colors">
                Review Enrolments
              </Link>
              <Link href="/staff/tasks" className="px-4 py-2 bg-gray-800 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors border border-gray-700">
                View Tasks
              </Link>
            </>
          )}
          {role === 'marketing' && (
            <>
              <Link href="/staff/content" className="px-4 py-2 bg-mta-gold text-mta-black text-sm font-semibold rounded-lg hover:bg-mta-light-gold transition-colors">
                Approve Content
              </Link>
              <Link href="/staff/campaigns" className="px-4 py-2 bg-gray-800 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors border border-gray-700">
                View Campaigns
              </Link>
            </>
          )}
          {role === 'support' && (
            <>
              <Link href="/staff/tickets" className="px-4 py-2 bg-mta-gold text-mta-black text-sm font-semibold rounded-lg hover:bg-mta-light-gold transition-colors">
                Open Tickets
              </Link>
              <Link href="/staff/progress" className="px-4 py-2 bg-gray-800 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors border border-gray-700">
                Student Progress
              </Link>
            </>
          )}
          <Link href="/staff/time-tracking" className="px-4 py-2 bg-gray-800 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors border border-gray-700">
            Time Tracking
          </Link>
        </div>
      </div>
    </div>
  );
}
