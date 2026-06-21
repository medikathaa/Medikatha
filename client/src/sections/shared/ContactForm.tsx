import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─────────────────────────────────────────────────────────────────
// GOOGLE FORM — INVISIBLE INTEGRATION
// ─────────────────────────────────────────────────────────────────
// To connect to your Google Form:
//   1. Open your Google Form → click Preview (eye icon)
//   2. Right-click the page → Inspect → find the <form action="..."> URL
//   3. Copy that URL into GOOGLE_FORM_ACTION_URL below
//   4. Each field has name="entry.XXXXXXX" — copy those into FIELD_IDS
// ─────────────────────────────────────────────────────────────────
const GOOGLE_FORM_ACTION_URL = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSeZnAcwY08QiLLMdZgW20FYjL9uqWWvnSagSSs1Ikq_NW60Aw/formResponse'
const FIELD_IDS = {
  name: 'entry.192657300',
  email: 'entry.1094618693',
  phone: 'entry.1945162831',
  message: 'entry.692984784', // You might need to update this entry ID for 'Message'
};

// ─────────────────────────────────────────────────────────────────
// FORM STEPS — matching the Medikatha website context
// ─────────────────────────────────────────────────────────────────
type FieldKey = keyof typeof FIELD_IDS;

interface Step {
  id: number;
  field: FieldKey;
  label: string;
  placeholder: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  hint: string;
  required: boolean;
  options?: string[];
}

const steps: Step[] = [
  {
    id: 1,
    field: 'name',
    label: 'Name',
    placeholder: 'Your Full Name',
    type: 'text',
    hint: 'How should we address you?',
    required: true,
  },
  {
    id: 2,
    field: 'email',
    label: 'Email',
    placeholder: 'your@email.com',
    type: 'email',
    hint: "We'll send your response here.",
    required: true,
  },
  {
    id: 3,
    field: 'phone',
    label: 'Phone Number',
    placeholder: '+91 98765 43210',
    type: 'tel',
    hint: 'Optional — for a quick introductory call.',
    required: false,
  },
  {
    id: 4,
    field: 'message',
    label: 'Message',
    placeholder: 'How can we help you?',
    type: 'textarea',
    hint: 'Please provide any relevant details.',
    required: true,
  },
];

type FormData = Record<FieldKey, string>;

async function submitToGoogleForms(data: FormData) {
  const body = new URLSearchParams(
    Object.entries(FIELD_IDS).reduce((acc, [key, entryId]) => {
      acc[entryId] = data[key as FieldKey] ?? '';
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

// ── Animation variants ────────────────────────────────────────────
const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
};

// ── Shared input styles ───────────────────────────────────────────
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

// ── Component ─────────────────────────────────────────────────────
export function ContactForm() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [formData, setFormData] = useState<FormData>(
    Object.fromEntries(Object.keys(FIELD_IDS).map(k => [k, ''])) as FormData
  );
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const current = steps[step];
  const value = formData[current.field];
  const isFirst = step === 0;
  const isLast = step === steps.length - 1;
  const canProgress = !current.required || value.trim() !== '';

  const go = (delta: number) => { setDir(delta); setStep(s => s + delta); };

  const handleNext = async () => {
    if (!canProgress) return;
    if (isLast) {
      setStatus('submitting');
      await submitToGoogleForms(formData);
      setStatus('success');
    } else {
      go(1);
    }
  };

  const setField = (val: string) =>
    setFormData(d => ({ ...d, [current.field]: val }));

  return (
    <div className="glass-card" style={{
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Progress strip */}
      {status !== 'success' && (
        <div style={{ height: 4, background: 'var(--bg-alt)' }}>
          <motion.div
            animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, var(--brand-blue), var(--brand-green))',
              borderRadius: 2,
            }}
          />
        </div>
      )}

      <div style={{ padding: '40px 40px 36px' }}>
        <AnimatePresence mode="wait">
          {/* ── SUCCESS STATE ── */}
          {status === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 80 }}
              style={{ textAlign: 'center', padding: '24px 0' }}
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
                Your communication roadmap begins now.
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55 }}
                className="text-body text-muted"
                style={{ fontSize: '0.95rem', lineHeight: 1.7 }}
              >
                We've received your inquiry and will reach out within 24 hours with a strategy starting point tailored to your challenge.
              </motion.p>
            </motion.div>
          ) : (
            /* ── STEP FORM ── */
            <motion.div
              key={step}
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Step label */}
              <div style={{
                fontFamily: 'var(--font-ui)', fontSize: '0.7rem', fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: '0.12em',
                color: 'var(--brand-blue)', marginBottom: 12,
              }}>
                Step {step + 1} of {steps.length}
                {!current.required && (
                  <span style={{ color: 'var(--text-muted)', fontWeight: 500, marginLeft: 8 }}>
                    (optional)
                  </span>
                )}
              </div>

              {/* Question */}
              <label
                htmlFor="form-field"
                className="text-display"
                style={{ display: 'block', fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', lineHeight: 1.2, marginBottom: 8, cursor: 'text' }}
              >
                {current.label}
              </label>
              <p className="text-body text-muted" style={{ fontSize: '0.875rem', marginBottom: 20, lineHeight: 1.6 }}>
                {current.hint}
              </p>

              {/* Input types */}
              {current.type === 'textarea' ? (
                <textarea
                  id="form-field"
                  value={value}
                  onChange={e => setField(e.target.value)}
                  placeholder={current.placeholder}
                  rows={4}
                  autoFocus
                  style={{ ...baseInput, resize: 'vertical', lineHeight: 1.6 }}
                  onFocus={e => focusStyle(e.target)}
                  onBlur={e => blurStyle(e.target)}
                />
              ) : current.type === 'select' ? (
                <select
                  id="form-field"
                  value={value}
                  onChange={e => setField(e.target.value)}
                  autoFocus
                  style={{ ...baseInput, cursor: 'pointer' }}
                  onFocus={e => focusStyle(e.target)}
                  onBlur={e => blurStyle(e.target)}
                >
                  <option value="" disabled>Select a service…</option>
                  {current.options?.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              ) : (
                <input
                  id="form-field"
                  type={current.type}
                  value={value}
                  onChange={e => setField(e.target.value)}
                  placeholder={current.placeholder}
                  autoFocus
                  onKeyDown={e => { if (e.key === 'Enter') handleNext(); }}
                  style={baseInput}
                  onFocus={e => focusStyle(e.target)}
                  onBlur={e => blurStyle(e.target)}
                />
              )}

              {/* Actions */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 24 }}>
                {!isFirst ? (
                  <motion.button
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    onClick={() => go(-1)}
                    style={{
                      padding: '10px 22px',
                      borderRadius: 'var(--radius-full)',
                      border: '1px solid var(--border-strong)',
                      background: 'transparent',
                      fontFamily: 'var(--font-ui)', fontSize: '0.875rem', fontWeight: 500,
                      color: 'var(--text-muted)', cursor: 'pointer',
                    }}
                  >← Back</motion.button>
                ) : <div />}

                <motion.button
                  whileHover={canProgress ? { scale: 1.03, y: -2 } : {}}
                  whileTap={canProgress ? { scale: 0.97 } : {}}
                  onClick={handleNext}
                  disabled={!canProgress || status === 'submitting'}
                  style={{
                    padding: '12px 32px',
                    borderRadius: 'var(--radius-full)',
                    border: 'none',
                    background: canProgress ? 'var(--brand-blue)' : 'var(--bg-alt)',
                    color: canProgress ? '#fff' : 'var(--text-muted)',
                    cursor: canProgress ? 'pointer' : 'default',
                    fontFamily: 'var(--font-ui)', fontWeight: 600, fontSize: '0.9rem',
                    boxShadow: canProgress ? '0 8px 24px rgba(15,108,207,0.3)' : 'none',
                    transition: 'all 0.25s ease',
                  }}
                >
                  {status === 'submitting'
                    ? 'Sending…'
                    : isLast
                      ? 'Send Message'
                      : current.required ? 'Continue →' : 'Skip →'}
                </motion.button>
              </div>

              {/* Step dots */}
              <div style={{ display: 'flex', gap: 5, marginTop: 20 }}>
                {steps.map((_, i) => (
                  <div key={i} style={{
                    height: 4, borderRadius: 2,
                    width: i === step ? 22 : 6,
                    background: i <= step ? 'var(--brand-blue)' : 'var(--border-strong)',
                    transition: 'all 0.3s ease',
                  }} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
