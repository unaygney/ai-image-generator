'use client'

import { GitHubLogoIcon } from '@radix-ui/react-icons'

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

import { loginWithGithub } from '@/app/actions'

import { X } from './icons'
import { useAuthModal } from './providers'

export function AuthModal() {
  const { isOpen, setIsOpen } = useAuthModal()

  async function signInGithub() {
    await loginWithGithub()
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
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
              onClick={signInGithub}
            >
              <GitHubLogoIcon />
              Sign in with GitHub
            </Button>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  )
}
