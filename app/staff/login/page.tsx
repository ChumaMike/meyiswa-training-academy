'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const ROLES = [
  { id: 'lecturer', icon: '👨‍🏫', label: 'Lecturer/Trainer', desc: 'Manage courses & student progress' },
  { id: 'admin-staff', icon: '👩‍💼', label: 'Admin Staff', desc: 'Enrollment & scheduling' },
  { id: 'marketing', icon: '📱', label: 'Marketing/Social', desc: 'Content approval & posts' },
  { id: 'student-support', icon: '🤝', label: 'Student Support', desc: 'Student profiles & tickets' },
];

export default function StaffLoginPage() {
  const router = useRouter();
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
    // Demo auth
    document.cookie = `mta_staff_session=${selectedRole}; path=/; max-age=86400`;
    document.cookie = `staff_role=${selectedRole}; path=/; max-age=86400`;
    window.location.href = '/staff/dashboard';
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-mta-gold rounded-xl mb-4">
            <span className="font-heading font-bold text-mta-black text-2xl">M</span>
          </div>
          <h1 className="font-heading font-bold text-white text-2xl">MTA Staff Portal</h1>
          <p className="text-gray-400 text-sm mt-1">Internal Management System</p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
          <h2 className="font-heading font-semibold text-white text-lg mb-2">Sign in</h2>
          <p className="text-gray-400 text-sm mb-6">Select your role and enter credentials</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-400 text-sm mb-1.5">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="staff@mta.co.za" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-mta-gold transition-colors" />
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-1.5">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-mta-gold transition-colors" />
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-3">Your role</label>
              <div className="grid grid-cols-2 gap-3">
                {ROLES.map((role) => (
                  <button key={role.id} type="button" onClick={() => setSelectedRole(role.id)} className={`p-3 rounded-lg border-2 transition-all text-left ${selectedRole === role.id ? 'border-mta-gold bg-mta-gold/10' : 'border-gray-700 bg-gray-800 hover:border-gray-600'}`}>
                    <span className="text-2xl">{role.icon}</span>
                    <p className="text-white text-sm font-semibold mt-1">{role.label}</p>
                  </button>
                ))}
              </div>
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button type="submit" disabled={loading} className="w-full bg-mta-gold text-mta-black font-semibold py-2.5 rounded-lg text-sm hover:bg-mta-light-gold transition-colors disabled:opacity-60 mt-6">
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-800 text-center">
            <p className="text-gray-600 text-xs">Demo system — any credentials accepted</p>
            <p className="text-gray-700 text-xs mt-2">Or <a href="/login" className="text-mta-gold hover:underline">sign in as admin</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}
