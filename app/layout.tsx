import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import './globals.css'
import { Analytics } from '@vercel/analytics/next'
import { SiteHeader } from '@/components/site-header'
import { ThemeScript } from '@/components/theme-script'
import { bodyClassName, htmlClassName } from '@/lib/document-classes'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.title, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.author.name, url: siteConfig.url }],
  creator: siteConfig.author.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    locale: siteConfig.locale,
  },
  twitter: {
    card: 'summary_large_image',
    site: siteConfig.author.twitterHandle,
    creator: siteConfig.author.twitterHandle,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
}

// Matches the dark --color-background-start token (dark is the default theme).
export const viewport: Viewport = {
  themeColor: '#000000',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={htmlClassName} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className={bodyClassName}>
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  )
}
