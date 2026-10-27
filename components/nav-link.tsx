'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ComponentProps } from 'react'

type NavLinkProps = Omit<ComponentProps<typeof Link>, 'href'> & { href: string }

// Link that marks itself as the current page (aria-current) for assistive
// technology and styling. Placeholder links (`#`) are never current.
export function NavLink({ href, ...props }: NavLinkProps) {
  const pathname = usePathname()
  const isCurrent =
    href === '/'
      ? pathname === '/'
      : href.startsWith('/') &&
        (pathname === href || pathname.startsWith(`${href}/`))

  return (
    <Link
      href={href}
      aria-current={isCurrent ? 'page' : undefined}
      {...props}
    />
  )
}
