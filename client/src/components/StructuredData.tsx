import { useEffect } from 'react';

const SITE_URL = 'https://medikatha.com';

export function StructuredData() {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'medikatha-ld-json';
    script.text = JSON.stringify([
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Medikatha',
        url: SITE_URL,
        logo: `${SITE_URL}/logo.png`,
        description: 'Healthcare storytelling and medicine communication platform.',
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          email: 'hello@medikatha.com',
          telephone: '+91-88888-00000',
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Medikatha',
        url: SITE_URL,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${SITE_URL}/resources?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
    ]);

    const existing = document.getElementById('medikatha-ld-json');
    if (existing) {
      existing.remove();
    }
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return null;
}
