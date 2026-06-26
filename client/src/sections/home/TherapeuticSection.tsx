import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHead } from '../../components/SectionHead';
import { areas } from '../../data/areas';

const COLORS = ['#0f6ccf', '#66ba3c', '#e03a3a', '#9b59b6', '#e67e22', '#1abc9c'];

// SVG canvas dimensions
const CX = 400; // center X of SVG
const CY = 310; // center Y of SVG
const RX = 260; // ellipse radius X (horizontal spread)
const RY = 210; // ellipse radius Y (vertical spread)
const SVG_W = 800;
const SVG_H = 620;

// Compute angles: start from top, go clockwise
function getSpokePositions(count: number) {
  return Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * 2 * Math.PI - Math.PI / 2;
    return {
      x: CX + Math.cos(angle) * RX,
      y: CY + Math.sin(angle) * RY,
      angle,
    };
  });
}

const positions = getSpokePositions(areas.length);

// Short area labels for the nodes (keep to 2 lines max)
const shortTitles = [
  ['Oncology', ''],
  ['Vaccines', 'Pediatric & Adult'],
  ['Dermatology', ''],
  ['Neurology', ''],
  ['Cardiology', ''],
  ['Medical', 'Devices'],
  ['Immunology', ''],
];

export function TherapeuticSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section style={{ padding: 'var(--space-20) 0', background: 'var(--bg-alt)', overflow: 'hidden' }}>
      <div className="container">
        <SectionHead
          eyebrow="Therapeutic Areas"
          title="Our Clinical Research Focus"
          description="We support clinical research across 7 key therapeutic areas. Click any area to learn more."
          align="center"
        />

        {/* ── Desktop Hub & Spoke ── */}
        <div className="hub-spoke-wrap">
          <svg
            viewBox={`0 0 ${SVG_W} ${SVG_H}`}
            style={{ width: '100%', maxWidth: 860, display: 'block', margin: '0 auto', overflow: 'visible' }}
            aria-hidden="true"
          >
            {/* Animated flowing connection lines */}
            {positions.map((pos, i) => {
              const isActive = activeIndex === i;
              return (
                <motion.line
                  key={`line-${i}`}
                  x1={CX} y1={CY}
                  x2={pos.x} y2={pos.y}
                  stroke={COLORS[i]}
                  strokeWidth={isActive ? 3 : 1.5}
                  strokeDasharray="6 6"
                  initial={{ opacity: 0, pathLength: 0, strokeDashoffset: 0 }}
                  animate={{ opacity: isActive ? 1 : 0.6, pathLength: 1, strokeDashoffset: -24 }}
                  transition={{ 
                    opacity: { delay: 0.2 + i * 0.1, duration: 0.7 },
                    pathLength: { delay: 0.2 + i * 0.1, duration: 0.7 },
                    strokeDashoffset: { duration: 1.5, repeat: Infinity, ease: 'linear' }
                  }}
                  style={{ transition: 'stroke-width 0.3s ease' }}
                />
              );
            })}

            {/* Pulsing rings behind hub */}
            {[1.6, 1.3, 1.0].map((scale, k) => (
              <motion.circle
                key={`ring-${k}`}
                cx={CX} cy={CY} r={58 * scale}
                fill="none"
                stroke="#0f6ccf"
                strokeWidth={0.8}
                opacity={0}
                animate={{ opacity: [0, 0.2, 0], scale: [0.9, 1.1, 0.9] }}
                transition={{ duration: 3.5, delay: k * 1.2, repeat: Infinity, ease: 'easeInOut' }}
              />
            ))}

            {/* Hub circle background */}
            <motion.circle
              cx={CX} cy={CY} r={65}
              fill="#ffffff"
              stroke="#0f6ccf"
              strokeWidth={1.5}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 80 }}
              style={{ filter: 'drop-shadow(0 10px 30px rgba(15,108,207,0.25))' }}
            />
            {/* Center Logo Icon */}
            <motion.image
              href="/images/logo-icon.png"
              x={CX - 40} y={CY - 40}
              width={80} height={80}
              initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
              style={{ mixBlendMode: 'multiply' }}
            />

            {/* Spoke node buttons rendered as foreignObject for full HTML/CSS support */}
            {positions.map((pos, i) => {
              const isActive = activeIndex === i;
              const nodeW = 148;
              const nodeH = 68;
              return (
                <motion.g
                  key={`node-${i}`}
                  initial={{ opacity: 0, scale: 0.7, y: 0 }}
                  animate={{ opacity: 1, scale: isActive ? 1.05 : 1, y: [0, -8, 0] }}
                  transition={{ 
                    opacity: { delay: 0.35 + i * 0.1, duration: 0.5 },
                    scale: { delay: 0.35 + i * 0.1, type: 'spring', stiffness: 90 },
                    y: { delay: 0.35 + i * 0.1, duration: 4, repeat: Infinity, ease: 'easeInOut' }
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveIndex(isActive ? null : i)}
                  style={{ cursor: 'pointer' }}
                >
                  <rect
                    x={pos.x - nodeW / 2}
                    y={pos.y - nodeH / 2}
                    width={nodeW}
                    height={nodeH}
                    rx={16}
                    ry={16}
                    fill={COLORS[i]}
                    stroke={isActive ? '#ffffff' : 'none'}
                    strokeWidth={isActive ? 3 : 0}
                    style={{ filter: `drop-shadow(0 10px 24px ${COLORS[i]}60)`, transition: 'stroke 0.3s ease' }}
                  />
                  {/* Line 1 */}
                  <text
                    x={pos.x}
                    y={pos.y - (shortTitles[i][1] ? 6 : -4)}
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="14"
                    fontFamily="Sora, sans-serif"
                    fontWeight="700"
                    style={{ userSelect: 'none' }}
                  >
                    {shortTitles[i][0]}
                  </text>
                  {/* Line 2 */}
                  {shortTitles[i][1] && (
                    <text
                      x={pos.x}
                      y={pos.y + 12}
                      textAnchor="middle"
                      fill="rgba(255,255,255,0.9)"
                      fontSize="12"
                      fontFamily="Sora, sans-serif"
                      fontWeight="500"
                      style={{ userSelect: 'none' }}
                    >
                      {shortTitles[i][1]}
                    </text>
                  )}
                </motion.g>
              );
            })}
          </svg>

          {/* Detail Panel below the SVG */}
          <AnimatePresence>
            {activeIndex !== null && (
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  marginTop: 'var(--space-4)',
                  padding: 'var(--space-6)',
                  borderRadius: 'var(--radius-xl)',
                  border: `1px solid ${COLORS[activeIndex]}30`,
                  background: 'var(--bg-secondary)',
                  boxShadow: `var(--shadow-raised), 0 0 0 1px ${COLORS[activeIndex]}15`,
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                  gap: 'var(--space-5)',
                  alignItems: 'center',
                }}
              >
                <div>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    marginBottom: 'var(--space-3)',
                  }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: COLORS[activeIndex] }} />
                    <span className="text-ui text-muted" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
                      {areas[activeIndex].title}
                    </span>
                  </div>
                  <h3 className="text-display" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', marginBottom: 'var(--space-2)' }}>
                    {areas[activeIndex].focus}
                  </h3>
                </div>
                <p className="text-body text-muted" style={{ fontSize: '1rem', lineHeight: 1.75 }}>
                  {areas[activeIndex].details}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Mobile Card Grid ── */}
        <div className="hub-spoke-mobile-grid">
          {areas.map((area, i) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              onClick={() => setActiveIndex(activeIndex === i ? null : i)}
              style={{
                padding: 'var(--space-4)',
                borderRadius: 'var(--radius-lg)',
                background: activeIndex === i ? COLORS[i] : 'var(--bg-secondary)',
                border: `1px solid ${activeIndex === i ? COLORS[i] : 'var(--border)'}`,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              <h3 className="text-display" style={{
                fontSize: '1.1rem', marginBottom: 'var(--space-1)',
                color: activeIndex === i ? '#fff' : 'var(--text-primary)',
              }}>
                {area.title}
              </h3>
              <p className="text-body" style={{
                fontSize: '0.875rem', lineHeight: 1.6,
                color: activeIndex === i ? 'rgba(255,255,255,0.85)' : 'var(--text-muted)',
              }}>
                {area.focus}
              </p>
              {activeIndex === i && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.8)', marginTop: 'var(--space-2)' }}
                >
                  {area.details}
                </motion.p>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .hub-spoke-wrap { display: block; }
        .hub-spoke-mobile-grid { display: none; gap: var(--space-3); flex-direction: column; }

        @media (max-width: 760px) {
          .hub-spoke-wrap { display: none; }
          .hub-spoke-mobile-grid { display: flex; }
        }
      `}</style>
    </section>
  );
}
