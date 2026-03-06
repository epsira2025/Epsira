'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  BookOpen,
  Plus,
  FileText,
  ArrowLeft,
  Pencil,
  Trash2,
  ExternalLink,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useJournals, deleteJournal } from '@/hooks/use-firebase'
import { toast } from 'sonner'

export default function AdminJournalsPage() {
  const { journals, isLoading, mutate } = useJournals()
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!deleteId) return
    setIsDeleting(true)

    try {
      await deleteJournal(deleteId)
      await mutate()
      toast.success('Journal deleted successfully')
    } catch {
      toast.error('Failed to delete journal')
    } finally {
      setIsDeleting(false)
      setDeleteId(null)
    }
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
                Manage Journals
              </span>
              <span className="text-xs text-muted-foreground">
                EPSIRA Admin
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/admin">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <Link href="/admin/journals/new">
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Journal
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border-border">
                <CardContent className="p-6">
                  <Skeleton className="mb-4 h-40 w-full rounded-md" />
                  <Skeleton className="mb-2 h-6 w-3/4" />
                  <Skeleton className="mb-4 h-4 w-1/2" />
                  <Skeleton className="h-16 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : journals.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {journals.map((journal) => (
              <Card
                key={journal.id}
                className="group flex flex-col border-border"
              >
                <CardContent className="flex flex-1 flex-col p-6">
                  <div className="mb-4 flex h-40 items-center justify-center overflow-hidden rounded-md bg-primary/5">
                    {journal.coverImageUrl ? (
                      <img
                        src={journal.coverImageUrl}
                        alt={journal.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <FileText className="h-16 w-16 text-primary/30" />
                    )}
                  </div>

                  <h3 className="line-clamp-2 text-lg font-semibold text-foreground">
                    {journal.title}
                  </h3>
                  <p className="mt-1 text-sm text-primary">{journal.author}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {new Date(journal.publicationDate).toLocaleDateString()}
                  </p>
                  <p className="mt-3 line-clamp-2 flex-1 text-sm text-muted-foreground">
                    {journal.abstract}
                  </p>

                  <div className="mt-4 flex gap-2">
                    <Button asChild variant="outline" size="sm" className="flex-1">
                      <a
                        href={journal.googleDriveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View
                      </a>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/admin/journals/${journal.id}/edit`}>
                        <Pencil className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setDeleteId(journal.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16">
            <FileText className="h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-medium text-foreground">
              No journals yet
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Get started by adding your first journal.
            </p>
            <Link href="/admin/journals/new">
              <Button className="mt-4">
                <Plus className="mr-2 h-4 w-4" />
                Add Journal
              </Button>
            </Link>
          </div>
        )}
      </main>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Journal</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this journal? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
