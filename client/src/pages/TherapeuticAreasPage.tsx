import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { usePageSeo } from '../lib/seo';
import { areas } from '../data/areas';

const COLORS = ['#0f6ccf', '#66ba3c', '#e03a3a', '#9b59b6', '#e67e22', '#1abc9c'];

export function TherapeuticAreasPage() {
  usePageSeo({
    title: 'Therapeutic Areas',
    description: 'Medikatha covers 15+ therapeutic areas with deep clinical communication expertise for healthcare teams and patients.',
    path: '/therapeutic-areas',
  });

  return (
    <main>
      {/* ── Banner ── */}
      <section style={{ padding: '80px 0 60px', background: 'var(--bg-primary)', position: 'relative', overflow: 'hidden' }}>
        {/* Multi-color blobs */}
        {COLORS.slice(0, 3).map((c, i) => (
          <motion.div
            key={c + i}
            animate={{ scale: [1, 1.12, 1], opacity: [0.08, 0.15, 0.08] }}
            transition={{ duration: 7 + i * 2, repeat: Infinity, ease: 'easeInOut', delay: i * 2 }}
            style={{
              position: 'absolute',
              top: `${[-20, 50, 80][i]}%`,
              left: `${[-5, 80, 20][i]}%`,
              width: 350, height: 350, borderRadius: '50%',
              background: `radial-gradient(circle, ${c} 0%, transparent 70%)`,
              filter: 'blur(60px)', pointerEvents: 'none',
            }}
          />
        ))}

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
            Therapeutic Expertise
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.65 }}
            className="text-display"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', lineHeight: 1.1, marginBottom: 20, maxWidth: 700 }}
          >
            Deep Clinical Expertise Across 15+ Therapy Areas
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{ fontSize: '1.05rem', lineHeight: 1.75, color: 'var(--text-muted)', maxWidth: 580 }}
          >
            Our communication specialists understand the clinical nuances of each therapy area, enabling precise and trusted patient education.
          </motion.p>
        </div>
      </section>

      {/* ── Colorful Area Cards ── */}
      <section style={{ padding: '80px 0', background: 'var(--bg-alt)' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 20,
          }}>
            {areas.map((area, i) => {
              const ref = useRef(null);
              const inView = useInView(ref, { once: true, margin: '-60px' });
              const color = COLORS[i % COLORS.length];

              return (
                <motion.div
                  key={area.title}
                  ref={ref}
                  initial={{ opacity: 0, y: 32 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -6, boxShadow: `0 20px 48px ${color}25` }}
                  style={{
                    background: 'var(--bg-secondary)',
                    borderRadius: 20,
                    border: `1px solid var(--border)`,
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow-subtle)',
                    transition: 'box-shadow 0.3s, transform 0.3s',
                  }}
                >
                  {/* Gradient top band */}
                  <div style={{
                    height: 6,
                    background: `linear-gradient(90deg, ${color}, ${color}60)`,
                  }} />

                  <div style={{ padding: '24px' }}>
                    <motion.div
                      initial={{ scale: 0, rotate: -15 }}
                      animate={inView ? { scale: 1, rotate: 0 } : {}}
                      transition={{ delay: i * 0.1 + 0.2, type: 'spring', stiffness: 160 }}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16,
                        padding: '5px 12px', borderRadius: 99,
                        background: `${color}12`, border: `1px solid ${color}25`,
                      }}
                    >
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: color }} />
                      <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.72rem', fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        Therapy Area
                      </span>
                    </motion.div>

                    <h3 className="text-display" style={{ fontSize: '1.4rem', marginBottom: 8 }}>
                      {area.title}
                    </h3>
                    <p className="text-body text-muted" style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: 12, color }}>
                      {area.focus}
                    </p>
                    <p className="text-body text-muted" style={{ fontSize: '0.875rem', lineHeight: 1.7 }}>
                      {area.details}
                    </p>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : {}}
                      transition={{ delay: i * 0.1 + 0.4 }}
                      style={{
                        marginTop: 18,
                        display: 'flex', gap: 6,
                      }}
                    >
                      {['Content', 'Strategy', 'Education'].map(tag => (
                        <span
                          key={tag}
                          style={{
                            padding: '3px 10px', borderRadius: 99,
                            background: `${color}10`, border: `1px solid ${color}20`,
                            fontFamily: 'var(--font-ui)', fontSize: '0.68rem', fontWeight: 600,
                            color,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
