const KEYWORDS = [
  { keyword: 'IT', trigger: 'it, information technology, computers, software, coding, tech', brochure: 'Information Technology Faculty', faculty: 'IT' },
  { keyword: 'business', trigger: 'business, management, admin, government, finance', brochure: 'Business, Management & Government Faculty', faculty: 'Business' },
  { keyword: 'health', trigger: 'health, safety, ohs, community, environment, ecd', brochure: 'Health, Safety & Community Faculty', faculty: 'Health & Safety' },
  { keyword: 'HR', trigger: 'hr, human resources, project management, travel, marketing', brochure: 'HR, Professional & Occupational Faculty', faculty: 'HR & Professional' },
  { keyword: 'retail', trigger: 'retail, shop, store, sales, commerce, merchandise', brochure: 'Retail & Commerce Faculty', faculty: 'Retail' },
  { keyword: 'courses', trigger: 'courses, qualifications, programmes, study, learn', brochure: 'Full Prospectus (all faculties)', faculty: 'All' },
  { keyword: 'nqf', trigger: 'nqf, level, certificate, diploma', brochure: 'Full Prospectus (all faculties)', faculty: 'All' },
  { keyword: 'enrol', trigger: 'enrol, apply, register, sign up, start', brochure: 'Enrolment Form Link', faculty: 'All' },
  { keyword: 'fees', trigger: 'fees, cost, price, pay, how much', brochure: 'Contact + Fees Guide', faculty: 'All' },
  { keyword: 'seta', trigger: 'seta, accredited, recognised, funded, learnership', brochure: 'Full Prospectus (all faculties)', faculty: 'All' },
];

export default function BotKeywordsPage() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="font-heading font-bold text-white text-2xl">Bot Keywords</h1>
        <p className="text-gray-400 text-sm mt-1">
          When students send these keywords via WhatsApp, the bot sends the linked brochure automatically.
        </p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden mb-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left text-gray-500 font-medium px-5 py-3">Trigger Keywords</th>
              <th className="text-left text-gray-500 font-medium px-5 py-3 hidden sm:table-cell">Faculty</th>
              <th className="text-left text-gray-500 font-medium px-5 py-3">Brochure Sent</th>
            </tr>
          </thead>
          <tbody>
            {KEYWORDS.map((kw, i) => (
              <tr
                key={kw.keyword}
                className={`border-b border-gray-800 hover:bg-gray-800/50 transition-colors ${
                  i === KEYWORDS.length - 1 ? 'border-b-0' : ''
                }`}
              >
                <td className="px-5 py-3">
                  <code className="text-mta-gold bg-gray-800 px-2 py-0.5 rounded text-xs font-mono">{kw.keyword}</code>
                  <p className="text-gray-500 text-xs mt-1 leading-relaxed">{kw.trigger}</p>
                </td>
                <td className="px-5 py-3 text-gray-400 hidden sm:table-cell">{kw.faculty}</td>
                <td className="px-5 py-3 text-gray-300">{kw.brochure}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <p className="text-gray-500 text-sm">
          <span className="text-mta-gold font-medium">Note:</span> Keyword matching is case-insensitive and checks if the message contains the trigger phrase anywhere. To add or edit keywords, contact the system administrator — full keyword editing requires System 01 backend integration.
        </p>
      </div>
    </div>
  );
}
