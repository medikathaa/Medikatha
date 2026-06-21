import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { usePageSeo } from '../lib/seo';

const ACCENT = ['#0f6ccf', '#66ba3c', '#e03a3a', '#9b59b6'];

const principles = [
  { title: 'Evidence First', desc: 'Every narrative is grounded in peer-reviewed clinical evidence and real-world data.', color: '#0f6ccf', icon: '◈' },
  { title: 'Plain Language', desc: 'We convert medical jargon into words that any patient or caregiver can act on.', color: '#66ba3c', icon: '◉' },
  { title: 'Ethical Precision', desc: 'No exaggeration, no fear-mongering. Only honest, measured healthcare communication.', color: '#e03a3a', icon: '◆' },
  { title: 'Behaviour-Led Design', desc: 'Stories are structured to encourage adherence, trust, and confident health decisions.', color: '#9b59b6', icon: '✦' },
];

const milestones = [
  { year: '2019', event: 'Medikatha founded with a focus on therapeutic storytelling for Tier-2 India.' },
  { year: '2020', event: 'Expanded to serve pharma brands with clinical communication frameworks.' },
  { year: '2022', event: 'Launched SEO-optimised patient education portals across 6 therapy areas.' },
  { year: '2024', event: 'Delivered 50+ clinical narratives across India\'s leading healthcare networks.' },
];

const workItems = [
  'Clinical review and evidence mapping',
  'Patient-language narrative structuring',
  'Therapy-area storytelling templates',
  'Omnichannel deployment plans',
  'SEO-ready content architecture',
  'Regional language localization',
];

function TimelineItem({ year, event, index }: { year: string; event: string; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const color = ACCENT[index % ACCENT.length];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
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
            width: 48, height: 48, borderRadius: '50%',
            background: color, color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-display)', fontSize: '0.75rem', fontWeight: 400,
            boxShadow: `0 0 0 6px var(--bg-primary), 0 0 0 7px ${color}30`,
          }}
        >
          {year.slice(2)}
        </motion.div>
      </div>
      <div style={{ paddingTop: 12 }}>
        <div style={{
          fontFamily: 'var(--font-ui)', fontSize: '0.7rem', fontWeight: 700,
          textTransform: 'uppercase', letterSpacing: '0.12em', color, marginBottom: 4,
        }}>{year}</div>
        <p className="text-body" style={{ fontSize: '0.95rem', lineHeight: 1.65, color: 'var(--text-secondary)' }}>{event}</p>
      </div>
    </motion.div>
  );
}

export function AboutPage() {
  usePageSeo({
    title: 'About Medikatha',
    description: 'Learn Medikatha\'s mission, quality framework, and clinical storytelling process for modern healthcare communication.',
    path: '/about',
  });

  return (
    <main>
      {/* ── Hero Banner ─────────────────────────────────────────── */}
      <section style={{ padding: '80px 0 60px', position: 'relative', overflow: 'hidden' }}>
        {/* Colorful background blobs */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.2, 0.12] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', top: '-20%', right: '-10%',
            width: 400, height: 400, borderRadius: '50%',
            background: 'radial-gradient(circle, #0f6ccf 0%, transparent 70%)',
            filter: 'blur(60px)', pointerEvents: 'none',
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          style={{
            position: 'absolute', bottom: 0, left: '-10%',
            width: 360, height: 360, borderRadius: '50%',
            background: 'radial-gradient(circle, #66ba3c 0%, transparent 70%)',
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
              animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 2, repeat: Infinity }}
              style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--brand-blue)' }}
            />
            Our Story
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.65 }}
            className="text-display"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', lineHeight: 1.1, marginBottom: 20, maxWidth: 720 }}
          >
            Evidence-Led Stories for Better Health Decisions
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{ fontSize: '1.1rem', lineHeight: 1.75, color: 'var(--text-muted)', maxWidth: 600 }}
          >
            Medikatha started with one belief: medicines work best when patients truly understand them.
            We combine medical evidence, communication design, and behavioural insights to build trust across the treatment journey.
          </motion.p>
        </div>
      </section>

      {/* ── Principles ─────────────────────────────────────────── */}
      <section style={{ padding: '80px 0', background: 'var(--bg-alt)' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: 48 }}
          >
            <div style={{
              fontFamily: 'var(--font-ui)', fontSize: '0.72rem', fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-muted)', marginBottom: 10,
            }}>Storytelling Principles</div>
            <h2 className="text-display" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)' }}>
              What makes our communication different
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
                  {/* Top accent line */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                    background: p.color, borderRadius: '18px 18px 0 0',
                  }} />

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

      {/* ── Timeline + How We Work ──────────────────────────────── */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 64 }}>
            {/* Timeline */}
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-display"
                style={{ fontSize: '2rem', marginBottom: 36 }}
              >
                Our Journey
              </motion.h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 28, position: 'relative' }}>
                {/* Vertical track */}
                <div style={{
                  position: 'absolute', left: 24, top: 0, bottom: 0, width: 1,
                  background: 'var(--border-strong)',
                }} />
                {milestones.map((m, i) => (
                  <TimelineItem key={m.year} year={m.year} event={m.event} index={i} />
                ))}
              </div>
            </div>

            {/* How We Work */}
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-display"
                style={{ fontSize: '2rem', marginBottom: 24 }}
              >
                How We Work
              </motion.h2>
              <p className="text-body text-muted" style={{ fontSize: '1rem', lineHeight: 1.75, marginBottom: 28 }}>
                Our teams collaborate with healthcare professionals, educators, and pharma leaders to shape communication that is precise, ethical, and easier to act on.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {workItems.map((item, i) => {
                  const ref = useRef(null);
                  const inView = useInView(ref, { once: true, margin: '-40px' });
                  const color = ACCENT[i % ACCENT.length];
                  return (
                    <motion.li
                      key={item}
                      ref={ref}
                      initial={{ opacity: 0, x: -16 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: i * 0.08, duration: 0.5 }}
                      style={{ display: 'flex', alignItems: 'center', gap: 12 }}
                    >
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: color, flexShrink: 0 }} />
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>{item}</span>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
