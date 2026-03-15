'use client'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Mail, FileText, ExternalLink, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { useNewsletters } from '@/hooks/use-firebase'
import { useState, useMemo } from 'react'
import Image from 'next/image'
import { getGoogleDriveDirectUrl } from '@/lib/utils'

export default function NewslettersPage() {
  const { newsletters, isLoading } = useNewsletters()
  const [searchQuery, setSearchQuery] = useState('')

  const filteredNewsletters = useMemo(() => {
    if (!searchQuery.trim()) return newsletters
    const query = searchQuery.toLowerCase()
    return newsletters.filter(
      (newsletter) =>
        newsletter.title.toLowerCase().includes(query) ||
        newsletter.description.toLowerCase().includes(query)
    )
  }, [newsletters, searchQuery])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b border-border bg-gradient-to-b from-primary/5 via-background to-background py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary">
                <Mail className="h-4 w-4" />
                <span>Association Updates</span>
              </div>
              <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Newsletters
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Stay informed with our regular newsletters featuring association
                updates, upcoming events, and professional insights.
              </p>
            </div>
          </div>
        </section>

        {/* Search and Newsletters Grid */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Search */}
            <div className="mx-auto mb-12 max-w-xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search newsletters by title or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Newsletters Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {isLoading ? (
                <>
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Card key={i} className="border-border">
                      <CardContent className="p-6">
                        <Skeleton className="mb-4 h-48 w-full rounded-md" />
                        <Skeleton className="mb-2 h-6 w-3/4" />
                        <Skeleton className="mb-4 h-4 w-1/3" />
                        <Skeleton className="h-20 w-full" />
                      </CardContent>
                    </Card>
                  ))}
                </>
              ) : filteredNewsletters.length > 0 ? (
                filteredNewsletters.map((newsletter) => (
                  <Card
                    key={newsletter.id}
                    className="group flex flex-col border-border transition-shadow hover:shadow-md"
                  >
                    <CardContent className="flex-1 p-6">
                      <div className="relative mb-4 flex h-48 items-center justify-center overflow-hidden rounded-md bg-primary/5">
                        {newsletter.coverImageUrl ? (
                          <Image
                            src={getGoogleDriveDirectUrl(newsletter.coverImageUrl)}
                            alt={newsletter.title}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                          />
                        ) : (
                          <FileText className="h-20 w-20 text-primary/30" />
                        )}
                      </div>
                      <h3 className="line-clamp-2 text-lg font-semibold text-foreground">
                        {newsletter.title}
                      </h3>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Published:{' '}
                        {new Date(newsletter.publicationDate).toLocaleDateString(
                          'en-US',
                          {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          }
                        )}
                      </p>
                      <p className="mt-4 line-clamp-4 text-sm leading-relaxed text-muted-foreground">
                        {newsletter.description}
                      </p>
                    </CardContent>
                    <CardFooter className="border-t border-border p-4">
                      <Button asChild variant="default" className="w-full gap-2">
                        <a
                          href={newsletter.googleDriveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Read Newsletter
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : searchQuery ? (
                <div className="col-span-full flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16">
                  <Search className="h-12 w-12 text-muted-foreground/50" />
                  <h3 className="mt-4 text-lg font-medium text-foreground">
                    No results found
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Try adjusting your search query.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => setSearchQuery('')}
                  >
                    Clear Search
                  </Button>
                </div>
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16">
                  <Mail className="h-12 w-12 text-muted-foreground/50" />
                  <h3 className="mt-4 text-lg font-medium text-foreground">
                    No newsletters yet
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Check back soon for our latest updates.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
