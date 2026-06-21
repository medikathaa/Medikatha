import React from 'react';
import { Eyebrow } from './Eyebrow';
import { motion } from 'framer-motion';

type SectionHeadProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
};

export function SectionHead({ eyebrow, title, description, align = 'left' }: SectionHeadProps) {
  return (
    <div style={{ textAlign: align, maxWidth: align === 'center' ? '800px' : '600px', margin: align === 'center' ? '0 auto var(--space-8)' : '0 0 var(--space-8)' }}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: 'var(--space-3)' }}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-body text-muted"
          style={{ fontSize: '1.125rem' }}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
