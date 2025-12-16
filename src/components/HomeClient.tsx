/* eslint-disable @next/next/no-img-element */
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface HomeContent {
    hero: {
        title: string
        subtitle: string
        description: string
        cta: {
            primary: {
                text: string
                href: string
            }
            secondary: {
                text: string
                href: string
            }
        }
    }
}

export default function HomeClient({ content }: { content: HomeContent }) {
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        setIsLoaded(true)
    }, [])

    return (
        <div className="mt-[-3.5rem] min-h-screen bg-white dark:bg-gray-900">
            <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/wordcloud.png"
                        alt="Word Cloud"
                        className="absolute inset-0 w-full h-full object-cover opacity-12 dark:opacity-10"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white to-transparent dark:via-gray-900"></div>
                </div>

                <div className={`relative z-10 text-center max-w-4xl mx-auto transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                    }`}>
                    <h1 className="text-6xl md:text-8xl font-black mb-4 text-gray-900 dark:text-white tracking-tight">
                        {content.hero.title}
                    </h1>

                    <p className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto font-light">
                        I am a <span className="font-semibold text-gray-900 dark:text-white">{content.hero.subtitle}</span>
                    </p>

                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">
                        {content.hero.description}
                    </p>

                    <div className="flex justify-center gap-4">
                        <Link href={content.hero.cta.primary.href}>
                            <Button size="lg" className="cursor-pointer bg-gray-900 hover:bg-gray-800 text-white font-semibold px-8 py-4">
                                {content.hero.cta.primary.text}
                            </Button>
                        </Link>
                        <Link href={content.hero.cta.secondary.href}>
                            <Button size="lg" variant="outline" className="cursor-pointer font-semibold px-8 py-4 border-gray-300">
                                {content.hero.cta.secondary.text}
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
