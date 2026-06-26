import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MedikathaLogo } from '../../components/MedikathaLogo';
// ── Rotating tagline words ─────────────────────────────────────────
const rotatingWords = ['Innovation', 'Discovery', 'Partnership', 'Excellence', 'Education', 'Research'];

function RotatingWord() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIndex(i => (i + 1) % rotatingWords.length), 2600);
    return () => clearInterval(t);
  }, []);
  return (
    <span style={{ display: 'inline-block', position: 'relative', minWidth: 200 }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'inline-block', color: 'var(--brand-blue)', fontStyle: 'italic' }}
        >
          {rotatingWords[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

// ── ISO Badge ────────────────────────────────────────────────────
function IsoBadge() {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      padding: '5px 14px 5px 8px',
      borderRadius: 999,
      background: 'rgba(102,186,60,0.1)',
      border: '1px solid rgba(102,186,60,0.28)',
    }}>
      <div style={{
        width: 22, height: 22, borderRadius: '50%',
        background: 'linear-gradient(135deg, #66ba3c, #48a020)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '0.6rem', fontWeight: 800, color: '#fff',
        fontFamily: 'var(--font-ui)', flexShrink: 0,
      }}>✓</div>
      <span style={{
        fontFamily: 'var(--font-ui)', fontSize: '0.72rem', fontWeight: 700,
        color: '#66ba3c', letterSpacing: '0.05em',
      }}>
        ISO Certified Training Institute
      </span>
    </div>
  );
}

// ── Floating metric card ─────────────────────────────────────────
function MetricCard({
  value, label, color, style,
}: { value: string; label: string; color: string; style?: React.CSSProperties }) {
  return (
    <div className="glass-card" style={{
      padding: '12px 18px',
      minWidth: 130,
      ...style,
    }}>
      <div className="text-display" style={{ fontSize: '1.8rem', color, lineHeight: 1 }}>{value}</div>
      <div className="text-ui text-muted" style={{ fontSize: '0.68rem', fontWeight: 600, marginTop: 3 }}>{label}</div>
    </div>
  );
}

// ── Main Hero ────────────────────────────────────────────────────
export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();

  // Parallax — image moves slower than scroll (GPU transform only)
  const imgY = useTransform(scrollY, [0, 500], [0, 45]);
  const fadeOut = useTransform(scrollY, [0, 260], [1, 0.4]);

  return (
    <section
      ref={sectionRef}
      style={{ padding: '64px 0 80px', position: 'relative', overflow: 'hidden' }}
    >
      {/* Subtle ambient glow — static, no animation to avoid repaint */}
      <div style={{
        position: 'absolute', top: '-10%', right: '-5%',
        width: 520, height: 520, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(15,108,207,0.12) 0%, transparent 68%)',
        filter: 'blur(40px)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-15%', left: '-8%',
        width: 380, height: 380, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(102,186,60,0.07) 0%, transparent 70%)',
        filter: 'blur(40px)', pointerEvents: 'none',
      }} />

      <motion.div style={{ opacity: fadeOut }} className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 48,
          alignItems: 'center',
          minHeight: 520,
        }}
          className="hero-grid"
        >

          {/* ── LEFT — Copy ── */}
          <div style={{ zIndex: 2 }}>
            {/* ISO Badge */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{ marginBottom: 14 }}
            >
              <IsoBadge />
            </motion.div>

            {/* Logo in Hero */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              style={{ marginBottom: 18 }}
            >
              <MedikathaLogo size={32} variant="auto" showWordmark={true} />
            </motion.div>

            {/* Headline */}
            <h1 className="text-display" style={{
              fontSize: 'clamp(2.1rem, 4vw, 3.4rem)',
              lineHeight: 1.1, marginBottom: 18,
            }}>
              {['Where Clinical', 'Research Meets'].map((line, i) => (
                <motion.span key={line}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.08, duration: 0.55 }}
                  style={{ display: 'block' }}
                >
                  {line}
                </motion.span>
              ))}
              <RotatingWord />
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              style={{
                fontSize: '1rem', lineHeight: 1.75,
                color: 'var(--text-muted)', maxWidth: 480, marginBottom: 28,
              }}
            >
              At Medikatha Clinical Research, we believe that every medicine has a story. We support clinical trials, site management, and professional education — from molecule to market.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.45 }}
              style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}
            >
              <Link to="/services" style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '12px 28px', borderRadius: 999,
                background: 'var(--brand-blue)', color: '#fff',
                fontFamily: 'var(--font-ui)', fontSize: '0.9rem', fontWeight: 600,
                textDecoration: 'none',
                boxShadow: '0 6px 20px rgba(15,108,207,0.32)',
              }}>
                Explore Our Services
              </Link>
              <Link to="/about" style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '12px 24px', borderRadius: 999,
                border: '1px solid var(--border-strong)',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-ui)', fontSize: '0.9rem', fontWeight: 500,
                textDecoration: 'none',
              }}>
                About Us →
              </Link>
            </motion.div>

            {/* Trust pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.5 }}
              style={{ marginTop: 24, display: 'flex', gap: 20, flexWrap: 'wrap' }}
            >
              {['Clinical Research', 'Site Management', 'ISO Certified Training'].map(label => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ color: 'var(--brand-green)', fontSize: '0.75rem' }}>✦</span>
                  <span style={{
                    fontFamily: 'var(--font-ui)', fontSize: '0.74rem',
                    fontWeight: 500, color: 'var(--text-muted)',
                  }}>
                    {label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT — Animated Logo & Orbital Rings ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'relative',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              height: 480,
            }}
          >
            {/* Ambient dynamic glow behind logo */}
            <div style={{
              position: 'absolute', width: 340, height: 340, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(15,108,207,0.12) 0%, rgba(102,186,60,0.06) 50%, transparent 70%)',
              filter: 'blur(40px)',
              animation: 'pulseGlow 4s ease-in-out infinite alternate',
              pointerEvents: 'none',
              zIndex: 0,
            }} />
            
            {/* Orbital Rings - 'previous animations' style */}
            <div style={{
              position: 'absolute', width: 440, height: 440, borderRadius: '50%',
              border: '1px dashed rgba(15,108,207,0.2)',
              animation: 'spinSlow 30s linear infinite',
              pointerEvents: 'none',
              zIndex: 0,
            }}>
              <div style={{ position: 'absolute', top: -6, left: '50%', width: 12, height: 12, borderRadius: '50%', background: 'var(--brand-blue)' }} />
            </div>
            <div style={{
              position: 'absolute', width: 320, height: 320, borderRadius: '50%',
              border: '1px solid rgba(102,186,60,0.2)',
              animation: 'spinSlowReverse 20s linear infinite',
              pointerEvents: 'none',
              zIndex: 0,
            }}>
              <div style={{ position: 'absolute', bottom: -5, right: '20%', width: 10, height: 10, borderRadius: '50%', background: 'var(--brand-green)' }} />
            </div>

            <style>{`
              @keyframes pulseGlow { 
                from { transform: scale(1); opacity: 0.7; } 
                to { transform: scale(1.15); opacity: 1; } 
              }
              @keyframes spinSlow {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
              @keyframes spinSlowReverse {
                from { transform: rotate(360deg); }
                to { transform: rotate(0deg); }
              }
              @keyframes floatHeroLogo {
                0%, 100% { transform: translateY(0px); filter: drop-shadow(0 15px 30px rgba(15,108,207,0.12)); }
                50% { transform: translateY(-15px); filter: drop-shadow(0 25px 45px rgba(15,108,207,0.22)); }
              }
            `}</style>

            <div style={{ 
              position: 'relative', zIndex: 1, 
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              animation: 'floatHeroLogo 6s ease-in-out infinite',
              willChange: 'transform, filter',
            }}>
              <motion.img
                src="/images/logo-icon.png"
                alt="Medikatha"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                style={{
                  width: '100%',
                  maxWidth: 420, // 'medium size proper'
                  height: 'auto',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 12px 24px rgba(12,34,51,0.08))',
                }}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>

      <style>{`
        @keyframes heroImgZoom {
          from { transform: scale(1.04); }
          to   { transform: scale(1); }
        }
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
