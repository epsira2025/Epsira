import Link from 'next/link'
import { ArrowRight, BookOpen, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary">
            <BookOpen className="h-4 w-4" />
            <span>Ethiopian Political Science Association</span>
          </div>

          <h1 className="text-balance font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Ethiopian Political Science and International Relations Association
          </h1>

          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
            EPSIRA strengthens and fosters the study of political science and
            international relations in Ethiopia, supports research in the field,
            and promotes civic and community engagement of its members.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="gap-2">
              <Link href="/journals">
                <BookOpen className="h-4 w-4" />
                Explore Journals
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link href="/events">
                <Calendar className="h-4 w-4" />
                Upcoming Events
              </Link>
            </Button>
          </div>
        </div>

         
      </div>
    </section>
  );
}
