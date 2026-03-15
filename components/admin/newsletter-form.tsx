'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Save, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { newsletterSchema, type NewsletterFormValues } from '@/lib/schemas'
import Link from 'next/link'

interface NewsletterFormProps {
  initialValues?: Partial<NewsletterFormValues>
  onSubmit: (values: NewsletterFormValues) => Promise<void>
  isSubmitting: boolean
}

export function NewsletterForm({
  initialValues,
  onSubmit,
  isSubmitting,
}: NewsletterFormProps) {
  const form = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      title: initialValues?.title || '',
      description: initialValues?.description || '',
      publicationDate: initialValues?.publicationDate || '',
      googleDriveUrl: initialValues?.googleDriveUrl || '',
      coverImageUrl: initialValues?.coverImageUrl || '',
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title *</FormLabel>
              <FormControl>
                <Input placeholder="Enter newsletter title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter a brief description of the newsletter"
                  rows={5}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="publicationDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Publication Date *</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="googleDriveUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Google Drive URL *</FormLabel>
              <FormControl>
                <Input placeholder="https://drive.google.com/..." {...field} />
              </FormControl>
              <FormDescription>
                Link to the newsletter PDF file on Google Drive
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="coverImageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover Image URL (Optional)</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://drive.google.com/... or any image URL"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Link to a cover image (Google Drive or any public URL)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Link href="/admin/newsletters">
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Newsletter
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
