export interface Activity {
  id: string;
  action: string;
  user: string;
  time: string;
  type: 'post' | 'lead' | 'enrolment' | 'settings' | 'bot';
}
export const DEMO_ACTIVITY: Activity[] = [
  { id: 'A001', action: 'Approved Week 1 April social post', user: 'Thandile', time: '2 hours ago', type: 'post' },
  { id: 'A002', action: 'New lead from WhatsApp Bot — Sipho Dlamini', user: 'System', time: '3 hours ago', type: 'lead' },
  { id: 'A003', action: 'Enrolment application — Cebile Ndlovu', user: 'System', time: '5 hours ago', type: 'enrolment' },
  { id: 'A004', action: 'Updated Admin PIN', user: 'Thandile', time: 'Yesterday', type: 'settings' },
  { id: 'A005', action: 'WhatsApp bot keyword added: "retail"', user: 'Chuma', time: 'Yesterday', type: 'bot' },
];
