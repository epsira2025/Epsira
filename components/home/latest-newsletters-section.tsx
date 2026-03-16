'use client'

import Link from 'next/link'
import { ArrowRight, Mail, FileText, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useNewsletters } from '@/hooks/use-firebase'
import Image from 'next/image'
import { getGoogleDriveDirectUrl } from '@/lib/utils'

export function LatestNewslettersSection() {
  const { newsletters, isLoading } = useNewsletters()
  const latestNewsletters = newsletters.slice(0, 3)

  return (
    <section className="py-20 sm:py-24 border-t border-border bg-secondary/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Latest Newsletters
            </h2>
            <p className="mt-2 text-muted-foreground">
              Stay informed with our most recent association updates and professional insights.
            </p>
          </div>
          <Button asChild variant="outline" className="gap-2">
            <Link href="/newsletters">
              View All Newsletters
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            <>
              {[1, 2, 3].map((i) => (
                <Card key={i} className="overflow-hidden border-border">
                  <Skeleton className="h-64 w-full" />
                  <CardContent className="p-6">
                    <Skeleton className="mb-2 h-6 w-3/4" />
                    <Skeleton className="mb-4 h-4 w-1/3" />
                    <Skeleton className="h-20 w-full" />
                  </CardContent>
                </Card>
              ))}
            </>
          ) : latestNewsletters.length > 0 ? (
            latestNewsletters.map((newsletter) => (
              <Card
                key={newsletter.id}
                className="group flex flex-col overflow-hidden border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted">
                  {newsletter.coverImageUrl ? (
                    <Image
                      src={getGoogleDriveDirectUrl(newsletter.coverImageUrl)}
                      alt={newsletter.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-primary/5">
                      <FileText className="h-20 w-20 text-primary/20" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <Button asChild variant="secondary" className="w-full gap-2 backdrop-blur-sm">
                      <a
                        href={newsletter.googleDriveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Read Newsletter
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
                
                <CardContent className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                      {new Date(newsletter.publicationDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </span>
                  </div>
                  <h3 className="line-clamp-2 text-xl font-bold leading-tight text-foreground transition-colors group-hover:text-primary">
                    {newsletter.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                    {newsletter.description}
                  </p>
                </CardContent>
              </Card>
            ))
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
  )
}
