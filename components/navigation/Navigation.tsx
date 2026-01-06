'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, UtensilsCrossed, Bus, Map, BookOpen } from 'lucide-react'

export default function Navigation() {
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/dining', label: 'Dining', icon: UtensilsCrossed },
    { href: '/transport', label: 'Transport', icon: Bus },
    { href: '/map', label: 'Campus Map', icon: Map },
    { href: '/guide', label: 'Newcomer Guide', icon: BookOpen },
  ]

  return (
    <nav className="bg-kaist-blue text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold flex items-center gap-2">
            <span className="text-2xl">🎓</span>
            KAIST Companion
          </Link>

          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                    isActive
                      ? 'bg-white text-kaist-blue'
                      : 'hover:bg-kaist-light-blue'
                  }`}
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              )
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden pb-4">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-4 py-2 rounded-lg flex items-center gap-2 mb-1 ${
                  isActive
                    ? 'bg-white text-kaist-blue'
                    : 'hover:bg-kaist-light-blue'
                }`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
