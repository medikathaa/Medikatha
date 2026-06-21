import React from 'react';
import { usePageSeo } from '../lib/seo';
import { HeroSection } from '../sections/home/HeroSection';
import { MarqueeStrip } from '../components/MarqueeStrip';
import { ServicesSection } from '../sections/home/ServicesSection';
import { TranslationSection } from '../sections/home/TranslationSection';
import { ProcessSection } from '../sections/home/ProcessSection';
import { TherapeuticSection } from '../sections/home/TherapeuticSection';
import { CaseStudiesSection } from '../sections/home/CaseStudiesSection';
import { ResultsSection } from '../sections/home/ResultsSection';
import { CtaSection } from '../sections/home/CtaSection';

export function HomePage() {
  usePageSeo({
    title: 'Medicine Storytelling Platform',
    description: 'Medikatha brings medicine, research, and patient education together through professional healthcare storytelling programs.',
    path: '/',
    keywords: 'medicine storytelling, healthcare communication, pharmaceutical education, patient awareness',
  });

  return (
    <main>
      <HeroSection />
      <MarqueeStrip />
      <ServicesSection />
      <TranslationSection />
      <ProcessSection />
      <TherapeuticSection />
      <CaseStudiesSection />
      <ResultsSection />
      <CtaSection />
    </main>
  );
}
