import { renderOgImage } from '@/lib/og-image'

// Image metadata exports must be static literals.
export const alt = 'MHM | About'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return renderOgImage('About', 'MHM')
}
