import { BrochureDownload } from '../types';

export const BROCHURES: BrochureDownload[] = [
  {
    id: 'it-brochure',
    faculty: 'information-technology',
    label: 'Information Technology Faculty',
    description: 'All 15 MICT SETA-accredited IT qualifications — from End User Computing to Cybersecurity Analyst and Software Developer.',
    courseCount: 15,
    available: false,
  },
  {
    id: 'business-brochure',
    faculty: 'business-management',
    label: 'Business, Management & Government Faculty',
    description: 'All 14 qualifications across Services SETA and LGSETA — from Business Administration to Public Finance Management and Generic Management.',
    courseCount: 14,
    available: false,
  },
  {
    id: 'health-brochure',
    faculty: 'health-safety-community',
    label: 'Health, Safety & Community Faculty',
    description: 'All 10 QCTO and AgriSETA qualifications — from Commercial Cleaner to Environmental Science Technician and Health & Safety Practitioner.',
    courseCount: 10,
    available: false,
  },
  {
    id: 'hr-brochure',
    faculty: 'hr-professional',
    label: 'HR, Professional & Occupational Faculty',
    description: 'All 17 qualifications across QCTO and ETDP SETA — from HR Administrator to HR Management Advisor (NQF 7) and Project Manager.',
    courseCount: 17,
    available: false,
  },
  {
    id: 'retail-brochure',
    faculty: 'retail-commerce',
    label: 'Retail & Commerce Faculty',
    description: 'All 15 W&RSETA and QCTO qualifications — from Retail Sales Advisor to Retail Store Manager (NQF 6) and Buyer.',
    courseCount: 15,
    available: false,
  },
];
