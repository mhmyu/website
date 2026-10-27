import type { MetadataRoute } from 'next'
import { getAllNotes } from '@/lib/notes'
import { siteConfig } from '@/lib/site'

// Add one entry per public page as the site grows.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const notes = await getAllNotes()
  return [
    { url: siteConfig.url },
    { url: `${siteConfig.url}/about` },
    { url: `${siteConfig.url}/notes` },
    ...notes.map(({ slug, meta }) => ({
      url: `${siteConfig.url}/notes/${slug}`,
      lastModified: meta.date,
    })),
  ]
}
