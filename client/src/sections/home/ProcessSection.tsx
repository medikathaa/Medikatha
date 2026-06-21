import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionHead } from '../../components/SectionHead';

const steps = [
  { title: 'Discover', desc: 'Deep clinical review, evidence mapping, and audience research.', color: '#0f6ccf', num: '01' },
  { title: 'Translate', desc: 'Patient-language narrative structuring from medical complexity.', color: '#66ba3c', num: '02' },
  { title: 'Design', desc: 'Therapy-area visual storytelling with editorial precision.', color: '#e03a3a', num: '03' },
  { title: 'Deploy', desc: 'Omnichannel deployment across digital and field channels.', color: '#9b59b6', num: '04' },
];

export function ProcessSection() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section style={{ padding: 'var(--space-16) 0', background: 'var(--bg-primary)', overflow: 'hidden' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <SectionHead
            eyebrow="Our Process"
            title="From Science to Story"
            align="center"
          />
        </motion.div>

        {/* Horizontal timeline on desktop, vertical on mobile */}
        <div ref={sectionRef} style={{ position: 'relative', marginTop: 48 }}>
          {/* Connecting line */}
          <div style={{
            position: 'absolute',
            top: 28, left: '12.5%', right: '12.5%',
            height: 1,
            background: 'var(--border-strong)',
            zIndex: 0,
          }}>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              style={{
                transformOrigin: '0%',
                height: '100%',
                background: 'linear-gradient(90deg, #0f6ccf, #66ba3c, #e03a3a, #9b59b6)',
                borderRadius: 2,
              }}
            />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 16,
            position: 'relative', zIndex: 1,
          }}>
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ textAlign: 'center' }}
              >
                {/* Step circle */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.2, type: 'spring', stiffness: 200 }}
                  style={{
                    width: 56, height: 56, borderRadius: '50%',
                    background: step.color,
                    color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 20px',
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.95rem',
                    boxShadow: `0 0 0 8px var(--bg-primary), 0 0 0 9px ${step.color}30`,
                  }}
                >
                  {step.num}
                </motion.div>

                <h3 className="text-display" style={{ fontSize: '1.3rem', marginBottom: 8, color: 'var(--text-primary)' }}>
                  {step.title}
                </h3>
                <p className="text-body text-muted" style={{ fontSize: '0.875rem', lineHeight: 1.65 }}>
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 680px) {
          .process-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  );
}
