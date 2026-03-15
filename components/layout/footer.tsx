import Link from 'next/link'
import Image from 'next/image'
import { Mail, MapPin } from 'lucide-react'

const footerLinks = {
  organization: [
    { name: 'About Us', href: '/about' },
    { name: 'Membership', href: '/about#membership' },
    { name: 'Contact', href: '/contact' },
  ],
  resources: [
    { name: 'Journals', href: '/journals' },
    { name: 'Events', href: '/events' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/Logo EPSIRA .png"
                alt="EPSIRA Logo"
                width={240}
                height={90}
                className="h-16 w-auto"
              />
            </Link>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              Advancing political science and international relations research
              in Ethiopia through academic publications, scholarly events, and
              collaborative research initiatives.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              Organization
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.organization.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Resources</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>solnmg45@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Addis Ababa, Ethiopia</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            {new Date().getFullYear()} Ethiopian Political Science and
            International Relations Association. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
