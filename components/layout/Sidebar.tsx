'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

const NAV_GROUPS = [
  {
    group: 'Overview',
    items: [{ href: '/dashboard', label: 'Dashboard', icon: '🏠', exact: true }],
  },
  {
    group: 'Social Media',
    items: [
      { href: '/dashboard/social', label: 'Calendar', icon: '📅', exact: true },
      { href: '/dashboard/social/drafts', label: 'Drafts', icon: '✏️', exact: true },
      { href: '/dashboard/social/history', label: 'History', icon: '📋', exact: true },
    ],
  },
  {
    group: 'WhatsApp Bot',
    items: [
      { href: '/dashboard/bot', label: 'Leads', icon: '💬', exact: true },
      { href: '/dashboard/bot/keywords', label: 'Keywords', icon: '🔑', exact: true },
    ],
  },
  {
    group: 'Management',
    items: [
      { href: '/dashboard/students', label: 'Students', icon: '👥', exact: false },
      { href: '/dashboard/courses', label: 'Courses', icon: '📚', exact: false },
      { href: '/dashboard/brochures', label: 'Brochures', icon: '📄', exact: false },
    ],
  },
  {
    group: 'Analytics',
    items: [{ href: '/dashboard/reports', label: 'Reports', icon: '📊', exact: false }],
  },
  {
    group: 'System',
    items: [{ href: '/dashboard/staff', label: 'Staff', icon: '🔒', exact: false }],
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
      <div className="px-5 py-5 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-mta-gold rounded flex items-center justify-center font-heading font-bold text-mta-black text-sm">
            M
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
          <p className="text-gray-400 text-xs">Signed in as</p>
          <p className="text-white text-sm font-medium">Thandile · Admin</p>
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
