# Medikatha Website

Production-ready TypeScript website for **Medikatha - Story of a Medicine**.

## What is included

- React + Vite frontend in TypeScript
- Multi-page architecture using React Router
- Professional healthcare brand UI with responsive design
- SEO setup:
  - route-level title and meta description updates
  - Open Graph + Twitter tags
  - canonical URLs
  - JSON-LD structured data (`Organization` + `WebSite`)
  - `robots.txt` and `sitemap.xml`
- Deployment helpers:
  - `netlify.toml`
  - `vercel.json`

## Pages

- Home
- About
- Therapeutic Areas
- Medicine Stories
- Resources
- Contact

## Run locally

```bash
npm install
npm run dev
```

Frontend: `http://localhost:5173`

## Type check and build

```bash
npm run typecheck
npm run build
```

## Production start (Node server)

```bash
npm start
```

The Node server serves the built frontend from `dist/`.

## Branding notes

- Update domain references from `https://medikatha.com` in:
  - `client/index.html`
  - `client/public/sitemap.xml`
  - `client/public/robots.txt`
  - `client/src/App.tsx`
- Replace placeholder contact details in the Contact page with final business details.
