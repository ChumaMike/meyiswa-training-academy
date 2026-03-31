'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  LayoutDashboard,
  BookOpen,
  Users,
  FolderOpen,
  CheckSquare,
  ClipboardList,
  CalendarDays,
  CheckCircle,
  Rss,
  CheckCircle2,
  LineChart,
  Ticket,
  TrendingUp,
  StickyNote,
  LogOut,
} from 'lucide-react';

type NavItem = { href: string; label: string; icon: React.ElementType; exact: boolean };

const NAV_GROUPS: Record<string, NavItem[]> = {
  lecturer: [
    { href: '/staff/dashboard', label: 'Dashboard', icon: LayoutDashboard, exact: true },
    { href: '/staff/dashboard/lecturer/courses', label: 'My Courses', icon: BookOpen, exact: false },
    { href: '/staff/dashboard/lecturer/students', label: 'Students', icon: Users, exact: false },
    { href: '/staff/dashboard/lecturer/materials', label: 'Materials', icon: FolderOpen, exact: false },
    { href: '/staff/dashboard/lecturer/attendance', label: 'Attendance', icon: CheckSquare, exact: false },
  ],
  'admin-staff': [
    { href: '/staff/dashboard', label: 'Dashboard', icon: LayoutDashboard, exact: true },
    { href: '/staff/dashboard/admin/enrolments', label: 'Enrolments', icon: ClipboardList, exact: false },
    { href: '/staff/dashboard/admin/schedule', label: 'Schedule', icon: CalendarDays, exact: false },
    { href: '/staff/dashboard/admin/tasks', label: 'Tasks', icon: CheckCircle, exact: false },
    { href: '/staff/dashboard/admin/reports', label: 'Reports', icon: LineChart, exact: false },
  ],
  marketing: [
    { href: '/staff/dashboard', label: 'Dashboard', icon: LayoutDashboard, exact: true },
    { href: '/staff/dashboard/marketing/content', label: 'Content Queue', icon: Rss, exact: false },
    { href: '/staff/dashboard/marketing/approve', label: 'Approve', icon: CheckCircle2, exact: false },
    { href: '/staff/dashboard/marketing/calendar', label: 'Calendar', icon: CalendarDays, exact: false },
    { href: '/staff/dashboard/marketing/analytics', label: 'Analytics', icon: LineChart, exact: false },
  ],
  'student-support': [
    { href: '/staff/dashboard', label: 'Dashboard', icon: LayoutDashboard, exact: true },
    { href: '/staff/dashboard/support/students', label: 'Students', icon: Users, exact: false },
    { href: '/staff/dashboard/support/tickets', label: 'Tickets', icon: Ticket, exact: false },
    { href: '/staff/dashboard/support/progress', label: 'Progress', icon: TrendingUp, exact: false },
    { href: '/staff/dashboard/support/notes', label: 'Notes', icon: StickyNote, exact: false },
  ],
};

const ROLE_META: Record<string, { label: string; accent: string; border: string }> = {
  lecturer: { label: 'Lecturer / Trainer', accent: 'text-purple-400', border: 'border-purple-500' },
  'admin-staff': { label: 'Admin Staff', accent: 'text-blue-400', border: 'border-blue-500' },
  marketing: { label: 'Marketing / Social', accent: 'text-pink-400', border: 'border-pink-500' },
  'student-support': { label: 'Student Support', accent: 'text-green-400', border: 'border-green-500' },
};

export default function StaffSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const roleCookie = document.cookie.split('; ').find(row => row.startsWith('staff_role='))?.split('=')[1];
    setRole(roleCookie || 'lecturer');
  }, []);

  const isActive = (href: string, exact: boolean) => exact ? pathname === href : pathname.startsWith(href);

  const handleLogout = () => {
    document.cookie = 'mta_staff_session=; path=/; max-age=0';
    document.cookie = 'staff_role=; path=/; max-age=0';
    router.push('/staff/login');
  };

  if (!role) return null;

  const items = NAV_GROUPS[role] || NAV_GROUPS.lecturer;
  const meta = ROLE_META[role] || ROLE_META.lecturer;

  return (
    <aside className="w-60 min-h-screen bg-gray-900 border-r border-gray-800 flex flex-col shrink-0">
      {/* Logo with role-color top border accent */}
      <div className={`px-5 py-4 border-b border-gray-800 border-t-4 ${meta.border}`}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 ring-2 ring-mta-gold/30">
            <Image src="/logo.png" width={36} height={36} alt="MTA Logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="font-heading font-bold text-white text-sm leading-tight">MTA Staff</p>
            <p className={`text-xs leading-tight ${meta.accent}`}>{meta.label}</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        {items.map((item) => {
          const active = isActive(item.href, item.exact);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all mb-0.5 ${
                active
                  ? 'bg-mta-gold/10 text-mta-gold border-l-2 border-mta-gold pl-2.5'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-mta-gold' : 'text-gray-500'}`} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-gray-800">
        <div className="px-3 py-2 mb-2">
          <p className="text-gray-500 text-[10px]">Logged in as</p>
          <p className={`text-sm font-medium ${meta.accent}`}>{meta.label}</p>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-500 hover:text-red-400 hover:bg-gray-800/60 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
        <p className="text-center text-gray-800 text-[10px] mt-3">v1.0 · Phase 1</p>
      </div>
    </aside>
  );
}
