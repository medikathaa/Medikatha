import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SectionHead } from '../../components/SectionHead';

const pillar1 = [
  'Site Identification & Feasibility',
  'Site Management Services (SMO)',
  'Clinical Trial Operations',
  'CRC Support',
  'Regulatory & Ethics Committee Support',
  'Patient Recruitment & Retention',
  'IIT Support',
  'Sponsor & CRO Collaboration',
];

const pillar2 = [
  'Clinical Research',
  'Clinical Trial Management',
  'Pharmacovigilance',
  'Clinical Data Management',
  'Regulatory Affairs',
  'Medical Writing',
  'Good Clinical Practice (GCP)',
  'CRC Training',
];

export function ServicesSection() {
  return (
    <section style={{ padding: 'var(--space-16) 0', background: 'var(--bg-alt)' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionHead
            eyebrow="Our Services"
            title="Two Pillars. One Mission."
            description="Medikatha supports the clinical research ecosystem through comprehensive site management services and ISO-certified professional training."
          />
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 24,
        }}>

          {/* ── Pillar 1: Clinical Research & SMO ── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card"
            style={{ padding: '32px', position: 'relative', overflow: 'hidden' }}
          >
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 4,
              background: 'linear-gradient(90deg, #0f6ccf, rgba(15,108,207,0.2))',
              borderRadius: '18px 18px 0 0',
            }} />

            <div style={{
              width: 48, height: 48, borderRadius: 12,
              background: 'rgba(15,108,207,0.1)', border: '1px solid rgba(15,108,207,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.3rem', marginBottom: 18,
            }}>⚕</div>

            <h3 className="text-display" style={{ fontSize: '1.35rem', marginBottom: 8 }}>
              Clinical Research &<br />Site Management
            </h3>
            <p className="text-body text-muted" style={{ fontSize: '0.875rem', lineHeight: 1.65, marginBottom: 20 }}>
              End-to-end support for Sponsors, CROs, Hospitals, and Investigators throughout clinical development.
            </p>

            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 24 }}>
              {pillar1.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  style={{ display: 'flex', alignItems: 'center', gap: 10 }}
                >
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#0f6ccf', flexShrink: 0 }} />
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{item}</span>
                </motion.li>
              ))}
            </ul>


            <Link to="/services" style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontFamily: 'var(--font-ui)', fontSize: '0.82rem', fontWeight: 600,
              color: '#0f6ccf', textDecoration: 'none',
            }}>
              View all services →
            </Link>
          </motion.div>

          {/* ── Pillar 2: Training Programs ── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card"
            style={{ padding: '32px', position: 'relative', overflow: 'hidden' }}
          >
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 4,
              background: 'linear-gradient(90deg, #66ba3c, rgba(102,186,60,0.2))',
              borderRadius: '18px 18px 0 0',
            }} />

            {/* ISO badge top-right */}
            <div style={{ position: 'absolute', top: 18, right: 18 }}>
              <div style={{
                padding: '3px 10px', borderRadius: 999,
                background: 'rgba(102,186,60,0.1)', border: '1px solid rgba(102,186,60,0.28)',
                fontFamily: 'var(--font-ui)', fontSize: '0.63rem', fontWeight: 700,
                color: '#66ba3c', letterSpacing: '0.06em',
              }}>
                ISO CERTIFIED
              </div>
            </div>

            <div style={{
              width: 48, height: 48, borderRadius: 12,
              background: 'rgba(102,186,60,0.1)', border: '1px solid rgba(102,186,60,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.3rem', marginBottom: 18,
            }}>🎓</div>

            <h3 className="text-display" style={{ fontSize: '1.35rem', marginBottom: 8 }}>
              Clinical Research<br />Training Programs
            </h3>
            <p className="text-body text-muted" style={{ fontSize: '0.875rem', lineHeight: 1.65, marginBottom: 20 }}>
              Practical, industry-oriented programs for life science graduates, pharmacy professionals, and clinical research aspirants.
            </p>

            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 24 }}>
              {pillar2.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  style={{ display: 'flex', alignItems: 'center', gap: 10 }}
                >
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#66ba3c', flexShrink: 0 }} />
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{item}</span>
                </motion.li>
              ))}
            </ul>

            <Link to="/courses" style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontFamily: 'var(--font-ui)', fontSize: '0.82rem', fontWeight: 600,
              color: '#66ba3c', textDecoration: 'none',
            }}>
              View all courses →
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
