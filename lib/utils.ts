import { Course, FacultyId } from './types';
import { COURSES } from './data/courses';

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function getCourseBySlug(slug: string): Course | undefined {
  return COURSES.find((c) => c.slug === slug);
}

export function getCoursesByFaculty(faculty: FacultyId): Course[] {
  return COURSES.filter((c) => c.faculty === faculty);
}

export function getAllCourses(): Course[] {
  return COURSES;
}

export function getFeaturedCourses(): Course[] {
  return COURSES.filter((c) => c.featured);
}

export function formatNQF(level: number): string {
  return `NQF Level ${level}`;
}
