import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useInView } from 'framer-motion';
import { SectionHead } from '../../components/SectionHead';
import { services } from '../../data/services';

const SERVICE_COLORS = ['#0f6ccf', '#66ba3c', '#e03a3a', '#9b59b6'];
const SERVICE_ICONS = ['✦', '◈', '◉', '◆'];

function ServiceCard({ service, index }: { service: any; index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const color = SERVICE_COLORS[index % SERVICE_COLORS.length];

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -6 }}
      className="glass-card"
      style={{ padding: '32px', position: 'relative', overflow: 'hidden', cursor: 'default' }}
    >
      {/* Mouse tracking ambient glow */}
      <motion.div
        style={{
          position: 'absolute',
          background: `${color}18`,
          borderRadius: '50%',
          filter: 'blur(40px)',
          width: 200, height: 200,
          left: useMotionTemplate`calc(${mouseX}px - 100px)`,
          top: useMotionTemplate`calc(${mouseY}px - 100px)`,
          pointerEvents: 'none', zIndex: 0,
        }}
      />

      {/* Top color bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(90deg, ${color}, ${color}40)`,
        borderRadius: '18px 18px 0 0',
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Icon badge */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={inView ? { scale: 1, rotate: 0 } : {}}
          transition={{ delay: index * 0.12 + 0.25, type: 'spring', stiffness: 120 }}
          style={{
            width: 48, height: 48, borderRadius: 14,
            background: `${color}15`,
            border: `1px solid ${color}30`,
            color,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.3rem', marginBottom: 20,
          }}
        >
          {SERVICE_ICONS[index % SERVICE_ICONS.length]}
        </motion.div>

        <h3 className="text-display" style={{ fontSize: '1.35rem', marginBottom: 10, color: 'var(--text-primary)' }}>
          {service.title}
        </h3>
        <p className="text-body text-muted" style={{ fontSize: '0.95rem', lineHeight: 1.7 }}>
          {service.description}
        </p>

        {/* Read more arrow */}
        <motion.div
          initial={{ opacity: 0, x: -6 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: index * 0.12 + 0.4 }}
          style={{ marginTop: 20, color, fontFamily: 'var(--font-ui)', fontSize: '0.8rem', fontWeight: 600 }}
        >
          Learn more →
        </motion.div>
      </div>
    </motion.div>
  );
}

export function ServicesSection() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' });

  return (
    <section style={{ padding: 'var(--space-16) 0', background: 'var(--bg-alt)' }}>
      <div className="container">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 28 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionHead
            eyebrow="Our Expertise"
            title="Clinical Precision meets Human Empathy"
            description="We bridge the gap between complex medical science and practical patient understanding."
          />
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 20,
        }}>
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
