'use client'

export default function myImageLoader({
  src,
  width,
  quality,
}: {
  src: string
  width: number
  quality?: number
}) {
  return `${src}?width=${width}&quality=${quality || 75}`
}
