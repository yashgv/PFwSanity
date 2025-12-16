import { client } from "@/sanity/lib/client"
import { achievementsQuery } from "@/sanity/lib/queries"
import { urlFor as urlForImage } from '@/sanity/lib/image'
import { Award, Trophy, Medal, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { AdaptiveImage } from "@/components/ui/adaptive-image"

interface AchievementItem {
  title: string
  category: string
  description: string
  date: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image?: any
}

export default async function AchievementsPage() {
  const allAchievements = await client.fetch(achievementsQuery);

  const publications = allAchievements?.filter((item: AchievementItem) => item.category === 'publication');

  const categories = ['hackathon', 'academic', 'leadership', 'other'];
  const categoryTitles: Record<string, string> = {
    'hackathon': 'Hackathons & Competitions',
    'academic': 'Academic Honors',
    'leadership': 'Leadership & Co-curricular',
    'other': 'Other Achievements'
  };

  const groupedAchievements = categories.map(cat => ({
    key: cat,
    title: categoryTitles[cat],
    items: allAchievements?.filter((item: AchievementItem) => item.category === cat)
  })).filter(group => group.items?.length > 0);


  const getIcon = (category: string) => {
    switch (category) {
      case 'hackathon': return Trophy;
      case 'academic': return Award;
      case 'leadership': return Medal;
      default: return Star;
    }
  }

  return (
    <div className="min-h-screen py-20 px-6 bg-white">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 tracking-tight">
            Achievements
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
            Recognitions and milestones from my journey.
          </p>
        </div>

        {/* Publications Section */}
        {publications?.length > 0 && (
          <div className="mt-24">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 tracking-tight">Publications & Copyrights</h2>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {publications.map((pub: AchievementItem, i: number) => {
                const isFirstPublication = i === 0

                return (
                  <div
                    key={i}
                    className="group break-inside-avoid mb-6 block bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 
                        transition-all duration-300 hover:shadow-xl hover:border-gray-300 overflow-hidden"
                  >
                    {pub.image && (
                      <div className="overflow-hidden transform transition-transform duration-300 group-hover:scale-105">
                        <AdaptiveImage
                          src={urlForImage(pub.image).url()}
                          alt={pub.title}
                          priority={i === 0}
                        />
                      </div>
                    )}
                    <div className="p-6 space-y-3">
                      <h3 className={`font-bold text-gray-900 leading-tight transition-colors group-hover:text-gray-800 ${isFirstPublication ? 'text-xl' : 'text-lg'
                        }`}>
                        {pub.title}
                      </h3>
                      <div className="flex items-center gap-3 flex-wrap">
                        <Badge
                          variant="outline"
                          className={`group-hover:bg-white transition-colors ${isFirstPublication ? 'text-sm px-3 py-1' : 'text-xs'
                            }`}
                        >
                          Publication
                        </Badge>
                        <span className={`text-gray-600 font-medium ${isFirstPublication ? 'text-base' : 'text-sm'
                          }`}>
                          {pub.date ? new Date(pub.date).getFullYear() : ''}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Achievements Sections */}
        <div className="space-y-20 mt-8">
          {groupedAchievements.map((section, i) => (
            <div key={i}>
              <h2 className="text-3xl font-bold text-gray-900 mb-8 tracking-tight">{section.title}</h2>
              {/* Masonry layout using columns */}
              <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {section.items.map((item: AchievementItem, j: number) => {
                  const Icon = getIcon(item.category)
                  const isMainWinner = item.title.toLowerCase().includes('winner') || item.title.toLowerCase().includes('1st')

                  return (
                    <div
                      key={j}
                      className="group break-inside-avoid mb-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 transition-all duration-300 hover:shadow-xl hover:border-gray-300 overflow-hidden"
                    >
                      {item.image && (
                        <div className="overflow-hidden transform transition-transform duration-300 group-hover:scale-105">
                          <AdaptiveImage
                            src={urlForImage(item.image).url()}
                            alt={item.title}
                            priority={j < 3}
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <div className="flex items-start gap-4">
                          <div className={`p-3 bg-gradient-to-br from-gray-900 to-gray-700 rounded-lg shrink-0 transition-all duration-300 group-hover:from-gray-800 group-hover:to-gray-600 group-hover:scale-110 ${isMainWinner ? 'p-4' : ''
                            }`}>
                            <Icon className={`text-white ${isMainWinner ? 'h-6 w-6' : 'h-5 w-5'}`} />
                          </div>
                          <div className="flex-1">
                            <h3 className={`font-bold text-gray-900 mb-2 leading-tight ${isMainWinner ? 'text-xl' : 'text-lg'
                              }`}>
                              {item.title}
                            </h3>
                            {item.description && (
                              <p className={`text-gray-600 mb-3 ${isMainWinner ? 'text-base' : 'text-sm'
                                }`}>
                                {item.description}
                              </p>
                            )}
                            {item.date && (
                              <Badge
                                variant="outline"
                                className={`group-hover:bg-white transition-colors ${isMainWinner ? 'text-sm px-3 py-1' : 'text-xs'
                                  }`}
                              >
                                {new Date(item.date).getFullYear()}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
