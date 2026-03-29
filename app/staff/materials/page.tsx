// Lecturer — Materials Upload
'use client';

import { useState } from 'react';

const UPLOADED_MATERIALS = [
  { id: 'M1', name: 'Lesson 1 — IT Fundamentals', course: 'IT Systems Support NQF5', uploaded: '2026-03-20', type: 'PDF', size: '2.4 MB' },
  { id: 'M2', name: 'Lab Exercise — Networking Basics', course: 'IT Systems Support NQF5', uploaded: '2026-03-22', type: 'ZIP', size: '15.8 MB' },
  { id: 'M3', name: 'Quiz 1 — Chapter 1-3', course: 'IT Technical Support NQF4', uploaded: '2026-03-18', type: 'PDF', size: '890 KB' },
];

export default function MaterialsUploadPage() {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className="p-8">
      <h1 className="font-heading font-bold text-white text-2xl mb-2">Materials Upload</h1>
      <p className="text-gray-400 text-sm mb-6">Upload lesson plans, assessments, and course materials for your students</p>

      {/* Upload Area */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => { e.preventDefault(); setIsDragging(false); }}
        className={`border-2 border-dashed rounded-xl p-8 mb-8 text-center transition-colors ${
          isDragging ? 'border-mta-gold bg-mta-gold/5' : 'border-gray-700 bg-gray-900'
        }`}
      >
        <div className="text-4xl mb-3">📁</div>
        <p className="text-white font-semibold mb-1">Drop files here or click to upload</p>
        <p className="text-gray-500 text-sm">Supports: PDF, ZIP, DOCX, PPTX, MP4 · Max 100 MB</p>
        <button className="mt-4 px-4 py-2 bg-mta-gold text-mta-black text-sm font-semibold rounded-lg hover:bg-mta-light-gold transition-colors">
          Choose File
        </button>
      </div>

      {/* Recent Uploads */}
      <h2 className="font-heading font-semibold text-white text-base mb-4">Recently Uploaded</h2>
      <div className="space-y-3">
        {UPLOADED_MATERIALS.map((m) => (
          <div key={m.id} className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <span className="text-2xl">{m.type === 'PDF' ? '📄' : m.type === 'ZIP' ? '🗜️' : '📁'}</span>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate">{m.name}</p>
                <p className="text-gray-500 text-xs">{m.course} · {m.uploaded} · {m.size}</p>
              </div>
            </div>
            <button className="text-mta-gold text-sm hover:underline shrink-0">Share →</button>
          </div>
        ))}
      </div>
    </div>
  );
}
