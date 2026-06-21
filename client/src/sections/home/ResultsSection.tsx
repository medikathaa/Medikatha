import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

function useCounter(to: number, duration: number, trigger: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start: number;
    let raf: number;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / (duration * 1000), 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [trigger, to, duration]);
  return count;
}

function KpiBlock({ value, suffix, label, color, index }: {
  value: number; suffix: string; label: string; color: string; index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const count = useCounter(value, 2.2, inView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      style={{ textAlign: 'center', position: 'relative' }}
    >
      {/* Glow behind number */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: index * 0.5 }}
        style={{
          position: 'absolute', top: '0%', left: '50%', transform: 'translate(-50%, -20%)',
          width: 100, height: 100, borderRadius: '50%',
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          filter: 'blur(20px)', pointerEvents: 'none', zIndex: 0,
        }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div className="text-display" style={{
          fontSize: 'clamp(3.5rem, 7vw, 5.5rem)',
          lineHeight: 1, color,
          textShadow: `0 0 40px ${color}40`,
        }}>
          {count}{suffix}
        </div>
        <div className="text-ui text-muted" style={{
          fontWeight: 600, marginTop: 8, fontSize: '1rem', letterSpacing: '0.02em',
        }}>
          {label}
        </div>
      </div>
    </motion.div>
  );
}

export function ResultsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section style={{ padding: 'var(--space-16) 0', background: 'var(--bg-alt)', position: 'relative', overflow: 'hidden' }}>
      {/* Sweeping light bloom */}
      <motion.div
        initial={{ x: '-120%', skewX: -15 }}
        whileInView={{ x: '220%' }}
        viewport={{ once: true }}
        transition={{ duration: 2.2, ease: 'easeInOut', delay: 0.5 }}
        style={{
          position: 'absolute', top: 0, bottom: 0, width: '40%',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
          pointerEvents: 'none', zIndex: 1,
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="glass-card"
          style={{ padding: 'var(--space-10) var(--space-8)' }}
        >
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 32,
          }}>
            <KpiBlock value={50} suffix="+" label="Clinical Narratives" color="#0f6ccf" index={0} />
            <div style={{ borderLeft: '1px solid var(--border)', borderRight: '1px solid var(--border)' }}>
              <KpiBlock value={15} suffix="+" label="Therapy Segments" color="#66ba3c" index={1} />
            </div>
            <KpiBlock value={3} suffix="×" label="Faster Comprehension" color="#e03a3a" index={2} />
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 560px) {
          .kpi-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
