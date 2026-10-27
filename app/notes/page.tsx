import type { Metadata } from 'next'
import Link from 'next/link'
import { buildPageMetadata } from '@/lib/metadata'
import { formatNoteDate, getAllNotes } from '@/lib/notes'

const description =
  'Short notes from Muhammad Yusran, a freelance coder and designer, about building for the web and the small lessons learned along the way.'

export const metadata: Metadata = {
  ...buildPageMetadata({ title: 'Notes', description, path: '/notes' }),
  alternates: {
    canonical: '/notes',
    types: { 'application/rss+xml': '/notes/feed.xml' },
  },
}

export default async function NotesPage() {
  const notes = await getAllNotes()

  return (
    <main className="mx-auto w-full max-w-2xl grow px-6 pt-24 pb-24 lg:pt-12">
      <h1 className="text-3xl font-bold">Notes</h1>
      <p className="mt-3 font-mono text-[0.8rem] opacity-60 lg:text-[0.85rem]">
        Short notes on code, design, and what I learn along the way.
      </p>
      <ul role="list" className="mt-10 flex flex-col gap-2">
        {notes.map(({ slug, meta }) => (
          <li key={slug}>
            <article className="relative rounded-card border border-card-border/0 bg-card/0 px-4 py-4 transition-[background,border] duration-200 ease-[ease] hover:border-card-border/15 hover:bg-card/10 has-focus-visible:border-card-border/15 has-focus-visible:bg-card/10">
              <h2 className="text-lg font-semibold">
                {/* Stretched link: the whole card is clickable. */}
                <Link
                  href={`/notes/${slug}`}
                  className="after:absolute after:inset-0"
                >
                  {meta.title}
                </Link>
              </h2>
              <p className="mt-1 font-mono text-[0.8rem] opacity-60">
                <time dateTime={meta.date}>{formatNoteDate(meta.date)}</time>
              </p>
              <p className="mt-2 leading-7 opacity-60">{meta.description}</p>
            </article>
          </li>
        ))}
      </ul>
    </main>
  )
}
