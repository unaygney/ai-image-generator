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
