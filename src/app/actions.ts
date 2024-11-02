'use server'

import { redirect } from 'next/navigation'

import { hf } from '@/lib/hf'
import { createClient } from '@/lib/supabase/server'
import { blobToBase64 } from '@/lib/utils'
import { PromptForm } from '@/lib/validations'

export const generateImage = async (data: PromptForm) => {
  const supabase = await createClient()
  //todo : get user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, message: 'Unauthorized' }
  }

  const [width, height] = data.resolution.split(' ')[0].split('x').map(Number)

  //todo : add colors with inputs
  const imgBlob = await hf.textToImage({
    inputs: data.prompt,
    model: 'stabilityai/stable-diffusion-2',
    parameters: {
      negative_prompt: data?.negativePrompt,
      height,
      width,
      guidance_scale: data.guidance,
    },
  })

  const imageUrl = await blobToBase64(imgBlob)

  //todo : save image to db
  //todo : save promts to db

  return { success: true, message: 'Image generated', imageUrl }
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
    console.log(error)
  }
  if (data.url) {
    redirect(data.url)
  }
}
