import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { usePageSeo } from '../lib/seo';

const clinicalServices = [
  {
    id: 'site-id',
    title: 'Site Identification & Feasibility Support',
    icon: '🔍',
    color: '#0f6ccf',
    tagline: 'Selecting the right site is one of the most critical factors in clinical trial success.',
    services: [
      'Site identification and selection',
      'Investigator profiling',
      'Site capability assessment',
      'Feasibility questionnaire support',
      'Patient pool evaluation',
      'Site readiness assessment',
    ],
    benefits: ['Faster study start-up', 'Improved recruitment potential', 'Reduced operational risk'],
  },
  {
    id: 'smo',
    title: 'Site Management Services (SMO)',
    icon: '🏥',
    color: '#66ba3c',
    tagline: 'We partner with hospitals and investigators to provide dedicated operational support throughout the clinical trial lifecycle.',
    services: [
      'Study start-up support',
      'Site coordination',
      'Essential document management',
      'Visit scheduling and coordination',
      'Regulatory document maintenance',
      'Sponsor and CRO communication',
      'Audit and inspection preparedness',
    ],
    benefits: ['Improved site efficiency', 'Better compliance and documentation', 'Enhanced study performance'],
  },
  {
    id: 'trial-ops',
    title: 'Clinical Trial Operations & Project Management',
    icon: '📊',
    color: '#9b59b6',
    tagline: 'Efficient project management is essential for successful study execution.',
    services: [
      'Study planning and coordination',
      'Timeline management',
      'Investigator communication',
      'Sponsor coordination',
      'Site performance tracking',
      'Study progress reporting',
    ],
    benefits: ['Streamlined trial execution', 'Effective stakeholder communication', 'Improved project oversight'],
  },
  {
    id: 'crc',
    title: 'Clinical Research Coordinator (CRC) Support',
    icon: '📋',
    color: '#e67e22',
    tagline: 'Our trained CRCs provide dedicated support to investigators and research teams.',
    services: [
      'Participant scheduling',
      'Study visit coordination',
      'Informed consent documentation support',
      'Source documentation assistance',
      'Follow-up coordination',
      'Study file maintenance',
      'Participant retention support',
    ],
    benefits: ['Reduced investigator workload', 'Improved participant management', 'Enhanced protocol compliance'],
  },
  {
    id: 'regulatory',
    title: 'Regulatory & Ethics Committee Support',
    icon: '⚖️',
    color: '#e03a3a',
    tagline: 'Clinical research requires strict adherence to ethical and regulatory requirements.',
    services: [
      'Ethics Committee submission support',
      'Regulatory document preparation',
      'Essential document compilation',
      'Study-related correspondence management',
      'Amendment submission support',
      'Study closure documentation',
    ],
    benefits: ['Timely submissions', 'Improved compliance', 'Reduced administrative burden'],
  },
  {
    id: 'recruitment',
    title: 'Patient Recruitment & Retention Support',
    icon: '👥',
    color: '#1abc9c',
    tagline: 'Patient recruitment remains one of the most challenging aspects of clinical research.',
    services: [
      'Recruitment planning',
      'Site-specific enrollment strategies',
      'Participant tracking',
      'Follow-up coordination',
      'Retention support initiatives',
      'Community and awareness activities',
    ],
    benefits: ['Faster recruitment', 'Better participant retention', 'Improved study timelines'],
  },
  {
    id: 'iit',
    title: 'Investigator-Initiated Trial (IIT) Support',
    icon: '🔬',
    color: '#0f6ccf',
    tagline: 'We support academic institutions and investigators conducting independent clinical research.',
    services: [
      'Study planning support',
      'Feasibility assessment',
      'Ethics documentation',
      'Project coordination',
      'CRC deployment',
      'Study management assistance',
    ],
    benefits: ['Stronger research execution', 'Improved operational support', 'Enhanced research productivity'],
  },
  {
    id: 'sponsor-cro',
    title: 'Sponsor & CRO Collaboration Facilitation',
    icon: '🤝',
    color: '#66ba3c',
    tagline: 'Medikatha works to build meaningful collaborations between Sponsors, CROs, investigators, and healthcare institutions.',
    services: [
      'Site network development',
      'Investigator engagement',
      'Sponsor introductions',
      'Feasibility coordination',
      'Research partnership support',
    ],
    benefits: ['Strong research networks', 'Increased study opportunities', 'Efficient collaboration'],
  },
];

const trainingAreas = [
  { title: 'Clinical Research', desc: 'Comprehensive understanding of clinical trial processes, regulations, and study management.', color: '#0f6ccf' },
  { title: 'Clinical Trial Management', desc: 'Training in study planning, coordination, monitoring, and project execution.', color: '#66ba3c' },
  { title: 'Clinical Data Management', desc: 'Data collection, validation, database management, and quality assurance.', color: '#e03a3a' },
  { title: 'Pharmacovigilance', desc: 'Drug safety monitoring, adverse event reporting, and regulatory requirements.', color: '#9b59b6' },
  { title: 'Regulatory Affairs', desc: 'Overview of regulatory pathways, submissions, approvals, and compliance.', color: '#e67e22' },
  { title: 'Medical Writing', desc: 'Preparation of clinical research documents, protocols, reports, and scientific content.', color: '#1abc9c' },
  { title: 'Good Clinical Practice (GCP)', desc: 'International ethical and scientific standards for clinical research.', color: '#0f6ccf' },
  { title: 'CRC Training', desc: 'Practical training focused on site management, participant coordination, and documentation.', color: '#66ba3c' },
];

const whyUs = [
  { title: 'Expertise', desc: 'Dedicated support from professionals with experience in clinical research and healthcare.', icon: '⚕' },
  { title: 'Quality', desc: 'Commitment to ethical practices, regulatory compliance, and operational excellence.', icon: '✓' },
  { title: 'Collaboration', desc: 'Strong relationships with investigators, hospitals, sponsors, and CROs.', icon: '🤝' },
  { title: 'Education', desc: 'ISO-certified, industry-focused training to create competent clinical research professionals.', icon: '🎓' },
  { title: 'Patient-Centric', desc: 'Supporting research that ultimately improves patient outcomes and healthcare innovation.', icon: '❤' },
];

function ServiceCard({ service, index }: { service: typeof clinicalServices[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.07, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: 'var(--bg-secondary)',
        borderRadius: 20,
        border: `1px solid ${open ? service.color + '50' : 'var(--border)'}`,
        overflow: 'hidden',
        transition: 'border-color 0.3s ease',
        boxShadow: 'var(--shadow-subtle)',
      }}
    >
      {/* Header */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', textAlign: 'left',
          padding: '28px 28px',
          background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'flex-start', gap: 16,
        }}
      >
        <div style={{
          width: 52, height: 52, borderRadius: 14, flexShrink: 0,
          background: `${service.color}15`, border: `1px solid ${service.color}30`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.4rem',
        }}>
          {service.icon}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: service.color, borderRadius: '20px 0 0 20px' }} />
          <h3 className="text-display" style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: 6, lineHeight: 1.3 }}>
            {service.title}
          </h3>
          <p className="text-body text-muted" style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
            {service.tagline}
          </p>
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          style={{ color: service.color, fontSize: '1.2rem', flexShrink: 0, marginTop: 4 }}
        >
          ↓
        </motion.div>
      </button>

      {/* Expanded content */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: '0 28px 28px', borderTop: `1px solid ${service.color}20` }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24, paddingTop: 20 }}>
                {/* Services list */}
                <div>
                  <div style={{ fontFamily: 'var(--font-ui)', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)', marginBottom: 12 }}>
                    Services Include
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {service.services.map(s => (
                      <li key={s} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                        <span style={{ color: service.color, marginTop: 3, flexShrink: 0 }}>•</span>
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Benefits */}
                <div>
                  <div style={{ fontFamily: 'var(--font-ui)', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)', marginBottom: 12 }}>
                    Benefits
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {service.benefits.map(b => (
                      <div key={b} style={{
                        display: 'flex', alignItems: 'center', gap: 10,
                        padding: '10px 14px', borderRadius: 10,
                        background: `${service.color}08`, border: `1px solid ${service.color}20`,
                      }}>
                        <span style={{ color: service.color, fontWeight: 700 }}>✔</span>
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--text-primary)' }}>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Specific Diagram for SMO */}
              {service.id === 'smo' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  style={{ marginTop: 24, borderRadius: 12, overflow: 'hidden', border: `1px solid ${service.color}20` }}
                >
                  <img 
                    src="/images/smo-diagram.png" 
                    alt="SMO Process Diagram" 
                    loading="lazy"
                    decoding="async"
                    style={{ width: '100%', height: 'auto', display: 'block' }} 
                  />
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function ServicesPage() {
  usePageSeo({
    title: 'Our Services | Medikatha Clinical Research',
    description: 'Comprehensive clinical research and site management services for Sponsors, CROs, Hospitals, and Investigators. ISO-certified training programs for clinical research professionals.',
    path: '/services',
  });

  return (
    <main>
      {/* ── Hero Banner ── */}
      <section style={{ padding: '100px 0 80px', background: 'var(--bg-primary)', position: 'relative', overflow: 'hidden' }}>
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', top: '-30%', right: '-10%', width: 500, height: 500,
            borderRadius: '50%', background: 'radial-gradient(circle, #0f6ccf 0%, transparent 70%)',
            filter: 'blur(80px)', pointerEvents: 'none',
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          style={{
            position: 'absolute', bottom: '-20%', left: '-10%', width: 400, height: 400,
            borderRadius: '50%', background: 'radial-gradient(circle, #66ba3c 0%, transparent 70%)',
            filter: 'blur(80px)', pointerEvents: 'none',
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 60, alignItems: 'center' }}>
            <div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 20,
                  fontFamily: 'var(--font-ui)', fontSize: '0.8rem', fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--brand-blue)',
                  background: 'rgba(15,108,207,0.08)', padding: '6px 14px', borderRadius: '99px',
                  border: '1px solid rgba(15,108,207,0.2)'
                }}
              >
                <motion.div
                  animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 2, repeat: Infinity }}
                  style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--brand-blue)' }}
                />
                Clinical Excellence
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.65 }}
                className="text-display"
                style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', lineHeight: 1.05, marginBottom: 24 }}
              >
                Advancing Clinical Research Through Expertise & Collaboration
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-muted)', maxWidth: 580, marginBottom: 32 }}
              >
                We provide comprehensive clinical research and site management solutions designed to support Sponsors, CROs, Hospitals, Investigators, Academic Institutions, and Patients throughout the clinical development process.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}
              >
                <Link to="/contact" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '12px 28px', borderRadius: 999,
                  background: 'var(--brand-blue)', color: '#fff',
                  fontFamily: 'var(--font-ui)', fontSize: '0.9rem', fontWeight: 600,
                  textDecoration: 'none', boxShadow: '0 8px 24px rgba(15,108,207,0.35)',
                }}>
                  Get In Touch
                </Link>
                <Link to="/courses" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '12px 24px', borderRadius: 999,
                  border: '1px solid var(--border-strong)',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-ui)', fontSize: '0.9rem', fontWeight: 500,
                  textDecoration: 'none',
                }}>
                  View Training Programs →
                </Link>
              </motion.div>
            </div>

            {/* Hero image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              style={{ borderRadius: 24, overflow: 'hidden', boxShadow: 'var(--shadow-float)' }}
            >
              <img
                src="/services-hero.png"
                alt="Clinical research professionals in a modern hospital setting"
                style={{ width: '100%', height: 360, objectFit: 'cover', display: 'block' }}
                onError={e => {
                  // Fallback if image not found
                  (e.target as HTMLImageElement).style.display = 'none';
                  const parent = (e.target as HTMLImageElement).parentElement;
                  if (parent) {
                    parent.style.background = 'linear-gradient(135deg, rgba(15,108,207,0.12), rgba(102,186,60,0.08))';
                    parent.style.display = 'flex';
                    parent.style.alignItems = 'center';
                    parent.style.justifyContent = 'center';
                    parent.style.minHeight = '360px';
                    parent.innerHTML = '<div style="font-size:4rem">⚕</div>';
                  }
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Clinical Services ── */}
      <section style={{ padding: '80px 0', background: 'var(--bg-alt)' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ marginBottom: 48 }}
          >
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--brand-blue)', marginBottom: 10 }}>
              Clinical Research & Site Management
            </div>
            <h2 className="text-display" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', marginBottom: 12 }}>
              Our Research Services
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.75, maxWidth: 600 }}>
              Click any service to explore what's included and the benefits we deliver.
            </p>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {clinicalServices.map((service, i) => (
              <div key={service.id} style={{ position: 'relative' }}>
                <ServiceCard service={service} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Training Programs ── */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ marginBottom: 48 }}
          >
            {/* ISO Badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16,
              padding: '6px 16px 6px 10px',
              borderRadius: 999,
              background: 'rgba(102,186,60,0.1)',
              border: '1px solid rgba(102,186,60,0.3)',
            }}>
              <div style={{
                width: 24, height: 24, borderRadius: '50%',
                background: 'linear-gradient(135deg, #66ba3c, #48a020)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.65rem', fontWeight: 800, color: '#fff',
                fontFamily: 'var(--font-ui)',
              }}>✓</div>
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.75rem', fontWeight: 700, color: '#66ba3c', letterSpacing: '0.06em' }}>
                ISO Certified Training Institute
              </span>
            </div>
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-muted)', marginBottom: 10 }}>
              Clinical Research Education
            </div>
            <h2 className="text-display" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', marginBottom: 12 }}>
              Industry-Oriented Training Programs
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.75, maxWidth: 620 }}>
              Our programs combine theoretical knowledge with practical industry insights to prepare candidates for successful careers in clinical research. Designed for Life Science Graduates, Pharmacy Graduates, Biotechnology Professionals, Medical Professionals, and Clinical Research Aspirants.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
            {trainingAreas.map((area, i) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
                style={{
                  padding: '28px 24px',
                  background: 'var(--bg-secondary)',
                  borderRadius: 18,
                  border: '1px solid var(--border)',
                  boxShadow: 'var(--shadow-subtle)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: area.color, borderRadius: '18px 18px 0 0' }} />
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: `${area.color}15`, border: `1px solid ${area.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-ui)', fontSize: '0.65rem', fontWeight: 800,
                  color: area.color, marginBottom: 14, letterSpacing: '0.05em',
                }}>
                  {i + 1}
                </div>
                <h3 className="text-display" style={{ fontSize: '1.1rem', marginBottom: 8, color: 'var(--text-primary)' }}>{area.title}</h3>
                <p className="text-body text-muted" style={{ fontSize: '0.85rem', lineHeight: 1.6 }}>{area.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            style={{ marginTop: 40, textAlign: 'center' }}
          >
            <Link to="/courses" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '14px 32px', borderRadius: 999,
              background: 'var(--brand-green)', color: '#fff',
              fontFamily: 'var(--font-ui)', fontSize: '0.9rem', fontWeight: 600,
              textDecoration: 'none', boxShadow: '0 8px 24px rgba(102,186,60,0.35)',
            }}>
              View Course Details & Fees →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section style={{ padding: '80px 0', background: 'var(--bg-alt)' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 48 }}
          >
            <h2 className="text-display" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', marginBottom: 12 }}>
              Why Choose Medikatha?
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 20 }}>
            {whyUs.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                style={{
                  padding: '28px 20px',
                  background: 'var(--bg-secondary)',
                  borderRadius: 18,
                  border: '1px solid var(--border)',
                  textAlign: 'center',
                  boxShadow: 'var(--shadow-subtle)',
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: 12 }}>{item.icon}</div>
                <h3 className="text-display" style={{ fontSize: '1.1rem', marginBottom: 8 }}>{item.title}</h3>
                <p className="text-body text-muted" style={{ fontSize: '0.85rem', lineHeight: 1.6 }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section style={{ padding: '80px 0', background: 'linear-gradient(135deg, #070e17, #0a2040)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-display" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', color: '#fff', marginBottom: 16 }}>
              Let's Build the Future of Healthcare Together
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, maxWidth: 580, margin: '0 auto 32px' }}>
              Whether you are a Sponsor, CRO, Hospital, Investigator, Academic Institution, Student, or Healthcare Professional, Medikatha is ready to support your journey in clinical research.
            </p>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontStyle: 'italic', color: 'rgba(255,255,255,0.45)', marginBottom: 32 }}>
              Medikatha Clinical Research — Story of Medicine
            </p>
            <Link to="/contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '14px 36px', borderRadius: 999,
              background: '#fff', color: '#0c2233',
              fontFamily: 'var(--font-ui)', fontSize: '0.95rem', fontWeight: 700,
              textDecoration: 'none', boxShadow: '0 8px 32px rgba(255,255,255,0.15)',
            }}>
              Connect With Us
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
