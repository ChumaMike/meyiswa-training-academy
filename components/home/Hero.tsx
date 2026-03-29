import Link from 'next/link';

export default function Hero() {
  return (
    <section className="bg-mta-black min-h-[85vh] flex items-center relative overflow-hidden">
      {/* Gold accent lines */}
      <div className="absolute top-0 left-0 w-1 h-full bg-mta-gold opacity-60" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-mta-gold/30" />

      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #D4A017 0, #D4A017 1px, transparent 0, transparent 50%)',
          backgroundSize: '20px 20px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: text */}
        <div>
          <div className="inline-flex items-center gap-2 bg-mta-gold/10 border border-mta-gold/30 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-mta-gold animate-pulse" />
            <span className="text-mta-gold text-sm font-medium">2026 Registration Now Open</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mb-6">
            Skills That{' '}
            <span className="text-mta-gold">Change Lives.</span>
            <br />
            <span className="text-mta-gold">Careers</span> That Last.
          </h1>

          <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg">
            Meyiswa Training Academy offers 60+ SETA-accredited qualifications across IT, Business, Health & Safety, HR and Retail.
            B-BBEE Level 1 EME. All NQF-registered.
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            <Link href="/courses" className="btn-primary text-base px-8 py-4">
              Browse Courses
            </Link>
            <Link href="/enrol" className="btn-outline text-base px-8 py-4">
              Apply Now
            </Link>
          </div>

          <div className="flex flex-wrap gap-6 text-sm text-gray-400">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-mta-gold" />
              SETA Accredited
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-mta-gold" />
              NQF Registered
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-mta-gold" />
              B-BBEE Level 1
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-mta-gold" />
              Since 2018
            </span>
          </div>
        </div>

        {/* Right: visual card */}
        <div className="relative hidden lg:block">
          <div className="relative">
            {/* Main card */}
            <div className="bg-mta-gold/10 border border-mta-gold/30 rounded-2xl p-8 backdrop-blur-sm">
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { num: '60+', label: 'Qualifications' },
                  { num: '7', label: 'SETA Bodies' },
                  { num: '4', label: 'Campuses' },
                  { num: 'L1', label: 'B-BBEE EME' },
                ].map(({ num, label }) => (
                  <div key={label} className="bg-mta-black/60 rounded-xl p-4 border border-mta-gold/20 text-center">
                    <p className="text-mta-gold text-3xl font-heading font-bold">{num}</p>
                    <p className="text-gray-400 text-xs mt-1">{label}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-mta-gold/20 pt-5">
                <p className="text-mta-gold font-heading font-semibold text-sm mb-3">Open Days</p>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-mta-gold rounded flex items-center justify-center flex-shrink-0">
                    <span className="text-mta-black text-xs font-bold">📅</span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Every Friday</p>
                    <p className="text-gray-400 text-xs">10AM – 12PM · Pimville, Soweto</p>
                    <p className="text-gray-500 text-xs">No appointment needed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating accent */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-mta-gold/20 rounded-full blur-xl" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-mta-gold/10 rounded-full blur-lg" />
          </div>
        </div>
      </div>
    </section>
  );
}
