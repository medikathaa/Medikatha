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
  ['Cardiovascular', 'Care'],
  ['Endocrine &', 'Diabetes'],
  ['Respiratory', 'Medicine'],
  ['Infectious', 'Diseases'],
  ["Women's", 'Health'],
  ['Gastro &', 'Liver'],
];

export function TherapeuticSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section style={{ padding: 'var(--space-20) 0', background: 'var(--bg-alt)', overflow: 'hidden' }}>
      <div className="container">
        <SectionHead
          eyebrow="Therapeutic Expertise"
          title="Our Healthcare Ecosystem"
          description="Click any therapeutic area to explore our deep clinical communication expertise."
          align="center"
        />

        {/* ── Desktop Hub & Spoke ── */}
        <div className="hub-spoke-wrap">
          <svg
            viewBox={`0 0 ${SVG_W} ${SVG_H}`}
            style={{ width: '100%', maxWidth: 860, display: 'block', margin: '0 auto', overflow: 'visible' }}
            aria-hidden="true"
          >
            {/* Dashed connection lines — real SVG coordinates */}
            {positions.map((pos, i) => (
              <motion.line
                key={`line-${i}`}
                x1={CX} y1={CY}
                x2={pos.x} y2={pos.y}
                stroke={activeIndex === i ? COLORS[i] : '#c8d8e8'}
                strokeWidth={activeIndex === i ? 2 : 1}
                strokeDasharray="6 4"
                initial={{ opacity: 0, pathLength: 0 }}
                animate={{ opacity: 1, pathLength: 1 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.7, ease: 'easeOut' }}
                style={{ transition: 'stroke 0.3s ease, stroke-width 0.3s ease' }}
              />
            ))}

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

            {/* Hub circle */}
            <motion.circle
              cx={CX} cy={CY} r={62}
              fill="#0f6ccf"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 80 }}
              style={{ filter: 'drop-shadow(0 0 24px rgba(15,108,207,0.5))' }}
            />
            {/* Hub label */}
            <motion.text
              x={CX} y={CY - 10}
              textAnchor="middle"
              fill="#ffffff"
              fontSize="18"
              fontFamily="DM Serif Display, serif"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Medi
            </motion.text>
            <motion.text
              x={CX} y={CY + 14}
              textAnchor="middle"
              fill="#ffffff"
              fontSize="18"
              fontFamily="DM Serif Display, serif"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
            >
              katha
            </motion.text>

            {/* Spoke node buttons rendered as foreignObject for full HTML/CSS support */}
            {positions.map((pos, i) => {
              const isActive = activeIndex === i;
              const nodeW = 148;
              const nodeH = 68;
              return (
                <motion.g
                  key={`node-${i}`}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.35 + i * 0.1, type: 'spring', stiffness: 90 }}
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setActiveIndex(isActive ? null : i)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Node glow when active */}
                  {isActive && (
                    <ellipse
                      cx={pos.x} cy={pos.y}
                      rx={nodeW / 2 + 6} ry={nodeH / 2 + 6}
                      fill={`${COLORS[i]}22`}
                      stroke={COLORS[i]}
                      strokeWidth={1.5}
                    />
                  )}
                  <rect
                    x={pos.x - nodeW / 2}
                    y={pos.y - nodeH / 2}
                    width={nodeW}
                    height={nodeH}
                    rx={14}
                    ry={14}
                    fill={isActive ? COLORS[i] : '#ffffff'}
                    stroke={isActive ? COLORS[i] : '#dde8f0'}
                    strokeWidth={1.5}
                    style={{ filter: isActive ? `drop-shadow(0 6px 20px ${COLORS[i]}60)` : 'drop-shadow(0 4px 10px rgba(0,0,0,0.06))', transition: 'fill 0.3s ease, stroke 0.3s ease' }}
                  />
                  {/* Line 1 */}
                  <text
                    x={pos.x}
                    y={pos.y - 6}
                    textAnchor="middle"
                    fill={isActive ? '#ffffff' : '#0c2233'}
                    fontSize="13"
                    fontFamily="Sora, sans-serif"
                    fontWeight="600"
                    style={{ transition: 'fill 0.3s ease', userSelect: 'none' }}
                  >
                    {shortTitles[i][0]}
                  </text>
                  {/* Line 2 */}
                  <text
                    x={pos.x}
                    y={pos.y + 12}
                    textAnchor="middle"
                    fill={isActive ? 'rgba(255,255,255,0.85)' : '#4a657a'}
                    fontSize="12"
                    fontFamily="Sora, sans-serif"
                    fontWeight="500"
                    style={{ transition: 'fill 0.3s ease', userSelect: 'none' }}
                  >
                    {shortTitles[i][1]}
                  </text>
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
