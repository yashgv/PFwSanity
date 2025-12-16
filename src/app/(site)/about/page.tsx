import { client } from "@/sanity/lib/client"
import { aboutQuery, servicesQuery } from "@/sanity/lib/queries"
import { PortableText } from "next-sanity"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Icon from "@/components/ui/icon"

export default async function AboutPage() {
  const aboutData = await client.fetch(aboutQuery);
  const servicesData = await client.fetch(servicesQuery);

  return (
    <div className="min-h-screen py-20 px-6 bg-white">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 tracking-tight">
            {aboutData?.title}
          </h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <div className="text-base leading-relaxed space-y-6 text-gray-600 prose prose-lg">
              {aboutData?.description && <PortableText value={aboutData.description} />}
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="/YashVarma.pdf" target="_blank" rel="noopener noreferrer">
                <Button size="lg">
                  View Resume
                </Button>
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            {servicesData?.slice(0, 2).map((service: any, i: number) => (
              <div key={i} className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-gray-900 p-3 rounded-lg">
                    {/* Fallback icon or dynamic icon */}
                    <Icon name={service.icon || 'Code'} className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}