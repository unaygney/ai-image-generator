import { ImageGeneratorForm } from '@/components/image-generator-form'

export default async function Home() {
  return (
    <div className="flex h-full items-center justify-center">
      <ImageGeneratorForm />
    </div>
  )
}
