import './globals.css'
import { GeistSans, GeistMono } from 'geist/font'

export const metadata = {
  title: 'MHM',
  description: 'A farmer who codes to became freelancer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
