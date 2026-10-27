import { readdir } from 'node:fs/promises'
import path from 'node:path'
import type { ComponentType } from 'react'

export type NoteMeta = {
  title: string
  // 120-160 characters, also used as the meta description.
  description: string
  // ISO date: YYYY-MM-DD.
  date: string
}

// Each note is `content/notes/<slug>.mdx` and exports `meta` (see NoteMeta).
const NOTES_DIR = path.join(process.cwd(), 'content', 'notes')

export async function getNoteSlugs(): Promise<string[]> {
  const files = await readdir(NOTES_DIR)
  return files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''))
}

export async function getNote(slug: string) {
  const note = (await import(`@/content/notes/${slug}.mdx`)) as {
    default: ComponentType
    meta: NoteMeta
  }
  return { slug, meta: note.meta, Content: note.default }
}

// Newest first.
export async function getAllNotes() {
  const slugs = await getNoteSlugs()
  const notes = await Promise.all(slugs.map(getNote))
  return notes.sort((a, b) => b.meta.date.localeCompare(a.meta.date))
}

export function formatNoteDate(date: string): string {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'long',
    timeZone: 'UTC',
  }).format(new Date(date))
}
