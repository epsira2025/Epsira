import * as z from 'zod'

export const journalSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(200),
  author: z.string().min(2, 'Author name is required').max(100),
  abstract: z.string().min(20, 'Abstract must be at least 20 characters').max(2000),
  publicationDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  googleDriveUrl: z.string().url('Invalid URL').includes('drive.google.com', {
    message: 'Must be a Google Drive URL',
  }),
  coverImageUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
})

export type JournalFormValues = z.infer<typeof journalSchema>

export const newsletterSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(200),
  description: z.string().min(20, 'Description must be at least 20 characters').max(2000),
  publicationDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  googleDriveUrl: z.string().url('Invalid URL').includes('drive.google.com', {
    message: 'Must be a Google Drive URL',
  }),
  coverImageUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
})

export type NewsletterFormValues = z.infer<typeof newsletterSchema>

export const eventSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(200),
  description: z.string().min(20, 'Description must be at least 20 characters').max(2000),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  location: z.string().min(2, 'Location is required').max(200),
  imageUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
})

export type EventFormValues = z.infer<typeof eventSchema>
