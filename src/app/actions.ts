'use server'

import { redirect } from 'next/navigation'

import { hf } from '@/lib/hf'
import { createClient } from '@/lib/supabase/server'
import { blobToBase64 } from '@/lib/utils'
import { PromptForm } from '@/lib/validations'

import { db } from '@/db'
import { promptsTable } from '@/db/schema'

export const generateImage = async (data: PromptForm) => {
  const supabase = await createClient()

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { success: false, message: 'Unauthorized' }
    }

    const [width, height] = data.resolution.split(' ')[0].split('x').map(Number)

    const colorsString =
      data.colors && data.colors.length > 0 ? data.colors.join(',') : ''

    const promptWithColors = colorsString
      ? `${data.prompt}, ${colorsString}`
      : data.prompt

    const imgBlob = await hf.textToImage({
      inputs: promptWithColors,
      model: 'stabilityai/stable-diffusion-2',
      parameters: {
        negative_prompt: data?.negativePrompt,
        height,
        width,
        guidance_scale: data.guidance,
      },
    })

    const { data: imageUpload, error: uploadError } = await supabase.storage
      .from('prompt_image')
      .upload(`/image-${user.id}-${Date.now()}.png`, imgBlob, {
        contentType: 'image/png',
      })

    if (uploadError) {
      console.log(uploadError)
      return { success: false, message: 'Error uploading image' }
    }

    const imageUrl = await blobToBase64(imgBlob)

    await db.insert(promptsTable).values({
      user_id: user.id,
      promt: data.prompt,
      image_url: imageUpload.path,
      width,
      height,
      guidance: data.guidance,
      colors: data.colors,
    })

    return { success: true, message: 'Image generated', imageUrl }
  } catch (error) {
    console.error('Error in generateImage:', error)
    return {
      success: false,
      message: 'An error occurred while generating the image',
    }
  }
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
