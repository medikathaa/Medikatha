import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MedikathaLogo } from './MedikathaLogo';

const footerNav = {
  Navigate: [
    { label: 'Home',       to: '/' },
    { label: 'About Us',   to: '/about' },
    { label: 'Services',   to: '/services' },
    { label: 'Courses',    to: '/courses' },
    { label: 'Contact Us', to: '/contact' },
  ],
  Connect: [
    { label: 'medikathacr@gmail.com',        href: 'mailto:medikathacr@gmail.com' },
    { label: 'nikita.medikatha@gmail.com',   href: 'mailto:nikita.medikatha@gmail.com' },
    { label: '+91 7767809945',               href: 'tel:+917767809945' },
    { label: 'LinkedIn',                     href: 'https://www.linkedin.com/company/101387086' },
    { label: 'Instagram',                    href: 'https://www.instagram.com/medikatha_research' },
  ],
};

export function Footer() {
  const year = new Date().getFullYear();
  const [email, setEmail]         = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email.includes('@')) { setSubscribed(true); setEmail(''); }
  };

  return (
    <footer style={{
      background: '#070e17',
      backgroundColor: '#070e17',
      color: 'rgba(255,255,255,0.55)',
      position: 'relative',
      overflow: 'hidden',
      zIndex: 1,
    }}>
      {/* Top accent line */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '55%', height: 1,
        background: 'linear-gradient(90deg, transparent, #0f6ccf60, transparent)',
      }} />

      {/* Static glow blobs (no animation = no repaint) */}
      <div style={{
        position: 'absolute', bottom: -100, right: -100, width: 400, height: 400,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(15,108,207,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: -60, left: -80, width: 300, height: 300,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(102,186,60,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ paddingTop: 80, paddingBottom: 48 }}>

        {/* ── Large Statement ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          style={{
            borderBottom: '1px solid rgba(255,255,255,0.07)',
            paddingBottom: 56, marginBottom: 56,
          }}
        >
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.6rem, 6.5vw, 5rem)',
            color: '#fff', lineHeight: 1.08,
            letterSpacing: '-0.02em', maxWidth: 820,
          }}>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              style={{ display: 'block' }}
            >
              Clinical Insight.
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.22, duration: 0.6 }}
              style={{ display: 'block', color: '#0f6ccf' }}
            >
              Human Language.
            </motion.span>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            style={{
              fontFamily: 'var(--font-body)', fontSize: '1.05rem',
              color: 'rgba(255,255,255,0.42)', lineHeight: 1.72,
              maxWidth: 520, marginTop: 20, marginBottom: 32,
            }}
          >
            Medikatha Clinical Research — advancing healthcare through expert site management, clinical research support, and ISO-certified professional education.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <Link to="/contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '11px 26px', borderRadius: 999,
              background: '#0f6ccf', color: '#fff',
              fontFamily: 'var(--font-ui)', fontSize: '0.88rem', fontWeight: 600,
              textDecoration: 'none',
              boxShadow: '0 6px 22px rgba(15,108,207,0.32)',
              transition: 'transform 0.2s ease',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; }}
            >
              Get In Touch →
            </Link>
          </motion.div>
        </motion.div>

        {/* ── Main grid ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 40,
          marginBottom: 48,
        }}>
          {/* Brand column — real logo */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Logo with wordmark (light variant = white text) */}
            <MedikathaLogo size={42} variant="light" animate={false} showWordmark={true} />

            <p style={{
              maxWidth: 240, lineHeight: 1.75, fontSize: '0.875rem',
              marginTop: 14, color: 'rgba(255,255,255,0.4)',
            }}>
              A Clinical Research and Site Management Organization — Story of Medicine.
            </p>

            {/* ISO badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              marginTop: 14, padding: '4px 12px 4px 8px', borderRadius: 999,
              background: 'rgba(102,186,60,0.1)', border: '1px solid rgba(102,186,60,0.22)',
            }}>
              <div style={{
                width: 18, height: 18, borderRadius: '50%', background: '#66ba3c',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.56rem', fontWeight: 800, color: '#fff',
              }}>✓</div>
              <span style={{
                fontFamily: 'var(--font-ui)', fontSize: '0.66rem',
                fontWeight: 700, color: '#66ba3c', letterSpacing: '0.06em',
              }}>
                ISO CERTIFIED
              </span>
            </div>
          </motion.div>

          {/* Links columns */}
          {Object.entries(footerNav).map(([group, links], gi) => (
            <motion.div
              key={group}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: gi * 0.08 }}
            >
              <h4 style={{
                color: '#fff', marginBottom: 16,
                fontFamily: 'var(--font-ui)', fontSize: '0.75rem',
                textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700,
              }}>
                {group}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {(links as any[]).map((link) => (
                  <li key={link.label}>
                    {'to' in link ? (
                      <Link to={link.to} style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.2s' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#fff'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = ''; }}
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a href={link.href}
                        target={link.href?.startsWith('http') ? '_blank' : undefined}
                        rel={link.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                        style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.2s', wordBreak: 'break-word' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#fff'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = ''; }}
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
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 style={{
              color: '#fff', marginBottom: 8,
              fontFamily: 'var(--font-ui)', fontSize: '0.75rem',
              textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700,
            }}>
              Stay Updated
            </h4>
            <p style={{ fontSize: '0.875rem', marginBottom: 14, lineHeight: 1.6, color: 'rgba(255,255,255,0.42)' }}>
              Clinical research insights, monthly.
            </p>
            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                style={{
                  padding: '10px 16px', borderRadius: 10,
                  background: 'rgba(102,186,60,0.14)', border: '1px solid rgba(102,186,60,0.28)',
                  fontFamily: 'var(--font-ui)', fontSize: '0.8rem', color: '#66ba3c', fontWeight: 600,
                }}
              >
                ✓ Thanks for subscribing!
              </motion.div>
            ) : (
              <div style={{ display: 'flex', gap: 8 }}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') handleSubscribe(); }}
                  style={{
                    flex: 1, padding: '9px 13px', borderRadius: 8, minWidth: 0,
                    border: '1px solid rgba(255,255,255,0.1)',
                    background: 'rgba(255,255,255,0.05)',
                    color: '#fff', fontFamily: 'var(--font-body)', fontSize: '0.875rem',
                    outline: 'none',
                  }}
                />
                <button
                  onClick={handleSubscribe}
                  style={{
                    padding: '9px 16px', borderRadius: 8, border: 'none',
                    background: '#0f6ccf', color: '#fff', cursor: 'pointer',
                    fontFamily: 'var(--font-ui)', fontSize: '0.875rem', fontWeight: 600,
                    transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.85'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
                >
                  →
                </button>
              </div>
            )}
          </motion.div>
        </div>

        {/* ── Bottom bar ── */}
        <div style={{
          paddingTop: 20,
          borderTop: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap', gap: 12,
        }}>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.78rem' }}>
            © {year} Medikatha Clinical Research. All rights reserved.
          </p>

          {/* Animated icon-only logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <img
              src="/images/logo-icon.png"
              alt="Medikatha"
              width={28} height={28}
              loading="lazy"
              decoding="async"
              style={{
                objectFit: 'contain',
                animation: 'logoFloat 4s ease-in-out infinite',
                willChange: 'transform',
              }}
            />
            <style>{`@keyframes logoFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}`}</style>
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.72rem', color: 'rgba(255,255,255,0.28)', letterSpacing: '0.05em' }}>
              Story of Medicine
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
