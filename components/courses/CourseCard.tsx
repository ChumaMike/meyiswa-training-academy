import Link from 'next/link';
import { Course } from '@/lib/types';
import Badge from '@/components/ui/Badge';
import { FACULTY_LABELS } from '@/lib/data/faculties';

export default function CourseCard({ course }: { course: Course }) {
  return (
    <Link
      href={`/courses/${course.slug}`}
      className="group block bg-white border border-gray-200 rounded-xl p-5 hover:border-mta-gold hover:shadow-md transition-all duration-200"
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <h3 className="font-heading font-semibold text-mta-black text-sm leading-snug group-hover:text-mta-dark-gold transition-colors line-clamp-2">
          {course.title}
        </h3>
        <Badge variant="nqf" className="flex-shrink-0">NQF {course.nqfLevel}</Badge>
      </div>

      <p className="text-gray-500 text-xs mb-3 line-clamp-2">{course.description}</p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        <Badge variant="seta">{course.seta}</Badge>
        <Badge variant="faculty">{course.qualification}</Badge>
      </div>

      <div className="flex items-center justify-between text-xs text-gray-400 border-t border-gray-100 pt-3">
        <span>{course.duration}</span>
        <span className="text-mta-gold font-medium group-hover:underline">View details →</span>
      </div>
    </Link>
  );
}
