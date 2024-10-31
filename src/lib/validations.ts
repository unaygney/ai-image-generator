import { z } from 'zod'

const ColorsEnum = z.enum(['red', 'orange', 'green', 'blue', 'purple', 'white'])
const ResolutionEnum = z.enum([
  '1024x1024 (1:1)',
  '1152x896 (9:7)',
  '896x1152 (7:9)',
  '1344x768 (7:4)',
  '768x1344 (4:7)',
])

export const promptFormSchema = z.object({
  prompt: z.string().min(1, { message: 'Prompt cannot be empty.' }),
  negativePrompt: z.string().optional(),
  colors: z.array(ColorsEnum).optional(),
  resolution: ResolutionEnum,
  guidance: z.number().min(1, { message: 'Guidance value must be set.' }),
})

//types
export type PromptForm = z.infer<typeof promptFormSchema>
