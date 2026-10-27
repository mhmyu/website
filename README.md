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
