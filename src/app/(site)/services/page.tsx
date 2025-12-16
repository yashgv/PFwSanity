import { client } from "@/sanity/lib/client"
import { servicesQuery } from "@/sanity/lib/queries"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowRight } from "lucide-react"
import Link from 'next/link'

interface ServiceItem {
  title: string
  description: string
  features: string[]
  popular?: boolean
}

export default async function ServicesPage() {
  const services = await client.fetch(servicesQuery)

  return (
    <div className="min-h-screen py-20 px-6 bg-white">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 tracking-tight">
            Our Services
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
            Comprehensive solutions for your digital needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services?.map((service: ServiceItem, i: number) => (
            <div key={i} className={`relative bg-white rounded-xl border p-6 flex flex-col ${service.popular ? 'border-gray-900 shadow-sm' : 'border-gray-200'
              }`}>
              {service.popular && (
                <Badge className="absolute -top-2 left-4 bg-gray-900 text-white text-xs px-2 py-1">
                  Most Popular
                </Badge>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{service.description}</p>
              </div>

              <ul className="space-y-3 mb-8 flex-grow">
                {service.features?.map((feature: string, j: number) => (
                  <li key={j} className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href="/contact">
                <Button className={`cursor-pointer flex items-center w-full text-sm font-medium ${service.popular
                  ? 'bg-gray-900 hover:bg-gray-800 text-white'
                  : 'border border-gray-300 bg-white text-gray-900 hover:bg-gray-50'
                  }`}>
                  Get Started
                  <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
              </Link>

            </div>
          ))}
        </div>
      </div>
    </div>
  )
}