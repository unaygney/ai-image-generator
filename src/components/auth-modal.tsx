'use client'

import { GitHubLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons'
import { useState } from 'react'

import { createClient } from '@/lib/supabase/client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

import { X } from './icons'

export function AuthModal() {
  const [open, setOpen] = useState(true)
  const supabase = createClient()

  async function signInWithGithub() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo:
          'https://ai-image-generator-lovat.vercel.app/auth/v1/callback',
      },
    })

    console.log(data, error)
  }

  async function SignInWithX() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'twitter',
      options: {
        redirectTo:
          'https://ai-image-generator-lovat.vercel.app/auth/v1/callback',
      },
    })

    console.log(data, error)
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogOverlay className="bg-black bg-opacity-50 blur" />
      <AlertDialogContent className="bg-[#121826] text-white">
        <AlertDialogCancel asChild>
          <button className="absolute right-4 top-4 inline-flex size-10 items-center justify-center rounded-lg bg-[#212936]">
            <X />
          </button>
        </AlertDialogCancel>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">
            Sign In to Continue
          </AlertDialogTitle>
          <AlertDialogDescription className="pt-5">
            <Button
              className="h-12 w-full rounded-lg bg-[#7c71ff] text-white hover:bg-[#7c71ff] hover:bg-opacity-85"
              onClick={signInWithGithub}
            >
              <GitHubLogoIcon />
              Sign in with GitHub
            </Button>
            <Button
              className="h-12 w-full rounded-lg bg-[#7c71ff] text-white hover:bg-[#7c71ff] hover:bg-opacity-85"
              onClick={SignInWithX}
            >
              <TwitterLogoIcon />
              Sign in with X
            </Button>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction asChild></AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
