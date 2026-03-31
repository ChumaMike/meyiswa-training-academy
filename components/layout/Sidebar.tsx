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
} from 'lucide-react';

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

  const isActive = (href: string, exact: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  const handleLogout = () => {
    document.cookie = 'mta_session=; path=/; max-age=0';
    router.push('/login');
  };

  return (
    <aside className="w-60 min-h-screen bg-gray-900 border-r border-gray-800 flex flex-col shrink-0">
      {/* Logo */}
      <div className="px-5 py-4 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 ring-2 ring-mta-gold/30">
            <Image src="/logo.png" width={36} height={36} alt="MTA Logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="font-heading font-bold text-white text-sm leading-tight">MTA Portal</p>
            <p className="text-gray-500 text-xs">Admin Dashboard</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        {NAV_GROUPS.map((group) => (
          <div key={group.group} className="mb-5">
            <p className="text-gray-600 text-[10px] font-semibold uppercase tracking-widest px-3 mb-1.5">
              {group.group}
            </p>
            {group.items.map((item) => {
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
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-gray-800">
        <div className="px-3 py-2 mb-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-mta-gold flex items-center justify-center shrink-0">
              <span className="text-mta-black font-bold text-[10px]">T</span>
            </div>
            <div>
              <p className="text-white text-xs font-medium leading-tight">Thandile</p>
              <p className="text-gray-500 text-[10px] leading-tight">Administrator</p>
            </div>
          </div>
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
