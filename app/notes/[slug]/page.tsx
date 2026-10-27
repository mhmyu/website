import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/json-ld'
import { buildPageMetadata } from '@/lib/metadata'
import { formatNoteDate, getNote, getNoteSlugs } from '@/lib/notes'
import { siteConfig } from '@/lib/site'

type NotePageProps = { params: Promise<{ slug: string }> }

// Only slugs from content/notes exist; anything else is a 404.
export const dynamicParams = false

export async function generateStaticParams() {
  const slugs = await getNoteSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: NotePageProps): Promise<Metadata> {
  const { slug } = await params
  const { meta } = await getNote(slug)
  return buildPageMetadata({
    title: meta.title,
    description: meta.description,
    path: `/notes/${slug}`,
    publishedTime: meta.date,
  })
}

export default async function NotePage({ params }: NotePageProps) {
  const { slug } = await params
  const { meta, Content } = await getNote(slug)

  return (
    <main className="mx-auto w-full max-w-2xl grow px-6 pt-24 pb-24 lg:pt-12">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: meta.title,
          description: meta.description,
          datePublished: meta.date,
          inLanguage: 'en',
          url: `${siteConfig.url}/notes/${slug}`,
          mainEntityOfPage: `${siteConfig.url}/notes/${slug}`,
          author: {
            '@type': 'Person',
            name: siteConfig.author.name,
            url: siteConfig.url,
          },
        }}
      />
      <Link
        href="/notes"
        className="font-mono text-[0.8rem] underline-offset-4 hover:underline lg:text-[0.85rem]"
      >
        Back to notes
      </Link>
      <article className="mt-6">
        <header>
          <h1 className="text-3xl font-bold">{meta.title}</h1>
          <p className="mt-3 font-mono text-[0.8rem] opacity-60 lg:text-[0.85rem]">
            <time dateTime={meta.date}>{formatNoteDate(meta.date)}</time>
          </p>
        </header>
        <div className="mt-8">
          <Content />
        </div>
      </article>
    </main>
  )
}
