import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─────────────────────────────────────────────────────────────────
// GOOGLE FORM — INVISIBLE INTEGRATION (ENQUIRY FORM)
// ─────────────────────────────────────────────────────────────────
const GOOGLE_FORM_ACTION_URL =
  'https://docs.google.com/forms/u/0/d/e/1FAIpQLSdIY8vxTGlTt7YQFLS7v2NV3dHrgu1rmY7lGp6lo6GHO1TDXA/formResponse';

// Replace these with the actual entry IDs from your Enquiry Google Form
const FIELD_IDS = {
  name: 'entry.85562819',
  email: 'entry.1976391612',
  phone: 'entry.203500903',
  qualification: 'entry.1103029766',
  course: 'entry.665375324',
  message: 'entry.1504493008',
};

type FormData = Record<keyof typeof FIELD_IDS, string>;

async function submitToGoogleForms(data: FormData) {
  const body = new URLSearchParams(
    Object.entries(FIELD_IDS).reduce((acc, [key, entryId]) => {
      acc[entryId] = data[key as keyof typeof FIELD_IDS] ?? '';
      return acc;
    }, {} as Record<string, string>)
  );
  try {
    await fetch(GOOGLE_FORM_ACTION_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    });
  } catch { /* no-cors will always "fail" — data still posts */ }
}

// ─────────────────────────────────────────────────────────────────
// Shared input styles
// ─────────────────────────────────────────────────────────────────
const baseInput: React.CSSProperties = {
  width: '100%',
  padding: '14px 16px',
  borderRadius: 'var(--radius-md)',
  border: '1.5px solid var(--border-strong)',
  background: 'var(--bg-alt)',
  fontSize: '1rem',
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
  fontFamily: 'var(--font-body)',
  color: 'var(--text-primary)',
};

const focusStyle = (el: HTMLElement) => {
  el.style.borderColor = 'var(--brand-blue)';
  el.style.boxShadow = '0 0 0 3px rgba(15,108,207,0.12)';
};
const blurStyle = (el: HTMLElement) => {
  el.style.borderColor = 'var(--border-strong)';
  el.style.boxShadow = 'none';
};

const courses = [
  'PG Diploma in Clinical Research',
  'Clinical Research Coordinator (CRC) Program',
  'ICH-GCP Fastrack Program',
  'Ethics Committee Masterclass',
];

export function EnquiryForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    qualification: '',
    course: '',
    message: '',
  });

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    await submitToGoogleForms(formData);
    setStatus('success');
  };

  return (
    <div style={{
      background: 'var(--bg-secondary)',
      borderRadius: 'var(--radius-xl)',
      boxShadow: 'var(--shadow-float)',
      border: '1px solid var(--border)',
      overflow: 'hidden',
      position: 'relative',
      padding: '40px'
    }}>
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 80 }}
            style={{ textAlign: 'center', padding: '40px 0' }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 100, delay: 0.15 }}
              style={{
                width: 72, height: 72, borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--brand-green), #48a020)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 20px',
                fontSize: '2.2rem', color: '#fff',
                boxShadow: '0 0 40px rgba(102,186,60,0.35)',
              }}
            >✓</motion.div>
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="text-display"
              style={{ fontSize: '1.8rem', marginBottom: 12 }}
            >
              Enquiry Submitted!
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="text-body text-muted"
              style={{ fontSize: '0.95rem', lineHeight: 1.7 }}
            >
              We've received your course inquiry and will get back to you shortly with more details.
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <h3 className="text-display" style={{ fontSize: '1.6rem', marginBottom: '8px' }}>
              Interested in Our Courses?
            </h3>
            <p className="text-body text-muted" style={{ marginBottom: '24px' }}>
              Please fill in the following details:
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', fontWeight: 500 }}>Full Name</label>
                <input required type="text" value={formData.name} onChange={e => handleChange('name', e.target.value)} placeholder="e.g. Dr. Priya Sharma" style={baseInput} onFocus={e => focusStyle(e.target)} onBlur={e => blurStyle(e.target)} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', fontWeight: 500 }}>Email Address</label>
                  <input required type="email" value={formData.email} onChange={e => handleChange('email', e.target.value)} placeholder="priya@example.com" style={baseInput} onFocus={e => focusStyle(e.target)} onBlur={e => blurStyle(e.target)} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', fontWeight: 500 }}>Phone Number</label>
                  <input required type="tel" value={formData.phone} onChange={e => handleChange('phone', e.target.value)} placeholder="+91 98765 43210" style={baseInput} onFocus={e => focusStyle(e.target)} onBlur={e => blurStyle(e.target)} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', fontWeight: 500 }}>Qualification</label>
                <input required type="text" value={formData.qualification} onChange={e => handleChange('qualification', e.target.value)} placeholder="e.g. B.Pharm, MBBS, M.Sc" style={baseInput} onFocus={e => focusStyle(e.target)} onBlur={e => blurStyle(e.target)} />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', fontWeight: 500 }}>Interested Course</label>
                <select required value={formData.course} onChange={e => handleChange('course', e.target.value)} style={{ ...baseInput, cursor: 'pointer' }} onFocus={e => focusStyle(e.target)} onBlur={e => blurStyle(e.target)}>
                  <option value="" disabled>Select a course…</option>
                  {courses.map(course => (
                    <option key={course} value={course}>{course}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', fontWeight: 500 }}>Message / Query</label>
                <textarea required rows={4} value={formData.message} onChange={e => handleChange('message', e.target.value)} placeholder="Any specific questions..." style={{ ...baseInput, resize: 'vertical' }} onFocus={e => focusStyle(e.target)} onBlur={e => blurStyle(e.target)}></textarea>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={status === 'submitting'}
                style={{
                  marginTop: '12px',
                  padding: '14px 24px',
                  borderRadius: 'var(--radius-full)',
                  border: 'none',
                  background: 'var(--brand-blue)',
                  color: '#fff',
                  cursor: status === 'submitting' ? 'default' : 'pointer',
                  fontFamily: 'var(--font-ui)', fontWeight: 600, fontSize: '1rem',
                  boxShadow: '0 8px 24px rgba(15,108,207,0.3)',
                  transition: 'all 0.25s ease',
                  opacity: status === 'submitting' ? 0.7 : 1,
                }}
              >
                {status === 'submitting' ? 'Submitting...' : 'Enquire Now'}
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
