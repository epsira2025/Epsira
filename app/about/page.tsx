import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import {
  Target,
  Eye,
  BookOpen,
  Users,
  Globe,
  Award,
  GraduationCap,
  Lightbulb,
  Heart,
  Handshake,
  Shield,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const programs = [
  {
    title: 'Scholarly Conferences & Workshops',
    description:
      'Conduct scholarly conferences or workshops towards the end of the academic year, and annual meeting towards the end of the budget year per the Ethiopian Calendar.',
  },
  {
    title: 'Peer-Reviewed Publications',
    description:
      'Publish peer-reviewed bi-annual scholarly Journal, and occasional newsletters to disseminate research outputs.',
  },
  {
    title: 'Training & Mentorship',
    description:
      'Provide training in selected areas and topical issues of the discipline, and mentorship services for students and emerging scholars.',
  },
  {
    title: 'Curriculum Development',
    description:
      'Carry out activities in support of curriculum development and reviews at universities, colleges or departments hosting the relevant programs in Ethiopia.',
  },
  {
    title: 'Professional Collaboration',
    description:
      'Engage in activities of collaboration with professional associations in Ethiopia, and similar scholarly bodies in Africa and worldwide.',
  },
  {
    title: 'Civic Engagement',
    description:
      'Promote community and civic engagement of its members and students through outreach activities and public discourse.',
  },
]

const values = [
  {
    icon: Award,
    title: 'Commitment to Excellence',
    description:
      'Adherence to highest ethical standards and striving to support members in their scholarly and career development.',
  },
  {
    icon: Handshake,
    title: 'Teamwork & Collaboration',
    description:
      'Trust, responsibility, professionalism, teamwork and collaboration guide relationships among members and associates.',
  },
  {
    icon: Shield,
    title: 'Non-Discrimination',
    description:
      'The Association fosters equality and respect, emphasizing support for female members, women and young female students.',
  },
  {
    icon: Heart,
    title: 'Professionalism',
    description:
      'The Bylaws, Publications and other guidelines provide the necessary framework for ethics and professionalism.',
  },
]

const membershipBenefits = [
  {
    icon: Globe,
    title: 'Research Collaborations',
    description:
      'Opportunities for research collaborations among scholars based at different universities and research institutes across Ethiopia, Africa and beyond.',
  },
  {
    icon: GraduationCap,
    title: 'Professional Development',
    description:
      'Training opportunities for members, support for students at various levels through need-based training and mentorship activities.',
  },
  {
    icon: BookOpen,
    title: 'Publication Platforms',
    description:
      'Publication platforms for members who aim to publish their research outputs in the Journal and newsletters.',
  },
  {
    icon: Users,
    title: 'Member Directory',
    description:
      'Directory of members for facilitating interactions within the community, sharing relevant news, updates and opportunities.',
  },
]

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b border-border bg-gradient-to-b from-primary/5 via-background to-background py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                About EPSIRA
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                The Ethiopian Political Science and International Relations
                Association (EPSIRA) strengthens and fosters the study of
                political science and international relations in Ethiopia,
                supports and promotes research in the field, fosters
                collaboration among scholars and practitioners, and promotes
                civic and community engagement of its members.
              </p>
            </div>
          </div>
        </section>

        {/* Purpose & Mission Section */}
        <section id="mission" className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-2">
              <Card className="border-border bg-card">
                <CardContent className="p-8">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Target className="h-6 w-6" />
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-card-foreground">
                    Our Purpose
                  </h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    The purpose of EPSIRA is to strengthen and foster the study
                    of political science and international relations in
                    Ethiopia, support and promote research in the field, foster
                    collaboration among scholars and practitioners, and promote
                    civic and community engagement of its members.
                  </p>
                  <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                      Organize conferences, workshops on research outputs
                      pertaining to topical political and international
                      relations issues
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                      Publish scientific research outputs in peer-reviewed
                      journals
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                      Provide mentorship and professional development training
                      for young, emerging scholars
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                      Inform policy processes at national, regional, continental
                      and international levels
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardContent className="p-8">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <Eye className="h-6 w-6" />
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-card-foreground">
                    Our Vision
                  </h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    EPSIRA aspires to be a leading platform for scholarly
                    engagements among lecturers, researchers and students in the
                    field, contribute to debates on research based
                    policy-oriented national, regional and international
                    political affairs.
                  </p>
                  <div className="mt-6 rounded-lg bg-secondary/50 p-4">
                    <p className="text-sm italic text-muted-foreground">
                      &quot;A leading platform for scholarly engagements,
                      contributing to research-based policy debates at national,
                      regional and international levels.&quot;
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Background History Section */}
        <section className="border-y border-border bg-secondary/30 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Our History
              </h2>
              <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
                <p>
                  Attempts to establish a scholarly community of political
                  science association in Ethiopia spans a few decades. Few
                  scholars and students at the Department of Political Science
                  and International Relations, Addis Ababa University took the
                  first steps, and have over the years engaged in efforts
                  towards the establishment of the Association.
                </p>
                <p>
                  The Association was established again in 2005 E.C, and
                  developing it into a fully functional platform was a challenge
                  due to the lack of clear understanding among its associates,
                  bureaucratic red tapes and delays as regards renewal of the
                  Association&apos;s certificate of registration, and the
                  Covid-19 Pandemic. Human and financial resources limitations
                  constrained the activities of the Association previously.
                </p>
                <p>
                  Through the efforts of its members and the support of the
                  associates, the commitment and determination of its leadership
                  promoting teamwork, the Association has carried out academic
                  workshops, conducted discussions and debates about the status
                  and the future of the Association, leading to the subsequent
                  articulation and clarification of its purposes which helped
                  the amendment of its Bylaws, and streamlined membership
                  following a recent and First Extraordinary Meeting of the
                  General Assembly. These actions and activities have
                  reinvigorated this emergent scholarly forum.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Founders & Members Section */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Our Founders & Members
              </h2>
              <p className="mt-4 text-muted-foreground">
                The dedicated scholars and academics who established and
                continue to lead EPSIRA in advancing political science and
                international relations in Ethiopia.
              </p>
            </div>

            <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="group overflow-hidden rounded-xl border border-border bg-card">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HuuLLPmn4ySmCVVRuI5s5Gln4xxdZv.png"
                    alt="EPSIRA founding members group photo taken outdoors"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-foreground">
                    Founding Members
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Early gathering of EPSIRA founders and members
                  </p>
                </div>
              </div>

              <div className="group overflow-hidden rounded-xl border border-border bg-card">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-MuHteWbe5abgmb7RwCaFyEfX5b9tXK.png"
                    alt="EPSIRA members at a formal meeting"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-foreground">
                    General Assembly Meeting
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Members at an official EPSIRA assembly
                  </p>
                </div>
              </div>

              <div className="group overflow-hidden rounded-xl border border-border bg-card md:col-span-2 lg:col-span-1">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-MnritzWPEkb6cUes7xhaSSiwqsmKmV.png"
                    alt="EPSIRA leaders at the Department of Political Science and International Relations"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-foreground">
                    Department Leadership
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Members at the Department of Political Science & IR
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Governance Section */}
        <section className="border-t border-border bg-secondary/30 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Governance Structure
              </h2>
              <p className="mt-4 text-muted-foreground">
                EPSIRA is governed by a structured framework ensuring
                transparency and member participation.
              </p>
            </div>

            <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-2">
              <Card className="border-border">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground">
                    General Assembly
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    The main governing body of EPSIRA, responsible for decisions
                    about rules and regulations, election of Executive Committee
                    members, holds annual meetings, reviews and approves
                    reports, budget, and audits. The General Assembly has
                    mandate on establishment of branch offices, amendment of
                    Bylaws, and provides guidance and oversight of policies and
                    programs.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-border">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground">
                    Executive Committee
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    With the leadership of the President of the Association, the
                    Executive Committee is responsible for the day to day
                    activities of EPSIRA. With the active participation of
                    members, organs such as the Editorial Board work in
                    coordination with the Executive Committee, authors, and
                    Advisory Board Members, internal and international.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Programs & Activities Section */}
        <section className="border-y border-border bg-secondary/30 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Programs & Activities
              </h2>
              <p className="mt-4 text-muted-foreground">
                EPSIRA engages in a wide range of academic and professional
                activities to advance political science and international
                relations.
              </p>
            </div>

            <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
              {programs.map((program) => (
                <div
                  key={program.title}
                  className="rounded-lg border border-border bg-card p-6"
                >
                  <h3 className="text-lg font-semibold text-foreground">
                    {program.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {program.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Membership Section */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Membership
              </h2>
              <p className="mt-4 text-muted-foreground">
                The Association offers full membership for academic scholars,
                researchers and students in the field of political science and
                international relations in Ethiopia. Associate, institutional
                and honorary membership categories are extended to potential
                applicants.
              </p>
            </div>

            <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2">
              {membershipBenefits.map((benefit) => (
                <Card
                  key={benefit.title}
                  className="group border-border transition-shadow hover:shadow-md"
                >
                  <CardContent className="p-6">
                    <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <benefit.icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-foreground">
                      {benefit.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="border-t border-border bg-secondary/30 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Our Values & Principles
              </h2>
              <p className="mt-4 text-muted-foreground">
                EPSIRA values commitment to excellence and adherence to highest
                ethical standards.
              </p>
            </div>

            <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2">
              {values.map((value) => (
                <Card
                  key={value.title}
                  className="group border-border transition-shadow hover:shadow-md"
                >
                  <CardContent className="p-6">
                    <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <value.icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-foreground">
                      {value.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Partnership Section */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Partnership & Collaboration
              </h2>
              <p className="mt-6 leading-relaxed text-muted-foreground">
                EPSIRA welcomes and works to engage in partnerships with
                scholarly associations such as the African Political Science
                Association, American Political Science Association and
                International Political Science Association. It will collaborate
                and engage in mutual institutional development experiences with
                professional and scholarly associations in Ethiopia. It actively
                encourages close collaboration in teaching, research and related
                scholarly engagements among its members based at institutions of
                higher learning in different parts of Ethiopia, regionally and
                internationally as well.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
