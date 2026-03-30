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
  { id: 'E001', name: 'Ayanda Zulu', phone: '+27 72 111 2222', email: 'ayanda.z@gmail.com', course: 'IT Systems Support NQF5', faculty: 'Information Technology', applied: '2026-03-01', status: 'accepted' },
  { id: 'E002', name: 'Bongani Cele', phone: '+27 83 222 3333', email: 'bongani.c@gmail.com', course: 'Business Management NQF6', faculty: 'Business Management', applied: '2026-03-05', status: 'under-review' },
  { id: 'E003', name: 'Cebile Ndlovu', phone: '+27 74 333 4444', email: 'cebile.n@yahoo.com', course: 'Project Management NQF5', faculty: 'Business Management', applied: '2026-03-08', status: 'new' },
  { id: 'E004', name: 'Duduzile Mthembu', phone: '+27 65 444 5555', email: 'dudi.m@hotmail.com', course: 'HR Management NQF5', faculty: 'HR & Professional', applied: '2026-02-28', status: 'accepted' },
  { id: 'E005', name: 'Elihle Zwane', phone: '+27 76 555 6666', email: 'elihle.z@gmail.com', course: 'ODETDP NQF5', faculty: 'HR & Professional', applied: '2026-03-10', status: 'under-review' },
  { id: 'E006', name: 'Fanele Gumede', phone: '+27 87 666 7777', email: 'fanele.g@gmail.com', course: 'Health & Safety NQF4', faculty: 'Health Safety & Community', applied: '2026-03-12', status: 'new' },
  { id: 'E007', name: 'Gugu Shabalala', phone: '+27 68 777 8888', email: 'gugu.s@yahoo.com', course: 'Retail Management NQF4', faculty: 'Retail & Commerce', applied: '2026-03-15', status: 'rejected' },
  { id: 'E008', name: 'Hlanganani Ntuli', phone: '+27 79 888 9999', email: 'hlanganani.n@gmail.com', course: 'IT Technical Support NQF4', faculty: 'Information Technology', applied: '2026-03-18', status: 'new' },
  { id: 'E009', name: 'Innocent Dlamini', phone: '+27 71 901 2345', email: 'innocent.d@gmail.com', course: 'Software Developer NQF5', faculty: 'Information Technology', applied: '2026-03-19', status: 'new' },
  { id: 'E010', name: 'Jabulile Khumalo', phone: '+27 82 012 3456', email: 'jabulile.k@yahoo.com', course: 'Generic Management NQF5', faculty: 'Business Management', applied: '2026-03-20', status: 'under-review' },
  { id: 'E011', name: 'Khethiwe Mkhize', phone: '+27 73 123 4567', email: 'khethiwe.m@gmail.com', course: 'HR Administrator NQF4', faculty: 'HR & Professional', applied: '2026-03-21', status: 'new' },
  { id: 'E012', name: 'Lindani Buthelezi', phone: '+27 84 234 5678', email: 'lindani.b@hotmail.com', course: 'Retail Store Manager NQF6', faculty: 'Retail & Commerce', applied: '2026-03-22', status: 'accepted' },
  { id: 'E013', name: 'Mlungisi Sithole', phone: '+27 75 345 6789', email: 'mlungisi.s@gmail.com', course: 'OHS Practitioner NQF5', faculty: 'Health Safety & Community', applied: '2026-03-23', status: 'new' },
  { id: 'E014', name: 'Nomvula Mokoena', phone: '+27 66 456 7890', email: 'nomvula.m@gmail.com', course: 'Business Administration NQF3', faculty: 'Business Management', applied: '2026-03-24', status: 'under-review' },
  { id: 'E015', name: 'Obakeng Molefe', phone: '+27 77 567 8901', email: 'obakeng.m@yahoo.com', course: 'IT Systems Development NQF4', faculty: 'Information Technology', applied: '2026-03-24', status: 'new' },
  { id: 'E016', name: 'Phumzile Nkosi', phone: '+27 88 678 9012', email: 'phumzile.n@gmail.com', course: 'Marketing Management NQF5', faculty: 'HR & Professional', applied: '2026-03-25', status: 'new' },
  { id: 'E017', name: 'Qhawe Zungu', phone: '+27 69 789 0123', email: 'qhawe.z@hotmail.com', course: 'Retail Sales Advisor NQF3', faculty: 'Retail & Commerce', applied: '2026-03-25', status: 'under-review' },
  { id: 'E018', name: 'Refiloe Tau', phone: '+27 70 890 1234', email: 'refiloe.t@gmail.com', course: 'Community Development NQF5', faculty: 'Health Safety & Community', applied: '2026-03-26', status: 'new' },
  { id: 'E019', name: 'Sibusiso Hadebe', phone: '+27 81 901 2345', email: 'sibusiso.h@gmail.com', course: 'Cybersecurity Analyst NQF5', faculty: 'Information Technology', applied: '2026-03-27', status: 'new' },
  { id: 'E020', name: 'Thandeka Vilakazi', phone: '+27 72 012 3456', email: 'thandeka.v@yahoo.com', course: 'Public Finance Management NQF6', faculty: 'Business Management', applied: '2026-03-28', status: 'new' },
];
