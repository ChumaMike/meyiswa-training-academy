'use client';

import { usePathname } from 'next/navigation';
import { Search, Bell } from 'lucide-react';

interface HeaderProps {
  userName?: string;
  role?: string;
}

const SEGMENT_LABELS: Record<string, string> = {
  dashboard: 'Dashboard',
  staff: 'Staff',
  social: 'Social Media',
  drafts: 'Drafts',
  history: 'History',
  bot: 'WhatsApp Bot',
  keywords: 'Keywords',
  students: 'Students',
  courses: 'Courses',
  brochures: 'Brochures',
  reports: 'Reports',
  lecturer: 'Lecturer',
  'admin-staff': 'Admin Staff',
  marketing: 'Marketing',
  support: 'Student Support',
  enrolments: 'Enrolments',
  schedule: 'Schedule',
  tasks: 'Tasks',
  materials: 'Materials',
  attendance: 'Attendance',
  content: 'Content Queue',
  approve: 'Approve',
  calendar: 'Calendar',
  analytics: 'Analytics',
  tickets: 'Tickets',
  progress: 'Progress',
  notes: 'Notes',
};

export default function Header({ userName = 'Thandile', role = 'Admin' }: HeaderProps) {
  const pathname = usePathname();

  // Build breadcrumbs from URL
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs = segments.map((seg) => SEGMENT_LABELS[seg] || seg.charAt(0).toUpperCase() + seg.slice(1));

  // Get initials for avatar
  const initials = userName
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-40 h-14 bg-gray-950/90 backdrop-blur-md border-b border-gray-800 flex items-center px-6 gap-4">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 flex-1 min-w-0">
        {breadcrumbs.map((crumb, i) => (
          <span key={i} className="flex items-center gap-1.5">
            {i > 0 && <span className="text-gray-700 text-xs">›</span>}
            <span
              className={`text-sm truncate ${
                i === breadcrumbs.length - 1
                  ? 'text-white font-medium'
                  : 'text-gray-500'
              }`}
            >
              {crumb}
            </span>
          </span>
        ))}
      </nav>

      {/* Search */}
      <div className="relative hidden sm:block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-600" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-gray-900 border border-gray-800 rounded-lg pl-9 pr-4 py-1.5 text-sm text-gray-400 placeholder-gray-700 focus:outline-none focus:border-mta-gold transition-colors w-48"
        />
      </div>

      {/* Notifications */}
      <button className="relative p-2 rounded-lg hover:bg-gray-800 transition-colors">
        <Bell className="w-4 h-4 text-gray-400" />
        <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-mta-gold rounded-full flex items-center justify-center">
          <span className="text-mta-black text-[8px] font-bold leading-none">3</span>
        </span>
      </button>

      {/* Avatar */}
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full bg-mta-gold flex items-center justify-center shrink-0">
          <span className="text-mta-black font-heading font-bold text-xs">{initials}</span>
        </div>
        <div className="hidden md:block">
          <p className="text-white text-xs font-medium leading-tight">{userName}</p>
          <p className="text-gray-500 text-xs leading-tight">{role}</p>
        </div>
      </div>
    </header>
  );
}
