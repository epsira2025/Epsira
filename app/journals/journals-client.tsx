'use client'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { BookOpen, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { useJournals } from '@/hooks/use-firebase'
import { useState, useMemo } from 'react'
import Image from 'next/image'
import { getGoogleDriveDirectUrl } from '@/lib/utils'

export default function JournalsClient() {
  const { journals, isLoading } = useJournals()
  const [searchQuery, setSearchQuery] = useState('')

  const filteredJournals = useMemo(() => {
    if (!searchQuery.trim()) return journals
    const query = searchQuery.toLowerCase()
    return journals.filter(
      (journal) =>
        journal.title.toLowerCase().includes(query) ||
        journal.author.toLowerCase().includes(query) ||
        journal.abstract.toLowerCase().includes(query)
    )
  }, [journals, searchQuery])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b border-border bg-gradient-to-b from-primary/5 via-background to-background py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary">
                <BookOpen className="h-4 w-4" />
                <span>Academic Publications</span>
              </div>
              <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Journals & Publications
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Explore our collection of peer-reviewed journals and research
                papers covering political science and international relations.
              </p>
            </div>
          </div>
        </section>

        {/* Search and Journals Grid */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Search */}
            <div className="mx-auto mb-12 max-w-xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search journals by title, author, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Journals Grid */}
            <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {isLoading ? (
                <>
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="flex flex-col gap-4">
                      <Skeleton className="aspect-[3/4] w-full rounded-lg" />
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  ))}
                </>
              ) : filteredJournals.length > 0 ? (
                filteredJournals.map((journal) => (
                  <div key={journal.id} className="group flex flex-col">
                    {/* Book Cover Container */}
                    <div className="relative mb-6 aspect-[3/4] w-full overflow-hidden rounded-lg bg-muted shadow-md transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl">
                      {journal.coverImageUrl ? (
                        <Image
                          src={getGoogleDriveDirectUrl(journal.coverImageUrl)}
                          alt={journal.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center bg-primary/5 p-8 text-center">
                          <BookOpen className="mb-4 h-16 w-16 text-primary/20" />
                          <p className="text-xs font-bold uppercase tracking-widest text-primary/40">
                            Academic Journal
                          </p>
                        </div>
                      )}
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-primary/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      
                      {/* Action Button */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100">
                        <Button asChild variant="secondary" className="scale-90 font-bold shadow-xl transition-transform duration-300 group-hover:scale-100">
                          <a
                            href={journal.googleDriveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Read Full Journal
                          </a>
                        </Button>
                      </div>

                      {/* Side spine effect */}
                      <div className="absolute inset-y-0 left-0 w-1 bg-black/10" />
                    </div>
                    
                    {/* Details */}
                    <div className="flex flex-1 flex-col px-1">
                      <div className="mb-2 flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary/60">
                          {new Date(journal.publicationDate).getFullYear()} Edition
                        </span>
                        <div className="h-px flex-1 bg-border/50" />
                      </div>
                      <h3 className="line-clamp-2 font-serif text-xl font-bold leading-tight text-foreground transition-colors group-hover:text-primary">
                        {journal.title}
                      </h3>
                      <p className="mt-2 flex items-center gap-1.5 text-sm font-bold text-muted-foreground">
                        <span className="h-1 w-1 rounded-full bg-primary" />
                        {journal.author}
                      </p>
                      <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground/80 italic">
                        &quot;{journal.abstract}&quot;
                      </p>
                    </div>
                  </div>
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
                  <BookOpen className="h-12 w-12 text-muted-foreground/50" />
                  <h3 className="mt-4 text-lg font-medium text-foreground">
                    No journals yet
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Check back soon for our latest publications.
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
