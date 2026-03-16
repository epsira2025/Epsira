import { Target, Users, Globe, Lightbulb } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const objectives = [
  {
    icon: Target,
    title: 'Conferences & Workshops',
    description:
      'Organize conferences and workshops on research outputs pertaining to topical political and international relations issues.',
  },
  {
    icon: Users,
    title: 'Scholarly Publications',
    description:
      'Publish scientific research outputs of members and associates in peer-reviewed journals and disseminate the same.',
  },
  {
    icon: Globe,
    title: 'Collaboration & Networking',
    description:
      'Facilitate opportunities of collaboration among members and scholars across Ethiopia, Africa and beyond.',
  },
  {
    icon: Lightbulb,
    title: 'Civic Engagement',
    description:
      'Inform policy processes at the national, regional, continental and international level through research-based insights.',
  },
]

export function MissionSection() {
  return (
    <section className="border-y border-border bg-card py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-card-foreground sm:text-4xl">
            Our Mission & Objectives
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            EPSIRA aspires to be a leading platform for scholarly engagements
            among lecturers, researchers and students in the field.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2">
          {objectives.map((objective) => (
            <div
              key={objective.title}
              className="group relative rounded-2xl border border-border bg-background p-8 transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5"
            >
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-primary-foreground group-hover:rotate-3">
                <objective.icon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                {objective.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                {objective.description}
              </p>
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-primary transition-all duration-500 group-hover:w-full rounded-b-2xl" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
