'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { BookOpen, ArrowLeft, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { addJournal } from '@/hooks/use-firebase'
import { toast } from 'sonner'

export default function NewJournalPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    abstract: '',
    publicationDate: '',
    googleDriveUrl: '',
    coverImageUrl: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await addJournal(formData)
      toast.success('Journal added successfully')
      router.push('/admin/journals')
    } catch {
      toast.error('Failed to add journal')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <BookOpen className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-foreground">
                Add New Journal
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

      {/* Main Content */}
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Journal Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Enter journal title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="author">Author(s) *</Label>
                <Input
                  id="author"
                  name="author"
                  placeholder="Enter author name(s)"
                  value={formData.author}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="abstract">Abstract / Description *</Label>
                <Textarea
                  id="abstract"
                  name="abstract"
                  placeholder="Enter a brief description or abstract"
                  rows={5}
                  value={formData.abstract}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="publicationDate">Publication Date *</Label>
                <Input
                  id="publicationDate"
                  name="publicationDate"
                  type="date"
                  value={formData.publicationDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="googleDriveUrl">Google Drive URL *</Label>
                <Input
                  id="googleDriveUrl"
                  name="googleDriveUrl"
                  type="url"
                  placeholder="https://drive.google.com/..."
                  value={formData.googleDriveUrl}
                  onChange={handleChange}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Link to the journal file on Google Drive
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="coverImageUrl">Cover Image URL (Optional)</Label>
                <Input
                  id="coverImageUrl"
                  name="coverImageUrl"
                  type="url"
                  placeholder="https://drive.google.com/... or any image URL"
                  value={formData.coverImageUrl}
                  onChange={handleChange}
                />
                <p className="text-xs text-muted-foreground">
                  Link to a cover image (Google Drive or any public URL)
                </p>
              </div>

              <div className="flex justify-end gap-4">
                <Link href="/admin/journals">
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </Link>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    'Saving...'
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Journal
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
