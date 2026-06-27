import React from 'react';
import { motion } from 'framer-motion';
import { usePageSeo } from '../lib/seo';
import { ContactForm } from '../sections/shared/ContactForm';

const contactInfo = [
  { icon: '✉', label: 'Primary Email', value: 'medikathacr@gmail.com', href: 'mailto:medikathacr@gmail.com', color: '#0f6ccf' },
  { icon: '✉', label: 'Secondary Email', value: 'nikita.medikatha@gmail.com', href: 'mailto:nikita.medikatha@gmail.com', color: '#66ba3c' },
  { icon: '☎', label: 'Phone', value: '+91 7767809945', href: 'tel:+917767809945', color: '#9b59b6' },
  { icon: '◷', label: 'Office Hours', value: 'Mon–Sat, 9:30 AM – 6:00 PM IST', href: undefined, color: '#e03a3a' },
];

const socialLinks = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/101387086',
    icon: 'in',
    color: '#0f6ccf',
    bg: 'rgba(15,108,207,0.1)',
    border: 'rgba(15,108,207,0.25)',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/medikatha_research',
    icon: '📸',
    color: '#e03a3a',
    bg: 'rgba(224,58,58,0.1)',
    border: 'rgba(224,58,58,0.25)',
  },
];

const whoWeServe = [
  'Sponsors', 'CROs', 'Hospitals', 'Investigators',
  'Academic Institutions', 'Students', 'Healthcare Professionals',
];

export function ContactPage() {
  usePageSeo({
    title: 'Contact Medikatha Clinical Research',
    description: 'Connect with Medikatha Clinical Research for clinical trial support, site management services, research collaborations, training programs, or strategic partnerships.',
    path: '/contact',
  });

  return (
    <main>
      {/* ── Banner ── */}
      <section style={{ padding: '80px 0 60px', background: 'var(--bg-primary)', position: 'relative', overflow: 'hidden' }}>
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', top: '-20%', right: '-5%', width: 420, height: 420,
            borderRadius: '50%', background: 'radial-gradient(circle, #0f6ccf 0%, transparent 70%)',
            filter: 'blur(60px)', pointerEvents: 'none',
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          style={{
            position: 'absolute', bottom: '-10%', left: '-5%', width: 350, height: 350,
            borderRadius: '50%', background: 'radial-gradient(circle, #66ba3c 0%, transparent 70%)',
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
              textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--brand-blue)',
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 2, repeat: Infinity }}
              style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--brand-blue)' }}
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
            Get in Touch
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{ fontSize: '1.05rem', lineHeight: 1.75, color: 'var(--text-muted)', maxWidth: 600 }}
          >
            At Medikatha Clinical Research, we welcome opportunities to collaborate. Whether you are looking for clinical trial support, site management services, research collaborations, training programs, or strategic partnerships — our team is delighted to hear from you.
          </motion.p>

          {/* Who we serve */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 24 }}
          >
            {whoWeServe.map(label => (
              <span key={label} style={{
                padding: '5px 14px', borderRadius: 999,
                background: 'rgba(15,108,207,0.06)', border: '1px solid rgba(15,108,207,0.2)',
                fontFamily: 'var(--font-ui)', fontSize: '0.75rem', fontWeight: 500,
                color: 'var(--brand-blue)',
              }}>
                {label}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Contact Body ── */}
      <section style={{ padding: '80px 0', background: 'var(--bg-alt)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48, alignItems: 'start' }}>

            {/* Left info panel */}
            <div>
              {/* Contact info cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 32 }}>
                {contactInfo.map((info, i) => (
                  <motion.div
                    key={info.label}
                    className="glass-card"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px' }}
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
                        <a href={info.href} style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', fontWeight: 500, color: 'var(--text-primary)' }}>
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

              {/* Social links */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                style={{ padding: '20px 24px', background: 'var(--bg-secondary)', borderRadius: 16, border: '1px solid var(--border)', marginBottom: 28 }}
              >
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)', marginBottom: 14 }}>
                  Connect on Social
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  {socialLinks.map(social => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex', alignItems: 'center', gap: 8,
                        padding: '10px 18px', borderRadius: 10,
                        background: social.bg, border: `1px solid ${social.border}`,
                        fontFamily: 'var(--font-ui)', fontSize: '0.85rem', fontWeight: 600,
                        color: social.color, textDecoration: 'none',
                        transition: 'transform 0.2s ease',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
                      onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
                    >
                      <span style={{ fontWeight: 800 }}>{social.icon}</span>
                      {social.label}
                    </a>
                  ))}
                </div>
              </motion.div>

              {/* Closing quote */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.45 }}
                style={{
                  padding: '24px',
                  borderRadius: 16,
                  background: 'linear-gradient(135deg, rgba(15,108,207,0.05), rgba(102,186,60,0.05))',
                  border: '1px solid var(--border)',
                }}
              >
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontStyle: 'italic', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 10 }}>
                  "Every medicine has a story. Every partnership helps write the next chapter."
                </p>
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: '0.72rem', fontWeight: 700, color: 'var(--brand-blue)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Medikatha | Story of Medicine
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
