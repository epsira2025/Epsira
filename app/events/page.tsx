'use client'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Calendar, MapPin, CalendarDays, Clock } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useEvents } from '@/hooks/use-firebase'
import { useMemo } from 'react'

export default function EventsPage() {
  const { events, isLoading } = useEvents()

  const { upcomingEvents, pastEvents } = useMemo(() => {
    const now = new Date()
    const upcoming = events
      .filter((event) => new Date(event.date) >= now)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    const past = events
      .filter((event) => new Date(event.date) < now)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    return { upcomingEvents: upcoming, pastEvents: past }
  }, [events])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b border-border bg-gradient-to-b from-primary/5 via-background to-background py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary">
                <Calendar className="h-4 w-4" />
                <span>Conferences & Workshops</span>
              </div>
              <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Events & Workshops
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Join us at our academic conferences, workshops, and seminars
                focused on political science and international relations.
              </p>
            </div>
          </div>
        </section>

        {/* Events Section */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="upcoming" className="w-full">
              <div className="mb-8 flex justify-center">
                <TabsList className="grid w-full max-w-md grid-cols-2">
                  <TabsTrigger value="upcoming" className="gap-2">
                    <CalendarDays className="h-4 w-4" />
                    Upcoming Events
                  </TabsTrigger>
                  <TabsTrigger value="past" className="gap-2">
                    <Clock className="h-4 w-4" />
                    Past Events
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="upcoming">
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
                ) : upcomingEvents.length > 0 ? (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {upcomingEvents.map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    title="No upcoming events"
                    description="Check back soon for our upcoming conferences and workshops."
                  />
                )}
              </TabsContent>

              <TabsContent value="past">
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
                ) : pastEvents.length > 0 ? (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {pastEvents.map((event) => (
                      <EventCard key={event.id} event={event} isPast />
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    title="No past events"
                    description="Our event history will appear here."
                  />
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

function EventCard({
  event,
  isPast = false,
}: {
  event: {
    id: string
    title: string
    description: string
    date: string
    location: string
    imageUrl?: string
  }
  isPast?: boolean
}) {
  const eventDate = new Date(event.date)

  return (
    <Card
      className={`group flex flex-col border-border transition-shadow hover:shadow-md ${
        isPast ? 'opacity-80' : ''
      }`}
    >
      <CardContent className="flex-1 p-6">
        {event.imageUrl && (
          <div className="mb-4 overflow-hidden rounded-md">
            <img
              src={event.imageUrl}
              alt={event.title}
              className="h-40 w-full object-cover transition-transform group-hover:scale-105"
            />
          </div>
        )}

        <div className="mb-4 flex items-start gap-3">
          <div
            className={`flex h-14 w-14 flex-shrink-0 flex-col items-center justify-center rounded-lg ${
              isPast ? 'bg-muted text-muted-foreground' : 'bg-primary text-primary-foreground'
            }`}
          >
            <span className="text-xs font-medium uppercase">
              {eventDate.toLocaleDateString('en-US', { month: 'short' })}
            </span>
            <span className="text-xl font-bold">{eventDate.getDate()}</span>
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">
              {eventDate.toLocaleDateString('en-US', { weekday: 'long' })}
            </p>
            <p className="text-sm text-muted-foreground">
              {eventDate.toLocaleDateString('en-US', { year: 'numeric' })}
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

        <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {event.description}
        </p>
      </CardContent>
    </Card>
  )
}

function EmptyState({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16">
      <CalendarDays className="h-12 w-12 text-muted-foreground/50" />
      <h3 className="mt-4 text-lg font-medium text-foreground">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
