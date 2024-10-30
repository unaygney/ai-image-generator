import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { cn } from '@/lib/utils'

import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Ai Image Generator',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={cn('scroll-smooth', inter.className)}>
      <body
        className={cn('antialiased', {
          'debug-screens': process.env.NODE_ENV === 'development',
        })}
      >
        {children}
      </body>
    </html>
  )
}
