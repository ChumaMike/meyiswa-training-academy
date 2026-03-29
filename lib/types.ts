export type FacultyId =
  | 'information-technology'
  | 'business-management'
  | 'health-safety-community'
  | 'hr-professional'
  | 'retail-commerce';

export type NQFLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type SETA =
  | 'MICT SETA'
  | 'Services SETA'
  | 'LGSETA'
  | 'ETDP SETA'
  | 'W&RSETA'
  | 'AgriSETA'
  | 'QCTO';

export interface Course {
  id: string;
  slug: string;
  title: string;
  qualification: string;
  nqfLevel: NQFLevel;
  credits: number;
  duration: string;
  faculty: FacultyId;
  seta: SETA;
  description: string;
  outcomes: string[];
  entryRequirements: string;
  careerPaths: string[];
  featured: boolean;
}

export interface FacultyMeta {
  id: FacultyId;
  label: string;
  shortLabel: string;
  description: string;
  seta: SETA[];
  courseCount: number;
  icon: string;
  accentClass: string;
}

export interface Testimonial {
  id: string;
  name: string;
  course: string;
  faculty: FacultyId;
  quote: string;
  year: number;
  location: string;
}

export interface BrochureDownload {
  id: string;
  faculty: FacultyId;
  label: string;
  description: string;
  courseCount: number;
  available: boolean;
}
