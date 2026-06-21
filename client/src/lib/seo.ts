import { useEffect } from 'react';

type SEOProps = {
  title: string;
  description: string;
  path: string;
  keywords?: string;
};

const SITE_NAME = 'Medikatha';
const SITE_URL = 'https://medikatha.com';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-medikatha.jpg`;

function upsertMeta(name: string, content: string, attribute: 'name' | 'property' = 'name') {
  const selector = `meta[${attribute}="${name}"]`;
  let element = document.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }
  element.content = content;
}

export function usePageSeo({ title, description, path, keywords }: SEOProps) {
  useEffect(() => {
    document.title = `${title} | ${SITE_NAME}`;
    upsertMeta('description', description);
    upsertMeta('keywords', keywords ?? 'medikatha, medicine education, pharma communication');
    upsertMeta('og:title', `${title} | ${SITE_NAME}`, 'property');
    upsertMeta('og:description', description, 'property');
    upsertMeta('og:type', 'website', 'property');
    upsertMeta('og:url', `${SITE_URL}${path}`, 'property');
    upsertMeta('og:image', DEFAULT_OG_IMAGE, 'property');
    upsertMeta('twitter:card', 'summary_large_image');
    upsertMeta('twitter:title', `${title} | ${SITE_NAME}`);
    upsertMeta('twitter:description', description);
    upsertMeta('twitter:image', DEFAULT_OG_IMAGE);

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = `${SITE_URL}${path}`;
  }, [description, keywords, path, title]);
}
