'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {
  Calendar,
  LogOut,
  Plus,
  FileText,
  Home,
  BarChart3,
  Mail,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/contexts/auth-context'
import { useJournals, useEvents, useNewsletters } from '@/hooks/use-firebase'
import { toast } from 'sonner'

export default function AdminDashboard() {
  const { user, signOut, loading } = useAuth()
  const router = useRouter()
  const { journals } = useJournals()
  const { events } = useEvents()
  const { newsletters } = useNewsletters()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login')
    }
  }, [user, loading, router])

  const handleSignOut = async () => {
    await signOut()
    toast.success('Logged out successfully')
    router.push('/admin/login')
  }

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  const upcomingEventsCount = events.filter(
    (e) => new Date(e.date) >= new Date()
  ).length

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/Logo EPSIRA .png"
              alt="EPSIRA Logo"
              width={180}
              height={70}
              className="h-14 w-auto"
            />
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight text-foreground">
                Admin
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="hidden items-center gap-2 text-sm text-muted-foreground hover:text-foreground sm:flex"
            >
              <Home className="h-4 w-4" />
              View Site
            </Link>
            <span className="hidden text-sm text-muted-foreground sm:block">
              {user.email}
            </span>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            Dashboard
          </h1>
          <p className="mt-1 text-muted-foreground">
            Manage your journals, newsletters, events, and content.
          </p>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Journals
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {journals.length}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Newsletters
              </CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {newsletters.length}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Events
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {events.length}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Upcoming Events
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {upcomingEventsCount}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            Quick Actions
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/admin/journals">
              <Card className="cursor-pointer border-border transition-shadow hover:shadow-md">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">
                      Manage Journals
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      View, add, edit journals
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/admin/newsletters">
              <Card className="cursor-pointer border-border transition-shadow hover:shadow-md">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">
                      Manage Newsletters
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      View, add, edit newsletters
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/admin/events">
              <Card className="cursor-pointer border-border transition-shadow hover:shadow-md">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">
                      Manage Events
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      View, add, edit events
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/admin/journals/new">
              <Card className="cursor-pointer border-border transition-shadow hover:shadow-md">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Plus className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Add Journal</h3>
                    <p className="text-sm text-muted-foreground">
                      Create new publication
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/admin/newsletters/new">
              <Card className="cursor-pointer border-border transition-shadow hover:shadow-md">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Plus className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Add Newsletter</h3>
                    <p className="text-sm text-muted-foreground">
                      Create new newsletter
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/admin/events/new">
              <Card className="cursor-pointer border-border transition-shadow hover:shadow-md">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <Plus className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Add Event</h3>
                    <p className="text-sm text-muted-foreground">
                      Create new event
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* Recent Content */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Recent Journals */}
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Recent Journals</CardTitle>
              <Link href="/admin/journals">
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {journals.length > 0 ? (
                <div className="space-y-4">
                  {journals.slice(0, 5).map((journal) => (
                    <div
                      key={journal.id}
                      className="flex items-start gap-3 rounded-lg border border-border p-3"
                    >
                      <FileText className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                      <div className="flex-1 overflow-hidden">
                        <h4 className="truncate font-medium text-foreground">
                          {journal.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {journal.author}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-sm text-muted-foreground">
                  No journals yet.{' '}
                  <Link
                    href="/admin/journals/new"
                    className="text-primary hover:underline"
                  >
                    Add one
                  </Link>
                </p>
              )}
            </CardContent>
          </Card>

          {/* Recent Newsletters */}
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Recent Newsletters</CardTitle>
              <Link href="/admin/newsletters">
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {newsletters.length > 0 ? (
                <div className="space-y-4">
                  {newsletters.slice(0, 5).map((newsletter) => (
                    <div
                      key={newsletter.id}
                      className="flex items-start gap-3 rounded-lg border border-border p-3"
                    >
                      <Mail className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                      <div className="flex-1 overflow-hidden">
                        <h4 className="truncate font-medium text-foreground">
                          {newsletter.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {new Date(newsletter.publicationDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-sm text-muted-foreground">
                  No newsletters yet.{' '}
                  <Link
                    href="/admin/newsletters/new"
                    className="text-primary hover:underline"
                  >
                    Add one
                  </Link>
                </p>
              )}
            </CardContent>
          </Card>

          {/* Recent Events */}
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Recent Events</CardTitle>
              <Link href="/admin/events">
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {events.length > 0 ? (
                <div className="space-y-4">
                  {events.slice(0, 5).map((event) => (
                    <div
                      key={event.id}
                      className="flex items-start gap-3 rounded-lg border border-border p-3"
                    >
                      <Calendar className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
                      <div className="flex-1 overflow-hidden">
                        <h4 className="truncate font-medium text-foreground">
                          {event.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {new Date(event.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-sm text-muted-foreground">
                  No events yet.{' '}
                  <Link
                    href="/admin/events/new"
                    className="text-primary hover:underline"
                  >
                    Add one
                  </Link>
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
