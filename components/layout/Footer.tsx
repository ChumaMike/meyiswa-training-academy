import Link from 'next/link';

const SETA_BADGES = ['MICT SETA', 'Services SETA', 'LGSETA', 'ETDP SETA', 'W&RSETA', 'AgriSETA', 'QCTO'];

export default function Footer() {
  return (
    <footer className="bg-mta-black text-gray-300">
      {/* SETA bar */}
      <div className="border-t border-mta-gold/30 bg-black/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center gap-2 justify-center">
            <span className="text-mta-gold text-xs font-medium mr-2">Accredited by:</span>
            {SETA_BADGES.map((seta) => (
              <span
                key={seta}
                className="px-2 py-1 border border-mta-gold/40 text-mta-gold text-xs rounded font-medium"
              >
                {seta}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-mta-gold rounded flex items-center justify-center">
                <span className="text-mta-black font-heading font-bold text-xs">MTA</span>
              </div>
              <span className="text-white font-heading font-bold text-sm">Meyiswa Training Academy</span>
            </div>
            <p className="text-sm text-gray-400 mb-3 leading-relaxed">
              Liberating the African Child Through Skills Development.
            </p>
            <p className="text-mta-gold text-sm font-medium">&ldquo;It&apos;s All Possible!&rdquo;</p>
            <p className="text-xs text-gray-500 mt-2">B-BBEE Level 1 EME · Founded 2018</p>
          </div>

          {/* Courses */}
          <div>
            <h3 className="text-white font-heading font-semibold text-sm mb-4">Faculties</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/courses?faculty=information-technology" className="hover:text-mta-gold">Information Technology</Link></li>
              <li><Link href="/courses?faculty=business-management" className="hover:text-mta-gold">Business & Management</Link></li>
              <li><Link href="/courses?faculty=health-safety-community" className="hover:text-mta-gold">Health, Safety & Community</Link></li>
              <li><Link href="/courses?faculty=hr-professional" className="hover:text-mta-gold">HR & Professional</Link></li>
              <li><Link href="/courses?faculty=retail-commerce" className="hover:text-mta-gold">Retail & Commerce</Link></li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-heading font-semibold text-sm mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/enrol" className="hover:text-mta-gold">Apply / Enrol</Link></li>
              <li><Link href="/brochures" className="hover:text-mta-gold">Download Brochures</Link></li>
              <li><Link href="/about" className="hover:text-mta-gold">About MTA</Link></li>
              <li><Link href="/contact" className="hover:text-mta-gold">Contact Us</Link></li>
              <li>
                <a href="https://wa.me/27725133869" target="_blank" rel="noopener noreferrer" className="hover:text-mta-gold">
                  WhatsApp Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-heading font-semibold text-sm mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="tel:0106342503" className="hover:text-mta-gold">📞 010 634 2503</a>
              </li>
              <li>
                <a href="https://wa.me/27725133869" className="hover:text-mta-gold">💬 072 513 3869 (WhatsApp)</a>
              </li>
              <li>
                <a href="mailto:admin@meyiswa.co.za" className="hover:text-mta-gold">✉️ admin@meyiswa.co.za</a>
              </li>
              <li className="text-gray-400 pt-1">
                <strong className="text-gray-300">Open Days:</strong><br />
                Fridays 10AM–12PM<br />
                Pimville, Soweto
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Meyiswa Training Academy. All rights reserved.</p>
          <p>
            <a href="https://meyiswatrainingacademy.co.za" target="_blank" rel="noopener noreferrer" className="hover:text-mta-gold">
              meyiswatrainingacademy.co.za
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
