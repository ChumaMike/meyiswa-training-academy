export interface Lead {
  id: string;
  name: string;
  phone: string;
  courseInterest: string;
  email: string;
  source: string;
  status: 'new' | 'contacted' | 'enrolled' | 'closed';
  date: string;
}
export const DEMO_LEADS: Lead[] = [
  { id: 'L001', name: 'Sipho Dlamini', phone: '+27 71 234 5678', courseInterest: 'IT Systems Support NQF5', email: 'sipho.d@gmail.com', source: 'WhatsApp Bot', status: 'new', date: '2026-03-25' },
  { id: 'L002', name: 'Nomsa Khumalo', phone: '+27 82 456 7890', courseInterest: 'Business Management NQF4', email: 'nomsa.k@yahoo.com', source: 'WhatsApp Bot', status: 'contacted', date: '2026-03-24' },
  { id: 'L003', name: 'Thabo Nkosi', phone: '+27 73 678 9012', courseInterest: 'HR Management NQF5', email: 'thabo.n@hotmail.com', source: 'Website', status: 'enrolled', date: '2026-03-20' },
  { id: 'L004', name: 'Zanele Mokoena', phone: '+27 61 890 1234', courseInterest: 'Health & Safety NQF4', email: '', source: 'WhatsApp Bot', status: 'new', date: '2026-03-26' },
  { id: 'L005', name: 'Lungelo Sithole', phone: '+27 79 012 3456', courseInterest: 'Retail Management NQF4', email: 'lungelo.s@gmail.com', source: 'Referral', status: 'closed', date: '2026-03-18' },
];
