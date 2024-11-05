'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import toast from 'react-hot-toast'

import { createClient } from '@/lib/supabase/client'
import { getInitials } from '@/lib/utils'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import { SignIn } from './icons'
import { useAuthModal } from './providers'
import { Skeleton } from './ui/skeleton'

export default function SignInOrOutButton({ isNavbar = false }) {
  const queryClient = useQueryClient()
  const { openModal } = useAuthModal()

  const supabase = createClient()

  const getUser = async () => {
    const user = await supabase.auth.getUser()
    return user
  }

  const { data, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      toast.error('Error signing out')
    }
    queryClient.invalidateQueries({ queryKey: ['user'] })
    toast.success('Signed out')
  }

  if (isLoading)
    return (
      <div className="mb-4 mt-auto">
        <Skeleton className="size-10 rounded-full" />
      </div>
    )

  return (
    <div className="mb-4 mt-auto flex items-center gap-2">
      {data?.data.user ? (
        <>
          {isNavbar ? (
            <>
              <Avatar>
                <AvatarImage src={data.data.user.user_metadata.avatar_url} />
                {data.data.user.user_metadata.name && (
                  <AvatarFallback>
                    {getInitials(data.data.user.user_metadata.name)}
                  </AvatarFallback>
                )}
              </Avatar>
              <button
                onClick={signOut}
                className="inline-flex h-10 items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-[#e4e4e7]"
              >
                <SignIn />
                <p>Sign out</p>
              </button>
            </>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar>
                  <AvatarImage src={data.data.user.user_metadata.avatar_url} />
                  {data.data.user.user_metadata.name && (
                    <AvatarFallback>
                      {getInitials(data.data.user.user_metadata.name)}
                    </AvatarFallback>
                  )}
                </Avatar>
              </PopoverTrigger>
              <PopoverContent asChild side="right">
                <button
                  onClick={signOut}
                  className="inline-flex h-10 w-[120px] items-center justify-center gap-2 truncate rounded-lg border-none px-4 py-2 text-sm font-medium text-[#e4e4e7]"
                >
                  <SignIn />
                  <p>Sign out</p>
                </button>
              </PopoverContent>
            </Popover>
          )}
        </>
      ) : (
        <button
          onClick={openModal}
          className="inline-flex size-10 items-center justify-center rounded-lg bg-[#212936]"
        >
          <SignIn />
        </button>
      )}
    </div>
  )
}
