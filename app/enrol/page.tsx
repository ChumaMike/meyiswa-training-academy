import { Metadata } from 'next';
import EnrolForm from '@/components/forms/EnrolForm';
import SectionHeading from '@/components/ui/SectionHeading';

export const metadata: Metadata = {
  title: 'Apply / Enrol',
  description: 'Apply for a SETA-accredited qualification at Meyiswa Training Academy. 2026 intake is open.',
};

export default function EnrolPage() {
  return (
    <div>
      <section className="bg-mta-black py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            light
            title="Apply for 2026 Intake"
            subtitle="Fill in the form below and our team will contact you within 1 business day to confirm your enrolment."
          />
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-mta-gold/10 border border-mta-gold/30 rounded-xl p-4 mb-8 flex items-center gap-3">
            <span className="text-xl">📅</span>
            <p className="text-sm text-mta-black">
              <strong>Open Days every Friday, 10AM–12PM</strong> at Pimville Campus, Soweto.
              Walk in and register in person — no appointment needed.
            </p>
          </div>
          <EnrolForm />
        </div>
      </section>
    </div>
  );
}
