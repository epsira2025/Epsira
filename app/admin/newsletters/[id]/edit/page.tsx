'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { Mail, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useNewsletters, updateNewsletter } from '@/hooks/use-firebase'
import { toast } from 'sonner'
import { NewsletterForm } from '@/components/admin/newsletter-form'
import { type NewsletterFormValues } from '@/lib/schemas'

export default function EditNewsletterPage() {
  const router = useRouter()
  const params = useParams()
  const newsletterId = params.id as string
  const { newsletters, isLoading } = useNewsletters()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const newsletter = newsletters.find((n) => n.id === newsletterId)

  const handleSubmit = async (values: NewsletterFormValues) => {
    setIsSubmitting(true)
    try {
      await updateNewsletter(newsletterId, values)
      toast.success('Newsletter updated successfully')
      router.push('/admin/newsletters')
    } catch (error) {
      console.error('Error updating newsletter:', error)
      toast.error('Failed to update newsletter')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-9 w-32" />
          </div>
        </header>
        <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
          <Card className="border-border">
            <CardContent className="space-y-6 p-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  if (!newsletter) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-foreground">
            Newsletter not found
          </h2>
          <Link href="/admin/newsletters">
            <Button className="mt-4">Back to Newsletters</Button>
          </Link>
        </div>
      </div>
    )
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
                Edit Newsletter
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
            <NewsletterForm
              initialValues={newsletter}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
