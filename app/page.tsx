import Link from 'next/link'
import { Bus, UtensilsCrossed, Map, BookOpen, Phone, AlertCircle, Clock } from 'lucide-react'

export default function Home() {
  const quickActions = [
    {
      title: 'Shuttle Tracker',
      description: 'Check next shuttle times',
      icon: Bus,
      href: '/transport',
      color: 'bg-blue-500'
    },
    {
      title: "Today's Menu",
      description: 'See what\'s for lunch',
      icon: UtensilsCrossed,
      href: '/dining',
      color: 'bg-green-500'
    },
    {
      title: 'Find Buildings',
      description: 'Search campus facilities',
      icon: Map,
      href: '/map',
      color: 'bg-purple-500'
    },
    {
      title: 'Newcomer Guide',
      description: 'Onboarding checklist',
      icon: BookOpen,
      href: '/guide',
      color: 'bg-orange-500'
    }
  ]

  const emergencyContacts = [
    { name: 'Campus Police', number: '042-350-4200', available: '24/7' },
    { name: 'Ambulance', number: '119', available: '24/7' },
    { name: 'KAIST Clinic', number: '042-350-1010', available: 'Weekdays 09:00-17:00' }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-kaist-blue to-kaist-light-blue text-white p-12 rounded-2xl shadow-lg mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to KAIST! 🎓
        </h1>
        <p className="text-xl md:text-2xl opacity-90 mb-6">
          Your Complete Campus Companion
        </p>
        <p className="text-lg opacity-80 max-w-2xl">
          Navigate campus with ease - Find buildings, check shuttle schedules, explore dining options, 
          and complete your onboarding checklist all in one place.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
          <Clock size={32} />
          Quick Actions
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <Link
                key={action.href}
                href={action.href}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 group"
              >
                <div className={`${action.color} w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {action.title}
                </h3>
                <p className="text-gray-600">
                  {action.description}
                </p>
                <div className="mt-4 text-kaist-blue font-semibold group-hover:translate-x-2 transition-transform inline-block">
                  Explore →
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Live Information Banner */}
      <div className="bg-yellow-50 border-2 border-yellow-300 p-6 rounded-xl mb-8">
        <div className="flex items-start gap-4">
          <AlertCircle size={32} className="text-yellow-600 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-bold text-yellow-900 mb-2">
              Real-Time Campus Information
            </h3>
            <p className="text-yellow-800 mb-3">
              This app provides live shuttle tracking and daily menu updates to help you plan your day at KAIST.
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="bg-white px-4 py-2 rounded-lg">
                <span className="font-semibold text-gray-700">🚌 Next OLEV:</span>
                <span className="ml-2 text-kaist-blue font-bold">Check Transport Tab</span>
              </div>
              <div className="bg-white px-4 py-2 rounded-lg">
                <span className="font-semibold text-gray-700">🍱 Today's Lunch:</span>
                <span className="ml-2 text-kaist-blue font-bold">Check Dining Tab</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="bg-red-50 border-2 border-red-300 p-6 rounded-xl mb-8">
        <h3 className="text-2xl font-bold text-red-800 mb-4 flex items-center gap-2">
          <Phone size={28} />
          Emergency Contacts
        </h3>

        <div className="grid md:grid-cols-3 gap-4">
          {emergencyContacts.map((contact, index) => (
            <div key={index} className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-1">{contact.name}</h4>
              <a
                href={`tel:${contact.number}`}
                className="text-2xl font-bold text-red-600 hover:underline block"
              >
                {contact.number}
              </a>
              <p className="text-sm text-gray-600 mt-1">{contact.available}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Key Locations */}
      <div className="bg-white p-8 rounded-xl shadow-md mb-8">
        <h3 className="text-2xl font-bold text-kaist-blue mb-6 flex items-center gap-2">
          <Map size={28} />
          Key Campus Locations
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: 'International Center (ISSS)', location: 'W2-1', service: 'Visa & Student Services' },
            { name: 'Woori Bank', location: 'W2', service: 'Banking Services' },
            { name: 'KAIST Clinic', location: 'E21', service: 'Medical & Pharmacy' },
            { name: 'Safety & Security', location: 'W8', service: 'ID Cards & Car Pass' },
            { name: 'General Store', location: 'N13', service: 'Shopping & Taxi Stand' },
            { name: 'Main Administration', location: 'E14', service: 'General Affairs' }
          ].map((loc, index) => (
            <div key={index} className="border-2 border-gray-200 p-4 rounded-lg hover:border-kaist-blue transition-colors">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-gray-800">{loc.name}</h4>
                <span className="bg-kaist-blue text-white px-3 py-1 rounded-full text-sm font-bold">
                  {loc.location}
                </span>
              </div>
              <p className="text-sm text-gray-600">{loc.service}</p>
            </div>
          ))}
        </div>

        <Link
          href="/map"
          className="mt-6 inline-block bg-kaist-blue text-white px-6 py-3 rounded-lg hover:bg-kaist-light-blue transition-colors font-semibold"
        >
          Explore Full Campus Map →
        </Link>
      </div>

      {/* Getting Started */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-xl shadow-md">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          🌟 New to KAIST?
        </h3>
        <p className="text-gray-700 mb-6 text-lg">
          Our comprehensive newcomer guide will help you complete all essential tasks, 
          from getting your ARC to opening a bank account.
        </p>
        <Link
          href="/guide"
          className="inline-block bg-gradient-to-r from-kaist-blue to-green-500 text-white px-8 py-4 rounded-lg hover:shadow-lg transition-all font-bold text-lg"
        >
          Start Your Onboarding Journey →
        </Link>
      </div>

      {/* Footer Info */}
      <div className="mt-12 text-center text-gray-600">
        <p className="text-sm">
          This companion app is designed to help KAIST newcomers and visitors navigate campus life with ease.
        </p>
        <p className="text-sm mt-2">
          Data is sourced from official KAIST resources and updated regularly.
        </p>
      </div>
    </div>
  )
}
