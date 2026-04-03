'use client';

import { usePathname } from 'next/navigation';
import { Search, Bell, ChevronRight } from 'lucide-react';

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

const NOTIFICATION_COUNT = 3;

export default function Header({ userName = 'Thandile', role = 'Admin' }: HeaderProps) {
  const pathname = usePathname();

  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs = segments.map((seg) => SEGMENT_LABELS[seg] || seg.charAt(0).toUpperCase() + seg.slice(1));

  const initials = userName
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <header
      className="sticky top-0 z-40 h-14 flex items-center px-6 gap-4 border-b border-gray-800/80"
      style={{
        background: 'linear-gradient(to right, rgba(9,9,18,0.97) 0%, rgba(17,17,34,0.97) 50%, rgba(9,9,18,0.97) 100%)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
    >
      {/* Live indicator */}
      <div className="flex items-center gap-1.5 shrink-0">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
        </span>
        <span className="text-green-400 text-[10px] font-semibold uppercase tracking-widest hidden sm:block">
          Live
        </span>
      </div>

      {/* Divider */}
      <div className="w-px h-5 bg-gray-800 hidden sm:block" />

      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1 flex-1 min-w-0">
        {breadcrumbs.map((crumb, i) => (
          <span key={i} className="flex items-center gap-1">
            {i > 0 && (
              <ChevronRight className="w-3 h-3 text-gray-700 shrink-0" />
            )}
            <span
              className={`text-sm truncate transition-colors ${
                i === breadcrumbs.length - 1
                  ? 'text-white font-semibold'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {i === breadcrumbs.length - 1 && i > 0 && (
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full bg-[#D4A017] mr-1.5 mb-0.5"
                  aria-hidden
                />
              )}
              {crumb}
            </span>
          </span>
        ))}
      </nav>

      {/* Search bar */}
      <div className="relative hidden sm:block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-600 pointer-events-none" />
        <input
          type="text"
          placeholder="Search..."
          className="search-gold-focus bg-gray-900/80 border border-gray-800 rounded-lg pl-9 pr-4 py-1.5 text-sm text-gray-300 placeholder-gray-700 transition-all duration-200 w-44 focus:w-56"
          style={{ outline: 'none' }}
        />
      </div>

      {/* Notifications bell */}
      <button className="relative p-2 rounded-lg hover:bg-gray-800/80 transition-colors group">
        <Bell
          className={`w-4 h-4 transition-colors ${
            NOTIFICATION_COUNT > 0 ? 'text-gray-300 group-hover:text-white' : 'text-gray-500'
          }`}
        />
        {NOTIFICATION_COUNT > 0 && (
          <>
            {/* Pulsing ring behind badge */}
            <span
              className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-[#D4A017]/30 animate-ping"
              style={{ animationDuration: '2s' }}
            />
            <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-[#D4A017] rounded-full flex items-center justify-center z-10">
              <span className="text-gray-950 text-[8px] font-bold leading-none">{NOTIFICATION_COUNT}</span>
            </span>
          </>
        )}
      </button>

      {/* User avatar + name */}
      <div className="flex items-center gap-2.5 pl-1">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 ring-2 ring-[#D4A017]/40 hover:ring-[#D4A017]/70 transition-all cursor-pointer"
          style={{ background: 'linear-gradient(135deg, #D4A017 0%, #A07C10 100%)' }}
        >
          <span className="text-gray-950 font-heading font-bold text-xs">{initials}</span>
        </div>
        <div className="hidden md:block">
          <p className="text-white text-xs font-semibold leading-tight">{userName}</p>
          <p className="text-gray-500 text-[10px] leading-tight">{role}</p>
        </div>
      </div>
    </header>
  );
}
