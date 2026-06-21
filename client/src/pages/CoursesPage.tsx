import React from 'react';
import { motion } from 'framer-motion';
import { usePageSeo } from '../lib/seo';
import { EnquiryForm } from '../sections/shared/EnquiryForm';

const courses = [
  {
    id: 'pg-diploma',
    title: 'PG Diploma in Clinical Research',
    description: 'Comprehensive training covering clinical trial processes, regulations, ethics, documentation, pharmacovigilance, and industry practices.',
    duration: '3 Months',
    fees: '30,000',
    color: '#0f6ccf' // Brand Blue
  },
  {
    id: 'crc-program',
    title: 'Clinical Research Coordinator (CRC) Program',
    description: 'Hands-on training focused on study coordination, informed consent process, site management, patient handling, and documentation.',
    duration: '7 days',
    fees: '4,999/-',
    color: '#66ba3c' // Brand Green
  },
  {
    id: 'ich-gcp',
    title: 'ICH-GCP Fastrack Program',
    description: 'Intensive training on International Council for Harmonisation – Good Clinical Practice (ICH-GCP) guidelines essential for clinical research professionals.',
    duration: '4 days',
    fees: '2,999/-',
    color: '#e03a3a' // Brand Red
  },
  {
    id: 'ethics-masterclass',
    title: 'Ethics Committee Masterclass',
    description: 'Specialized program covering ethics committee operations, regulatory requirements, review procedures, and ethical responsibilities in clinical research.',
    duration: '1 day',
    fees: '999/-',
    color: '#f5a623' // Orange/Yellow
  }
];

// SVG Icons
const ClockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--brand-blue)' }}>
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const WalletIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--brand-green)' }}>
    <rect x="2" y="5" width="20" height="14" rx="2"></rect>
    <line x1="2" y1="10" x2="22" y2="10"></line>
  </svg>
);

export function CoursesPage() {
  usePageSeo({
    title: 'Our Courses | Medikatha',
    description: 'Explore comprehensive training programs in clinical research, including PG Diploma, CRC Program, ICH-GCP, and Ethics Committee Masterclass.',
    path: '/courses',
  });

  return (
    <main>
      {/* ── Banner ── */}
      <section style={{ padding: '100px 0 80px', background: 'var(--bg-primary)', position: 'relative', overflow: 'hidden' }}>
        {/* Animated Background Orbs */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1], rotate: [0, 90, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', top: '-30%', right: '-10%', width: 500, height: 500,
            borderRadius: '50%', background: 'radial-gradient(circle, #0f6ccf 0%, transparent 70%)',
            filter: 'blur(80px)', pointerEvents: 'none',
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.15, 0.08], rotate: [0, -90, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          style={{
            position: 'absolute', bottom: '-20%', left: '-10%', width: 400, height: 400,
            borderRadius: '50%', background: 'radial-gradient(circle, #66ba3c 0%, transparent 70%)',
            filter: 'blur(80px)', pointerEvents: 'none',
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
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
            Advance Your Career
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.65 }}
            className="text-display"
            style={{ fontSize: 'clamp(2.8rem, 6vw, 4.5rem)', lineHeight: 1.05, marginBottom: 24, maxWidth: 800 }}
          >
            Master Clinical Research with Industry Experts
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{ fontSize: '1.15rem', lineHeight: 1.8, color: 'var(--text-muted)', maxWidth: 650 }}
          >
            Specialized, hands-on training programs designed to equip you with the deep knowledge and practical skills required to excel in today's fast-paced clinical research industry.
          </motion.p>
        </div>
      </section>

      {/* ── Main Content ── */}
      <section style={{ padding: '80px 0 120px', background: 'var(--bg-alt)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '60px', alignItems: 'start', '@media (minWidth: 1024px)': { gridTemplateColumns: '1.3fr 1fr' } } as React.CSSProperties}>
            
            {/* Courses List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {courses.map((course, i) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: i * 0.1, duration: 0.6, type: 'spring', stiffness: 80 }}
                  whileHover={{ scale: 1.02, y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
                  style={{
                    background: 'var(--bg-secondary)',
                    borderRadius: '24px',
                    padding: '40px',
                    border: '1px solid var(--border)',
                    boxShadow: 'var(--shadow-subtle)',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'border-color 0.3s ease',
                    cursor: 'default'
                  }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = `${course.color}50`)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                >
                  <div style={{
                    position: 'absolute', top: 0, left: 0, width: '6px', height: '100%',
                    background: `linear-gradient(to bottom, ${course.color}, ${course.color}40)`,
                  }} />
                  <div style={{
                    position: 'absolute', top: -50, right: -50, width: 150, height: 150,
                    borderRadius: '50%', background: `radial-gradient(circle, ${course.color}15 0%, transparent 70%)`,
                    pointerEvents: 'none'
                  }} />

                  <h3 className="text-display" style={{ fontSize: '1.6rem', marginBottom: '14px', position: 'relative', zIndex: 1 }}>
                    {course.title}
                  </h3>
                  <p className="text-body text-muted" style={{ lineHeight: 1.7, marginBottom: '28px', fontSize: '1.05rem', position: 'relative', zIndex: 1 }}>
                    {course.description}
                  </p>
                  
                  <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ padding: '10px', borderRadius: '12px', background: 'rgba(15,108,207,0.1)' }}>
                        <ClockIcon />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.08em', marginBottom: '2px' }}>Duration</div>
                        <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '1.1rem' }}>{course.duration}</div>
                      </div>
                    </div>
                    
                    <div style={{ width: '1px', background: 'var(--border)', margin: '4px 0' }}></div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ padding: '10px', borderRadius: '12px', background: 'rgba(102,186,60,0.1)' }}>
                        <WalletIcon />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.08em', marginBottom: '2px' }}>Fees</div>
                        <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '1.1rem' }}>₹{course.fees}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Enquiry Form */}
            <div style={{ position: 'sticky', top: '120px' }}>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.7, type: 'spring', stiffness: 70 }}
              >
                <div style={{
                  padding: '4px',
                  borderRadius: 'calc(var(--radius-xl) + 4px)',
                  background: 'linear-gradient(135deg, rgba(15,108,207,0.2), rgba(102,186,60,0.2))',
                }}>
                  <EnquiryForm />
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>
      
      {/* Responsive Styles Injection */}
      <style>{`
        @media (min-width: 1024px) {
          main > section:nth-of-type(2) .container > div {
            grid-template-columns: 1.3fr 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}
