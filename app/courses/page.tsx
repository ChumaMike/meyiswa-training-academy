import { Suspense } from 'react';
import { Metadata } from 'next';
import { COURSES } from '@/lib/data/courses';
import { FACULTIES, getFacultyById } from '@/lib/data/faculties';
import { FacultyId } from '@/lib/types';
import CourseCard from '@/components/courses/CourseCard';
import FacultyFilter from '@/components/courses/FacultyFilter';
import SectionHeading from '@/components/ui/SectionHeading';

export const metadata: Metadata = {
  title: 'All Courses',
  description: 'Browse 60+ SETA-accredited qualifications at Meyiswa Training Academy across IT, Business, Health & Safety, HR and Retail.',
};

interface Props {
  searchParams: { faculty?: string };
}

export default function CoursesPage({ searchParams }: Props) {
  const facultyParam = searchParams.faculty as FacultyId | undefined;
  const faculty = facultyParam ? getFacultyById(facultyParam) : null;

  const courses = facultyParam
    ? COURSES.filter((c) => c.faculty === facultyParam)
    : COURSES;

  return (
    <div>
      {/* Header */}
      <section className="bg-mta-black py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            light
            title={faculty ? faculty.label : 'All Qualifications'}
            subtitle={
              faculty
                ? `${faculty.courseCount} ${faculty.seta.join(' + ')} accredited qualifications`
                : `60+ qualifications across 5 faculties and 7 SETA accrediting bodies`
            }
          />
        </div>
      </section>

      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter */}
          <div className="mb-8">
            <Suspense>
              <FacultyFilter active={facultyParam ?? null} />
            </Suspense>
          </div>

          {/* Results count */}
          <p className="text-gray-500 text-sm mb-6">
            Showing <strong>{courses.length}</strong> qualification{courses.length !== 1 ? 's' : ''}
            {faculty ? ` in ${faculty.label}` : ''}
          </p>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {courses.map((course) => (
              <CourseCard key={course.id + course.slug} course={course} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
