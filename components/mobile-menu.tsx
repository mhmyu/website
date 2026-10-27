'use client'

import { NavLink } from '@/components/nav-link'
import { ThemeToggle } from '@/components/theme-toggle'
import { useEffect, useRef, useState } from 'react'
import type { NavItem } from '@/lib/nav-items'

const iconButtonClassName =
  'flex size-10 items-center justify-center rounded-card border border-card-border/0 transition-[background,border] duration-200 ease-[ease] hover:border-card-border/15 hover:bg-card/10 focus-visible:border-card-border/15 focus-visible:bg-card/10'

// Hamburger button plus a right-side drawer. The native <dialog> element
// (opened with showModal) provides the focus trap, Esc to close, inert page
// content and focus restoration, so no extra scripting is needed for them.
export function MobileMenu({ items }: { items: readonly NavItem[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  const closeMenu = () => dialogRef.current?.close()

  // Lock page scroll while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // The drawer is mobile only: close it if the viewport grows to desktop.
  useEffect(() => {
    const query = window.matchMedia('(min-width: 1024px)')
    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) dialogRef.current?.close()
    }
    query.addEventListener('change', handleChange)
    return () => query.removeEventListener('change', handleChange)
  }, [])

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        onClick={() => {
          dialogRef.current?.showModal()
          setIsOpen(true)
        }}
        className={`-mr-2 lg:hidden ${iconButtonClassName}`}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="size-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>
      <dialog
        ref={dialogRef}
        id="mobile-menu"
        aria-label="Menu"
        onClose={() => setIsOpen(false)}
        // A click on the backdrop targets the dialog element itself.
        onClick={(event) => {
          if (event.target === event.currentTarget) closeMenu()
        }}
        className="m-0 ml-auto h-dvh max-h-none w-72 max-w-[80vw] translate-x-full border-l border-callout-border/30 bg-background-end p-0 text-foreground transition-[translate,overlay,display] transition-discrete duration-300 ease-out backdrop:bg-black/40 open:translate-x-0 motion-reduce:transition-none lg:hidden starting:open:translate-x-full"
      >
        <div className="flex h-full flex-col p-4">
          <div className="flex justify-end">
            <button
              type="button"
              aria-label="Close menu"
              onClick={closeMenu}
              className={`-mr-2 ${iconButtonClassName}`}
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="size-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
          <nav aria-label="Main" className="mt-4">
            <ul
              role="list"
              className="flex flex-col rounded-card border border-callout-border/30 bg-callout/50 p-1 font-mono text-[0.85rem]"
            >
              {items.map(({ label, href }) => (
                <li key={label}>
                  <NavLink
                    href={href}
                    onClick={closeMenu}
                    className="block rounded-card border border-card-border/0 px-4 py-3 transition-[background,border] duration-200 ease-[ease] hover:border-card-border/15 hover:bg-card/10 focus-visible:border-card-border/15 focus-visible:bg-card/10 aria-[current=page]:border-card-border/15 aria-[current=page]:bg-card/10"
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
              <li>
                <ThemeToggle
                  showLabel
                  className="flex w-full cursor-pointer flex-row-reverse items-center justify-between rounded-card border border-card-border/0 px-4 py-3 transition-[background,border] duration-200 ease-[ease] hover:border-card-border/15 hover:bg-card/10 focus-visible:border-card-border/15 focus-visible:bg-card/10"
                />
              </li>
            </ul>
          </nav>
        </div>
      </dialog>
    </>
  )
}
