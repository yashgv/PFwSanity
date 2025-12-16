import type { Metadata } from 'next'
import './globals.css'
import { Poppins } from 'next/font/google'


const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://yashvarma.in'),
  title: 'Yash Varma - Full Stack & AI Engineer',
  description: 'The official portfolio for Yash Varma, a full-stack AI engineer specializing in building intelligent applications. Explore projects, skills, and experience.',
  keywords: ['Yash Varma', 'Yash', 'Varma', 'yashvarma', 'yashhvarma_', 'yashhvarma__', 'yashvarma_in', 'yashvarma.in', 'yashgv', 'full stack developer', 'AI engineer', 'machine learning engineer', 'software engineer', 'portfolio', 'projects'],
  creator: 'Yash Varma',
  authors: [{ name: 'Yash Varma', url: 'https://yashvarma.in' }],
  openGraph: {
    title: 'Yash Varma - Full Stack & AI Engineer',
    description: 'The official portfolio for Yash Varma, a full-stack & AI engineer specializing in building intelligent applications. Explore projects, skills, and experience.',
    url: 'https://yashvarma.in',
    siteName: 'Yash Varma Portfolio',
    images: [
      {
        url: '/YVLogo.svg',
        width: 1200,
        height: 630,
        alt: 'Yash Varma - Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yash Varma - Full Stack & AI Engineer',
    description: 'The official portfolio for Yash Varma, a full-stack AI engineer specializing in building intelligent applications. Explore projects, skills, and experience.',
    creator: '@yashvarma_in',
    images: ['/YVLogo.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    shortcut: '/YVLogo.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Yash Varma",
              "url": "https://yashvarma.in",
              "sameAs": [
                "https://github.com/yashgv",
                "https://linkedin.com/in/yashvarma-in",
                "https://x.com/yashvarma_in"
              ],
              "jobTitle": "Full Stack & AI Engineer",
              "worksFor": {
                "@type": "Organization",
                "name": "Yash Varma"
              }
            })
          }}
        />
      </head>
      <body className={`${poppins.className} min-h-screen bg-white text-gray-900 antialiased`}>
        {children}
      </body>
    </html>
  )
}