'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Mail, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { addNewsletter } from '@/hooks/use-firebase'
import { toast } from 'sonner'
import { NewsletterForm } from '@/components/admin/newsletter-form'
import { type NewsletterFormValues } from '@/lib/schemas'

export default function NewNewsletterPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (values: NewsletterFormValues) => {
    setIsSubmitting(true)
    try {
      await addNewsletter(values)
      toast.success('Newsletter added successfully')
      router.push('/admin/newsletters')
    } catch (error) {
      console.error('Error adding newsletter:', error)
      toast.error('Failed to add newsletter')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Mail className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-foreground">
                Add Newsletter
              </span>
              <span className="text-xs text-muted-foreground">
                EPSIRA Admin
              </span>
            </div>
          </div>

          <Link href="/admin/newsletters">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Newsletters
            </Button>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Newsletter Details</CardTitle>
          </CardHeader>
          <CardContent>
            <NewsletterForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
