import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { cn } from '@/lib/utils'

import Navbar from '@/components/navbar'
import Sidebar from '@/components/sidebar'

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
    <html lang="en" className={cn('dark scroll-smooth', inter.className)}>
      <body
        className={cn('h-screen w-full bg-[#121826] antialiased', {
          'debug-screens': process.env.NODE_ENV === 'development',
        })}
      >
        <div className="flex h-full w-full flex-col md:flex-row">
          <Navbar />
          <Sidebar />
          <main className="flex-1 overflow-scroll px-8 py-[52px] lg:px-[72px]">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
