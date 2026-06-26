import React, { Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { StructuredData } from './components/StructuredData';
import { LoadingScreen } from './components/LoadingScreen';
import { ScrollProgressBar } from './components/ScrollProgressBar';

// Lazy load all major route pages to split JS bundles
const HomePage = React.lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const AboutPage = React.lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ServicesPage = React.lazy(() => import('./pages/ServicesPage').then(m => ({ default: m.ServicesPage })));
const StoriesPage = React.lazy(() => import('./pages/StoriesPage').then(m => ({ default: m.StoriesPage })));
const ResourcesPage = React.lazy(() => import('./pages/ResourcesPage').then(m => ({ default: m.ResourcesPage })));
const ContactPage = React.lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));
const CoursesPage = React.lazy(() => import('./pages/CoursesPage').then(m => ({ default: m.CoursesPage })));

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

// Minimal fallback for lazy loaded routes to prevent UI blocking
const RouteFallback = () => (
  <div style={{ height: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      style={{ width: 24, height: 24, border: '2px solid var(--border)', borderTopColor: 'var(--brand-blue)', borderRadius: '50%' }}
    />
  </div>
);

export default function App() {
  const location = useLocation();

  return (
    <>
      <LoadingScreen />
      <ScrollProgressBar />
      <StructuredData />
      <ScrollToTop />
      
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />

        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Suspense fallback={<RouteFallback />}><PageWrapper><HomePage /></PageWrapper></Suspense>} />
            <Route path="/about" element={<Suspense fallback={<RouteFallback />}><PageWrapper><AboutPage /></PageWrapper></Suspense>} />
            <Route path="/services" element={<Suspense fallback={<RouteFallback />}><PageWrapper><ServicesPage /></PageWrapper></Suspense>} />
            <Route path="/courses" element={<Suspense fallback={<RouteFallback />}><PageWrapper><CoursesPage /></PageWrapper></Suspense>} />
            <Route path="/contact" element={<Suspense fallback={<RouteFallback />}><PageWrapper><ContactPage /></PageWrapper></Suspense>} />
            <Route path="/therapeutic-areas" element={<Suspense fallback={<RouteFallback />}><PageWrapper><ServicesPage /></PageWrapper></Suspense>} />
            <Route path="/stories" element={<Suspense fallback={<RouteFallback />}><PageWrapper><StoriesPage /></PageWrapper></Suspense>} />
            <Route path="/resources" element={<Suspense fallback={<RouteFallback />}><PageWrapper><ResourcesPage /></PageWrapper></Suspense>} />
            <Route path="*" element={<Suspense fallback={<RouteFallback />}><PageWrapper><NotFoundPage /></PageWrapper></Suspense>} />
          </Routes>
        </AnimatePresence>

        <Footer />
      </div>
    </>
  );
}
