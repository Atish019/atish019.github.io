# Atish Kumar Sharma — Portfolio

Personal portfolio site of **Atish Kumar Sharma**, AI/ML Engineer working on
Generative AI, LLMs, RAG pipelines, fine-tuning, and multi-agent AI systems.

**Live:** https://atish019.github.io

## Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS v4
- Framer Motion (animation)
- Lenis (smooth scroll)

## Local development

```bash
npm install
npm run dev      # http://localhost:5173
```

## Build

```bash
npm run build    # outputs to dist/
npm run preview  # preview the production build locally
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site
and publishes `dist/` to GitHub Pages.
