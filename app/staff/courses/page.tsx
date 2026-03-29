// Lecturer — My Courses
const MY_COURSES = [
  { id: 'C1', name: 'IT Systems Support NQF5', faculty: 'Information Technology', students: 25, startDate: '2026-04-01', status: 'active' },
  { id: 'C2', name: 'IT Systems Support NQF5', faculty: 'Information Technology', students: 22, startDate: '2026-04-15', status: 'active' },
  { id: 'C3', name: 'IT Technical Support NQF4', faculty: 'Information Technology', students: 18, startDate: '2026-03-15', status: 'active' },
];

export default function LecturerCoursesPage() {
  return (
    <div className="p-8">
      <h1 className="font-heading font-bold text-white text-2xl mb-2">My Courses</h1>
      <p className="text-gray-400 text-sm mb-6">{MY_COURSES.length} courses assigned · {MY_COURSES.reduce((s, c) => s + c.students, 0)} total students</p>

      <div className="space-y-4">
        {MY_COURSES.map((course) => (
          <div key={course.id} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-white font-semibold">{course.name}</h3>
                <p className="text-gray-500 text-sm mt-0.5">{course.faculty}</p>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-green-900 text-green-300 border border-green-800">
                {course.status}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-gray-800">
              <div>
                <p className="text-gray-500 text-xs">Students</p>
                <p className="text-white font-bold text-lg">{course.students}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Start Date</p>
                <p className="text-white font-bold">{course.startDate}</p>
              </div>
              <button className="col-span-2 text-mta-gold text-sm hover:underline">
                View Course Details →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
