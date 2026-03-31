'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Shield, BookOpen, Award, Users } from 'lucide-react';

const ROLES = [
  {
    id: 'admin',
    icon: '👑',
    label: 'MTA Administrator',
    desc: 'Full system access — Thandile',
    cookie: 'mta_session=1',
    dest: '/dashboard',
    border: 'border-mta-gold',
    bg: 'bg-mta-gold/10',
    check: 'text-mta-gold',
  },
  {
    id: 'admin-staff',
    icon: '👩‍💼',
    label: 'Admin Staff',
    desc: 'Enrolments, schedules & tasks',
    cookie: 'mta_staff_session=admin-staff; staff_role=admin-staff',
    dest: '/staff/dashboard',
    border: 'border-blue-500',
    bg: 'bg-blue-900/20',
    check: 'text-blue-400',
  },
  {
    id: 'lecturer',
    icon: '👨‍🏫',
    label: 'Lecturer / Trainer',
    desc: 'Courses, students & materials',
    cookie: 'mta_staff_session=lecturer; staff_role=lecturer',
    dest: '/staff/dashboard',
    border: 'border-purple-500',
    bg: 'bg-purple-900/20',
    check: 'text-purple-400',
  },
  {
    id: 'marketing',
    icon: '📱',
    label: 'Marketing / Social',
    desc: 'Content approval & campaigns',
    cookie: 'mta_staff_session=marketing; staff_role=marketing',
    dest: '/staff/dashboard',
    border: 'border-pink-500',
    bg: 'bg-pink-900/20',
    check: 'text-pink-400',
  },
  {
    id: 'student-support',
    icon: '🤝',
    label: 'Student Support',
    desc: 'Student profiles & tickets',
    cookie: 'mta_staff_session=student-support; staff_role=student-support',
    dest: '/staff/dashboard',
    border: 'border-green-500',
    bg: 'bg-green-900/20',
    check: 'text-green-400',
  },
];

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) { setError('Please select your role.'); return; }
    if (!email || !password) { setError('Please enter your email and password.'); return; }
    const role = ROLES.find(r => r.id === selectedRole)!;
    role.cookie.split(';').forEach(c => {
      document.cookie = `${c.trim()}; path=/; max-age=86400`;
    });
    window.location.href = role.dest;
  };

  return (
    <div className="min-h-screen flex bg-gray-950">
      {/* ── LEFT BRAND PANEL (desktop only) ── */}
      <div className="hidden lg:flex w-[45%] bg-mta-black flex-col justify-between p-12 relative overflow-hidden bg-grid-pattern">
        {/* Decorative gold blobs */}
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-mta-gold/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-mta-gold/8 rounded-full blur-3xl pointer-events-none" />

        {/* Top: Logo + name */}
        <div className="relative z-10">
          <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-mta-gold/30 shadow-lg shadow-mta-gold/10 mb-6">
            <Image src="/logo.png" width={96} height={96} alt="MTA Logo" className="w-full h-full object-cover" />
          </div>
          <h1 className="font-heading font-bold text-white text-3xl leading-tight mb-2">
            Meyiswa Training<br />Academy
          </h1>
          <p className="gold-shimmer font-heading font-bold text-2xl mb-4">It&apos;s All Possible!</p>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            Empowering South Africa through accredited skills development and quality education.
          </p>
        </div>

        {/* Middle: Stats */}
        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/[0.08]">
            <div className="w-8 h-8 rounded-lg bg-mta-gold/20 flex items-center justify-center shrink-0">
              <BookOpen className="w-4 h-4 text-mta-gold" />
            </div>
            <div>
              <p className="text-white text-sm font-semibold">60+ Courses</p>
              <p className="text-gray-500 text-xs">Across 5 faculties</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/[0.08]">
            <div className="w-8 h-8 rounded-lg bg-mta-gold/20 flex items-center justify-center shrink-0">
              <Award className="w-4 h-4 text-mta-gold" />
            </div>
            <div>
              <p className="text-white text-sm font-semibold">SETA Accredited</p>
              <p className="text-gray-500 text-xs">B-BBEE Level 1 EME</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/[0.08]">
            <div className="w-8 h-8 rounded-lg bg-mta-gold/20 flex items-center justify-center shrink-0">
              <Users className="w-4 h-4 text-mta-gold" />
            </div>
            <div>
              <p className="text-white text-sm font-semibold">Nationwide</p>
              <p className="text-gray-500 text-xs">South Africa wide delivery</p>
            </div>
          </div>
        </div>

        {/* Bottom: Contact */}
        <div className="relative z-10 border-t border-white/10 pt-6">
          <p className="text-gray-600 text-xs mb-1">meyiswa.co.za · admin@meyiswa.co.za</p>
          <p className="text-gray-600 text-xs">010 634 2503 · WhatsApp: 072 513 3869</p>
        </div>
      </div>

      {/* ── RIGHT FORM PANEL ── */}
      <div className="flex-1 flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-md animate-slide-up">
          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-7 lg:hidden">
            <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-mta-gold/40">
              <Image src="/logo.png" width={40} height={40} alt="MTA Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="font-heading font-bold text-white text-sm">Meyiswa Training Academy</p>
              <p className="text-gray-500 text-xs">Admin Portal</p>
            </div>
          </div>

          {/* Heading */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-1">
              <Shield className="w-4 h-4 text-mta-gold" />
              <span className="text-mta-gold text-xs font-semibold uppercase tracking-widest">Secure Portal</span>
            </div>
            <h2 className="font-heading font-bold text-white text-2xl">Sign in to MTA</h2>
            <p className="text-gray-500 text-sm mt-1">Select your role to access the right dashboard</p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-7">
            {/* Role cards */}
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3">Your Role</p>
            <div className="space-y-2 mb-6">
              {ROLES.map(role => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setSelectedRole(role.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left ${
                    selectedRole === role.id
                      ? `${role.border} ${role.bg}`
                      : 'border-gray-800 bg-gray-800/50 hover:border-gray-700'
                  }`}
                >
                  <span className="text-xl">{role.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-semibold">{role.label}</p>
                    <p className="text-gray-500 text-xs truncate">{role.desc}</p>
                  </div>
                  {selectedRole === role.id && (
                    <span className={`text-sm font-bold ${role.check}`}>✓</span>
                  )}
                </button>
              ))}
            </div>

            {/* Credentials */}
            <form onSubmit={handleLogin} className="space-y-3">
              <div>
                <label className="block text-gray-400 text-xs font-medium mb-1.5">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@mta.co.za"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-mta-gold transition-colors"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-xs font-medium mb-1.5">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-mta-gold transition-colors"
                />
              </div>
              {error && (
                <p className="text-red-400 text-xs bg-red-950/40 border border-red-900/50 rounded-lg px-3 py-2">{error}</p>
              )}
              <button
                type="submit"
                className="w-full bg-mta-gold text-mta-black font-semibold py-2.5 rounded-lg text-sm hover:bg-mta-light-gold transition-colors mt-1"
              >
                Sign in to Portal
              </button>
            </form>

            <p className="text-gray-700 text-xs text-center mt-5">Demo system — any credentials accepted</p>
          </div>
        </div>
      </div>
    </div>
  );
}
