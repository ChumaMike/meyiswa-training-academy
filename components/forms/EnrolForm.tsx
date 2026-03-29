'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { FACULTIES } from '@/lib/data/faculties';
import { COURSES } from '@/lib/data/courses';
import { FacultyId } from '@/lib/types';

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ENROL_ID;

const HOW_HEARD = [
  'Social Media (Facebook / Instagram)',
  'WhatsApp',
  'Word of mouth / Friend / Family',
  'Google / Internet search',
  'Open Day',
  'Flyer / Poster',
  'Other',
];

const EMPLOYMENT_STATUS = [
  'Employed (looking to upskill)',
  'Unemployed (seeking work)',
  'Student',
  'Self-employed',
  'Other',
];

function EnrolFormInner() {
  const searchParams = useSearchParams();
  const preselectedCourse = searchParams.get('course');

  const [faculty, setFaculty] = useState<FacultyId | ''>('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const facultyCourses = faculty ? COURSES.filter((c) => c.faculty === faculty) : [];

  useEffect(() => {
    if (preselectedCourse) {
      const course = COURSES.find((c) => c.slug === preselectedCourse);
      if (course) setFaculty(course.faculty);
    }
  }, [preselectedCourse]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setError('');

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    if (!FORMSPREE_ID) {
      // Demo mode: just show success
      await new Promise((r) => setTimeout(r, 800));
      setStatus('success');
      return;
    }

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus('success');
      } else {
        setError('Something went wrong. Please try again or WhatsApp us on 072 513 3869.');
        setStatus('error');
      }
    } catch {
      setError('Network error. Please try again.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-mta-gold/10 border border-mta-gold rounded-xl p-8 text-center">
        <div className="text-5xl mb-4">🎉</div>
        <h2 className="text-2xl font-heading font-bold text-mta-black mb-2">Application Received!</h2>
        <p className="text-gray-600 mb-4">
          Thank you for applying to Meyiswa Training Academy. Our team will contact you within 1 business day to confirm your enrolment.
        </p>
        <p className="text-sm text-gray-500">
          Questions? WhatsApp us at{' '}
          <a href="https://wa.me/27725133869" className="text-mta-gold underline">
            072 513 3869
          </a>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Section 1: Personal */}
      <div>
        <h3 className="font-heading font-bold text-mta-black mb-4 pb-2 border-b border-gray-200">
          1. Personal Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="First Name" name="firstName" required />
          <Field label="Last Name" name="lastName" required />
          <Field label="South African ID Number" name="idNumber" />
          <Field label="Date of Birth" name="dob" type="date" />
        </div>
      </div>

      {/* Section 2: Contact */}
      <div>
        <h3 className="font-heading font-bold text-mta-black mb-4 pb-2 border-b border-gray-200">
          2. Contact Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Cell Phone" name="phone" type="tel" required />
          <Field label="Email Address" name="email" type="email" required />
          <div className="sm:col-span-2">
            <Field label="Physical Address" name="address" />
          </div>
        </div>
      </div>

      {/* Section 3: Course */}
      <div>
        <h3 className="font-heading font-bold text-mta-black mb-4 pb-2 border-b border-gray-200">
          3. Course Selection
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Faculty</label>
            <select
              name="faculty"
              value={faculty}
              onChange={(e) => setFaculty(e.target.value as FacultyId)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-mta-gold focus:border-transparent"
              required
            >
              <option value="">Select a faculty…</option>
              {FACULTIES.map((f) => (
                <option key={f.id} value={f.id}>{f.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
            <select
              name="course"
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-mta-gold focus:border-transparent"
              required
              defaultValue={preselectedCourse ?? ''}
            >
              <option value="">Select a course…</option>
              {facultyCourses.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.title} — NQF {c.nqfLevel}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Section 4: Background */}
      <div>
        <h3 className="font-heading font-bold text-mta-black mb-4 pb-2 border-b border-gray-200">
          4. Background
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Highest Qualification</label>
            <input
              name="highestQualification"
              type="text"
              placeholder="e.g. Matric / NQF Level 4"
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-mta-gold focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Employment Status</label>
            <select
              name="employmentStatus"
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-mta-gold focus:border-transparent"
            >
              <option value="">Select…</option>
              {EMPLOYMENT_STATUS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">How did you hear about MTA?</label>
            <select
              name="howHeard"
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-mta-gold focus:border-transparent"
            >
              <option value="">Select…</option>
              {HOW_HEARD.map((h) => (
                <option key={h} value={h}>{h}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Section 5: Declaration */}
      <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="declaration"
            required
            className="mt-0.5 w-4 h-4 rounded border-gray-300 text-mta-gold focus:ring-mta-gold"
          />
          <span className="text-sm text-gray-600">
            I confirm that the information provided is accurate and I consent to Meyiswa Training Academy
            processing my personal information in accordance with POPI Act requirements.
          </span>
        </label>
      </div>

      {error && (
        <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary w-full py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Submitting…' : 'Submit Application'}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = 'text',
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder ?? label}
        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-mta-gold focus:border-transparent"
      />
    </div>
  );
}

export default function EnrolForm() {
  return (
    <Suspense fallback={<div className="animate-pulse bg-gray-100 rounded-xl h-96" />}>
      <EnrolFormInner />
    </Suspense>
  );
}
