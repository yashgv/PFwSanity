import { client } from "@/sanity/lib/client"
import { homeQuery } from "@/sanity/lib/queries"
import Hero from "@/components/Hero"

export default async function HomePage() {
  const homeData = await client.fetch(homeQuery)

  return <Hero data={homeData} />
}
