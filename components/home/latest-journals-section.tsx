'use client'

import Link from 'next/link'
import { ArrowRight, BookOpen, FileText, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useJournals } from '@/hooks/use-firebase'
import Image from 'next/image'
import { getGoogleDriveDirectUrl } from '@/lib/utils'

export function LatestJournalsSection() {
  const { journals, isLoading } = useJournals()
  const latestJournals = journals.slice(0, 3)

  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Latest Publications
            </h2>
            <p className="mt-2 text-muted-foreground">
              Explore our most recent academic journals and research papers.
            </p>
          </div>
          <Button asChild variant="outline" className="gap-2">
            <Link href="/journals">
              View All Journals
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            <>
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col gap-4">
                  <Skeleton className="aspect-[3/4] w-full rounded-lg" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </>
          ) : latestJournals.length > 0 ? (
            latestJournals.map((journal) => (
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
                        Read Journal
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
                </div>
              </div>
            ))
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
  )
}
