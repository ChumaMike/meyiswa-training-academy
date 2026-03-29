const STAFF = [
  { id: 'S001', name: 'Thandile Meyiswa', role: 'Administrator', email: 'thandile@mta.co.za', phone: '+27 82 000 1111', access: ['Social', 'Students', 'Bot', 'Reports', 'Brochures', 'Staff'], status: 'active' },
  { id: 'S002', name: 'Chuma (Skhokho Labs)', role: 'Developer', email: 'chuma@skhokholabs.xyz', phone: '+27 79 000 2222', access: ['Social', 'Students', 'Bot', 'Courses', 'Brochures', 'Reports', 'Staff'], status: 'active' },
];

const ACCESS_COLORS: Record<string, string> = {
  Social: 'bg-purple-900 text-purple-300',
  Students: 'bg-blue-900 text-blue-300',
  Bot: 'bg-green-900 text-green-300',
  Courses: 'bg-yellow-900 text-yellow-300',
  Brochures: 'bg-orange-900 text-orange-300',
  Reports: 'bg-pink-900 text-pink-300',
  Staff: 'bg-red-900 text-red-300',
};

export default function StaffPage() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="font-heading font-bold text-white text-2xl">Staff Accounts</h1>
        <p className="text-gray-400 text-sm mt-1">
          {STAFF.length} active staff members · Access control managed here
        </p>
      </div>

      <div className="space-y-4 mb-6">
        {STAFF.map((s) => (
          <div key={s.id} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-mta-gold rounded-full flex items-center justify-center font-heading font-bold text-mta-black">
                  {s.name.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-semibold">{s.name}</p>
                  <p className="text-gray-500 text-sm">{s.role}</p>
                </div>
              </div>
              <span className="bg-green-900 text-green-300 text-xs px-2.5 py-0.5 rounded-full border border-green-800 shrink-0">
                Active
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4 text-sm">
              <div>
                <span className="text-gray-600">Email: </span>
                <span className="text-gray-300">{s.email}</span>
              </div>
              <div>
                <span className="text-gray-600">Phone: </span>
                <span className="text-gray-300">{s.phone}</span>
              </div>
            </div>
            <div>
              <p className="text-gray-500 text-xs mb-2">Access permissions:</p>
              <div className="flex flex-wrap gap-1.5">
                {s.access.map((a) => (
                  <span
                    key={a}
                    className={`text-xs px-2 py-0.5 rounded-full ${ACCESS_COLORS[a] ?? 'bg-gray-800 text-gray-400'}`}
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <p className="text-gray-500 text-sm">
          <span className="text-mta-gold font-medium">System 02:</span> Full staff management (add/remove accounts, role-based access control, audit logs) requires System 02 backend integration with Supabase Auth.
        </p>
      </div>
    </div>
  );
}
