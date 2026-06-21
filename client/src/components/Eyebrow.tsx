import React from 'react';
import { motion } from 'framer-motion';

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <motion.p 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-ui text-muted"
      style={{
        textTransform: 'uppercase',
        letterSpacing: '0.15em',
        fontSize: '0.75rem',
        fontWeight: 600,
        marginBottom: 'var(--space-2)'
      }}
    >
      {children}
    </motion.p>
  );
}
