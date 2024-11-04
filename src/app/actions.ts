'use server'

import { redirect } from 'next/navigation'

import { hf } from '@/lib/hf'
import { createClient } from '@/lib/supabase/server'
import { blobToBase64 } from '@/lib/utils'
import { PromptForm } from '@/lib/validations'

import { URL } from './config'
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

    const imagePath = `/image-${user.id}-${Date.now()}.png`

    const { error: uploadError } = await supabase.storage
      .from('prompt_images')
      .upload(imagePath, imgBlob)

    if (uploadError) {
      console.error(uploadError)
      return {
        success: false,
        message: 'Error uploading image',
        error: uploadError.message,
      }
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from('prompt_images').getPublicUrl(imagePath)

    const imageUrl = await blobToBase64(imgBlob)

    await db.insert(promptsTable).values({
      user_id: user.id,
      promt: data.prompt,
      negative_promt: data.negativePrompt,
      image_url: publicUrl,
      width,
      height,
      guidance: data.guidance,
      colors: data.colors,
      user_name: user.user_metadata.full_name,
      user_avatar: user.user_metadata.avatar_url,
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
      redirectTo: `${URL}/auth/callback`,
    },
  })

  if (error) {
    console.log(error)
  }
  if (data.url) {
    redirect(data.url)
  }
}
