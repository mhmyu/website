import { ImageResponse } from 'next/og'

export const ogImageSize = { width: 1200, height: 630 }

// Shared Open Graph card for the notes and about pages.
export function renderOgImage(title: string, label = 'MHM · Notes') {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 80,
        background: '#000000',
        color: '#ffffff',
      }}
    >
      <div style={{ fontSize: 36, opacity: 0.6 }}>{label}</div>
      <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.1 }}>
        {title}
      </div>
    </div>,
    ogImageSize,
  )
}
