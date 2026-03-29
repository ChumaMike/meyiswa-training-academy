import { Metadata } from 'next';
import Link from 'next/link';
import SectionHeading from '@/components/ui/SectionHeading';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'About Meyiswa Training Academy — founded 2018 in Soweto. SETA-accredited, B-BBEE Level 1 EME, 60+ qualifications.',
};

const SETAS = [
  { name: 'MICT SETA', sector: 'IT & Digital' },
  { name: 'Services SETA', sector: 'Business & Services' },
  { name: 'LGSETA', sector: 'Local Government' },
  { name: 'ETDP SETA', sector: 'Education & Training' },
  { name: 'W&RSETA', sector: 'Retail & Commerce' },
  { name: 'AgriSETA', sector: 'Agriculture' },
  { name: 'QCTO', sector: 'Occupational Certificates' },
];

const CAMPUSES = [
  { name: 'Pimville Campus 1', address: 'Pimville, Soweto, Gauteng', note: 'Main Campus · Open Days Fridays 10AM–12PM' },
  { name: 'Pimville Campus 2', address: 'Pimville, Soweto, Gauteng', note: 'Second Soweto location' },
  { name: 'Roodepoort Campus', address: 'Roodepoort, Gauteng', note: 'West Rand campus' },
  { name: 'East London Campus', address: 'East London, Eastern Cape', note: 'Eastern Cape location' },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-mta-black py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            light
            title="About Meyiswa Training Academy"
            subtitle="Liberating the African Child Through Skills Development."
          />
        </div>
      </section>

      {/* Mission */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-heading font-bold text-mta-black mb-2">Who We Are</h2>
              <span className="block w-12 h-1 bg-mta-gold mb-5" />
              <p className="text-gray-600 leading-relaxed mb-4">
                Meyiswa Training Academy was founded in August 2018 in Pimville, Soweto, with a singular mission:
                to liberate South Africans through the power of skills development. We believe that qualifications
                are pathways — not just to jobs, but to dignity, independence and generational change.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                We are a multi-SETA accredited training provider offering 60+ NQF-registered qualifications
                across five faculties — from Information Technology to Retail & Commerce. Our learners come
                from all walks of life: school leavers, career-changers, working professionals seeking advancement,
                and companies investing in their people.
              </p>
              <p className="text-gray-600 leading-relaxed">
                As a <strong>B-BBEE Level 1 EME</strong>, we are 100% compliant and a preferred training partner
                for companies seeking to meet their skills development scorecard requirements.
              </p>
            </div>

            {/* Stats card */}
            <div className="bg-mta-black rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { val: '2018', lbl: 'Year Founded' },
                  { val: '60+', lbl: 'Qualifications' },
                  { val: '7', lbl: 'SETA Accreditations' },
                  { val: '4', lbl: 'Campuses' },
                  { val: 'Level 1', lbl: 'B-BBEE EME' },
                  { val: '100%', lbl: 'POPI Compliant' },
                ].map(({ val, lbl }) => (
                  <div key={lbl} className="bg-mta-gold/10 border border-mta-gold/20 rounded-xl p-4 text-center">
                    <p className="text-mta-gold text-2xl font-heading font-bold">{val}</p>
                    <p className="text-gray-400 text-xs mt-1">{lbl}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tagline section */}
      <section className="bg-mta-gold py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-mta-black mb-4">
            &ldquo;It&apos;s All Possible!&rdquo;
          </h2>
          <p className="text-mta-black/70 text-lg max-w-2xl mx-auto">
            Every learner who walks through our doors brings potential. Our job is to unlock it.
          </p>
        </div>
      </section>

      {/* Accreditations */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <SectionHeading title="SETA Accreditations" subtitle="Meyiswa Training Academy is accredited by 7 national SETA bodies and QCTO." />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {SETAS.map((seta) => (
              <div key={seta.name} className="bg-white border border-gray-200 rounded-xl p-5 text-center hover:border-mta-gold transition-colors">
                <p className="font-heading font-bold text-mta-black text-sm">{seta.name}</p>
                <p className="text-gray-500 text-xs mt-1">{seta.sector}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <SectionHeading title="Our Services" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {[
              'Learnerships', 'Leadership Development', 'Entrepreneurship Training',
              'Mindset Programmes', 'WSP & ATR Submission', 'Employee Equity Reporting',
              'Coaching & Mentoring', 'HR Outsourcing', 'Research & Consulting',
              'Recruitment', 'Soft Skills Training', 'Labour Consulting',
            ].map((service) => (
              <div key={service} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <span className="w-1.5 h-1.5 rounded-full bg-mta-gold flex-shrink-0" />
                <span className="text-sm text-gray-700">{service}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Campuses */}
      <section className="py-16 bg-mta-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <SectionHeading light title="Our Campuses" subtitle="Four locations across South Africa." />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CAMPUSES.map((campus) => (
              <div key={campus.name} className="bg-mta-gold/10 border border-mta-gold/20 rounded-xl p-5">
                <div className="text-mta-gold text-2xl mb-3">📍</div>
                <h3 className="font-heading font-bold text-white text-sm mb-1">{campus.name}</h3>
                <p className="text-gray-400 text-xs">{campus.address}</p>
                <p className="text-mta-gold/70 text-xs mt-1">{campus.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-heading font-bold text-mta-black mb-2">Ready to Start?</h2>
          <span className="block w-12 h-1 bg-mta-gold mb-5 mx-auto" />
          <p className="text-gray-600 mb-8">
            Browse our 60+ qualifications and apply for the 2026 intake. Walk in on any Friday between 10AM–12PM,
            or apply online now.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/courses" className="btn-primary">Browse Courses</Link>
            <Link href="/enrol" className="btn-secondary">Apply Now</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
