import type { Metadata } from 'next'
import { GithubIcon, XIcon } from '@/components/icons'
import { buildPageMetadata } from '@/lib/metadata'
import { siteConfig } from '@/lib/site'

const SOCIAL_LINKS = [
  { label: 'GitHub', href: siteConfig.author.githubUrl, Icon: GithubIcon },
  { label: 'X', href: siteConfig.author.xUrl, Icon: XIcon },
]

const description =
  'About Muhammad Yusran, a freelance coder and designer who builds simple, friendly things for the web. More about him is coming soon.'

export const metadata: Metadata = buildPageMetadata({
  title: 'About',
  description,
  path: '/about',
})

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-2xl grow px-6 pt-24 pb-24 lg:pt-12">
      <h1 className="text-3xl font-bold">About</h1>
      <p className="mt-6 leading-7">
        Hi, I&apos;m Muhammad Yusran. I&apos;m a freelancer who codes and
        designs.
      </p>
      <p className="mt-4 leading-7">
        I like making things that are simple, useful, and friendly. I&apos;ll
        share more about me here soon.
      </p>
      <p className="mt-4 leading-7">You can also find me on GitHub and X.</p>
      <nav aria-label="Social links" className="mt-4">
        <ul role="list" className="-mx-3 flex flex-wrap gap-2">
          {SOCIAL_LINKS.map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                rel="me"
                className="flex items-center gap-2 rounded-card border border-card-border/0 bg-card/0 px-3 py-2 transition-[background,border] duration-200 ease-[ease] hover:border-card-border/15 hover:bg-card/10 focus-visible:border-card-border/15 focus-visible:bg-card/10"
              >
                <Icon className="size-5 shrink-0" />
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  )
}
