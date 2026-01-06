import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/navigation/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'KAIST Companion',
  description: 'Your guide to KAIST campus - Transportation, Dining, Maps & More',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="bg-kaist-blue text-white py-6 mt-12">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2026 KAIST Companion. Built for the KAIST Community.</p>
            <p className="text-sm mt-2">Emergency: Campus Police 042-350-4200 | Ambulance 119</p>
            <p className="text-sm mt-2 opacity-80">Developed by Adnan Sadik</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
