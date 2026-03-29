const CLIENTS = ['AECI', 'Alex Forbes', 'Nashua', 'Servest', 'Woolworths', 'SARS', 'City of Johannesburg'];

export default function ClientLogos() {
  return (
    <section className="py-12 bg-mta-black border-t border-mta-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-500 text-xs font-medium uppercase tracking-widest mb-6">
          Trusted by organisations across South Africa
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
          {CLIENTS.map((name) => (
            <span
              key={name}
              className="text-gray-400 font-heading font-semibold text-sm sm:text-base opacity-60 hover:opacity-100 hover:text-mta-gold transition-all"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
