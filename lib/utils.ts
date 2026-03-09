import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Converts a Google Drive "view" or "sharing" link to a direct image URL.
 * Supports /file/d/[ID]/view and ?id=[ID] formats.
 */
export function getGoogleDriveDirectUrl(url: string | undefined): string {
  if (!url) return ''
  if (!url.includes('drive.google.com')) return url

  try {
    let fileId = ''

    // Match /file/d/[ID]/view
    const pathMatch = url.match(/\/file\/d\/([^/]+)/)
    if (pathMatch && pathMatch[1]) {
      fileId = pathMatch[1]
    } else {
      // Match ?id=[ID]
      const urlParams = new URL(url).searchParams
      fileId = urlParams.get('id') || ''
    }

    if (fileId) {
      return `https://drive.google.com/uc?export=view&id=${fileId}`
    }
  } catch (error) {
    console.error('Error parsing Google Drive URL:', error)
  }

  return url
}
