import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHead } from '../../components/SectionHead';

const translations = [
  {
    clinical: 'Myocardial Infarction with ST-elevation and troponin elevation requiring percutaneous coronary intervention.',
    human: 'A heart attack where a blocked artery needs to be reopened quickly to save heart muscle.',
    tag: 'Cardiology',
    color: 'var(--brand-red)',
  },
  {
    clinical: 'HbA1c-based glycaemic monitoring with titrated basal insulin and GLP-1 receptor agonist co-administration.',
    human: 'Checking your blood sugar over 3 months and adjusting your diabetes medicine to keep it in a healthy range.',
    tag: 'Diabetes',
    color: 'var(--brand-blue)',
  },
  {
    clinical: 'Forced Expiratory Volume in 1 second (FEV1) post-bronchodilator reversibility testing for COPD staging.',
    human: 'A breathing test to understand how blocked your lungs are, so we can choose the right inhaler for you.',
    tag: 'Respiratory',
    color: 'var(--brand-green)',
  },
  {
    clinical: 'Polycystic Ovarian Syndrome with hyperandrogenism, oligo-ovulation, and insulin resistance management.',
    human: "PCOS is a hormonal condition that can affect your periods and fertility, but it's very manageable with the right support.",
    tag: "Women's Health",
    color: '#9b59b6',
  },
];

export function TranslationSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="section" style={{ background: 'var(--bg-primary)', position: 'relative', overflow: 'hidden' }}>
      {/* Background text decoration */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        fontSize: 'clamp(6rem, 15vw, 14rem)', fontFamily: 'var(--font-display)',
        color: 'var(--border)', pointerEvents: 'none', whiteSpace: 'nowrap',
        userSelect: 'none', zIndex: 0,
      }}>
        Translate
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <SectionHead
          eyebrow="The Medikatha Method"
          title="Clinical to Human, Every Time"
          description="We take the language of medicine and transform it into words that inform, reassure, and empower."
          align="center"
        />

        {/* Tab Selectors */}
        <div style={{ display: 'flex', gap: 'var(--space-2)', justifyContent: 'center', flexWrap: 'wrap', marginBottom: 'var(--space-8)' }}>
          {translations.map((t, i) => (
            <motion.button
              key={t.tag}
              onClick={() => setActive(i)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: '8px 20px',
                borderRadius: 'var(--radius-full)',
                border: `1px solid ${active === i ? t.color : 'var(--border-strong)'}`,
                background: active === i ? t.color : 'transparent',
                color: active === i ? '#fff' : 'var(--text-muted)',
                fontFamily: 'var(--font-ui)',
                fontSize: '0.875rem',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
            >
              {t.tag}
            </motion.button>
          ))}
        </div>

        {/* Translation Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 0,
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-float)',
              border: '1px solid var(--border)',
            }}
          >
            {/* Clinical Side */}
            <div style={{
              padding: 'var(--space-8)',
              background: 'var(--bg-alt)',
              borderRight: '1px solid var(--border)',
              position: 'relative',
            }}>
              <div style={{ marginBottom: 'var(--space-4)' }}>
                <span className="text-ui" style={{
                  background: 'rgba(0,0,0,0.06)',
                  padding: '4px 12px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                }}>
                  Clinical Language
                </span>
              </div>
              <p className="text-body" style={{
                fontSize: '1.1rem',
                lineHeight: 1.7,
                fontStyle: 'italic',
                color: 'var(--text-secondary)',
              }}>
                "{translations[active].clinical}"
              </p>
              <div style={{
                position: 'absolute', right: '-16px', top: '50%', transform: 'translateY(-50%)',
                width: 32, height: 32, borderRadius: '50%',
                background: translations[active].color,
                display: 'grid', placeItems: 'center', color: '#fff',
                fontSize: '1rem', zIndex: 10, boxShadow: 'var(--shadow-raised)',
              }}>→</div>
            </div>

            {/* Human Side */}
            <div style={{
              padding: 'var(--space-8)',
              background: 'var(--bg-secondary)',
              position: 'relative',
            }}>
              <div style={{ marginBottom: 'var(--space-4)' }}>
                <span className="text-ui" style={{
                  background: `${translations[active].color}20`,
                  color: translations[active].color,
                  padding: '4px 12px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}>
                  Human Language
                </span>
              </div>
              <p className="text-body" style={{
                fontSize: '1.25rem',
                lineHeight: 1.75,
                fontWeight: 400,
                color: 'var(--text-primary)',
              }}>
                "{translations[active].human}"
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        <p className="text-ui text-muted" style={{ textAlign: 'center', marginTop: 'var(--space-6)', fontSize: '0.875rem' }}>
          This is what Medikatha does — for every condition, every medicine, every patient.
        </p>
      </div>
    </section>
  );
}
