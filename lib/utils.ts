import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Converts a Google Drive "view" or "sharing" link to a direct image URL.
 * Uses the thumbnail endpoint which is more reliable for embedding.
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
      // sz=w1000 ensures high quality (up to 1000px width)
      return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`
    }
  } catch (error) {
    console.error('Error parsing Google Drive URL:', error)
  }

  return url
}
