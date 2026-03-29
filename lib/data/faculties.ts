import { FacultyMeta, FacultyId } from '../types';

export const FACULTIES: FacultyMeta[] = [
  {
    id: 'information-technology',
    label: 'Information Technology',
    shortLabel: 'IT',
    description: 'From cybersecurity to software development, our IT faculty delivers MICT SETA-accredited qualifications that prepare you for the digital economy.',
    seta: ['MICT SETA'],
    courseCount: 15,
    icon: '💻',
    accentClass: 'bg-blue-900',
  },
  {
    id: 'business-management',
    label: 'Business, Management & Government',
    shortLabel: 'Business',
    description: 'Build the management, entrepreneurship and public sector skills to lead organisations and communities forward.',
    seta: ['Services SETA', 'LGSETA'],
    courseCount: 14,
    icon: '📊',
    accentClass: 'bg-amber-900',
  },
  {
    id: 'health-safety-community',
    label: 'Health, Safety & Community',
    shortLabel: 'Health & Safety',
    description: 'Create safer workplaces and healthier communities. From OHS practitioners to ECD workers, this faculty changes lives.',
    seta: ['QCTO', 'AgriSETA'],
    courseCount: 10,
    icon: '🛡️',
    accentClass: 'bg-green-900',
  },
  {
    id: 'hr-professional',
    label: 'HR, Professional & Occupational',
    shortLabel: 'HR & Professional',
    description: 'From HR advisors to project managers, marketers to travel professionals — build an occupational career with nationally recognised credentials.',
    seta: ['QCTO', 'ETDP SETA'],
    courseCount: 17,
    icon: '👥',
    accentClass: 'bg-purple-900',
  },
  {
    id: 'retail-commerce',
    label: 'Retail & Commerce',
    shortLabel: 'Retail',
    description: 'South Africa\'s retail sector employs millions. From sales assistants to store managers, build a career in one of the country\'s largest industries.',
    seta: ['W&RSETA', 'QCTO'],
    courseCount: 15,
    icon: '🛒',
    accentClass: 'bg-red-900',
  },
];

export function getFacultyById(id: FacultyId): FacultyMeta | undefined {
  return FACULTIES.find((f) => f.id === id);
}

export const FACULTY_LABELS: Record<FacultyId, string> = {
  'information-technology': 'Information Technology',
  'business-management': 'Business & Management',
  'health-safety-community': 'Health, Safety & Community',
  'hr-professional': 'HR & Professional',
  'retail-commerce': 'Retail & Commerce',
};
