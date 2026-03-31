'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Lock, BookOpen, Award, Users } from 'lucide-react';

const ROLES = [
  {
    id: 'lecturer',
    icon: '👨‍🏫',
    label: 'Lecturer / Trainer',
    desc: 'Manage courses & student progress',
    border: 'border-purple-500',
    bg: 'bg-purple-900/20',
    check: 'text-purple-400',
  },
  {
    id: 'admin-staff',
    icon: '👩‍💼',
    label: 'Admin Staff',
    desc: 'Enrolment & scheduling',
    border: 'border-blue-500',
    bg: 'bg-blue-900/20',
    check: 'text-blue-400',
  },
  {
    id: 'marketing',
    icon: '📱',
    label: 'Marketing / Social',
    desc: 'Content approval & posts',
    border: 'border-pink-500',
    bg: 'bg-pink-900/20',
    check: 'text-pink-400',
  },
  {
    id: 'student-support',
    icon: '🤝',
    label: 'Student Support',
    desc: 'Student profiles & tickets',
    border: 'border-green-500',
    bg: 'bg-green-900/20',
    check: 'text-green-400',
  },
];

export default function StaffLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password || !selectedRole) {
      setError('Please fill in all fields and select a role.');
      return;
    }
    setLoading(true);
    document.cookie = `mta_staff_session=${selectedRole}; path=/; max-age=86400`;
    document.cookie = `staff_role=${selectedRole}; path=/; max-age=86400`;
    window.location.href = '/staff/dashboard';
  };

  return (
    <div className="min-h-screen flex bg-gray-950">
      {/* ── LEFT BRAND PANEL ── */}
      <div className="hidden lg:flex w-[45%] bg-mta-black flex-col justify-between p-12 relative overflow-hidden bg-grid-pattern">
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-mta-gold/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-mta-gold/8 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-mta-gold/30 shadow-lg shadow-mta-gold/10 mb-6">
            <Image src="/logo.png" width={96} height={96} alt="MTA Logo" className="w-full h-full object-cover" />
          </div>
          <h1 className="font-heading font-bold text-white text-3xl leading-tight mb-2">
            MTA Staff<br />Management
          </h1>
          <p className="gold-shimmer font-heading font-bold text-2xl mb-4">It&apos;s All Possible!</p>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            Internal staff portal for lecturers, admin, marketing and student support teams.
          </p>
        </div>

        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/[0.08]">
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center shrink-0">
              <BookOpen className="w-4 h-4 text-purple-400" />
            </div>
            <div>
              <p className="text-white text-sm font-semibold">Lecturers</p>
              <p className="text-gray-500 text-xs">Courses, materials &amp; attendance</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/[0.08]">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center shrink-0">
              <Award className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <p className="text-white text-sm font-semibold">Admin Staff</p>
              <p className="text-gray-500 text-xs">Enrolments, schedules &amp; reports</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/[0.08]">
            <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center shrink-0">
              <Users className="w-4 h-4 text-green-400" />
            </div>
            <div>
              <p className="text-white text-sm font-semibold">Student Support</p>
              <p className="text-gray-500 text-xs">Tickets, progress &amp; notes</p>
            </div>
          </div>
        </div>

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
              <p className="font-heading font-bold text-white text-sm">MTA Staff Portal</p>
              <p className="text-gray-500 text-xs">Internal Management System</p>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-2 mb-1">
              <Lock className="w-4 h-4 text-mta-gold" />
              <span className="text-mta-gold text-xs font-semibold uppercase tracking-widest">Staff Access</span>
            </div>
            <h2 className="font-heading font-bold text-white text-2xl">Staff Sign In</h2>
            <p className="text-gray-500 text-sm mt-1">Choose your role and enter your credentials</p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-7">
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3">Select Your Role</p>
                <div className="grid grid-cols-2 gap-3">
                  {ROLES.map((role) => (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => setSelectedRole(role.id)}
                      className={`p-3.5 rounded-xl border-2 transition-all text-left relative ${
                        selectedRole === role.id
                          ? `${role.border} ${role.bg}`
                          : 'border-gray-800 bg-gray-800/50 hover:border-gray-700'
                      }`}
                    >
                      {selectedRole === role.id && (
                        <span className={`absolute top-2 right-2 text-xs font-bold ${role.check}`}>✓</span>
                      )}
                      <span className="text-2xl block mb-1.5">{role.icon}</span>
                      <p className="text-white text-xs font-semibold leading-tight">{role.label}</p>
                      <p className="text-gray-500 text-[10px] mt-0.5 leading-tight">{role.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-xs font-medium mb-1.5">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="staff@mta.co.za"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-mta-gold transition-colors"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-xs font-medium mb-1.5">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-mta-gold transition-colors"
                />
              </div>

              {error && (
                <p className="text-red-400 text-xs bg-red-950/40 border border-red-900/50 rounded-lg px-3 py-2">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-mta-gold text-mta-black font-semibold py-2.5 rounded-lg text-sm hover:bg-mta-light-gold transition-colors disabled:opacity-60"
              >
                {loading ? 'Signing in…' : 'Sign in to Staff Portal'}
              </button>
            </form>

            <div className="mt-5 pt-5 border-t border-gray-800 text-center space-y-1">
              <p className="text-gray-700 text-xs">Demo system — any credentials accepted</p>
              <p className="text-gray-700 text-xs">
                Admin?{' '}
                <a href="/login" className="text-mta-gold hover:underline">Sign in here</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
