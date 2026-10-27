import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'

// Shared by app/layout.tsx and app/global-error.tsx, which must render its own
// <html> and <body>, so both documents always look the same.
export const htmlClassName = `${GeistSans.variable} ${GeistMono.variable} max-w-screen overflow-x-hidden dark:scheme-dark`

export const bodyClassName =
  'max-w-screen overflow-x-hidden bg-background-start bg-linear-to-b/srgb from-transparent to-background-end text-foreground'
