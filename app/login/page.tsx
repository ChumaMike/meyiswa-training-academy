'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Shield, BookOpen, Award, Users, Eye, EyeOff, ChevronRight } from 'lucide-react';

const ROLES = [
  {
    id: 'admin',
    icon: '👑',
    label: 'MTA Administrator',
    desc: 'Full system access — Thandile',
    cookie: 'mta_session=1',
    dest: '/dashboard',
    border: 'border-[#D4A017]',
    bg: 'bg-[#D4A017]/10',
    check: 'text-[#D4A017]',
    glow: 'shadow-[0_0_20px_rgba(212,160,23,0.15)]',
    iconBg: 'bg-[#D4A017]/20',
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
    glow: 'shadow-[0_0_20px_rgba(59,130,246,0.15)]',
    iconBg: 'bg-blue-500/20',
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
    glow: 'shadow-[0_0_20px_rgba(168,85,247,0.15)]',
    iconBg: 'bg-purple-500/20',
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
    glow: 'shadow-[0_0_20px_rgba(236,72,153,0.15)]',
    iconBg: 'bg-pink-500/20',
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
    glow: 'shadow-[0_0_20px_rgba(34,197,94,0.15)]',
    iconBg: 'bg-green-500/20',
  },
];

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) { setError('Please select your role.'); return; }
    if (!email || !password) { setError('Please enter your email and password.'); return; }
    setLoading(true);
    setError('');
    // Small artificial delay for UX feedback
    await new Promise(r => setTimeout(r, 600));
    const role = ROLES.find(r => r.id === selectedRole)!;
    role.cookie.split(';').forEach(c => {
      document.cookie = `${c.trim()}; path=/; max-age=86400`;
    });
    window.location.href = role.dest;
  };

  return (
    <div className="min-h-screen flex bg-gray-950 relative overflow-hidden">

      {/* ── Animated background ────────────────────────────────────── */}
      {/* Animated grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(212,160,23,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,160,23,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          animation: 'grid-drift 25s linear infinite',
        }}
      />
      {/* Radial glow blobs */}
      <div
        className="absolute top-0 left-1/4 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(212,160,23,0.05) 0%, transparent 70%)',
          animation: 'float-blob 12s ease-in-out infinite',
        }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(212,160,23,0.04) 0%, transparent 70%)',
          animation: 'float-blob 16s ease-in-out infinite reverse',
        }}
      />

      {/* ── LEFT BRAND PANEL ──────────────────────────────────────── */}
      <div className="hidden lg:flex w-[45%] flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #0a0a14 0%, #111120 50%, #0a0a14 100%)' }}
      >
        {/* Gold accent line at top */}
        <div
          className="absolute top-0 left-0 right-0 h-0.5"
          style={{ background: 'linear-gradient(90deg, transparent, #D4A017, transparent)' }}
        />
        {/* Gold blob decorations */}
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-[#D4A017]/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#D4A017]/6 rounded-full blur-3xl pointer-events-none" />

        {/* Top: Logo + name */}
        <div className="relative z-10">
          <div
            className="w-24 h-24 rounded-full overflow-hidden mb-6 ring-4 ring-[#D4A017]/20"
            style={{ boxShadow: '0 0 40px rgba(212,160,23,0.15), 0 0 80px rgba(212,160,23,0.05)' }}
          >
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

        {/* Middle: Feature highlights */}
        <div className="relative z-10 space-y-3">
          {[
            { icon: BookOpen, title: '60+ Courses', sub: 'Across 5 faculties', delay: '0s' },
            { icon: Award, title: 'SETA Accredited', sub: 'B-BBEE Level 1 EME', delay: '0.1s' },
            { icon: Users, title: 'Nationwide', sub: 'South Africa wide delivery', delay: '0.2s' },
          ].map(({ icon: Icon, title, sub, delay }) => (
            <div
              key={title}
              className="flex items-center gap-3 p-3 rounded-xl border border-white/[0.06] hover:border-[#D4A017]/20 transition-all duration-300 group"
              style={{
                background: 'rgba(255,255,255,0.03)',
                animationDelay: delay,
              }}
            >
              <div className="w-9 h-9 rounded-xl bg-[#D4A017]/15 flex items-center justify-center shrink-0 group-hover:bg-[#D4A017]/25 transition-colors">
                <Icon className="w-4 h-4 text-[#D4A017]" />
              </div>
              <div>
                <p className="text-white text-sm font-semibold">{title}</p>
                <p className="text-gray-500 text-xs">{sub}</p>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-gray-700 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

        {/* Bottom: Contact */}
        <div className="relative z-10 border-t border-white/[0.06] pt-5">
          <p className="text-gray-600 text-xs mb-1">meyiswa.co.za · admin@meyiswa.co.za</p>
          <p className="text-gray-600 text-xs">010 634 2503 · WhatsApp: 072 513 3869</p>
        </div>
      </div>

      {/* ── RIGHT FORM PANEL ──────────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center px-6 py-10 relative z-10">
        <div className="w-full max-w-md animate-slide-up">

          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-7 lg:hidden">
            <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-[#D4A017]/40">
              <Image src="/logo.png" width={40} height={40} alt="MTA Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="font-heading font-bold text-white text-sm">Meyiswa Training Academy</p>
              <p className="text-gray-500 text-xs">Admin Portal</p>
            </div>
          </div>

          {/* Heading */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[#D4A017]/30 bg-[#D4A017]/8">
                <Shield className="w-3 h-3 text-[#D4A017]" />
                <span className="text-[#D4A017] text-[10px] font-semibold uppercase tracking-widest">Secure Portal</span>
              </div>
            </div>
            <h2
              className="font-heading font-bold text-3xl leading-tight"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #D4A017 60%, #F5D980 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Sign in to MTA
            </h2>
            <p className="text-gray-500 text-sm mt-1.5">Select your role to access the right dashboard</p>
          </div>

          {/* Main card with glassmorphism */}
          <div
            className="rounded-2xl p-6"
            style={{
              background: 'rgba(17, 17, 34, 0.8)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(212,160,23,0.12)',
              boxShadow: '0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
            }}
          >
            {/* Role selector */}
            <p className="text-gray-400 text-[10px] font-semibold uppercase tracking-widest mb-3">Select Your Role</p>
            <div className="space-y-1.5 mb-5">
              {ROLES.map(role => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => { setSelectedRole(role.id); setError(''); }}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all duration-200 text-left group
                    ${selectedRole === role.id
                      ? `${role.border} ${role.bg} ${role.glow}`
                      : 'border-gray-800 bg-gray-800/40 hover:border-gray-700 hover:bg-gray-800/60'
                    }
                  `}
                >
                  {/* Icon */}
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                    selectedRole === role.id ? role.iconBg : 'bg-gray-700/60'
                  }`}>
                    <span className="text-base leading-none">{role.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold transition-colors ${
                      selectedRole === role.id ? 'text-white' : 'text-gray-300 group-hover:text-white'
                    }`}>{role.label}</p>
                    <p className="text-gray-500 text-xs truncate">{role.desc}</p>
                  </div>
                  {selectedRole === role.id
                    ? <span className={`w-5 h-5 rounded-full border-2 ${role.border} flex items-center justify-center shrink-0`}>
                        <span className={`text-[10px] font-bold ${role.check}`}>✓</span>
                      </span>
                    : <span className="w-5 h-5 rounded-full border border-gray-700 shrink-0 group-hover:border-gray-500 transition-colors" />
                  }
                </button>
              ))}
            </div>

            {/* Credentials form */}
            <div className="border-t border-gray-800/60 pt-5">
              <form onSubmit={handleLogin} className="space-y-3">
                <div>
                  <label className="block text-gray-400 text-xs font-medium mb-1.5">Email address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setError(''); }}
                    placeholder="you@mta.co.za"
                    className="search-gold-focus w-full bg-gray-800/80 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-600 transition-all duration-200"
                    style={{ outline: 'none' }}
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-xs font-medium mb-1.5">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={e => { setPassword(e.target.value); setError(''); }}
                      placeholder="••••••••"
                      className="search-gold-focus w-full bg-gray-800/80 border border-gray-700 rounded-xl px-4 py-2.5 pr-11 text-white text-sm placeholder-gray-600 transition-all duration-200"
                      style={{ outline: 'none' }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="flex items-center gap-2 text-red-400 text-xs bg-red-950/40 border border-red-900/50 rounded-xl px-3 py-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 mt-1 flex items-center justify-center gap-2 disabled:opacity-70"
                  style={{
                    background: loading
                      ? 'linear-gradient(135deg, #A07C10, #6B5010)'
                      : 'linear-gradient(135deg, #D4A017 0%, #A07C10 100%)',
                    color: '#0a0a14',
                    boxShadow: loading ? 'none' : '0 4px 20px rgba(212,160,23,0.25)',
                  }}
                >
                  {loading ? (
                    <>
                      <span
                        className="w-4 h-4 border-2 border-gray-900/30 border-t-gray-900 rounded-full"
                        style={{ animation: 'spin 0.7s linear infinite' }}
                      />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <Shield className="w-4 h-4" />
                      Sign in to Portal
                    </>
                  )}
                </button>
              </form>
            </div>

            <p className="text-gray-700 text-xs text-center mt-5">Demo system — any credentials accepted</p>
          </div>

          {/* Version note */}
          <p className="text-center text-gray-800 text-[10px] mt-5">v1.0 · Phase 1 · MTA Admin Portal</p>
        </div>
      </div>

      {/* Keyframe animations injected */}
      <style>{`
        @keyframes float-blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.05); }
          66% { transform: translate(-20px, 10px) scale(0.97); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
