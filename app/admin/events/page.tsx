'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  BookOpen,
  Plus,
  Calendar,
  ArrowLeft,
  Pencil,
  Trash2,
  MapPin,
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
import { useEvents, deleteEvent } from '@/hooks/use-firebase'
import { toast } from 'sonner'

export default function AdminEventsPage() {
  const { events, isLoading, mutate } = useEvents()
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!deleteId) return
    setIsDeleting(true)

    try {
      await deleteEvent(deleteId)
      await mutate()
      toast.success('Event deleted successfully')
    } catch {
      toast.error('Failed to delete event')
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
                Manage Events
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
            <Link href="/admin/events/new">
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Event
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
                  <Skeleton className="mb-4 h-32 w-full rounded-md" />
                  <Skeleton className="mb-2 h-6 w-3/4" />
                  <Skeleton className="mb-4 h-4 w-1/2" />
                  <Skeleton className="h-12 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : events.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => {
              const eventDate = new Date(event.date)
              const isPast = eventDate < new Date()

              return (
                <Card
                  key={event.id}
                  className={`group flex flex-col border-border ${
                    isPast ? 'opacity-75' : ''
                  }`}
                >
                  <CardContent className="flex flex-1 flex-col p-6">
                    {event.imageUrl && (
                      <div className="mb-4 overflow-hidden rounded-md">
                        <img
                          src={event.imageUrl}
                          alt={event.title}
                          className="h-32 w-full object-cover"
                        />
                      </div>
                    )}

                    <div className="mb-3 flex items-start gap-3">
                      <div
                        className={`flex h-12 w-12 flex-shrink-0 flex-col items-center justify-center rounded-lg ${
                          isPast
                            ? 'bg-muted text-muted-foreground'
                            : 'bg-primary text-primary-foreground'
                        }`}
                      >
                        <span className="text-xs font-medium uppercase">
                          {eventDate.toLocaleDateString('en-US', {
                            month: 'short',
                          })}
                        </span>
                        <span className="text-lg font-bold">
                          {eventDate.getDate()}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {eventDate.toLocaleDateString('en-US', {
                            weekday: 'long',
                          })}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {eventDate.toLocaleDateString('en-US', {
                            year: 'numeric',
                          })}
                        </p>
                        {isPast && (
                          <span className="mt-1 inline-block rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                            Past Event
                          </span>
                        )}
                      </div>
                    </div>

                    <h3 className="line-clamp-2 text-lg font-semibold text-foreground">
                      {event.title}
                    </h3>

                    {event.location && (
                      <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 flex-shrink-0" />
                        <span className="line-clamp-1">{event.location}</span>
                      </div>
                    )}

                    <p className="mt-3 line-clamp-2 flex-1 text-sm text-muted-foreground">
                      {event.description}
                    </p>

                    <div className="mt-4 flex gap-2">
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="flex-1"
                      >
                        <Link href={`/admin/events/${event.id}/edit`}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setDeleteId(event.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16">
            <Calendar className="h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-medium text-foreground">
              No events yet
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Get started by adding your first event.
            </p>
            <Link href="/admin/events/new">
              <Button className="mt-4">
                <Plus className="mr-2 h-4 w-4" />
                Add Event
              </Button>
            </Link>
          </div>
        )}
      </main>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Event</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this event? This action cannot be
              undone.
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
