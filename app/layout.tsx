import './globals.css'

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
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
