'use client';

import { useState } from 'react';

const MATERIALS = [
  { id: 'M01', name: 'IT Systems Support — Week 1 Notes.pdf', course: 'IT Systems Support NQF5', type: 'pdf', size: '2.4 MB', uploaded: '2026-03-01', shared: true },
  { id: 'M02', name: 'Hardware Fundamentals Slides.pptx', course: 'IT Systems Support NQF5', type: 'ppt', size: '8.1 MB', uploaded: '2026-03-05', shared: true },
  { id: 'M03', name: 'Module 2 Assessment Brief.docx', course: 'IT Systems Support NQF5', type: 'doc', size: '340 KB', uploaded: '2026-03-10', shared: false },
  { id: 'M04', name: 'Software Dev — Introduction to Python.pdf', course: 'Software Developer NQF5', type: 'pdf', size: '1.8 MB', uploaded: '2026-03-12', shared: true },
  { id: 'M05', name: 'Lab Exercise — Network Setup.docx', course: 'IT Systems Support NQF5', type: 'doc', size: '520 KB', uploaded: '2026-03-15', shared: true },
  { id: 'M06', name: 'Project Rubric Q1 2026.xlsx', course: 'Software Developer NQF5', type: 'xlsx', size: '210 KB', uploaded: '2026-03-18', shared: false },
  { id: 'M07', name: 'Cybersecurity Basics — Lecture 3.pdf', course: 'Cybersecurity Analyst NQF5', type: 'pdf', size: '3.2 MB', uploaded: '2026-03-20', shared: true },
];

const TYPE_ICONS: Record<string, string> = { pdf: '📄', ppt: '📊', doc: '📝', xlsx: '📋' };

export default function LecturerMaterialsPage() {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="font-heading font-bold text-white text-2xl">Course Materials</h1>
        <p className="text-gray-400 text-sm mt-1">{MATERIALS.length} files uploaded · {MATERIALS.filter(m => m.shared).length} shared with students</p>
      </div>

      {/* Upload area */}
      <div
        onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={() => setIsDragging(false)}
        className={`border-2 border-dashed rounded-xl p-8 text-center mb-6 transition-colors ${isDragging ? 'border-mta-gold bg-mta-gold/5' : 'border-gray-700 bg-gray-900/50'}`}
      >
        <p className="text-3xl mb-2">📁</p>
        <p className="text-gray-400 text-sm">Drag and drop files here, or</p>
        <button className="mt-3 bg-mta-gold text-mta-black text-sm font-semibold px-5 py-2 rounded-lg hover:bg-mta-light-gold transition-colors">Choose File</button>
        <p className="text-gray-600 text-xs mt-2">PDF, DOCX, PPTX, XLSX · Max 50MB</p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left text-gray-500 font-medium px-5 py-3">File</th>
              <th className="text-left text-gray-500 font-medium px-5 py-3 hidden md:table-cell">Course</th>
              <th className="text-left text-gray-500 font-medium px-5 py-3 hidden lg:table-cell">Size</th>
              <th className="text-left text-gray-500 font-medium px-5 py-3 hidden sm:table-cell">Uploaded</th>
              <th className="text-left text-gray-500 font-medium px-5 py-3">Shared</th>
            </tr>
          </thead>
          <tbody>
            {MATERIALS.map((m, i) => (
              <tr key={m.id} className={`border-b border-gray-800 hover:bg-gray-800/50 ${i === MATERIALS.length - 1 ? 'border-b-0' : ''}`}>
                <td className="px-5 py-3 flex items-center gap-2">
                  <span className="text-lg">{TYPE_ICONS[m.type]}</span>
                  <span className="text-gray-300 text-sm">{m.name}</span>
                </td>
                <td className="px-5 py-3 text-gray-500 text-xs hidden md:table-cell">{m.course}</td>
                <td className="px-5 py-3 text-gray-500 text-xs hidden lg:table-cell">{m.size}</td>
                <td className="px-5 py-3 text-gray-500 text-xs hidden sm:table-cell">{m.uploaded}</td>
                <td className="px-5 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${m.shared ? 'bg-green-900 text-green-300' : 'bg-gray-800 text-gray-500'}`}>
                    {m.shared ? 'Shared' : 'Private'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
