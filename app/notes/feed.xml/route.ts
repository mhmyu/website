import { getAllNotes } from '@/lib/notes'
import { siteConfig } from '@/lib/site'

// Generated once at build time.
export const dynamic = 'force-static'

const escapeXml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')

export async function GET() {
  const notes = await getAllNotes()
  const items = notes
    .map(({ slug, meta }) => {
      const url = `${siteConfig.url}/notes/${slug}`
      return `    <item>
      <title>${escapeXml(meta.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(meta.date).toUTCString()}</pubDate>
      <description>${escapeXml(meta.description)}</description>
    </item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(`${siteConfig.name} | Notes`)}</title>
    <link>${siteConfig.url}/notes</link>
    <description>Short notes about building for the web, written in plain words.</description>
    <language>en-us</language>
${items}
  </channel>
</rss>
`

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  })
}
