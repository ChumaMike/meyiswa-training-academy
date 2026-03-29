'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type StaffRole = 'lecturer' | 'admin' | 'marketing' | 'support';

const ROLE_NAMES: Record<StaffRole, string> = {
  lecturer: 'Lecturer',
  admin: 'Admin Staff',
  marketing: 'Marketing',
  support: 'Student Support',
};

const ROLE_ICONS: Record<StaffRole, string> = {
  lecturer: '👨‍🏫',
  admin: '📋',
  marketing: '📱',
  support: '💬',
};

const NAV_GROUPS: Record<StaffRole, Array<{ group: string; items: Array<{ href: string; label: string; icon: string; exact: boolean }> }>> = {
  lecturer: [
    {
      group: 'Work',
      items: [
        { href: '/staff/dashboard', label: 'Dashboard', icon: '🏠', exact: true },
        { href: '/staff/courses', label: 'My Courses', icon: '📚', exact: true },
        { href: '/staff/students', label: 'My Students', icon: '👥', exact: true },
        { href: '/staff/materials', label: 'Materials Upload', icon: '📤', exact: true },
      ],
    },
    {
      group: 'Account',
      items: [
        { href: '/staff/time-tracking', label: 'Time Tracking', icon: '⏱️', exact: false },
        { href: '/staff/profile', label: 'Profile', icon: '⚙️', exact: false },
      ],
    },
  ],
  admin: [
    {
      group: 'Work',
      items: [
        { href: '/staff/dashboard', label: 'Dashboard', icon: '🏠', exact: true },
        { href: '/staff/enrolments', label: 'Enrolments', icon: '📝', exact: true },
        { href: '/staff/schedules', label: 'Schedules', icon: '📅', exact: true },
        { href: '/staff/tasks', label: 'Tasks', icon: '✓', exact: true },
      ],
    },
    {
      group: 'Account',
      items: [
        { href: '/staff/time-tracking', label: 'Time Tracking', icon: '⏱️', exact: false },
        { href: '/staff/profile', label: 'Profile', icon: '⚙️', exact: false },
      ],
    },
  ],
  marketing: [
    {
      group: 'Work',
      items: [
        { href: '/staff/dashboard', label: 'Dashboard', icon: '🏠', exact: true },
        { href: '/staff/content', label: 'Content Approval', icon: '✅', exact: true },
        { href: '/staff/campaigns', label: 'Campaigns', icon: '📢', exact: true },
      ],
    },
    {
      group: 'Account',
      items: [
        { href: '/staff/time-tracking', label: 'Time Tracking', icon: '⏱️', exact: false },
        { href: '/staff/profile', label: 'Profile', icon: '⚙️', exact: false },
      ],
    },
  ],
  support: [
    {
      group: 'Work',
      items: [
        { href: '/staff/dashboard', label: 'Dashboard', icon: '🏠', exact: true },
        { href: '/staff/tickets', label: 'Support Tickets', icon: '🎫', exact: true },
        { href: '/staff/students', label: 'Student Profiles', icon: '👥', exact: true },
        { href: '/staff/progress', label: 'Student Progress', icon: '📊', exact: true },
      ],
    },
    {
      group: 'Account',
      items: [
        { href: '/staff/time-tracking', label: 'Time Tracking', icon: '⏱️', exact: false },
        { href: '/staff/profile', label: 'Profile', icon: '⚙️', exact: false },
      ],
    },
  ],
};

export default function StaffSidebar({ role }: { role: StaffRole }) {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href: string, exact: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  const handleLogout = () => {
    document.cookie = 'mta_staff_session=; path=/staff; max-age=0';
    document.cookie = 'mta_staff_role=; path=/staff; max-age=0';
    router.push('/staff/login');
  };

  const navGroups = NAV_GROUPS[role] || [];

  return (
    <aside className="w-60 min-h-screen bg-gray-900 border-r border-gray-800 flex flex-col shrink-0">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-mta-gold rounded flex items-center justify-center font-heading font-bold text-mta-black text-sm">
            M
          </div>
          <div>
            <p className="font-heading font-bold text-white text-sm leading-tight">MTA Staff</p>
            <p className="text-gray-500 text-xs">{ROLE_NAMES[role]}</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        {navGroups.map((group) => (
          <div key={group.group} className="mb-5">
            <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider px-2 mb-1">
              {group.group}
            </p>
            {group.items.map((item) => {
              const active = isActive(item.href, item.exact);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors mb-0.5 ${
                    active
                      ? 'bg-mta-gold text-mta-black'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <span className="text-base leading-none">{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-gray-800">
        <div className="px-3 py-2 mb-2">
          <p className="text-gray-400 text-xs">Role</p>
          <p className="text-white text-sm font-medium">{ROLE_ICONS[role]} {ROLE_NAMES[role]}</p>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-red-400 hover:bg-gray-800 transition-colors"
        >
          <span>↩</span> Sign out
        </button>
      </div>
    </aside>
  );
}
