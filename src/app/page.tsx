import { ImageGeneratorForm } from '@/components/image-generator-form'

export const maxDuration = 60

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const promt = (await searchParams).promt ?? undefined

  return (
    <div className="flex items-center justify-center">
      <ImageGeneratorForm promt={promt} />
    </div>
  )
}
