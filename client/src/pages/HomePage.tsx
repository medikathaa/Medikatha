import React from 'react';
import { usePageSeo } from '../lib/seo';
import { HeroSection } from '../sections/home/HeroSection';
import { MarqueeStrip } from '../components/MarqueeStrip';
import { ServicesSection } from '../sections/home/ServicesSection';
import { TherapeuticSection } from '../sections/home/TherapeuticSection';
import { ResultsSection } from '../sections/home/ResultsSection';
import { CtaSection } from '../sections/home/CtaSection';

export function HomePage() {
  usePageSeo({
    title: 'Medikatha Clinical Research — Story of Medicine',
    description: 'Medikatha Clinical Research is a Clinical Research and Site Management Organization (SMO) and ISO-certified training institute supporting Sponsors, CROs, Hospitals, Investigators, and Patients.',
    path: '/',
    keywords: 'clinical research, site management, SMO, CRO, clinical trial, pharmacovigilance, GCP training, ISO certified',
  });

  return (
    <main>
      <HeroSection />
      <MarqueeStrip />
      <ServicesSection />
      <TherapeuticSection />
      <ResultsSection />
      <CtaSection />
    </main>
  );
}
