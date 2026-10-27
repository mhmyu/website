// Single source of truth for site-wide SEO values.
// Set NEXT_PUBLIC_SITE_URL to the production domain (e.g. https://example.com).
// On Vercel it falls back to the production domain automatically.
const githubUrl = 'https://github.com/mhmyu'
const xUrl = 'https://x.com/mhmyu5'
const vercelProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL

export const siteConfig = {
  name: 'MHM',
  title: 'MHM | Freelance Coder & Designer',
  description:
    'Muhammad Yusran is a freelance coder and designer. He builds simple, friendly websites and designs that people enjoy using.',
  locale: 'en_US',
  author: {
    name: 'Muhammad Yusran',
    jobTitle: 'Freelance Coder & Designer',
    twitterHandle: '@mhmyu5',
    githubUrl,
    xUrl,
    sameAs: [githubUrl, xUrl],
  },
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (vercelProductionUrl
      ? `https://${vercelProductionUrl}`
      : 'http://localhost:3000'),
} as const
