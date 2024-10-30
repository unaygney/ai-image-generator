import { Collection, Feed, Generate, History } from '@/components/icons'

export const NAV_LINKS = [
  {
    id: 0,
    href: '/',
    label: 'Generate',
    icon: <Generate />,
  },
  {
    id: 1,
    href: '/feed',
    label: 'Feed',
    icon: <Feed />,
  },
  {
    id: 2,
    href: '/history',
    label: 'History',
    icon: <History />,
  },
  {
    id: 3,
    href: '/collection',
    label: 'Collection',
    icon: <Collection />,
  },
] as const

export type NavLink = (typeof NAV_LINKS)[number]
