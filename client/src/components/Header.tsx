import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { MedikathaLogo } from './MedikathaLogo';

const navItems = [
  { label: 'Home',       to: '/' },
  { label: 'About',      to: '/about' },
  { label: 'Services',   to: '/services' },
  { label: 'Courses',    to: '/courses' },
  { label: 'Contact Us', to: '/contact' },
];

export function Header() {
  const location = useLocation();
  const { scrollY } = useScroll();
  const [hidden,   setHidden]   = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme,    setTheme]    = useState<'light' | 'dark'>('light');
  const [menuOpen, setMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(latest > prev && latest > 100);
    setScrolled(latest > 20);
  });

  return (
    <>
      <motion.header
        variants={{ visible: { y: 0 }, hidden: { y: '-110%' } }}
        animate={hidden ? 'hidden' : 'visible'}
        transition={{ duration: 0.28, ease: 'easeInOut' }}
        style={{ position: 'sticky', top: 0, zIndex: 100, padding: '8px 0' }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
            /* glass pill */
            background:       scrolled ? 'var(--glass-bg)'     : 'transparent',
            backdropFilter:   scrolled ? 'blur(22px)'          : 'none',
            WebkitBackdropFilter: scrolled ? 'blur(22px)'      : 'none',
            border:           scrolled ? '1px solid var(--glass-border)' : '1px solid transparent',
            borderRadius:     999,
            padding:          '8px 16px 8px 10px',
            boxShadow:        scrolled ? 'var(--shadow-raised)' : 'none',
            transition:       'background 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
          }}
        >
          {/* ── Logo ── */}
          <Link to="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
            <MedikathaLogo size={44} variant="auto" />
          </Link>

          {/* ── Desktop Nav ── */}
          <nav
            className="hdr-desktop-nav"
            style={{ display: 'flex', alignItems: 'center', gap: 0, flex: 1, justifyContent: 'center' }}
          >
            {navItems.map((item) => {
              const isActive = location.pathname === item.to ||
                (item.to !== '/' && location.pathname.startsWith(item.to));
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  style={{
                    position: 'relative',
                    padding: '7px 15px',
                    fontSize: '0.83rem',
                    fontFamily: 'var(--font-ui)',
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                    transition: 'color 0.2s',
                    whiteSpace: 'nowrap',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'; }}
                  onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = ''; }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navbar-pill"
                      style={{
                        position: 'absolute', inset: 0,
                        background: 'var(--border)',
                        borderRadius: 999, zIndex: -1,
                      }}
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          {/* ── Right Controls ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
            {/* Theme toggle */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
              title={theme === 'light' ? 'Dark Mode' : 'Light Mode'}
              style={{
                background: 'var(--bg-secondary)', border: '1px solid var(--border-strong)',
                borderRadius: '50%', cursor: 'pointer',
                width: 36, height: 36,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.1rem', lineHeight: 1,
                color: 'var(--text-primary)',
                boxShadow: 'var(--shadow-subtle)'
              }}
            >
              {theme === 'light' ? '☾' : '☼'}
            </motion.button>

            {/* CTA */}
            <motion.div className="hdr-cta" whileHover={{ scale: 1.04, y: -1 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/contact"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '10px 24px',
                  borderRadius: 999,
                  background: 'var(--brand-blue)',
                  color: '#fff',
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.9rem', fontWeight: 600,
                  textDecoration: 'none', whiteSpace: 'nowrap',
                  boxShadow: '0 4px 16px rgba(15,108,207,0.35)',
                }}
              >
                Get In Touch
              </Link>
            </motion.div>

            {/* Hamburger — mobile only */}
            <button
              className="hdr-hamburger"
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Toggle navigation"
              style={{
                display: 'none',
                background: 'var(--bg-alt)',
                border: '1px solid var(--border)',
                borderRadius: 8,
                padding: '6px 10px',
                cursor: 'pointer',
                fontSize: '1rem',
                lineHeight: 1,
                color: 'var(--text-primary)',
              }}
            >
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            style={{
              position: 'fixed', top: 72, left: 12, right: 12,
              zIndex: 99,
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(28px)',
              WebkitBackdropFilter: 'blur(28px)',
              borderRadius: 18,
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-float)',
              padding: '4px 0 8px',
              overflow: 'hidden',
            }}
          >
            {/* Logo in drawer */}
            <div style={{ padding: '14px 20px 12px', borderBottom: '1px solid var(--border)' }}>
              <MedikathaLogo size={36} variant="auto" />
            </div>
            {navItems.map((item, i) => (
              <motion.div
                key={item.to}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <NavLink
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '16px 20px',
                    fontFamily: 'var(--font-ui)',
                    fontSize: '1rem', fontWeight: 500,
                    color: location.pathname === item.to ? 'var(--brand-blue)' : 'var(--text-primary)',
                    borderBottom: i < navItems.length - 1 ? '1px solid var(--border)' : 'none',
                    textDecoration: 'none',
                    background: location.pathname === item.to ? 'rgba(15,108,207,0.05)' : 'transparent',
                  }}
                >
                  {location.pathname === item.to && (
                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--brand-blue)', flexShrink: 0 }} />
                  )}
                  {item.label}
                </NavLink>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 860px) {
          .hdr-desktop-nav { display: none !important; }
          .hdr-hamburger { display: block !important; }
        }
        @media (max-width: 580px) {
          .hdr-cta { display: none !important; }
        }
      `}</style>
    </>
  );
}
