import { client } from "@/sanity/lib/client"

export const revalidate = 60;

import { workQuery } from "@/sanity/lib/queries"
import { urlFor as urlForImage } from '@/sanity/lib/image'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import Link from 'next/link'
import Image from 'next/image'

interface ProjectItem {
  title: string
  category: string
  description: string
  technologies: string[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image?: any
  link?: string
  githubLink?: string
}

export default async function WorkPage() {
  const projects = await client.fetch(workQuery)

  return (
    <div className="min-h-screen py-20 px-6 bg-white">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 tracking-tight">
            Selected Work
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
            A collection of projects specifically crafted to solve real-world problems.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects?.map((project: ProjectItem, i: number) => (
            <div key={i} className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden transform hover:scale-105 transition-transform duration-300 flex flex-col h-full">
              {project.image && (
                <div className="w-full h-48 overflow-hidden relative">
                  <Image
                    src={urlForImage(project.image).url()}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-3 mb-4">
                  <Badge className="bg-gray-900 text-white text-xs px-2 py-1">
                    {project.category}
                  </Badge>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {project.title}
                </h3>

                <p className="text-gray-700 mb-6 leading-relaxed text-sm flex-grow">
                  {project.description}
                </p>

                <div className="flex flex-col justify-between items-start gap-4">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies?.map((tech: string, j: number) => (
                      <span
                        key={j}
                        className="text-xs px-2 py-1 bg-white text-gray-700 rounded-md font-medium border border-gray-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3 mt-4">
                    {project.link && (
                      <Link target="_blank" href={project.link}>
                        <Button size="sm" className="bg-gray-900 hover:bg-gray-800 text-white text-xs font-medium px-4 py-2 cursor-pointer">
                          <ExternalLink className="h-3 w-3 mr-2" />
                          View Live
                        </Button>
                      </Link>
                    )}
                    {project.githubLink && (
                      <Link target="_blank" href={project.githubLink}>
                        <Button variant="outline" size="sm" className="text-xs font-medium px-4 py-2 border-gray-300 cursor-pointer">
                          <Github className="h-3 w-3 mr-2" />
                          Code
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
