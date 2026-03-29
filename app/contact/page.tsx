import { Metadata } from 'next';
import ContactForm from '@/components/forms/ContactForm';
import SectionHeading from '@/components/ui/SectionHeading';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Contact Meyiswa Training Academy — call, WhatsApp, email or visit one of our four campuses.',
};

export default function ContactPage() {
  return (
    <div>
      <section className="bg-mta-black py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            light
            title="Get in Touch"
            subtitle="Our team is ready to help you find the right qualification and start your journey."
          />
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact info */}
            <div>
              <h2 className="text-xl font-heading font-bold text-mta-black mb-2">Contact Information</h2>
              <span className="block w-10 h-1 bg-mta-gold mb-6" />

              <div className="space-y-5">
                <ContactItem icon="📞" label="Phone" value="010 634 2503">
                  <a href="tel:0106342503" className="text-mta-gold hover:underline">010 634 2503</a>
                </ContactItem>
                <ContactItem icon="💬" label="WhatsApp">
                  <a href="https://wa.me/27725133869" target="_blank" rel="noopener noreferrer" className="text-mta-gold hover:underline">
                    072 513 3869
                  </a>
                </ContactItem>
                <ContactItem icon="✉️" label="Email">
                  <a href="mailto:admin@meyiswa.co.za" className="text-mta-gold hover:underline">admin@meyiswa.co.za</a>
                </ContactItem>
                <ContactItem icon="🌐" label="Website">
                  <a href="https://meyiswatrainingacademy.co.za" target="_blank" rel="noopener noreferrer" className="text-mta-gold hover:underline">
                    meyiswatrainingacademy.co.za
                  </a>
                </ContactItem>
              </div>

              <div className="mt-8 bg-mta-gold/10 border border-mta-gold/30 rounded-xl p-5">
                <h3 className="font-heading font-bold text-mta-black mb-3">📅 Open Days</h3>
                <p className="text-gray-700 text-sm">
                  <strong>Every Friday, 10AM – 12PM</strong><br />
                  Pimville Campus, Soweto
                </p>
                <p className="text-gray-500 text-xs mt-2">No appointment needed. Walk in and register on the spot.</p>
              </div>

              <div className="mt-6">
                <h3 className="font-heading font-bold text-mta-black mb-3">📍 Our Campuses</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Pimville Campus 1', location: 'Pimville, Soweto, Gauteng' },
                    { name: 'Pimville Campus 2', location: 'Pimville, Soweto, Gauteng' },
                    { name: 'Roodepoort Campus', location: 'Roodepoort, Gauteng' },
                    { name: 'East London Campus', location: 'East London, Eastern Cape' },
                  ].map((c) => (
                    <div key={c.name} className="flex items-start gap-2 text-sm">
                      <span className="text-mta-gold mt-0.5">▸</span>
                      <div>
                        <span className="font-medium text-mta-black">{c.name}</span>
                        <span className="text-gray-500 ml-2">{c.location}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <a
                  href="https://wa.me/27725133869?text=Hi%20MTA%2C%20I%27d%20like%20to%20enquire%20about%20your%20qualifications"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  💬 WhatsApp Us Now
                </a>
              </div>
            </div>

            {/* Form */}
            <div>
              <h2 className="text-xl font-heading font-bold text-mta-black mb-2">Send Us a Message</h2>
              <span className="block w-10 h-1 bg-mta-gold mb-6" />
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ContactItem({
  icon,
  label,
  children,
  value,
}: {
  icon: string;
  label: string;
  children?: React.ReactNode;
  value?: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 bg-mta-black rounded-lg flex items-center justify-center flex-shrink-0">
        <span>{icon}</span>
      </div>
      <div>
        <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{label}</p>
        <div className="text-sm mt-0.5">{children || value}</div>
      </div>
    </div>
  );
}
