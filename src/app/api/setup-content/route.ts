import { NextResponse } from "next/server";
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, useCdn } from "@/sanity/env";
import path from "path";
import fs from "fs";
import { siteConfig, navigation } from "@/lib/constants/config";
import { homeContent } from "@/lib/constants/pages/home";
import { aboutContent } from "@/lib/constants/pages/about";
import { servicesContent } from "@/lib/constants/pages/services";
import { workContent as projectsContent } from "@/lib/constants/pages/work";
import { workContent as experienceContent } from "@/lib/constants/pages/experience";
import { achievementsContent } from "@/lib/constants/pages/achievements";
import { contactContent } from "@/lib/constants/pages/contact";

export async function GET() {
    const token = process.env.SANITY_API_TOKEN;

    if (!token) {
        return NextResponse.json({ error: "Missing SANITY_API_TOKEN" }, { status: 500 });
    }

    const client = createClient({
        projectId,
        dataset,
        apiVersion,
        useCdn,
        token,
    });



    // Helper to upload image
    const uploadImage = async (imagePath: string) => {
        try {
            const filePath = path.join(process.cwd(), 'public', imagePath);
            if (!fs.existsSync(filePath)) {
                console.warn(`Image not found: ${filePath}`);
                return null;
            }
            const fileStream = fs.createReadStream(filePath);
            const asset = await client.assets.upload('image', fileStream, {
                filename: path.basename(imagePath)
            });
            return asset._id;
        } catch (error) {
            console.error(`Failed to upload image ${imagePath}:`, error);
            return null;
        }
    };

    try {
        const transaction = client.transaction();

        // 1. Site Settings
        transaction.createOrReplace({
            _id: "siteSettings",
            _type: "siteSettings",
            title: siteConfig.name,
            // logo: needs image upload, skipping for now or placeholder
            navItems: navigation.map(item => ({
                _key: item.title,
                title: item.title,
                href: item.href
            })),
            footerText: `© ${new Date().getFullYear()} ${siteConfig.name} • Crafting intelligent solutions`,
            socialLinks: {
                github: siteConfig.links.github,
                linkedin: siteConfig.links.linkedin,
                // twitter: siteConfig.links.instagram, 
                email: "hello@yashvarma.in"
            }
        });

        // 2. Home Page
        transaction.createOrReplace({
            _id: "home",
            _type: "home",
            title: homeContent.hero.title,
            subtitle: homeContent.hero.subtitle,
            description: homeContent.hero.description,
            primaryCta: homeContent.hero.cta.primary,
            secondaryCta: homeContent.hero.cta.secondary
        });

        // 3. About Page
        transaction.createOrReplace({
            _id: "about",
            _type: "about",
            title: aboutContent.title,
            description: [
                {
                    _type: 'block',
                    _key: 'def',
                    children: [
                        { _type: 'span', _key: 'span1', text: aboutContent.description }
                    ],
                    markDefs: [],
                    style: 'normal'
                },
                ...aboutContent.experience.map((exp, i) => ({
                    _type: 'block',
                    _key: `exp-${i}`,
                    children: [
                        { _type: 'span', _key: `span-${i}`, text: exp.description }
                    ],
                    markDefs: [],
                    style: 'normal'
                }))
            ]
        });

        // 4. Contact Page
        transaction.createOrReplace({
            _id: "contact",
            _type: "contact",
            title: contactContent.title,
            intro: contactContent.description,
            email: contactContent.email
        })

        // 5. Services (Collection)
        // First delete existing to avoid dupes if running multiple times? Or just create
        // Better to query and delete or just rely on manual cleanup if dupes.
        // Let's use deterministic IDs if possible, or just create.
        // For simplicity, we'll create new ones. User can delete via Studio.
        // Actually, let's delete all 'service' types first.
        await client.delete({ query: '*[_type == "service"]' });
        await client.delete({ query: '*[_type == "project"]' });
        await client.delete({ query: '*[_type == "experience"]' });
        await client.delete({ query: '*[_type == "achievement"]' });

        servicesContent.services.forEach((service) => {
            transaction.create({
                _type: 'service',
                title: service.title,
                description: service.description,
                // icon: service.icon (React component, cannot migrate directly. String name?)
                features: service.features,
                popular: service.popular
            })
        });

        // 6. Projects
        projectsContent.projects.forEach((project) => {
            transaction.create({
                _type: 'project',
                title: project.title,
                description: project.description,
                category: project.category,
                technologies: project.technologies,
                link: project.live_link !== "#" ? project.live_link : undefined,
                githubLink: project.code_link !== "#" ? project.code_link : undefined,
            })
        });

        // 7. Experience
        experienceContent.experience.forEach((exp, i) => {
            transaction.create({
                _type: 'experience',
                title: exp.title,
                company: exp.company,
                location: exp.location,
                description: exp.description,
                technologies: exp.technologies,
                order: i,
                current: exp.duration.includes('Present'),
                // parsing dates roughly? "2023 - Present"
                // Let's leave dates empty for manual fill or try to parse if simple year
            })
        });

        // 8. Achievements
        for (const pub of achievementsContent.publications) {
            let imageAssetId = null;
            if (pub.image) {
                imageAssetId = await uploadImage(pub.image);
            }

            transaction.create({
                _type: 'achievement',
                title: pub.title,
                category: 'publication',
                description: `Published in ${pub.platform} (${pub.year})`,
                image: imageAssetId ? {
                    _type: 'image',
                    asset: {
                        _type: 'reference',
                        _ref: imageAssetId
                    }
                } : undefined
                // date: 
            })
        }

        for (const section of achievementsContent.achievements) {
            for (const item of section.items) {
                let imageAssetId = null;
                if (item.image) {
                    imageAssetId = await uploadImage(item.image);
                }

                transaction.create({
                    _type: 'achievement',
                    title: item.name,
                    category: section.title.includes('Hackathon') ? 'hackathon' :
                        section.title.includes('Academic') ? 'academic' :
                            section.title.includes('Leadership') ? 'leadership' : 'other',
                    description: item.description,
                    image: imageAssetId ? {
                        _type: 'image',
                        asset: {
                            _type: 'reference',
                            _ref: imageAssetId
                        }
                    } : undefined
                    // date: item.year ...
                })
            }
        }

        await transaction.commit();

        return NextResponse.json({ success: true, message: "Content migrated successfully!" });
    } catch (error) {
        console.error("Migration error:", error);
        return NextResponse.json({ error: error instanceof Error ? error.message : String(error) }, { status: 500 });
    }
}
