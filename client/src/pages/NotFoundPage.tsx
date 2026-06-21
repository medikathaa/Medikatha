import React from 'react';
import { usePageSeo } from '../lib/seo';
import { Button } from '../components/Button';

export function NotFoundPage() {
  usePageSeo({
    title: 'Page Not Found',
    description: 'The page you are looking for does not exist on Medikatha.',
    path: '/404',
  });

  return (
    <main className="section" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <h1 className="text-display" style={{ fontSize: '4rem', marginBottom: 'var(--space-4)' }}>404</h1>
        <p className="text-body text-muted" style={{ fontSize: '1.25rem', marginBottom: 'var(--space-6)' }}>
          The requested page could not be found. Please return to the homepage.
        </p>
        <Button to="/" variant="primary">Go to Home</Button>
      </div>
    </main>
  );
}
