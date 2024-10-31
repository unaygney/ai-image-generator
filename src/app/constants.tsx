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

export const COLORS = [
  { name: 'Red', value: 'red' },
  { name: 'Orange', value: 'orange' },
  { name: 'Green', value: 'green' },
  { name: 'Blue', value: 'blue' },
  { name: 'Purple', value: 'purple' },
  { name: 'White', value: 'white' },
] as const

export const RESOLUTIONS = [
  { name: '1024x1024 (1:1)', value: '1024x1024 (1:1)' },
  { name: '1152x896 (9:7)', value: '1152x896 (9:7)' },
  { name: '896x1152 (7:9)', value: '896x1152 (7:9)' },
  { name: '1344x768 (7:4)', value: '1344x768 (7:4)' },
  { name: '768x1344 (4:7)', value: '768x1344 (4:7)' },
] as const

export type NavLink = (typeof NAV_LINKS)[number]
