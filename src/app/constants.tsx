import { Generate } from '@/components/icons'

export const NAV_LINKS = [
  {
    id: 0,
    href: '/generate',
    label: 'Generate',
    icon: <Generate />,
  },
  {
    id: 1,
    href: '/feed',
    label: 'Feed',
    icon: <Generate />,
  },
  {
    id: 2,
    href: '/history',
    label: 'History',
    icon: <Generate />,
  },
  {
    id: 3,
    href: '/collection',
    label: 'Collection',
    icon: <Generate />,
  },
] as const

export type NavLink = (typeof NAV_LINKS)[number]
