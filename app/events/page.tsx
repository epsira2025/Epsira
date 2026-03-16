'use client'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Calendar, MapPin, CalendarDays, Clock, ChevronDown, ChevronUp } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useEvents } from '@/hooks/use-firebase'
import { useMemo, useState } from 'react'
import Image from 'next/image'
import { getGoogleDriveDirectUrl } from '@/lib/utils'
import { Button } from '@/components/ui/button'

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
                  <div className="grid gap-8">
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
                  <div className="grid gap-8">
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
                  <div className="grid gap-8">
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
                  <div className="grid gap-8">
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
  const [isExpanded, setIsExpanded] = useState(false)
  const eventDate = new Date(event.date)
  const isLongDescription = event.description.length > 200

  return (
    <Card
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
            {!isPast && (
              <div className="absolute top-4 left-4 rounded-full bg-primary/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground backdrop-blur-sm">
                Upcoming
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
                <span className="text-2xl font-black leading-none">{eventDate.getDate()}</span>
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

          <div className="relative">
            <p
              className={`text-base leading-relaxed text-muted-foreground transition-all duration-300 ${
                !isExpanded ? 'line-clamp-3' : ''
              }`}
            >
              {event.description}
            </p>
            {isLongDescription && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-2 h-auto p-0 text-primary hover:bg-transparent hover:text-primary/80"
              >
                {isExpanded ? (
                  <span className="flex items-center gap-1 font-semibold">
                    Show Less <ChevronUp className="h-4 w-4" />
                  </span>
                ) : (
                  <span className="flex items-center gap-1 font-semibold">
                    Read Full Description <ChevronDown className="h-4 w-4" />
                  </span>
                )}
              </Button>
            )}
          </div>

          {isPast && (
            <div className="mt-6">
              <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                <Clock className="mr-1 h-3 w-3" /> Event Concluded
              </span>
            </div>
          )}
        </div>
      </div>
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
