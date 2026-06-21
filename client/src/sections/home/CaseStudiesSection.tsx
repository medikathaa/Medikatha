import React from 'react';
import { motion } from 'framer-motion';
import { SectionHead } from '../../components/SectionHead';
import { storyHighlights } from '../../data/stories';
import { Button } from '../../components/Button';

export function CaseStudiesSection() {
  return (
    <section className="section">
      <div className="container">
        <SectionHead 
          eyebrow="Flagship Narratives"
          title="Stories That Bridge Science and Daily Life"
        />

        <div style={{ display: 'grid', gap: 'var(--space-6)' }}>
          {storyHighlights.map((story, i) => (
            <motion.div 
              key={story.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: 'var(--space-4)',
                background: 'var(--bg-secondary)',
                padding: 'var(--space-6)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border)',
                alignItems: 'center'
              }}
            >
              <div>
                <h3 className="text-display" style={{ fontSize: '1.5rem', marginBottom: 'var(--space-2)' }}>
                  {story.title}
                </h3>
                <p className="text-body text-muted">{story.summary}</p>
              </div>
              
              <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                {story.components.map(comp => (
                  <span 
                    key={comp}
                    className="text-ui text-muted"
                    style={{
                      padding: '4px 12px',
                      background: 'var(--bg-alt)',
                      borderRadius: '99px',
                      fontSize: '0.75rem',
                      fontWeight: 500
                    }}
                  >
                    {comp}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div style={{ marginTop: 'var(--space-6)', textAlign: 'center' }}>
          <Button to="/stories" variant="secondary">View All Stories</Button>
        </div>
      </div>
    </section>
  );
}
