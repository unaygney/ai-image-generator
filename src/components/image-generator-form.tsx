'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { cn, getColorHex } from '@/lib/utils'
import { type PromptForm, promptFormSchema } from '@/lib/validations'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Textarea } from '@/components/ui/textarea'

import { generateImage } from '@/app/actions'
import { COLORS, RESOLUTIONS } from '@/app/constants'

import { AuthModal } from './auth-modal'
import { Generate, Loader, X } from './icons'
import { Checkbox } from './ui/checkbox'

export function ImageGeneratorForm() {
  const form = useForm<PromptForm>({
    resolver: zodResolver(promptFormSchema),
    defaultValues: {
      prompt: '',
      negativePrompt: '',
      colors: [],
      resolution: '1024x1024 (1:1)',
      guidance: 5,
    },
  })

  const {
    formState: { isSubmitting },
  } = form

  const onSubmit = async (data: PromptForm) => {
    const res = await generateImage(data)

    if (res.success) {
      toast.success(res.message)
    } else {
      toast.error(res.message)
    }
  }

  return (
    <div className="flex w-full max-w-[1062px] flex-col gap-[52px] lg:flex-row lg:gap-[30px]">
      <div className="w-full lg:flex-1">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Prompt */}
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prompt</FormLabel>
                  <FormControl>
                    <Textarea
                      className="h-[81px] resize-none"
                      placeholder="Enter prompt for image generation"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Negative Prompt */}
            <FormField
              control={form.control}
              name="negativePrompt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Negative Prompt (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      className="border-[0.5px] border-[#394150] bg-[#212936] py-3"
                      placeholder="Enter the promt"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Colors */}
            <FormField
              control={form.control}
              name="colors"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Colors</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-3">
                      {COLORS.map((color) => {
                        const isSelected = (field.value ?? []).includes(
                          color.value
                        )
                        return (
                          <div
                            key={color.value}
                            className="flex items-center gap-2"
                          >
                            <Checkbox
                              checked={isSelected}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  field.onChange([
                                    ...(field.value ?? []),
                                    color.value,
                                  ])
                                } else {
                                  field.onChange(
                                    (field.value ?? []).filter(
                                      (c) => c !== color.value
                                    )
                                  )
                                }
                              }}
                              className={cn('h-8 w-8 rounded-full border-none')}
                              style={{
                                backgroundColor: getColorHex(color.value),
                              }}
                            />
                          </div>
                        )
                      })}

                      {/* Clear Colors Button */}
                      <button
                        type="button"
                        onClick={() => field.onChange([])}
                        className="flex h-[32px] w-[32px] items-center justify-center rounded-full border-2 border-[#6C727F]"
                      >
                        <X className="h-[14px] w-[14px] text-[#6C727F]" />
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Resolution */}
            <FormField
              control={form.control}
              name="resolution"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resolution</FormLabel>
                  <FormControl>
                    <div className="flex flex-wrap gap-3">
                      {RESOLUTIONS.map((res) => {
                        const isSelected = field.value === res.value
                        return (
                          <button
                            type="button"
                            key={res.value}
                            onClick={() => field.onChange(res.value)}
                            className={cn(
                              'inline-flex items-center justify-center rounded-lg px-3 py-2 text-xs font-normal',
                              {
                                'bg-[#7C71FF] text-white': isSelected,
                                'bg-[#212936] text-[#e4e4e4]': !isSelected,
                              }
                            )}
                          >
                            {res.name}
                          </button>
                        )
                      })}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Guidance Slider */}
            <FormField
              control={form.control}
              name="guidance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Guidance{`(${field.value})`}</FormLabel>
                  <FormControl>
                    <Slider
                      defaultValue={[5]}
                      min={1}
                      max={10}
                      step={1}
                      onValueChange={(value) => field.onChange(value[0])}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Generate Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-12 w-full rounded-xl bg-[#7c71ff] text-base text-[#e4e4e7] hover:bg-[#7c71ff] hover:bg-opacity-85"
            >
              {isSubmitting ? (
                <Loader className="h-4 w-4 animate-spin" />
              ) : (
                <Generate />
              )}
              Generate Image
            </Button>
          </form>
        </Form>
      </div>
      <div className="relative flex h-full w-full overflow-hidden rounded-lg border-4 border-[#212936] lg:h-[511px] lg:max-w-[511px]">
        <div className="h-full w-full">test</div>
      </div>
    </div>
  )
}
