> build with Next.js, TailwindCSS and deploy with vercel.

## Stack

- Next.js 16.4.3
- Tailwind CSS 4.3.3 (CSS-first config in `app/globals.css`, mobile first: no prefix = mobile, `lg:` = desktop)
- pnpm 12.15.0
- Node.js 24.x
- Fonts: Geist Sans (main), Geist Mono (code)

## Development

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build
pnpm start
pnpm lint
pnpm format:check
pnpm typecheck
pnpm format   # Prettier (with Tailwind class sorting)
```

## SEO

Set `NEXT_PUBLIC_SITE_URL` (see `.env.example`) to the production domain. It drives canonical links, Open Graph URLs, `sitemap.xml` and `robots.txt`. On Vercel it falls back to the production domain automatically. Shared values (title, description, author, social profiles) live in `lib/site.ts`; add new public pages to `app/sitemap.ts`.

## Changelog

- Upgraded to Next.js 16.4.3, Tailwind CSS 4.3.3 and pnpm 12.15.0.
- Migrated styling from CSS Modules to Tailwind utilities (mobile first, design unchanged).
- Extracted the repeated cards into a data array rendered with `map`.
- Switched fonts to Geist Sans (main) and Geist Mono (code), removed Inter.
- Aligned `@types/node` and `engines.node` with Node.js 24.
- Updated dev dependencies (`eslint` 10.13.0, `@types/react` and `@types/react-dom` 19.3.0). TypeScript stays on 6.0.3 because `typescript-eslint` does not support TypeScript 7 yet.
- Raised the tsconfig `target` from ES2017 to ES2022.
- Downgraded `eslint` to 9.39.5: the plugins bundled in `eslint-config-next` (`import`, `jsx-a11y`, `react`) do not support ESLint 10 yet, which caused peer dependency warnings.
- Replaced the deprecated `priority` prop with `preload` on `next/image`, removed the unneeded `rel` from placeholder links, and made the logo link alt text describe its destination.
- The logo now links to the site root (`/`) using `next/link`, and the metadata typo was fixed.
- Pinned all dependencies to exact versions, converted `next.config.js` to `next.config.ts`, and added Prettier with `prettier-plugin-tailwindcss`.
- Added SEO: metadata (title template, canonical, Open Graph, Twitter, robots, theme color), `robots.txt`, `sitemap.xml`, generated Open Graph image, JSON-LD (`WebSite`) and a single `<h1>`.
- Semantic HTML: `<header>` for the top bar and `<nav>` with a `<ul>` list for the cards (layout unchanged, verified pixel-identical).
- Keyboard focus (`focus-visible`) on cards now matches the hover style.
- Security headers in `next.config.ts` and `poweredByHeader: false`.
- Added Dependabot (`.github/dependabot.yml`) and a CI workflow (`.github/workflows/ci.yml`: lint, format check, typecheck, build).
- Added custom `not-found.tsx` (404, noindex) and `error.tsx` pages matching the site design.
- Removed the unused `app/api/hello` template route (and its `robots.txt` rule).
- JSON-LD now describes `WebSite` and `Person` (Muhammad Yusran, GitHub and X profiles); added author and Twitter creator metadata.
- Added Vercel Web Analytics (`@vercel/analytics`). Enable it in the Vercel project's Analytics tab; it only reports on Vercel deployments.
- Added a full icon set from `logomhm.svg`: optimized `app/icon.svg` (with dark mode), `app/favicon.ico` (16/32/48, white tile for legibility on any tab color) and `app/apple-icon.png` (180x180, opaque background).
- Added `app/global-error.tsx` (fallback when the root layout fails) and `.nvmrc` (Node 24, also used by CI). The shared `<html>`/`<body>` classes now live in `lib/document-classes.ts`.
- Added a site header with a smaller logo (40x40) and a main menu (Home, Uses, Blog, About) in `components/site-header.tsx`. On desktop (`lg:`) the menu is centered in a bordered bar matching the tagline bar; on mobile it becomes a hamburger button that opens a right-side drawer (`components/mobile-menu.tsx`, native `<dialog>` with focus trap, Esc/backdrop close, scroll lock and reduced-motion support). Menu items live in `lib/nav-items.ts`; Uses, Blog and About are placeholders (`#`).
- The tagline bar ("A freelancer who codes and design.") moved out of `<header>` into `<main>`, is no longer fixed, and sits below the header on all screen sizes. The fixed bottom logo on mobile and its bottom margin were removed.
- Desktop header is now a single centered bordered bar containing the logo and the menu (no more wide gap between them). Fixed the squished "yu" tile and brand logo on narrow mobile screens with `shrink-0`.
- Added Notes (articles): MDX files in `content/notes/*.mdx` (each exports `meta` with title, description, date) are served at `/notes` (list) and `/notes/[slug]` (article), statically generated. Includes per-page metadata (`lib/metadata.ts`), `BlogPosting` JSON-LD, dynamic Open Graph images, RSS at `/notes/feed.xml`, and sitemap entries. Uses `@next/mdx` 16.4.3, `@mdx-js/loader` and `@mdx-js/react` 3.1.1, `@types/mdx` 2.0.14. The menu item "Blog" is now "Notes" and the current page is marked with `aria-current`.
- `SiteHeader` moved to `app/layout.tsx` so it shows on every page. `app/page.tsx`, `not-found.tsx` and `error.tsx` were adjusted to match.
- Removed leftover `next.config.js` (an empty config that took precedence over `next.config.ts`, so the security headers were not applied) and the template route `app/api/hello`.
- Added the About page (`/about`, placeholder text) with metadata, Open Graph image and a sitemap entry. Removed the "Uses" menu item; the menu is now Home, Notes, About.
- Added a dark/light mode switch (moon/sun icon) after "About" in the menu (a labeled "Dark mode" row in the mobile drawer). The theme follows the system by default; a manual choice is saved in `localStorage` (`theme`) and applied before first paint by `components/theme-script.tsx`. Dark mode now uses the `dark` class on `<html>` (Tailwind `@custom-variant dark` in `app/globals.css`) instead of `prefers-color-scheme`.
- New light palette matching the dark one: white background, neutrals mirrored from dark (255 - value), blue-tinted tile and soft blue glows. Light `theme-color` is now `#ffffff`.
- Dark mode is now the default (system preference is no longer followed). Tokens in `app/globals.css` are dark by default and `:root.light` overrides them; only a saved "light" choice adds the `light` class (`components/theme-script.tsx`), so the server HTML and the no-JavaScript fallback are dark. `theme-color` is now a single `#000000`.
- Copy update (v19): fixed header grammar ("designs"), new card titles and descriptions (Design work, Code work, Say hello), new site meta description (123 characters), and refreshed intro text on `/notes` and `/about`. Cards now link to `/about` (design, code) and the X profile (say hello); the URL lives in `siteConfig.author.xUrl`.
- Added GitHub and X links with icons to `/about` with a short intro line (inline SVG components in `components/icons.tsx`, decorative and hidden from screen readers; URLs live in `siteConfig.author`).
