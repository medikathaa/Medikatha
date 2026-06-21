import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { usePageSeo } from '../lib/seo';
import { storyHighlights } from '../data/stories';
import { Button } from '../components/Button';

const CARD_COLORS = ['#0f6ccf', '#66ba3c', '#e03a3a'];
const TAGS = ['Problem framing', 'Clinical simplification', 'Patient behaviour', 'Outcome measurement'];

export function StoriesPage() {
  usePageSeo({
    title: 'Medicine Stories',
    description: 'Discover Medikatha medicine story frameworks designed to improve adherence and treatment confidence.',
    path: '/stories',
  });
  const [active, setActive] = useState<number | null>(null);

  return (
    <main>
      {/* ── Banner ── */}
      <section style={{ padding: '80px 0 60px', background: 'var(--bg-primary)', position: 'relative', overflow: 'hidden' }}>
        <motion.div
          animate={{ scale: [1, 1.12, 1], opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', top: '-15%', right: '-5%', width: 420, height: 420,
            borderRadius: '50%', background: 'radial-gradient(circle, #e03a3a 0%, transparent 70%)',
            filter: 'blur(60px)', pointerEvents: 'none',
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          style={{
            position: 'absolute', bottom: 0, left: '-10%', width: 360, height: 360,
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
              textTransform: 'uppercase', letterSpacing: '0.15em', color: '#e03a3a',
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 2, repeat: Infinity }}
              style={{ width: 6, height: 6, borderRadius: '50%', background: '#e03a3a' }}
            />
            Flagship Narratives
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.65 }}
            className="text-display"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', lineHeight: 1.1, marginBottom: 20, maxWidth: 700 }}
          >
            Stories That Bridge Science and Daily Life
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{ fontSize: '1.05rem', lineHeight: 1.75, color: 'var(--text-muted)', maxWidth: 580 }}
          >
            Each story is built around a clinical challenge, a patient perspective, and a measurable communication outcome.
          </motion.p>
        </div>
      </section>

      {/* ── Story Cards ── */}
      <section style={{ padding: '80px 0', background: 'var(--bg-alt)' }}>
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {storyHighlights.map((story, i) => {
              const ref = useRef(null);
              const inView = useInView(ref, { once: true, margin: '-60px' });
              const color = CARD_COLORS[i % CARD_COLORS.length];
              const isOpen = active === i;

              return (
                <motion.div
                  key={story.title}
                  ref={ref}
                  initial={{ opacity: 0, x: -24 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setActive(isOpen ? null : i)}
                  style={{
                    borderRadius: 20,
                    background: 'var(--bg-secondary)',
                    border: `1px solid ${isOpen ? color : 'var(--border)'}`,
                    boxShadow: isOpen ? `var(--shadow-raised), 0 0 0 1px ${color}20` : 'var(--shadow-subtle)',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'border-color 0.3s, box-shadow 0.3s',
                  }}
                >
                  {/* Color accent bar */}
                  <div style={{ height: 4, background: color }} />

                  <div style={{ padding: '28px 32px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
                      <div style={{ flex: 1 }}>
                        <div style={{
                          display: 'inline-block', padding: '4px 12px', borderRadius: 99,
                          background: `${color}15`, color,
                          fontFamily: 'var(--font-ui)', fontSize: '0.7rem', fontWeight: 700,
                          textTransform: 'uppercase', letterSpacing: '0.1em',
                          marginBottom: 12,
                        }}>
                          Story {String(i + 1).padStart(2, '0')}
                        </div>
                        <h3 className="text-display" style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)', marginBottom: 10 }}>
                          {story.title}
                        </h3>
                        <p className="text-body text-muted" style={{ fontSize: '0.95rem', lineHeight: 1.7 }}>
                          {story.summary}
                        </p>
                      </div>

                      <motion.div
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          width: 36, height: 36, borderRadius: '50%',
                          background: `${color}15`, border: `1px solid ${color}30`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color, fontSize: '1.2rem', flexShrink: 0,
                        }}
                      >
                        +
                      </motion.div>
                    </div>

                    {/* Expandable tags */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.35 }}
                          style={{ overflow: 'hidden' }}
                        >
                          <div style={{ paddingTop: 20, borderTop: '1px solid var(--border)', marginTop: 20 }}>
                            <div style={{
                              fontFamily: 'var(--font-ui)', fontSize: '0.7rem', fontWeight: 700,
                              textTransform: 'uppercase', letterSpacing: '0.1em',
                              color: 'var(--text-muted)', marginBottom: 12,
                            }}>
                              Story Components
                            </div>
                            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                              {story.components.map((comp, ci) => (
                                <motion.span
                                  key={comp}
                                  initial={{ opacity: 0, scale: 0.85 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: ci * 0.06 }}
                                  style={{
                                    padding: '5px 14px',
                                    borderRadius: 99,
                                    background: `${color}10`,
                                    border: `1px solid ${color}25`,
                                    color,
                                    fontFamily: 'var(--font-ui)',
                                    fontSize: '0.75rem', fontWeight: 600,
                                  }}
                                >
                                  {comp}
                                </motion.span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            style={{ textAlign: 'center', marginTop: 48 }}
          >
            <Button to="/contact" variant="primary">Commission a Story →</Button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
