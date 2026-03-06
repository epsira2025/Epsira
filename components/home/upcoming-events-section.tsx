'use client'

import Link from 'next/link'
import { ArrowRight, Calendar, MapPin, CalendarDays } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useEvents } from '@/hooks/use-firebase'

export function UpcomingEventsSection() {
  const { events, isLoading } = useEvents()
  
  // Filter for upcoming events only
  const now = new Date()
  const upcomingEvents = events
    .filter((event) => new Date(event.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3)

  return (
    <section className="border-y border-border bg-secondary/30 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Upcoming Events
            </h2>
            <p className="mt-2 text-muted-foreground">
              Join us at our upcoming conferences, workshops, and seminars.
            </p>
          </div>
          <Button asChild variant="outline" className="gap-2">
            <Link href="/events">
              View All Events
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {isLoading ? (
            <>
              {[1, 2, 3].map((i) => (
                <Card key={i} className="border-border bg-card">
                  <CardContent className="p-6">
                    <Skeleton className="mb-4 h-32 w-full rounded-md" />
                    <Skeleton className="mb-2 h-6 w-3/4" />
                    <Skeleton className="mb-4 h-4 w-1/2" />
                    <Skeleton className="h-12 w-full" />
                  </CardContent>
                </Card>
              ))}
            </>
          ) : upcomingEvents.length > 0 ? (
            upcomingEvents.map((event) => {
              const eventDate = new Date(event.date)
              return (
                <Card
                  key={event.id}
                  className="group border-border bg-card transition-shadow hover:shadow-md"
                >
                  <CardContent className="p-6">
                    {event.imageUrl && (
                      <div className="mb-4 overflow-hidden rounded-md">
                        <img
                          src={event.imageUrl}
                          alt={event.title}
                          className="h-32 w-full object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="mb-3 flex items-center gap-2">
                      <div className="flex h-12 w-12 flex-col items-center justify-center rounded-lg bg-primary text-primary-foreground">
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
                        <p className="text-xs text-muted-foreground">
                          {eventDate.toLocaleDateString('en-US', {
                            year: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>
                    <h3 className="line-clamp-2 text-lg font-semibold text-foreground">
                      {event.title}
                    </h3>
                    {event.location && (
                      <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                    )}
                    <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                      {event.description}
                    </p>
                  </CardContent>
                </Card>
              )
            })
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-card py-16">
              <CalendarDays className="h-12 w-12 text-muted-foreground/50" />
              <h3 className="mt-4 text-lg font-medium text-foreground">
                No upcoming events
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Check back soon for our upcoming events and workshops.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
