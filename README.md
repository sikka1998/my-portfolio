# Mohamed Sikkander — portfolio

Personal site for Mohamed Sikkander, full stack engineer at CustomerLabs. A scroll-led, single-page portfolio: an annotated cover photo that opens through a camera viewfinder, a full-circle statement, selected work as full-screen colour sheets, experience, interests, and a contact footer. Pages: Home, Work, Project, About, Resume (hash routes).

## Stack

- React 19, TypeScript, Vite
- Tailwind CSS v4 (PostCSS plugin)
- GSAP + ScrollTrigger for scroll and intro animation, Lenis for smooth wheel scrolling on fine pointers
- Mona Sans (variable) and Caveat from Fontsource

## Develop

```bash
npm install
npm run dev
```

`npm run build` type-checks and builds to `dist/`. `npm run check` type-checks only, `npm run lint` runs ESLint.

## Content

All copy, projects, experience, skills and links live in `src/lib/content.ts`. Photos are in `src/assets`; the resume PDF is `public/Mohamed_Sikkander_Resume.pdf`.

## Deploy

Netlify builds `main` with `npm run build` and publishes `dist/` (see `netlify.toml`).
