import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getColorHex(value: string) {
  const colorMap = {
    red: '#DD524C',
    orange: '#E87B35',
    green: '#5EC269',
    blue: '#4E80EE',
    purple: '#9D59EF',
    white: '#E4E4E7',
  }
  return colorMap[value as keyof typeof colorMap] || '#000000'
}
export function getInitials(fullName: string) {
  const nameParts = fullName.trim().split(' ')

  if (nameParts.length === 1) {
    return nameParts[0][0].toUpperCase()
  } else {
    return nameParts[0][0].toUpperCase() + nameParts[1][0].toUpperCase()
  }
}
export async function blobToBase64(blob: Blob): Promise<string> {
  const buffer = Buffer.from(await blob.arrayBuffer())
  return `data:image/png;base64,${buffer.toString('base64')}`
}
export function getAspectRatio(width: number, height: number): string {
  function gcd(a: number, b: number): number {
    return b === 0 ? a : gcd(b, a % b)
  }

  const divisor = gcd(width, height)
  const aspectWidth = width / divisor
  const aspectHeight = height / divisor

  return `${aspectWidth}/${aspectHeight}`
}
export function formatDate(date: Date | null) {
  if (!date) return 'Null'

  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date)
}
