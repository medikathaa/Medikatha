import React from 'react';
import { motion } from 'framer-motion';

const tags = [
  { label: 'Healthcare Storytelling', color: '#0f6ccf' },
  { label: 'Clinical Communication', color: '#e03a3a' },
  { label: 'Patient Education', color: '#66ba3c' },
  { label: 'Pharma Content', color: '#9b59b6' },
  { label: 'Medical Writing', color: '#e67e22' },
  { label: 'Therapy Strategy', color: '#1abc9c' },
  { label: 'SEO for Healthcare', color: '#0f6ccf' },
  { label: 'Treatment Adherence', color: '#e03a3a' },
];

// Duplicate for seamless loop
const allTags = [...tags, ...tags];

export function MarqueeStrip() {
  return (
    <div style={{ overflow: 'hidden', padding: '20px 0', background: 'var(--bg-alt)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 22, ease: 'linear', repeat: Infinity }}
        style={{ display: 'flex', gap: 12, width: 'max-content' }}
      >
        {allTags.map((tag, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '7px 18px',
            borderRadius: 'var(--radius-full)',
            background: `${tag.color}15`,
            border: `1px solid ${tag.color}30`,
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: tag.color, flexShrink: 0 }} />
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.8rem', fontWeight: 600, color: tag.color }}>
              {tag.label}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
