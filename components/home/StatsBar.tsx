const STATS = [
  { value: '60+', label: 'Qualifications' },
  { value: '7', label: 'SETA Accreditations' },
  { value: 'Level 1', label: 'B-BBEE EME' },
  { value: '4', label: 'Campuses' },
  { value: '2018', label: 'Est. Soweto' },
];

export default function StatsBar() {
  return (
    <section className="bg-mta-gold py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
          {STATS.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-2">
              {i > 0 && <span className="hidden sm:block w-px h-6 bg-mta-black/20" />}
              <div className="text-center">
                <span className="font-heading font-bold text-mta-black text-lg">{stat.value} </span>
                <span className="text-mta-black/70 text-sm">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
