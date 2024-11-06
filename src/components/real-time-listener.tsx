'use client'

import { useEffect } from 'react'
import toast from 'react-hot-toast'

import { createClient } from '@/lib/supabase/client'

const supabase = createClient()

export default function RealTimeListener() {
  useEffect(() => {
    const channel = supabase
      .channel('images-insert-channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'promts' },
        () => {
          toast.success('Someone created a new image!')
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])
  return null
}
