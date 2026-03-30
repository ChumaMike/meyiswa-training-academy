import { getAllCourses, getCoursesByFaculty, getFeaturedCourses } from '@/lib/utils';
import { FACULTIES } from '@/lib/data/faculties';
import Badge from '@/components/ui/Badge';
import { FacultyId } from '@/lib/types';

export default function AdminCoursesPage({
  searchParams,
}: {
  searchParams: { faculty?: string; all?: string };
}) {
  const activeFaculty = searchParams.faculty as FacultyId | undefined;
  const showAll = searchParams.all === '1';

  const allCourses = activeFaculty ? getCoursesByFaculty(activeFaculty) : getAllCourses();
  const featured = activeFaculty ? allCourses : getFeaturedCourses();
  const courses = showAll || activeFaculty ? allCourses : featured;

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="font-heading font-bold text-white text-2xl">Course Catalogue</h1>
        <p className="text-gray-400 text-sm mt-1">
          {courses.length} courses shown · {getAllCourses().length} total qualifications across 5 faculties
        </p>
      </div>

      {/* Faculty filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <a
          href="/dashboard/courses"
          className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
            !activeFaculty
              ? 'bg-mta-gold text-mta-black border-mta-gold'
              : 'bg-gray-900 text-gray-400 border-gray-700 hover:border-gray-500 hover:text-gray-200'
          }`}
        >
          All ({getAllCourses().length})
        </a>
        {FACULTIES.map((f) => (
          <a
            key={f.id}
            href={`/dashboard/courses?faculty=${f.id}`}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              activeFaculty === f.id
                ? 'bg-mta-gold text-mta-black border-mta-gold'
                : 'bg-gray-900 text-gray-400 border-gray-700 hover:border-gray-500 hover:text-gray-200'
            }`}
          >
            {f.icon} {f.shortLabel} ({f.courseCount})
          </a>
        ))}
      </div>

      {/* Courses table */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left text-gray-500 font-medium px-5 py-3">Course</th>
              <th className="text-left text-gray-500 font-medium px-5 py-3 hidden sm:table-cell">NQF</th>
              <th className="text-left text-gray-500 font-medium px-5 py-3 hidden md:table-cell">SETA</th>
              <th className="text-left text-gray-500 font-medium px-5 py-3 hidden lg:table-cell">Duration</th>
              <th className="text-left text-gray-500 font-medium px-5 py-3">★</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((c, i) => (
              <tr
                key={c.id}
                className={`border-b border-gray-800 hover:bg-gray-800/50 transition-colors ${
                  i === courses.length - 1 ? 'border-b-0' : ''
                }`}
              >
                <td className="px-5 py-3">
                  <p className="text-white font-medium leading-snug">{c.title}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{c.qualification}</p>
                </td>
                <td className="px-5 py-3 hidden sm:table-cell">
                  <Badge variant="nqf">NQF {c.nqfLevel}</Badge>
                </td>
                <td className="px-5 py-3 hidden md:table-cell">
                  <Badge variant="seta">{c.seta}</Badge>
                </td>
                <td className="px-5 py-3 text-gray-400 hidden lg:table-cell">{c.duration}</td>
                <td className="px-5 py-3">
                  {c.featured ? (
                    <span className="text-mta-gold">★</span>
                  ) : (
                    <span className="text-gray-700">☆</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Show all toggle */}
      {!activeFaculty && !showAll && (
        <div className="mt-4 text-center">
          <a
            href="/dashboard/courses?all=1"
            className="text-mta-gold text-sm hover:underline"
          >
            Showing {featured.length} featured courses — click to view all {getAllCourses().length} →
          </a>
        </div>
      )}
      {!activeFaculty && showAll && (
        <div className="mt-4 text-center">
          <a href="/dashboard/courses" className="text-gray-500 text-sm hover:underline">
            ← Show featured courses only
          </a>
        </div>
      )}
    </div>
  );
}
