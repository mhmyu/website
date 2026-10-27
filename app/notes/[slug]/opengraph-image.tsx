import { getNote, getNoteSlugs } from '@/lib/notes'
import { renderOgImage } from '@/lib/og-image'

// Image metadata exports must be static literals.
export const alt = 'MHM | Notes'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export async function generateStaticParams() {
  const slugs = await getNoteSlugs()
  return slugs.map((slug) => ({ slug }))
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { meta } = await getNote(slug)
  return renderOgImage(meta.title)
}
