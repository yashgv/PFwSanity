'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { urlFor as urlForImage } from '@/sanity/lib/image'

interface NavItem {
  title: string
  href: string
}

interface NavigationProps {
  logo?: any // Sanity Image type
  navItems?: NavItem[]
}

export default function Navigation({ logo, navItems = [] }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  // Fallback if no navItems provided (e.g. before migration or load)
  // Or just use empty array if prefer dynamic only. 
  // Let's rely on props.
  const navigationItems = navItems.length > 0 ? navItems.map(item => ({ name: item.title, path: item.href })) : []

  const logoSrc = logo ? urlForImage(logo).width(64).height(64).url() : '/YVLogo.svg'

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="w-[90vw] md:w-fit bg-white/90 backdrop-blur-xl border border-gray-200 shadow-xl rounded-2xl px-8 py-4">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link key={"logo"} href="/" className="w-fit">
            <img src={logoSrc} alt="Logo" className="w-8 h-8 rounded-full object-cover" />
          </Link>
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`text-sm font-medium transition-colors ${pathname === item.path
                ? `text-gray-900 after:content-[''] after:block after:ml-[20%] after:w-[80%] after:h-0.5 after:bg-gray-900 after:rounded-full`
                : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center justify-between w-full">
          <Link href="/" className="font-bold text-xl text-gray-900">
            <img src={logoSrc} alt="Logo" className="w-8 h-8 rounded-full object-cover" />
          </Link>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-gray-600 hover:text-gray-900"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-18 left-0 right-0 bg-white/95 backdrop-blur-xl border border-gray-200 rounded-xl p-4 shadow-xl">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block py-3 px-4 text-sm font-medium rounded-lg transition-colors ${pathname === item.path
                  ? 'text-gray-900 bg-gray-100'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
