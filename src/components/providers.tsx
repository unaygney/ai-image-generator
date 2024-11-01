'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { ReactNode, createContext, useContext, useState } from 'react'

import { AuthModalContextType } from '@/lib/definitions'

const queryClient = new QueryClient()
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthModalProvider>{children}</AuthModalProvider>
    </QueryClientProvider>
  )
}

const AuthModalContext = createContext<AuthModalContextType | undefined>(
  undefined
)

export const AuthModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  return (
    <AuthModalContext.Provider
      value={{ isOpen, openModal, closeModal, setIsOpen }}
    >
      {children}
    </AuthModalContext.Provider>
  )
}

export const useAuthModal = () => {
  const context = useContext(AuthModalContext)
  if (!context) {
    throw new Error('useAuthModal must be used within an AuthModalProvider')
  }
  return context
}
