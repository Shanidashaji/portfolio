# Shanida Shaji — Portfolio

Personal portfolio for Shanida Shaji, Software Developer. React + TypeScript + Vite, with GSAP/ScrollTrigger for motion.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build → dist/
npm run preview    # serve the production build
npm run lint
```

## Editing content

All copy lives in `src/data/` — components never hard-code personal facts.

| File | What it holds |
|---|---|
| `src/data/profile.ts` | Name, contact, links, intro, timeline (work + education), certifications, publication, "how I work" principles |
| `src/data/projects.ts` | The seven featured projects (case-study pages are generated from these) and the archive list |
| `src/data/skills.ts` | Skill clusters and the projects each skill was used in |

To add a live URL or source link to a project, set `live` / `source` in `projects.ts`; the case-study page shows them automatically.
To add screenshots, drop WebP files in `public/work/` and list them under `shots` — projects without screenshots fall back to a labelled illustration (`src/components/previews/`).

The résumé served by the site is `public/Shanida-Shaji-Resume.pdf`.

## Structure

```
src/
  data/         content (edit here)
  lib/          motion system (reveals, intro gate) and route-transition curtain
  components/   Nav, Loader, Cursor, HeroField (dot lattice), ProjectMedia, previews
  sections/     Hero, About, Work, Skills, Experience, Contact
  pages/        Home, CaseStudy (/work/:slug), NotFound
  styles/       tokens + per-area stylesheets
```

## Motion & accessibility notes

- Scroll reveals are declarative: add `data-reveal="up|chars|stagger|clip|line"` to an element inside a page.
- Everything renders fully without animation; `prefers-reduced-motion` disables the loader, reveals, cursor ring, tilt, marquee and the hero pointer effects.
- Pointer-only effects (name weight lens, dot lattice, tilt, cursor ring) are enabled only on hover-capable fine pointers.
- The loader runs once per browser session, for about a second.

## Deploying

It's a static SPA. `netlify.toml` holds the complete Netlify setup — build command, Node version, SPA fallback for deep links such as `/work/qspot`, security headers and caching. `vercel.json` does the routing for Vercel.

Netlify: *Add new site → Import from Git → Shanidashaji/portfolio*. Build settings are read from `netlify.toml`; leave the UI fields empty.
After choosing a domain, make the `og:image` / `twitter:image` URLs in `index.html` absolute (e.g. `https://your-domain/og-image.png`) so social previews resolve.
