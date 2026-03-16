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
  CalendarDays,
  Clock,
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
import Image from 'next/image'
import { getGoogleDriveDirectUrl } from '@/lib/utils'

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
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="grid gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border-border">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-6 md:flex-row">
                    <Skeleton className="h-48 w-full rounded-md md:h-auto md:w-64 lg:w-80" />
                    <div className="flex-1 space-y-4">
                      <Skeleton className="h-8 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-20 w-full" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : events.length > 0 ? (
          <div className="grid gap-8">
            {events
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map((event) => {
                const eventDate = new Date(event.date)
                const isPast = eventDate < new Date()

                return (
                  <Card
                    key={event.id}
                    className={`group overflow-hidden border-border transition-all hover:border-primary/50 hover:shadow-lg ${
                      isPast ? 'opacity-85 grayscale-[0.5]' : ''
                    }`}
                  >
                    <div className="flex flex-col md:flex-row">
                      {/* Image Section */}
                      {event.imageUrl ? (
                        <div className="relative h-48 w-full shrink-0 md:h-auto md:w-64 lg:w-80">
                          <Image
                            src={getGoogleDriveDirectUrl(event.imageUrl)}
                            alt={event.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          {isPast && (
                            <div className="absolute top-4 left-4 rounded-full bg-muted/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground backdrop-blur-sm">
                              Past
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="flex h-48 w-full items-center justify-center bg-muted/50 md:h-auto md:w-64 lg:w-80">
                          <Calendar className="h-12 w-12 text-muted-foreground/20" />
                        </div>
                      )}

                      {/* Content Section */}
                      <div className="flex flex-1 flex-col p-6">
                        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                          <div className="flex items-center gap-4">
                            <div
                              className={`flex h-16 w-16 flex-col items-center justify-center rounded-xl border-2 ${
                                isPast
                                  ? 'border-muted bg-muted/30 text-muted-foreground'
                                  : 'border-primary/20 bg-primary/5 text-primary'
                              }`}
                            >
                              <span className="text-xs font-bold uppercase tracking-tighter">
                                {eventDate.toLocaleDateString('en-US', { month: 'short' })}
                              </span>
                              <span className="text-2xl font-black leading-none">
                                {eventDate.getDate()}
                              </span>
                            </div>
                            <div>
                              <h3 className="text-xl font-bold leading-tight text-foreground sm:text-2xl">
                                {event.title}
                              </h3>
                              <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-medium text-muted-foreground">
                                <span className="flex items-center gap-1.5">
                                  <CalendarDays className="h-4 w-4 text-primary" />
                                  {eventDate.toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                  })}
                                </span>
                                {event.location && (
                                  <span className="flex items-center gap-1.5">
                                    <MapPin className="h-4 w-4 text-primary" />
                                    {event.location}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        <p className="line-clamp-2 text-base leading-relaxed text-muted-foreground">
                          {event.description}
                        </p>

                        <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                          <div className="flex items-center gap-2">
                            {isPast ? (
                              <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                                <Clock className="mr-1 h-3 w-3" /> Event Concluded
                              </span>
                            ) : (
                              <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                                Upcoming Event
                              </span>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button asChild variant="outline" size="sm">
                              <Link href={`/admin/events/${event.id}/edit`}>
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                              </Link>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setDeleteId(event.id)}
                              className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
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
