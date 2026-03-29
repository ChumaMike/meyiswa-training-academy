import { TESTIMONIALS } from '@/lib/data/testimonials';
import { FACULTY_LABELS } from '@/lib/data/faculties';
import SectionHeading from '@/components/ui/SectionHeading';

export default function Testimonials() {
  const featured = TESTIMONIALS.slice(0, 3);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <SectionHeading
            title="Student Stories"
            subtitle="Real stories from real people who chose MTA and changed their lives."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((t) => (
            <div key={t.id} className="bg-white rounded-xl p-6 border border-gray-200 hover:border-mta-gold hover:shadow-md transition-all">
              <div className="text-mta-gold text-4xl font-heading font-bold leading-none mb-4">&ldquo;</div>
              <p className="text-gray-700 text-sm leading-relaxed mb-5 italic">{t.quote}</p>
              <div className="border-t border-gray-100 pt-4">
                <p className="font-heading font-semibold text-mta-black text-sm">{t.name}</p>
                <p className="text-mta-gold text-xs font-medium">{t.course}</p>
                <p className="text-gray-400 text-xs mt-0.5">{t.location} · {t.year}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
