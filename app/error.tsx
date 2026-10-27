'use client'

import { useEffect } from 'react'

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="flex grow flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="text-3xl font-bold">Something went wrong</h1>
      <p className="font-mono text-[0.8rem] lg:text-[0.85rem]">
        An unexpected error occurred. Please try again.
      </p>
      <button
        type="button"
        onClick={reset}
        className="cursor-pointer rounded-card border border-callout-border/30 bg-callout/50 px-4 py-2 font-mono text-[0.8rem] transition-[background,border] duration-200 ease-[ease] hover:border-card-border/15 hover:bg-card/10 focus-visible:border-card-border/15 focus-visible:bg-card/10 lg:text-[0.85rem]"
      >
        Try again
      </button>
    </main>
  )
}
