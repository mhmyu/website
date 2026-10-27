import type { Metadata } from 'next'
import { siteConfig } from '@/lib/site'

type PageMetadataInput = {
  title: string
  description: string
  path: string
  // ISO date. When set, the page is described as an article.
  publishedTime?: string
}

// Open Graph and Twitter objects replace the root layout's ones, so they are
// rebuilt here to avoid inheriting the home page values.
export function buildPageMetadata({
  title,
  description,
  path,
  publishedTime,
}: PageMetadataInput): Metadata {
  const fullTitle = `${title} | ${siteConfig.name}`
  const openGraphBase = {
    url: path,
    siteName: siteConfig.name,
    title: fullTitle,
    description,
    locale: siteConfig.locale,
  }

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: publishedTime
      ? {
          ...openGraphBase,
          type: 'article',
          publishedTime,
          authors: [siteConfig.author.name],
        }
      : { ...openGraphBase, type: 'website' },
    twitter: {
      card: 'summary_large_image',
      site: siteConfig.author.twitterHandle,
      creator: siteConfig.author.twitterHandle,
      title: fullTitle,
      description,
    },
  }
}
