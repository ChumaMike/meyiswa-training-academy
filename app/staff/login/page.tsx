'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const STAFF_ROLES = [
  { role: 'lecturer', label: 'Lecturer / Trainer', icon: '👨‍🏫', desc: 'Manage courses & student progress' },
  { role: 'admin', label: 'Admin Staff', icon: '📋', desc: 'Handle enrolments & scheduling' },
  { role: 'marketing', label: 'Marketing / Social Media', icon: '📱', desc: 'Approve content & campaigns' },
  { role: 'support', label: 'Student Support', icon: '💬', desc: 'Manage student queries & progress' },
];

export default function StaffLoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<'role' | 'creds'>('role');
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    setStep('creds');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }
    setLoading(true);
    // Demo auth — set cookies then redirect
    document.cookie = `mta_staff_session=1; path=/staff; max-age=86400`;
    document.cookie = `mta_staff_role=${selectedRole}; path=/staff; max-age=86400`;
    window.location.href = '/staff/dashboard';
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-mta-gold rounded-xl mb-4">
            <span className="font-heading font-bold text-mta-black text-2xl">M</span>
          </div>
          <h1 className="font-heading font-bold text-white text-2xl">MTA Staff Portal</h1>
          <p className="text-gray-400 text-sm mt-1">Internal staff workspace</p>
        </div>

        {/* Card */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
          {step === 'role' ? (
            <>
              <h2 className="font-heading font-semibold text-white text-lg mb-6">Select your role</h2>
              <div className="space-y-3">
                {STAFF_ROLES.map((r) => (
                  <button
                    key={r.role}
                    onClick={() => handleRoleSelect(r.role)}
                    className="w-full text-left p-4 border border-gray-700 rounded-lg hover:border-mta-gold hover:bg-gray-800/50 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{r.icon}</span>
                      <div className="flex-1">
                        <p className="text-white font-medium group-hover:text-mta-gold transition-colors">{r.label}</p>
                        <p className="text-gray-500 text-sm">{r.desc}</p>
                      </div>
                      <span className="text-gray-600 group-hover:text-mta-gold transition-colors">→</span>
                    </div>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setStep('role');
                  setError('');
                }}
                className="flex items-center gap-1 text-gray-500 hover:text-gray-400 text-sm mb-6 transition-colors"
              >
                ← Back to role selection
              </button>

              <div className="mb-4">
                <p className="text-gray-400 text-sm">
                  <span className="text-mta-gold font-medium">{STAFF_ROLES.find(r => r.role === selectedRole)?.label}</span>
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-1.5" htmlFor="email">
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="staff@mta.co.za"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-mta-gold transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-1.5" htmlFor="password">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-mta-gold transition-colors"
                  />
                </div>

                {error && <p className="text-red-400 text-sm">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-mta-gold text-mta-black font-semibold py-2.5 rounded-lg text-sm hover:bg-mta-light-gold transition-colors disabled:opacity-60"
                >
                  {loading ? 'Signing in…' : 'Sign in'}
                </button>
              </form>

              <p className="text-gray-600 text-xs text-center mt-6">
                Demo system — any credentials accepted
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
