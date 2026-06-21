import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const footerLinks = {
  Explore: [
    { label: 'About Us', to: '/about' },
    { label: 'Therapeutic Areas', to: '/therapeutic-areas' },
    { label: 'Medicine Stories', to: '/stories' },
    { label: 'Resources', to: '/resources' },
  ],
  Connect: [
    { label: 'Contact Us', to: '/contact' },
    { label: 'hello@medikatha.com', href: 'mailto:hello@medikatha.com' },
    { label: '+91 88888 00000', href: 'tel:+918888800000' },
  ],
};

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{
      background: 'var(--bg-primary)',
      color: 'rgba(255,255,255,0.55)',
      padding: 'var(--space-16) 0 var(--space-6)',
      marginTop: 'auto',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Top glow */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '60%', height: '1px',
        background: 'linear-gradient(90deg, transparent, var(--brand-blue), transparent)',
      }} />

      {/* Background decoration */}
      <div style={{
        position: 'absolute', bottom: '-100px', right: '-100px',
        width: '400px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(15,108,207,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 'var(--space-10)',
            marginBottom: 'var(--space-10)',
          }}
        >
          {/* Brand */}
          <motion.div variants={itemVariants}>
            <h3 className="text-display" style={{ color: '#fff', fontSize: '2.5rem', marginBottom: 'var(--space-3)', lineHeight: 1 }}>
              Medi<br />katha
            </h3>
            <p className="text-body" style={{ maxWidth: '260px', lineHeight: 1.8, fontSize: '0.9rem' }}>
              We transform medicine into meaningful stories that improve understanding, trust, and outcomes.
            </p>
            <div style={{ marginTop: 'var(--space-4)', display: 'flex', gap: 'var(--space-3)' }}>
              {['Clinical Insight', 'Human Language'].map(tag => (
                <span key={tag} style={{
                  padding: '4px 10px', borderRadius: 'var(--radius-full)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  fontSize: '0.7rem', fontFamily: 'var(--font-ui)',
                  color: 'rgba(255,255,255,0.5)'
                }}>{tag}</span>
              ))}
            </div>
          </motion.div>

          {/* Links */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <motion.div key={group} variants={itemVariants}>
              <h4 className="text-ui" style={{ color: '#fff', marginBottom: 'var(--space-4)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                {group}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {links.map((link: any) => (
                  <li key={link.label}>
                    {'to' in link ? (
                      <Link to={link.to} style={{ fontSize: '0.9375rem', transition: 'color 0.2s' }}
                        onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                        onMouseLeave={e => (e.currentTarget.style.color = '')}
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a href={link.href} style={{ fontSize: '0.9375rem', transition: 'color 0.2s' }}
                        onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                        onMouseLeave={e => (e.currentTarget.style.color = '')}
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Newsletter */}
          <motion.div variants={itemVariants}>
            <h4 className="text-ui" style={{ color: '#fff', marginBottom: 'var(--space-2)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
              Stay Updated
            </h4>
            <p style={{ fontSize: '0.875rem', marginBottom: 'var(--space-3)', lineHeight: 1.6 }}>
              Healthcare communication insights, monthly.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
              <input
                type="email"
                placeholder="your@email.com"
                style={{
                  flex: 1, padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#fff',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  outline: 'none',
                  minWidth: 0,
                }}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: '10px 18px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--brand-blue)',
                  border: 'none', cursor: 'pointer',
                  color: '#fff', fontFamily: 'var(--font-ui)',
                  fontSize: '0.875rem', fontWeight: 600,
                  whiteSpace: 'nowrap',
                }}
              >
                →
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <div style={{
          paddingTop: 'var(--space-5)',
          borderTop: '1px solid rgba(255,255,255,0.07)',
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-3)',
          fontSize: '0.8rem',
        }}>
          <p>© {year} Medikatha. All rights reserved.</p>
          <p className="text-ui" style={{ letterSpacing: '0.05em' }}>Story of a Medicine</p>
        </div>
      </div>
    </footer>
  );
}
