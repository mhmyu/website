import Image from 'next/image'
import Link from 'next/link'
import { JsonLd } from '@/components/json-ld'
import { siteConfig } from '@/lib/site'

// Mobile first: classes without a prefix target mobile, `lg:` targets desktop (>= 1024px).
const CARDS = [
  {
    title: 'Design work',
    description: 'Sketching ideas by day.',
    href: '/about',
  },
  {
    title: 'Code work',
    description: 'Coding after dark, and sometimes before.',
    href: '/about',
  },
  {
    title: 'Say hello',
    description: 'Open for freelance work, every day.',
    href: siteConfig.author.xUrl,
  },
]

const cardClassName =
  'group grow rounded-card border border-card-border/0 bg-card/0 px-10 py-4 transition-[background,border] duration-200 ease-[ease] hover:border-card-border/15 hover:bg-card/10 focus-visible:border-card-border/15 focus-visible:bg-card/10 lg:px-[1.2rem]'

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${siteConfig.url}/#website`,
      name: siteConfig.name,
      url: siteConfig.url,
      description: siteConfig.description,
      inLanguage: 'en',
      publisher: { '@id': `${siteConfig.url}/#person` },
    },
    {
      '@type': 'Person',
      '@id': `${siteConfig.url}/#person`,
      name: siteConfig.author.name,
      jobTitle: siteConfig.author.jobTitle,
      url: siteConfig.url,
      sameAs: siteConfig.author.sameAs,
    },
  ],
}

export default function Home() {
  return (
    <main className="flex w-full grow flex-col items-center justify-between px-24 pt-24 pb-24 lg:pt-8">
      <JsonLd data={jsonLd} />
      {/* Single page heading for search engines and screen readers. */}
      <h1 className="sr-only">{siteConfig.title}</h1>
      <p className="w-max max-w-[calc(100vw-2rem)] rounded-card border border-callout-border/30 bg-callout/50 p-4 text-center font-mono text-[0.8rem] lg:text-[0.85rem]">
        A&nbsp;
        <code className="font-mono font-bold">freelancer</code>&nbsp; who codes
        and designs.
      </p>
      <div className="relative flex items-center justify-center pt-32 pb-24 before:absolute before:left-1/2 before:-ml-[400px] before:h-[300px] before:w-[480px] before:rounded-full before:bg-(image:--secondary-glow) before:blur-[45px] after:absolute after:left-1/2 after:-z-1 after:h-[180px] after:w-[240px] after:[transform:translateZ(0)] after:bg-(image:--primary-glow) after:blur-[45px] lg:py-16 lg:before:h-[360px] lg:before:[transform:translateZ(0)]">
        <Image
          className="relative shrink-0 dark:[filter:invert(1)_drop-shadow(0_0_0.3rem_#ffffff70)]"
          src="/mhm.svg"
          alt="MHM Logo"
          width={180}
          height={54}
          preload
        />
        <div className="relative ml-4 flex size-[75px] shrink-0 [transform:translateZ(0)] items-center justify-center overflow-hidden rounded-card px-[10px] py-[25px] shadow-[0px_2px_8px_-1px_#0000001a] before:absolute before:-z-1 before:h-[200%] before:w-[200%] before:animate-tile-spin before:bg-(image:--tile-border) after:absolute after:inset-0 after:-z-1 after:rounded-card after:bg-linear-to-br/srgb after:from-tile-start after:to-tile-end after:bg-clip-content after:p-px motion-reduce:before:animate-none">
          <p className="text-3xl font-bold">yu</p>
        </div>
      </div>

      <nav
        aria-label="Profile sections"
        className="w-content max-w-[320px] lg:max-w-full"
      >
        <ul
          role="list"
          className="grid grid-cols-1 text-center lg:grid-cols-[repeat(3,minmax(33%,auto))] lg:text-left"
        >
          {CARDS.map(({ title, description, href }) => {
            const content = (
              <>
                <h2 className="mb-2 font-semibold lg:mb-[0.7rem]">
                  {title}{' '}
                  <span className="inline-block transition-transform duration-200 ease-[ease] motion-safe:group-hover:translate-x-1 motion-safe:group-focus-visible:translate-x-1">
                    -&gt;
                  </span>
                </h2>
                <p className="max-w-[34ch] text-[0.9rem] leading-normal opacity-60">
                  {description}
                </p>
              </>
            )

            return (
              <li key={title} className="flex">
                {/* Internal routes use next/link; external URLs use a plain anchor. */}
                {href.startsWith('/') ? (
                  <Link href={href} className={cardClassName}>
                    {content}
                  </Link>
                ) : (
                  <a href={href} className={cardClassName}>
                    {content}
                  </a>
                )}
              </li>
            )
          })}
        </ul>
      </nav>
    </main>
  )
}
