'use server'

import { createClient } from '@/lib/supabase/server'
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

  return { success: true, message: 'Image generated' }
}
