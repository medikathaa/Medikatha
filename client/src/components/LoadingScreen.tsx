import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'var(--bg-primary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column', gap: 'var(--space-4)',
          }}
        >
          {/* Logo mark */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 80 }}
            style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}
          >
            <div style={{
              width: 56, height: 34, borderRadius: '99px', overflow: 'hidden',
              position: 'relative', display: 'flex',
              boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
            }}>
              <div style={{ flex: 1, background: 'var(--brand-red)' }} />
              <div style={{ flex: 1, background: 'var(--brand-blue)' }} />
              <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                color: '#fff', fontSize: '18px', fontWeight: 'bold',
              }}>+</div>
            </div>
            <span className="text-display" style={{ fontSize: '2.5rem' }}>Medikatha</span>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-ui text-muted"
            style={{ letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.7rem' }}
          >
            Story of a Medicine
          </motion.p>

          {/* Animated loading bar */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 200 }}
            transition={{ delay: 0.4, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              height: 2, background: 'var(--brand-blue)',
              borderRadius: 2, marginTop: 'var(--space-2)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
