import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

import { createClient } from '@/lib/supabase/server'
import { cn } from '@/lib/utils'

import { AuthModal } from '@/components/auth-modal'
import Navbar from '@/components/navbar'
import Providers from '@/components/providers'
import RealTimeListener from '@/components/real-time-listener'
import Sidebar from '@/components/sidebar'

import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Ai Image Generator',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <html lang="en" className={cn('dark scroll-smooth', inter.className)}>
      <body
        suppressHydrationWarning
        className={cn('h-screen w-full bg-[#121826] antialiased', {
          'debug-screens': process.env.NODE_ENV === 'development',
        })}
      >
        <Providers>
          <div className="flex h-full w-full flex-col md:flex-row">
            <Navbar />
            <Sidebar />
            <main className="flex-1 overflow-scroll px-8 py-[52px] lg:px-[72px]">
              {children}
            </main>
          </div>
          {!user && <AuthModal />}
          <RealTimeListener />
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
