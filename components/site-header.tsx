import Image from 'next/image'
import Link from 'next/link'
import { NavLink } from '@/components/nav-link'
import { ThemeToggle } from '@/components/theme-toggle'
import { MobileMenu } from '@/components/mobile-menu'
import { navItems } from '@/lib/nav-items'

// Mobile first: a fixed top bar with the logo and a hamburger button.
// From `lg:` (>= 1024px) the header becomes one centered, bordered bar that
// holds the logo and the menu.
export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-20 flex items-center justify-between border-b border-callout-border/25 bg-linear-to-b/srgb from-background-start to-callout/50 bg-clip-padding px-4 py-3 backdrop-blur-[24px] lg:static lg:inset-x-auto lg:mt-24 lg:w-auto lg:justify-start lg:gap-1 lg:self-center lg:rounded-card lg:border lg:border-callout-border/30 lg:bg-callout/50 lg:bg-none lg:p-1 lg:backdrop-blur-none">
      <Link
        href="/"
        className="flex items-center rounded-card border border-card-border/0 transition-[background,border] duration-200 ease-[ease] lg:px-3 lg:hover:border-card-border/15 lg:hover:bg-card/10 lg:focus-visible:border-card-border/15 lg:focus-visible:bg-card/10"
      >
        <Image
          src="/logomhm.svg"
          alt="MHM home"
          className="dark:invert"
          width={40}
          height={40}
          preload
        />
      </Link>
      <nav aria-label="Main" className="hidden lg:block">
        <ul role="list" className="flex font-mono text-[0.85rem]">
          {navItems.map(({ label, href }) => (
            <li key={label}>
              <NavLink
                href={href}
                className="block rounded-card border border-card-border/0 px-4 py-2 transition-[background,border] duration-200 ease-[ease] hover:border-card-border/15 hover:bg-card/10 focus-visible:border-card-border/15 focus-visible:bg-card/10 aria-[current=page]:border-card-border/15 aria-[current=page]:bg-card/10"
              >
                {label}
              </NavLink>
            </li>
          ))}
          <li>
            <ThemeToggle className="flex size-9 cursor-pointer items-center justify-center rounded-card border border-card-border/0 transition-[background,border] duration-200 ease-[ease] hover:border-card-border/15 hover:bg-card/10 focus-visible:border-card-border/15 focus-visible:bg-card/10" />
          </li>
        </ul>
      </nav>
      <MobileMenu items={navItems} />
    </header>
  )
}
