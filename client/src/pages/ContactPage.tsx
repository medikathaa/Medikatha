import React from 'react';
import { motion } from 'framer-motion';
import { usePageSeo } from '../lib/seo';
import { ContactForm } from '../sections/shared/ContactForm';
import { Button } from '../components/Button';

const contactInfo = [
  { icon: '✉', label: 'Email', value: 'hello@medikatha.com', href: 'mailto:hello@medikatha.com', color: '#0f6ccf' },
  { icon: '☎', label: 'Phone', value: '+91 88888 00000', href: 'tel:+918888800000', color: '#66ba3c' },
  { icon: '◷', label: 'Support Window', value: 'Mon–Sat, 9:30 AM – 7:00 PM IST', href: undefined, color: '#e03a3a' },
];

const trustedBy = [
  'Apollo Hospitals', 'Cipla Ltd.', 'Dr. Reddy\'s', 'Max Healthcare', 'Fortis', 'Glenmark',
];

export function ContactPage() {
  usePageSeo({
    title: 'Contact Medikatha',
    description: 'Connect with Medikatha for healthcare storytelling, SEO-ready medical websites, and patient education strategy support.',
    path: '/contact',
  });

  return (
    <main>
      {/* ── Banner ── */}
      <section style={{ padding: '80px 0 60px', background: 'var(--bg-primary)', position: 'relative', overflow: 'hidden' }}>
        {/* Green glow */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', top: '-20%', right: '-5%', width: 420, height: 420,
            borderRadius: '50%', background: 'radial-gradient(circle, #66ba3c 0%, transparent 70%)',
            filter: 'blur(60px)', pointerEvents: 'none',
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          style={{
            position: 'absolute', bottom: '-10%', left: '-5%', width: 350, height: 350,
            borderRadius: '50%', background: 'radial-gradient(circle, #0f6ccf 0%, transparent 70%)',
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
              textTransform: 'uppercase', letterSpacing: '0.15em', color: '#66ba3c',
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 2, repeat: Infinity }}
              style={{ width: 6, height: 6, borderRadius: '50%', background: '#66ba3c' }}
            />
            Let's Collaborate
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.65 }}
            className="text-display"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', lineHeight: 1.1, marginBottom: 20, maxWidth: 700 }}
          >
            Let's Build Your Healthcare Communication Platform
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{ fontSize: '1.05rem', lineHeight: 1.75, color: 'var(--text-muted)', maxWidth: 540 }}
          >
            Share your goals and we'll suggest a practical roadmap for content, design, SEO, and deployment.
          </motion.p>
        </div>
      </section>

      {/* ── Contact Body ── */}
      <section style={{ padding: '80px 0', background: 'var(--bg-alt)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48, alignItems: 'start' }}>

            {/* Left info panel */}
            <div>
              {/* Contact info cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 36 }}>
                {contactInfo.map((info, i) => (
                  <motion.div
                    key={info.label}
                    className="glass-card"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 16,
                      padding: '16px 20px',
                    }}
                  >
                    <div style={{
                      width: 40, height: 40, borderRadius: 10,
                      background: `${info.color}15`, border: `1px solid ${info.color}25`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1.1rem', flexShrink: 0, color: info.color,
                    }}>
                      {info.icon}
                    </div>
                    <div>
                      <div style={{
                        fontFamily: 'var(--font-ui)', fontSize: '0.7rem', fontWeight: 700,
                        textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: 2,
                      }}>
                        {info.label}
                      </div>
                      {info.href ? (
                        <a
                          href={info.href}
                          style={{
                            fontFamily: 'var(--font-body)', fontSize: '0.95rem',
                            fontWeight: 500, color: 'var(--text-primary)',
                          }}
                        >
                          {info.value}
                        </a>
                      ) : (
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                          {info.value}
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Trusted by marquee */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                style={{
                  padding: '20px 24px',
                  background: 'var(--bg-secondary)',
                  borderRadius: 16, border: '1px solid var(--border)',
                }}
              >
                <div style={{
                  fontFamily: 'var(--font-ui)', fontSize: '0.7rem', fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '0.12em',
                  color: 'var(--text-muted)', marginBottom: 14,
                }}>
                  Trusted By
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {trustedBy.map((name, i) => (
                    <motion.span
                      key={name}
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.07 }}
                      style={{
                        padding: '5px 14px', borderRadius: 99,
                        background: 'var(--bg-alt)', border: '1px solid var(--border)',
                        fontFamily: 'var(--font-ui)', fontSize: '0.8rem',
                        fontWeight: 500, color: 'var(--text-secondary)',
                      }}
                    >
                      {name}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right: multi-step form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
