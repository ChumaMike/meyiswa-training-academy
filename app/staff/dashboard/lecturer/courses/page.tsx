const LECTURER_COURSES = [
  { id: 1, name: 'IT Systems Support NQF5', faculty: 'IT', students: 28, schedule: 'Mon-Wed', progress: 65 },
  { id: 2, name: 'IT Technical Support NQF4', faculty: 'IT', students: 32, schedule: 'Tue-Thu', progress: 52 },
  { id: 3, name: 'IT Systems Development NQF4', faculty: 'IT', students: 25, schedule: 'Mon-Wed', progress: 48 },
];

export default function LecturerCoursesPage() {
  return (
    <div className="p-8">
      <h1 className="font-heading font-bold text-white text-2xl mb-2">My Courses</h1>
      <p className="text-gray-400 text-sm mb-6">Manage your courses and track student progress</p>

      <div className="space-y-4">
        {LECTURER_COURSES.map((course) => (
          <div key={course.id} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-white font-semibold">{course.name}</h3>
                <p className="text-gray-500 text-sm mt-1">{course.faculty} Faculty</p>
              </div>
              <button className="bg-mta-gold text-mta-black px-3 py-1 rounded text-sm font-semibold hover:bg-mta-light-gold">View →</button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-gray-500 text-xs">Students</p>
                <p className="text-white font-bold text-lg">{course.students}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Schedule</p>
                <p className="text-gray-300 text-sm">{course.schedule}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Progress</p>
                <p className="text-white font-bold text-lg">{course.progress}%</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
