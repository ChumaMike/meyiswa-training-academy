import { BROCHURES } from '@/lib/data/brochures';
import { FACULTY_LABELS } from '@/lib/data/faculties';

const FACULTY_ICONS: Record<string, string> = {
  'information-technology': '💻',
  'business-management': '📊',
  'health-safety-community': '🛡️',
  'hr-professional': '👥',
  'retail-commerce': '🛒',
};

export default function BrochuresAdminPage() {
  const available = BROCHURES.filter((b) => b.available).length;

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="font-heading font-bold text-white text-2xl">Faculty Brochures</h1>
        <p className="text-gray-400 text-sm mt-1">
          {available} of {BROCHURES.length} brochures live · {BROCHURES.length - available} pending design
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
        {BROCHURES.map((b) => (
          <div
            key={b.id}
            className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex flex-col"
          >
            <div className="flex items-start gap-3 mb-3">
              <span className="text-2xl">{FACULTY_ICONS[b.faculty]}</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-heading font-semibold text-white text-sm leading-snug">
                  {b.label}
                </h3>
                <p className="text-gray-500 text-xs mt-0.5">{b.courseCount} qualifications</p>
              </div>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed mb-4 flex-1">{b.description}</p>

            <div className="flex items-center justify-between">
              <span
                className={`text-xs px-2.5 py-1 rounded-full font-medium border ${
                  b.available
                    ? 'bg-green-900 text-green-300 border-green-800'
                    : 'bg-gray-800 text-gray-500 border-gray-700'
                }`}
              >
                {b.available ? '✓ Live' : '⏳ Pending Design'}
              </span>
              {b.available ? (
                <button className="text-mta-gold text-xs hover:underline">Download PDF →</button>
              ) : (
                <button
                  disabled
                  className="text-gray-600 text-xs cursor-not-allowed"
                >
                  Upload PDF
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <p className="text-gray-500 text-sm">
          <span className="text-mta-gold font-medium">System 08:</span> Faculty brochures are designed in Canva from the text content in{' '}
          <code className="text-gray-400 bg-gray-800 px-1.5 py-0.5 rounded text-xs">docs/faculty-brochures/</code>.
          Once PDFs are ready, they will be uploaded here and made available for student download. Awaiting Canva access from MTA.
        </p>
      </div>
    </div>
  );
}
