import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { COURSES } from '@/lib/data/courses';
import { getCourseBySlug, getCoursesByFaculty } from '@/lib/utils';
import { getFacultyById, FACULTY_LABELS } from '@/lib/data/faculties';
import Badge from '@/components/ui/Badge';
import CourseCard from '@/components/courses/CourseCard';

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return COURSES.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const course = getCourseBySlug(params.slug);
  if (!course) return { title: 'Course Not Found' };
  return {
    title: course.title,
    description: course.description,
  };
}

export default function CourseDetailPage({ params }: Props) {
  const course = getCourseBySlug(params.slug);
  if (!course) notFound();

  const faculty = getFacultyById(course.faculty);
  const related = getCoursesByFaculty(course.faculty)
    .filter((c) => c.slug !== course.slug)
    .slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="bg-mta-black py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href={`/courses?faculty=${course.faculty}`}
            className="text-mta-gold text-sm hover:underline mb-4 inline-flex items-center gap-1"
          >
            ← {faculty?.label ?? 'Back to Courses'}
          </Link>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mt-2 mb-4">{course.title}</h1>
          <div className="flex flex-wrap gap-2">
            <Badge variant="nqf">NQF Level {course.nqfLevel}</Badge>
            <Badge variant="seta">{course.seta}</Badge>
            <span className="px-2.5 py-0.5 rounded text-xs font-medium bg-white/10 text-gray-300">
              {course.qualification}
            </span>
            <span className="px-2.5 py-0.5 rounded text-xs font-medium bg-white/10 text-gray-300">
              {course.duration}
            </span>
            <span className="px-2.5 py-0.5 rounded text-xs font-medium bg-white/10 text-gray-300">
              {course.credits} Credits
            </span>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div>
                <h2 className="text-xl font-heading font-bold text-mta-black mb-3">About this Qualification</h2>
                <span className="block w-8 h-1 bg-mta-gold mb-4" />
                <p className="text-gray-600 leading-relaxed">{course.description}</p>
              </div>

              {/* Outcomes */}
              <div>
                <h2 className="text-xl font-heading font-bold text-mta-black mb-3">What You Will Learn</h2>
                <span className="block w-8 h-1 bg-mta-gold mb-4" />
                <ul className="space-y-2">
                  {course.outcomes.map((outcome, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-600 text-sm">
                      <span className="w-5 h-5 rounded-full bg-mta-gold/20 border border-mta-gold text-mta-dark-gold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                        ✓
                      </span>
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Career paths */}
              <div>
                <h2 className="text-xl font-heading font-bold text-mta-black mb-3">Career Paths</h2>
                <span className="block w-8 h-1 bg-mta-gold mb-4" />
                <div className="flex flex-wrap gap-2">
                  {course.careerPaths.map((path) => (
                    <span
                      key={path}
                      className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-full"
                    >
                      {path}
                    </span>
                  ))}
                </div>
              </div>

              {/* Entry requirements */}
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <h2 className="text-base font-heading font-bold text-mta-black mb-2">Entry Requirements</h2>
                <p className="text-gray-600 text-sm">{course.entryRequirements}</p>
              </div>

              {/* SAQA */}
              <p className="text-xs text-gray-400">SAQA ID: {course.id}</p>
            </div>

            {/* Sidebar CTA */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-mta-black rounded-xl p-6 border border-mta-gold/30">
                <div className="text-center mb-5">
                  <div className="text-4xl mb-2">{faculty?.icon}</div>
                  <h3 className="text-white font-heading font-bold">Enrol in this Course</h3>
                  <p className="text-gray-400 text-xs mt-1">2026 intake open now</p>
                </div>

                <Link
                  href={`/enrol?course=${course.slug}`}
                  className="btn-primary w-full text-center block mb-3"
                >
                  Apply Now
                </Link>

                <a
                  href="https://wa.me/27725133869"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 border border-mta-gold/40 text-mta-gold rounded text-sm hover:bg-mta-gold/10 transition-colors"
                >
                  💬 WhatsApp Us
                </a>

                <div className="border-t border-white/10 mt-5 pt-5 space-y-2 text-xs text-gray-400">
                  <p className="flex items-center gap-2">
                    <span className="text-mta-gold">📞</span> 010 634 2503
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-mta-gold">📅</span> Open Days: Fridays 10AM–12PM
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-mta-gold">📍</span> Pimville, Soweto
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related courses */}
      {related.length > 0 && (
        <section className="py-12 bg-gray-50 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-heading font-bold text-mta-black mb-6">
              More {faculty?.label} Qualifications
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map((c) => (
                <CourseCard key={c.id + c.slug} course={c} />
              ))}
            </div>
            <div className="mt-6">
              <Link
                href={`/courses?faculty=${course.faculty}`}
                className="text-mta-gold text-sm hover:underline"
              >
                View all {faculty?.label} courses →
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
