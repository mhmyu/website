// Main menu items.
export const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Notes', href: '/notes' },
  { label: 'About', href: '/about' },
] as const

export type NavItem = (typeof navItems)[number]
