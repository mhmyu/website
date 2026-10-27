'use client'

import { useEffect, useSyncExternalStore } from 'react'

const STORAGE_KEY = 'theme'

// Dark is the default; the `light` class on <html> is the single source of
// truth for the opposite theme.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  })
  return () => observer.disconnect()
}

const getSnapshot = () => !document.documentElement.classList.contains('light')
const getServerSnapshot = () => true

const setDark = (isDark: boolean) =>
  document.documentElement.classList.toggle('light', !isDark)

// Sun in dark mode (switch to light), moon in light mode (switch to dark).
// Both icons are always rendered and swapped with CSS, so the server HTML
// matches the client regardless of the active theme.
export function ThemeToggle({
  className,
  showLabel = false,
}: {
  className?: string
  showLabel?: boolean
}) {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  // Keep other open tabs in sync.
  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) setDark(event.newValue !== 'light')
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  const handleClick = () => {
    const next = !getSnapshot()
    setDark(next)
    try {
      localStorage.setItem(STORAGE_KEY, next ? 'dark' : 'light')
    } catch {
      // Storage can be blocked; the choice then lasts for this visit only.
    }
  }

  return (
    <button
      type="button"
      aria-pressed={isDark}
      onClick={handleClick}
      className={className}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="size-5 shrink-0 dark:hidden"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="hidden size-5 shrink-0 dark:block"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
      <span className={showLabel ? undefined : 'sr-only'}>Dark mode</span>
    </button>
  )
}
