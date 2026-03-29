import Link from 'next/link';
import { FACULTIES } from '@/lib/data/faculties';

export default function FacultyCards() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-mta-black pb-2">
            Our Faculties
          </h2>
          <span className="block w-12 h-1 bg-mta-gold mb-4" />
          <p className="text-gray-600 text-lg max-w-2xl">
            Five specialist faculties, seven SETA accrediting bodies, 60+ nationally registered qualifications.
            Find your path.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FACULTIES.map((faculty) => (
            <Link
              key={faculty.id}
              href={`/courses?faculty=${faculty.id}`}
              className="group block bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-mta-gold hover:shadow-lg transition-all duration-200"
            >
              {/* Card header */}
              <div className={`${faculty.accentClass} p-6 relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-24 h-24 bg-mta-gold/10 rounded-full -translate-y-8 translate-x-8" />
                <div className="text-4xl mb-3">{faculty.icon}</div>
                <h3 className="text-white font-heading font-bold text-lg leading-tight group-hover:text-mta-gold transition-colors">
                  {faculty.label}
                </h3>
              </div>

              {/* Card body */}
              <div className="p-5">
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{faculty.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {faculty.seta.map((s) => (
                      <span key={s} className="text-xs bg-mta-gold/10 text-mta-dark-gold font-medium px-2 py-0.5 rounded">
                        {s}
                      </span>
                    ))}
                  </div>
                  <span className="text-mta-black font-heading font-bold text-sm whitespace-nowrap ml-2">
                    {faculty.courseCount} courses →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
