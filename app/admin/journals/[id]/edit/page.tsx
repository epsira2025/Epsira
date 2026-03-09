'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { BookOpen, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useJournals, updateJournal } from '@/hooks/use-firebase'
import { toast } from 'sonner'
import { JournalForm } from '@/components/admin/journal-form'
import { type JournalFormValues } from '@/lib/schemas'

export default function EditJournalPage() {
  const router = useRouter()
  const params = useParams()
  const journalId = params.id as string
  const { journals, isLoading } = useJournals()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const journal = journals.find((j) => j.id === journalId)

  const handleSubmit = async (values: JournalFormValues) => {
    setIsSubmitting(true)
    try {
      await updateJournal(journalId, values)
      toast.success('Journal updated successfully')
      router.push('/admin/journals')
    } catch {
      toast.error('Failed to update journal')
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

  if (!journal) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-foreground">
            Journal not found
          </h2>
          <Link href="/admin/journals">
            <Button className="mt-4">Back to Journals</Button>
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
              <BookOpen className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-foreground">
                Edit Journal
              </span>
              <span className="text-xs text-muted-foreground">
                EPSIRA Admin
              </span>
            </div>
          </div>

          <Link href="/admin/journals">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Journals
            </Button>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Journal Details</CardTitle>
          </CardHeader>
          <CardContent>
            <JournalForm
              initialValues={journal}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
