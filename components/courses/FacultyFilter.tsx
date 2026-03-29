'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { FACULTIES } from '@/lib/data/faculties';
import { FacultyId } from '@/lib/types';

export default function FacultyFilter({ active }: { active: string | null }) {
  const router = useRouter();

  const setFaculty = (id: FacultyId | null) => {
    if (id) {
      router.push(`/courses?faculty=${id}`, { scroll: false });
    } else {
      router.push('/courses', { scroll: false });
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => setFaculty(null)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
          !active
            ? 'bg-mta-gold text-mta-black border-mta-gold'
            : 'bg-white text-gray-600 border-gray-200 hover:border-mta-gold hover:text-mta-gold'
        }`}
      >
        All ({FACULTIES.reduce((sum, f) => sum + f.courseCount, 0)})
      </button>
      {FACULTIES.map((f) => (
        <button
          key={f.id}
          onClick={() => setFaculty(f.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
            active === f.id
              ? 'bg-mta-gold text-mta-black border-mta-gold'
              : 'bg-white text-gray-600 border-gray-200 hover:border-mta-gold hover:text-mta-gold'
          }`}
        >
          {f.icon} {f.shortLabel} ({f.courseCount})
        </button>
      ))}
    </div>
  );
}
