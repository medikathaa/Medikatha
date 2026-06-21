import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Button } from '../../components/Button';

// ── Rotating therapy words ──────────────────────────────────────
const therapyWords = ['Cardiology', 'Diabetes', 'Respiratory', "Women's Health", 'Oncology', 'Neurology'];

function RotatingWord() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIndex(i => (i + 1) % therapyWords.length), 2400);
    return () => clearInterval(t);
  }, []);

  return (
    <span style={{ display: 'inline-block', position: 'relative' }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -24, filter: 'blur(6px)' }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'inline-block', color: 'var(--brand-blue)', fontStyle: 'italic' }}
        >
          {therapyWords[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

// ── Ambient background dots ──────────────────────────────────────
const dots = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1.5,
  delay: Math.random() * 4,
  dur: Math.random() * 6 + 5,
}));

// ── Medikatha Brand Visual ───────────────────────────────────────
function MedikathaVisual({ rotateX, rotateY }: { rotateX: any; rotateY: any }) {
  return (
    <motion.div
      style={{
        width: 340, height: 340,
        position: 'relative',
        display: 'grid', placeItems: 'center',
        rotateX, rotateY,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* ── Outermost slow orbit ring ── */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 32, ease: 'linear', repeat: Infinity }}
        style={{
          position: 'absolute', inset: -56,
          border: '1px dashed rgba(15,108,207,0.25)',
          borderRadius: '50%',
        }}
      >
        {/* Orbiting blue dot */}
        <div style={{
          position: 'absolute', top: -5, left: '50%', transform: 'translateX(-50%)',
          width: 10, height: 10, borderRadius: '50%',
          background: 'var(--brand-blue)',
          boxShadow: '0 0 12px var(--brand-blue)',
        }} />
      </motion.div>

      {/* ── Middle orbit ring ── */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 22, ease: 'linear', repeat: Infinity }}
        style={{
          position: 'absolute', inset: -24,
          border: '1px solid rgba(102,186,60,0.2)',
          borderRadius: '50%',
        }}
      >
        {/* Orbiting green dot */}
        <div style={{
          position: 'absolute', bottom: -4, right: '20%',
          width: 8, height: 8, borderRadius: '50%',
          background: 'var(--brand-green)',
          boxShadow: '0 0 10px var(--brand-green)',
        }} />
      </motion.div>

      {/* ── Sonar pulse rings ── */}
      {[0, 1.2, 2.4].map((d, k) => (
        <motion.div
          key={k}
          animate={{ scale: [1, 2.2], opacity: [0.25, 0] }}
          transition={{ duration: 3, delay: d, repeat: Infinity, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            width: 100, height: 100,
            borderRadius: '50%',
            border: '1.5px solid var(--brand-blue)',
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* ── Main sphere (white card base) ── */}
      <motion.div
        initial={{ scale: 0.75, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 60 }}
        style={{
          width: 240, height: 240,
          borderRadius: '50%',
          background: 'linear-gradient(145deg, #ffffff 0%, #eef4fb 100%)',
          boxShadow: '0 24px 64px rgba(12,34,51,0.14), inset 0 1px 1px rgba(255,255,255,0.9)',
          border: '1px solid rgba(12,34,51,0.07)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* ── Capsule (the brand logo mark, large version) ── */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 6,
          }}
        >
          {/* Pill shape */}
          <div style={{
            display: 'flex',
            width: 100, height: 44,
            borderRadius: 99,
            overflow: 'hidden',
            position: 'relative',
            boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
          }}>
            <div style={{
              flex: 1,
              background: 'linear-gradient(135deg, #f05252, #c82d2d)',
            }} />
            <div style={{
              flex: 1,
              background: 'linear-gradient(135deg, #3d8fe0, #0a4d9b)',
            }} />
            {/* Center + badge */}
            <div style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 26, height: 26,
              borderRadius: 6,
              background: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 700, fontSize: 16, color: '#0c2233',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            }}>+</div>
          </div>

          {/* Brand name below pill */}
          <div style={{ textAlign: 'center', lineHeight: 1.1 }}>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.1rem',
              color: '#0c2233',
              letterSpacing: '0.03em',
            }}>Medikatha</div>
            <div style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '0.62rem',
              color: '#728c9e',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginTop: 2,
            }}>Story of a Medicine</div>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Floating metric card — top right ── */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.1, type: 'spring' }}
        className="glass-card"
        style={{
          position: 'absolute', top: '-4%', right: '-30%',
          padding: '12px 18px', width: 158,
        }}
      >
        <div className="text-display" style={{ fontSize: '1.8rem', color: 'var(--brand-blue)', lineHeight: 1 }}>50+</div>
        <div className="text-ui text-muted" style={{ fontSize: '0.7rem', fontWeight: 600, marginTop: 3 }}>Narratives Delivered</div>
      </motion.div>

      {/* ── Floating metric card — bottom left ── */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.3, type: 'spring' }}
        className="glass-card"
        style={{
          position: 'absolute', bottom: '0%', left: '-32%',
          padding: '12px 18px', width: 158,
        }}
      >
        <div className="text-display" style={{ fontSize: '1.8rem', color: 'var(--brand-green)', lineHeight: 1 }}>3×</div>
        <div className="text-ui text-muted" style={{ fontSize: '0.7rem', fontWeight: 600, marginTop: 3 }}>Faster Comprehension</div>
      </motion.div>

      {/* ── Small floating tag — bottom right ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.6, type: 'spring' }}
        style={{
          position: 'absolute', bottom: '10%', right: '-20%',
          padding: '8px 14px',
          borderRadius: 'var(--radius-full)',
          background: 'rgba(224,58,58,0.1)',
          border: '1px solid rgba(224,58,58,0.2)',
          fontFamily: 'var(--font-ui)',
          fontSize: '0.7rem', fontWeight: 600,
          color: 'var(--brand-red)',
          whiteSpace: 'nowrap',
        }}
      >
        15+ Therapy Areas
      </motion.div>
    </motion.div>
  );
}

// ── Main Hero ────────────────────────────────────────────────────
export function HeroSection() {
  const visualRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const yVisual = useTransform(scrollY, [0, 500], [0, 60]);
  const opacityHero = useTransform(scrollY, [0, 280], [1, 0.3]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-200, 200], [8, -8]), { stiffness: 80, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [-200, 200], [-8, 8]), { stiffness: 80, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!visualRef.current) return;
    const rect = visualRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - (rect.left + rect.width / 2));
    mouseY.set(e.clientY - (rect.top + rect.height / 2));
  };
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

  return (
    <section style={{ padding: '60px 0 80px', position: 'relative', overflow: 'hidden' }}>
      {/* Ambient dots */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {dots.map(d => (
          <motion.div key={d.id}
            animate={{ y: [0, -20, 0], opacity: [0.08, 0.3, 0.08] }}
            transition={{ duration: d.dur, delay: d.delay, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute', left: `${d.x}%`, top: `${d.y}%`,
              width: d.size, height: d.size, borderRadius: '50%', background: 'var(--brand-blue)',
            }}
          />
        ))}
      </div>

      {/* Blue glow */}
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.12, 0.2, 0.12] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', top: '-15%', right: '-5%',
          width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, var(--brand-blue) 0%, transparent 70%)',
          filter: 'blur(60px)', pointerEvents: 'none',
        }}
      />

      <motion.div style={{ opacity: opacityHero }} className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '40px',
          alignItems: 'center',
          minHeight: '520px',
        }}>

          {/* ── LEFT — Copy ── */}
          <div style={{ zIndex: 2 }}>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                marginBottom: 20,
                fontFamily: 'var(--font-ui)', fontSize: '0.72rem',
                fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em',
                color: 'var(--text-muted)',
              }}
            >
              <motion.span
                animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--brand-green)', display: 'inline-block' }}
              />
              Clinical Insight. Human Language.
            </motion.div>

            {/* Headline */}
            <h1 className="text-display" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', lineHeight: 1.1, marginBottom: 20 }}>
              {['Making', 'Every'].map((word, i) => (
                <motion.span key={word}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.07, type: 'spring', stiffness: 90 }}
                  style={{ display: 'inline-block', marginRight: '0.22em' }}
                >
                  {word}
                </motion.span>
              ))}
              <br />
              <RotatingWord />
              <br />
              {['Story', 'Easy', 'to', 'Trust'].map((word, i) => (
                <motion.span key={word}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.06, type: 'spring', stiffness: 90 }}
                  style={{ display: 'inline-block', marginRight: '0.22em' }}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--text-muted)', maxWidth: 480, marginBottom: 28 }}
            >
              Medikatha is a healthcare storytelling and strategy brand that turns clinical complexity into meaningful patient journeys, treatment clarity, and better adherence.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95 }}
              style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}
            >
              <Button to="/contact" variant="primary">Book a Strategy Call</Button>
              <Button to="/stories" variant="ghost">Explore Stories →</Button>
            </motion.div>

            {/* Trust row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              style={{ marginTop: 28, display: 'flex', gap: 24, flexWrap: 'wrap' }}
            >
              {['50+ Narratives', '15+ Therapy Areas', '3× Comprehension'].map(label => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ color: 'var(--brand-green)', fontSize: '0.8rem' }}>✦</span>
                  <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-muted)' }}>{label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT — Brand Visual ── */}
          <div
            ref={visualRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              perspective: 1000, height: 420,
            }}
          >
            <motion.div style={{ y: yVisual }}>
              <MedikathaVisual rotateX={rotateX} rotateY={rotateY} />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Responsive: stack on mobile */}
      <style>{`
        @media (max-width: 760px) {
          .hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
