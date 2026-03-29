import Link from 'next/link';

export default function OpenDayBanner() {
  return (
    <section className="bg-mta-gold py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-mta-black/20 rounded-full flex items-center justify-center">
              <span className="text-xl">📅</span>
            </div>
            <div>
              <p className="text-mta-black font-heading font-bold">Open Days — Every Friday, 10AM–12PM</p>
              <p className="text-mta-black/70 text-sm">Pimville Campus, Soweto · No appointment needed · Walk in and register</p>
            </div>
          </div>
          <Link href="/contact" className="btn-secondary flex-shrink-0">
            Get Directions
          </Link>
        </div>
      </div>
    </section>
  );
}
