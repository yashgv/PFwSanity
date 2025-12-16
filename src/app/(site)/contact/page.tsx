import { client } from "@/sanity/lib/client"
import { contactQuery, siteSettingsQuery } from "@/sanity/lib/queries"
import { Button } from "@/components/ui/button"
import { Mail, Calendar, Github, Linkedin, Twitter, MessageSquare } from "lucide-react"
import Link from "next/link"

export default async function ContactPage() {
  const contact = await client.fetch(contactQuery)
  const siteSettings = await client.fetch(siteSettingsQuery)

  const email = contact?.email || siteSettings?.socialLinks?.email || "hello@yashvarma.in"

  return (
    <div className="min-h-screen py-20 px-6 bg-white">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 tracking-tight">
            {contact?.title}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
            {contact?.intro}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Get In Touch</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                I&apos;m always excited to work on new challenges. Whether you have a specific project in mind or just want to explore possibilities, let&apos;s start the conversation.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gray-100 rounded-lg">
                    <Mail className="h-4 w-4 text-gray-700" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">Email</div>
                    <div className="text-gray-600 text-sm">{email}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gray-100 rounded-lg">
                    <Calendar className="h-4 w-4 text-gray-700" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">Location</div>
                    <div className="text-gray-600 text-sm">Remote / Worldwide</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Connect</h3>
              <div className="flex space-x-3">
                {[
                  { icon: Github, href: siteSettings?.socialLinks?.github, label: "GitHub" },
                  { icon: Linkedin, href: siteSettings?.socialLinks?.linkedin, label: "LinkedIn" },
                  { icon: Twitter, href: siteSettings?.socialLinks?.twitter, label: "X" },
                  { icon: Mail, href: `mailto:${email}`, label: "Email" }
                ].filter(s => s.href).map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target={social.href.includes('http') ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-100 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-200 transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Contact</h3>
            <div className="space-y-4">
              <Button
                size="lg"
                className="w-full bg-gray-900 hover:bg-gray-800 text-white justify-center text-sm font-medium cursor-pointer"
                asChild
              >
                <a href={`mailto:${email}`}>
                  <Mail className="mr-2 h-4 w-4" />
                  Send an Email
                </a>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="w-full border-gray-300 text-gray-700 hover:bg-gray-100 justify-center text-sm font-medium cursor-pointer"
                asChild
              >
                {/* Calendly link - ideally from Sanity, hardcoding for now or need field */}
                <a href="https://calendly.com/yashvarma" target="_blank" rel="noopener noreferrer">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule a Call
                </a>
              </Button>

              <div className="text-center pt-4">
                <p className="text-xs text-gray-500 leading-relaxed">
                  Book a 30-minute discovery call to discuss your project requirements.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 bg-gray-50 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start?</h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Every great project starts with a conversation. Let&apos;s discuss your goals, explore possibilities, and create something extraordinary together.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href={`mailto:${email}`}>
              <Button size="lg" className="cursor-pointer bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 text-sm font-medium">
                Connect With Me
              </Button>
            </Link>
            <Link href="/work">
              <Button variant="outline" size="lg" className="cursor-pointer border-gray-300 text-gray-700 hover:bg-gray-100 px-6 py-3 text-sm font-medium">
                View My Work
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
