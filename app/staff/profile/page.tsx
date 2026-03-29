// Shared — Profile & Settings
'use client';

import { useState } from 'react';

export default function StaffProfilePage() {
  const [editing, setEditing] = useState(false);

  return (
    <div className="p-8">
      <h1 className="font-heading font-bold text-white text-2xl mb-2">Staff Profile</h1>
      <p className="text-gray-400 text-sm mb-6">Manage your personal information and settings</p>

      <div className="max-w-2xl">
        {/* Profile Card */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-mta-gold rounded-full flex items-center justify-center text-2xl font-heading font-bold text-mta-black">
              👨‍🏫
            </div>
            <div>
              <h2 className="text-white text-xl font-semibold">John Sibiya</h2>
              <p className="text-mta-gold text-sm">Lecturer — Information Technology</p>
            </div>
          </div>

          <button
            onClick={() => setEditing(!editing)}
            className="px-4 py-2 bg-mta-gold text-mta-black text-sm font-semibold rounded-lg hover:bg-mta-light-gold transition-colors"
          >
            {editing ? 'Save Changes' : 'Edit Profile'}
          </button>
        </div>

        {/* Info Sections */}
        <div className="space-y-4">
          {[
            { title: 'Contact Information', items: [
              { label: 'Email', value: 'john@mta.co.za' },
              { label: 'Phone', value: '+27 82 555 1234' },
              { label: 'Emergency Contact', value: '+27 82 555 9999' },
            ]},
            { title: 'Employment', items: [
              { label: 'Role', value: 'Lecturer' },
              { label: 'Department', value: 'Information Technology' },
              { label: 'Employed Since', value: '2022-06-01' },
              { label: 'Contract Type', value: 'Full-Time' },
            ]},
            { title: 'Security', items: [
              { label: 'Last Password Change', value: '2026-02-15' },
              { label: 'Two-Factor Auth', value: 'Disabled' },
              { label: 'Active Sessions', value: '1' },
            ]},
          ].map((section) => (
            <div key={section.title} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <h3 className="font-heading font-semibold text-white text-base mb-4">{section.title}</h3>
              <div className="space-y-3">
                {section.items.map((item) => (
                  <div key={item.label} className="flex items-center justify-between pb-3 border-b border-gray-800 last:border-0">
                    <p className="text-gray-500 text-sm">{item.label}</p>
                    <p className="text-gray-300 text-sm">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Danger Zone */}
        <div className="mt-6 bg-red-900/20 border border-red-800 rounded-xl p-5">
          <h3 className="font-heading font-semibold text-red-300 text-base mb-3">Danger Zone</h3>
          <p className="text-gray-400 text-sm mb-4">Irreversible actions on your account</p>
          <button className="px-4 py-2 bg-red-900 text-red-300 text-sm font-medium rounded-lg hover:bg-red-800 transition-colors border border-red-800">
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
}
