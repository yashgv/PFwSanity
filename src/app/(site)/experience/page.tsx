import { client } from "@/sanity/lib/client"
import { experienceQuery } from "@/sanity/lib/queries"
import { Badge } from "@/components/ui/badge"



function getDuration(start: string, end: string, current: boolean) {
  const startDate = new Date(start).toLocaleDateString("en-US", { year: 'numeric', month: 'short' })
  const endDate = current ? 'Present' : new Date(end).toLocaleDateString("en-US", { year: 'numeric', month: 'short' })
  return `${startDate} - ${endDate}`
}

interface ExperienceItem {
  title: string
  company: string
  duration: string
  location: string
  description: string
  technologies: string[]
  startDate: string
  endDate: string
  current: boolean
}

export default async function ExperiencePage() {
  const experience = await client.fetch(experienceQuery)

  return (
    <div className="min-h-screen py-20 px-6 bg-white">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 tracking-tight">
            Experience
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
            My professional journey and career milestones.
          </p>
        </div>

        <div className="space-y-8">
          {experience?.map((exp: ExperienceItem, i: number) => (
            <div key={i} className="bg-gray-50 border border-gray-200 rounded-xl p-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{exp.title}</h3>
                  <p className="text-lg font-semibold text-gray-700">{exp.company}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">
                    {getDuration(exp.startDate, exp.endDate, exp.current)}
                  </p>
                  <p className="text-sm text-gray-600">{exp.location}</p>
                </div>
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                {exp.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {exp.technologies?.map((tech: string, j: number) => (
                  <Badge key={j} variant="outline">{tech}</Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}