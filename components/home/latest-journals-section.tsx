'use client'

import Link from 'next/link'
import { ArrowRight, BookOpen, FileText, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useJournals } from '@/hooks/use-firebase'

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

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            <>
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
            </>
          ) : latestJournals.length > 0 ? (
            latestJournals.map((journal) => (
              <Card
                key={journal.id}
                className="group flex flex-col border-border transition-shadow hover:shadow-md"
              >
                <CardContent className="flex-1 p-6">
                  <div className="mb-4 flex h-40 items-center justify-center rounded-md bg-primary/5">
                    {journal.coverImageUrl ? (
                      <img
                        src={journal.coverImageUrl}
                        alt={journal.title}
                        className="h-full w-full rounded-md object-cover"
                      />
                    ) : (
                      <FileText className="h-16 w-16 text-primary/30" />
                    )}
                  </div>
                  <h3 className="line-clamp-2 text-lg font-semibold text-foreground">
                    {journal.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    By {journal.author}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {new Date(journal.publicationDate).toLocaleDateString(
                      'en-US',
                      {
                        year: 'numeric',
                        month: 'long',
                      }
                    )}
                  </p>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                    {journal.abstract}
                  </p>
                </CardContent>
                <CardFooter className="border-t border-border p-4">
                  <Button asChild variant="outline" className="w-full gap-2">
                    <a
                      href={journal.googleDriveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Read Journal
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
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
