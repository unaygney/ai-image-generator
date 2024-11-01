'use client'

import { Route } from 'next'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import { cn } from '@/lib/utils'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

import { NAV_LINKS, NavLink } from '@/app/constants'

import { Logo } from './icons'
import SignInOrOutButton from './signout-button'

export default function Sidebar() {
  return (
    <div className="hidden min-h-screen w-[72px] flex-col items-center border-r border-[#212936] bg-[#121826] py-6 md:flex">
      <Link href={'/'}>
        <Logo />
      </Link>

      <div className="mt-[53px] flex flex-col gap-4">
        {NAV_LINKS.map((link: NavLink) => (
          <NavItem
            key={link.id}
            href={link.href}
            label={link.label}
            icon={link.icon}
          />
        ))}
      </div>

      <SignInOrOutButton />
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
    <TooltipProvider delayDuration={10}>
      <Tooltip>
        <TooltipTrigger>
          <Link
            className={cn(
              'inline-flex items-center justify-center rounded-lg p-[9px] text-sm font-medium text-[#e4e4e7]',
              {
                'bg-[#7c71ff]': isActive,
              }
            )}
            href={href as Route}
          >
            {icon}
          </Link>
        </TooltipTrigger>
        <TooltipContent className="bg-[#7c71ff] p-2" side="right">
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
