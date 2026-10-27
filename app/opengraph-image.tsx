import { ImageResponse } from 'next/og'

// Image metadata exports must be static literals.
export const alt = 'MHM | Freelance Coder & Designer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#000000',
        color: '#ffffff',
      }}
    >
      <div style={{ fontSize: 160, fontWeight: 700 }}>MHM</div>
      <div style={{ fontSize: 40, opacity: 0.6 }}>
        Freelance Coder &amp; Designer
      </div>
    </div>,
    size,
  )
}
