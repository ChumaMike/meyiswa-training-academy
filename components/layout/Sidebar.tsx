'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Calendar,
  PenLine,
  Clock,
  MessageSquare,
  Hash,
  Users,
  BookOpen,
  FileText,
  BarChart2,
  Shield,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useState } from 'react';

const NAV_GROUPS = [
  {
    group: 'Overview',
    items: [{ href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, exact: true }],
  },
  {
    group: 'Social Media',
    items: [
      { href: '/dashboard/social', label: 'Calendar', icon: Calendar, exact: true },
      { href: '/dashboard/social/drafts', label: 'Drafts', icon: PenLine, exact: true },
      { href: '/dashboard/social/history', label: 'History', icon: Clock, exact: true },
    ],
  },
  {
    group: 'WhatsApp Bot',
    items: [
      { href: '/dashboard/bot', label: 'Leads', icon: MessageSquare, exact: true },
      { href: '/dashboard/bot/keywords', label: 'Keywords', icon: Hash, exact: true },
    ],
  },
  {
    group: 'Management',
    items: [
      { href: '/dashboard/students', label: 'Students', icon: Users, exact: false },
      { href: '/dashboard/courses', label: 'Courses', icon: BookOpen, exact: false },
      { href: '/dashboard/brochures', label: 'Brochures', icon: FileText, exact: false },
    ],
  },
  {
    group: 'Analytics',
    items: [{ href: '/dashboard/reports', label: 'Reports', icon: BarChart2, exact: false }],
  },
  {
    group: 'System',
    items: [{ href: '/dashboard/staff', label: 'Staff', icon: Shield, exact: false }],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (href: string, exact: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  const handleLogout = () => {
    document.cookie = 'mta_session=; path=/; max-age=0';
    router.push('/login');
  };

  return (
    <aside
      className={`min-h-screen flex flex-col shrink-0 border-r border-gray-800/60 transition-all duration-300 relative ${
        collapsed ? 'w-16' : 'w-60'
      }`}
      style={{
        background: 'linear-gradient(180deg, #0d0d1a 0%, #0a0a14 40%, #0d0d1a 100%)',
      }}
    >
      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-16 w-6 h-6 bg-gray-800 border border-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 hover:border-[#D4A017]/40 transition-all z-10 shadow-lg"
        title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed
          ? <ChevronRight className="w-3 h-3" />
          : <ChevronLeft className="w-3 h-3" />
        }
      </button>

      {/* Logo */}
      <div className={`border-b border-gray-800/60 ${collapsed ? 'px-3 py-4' : 'px-5 py-4'}`}>
        <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 ring-2 ring-[#D4A017]/30 hover:ring-[#D4A017]/60 transition-all">
            <Image src="/logo.png" width={36} height={36} alt="MTA Logo" className="w-full h-full object-cover" />
          </div>
          {!collapsed && (
            <div>
              <p className="font-heading font-bold text-white text-sm leading-tight">MTA Portal</p>
              <p className="text-gray-500 text-xs">Admin Dashboard</p>
            </div>
          )}
        </div>
      </div>

      {/* Nav */}
      <nav className={`flex-1 overflow-y-auto py-4 ${collapsed ? 'px-2' : 'px-3'}`}>
        {NAV_GROUPS.map((group) => (
          <div key={group.group} className={`${collapsed ? 'mb-3' : 'mb-5'}`}>
            {!collapsed && (
              <p className="text-gray-600 text-[10px] font-semibold uppercase tracking-widest px-3 mb-1.5">
                {group.group}
              </p>
            )}
            {collapsed && (
              <div className="h-px bg-gray-800/60 mb-2 mx-1" />
            )}
            {group.items.map((item) => {
              const active = isActive(item.href, item.exact);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={collapsed ? item.label : undefined}
                  className={`flex items-center gap-2.5 rounded-lg text-sm font-medium transition-all duration-200 mb-0.5 group relative
                    ${collapsed ? 'px-0 py-2.5 justify-center' : 'px-3 py-2'}
                    ${active
                      ? 'text-[#D4A017]'
                      : 'text-gray-400 hover:text-white'
                    }
                  `}
                  style={active ? {
                    background: 'linear-gradient(90deg, rgba(212,160,23,0.15) 0%, rgba(212,160,23,0.04) 100%)',
                    borderLeft: collapsed ? 'none' : '2px solid #D4A017',
                    paddingLeft: collapsed ? undefined : '10px',
                    boxShadow: 'inset 0 0 20px rgba(212,160,23,0.03)',
                  } : {}}
                >
                  {/* Active left indicator for collapsed mode */}
                  {active && collapsed && (
                    <span
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 rounded-r"
                      style={{ background: '#D4A017' }}
                    />
                  )}

                  <Icon
                    className={`w-4 h-4 shrink-0 transition-colors ${
                      active ? 'text-[#D4A017]' : 'text-gray-500 group-hover:text-gray-300'
                    }`}
                    style={active ? { filter: 'drop-shadow(0 0 4px rgba(212,160,23,0.5))' } : {}}
                  />
                  {!collapsed && (
                    <span className="truncate">{item.label}</span>
                  )}

                  {/* Hover tooltip for collapsed */}
                  {collapsed && (
                    <span className="absolute left-full ml-3 px-2 py-1 bg-gray-800 border border-gray-700 text-white text-xs rounded-lg whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 shadow-xl">
                      {item.label}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* User profile footer */}
      <div className={`border-t border-gray-800/60 ${collapsed ? 'px-2 py-3' : 'px-3 py-4'}`}>
        {!collapsed && (
          <div
            className="mb-2 px-3 py-2.5 rounded-xl"
            style={{
              background: 'linear-gradient(135deg, rgba(212,160,23,0.08) 0%, rgba(212,160,23,0.03) 100%)',
              border: '1px solid rgba(212,160,23,0.12)',
            }}
          >
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 ring-1 ring-[#D4A017]/40"
                style={{ background: 'linear-gradient(135deg, #D4A017 0%, #A07C10 100%)' }}
              >
                <span className="text-gray-950 font-bold text-xs">T</span>
              </div>
              <div>
                <p className="text-white text-xs font-semibold leading-tight">Thandile</p>
                <p className="text-[#D4A017]/70 text-[10px] leading-tight">Administrator</p>
              </div>
              <div className="ml-auto">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                </span>
              </div>
            </div>
          </div>
        )}

        {collapsed && (
          <div className="flex justify-center mb-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 ring-1 ring-[#D4A017]/40"
              style={{ background: 'linear-gradient(135deg, #D4A017 0%, #A07C10 100%)' }}
            >
              <span className="text-gray-950 font-bold text-xs">T</span>
            </div>
          </div>
        )}

        <button
          onClick={handleLogout}
          title={collapsed ? 'Sign out' : undefined}
          className={`w-full flex items-center gap-2 rounded-lg text-sm text-gray-500 hover:text-red-400 hover:bg-gray-800/60 transition-all duration-200 group
            ${collapsed ? 'justify-center px-2 py-2' : 'px-3 py-2'}
          `}
        >
          <LogOut className="w-4 h-4 group-hover:text-red-400 transition-colors shrink-0" />
          {!collapsed && 'Sign out'}
        </button>

        {!collapsed && (
          <p className="text-center text-gray-800 text-[10px] mt-3">v1.0 · Phase 1</p>
        )}
      </div>
    </aside>
  );
}
