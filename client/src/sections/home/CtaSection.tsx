import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../components/Button';

// Colorful floating word decorations
const floatingWords = [
  { word: 'Cardiology', x: '5%', y: '15%', color: '#e03a3a', delay: 0 },
  { word: 'Diabetes', x: '75%', y: '10%', color: '#0f6ccf', delay: 0.4 },
  { word: 'Patient Trust', x: '10%', y: '75%', color: '#66ba3c', delay: 0.8 },
  { word: 'Adherence', x: '70%', y: '78%', color: '#9b59b6', delay: 0.3 },
  { word: 'Oncology', x: '50%', y: '5%', color: '#e67e22', delay: 0.6 },
  { word: 'Storytelling', x: '85%', y: '50%', color: '#1abc9c', delay: 1 },
];

export function CtaSection() {
  return (
    <section style={{
      position: 'relative',
      overflow: 'hidden',
      padding: 'var(--space-16) 0',
      background: 'linear-gradient(135deg, #0b1e35 0%, #0a3a6b 50%, #0b1e35 100%)',
    }}>
      {/* Floating colored word decorations */}
      {floatingWords.map((item, i) => (
        <motion.div
          key={item.word}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          animate={{ y: [0, -8, 0] }}
          transition={{
            opacity: { duration: 0.6, delay: item.delay },
            y: { duration: 4 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: item.delay }
          }}
          style={{
            position: 'absolute',
            left: item.x,
            top: item.y,
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(0.9rem, 1.5vw, 1.2rem)',
            color: item.color,
            opacity: 0.35,
            fontStyle: 'italic',
            pointerEvents: 'none',
            userSelect: 'none',
            letterSpacing: '0.02em',
          }}
        >
          {item.word}
        </motion.div>
      ))}

      {/* Radial glow blobs */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', top: '-30%', left: '-10%',
          width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, #0f6ccf 0%, transparent 70%)',
          filter: 'blur(60px)', pointerEvents: 'none',
        }}
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.28, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        style={{
          position: 'absolute', bottom: '-20%', right: '-10%',
          width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, #66ba3c 0%, transparent 70%)',
          filter: 'blur(60px)', pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            marginBottom: 20,
            fontFamily: 'var(--font-ui)', fontSize: '0.72rem', fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.5)',
          }}>
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ width: 6, height: 6, borderRadius: '50%', background: '#66ba3c', display: 'inline-block' }}
            />
            Ready to transform your brand?
          </div>

          <h2 className="text-display" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: '#fff', lineHeight: 1.1, marginBottom: 16, maxWidth: 700, margin: '0 auto 16px' }}>
            Ready to make your clinical communication unforgettable?
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, maxWidth: 560, margin: '0 auto 36px' }}>
            Book a strategy call to discuss how we can build better patient understanding and adherence for your therapies.
          </p>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button to="/contact" variant="secondary">Book Strategy Call</Button>
            <Button to="/stories" variant="ghost">See Our Work →</Button>
          </div>

          {/* Colorful stat pills */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginTop: 40 }}
          >
            {[
              { stat: '50+', label: 'Narratives', color: '#0f6ccf' },
              { stat: '15+', label: 'Therapy Areas', color: '#66ba3c' },
              { stat: '3×', label: 'Comprehension', color: '#e03a3a' },
            ].map(item => (
              <div key={item.stat} style={{
                padding: '10px 20px',
                borderRadius: 'var(--radius-full)',
                background: `${item.color}20`,
                border: `1px solid ${item.color}40`,
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: item.color }}>{item.stat}</span>
                <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>{item.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
