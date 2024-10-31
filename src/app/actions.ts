'use server'

import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'
import { PromptForm } from '@/lib/validations'

export const generateImage = async (data: PromptForm) => {
  const supabase = await createClient()
  console.log('data', data)
  //todo : get user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, message: 'Unauthorized' }
  }

  return { success: true, message: 'Image generated' }
}
export const loginWithGithub = async () => {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: 'https://ai-image-generator-lovat.vercel.app/auth/callback',
    },
  })
  if (error) {
    throw new Error(error.message)
  }
  if (data.url) {
    redirect(data.url)
  }
}
