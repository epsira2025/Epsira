'use client'

import Link from 'next/link'
import { ArrowRight, Calendar, MapPin, CalendarDays } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useEvents } from '@/hooks/use-firebase'
import Image from 'next/image'
import { getGoogleDriveDirectUrl } from '@/lib/utils'

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
                  className="group flex flex-col overflow-hidden border-border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-xl"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    {event.imageUrl ? (
                      <Image
                        src={getGoogleDriveDirectUrl(event.imageUrl)}
                        alt={event.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-muted">
                        <Calendar className="h-12 w-12 text-muted-foreground/20" />
                      </div>
                    )}
                    <div className="absolute top-4 left-4 flex h-14 w-14 flex-col items-center justify-center rounded-xl border border-white/20 bg-primary/90 text-primary-foreground backdrop-blur-md">
                      <span className="text-[10px] font-bold uppercase tracking-tighter">
                        {eventDate.toLocaleDateString('en-US', { month: 'short' })}
                      </span>
                      <span className="text-xl font-black leading-none">{eventDate.getDate()}</span>
                    </div>
                  </div>
                  
                  <CardContent className="flex flex-1 flex-col p-6">
                    <h3 className="line-clamp-2 text-xl font-bold leading-tight text-foreground transition-colors group-hover:text-primary">
                      {event.title}
                    </h3>
                    
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
                        <CalendarDays className="h-4 w-4 text-primary" />
                        {eventDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric' })}
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span className="line-clamp-1">{event.location}</span>
                        </div>
                      )}
                    </div>

                    <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                      {event.description}
                    </p>
                    
                    <div className="mt-6 pt-4 border-t border-border/50">
                      <Link 
                        href="/events" 
                        className="inline-flex items-center gap-1 text-sm font-bold text-primary transition-colors hover:text-primary/80"
                      >
                        Event Details <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
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
