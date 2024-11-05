'use client'

import { motion } from 'framer-motion'
import { Route } from 'next'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'

import { NAV_LINKS, NavLink } from '@/app/constants'

import { Hamburger, Logo, X } from './icons'
import SignInOrOutButton from './signout-button'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [menuOpen])

  return (
    <div className="relative flex h-[72px] w-full items-center justify-between border-b border-[#212936] px-6 md:hidden">
      <Link href="/">
        <Logo />
      </Link>
      <button
        onClick={toggleMenu}
        className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg bg-[#7c71ff] p-2 transition-none duration-300 hover:opacity-90"
      >
        <Hamburger />
      </button>

      {menuOpen && (
        <motion.div
          onClick={toggleMenu}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-10 bg-black bg-opacity-80 backdrop-blur-3xl"
        />
      )}

      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: menuOpen ? '0%' : '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed right-0 top-0 z-[30] flex h-full w-[60%] max-w-[337px] flex-col bg-[#1c2230] px-8 py-6 shadow-lg"
      >
        <button
          onClick={toggleMenu}
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#7c71ff] p-2"
        >
          <X />
        </button>

        <div className="mt-8 flex flex-col gap-4">
          {NAV_LINKS.map((link: NavLink) => (
            <NavItem
              key={link.id}
              href={link.href}
              label={link.label}
              icon={link.icon}
            />
          ))}
        </div>

        {/* <div className="mt-auto">
          <button className="inline-flex w-full items-center gap-3 rounded-lg bg-[#212936] p-[9px] text-sm font-medium tracking-[-0.49px] text-[#e4e4e7]">
            <SignIn />
            <p className="font-medium">Sign In</p>
          </button>
        </div> */}
        <SignInOrOutButton isNavbar />
      </motion.div>
    </div>
  )
}

function NavItem({
  href,
  label,
  icon,
}: {
  href: string
  label: string
  icon: React.ReactNode
}) {
  const pathname = usePathname()
  const isActive = pathname === href
  return (
    <Link
      className={cn(
        'inline-flex items-center gap-3 rounded-lg p-[9px] text-sm font-medium tracking-[-0.49px] text-[#e4e4e7]',
        {
          'bg-[#7c71ff]': isActive,
        }
      )}
      href={href as Route}
    >
      {icon}
      <p className="font-medium">{label}</p>
    </Link>
  )
}
