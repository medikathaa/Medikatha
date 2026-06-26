import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { usePageSeo } from '../lib/seo';

const ACCENT = ['#0f6ccf', '#66ba3c', '#e03a3a', '#9b59b6'];

const principles = [
  { title: 'Build Relationships', desc: 'We aim to be a long-term research partner that understands the needs of every stakeholder in clinical development.', color: '#0f6ccf', icon: '◈' },
  { title: 'Enable Research', desc: 'Supporting investigator sites, facilitating sponsor-CRO collaborations, and improving research readiness across institutions.', color: '#66ba3c', icon: '◉' },
  { title: 'Create Impact', desc: 'Every protocol, participant, and dataset contributes to advancing medical science and improving patient lives.', color: '#e03a3a', icon: '◆' },
  { title: 'Educate & Empower', desc: 'Bridging the gap between academic knowledge and industry expectations through ISO-certified practical training.', color: '#9b59b6', icon: '✦' },
];

const milestones = [
  { year: 'Founded', event: 'Medikatha Clinical Research established with a vision to bridge gaps in the clinical research ecosystem.' },
  { year: 'SMO', event: 'Expanded as a Site Management Organization supporting hospitals, investigators, and sponsors across therapeutic areas.' },
  { year: 'Training', event: 'Launched ISO-certified clinical research training programs, developing the next generation of skilled professionals.' },
  { year: 'Today', event: 'A growing network of research sites, investigators, sponsors, CROs, and trained professionals committed to advancing healthcare.' },
];

const focusAreas = [
  { title: 'Clinical Research Support', desc: 'Helping sites, investigators, sponsors, and CROs navigate the complexities of clinical trial operations.' },
  { title: 'Site Management Services', desc: 'Supporting study execution through coordination, site readiness, and operational excellence.' },
  { title: 'Academic Research Support', desc: 'Encouraging investigator-initiated and academic research contributing to scientific advancement.' },
  { title: 'Clinical Research Education', desc: 'Practical training programs that bridge academic knowledge with industry expectations.' },
];

function TimelineItem({ year, event, index }: { year: string; event: string; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const color = ACCENT[index % ACCENT.length];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}
    >
      <div style={{ flexShrink: 0, textAlign: 'center' }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
          style={{
            width: 64, height: 64, borderRadius: '50%',
            background: color, color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-ui)', fontSize: '0.65rem', fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.06em',
            boxShadow: `0 0 0 6px var(--bg-primary), 0 0 0 7px ${color}30`,
            textAlign: 'center', padding: '0 4px',
          }}
        >
          {year}
        </motion.div>
      </div>
      <div style={{ paddingTop: 12 }}>
        <p className="text-body" style={{ fontSize: '0.95rem', lineHeight: 1.65, color: 'var(--text-secondary)' }}>{event}</p>
      </div>
    </motion.div>
  );
}

export function AboutPage() {
  usePageSeo({
    title: 'About Medikatha Clinical Research',
    description: 'Learn about Medikatha — a Clinical Research and Site Management Organization dedicated to advancing healthcare through research, collaboration, and professional education.',
    path: '/about',
  });

  return (
    <main>
      {/* ── Hero Banner ── */}
      <section style={{ padding: '80px 0 60px', position: 'relative', overflow: 'hidden' }}>
        {/* Static glow blobs — no animation = no repaint */}
        <div style={{
          position: 'absolute', top: '-20%', right: '-10%',
          width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(15,108,207,0.14) 0%, transparent 70%)',
          filter: 'blur(60px)', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: 0, left: '-10%',
          width: 360, height: 360, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(102,186,60,0.08) 0%, transparent 70%)',
          filter: 'blur(60px)', pointerEvents: 'none',
        }} />


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
            <span style={{
              width: 6, height: 6, borderRadius: '50%', background: 'var(--brand-blue)',
              display: 'inline-block',
              animation: 'aboutDot 2s ease-in-out infinite',
            }} />
            <style>{`@keyframes aboutDot{0%,100%{transform:scale(1)}50%{transform:scale(1.5)}}`}</style>
            Our Story
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.65 }}
            className="text-display"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', lineHeight: 1.1, marginBottom: 20, maxWidth: 760 }}
          >
            Every Medicine Has a Story.<br />We Help Bring It to Life.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{ fontSize: '1.05rem', lineHeight: 1.78, color: 'var(--text-muted)', maxWidth: 620 }}
          >
            At Medikatha, we see healthcare through a unique lens. Behind every medicine lies years of scientific discovery, dedicated healthcare professionals, and courageous patients who participate in clinical studies. This journey inspired the creation of Medikatha — Story of Medicine.
          </motion.p>
        </div>
      </section>

      {/* ── Quote ── */}
      <section style={{ padding: '60px 0', background: 'var(--bg-alt)' }}>
        <div className="container">
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              maxWidth: 800, margin: '0 auto', textAlign: 'center',
              padding: '40px',
              borderRadius: 24,
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-subtle)',
              position: 'relative',
            }}
          >
            <div style={{
              fontFamily: 'var(--font-display)', fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
              lineHeight: 1.65, color: 'var(--text-primary)', fontStyle: 'italic', marginBottom: 20,
            }}>
              "Behind every approved medicine is a journey of science, perseverance, and hope. Medikatha helps connect every chapter of that journey."
            </div>
            <div style={{
              fontFamily: 'var(--font-ui)', fontSize: '0.8rem', fontWeight: 700,
              color: 'var(--brand-blue)', textTransform: 'uppercase', letterSpacing: '0.12em',
            }}>
              Medikatha | Story of Medicine
            </div>
            <div style={{
              position: 'absolute', top: -20, left: '50%', transform: 'translateX(-50%)',
              width: 40, height: 40, borderRadius: '50%',
              background: 'var(--brand-blue)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontSize: '1.2rem',
            }}>
              "
            </div>
          </motion.blockquote>
        </div>
      </section>

      {/* ── Why Founded ── */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 60, alignItems: 'start' }}>
            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ fontFamily: 'var(--font-ui)', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-muted)', marginBottom: 10 }}
              >
                Why We Were Founded
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-display"
                style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', marginBottom: 20 }}
              >
                Bridging the Gaps in Clinical Research
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--text-muted)', marginBottom: 20 }}
              >
                The clinical research ecosystem depends on effective collaboration between Sponsors, CROs, Hospitals, Investigators, Academic Institutions, and Patients. However, many research sites face operational challenges, limited resources, and difficulties accessing new research opportunities.
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--text-muted)', marginBottom: 20 }}
              >
                Medikatha was established to bridge these gaps — strengthening clinical research by supporting investigator sites, facilitating collaborations, and improving research readiness.
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--text-muted)' }}
              >
                At the same time, we recognized the growing need for skilled professionals in clinical research — which led to expanding Medikatha as an ISO-certified training platform.
              </motion.p>
            </div>

            {/* Our journey timeline */}
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-display"
                style={{ fontSize: '2rem', marginBottom: 36 }}
              >
                Our Journey
              </motion.h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 28, position: 'relative' }}>
                <div style={{ position: 'absolute', left: 26, top: 0, bottom: 0, width: 1, background: 'var(--border-strong)' }} />
                {milestones.map((m, i) => (
                  <TimelineItem key={m.year} year={m.year} event={m.event} index={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Principles ── */}
      <section style={{ padding: '80px 0', background: 'var(--bg-alt)' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ marginBottom: 48 }}
          >
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-muted)', marginBottom: 10 }}>
              What Makes Us Different
            </div>
            <h2 className="text-display" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)' }}>
              We are not just a service provider
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
            {principles.map((p, i) => {
              const ref = useRef(null);
              const inView = useInView(ref, { once: true, margin: '-60px' });
              return (
                <motion.div
                  key={p.title}
                  ref={ref}
                  initial={{ opacity: 0, y: 32 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -5 }}
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
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: p.color, borderRadius: '18px 18px 0 0' }} />
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ delay: i * 0.12 + 0.2, type: 'spring', stiffness: 150 }}
                    style={{
                      width: 44, height: 44, borderRadius: 12,
                      background: `${p.color}15`, border: `1px solid ${p.color}30`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1.2rem', color: p.color, marginBottom: 16,
                    }}
                  >
                    {p.icon}
                  </motion.div>
                  <h3 className="text-display" style={{ fontSize: '1.2rem', marginBottom: 8 }}>{p.title}</h3>
                  <p className="text-body text-muted" style={{ fontSize: '0.875rem', lineHeight: 1.65 }}>{p.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Areas of Focus ── */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ marginBottom: 48 }}
          >
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-muted)', marginBottom: 10 }}>
              Areas of Focus
            </div>
            <h2 className="text-display" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)' }}>
              Our Philosophy in Action
            </h2>
            <p style={{ fontSize: '1rem', lineHeight: 1.75, color: 'var(--text-muted)', maxWidth: 600, marginTop: 12 }}>
              We believe clinical research is more than a process — it is a collective effort to improve human health. Every protocol developed, every participant enrolled, every study completed contributes to advancing medical science.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
            {focusAreas.map((area, i) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -4 }}
                style={{
                  padding: '28px 24px',
                  background: 'var(--bg-secondary)',
                  borderRadius: 18,
                  border: '1px solid var(--border)',
                  boxShadow: 'var(--shadow-subtle)',
                  borderLeft: `3px solid ${ACCENT[i]}`,
                }}
              >
                <h3 className="text-display" style={{ fontSize: '1.15rem', marginBottom: 10, color: 'var(--text-primary)' }}>{area.title}</h3>
                <p className="text-body text-muted" style={{ fontSize: '0.875rem', lineHeight: 1.65 }}>{area.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Identity close ── */}
      <section style={{ padding: '60px 0', background: 'linear-gradient(135deg, #070e17, #0a1e35)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#fff', lineHeight: 1.2, marginBottom: 16 }}>
              Medikatha – Story of Medicine
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, maxWidth: 600, margin: '0 auto 32px' }}>
              A story that begins in the laboratory, progresses through research and clinical trials, and reaches its destination in the lives of patients. We are proud to be a part of that story.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              {['Sponsors', 'CROs', 'Hospitals', 'Investigators', 'Research Aspirants'].map((tag) => (
                <span key={tag} style={{
                  padding: '6px 16px', borderRadius: 999,
                  border: '1px solid rgba(255,255,255,0.15)',
                  fontFamily: 'var(--font-ui)', fontSize: '0.78rem', fontWeight: 500,
                  color: 'rgba(255,255,255,0.6)',
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
