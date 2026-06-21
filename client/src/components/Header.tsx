import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Button } from './Button';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Therapeutic', to: '/therapeutic-areas' },
  { label: 'Stories', to: '/stories' },
  { label: 'Resources', to: '/resources' },
  { label: 'Courses', to: '/courses' },
  { label: 'Contact Us', to: '/contact' },
];

export function Header() {
  const location = useLocation();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(latest > previous && latest > 120);
    setScrolled(latest > 16);
  });

  return (
    <>
      <motion.header
        variants={{ visible: { y: 0 }, hidden: { y: '-110%' } }}
        animate={hidden ? 'hidden' : 'visible'}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        style={{ position: 'sticky', top: 0, zIndex: 100, padding: '10px 0' }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            /* Glass pill */
            background: scrolled ? 'var(--glass-bg)' : 'transparent',
            backdropFilter: scrolled ? 'blur(20px)' : 'none',
            WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
            border: scrolled ? '1px solid var(--glass-border)' : '1px solid transparent',
            borderRadius: 999,
            padding: '8px 16px 8px 12px',
            boxShadow: scrolled ? 'var(--shadow-raised)' : 'none',
            transition: 'background 0.35s ease, box-shadow 0.35s ease, border 0.35s ease',
          }}
        >
          {/* ── Logo ── */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <div style={{
              display: 'flex', width: 36, height: 20,
              borderRadius: 99, overflow: 'hidden', position: 'relative',
            }}>
              <div style={{ flex: 1, background: 'var(--brand-red)' }} />
              <div style={{ flex: 1, background: 'var(--brand-blue)' }} />
              <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                color: '#fff', fontSize: 12, fontWeight: 700, lineHeight: 1,
              }}>+</div>
            </div>
            <span className="text-display" style={{ fontSize: '1.1rem', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>
              Medikatha
            </span>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
            {navItems.map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  style={{
                    position: 'relative',
                    padding: '6px 12px',
                    fontSize: '0.82rem',
                    fontFamily: 'var(--font-ui)',
                    fontWeight: 500,
                    color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                    transition: 'color 0.2s',
                    whiteSpace: 'nowrap',
                    zIndex: 1,
                  }}
                  onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'; }}
                  onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'; }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navbar-pill"
                      style={{
                        position: 'absolute', inset: 0,
                        background: 'var(--border)',
                        borderRadius: 999, zIndex: -1,
                      }}
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span style={{ position: 'relative', zIndex: 1 }}>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* ── Right Controls ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
            {/* Dark mode toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.92 }}
              onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
              style={{
                background: 'var(--bg-alt)', border: '1px solid var(--border)',
                borderRadius: 8, cursor: 'pointer',
                fontSize: '0.9rem', padding: '5px 8px', lineHeight: 1,
              }}
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
              {theme === 'light' ? '☾' : '☼'}
            </motion.button>

            {/* CTA */}
            <Button to="/contact" variant="primary">Strategy Call</Button>

            {/* Hamburger — mobile only */}
            <motion.button
              className="hamburger"
              whileTap={{ scale: 0.9 }}
              onClick={() => setMenuOpen(o => !o)}
              style={{
                display: 'none',
                background: 'var(--bg-alt)',
                border: '1px solid var(--border)',
                borderRadius: 8,
                padding: '6px 8px',
                cursor: 'pointer',
                fontSize: '1rem',
                lineHeight: 1,
              }}
              aria-label="Toggle menu"
            >
              {menuOpen ? '✕' : '☰'}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed', top: 68, left: 16, right: 16,
              zIndex: 99,
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(24px)',
              borderRadius: 16,
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-float)',
              padding: '8px 0',
            }}
          >
            {navItems.map((item, i) => (
              <motion.div
                key={item.to}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <NavLink
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: 'block',
                    padding: '12px 20px',
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    color: location.pathname === item.to ? 'var(--brand-blue)' : 'var(--text-primary)',
                    borderBottom: i < navItems.length - 1 ? '1px solid var(--border)' : 'none',
                  }}
                >
                  {item.label}
                </NavLink>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 860px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
