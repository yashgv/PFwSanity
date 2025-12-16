
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Chat from "@/components/Chat"
import { client } from "@/sanity/lib/client"
import { siteSettingsQuery } from "@/sanity/lib/queries"

export default async function SiteLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const siteSettings = await client.fetch(siteSettingsQuery)

    return (
        <>
            <Navigation logo={siteSettings?.logo} navItems={siteSettings?.navItems} />
            <main className="pt-15">
                {children}
            </main>
            <Chat />
            <Footer footerText={siteSettings?.footerText} socialLinks={siteSettings?.socialLinks} />
        </>
    )
}