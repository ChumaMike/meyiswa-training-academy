'use client';

import { useState } from 'react';

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
  },
  {
    id: 'admin-staff',
    icon: '👩‍💼',
    label: 'Admin Staff',
    desc: 'Enrolments, schedules & tasks',
    cookie: 'mta_staff_session=admin-staff; staff_role=admin-staff',
    dest: '/staff/dashboard',
    border: 'border-blue-600',
    bg: 'bg-blue-900/20',
  },
  {
    id: 'lecturer',
    icon: '👨‍🏫',
    label: 'Lecturer / Trainer',
    desc: 'Courses, students & materials',
    cookie: 'mta_staff_session=lecturer; staff_role=lecturer',
    dest: '/staff/dashboard',
    border: 'border-purple-600',
    bg: 'bg-purple-900/20',
  },
  {
    id: 'marketing',
    icon: '📱',
    label: 'Marketing / Social',
    desc: 'Content approval & campaigns',
    cookie: 'mta_staff_session=marketing; staff_role=marketing',
    dest: '/staff/dashboard',
    border: 'border-pink-600',
    bg: 'bg-pink-900/20',
  },
  {
    id: 'student-support',
    icon: '🤝',
    label: 'Student Support',
    desc: 'Student profiles & tickets',
    cookie: 'mta_staff_session=student-support; staff_role=student-support',
    dest: '/staff/dashboard',
    border: 'border-green-600',
    bg: 'bg-green-900/20',
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
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-mta-gold rounded-xl mb-4">
            <span className="font-heading font-bold text-mta-black text-2xl">M</span>
          </div>
          <h1 className="font-heading font-bold text-white text-2xl">MTA Admin Portal</h1>
          <p className="text-gray-400 text-sm mt-1">Meyiswa Training Academy</p>
          <div className="inline-flex items-center gap-1.5 mt-3 bg-yellow-900/30 border border-yellow-800/50 text-yellow-400 text-xs px-3 py-1.5 rounded-full">
            <span>🔒</span> MTA Employees Only — Authorised Access
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-7">
          <h2 className="font-heading font-semibold text-white text-base mb-1">Select your role</h2>
          <p className="text-gray-500 text-xs mb-5">Choose your position at MTA to access the right portal</p>

          {/* Role cards */}
          <div className="space-y-2 mb-6">
            {ROLES.map(role => (
              <button
                key={role.id}
                type="button"
                onClick={() => setSelectedRole(role.id)}
                className={`w-full flex items-center gap-3 p-3.5 rounded-xl border-2 transition-all text-left ${
                  selectedRole === role.id
                    ? `${role.border} ${role.bg}`
                    : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                }`}
              >
                <span className="text-2xl">{role.icon}</span>
                <div>
                  <p className="text-white text-sm font-semibold">{role.label}</p>
                  <p className="text-gray-500 text-xs">{role.desc}</p>
                </div>
                {selectedRole === role.id && (
                  <span className="ml-auto text-mta-gold">✓</span>
                )}
              </button>
            ))}
          </div>

          {/* Credentials */}
          <form onSubmit={handleLogin} className="space-y-3">
            <div>
              <label className="block text-gray-400 text-xs mb-1.5">Email address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@mta.co.za"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-mta-gold transition-colors"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-xs mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-mta-gold transition-colors"
              />
            </div>
            {error && <p className="text-red-400 text-xs">{error}</p>}
            <button
              type="submit"
              className="w-full bg-mta-gold text-mta-black font-semibold py-2.5 rounded-lg text-sm hover:bg-mta-light-gold transition-colors mt-2"
            >
              Sign in
            </button>
          </form>

          <p className="text-gray-700 text-xs text-center mt-5">Demo system — any credentials accepted</p>
        </div>
      </div>
    </div>
  );
}
