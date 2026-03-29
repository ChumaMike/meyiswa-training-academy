export interface Enrolment {
  id: string;
  name: string;
  phone: string;
  email: string;
  course: string;
  faculty: string;
  applied: string;
  status: 'new' | 'under-review' | 'accepted' | 'rejected';
}
export const DEMO_ENROLMENTS: Enrolment[] = [
  { id: 'E001', name: 'Ayanda Zulu', phone: '+27 72 111 2222', email: 'ayanda@gmail.com', course: 'IT Systems Support NQF5', faculty: 'Information Technology', applied: '2026-03-01', status: 'accepted' },
  { id: 'E002', name: 'Bongani Cele', phone: '+27 83 222 3333', email: 'bongani@gmail.com', course: 'Business Management NQF6', faculty: 'Business Management', applied: '2026-03-05', status: 'under-review' },
  { id: 'E003', name: 'Cebile Ndlovu', phone: '+27 74 333 4444', email: 'cebile@yahoo.com', course: 'Project Management NQF5', faculty: 'Business Management', applied: '2026-03-08', status: 'new' },
  { id: 'E004', name: 'Duduzile Mthembu', phone: '+27 65 444 5555', email: 'dudi@hotmail.com', course: 'HR Management NQF5', faculty: 'HR & Professional', applied: '2026-02-28', status: 'accepted' },
  { id: 'E005', name: 'Elihle Zwane', phone: '+27 76 555 6666', email: 'elihle@gmail.com', course: 'ODETDP NQF5', faculty: 'HR & Professional', applied: '2026-03-10', status: 'under-review' },
  { id: 'E006', name: 'Fanele Gumede', phone: '+27 87 666 7777', email: 'fanele@gmail.com', course: 'Health & Safety NQF4', faculty: 'Health Safety & Community', applied: '2026-03-12', status: 'new' },
  { id: 'E007', name: 'Gugu Shabalala', phone: '+27 68 777 8888', email: 'gugu@yahoo.com', course: 'Retail Management NQF4', faculty: 'Retail & Commerce', applied: '2026-03-15', status: 'rejected' },
  { id: 'E008', name: 'Hlanganani Ntuli', phone: '+27 79 888 9999', email: 'hlanganani@gmail.com', course: 'IT Technical Support NQF4', faculty: 'Information Technology', applied: '2026-03-18', status: 'new' },
];
