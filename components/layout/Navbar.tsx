'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { href: '/courses', label: 'Courses' },
  { href: '/brochures', label: 'Brochures' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-mta-black sticky top-0 z-50 border-b border-mta-gold/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-mta-gold rounded flex items-center justify-center">
              <span className="text-mta-black font-heading font-bold text-sm leading-none">MTA</span>
            </div>
            <div className="hidden sm:block">
              <p className="text-white font-heading font-bold text-sm leading-tight">Meyiswa Training Academy</p>
              <p className="text-mta-gold text-xs leading-tight">&ldquo;It&apos;s All Possible!&rdquo;</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                  pathname.startsWith(link.href)
                    ? 'text-mta-gold bg-white/5'
                    : 'text-gray-300 hover:text-mta-gold hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/enrol" className="ml-3 btn-primary">
              Enrol Now
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span className={`block h-0.5 bg-current transition-all ${open ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 bg-current transition-all ${open ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 bg-current transition-all ${open ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-mta-black border-t border-mta-gold/20 px-4 py-4 flex flex-col gap-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`px-4 py-3 rounded text-sm font-medium ${
                pathname.startsWith(link.href)
                  ? 'text-mta-gold bg-white/5'
                  : 'text-gray-300 hover:text-mta-gold'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/enrol" onClick={() => setOpen(false)} className="btn-primary mt-2 w-full text-center">
            Enrol Now
          </Link>
        </div>
      )}
    </header>
  );
}
