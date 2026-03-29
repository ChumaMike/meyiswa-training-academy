import { Metadata } from 'next';
import Link from 'next/link';
import { BROCHURES } from '@/lib/data/brochures';
import { FACULTIES, getFacultyById } from '@/lib/data/faculties';
import SectionHeading from '@/components/ui/SectionHeading';

export const metadata: Metadata = {
  title: 'Faculty Brochures',
  description: 'Download the Meyiswa Training Academy faculty brochures for all 5 faculties.',
};

export default function BrochuresPage() {
  return (
    <div>
      <section className="bg-mta-black py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            light
            title="Faculty Brochures"
            subtitle="Download detailed brochures for each of our 5 faculties — or WhatsApp us to receive them directly on your phone."
          />
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* WhatsApp CTA */}
          <div className="bg-mta-gold/10 border border-mta-gold/30 rounded-xl p-5 mb-10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-heading font-semibold text-mta-black">Get brochures on WhatsApp instantly</p>
              <p className="text-sm text-gray-600 mt-0.5">
                Message us the faculty name and we&apos;ll send the PDF brochure directly to your phone.
              </p>
            </div>
            <a
              href="https://wa.me/27725133869?text=Please%20send%20me%20the%20MTA%20faculty%20brochures"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary flex-shrink-0"
            >
              💬 WhatsApp Us Now
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BROCHURES.map((brochure) => {
              const faculty = getFacultyById(brochure.faculty);
              return (
                <div
                  key={brochure.id}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-mta-gold hover:shadow-md transition-all"
                >
                  {/* Header */}
                  <div className={`${faculty?.accentClass ?? 'bg-gray-800'} p-6`}>
                    <div className="text-4xl mb-3">{faculty?.icon}</div>
                    <h3 className="text-white font-heading font-bold text-base">{brochure.label}</h3>
                    <p className="text-gray-400 text-xs mt-1">{brochure.courseCount} qualifications</p>
                  </div>

                  <div className="p-5">
                    <p className="text-gray-600 text-sm leading-relaxed mb-5">{brochure.description}</p>

                    <div className="flex flex-col gap-2">
                      {brochure.available ? (
                        <a
                          href={`/brochures/${brochure.id}.pdf`}
                          download
                          className="btn-primary w-full text-center"
                        >
                          📥 Download PDF
                        </a>
                      ) : (
                        <div className="w-full text-center py-2.5 bg-gray-100 text-gray-500 text-sm rounded font-medium">
                          PDF Coming Soon
                        </div>
                      )}
                      <a
                        href={`https://wa.me/27725133869?text=Please%20send%20me%20the%20${encodeURIComponent(brochure.label)}%20brochure`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary w-full text-center"
                      >
                        💬 Request on WhatsApp
                      </a>
                      <Link
                        href={`/courses?faculty=${brochure.faculty}`}
                        className="text-center text-sm text-mta-gold hover:underline"
                      >
                        Browse {brochure.courseCount} courses online →
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
