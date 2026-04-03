'use client';

import { DEMO_ENROLMENTS } from '@/lib/data/demo/enrolments';
import AgentHub from '@/components/agents/AgentHub';

const ADMIN_ENROLMENT_AGENTS = [
  {
    name: 'Enrolment Confirmation Agent',
    description: 'Sends a personalised welcome email + payment invoice to newly accepted students automatically.',
    icon: '✉️',
    trigger: 'Enrolment Accepted',
    triggerType: 'event' as const,
    accentColor: '#3B82F6',
    logLines: [
      '⏳ Scanning for accepted enrolments not yet notified...',
      '✓ Found 2 students pending notification',
      '⏳ Preparing welcome email for Sipho Dlamini...',
      '✓ Email template rendered: "Welcome to MTA, Sipho!"',
      '⏳ Attaching invoice #INV-2026-0047 (R 12,500.00)...',
      '📤 Sending to sipho.d@gmail.com...',
      '✓ Delivered. Enrolment marked as Notified.',
      '⏳ Preparing email for Nomsa Khumalo...',
      '📤 Sending to nomsa.k@yahoo.com...',
      '✓ Delivered. All accepted students notified.',
    ],
  },
  {
    name: 'Schedule Reminder Agent',
    description: 'Sends WhatsApp and email reminders to enrolled students 24 hours before their upcoming class session.',
    icon: '⏰',
    trigger: '24h Before Class',
    triggerType: 'scheduled' as const,
    accentColor: '#3B82F6',
    logLines: [
      '⏳ Checking schedule for sessions starting in 24 hours...',
      '✓ Found 1 session: IT Systems Support NQF5 — Tue 8 Apr, 08:00',
      '⏳ Fetching enrolled students for this session...',
      '✓ 12 students enrolled. Preparing reminders...',
      '📤 Sending WhatsApp reminder to 12 students...',
      '✓ 11/12 WhatsApp messages delivered',
      'ℹ 1 number undeliverable — email fallback triggered',
      '📤 Email sent to thabo.n@hotmail.com as fallback',
      '✓ All students notified. Reminder log saved.',
    ],
  },
  {
    name: 'Document Request Agent',
    description: 'Detects enrolments with missing required documents and sends a follow-up checklist to the student.',
    icon: '📋',
    trigger: 'Manual',
    triggerType: 'manual' as const,
    accentColor: '#3B82F6',
    logLines: [
      '⏳ Scanning enrolments for missing documents...',
      '✓ Checked 23 pending enrolments',
      '⚠ 5 students missing required docs:',
      'ℹ  → Lungelo Sithole: ID copy, matric certificate',
      'ℹ  → Cebile Ndlovu: proof of address',
      'ℹ  → Refiloe Tau: bank statement (NSFAS)',
      '⏳ Generating document checklist emails...',
      '📤 Sending to 5 students with 3-day deadline...',
      '✓ All 5 emails sent. Follow-up flag set for 6 Apr 2026.',
    ],
  },
];

export default function AdminEnrolmentsPage() {
  const newEnrolments = DEMO_ENROLMENTS.filter(e => e.status === 'new');

  return (
    <div className="p-8">
      <h1 className="font-heading font-bold text-white text-2xl mb-2">New Enrolments</h1>
      <p className="text-gray-400 text-sm mb-6">{newEnrolments.length} pending review</p>

      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left px-5 py-3 text-gray-500 font-medium">Name</th>
              <th className="text-left px-5 py-3 text-gray-500 font-medium hidden md:table-cell">Course</th>
              <th className="text-left px-5 py-3 text-gray-500 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {newEnrolments.map((e) => (
              <tr key={e.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                <td className="px-5 py-3">
                  <p className="text-white">{e.name}</p>
                  <p className="text-gray-500 text-xs">{e.email}</p>
                </td>
                <td className="px-5 py-3 hidden md:table-cell text-gray-400">{e.course}</td>
                <td className="px-5 py-3"><button className="text-mta-gold text-sm hover:underline">Review →</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AgentHub agents={ADMIN_ENROLMENT_AGENTS} title="Enrolment Automation" />
    </div>
  );
}
