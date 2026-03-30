'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const NAV_GROUPS: Record<string, Array<{ href: string; label: string; icon: string; exact: boolean }>> = {
  lecturer: [
    { href: '/staff/dashboard', label: 'Dashboard', icon: '🏠', exact: true },
    { href: '/staff/dashboard/lecturer/courses', label: 'My Courses', icon: '📚', exact: false },
    { href: '/staff/dashboard/lecturer/students', label: 'Students', icon: '👥', exact: false },
    { href: '/staff/dashboard/lecturer/materials', label: 'Materials', icon: '📄', exact: false },
    { href: '/staff/dashboard/lecturer/attendance', label: 'Attendance', icon: '✓', exact: false },
  ],
  'admin-staff': [
    { href: '/staff/dashboard', label: 'Dashboard', icon: '🏠', exact: true },
    { href: '/staff/dashboard/admin/enrolments', label: 'Enrolments', icon: '📝', exact: false },
    { href: '/staff/dashboard/admin/schedule', label: 'Schedule', icon: '📅', exact: false },
    { href: '/staff/dashboard/admin/tasks', label: 'Tasks', icon: '✓', exact: false },
    { href: '/staff/dashboard/admin/reports', label: 'Reports', icon: '📊', exact: false },
  ],
  marketing: [
    { href: '/staff/dashboard', label: 'Dashboard', icon: '🏠', exact: true },
    { href: '/staff/dashboard/marketing/content', label: 'Content Queue', icon: '📣', exact: false },
    { href: '/staff/dashboard/marketing/approve', label: 'Approve', icon: '✏️', exact: false },
    { href: '/staff/dashboard/marketing/calendar', label: 'Calendar', icon: '📅', exact: false },
    { href: '/staff/dashboard/marketing/analytics', label: 'Analytics', icon: '📊', exact: false },
  ],
  'student-support': [
    { href: '/staff/dashboard', label: 'Dashboard', icon: '🏠', exact: true },
    { href: '/staff/dashboard/support/students', label: 'Students', icon: '👥', exact: false },
    { href: '/staff/dashboard/support/tickets', label: 'Tickets', icon: '🎟️', exact: false },
    { href: '/staff/dashboard/support/progress', label: 'Progress', icon: '📈', exact: false },
    { href: '/staff/dashboard/support/notes', label: 'Notes', icon: '📋', exact: false },
  ],
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

  return (
    <aside className="w-60 min-h-screen bg-gray-900 border-r border-gray-800 flex flex-col">
      <div className="px-5 py-5 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-mta-gold rounded flex items-center justify-center font-heading font-bold text-mta-black text-sm">M</div>
          <div>
            <p className="font-heading font-bold text-white text-sm">MTA Staff</p>
            <p className="text-gray-500 text-xs capitalize">{role.replace('-', ' ')}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3">
        {items.map((item) => {
          const active = isActive(item.href, item.exact);
          return (
            <Link key={item.href} href={item.href} className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors mb-0.5 ${active ? 'bg-mta-gold text-mta-black' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}>
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-gray-800">
        <div className="px-3 py-2 mb-2">
          <p className="text-gray-400 text-xs">Logged as</p>
          <p className="text-white text-sm font-medium capitalize">{role.replace('-', ' ')}</p>
        </div>
        <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-red-400 hover:bg-gray-800 transition-colors">
          <span>↩</span> Sign out
        </button>
      </div>
    </aside>
  );
}
