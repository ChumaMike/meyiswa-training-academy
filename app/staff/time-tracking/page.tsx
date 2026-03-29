// Shared — Time Tracking & Attendance
'use client';

import { useState } from 'react';

const TIME_LOG = [
  { id: 'TL1', date: '2026-03-28', clockIn: '08:45', clockOut: '17:30', hours: 8.75, status: 'completed' },
  { id: 'TL2', date: '2026-03-27', clockIn: '09:00', clockOut: '17:00', hours: 8.0, status: 'completed' },
  { id: 'TL3', date: '2026-03-26', clockIn: '08:30', clockOut: '17:15', hours: 8.75, status: 'completed' },
];

export default function TimeTrackingPage() {
  const [currentSession, setCurrentSession] = useState<'stopped' | 'started'>('stopped');
  const totalHours = TIME_LOG.reduce((sum, log) => sum + log.hours, 0);

  return (
    <div className="p-8">
      <h1 className="font-heading font-bold text-white text-2xl mb-2">Time Tracking</h1>
      <p className="text-gray-400 text-sm mb-6">Clock in/out and track your work hours</p>

      {/* Clock In/Out */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 mb-8 text-center">
        <p className="text-gray-500 text-sm mb-4">Current Status</p>
        <p className="font-heading font-bold text-white text-5xl mb-6">
          {currentSession === 'started' ? '▶' : '⏹'} {new Date().toLocaleTimeString()}
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => setCurrentSession('started')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              currentSession === 'started'
                ? 'bg-green-700 text-white'
                : 'bg-gray-800 text-gray-400 border border-gray-700 hover:border-green-600'
            }`}
          >
            🟢 Clock In
          </button>
          <button
            onClick={() => setCurrentSession('stopped')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              currentSession === 'stopped'
                ? 'bg-red-700 text-white'
                : 'bg-gray-800 text-gray-400 border border-gray-700 hover:border-red-600'
            }`}
          >
            🔴 Clock Out
          </button>
        </div>
        <p className="text-mta-gold text-sm mt-6">
          {currentSession === 'started' ? '⏱️ Session Active' : '✓ Clocked Out'}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Hours This Week', value: totalHours.toFixed(1), icon: '⏱️' },
          { label: 'Days Logged', value: TIME_LOG.length, icon: '📅' },
          { label: 'Attendance Rate', value: '100%', icon: '✓' },
          { label: 'On Time', value: 'Always', icon: '📍' },
        ].map((stat) => (
          <div key={stat.label} className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
            <span className="text-2xl">{stat.icon}</span>
            <p className="font-heading font-bold text-white text-2xl mt-2">{stat.value}</p>
            <p className="text-gray-500 text-xs mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Time Log */}
      <h2 className="font-heading font-semibold text-white text-base mb-4">Recent Time Log</h2>
      <div className="space-y-2">
        {TIME_LOG.map((log) => (
          <div key={log.id} className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="text-white font-semibold">{log.date}</p>
              <p className="text-gray-500 text-sm">{log.clockIn} — {log.clockOut}</p>
            </div>
            <div className="text-center">
              <p className="font-heading font-bold text-white text-lg">{log.hours}h</p>
              <span className="text-xs bg-green-900 text-green-300 px-2 py-0.5 rounded-full inline-block mt-1">
                ✓ {log.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
