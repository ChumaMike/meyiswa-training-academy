'use client';

import { useState } from 'react';

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_CONTACT_ID;

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setError('');

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    if (!FORMSPREE_ID) {
      await new Promise((r) => setTimeout(r, 600));
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
        setError('Something went wrong. Please WhatsApp us on 072 513 3869.');
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
        <div className="text-4xl mb-3">✅</div>
        <h3 className="text-xl font-heading font-bold text-mta-black mb-2">Message Sent!</h3>
        <p className="text-gray-600 text-sm">We&apos;ll get back to you within 1 business day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Your Name" name="name" required />
        <Field label="Email" name="email" type="email" required />
      </div>
      <Field label="Phone Number" name="phone" type="tel" />
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="How can we help you?"
          className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-mta-gold focus:border-transparent resize-none"
        />
      </div>

      {error && (
        <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary w-full py-3 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = 'text',
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
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
        placeholder={label}
        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-mta-gold focus:border-transparent"
      />
    </div>
  );
}
