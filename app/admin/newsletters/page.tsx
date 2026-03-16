'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Mail,
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
import { useNewsletters, deleteNewsletter } from '@/hooks/use-firebase'
import { toast } from 'sonner'
import Image from 'next/image'
import { getGoogleDriveDirectUrl } from '@/lib/utils'

export default function AdminNewslettersPage() {
  const { newsletters, isLoading, mutate } = useNewsletters()
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!deleteId) return
    setIsDeleting(true)

    try {
      await deleteNewsletter(deleteId)
      await mutate()
      toast.success('Newsletter deleted successfully')
    } catch {
      toast.error('Failed to delete newsletter')
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
              <Mail className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-foreground">
                Manage Newsletters
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
            <Link href="/admin/newsletters/new">
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Newsletter
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden border-border">
                <Skeleton className="h-64 w-full" />
                <CardContent className="p-6">
                  <Skeleton className="mb-2 h-6 w-3/4" />
                  <Skeleton className="mb-4 h-4 w-1/3" />
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : newsletters.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {newsletters.map((newsletter) => (
              <Card
                key={newsletter.id}
                className="group flex flex-col overflow-hidden border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted">
                  {newsletter.coverImageUrl ? (
                    <Image
                      src={getGoogleDriveDirectUrl(newsletter.coverImageUrl)}
                      alt={newsletter.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-primary/5">
                      <FileText className="h-20 w-20 text-primary/20" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  
                  {/* Action Buttons Overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <Button asChild variant="secondary" size="sm" className="w-32 font-bold shadow-xl backdrop-blur-sm">
                      <a
                        href={newsletter.googleDriveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View
                      </a>
                    </Button>
                    <Button asChild variant="secondary" size="sm" className="w-32 font-bold shadow-xl backdrop-blur-sm">
                      <Link href={`/admin/newsletters/${newsletter.id}/edit`}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </Link>
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="w-32 font-bold shadow-xl backdrop-blur-sm"
                      onClick={() => setDeleteId(newsletter.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>

                <CardContent className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                      {new Date(newsletter.publicationDate).toLocaleDateString('en-US', {
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <h3 className="line-clamp-2 text-xl font-bold leading-tight text-foreground transition-colors group-hover:text-primary">
                    {newsletter.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                    {newsletter.description}
                  </p>
                  <div className="mt-auto pt-6">
                    <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <FileText className="h-3 w-3" /> PDF Document
                      </span>
                      <span>
                        {new Date(newsletter.publicationDate).toLocaleDateString('en-US', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16">
            <Mail className="h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-medium text-foreground">
              No newsletters yet
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Get started by adding your first newsletter.
            </p>
            <Link href="/admin/newsletters/new">
              <Button className="mt-4">
                <Plus className="mr-2 h-4 w-4" />
                Add Newsletter
              </Button>
            </Link>
          </div>
        )}
      </main>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Newsletter</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this newsletter? This action cannot
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
