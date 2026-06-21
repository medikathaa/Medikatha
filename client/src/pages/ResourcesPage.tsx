import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { usePageSeo } from '../lib/seo';
import { faqs } from '../data/faqs';

const RESOURCE_COLORS = ['#0f6ccf', '#66ba3c', '#e03a3a', '#9b59b6'];

const resources = [
  { icon: '📋', label: 'Medical Content QA Checklist', color: '#0f6ccf', desc: 'A systematic checklist for verifying clinical accuracy before publication.' },
  { icon: '📊', label: 'Patient Readability Benchmarks', color: '#66ba3c', desc: 'Grade-level readability standards for patient-facing healthcare content.' },
  { icon: '🔍', label: 'SEO Standards for Healthcare', color: '#e03a3a', desc: 'Search-optimised content guidelines tailored for medical websites.' },
  { icon: '⚖️', label: 'Ethical Language Guide', color: '#9b59b6', desc: 'Approved language framework for responsible medicine communication.' },
];

function FaqAccordion({ item, index }: { item: { q: string; a: string }; index: number }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const color = RESOURCE_COLORS[index % RESOURCE_COLORS.length];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={() => setOpen(o => !o)}
      style={{
        borderRadius: 14,
        border: `1px solid ${open ? color : 'var(--border)'}`,
        background: 'var(--bg-secondary)',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'border-color 0.25s',
      }}
    >
      {/* Thin top line */}
      {open && <div style={{ height: 3, background: color }} />}

      <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        <span style={{ fontFamily: 'var(--font-ui)', fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
          {item.q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          style={{ color, fontSize: '1.2rem', flexShrink: 0, lineHeight: 1 }}
        >
          +
        </motion.span>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{
              padding: '0 20px 18px',
              fontFamily: 'var(--font-body)', fontSize: '0.9rem',
              lineHeight: 1.75, color: 'var(--text-muted)',
            }}>
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function ResourcesPage() {
  usePageSeo({
    title: 'Resources and FAQs',
    description: 'Get Medikatha resources including communication FAQs, content standards, and deployment readiness checkpoints.',
    path: '/resources',
  });

  return (
    <main>
      {/* ── Banner ── */}
      <section style={{ padding: '80px 0 60px', position: 'relative', overflow: 'hidden' }}>
        <motion.div
          animate={{ scale: [1, 1.12, 1], opacity: [0.1, 0.18, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', top: '-20%', right: '-5%', width: 420, height: 420,
            borderRadius: '50%', background: 'radial-gradient(circle, #9b59b6 0%, transparent 70%)',
            filter: 'blur(60px)', pointerEvents: 'none',
          }}
        />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16,
              fontFamily: 'var(--font-ui)', fontSize: '0.72rem', fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.15em', color: '#9b59b6',
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 2, repeat: Infinity }}
              style={{ width: 6, height: 6, borderRadius: '50%', background: '#9b59b6' }}
            />
            Knowledge Center
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.65 }}
            className="text-display"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', lineHeight: 1.1, marginBottom: 20, maxWidth: 700 }}
          >
            Professional Healthcare Communication Resources
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{ fontSize: '1.05rem', lineHeight: 1.75, color: 'var(--text-muted)', maxWidth: 580 }}
          >
            Our frameworks are built for practical deployment across field teams, educator programs, patient engagement modules, and strategic brand communication.
          </motion.p>
        </div>
      </section>

      {/* ── Resource Cards ── */}
      <section style={{ padding: '80px 0', background: 'var(--bg-alt)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, marginBottom: 80 }}>
            {resources.map((r, i) => {
              const ref = useRef(null);
              const inView = useInView(ref, { once: true, margin: '-60px' });
              return (
                <motion.div
                  key={r.label}
                  ref={ref}
                  initial={{ opacity: 0, y: 28 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, delay: i * 0.1 }}
                  whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                  style={{
                    padding: '28px 24px',
                    background: 'var(--bg-secondary)',
                    borderRadius: 18,
                    border: '1px solid var(--border)',
                    boxShadow: 'var(--shadow-subtle)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                    background: r.color, borderRadius: '18px 18px 0 0',
                  }} />

                  <motion.div
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ delay: i * 0.1 + 0.2, type: 'spring', stiffness: 160 }}
                    style={{
                      width: 44, height: 44, borderRadius: 12,
                      background: `${r.color}15`, border: `1px solid ${r.color}25`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1.3rem', marginBottom: 16,
                    }}
                  >
                    {r.icon}
                  </motion.div>

                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginBottom: 8, color: 'var(--text-primary)' }}>
                    {r.label}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', lineHeight: 1.65, color: 'var(--text-muted)' }}>
                    {r.desc}
                  </p>

                  <div style={{
                    marginTop: 16, fontFamily: 'var(--font-ui)', fontSize: '0.75rem',
                    fontWeight: 600, color: r.color,
                  }}>
                    Download Framework →
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* FAQ Section */}
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-display"
            style={{ fontSize: '2rem', marginBottom: 28 }}
          >
            Frequently Asked Questions
          </motion.h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 760 }}>
            {faqs.map((item, i) => (
              <FaqAccordion key={item.q} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
