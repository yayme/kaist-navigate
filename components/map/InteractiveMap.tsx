'use client'

import { useState } from 'react'
import { Search, MapPin, Phone, Building2 } from 'lucide-react'
import campusData from '@/data/campus.json'

interface Building {
  code: string
  name: string
  category: string
  facilities: string[]
  coordinates: { lat: number; lng: number }
  searchKeywords: string[]
}

export default function InteractiveMap() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null)
  const [filteredBuildings, setFilteredBuildings] = useState<Building[]>([])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    
    if (query.trim() === '') {
      setFilteredBuildings([])
      return
    }

    const lowercaseQuery = query.toLowerCase()
    const results = campusData.buildings.filter((building) => {
      return (
        building.name.toLowerCase().includes(lowercaseQuery) ||
        building.code.toLowerCase().includes(lowercaseQuery) ||
        building.category.toLowerCase().includes(lowercaseQuery) ||
        building.facilities.some(f => f.toLowerCase().includes(lowercaseQuery)) ||
        building.searchKeywords.some(k => k.toLowerCase().includes(lowercaseQuery))
      )
    })

    setFilteredBuildings(results)
  }

  const categories = [
    { name: 'All', value: 'all' },
    { name: 'Dining', value: 'Dining' },
    { name: 'Services', value: 'Services' },
    { name: 'Medical', value: 'Medical' },
    { name: 'Academic', value: 'Academic' },
    { name: 'Administration', value: 'Administration' }
  ]

  const [activeCategory, setActiveCategory] = useState('all')

  const displayBuildings = searchQuery.trim() !== '' 
    ? filteredBuildings 
    : activeCategory === 'all'
    ? campusData.buildings
    : campusData.buildings.filter(b => b.category === activeCategory)

  return (
    <div className="space-y-6">
      {/* Header & Search */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-kaist-blue mb-4 flex items-center gap-2">
          <MapPin size={24} />
          Campus Map & Building Finder
        </h2>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search for buildings, facilities (e.g., 'Bank', 'Clinic', 'W2')..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-kaist-blue focus:outline-none"
          />
        </div>

        {searchQuery && filteredBuildings.length > 0 && (
          <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800">
              Found <strong>{filteredBuildings.length}</strong> result{filteredBuildings.length !== 1 ? 's' : ''} for "{searchQuery}"
            </p>
          </div>
        )}

        {searchQuery && filteredBuildings.length === 0 && (
          <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              No results found for "{searchQuery}". Try different keywords like "bank", "clinic", or building codes like "W2".
            </p>
          </div>
        )}
      </div>

      {/* Category Filter */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => {
                setActiveCategory(cat.value)
                setSearchQuery('')
                setFilteredBuildings([])
              }}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                activeCategory === cat.value
                  ? 'bg-kaist-blue text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Buildings Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayBuildings.map((building) => (
          <div
            key={building.code}
            onClick={() => setSelectedBuilding(building)}
            className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-kaist-blue"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-bold text-lg text-kaist-blue">{building.code}</h3>
                <p className="text-sm text-gray-500">{building.category}</p>
              </div>
              <Building2 className="text-kaist-blue" size={24} />
            </div>

            <h4 className="font-semibold text-gray-800 mb-2">{building.name}</h4>

            <div className="space-y-1">
              {building.facilities.slice(0, 3).map((facility, index) => (
                <p key={index} className="text-sm text-gray-600 flex items-start gap-2">
                  <span className="text-kaist-blue mt-1">•</span>
                  <span>{facility}</span>
                </p>
              ))}
              {building.facilities.length > 3 && (
                <p className="text-sm text-gray-500 italic">
                  +{building.facilities.length - 3} more...
                </p>
              )}
            </div>

            <button className="mt-3 text-sm text-kaist-blue hover:underline font-semibold">
              View Details →
            </button>
          </div>
        ))}
      </div>

      {/* Selected Building Modal */}
      {selectedBuilding && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-kaist-blue">{selectedBuilding.code}</h2>
                  <p className="text-gray-600">{selectedBuilding.name}</p>
                  <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {selectedBuilding.category}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedBuilding(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Facilities & Services</h3>
                  <ul className="space-y-2">
                    {selectedBuilding.facilities.map((facility, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-kaist-blue mt-1">✓</span>
                        <span className="text-gray-700">{facility}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin size={18} className="text-kaist-blue" />
                    <span className="font-semibold">Location</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Coordinates: {selectedBuilding.coordinates.lat}, {selectedBuilding.coordinates.lng}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Building Code: <strong>{selectedBuilding.code}</strong>
                  </p>
                </div>

                <button
                  onClick={() => setSelectedBuilding(null)}
                  className="w-full bg-kaist-blue text-white py-3 rounded-lg hover:bg-kaist-light-blue transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Emergency Contacts */}
      <div className="bg-red-50 border-2 border-red-200 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center gap-2">
          <Phone size={20} />
          Emergency Contacts
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          {campusData.emergencyContacts.map((contact, index) => (
            <div key={index} className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-red-800">{contact.name}</h4>
              <a
                href={`tel:${contact.phone}`}
                className="text-2xl font-bold text-red-600 hover:underline"
              >
                {contact.phone}
              </a>
              {contact.location && (
                <p className="text-sm text-gray-600 mt-1">Location: {contact.location}</p>
              )}
              {contact.available && (
                <p className="text-sm text-gray-600">Available: {contact.available}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4">Interactive Campus Map</h3>
        <div className="bg-gray-100 h-96 rounded-lg flex items-center justify-center">
          <div className="text-center text-gray-500">
            <MapPin size={48} className="mx-auto mb-3" />
            <p className="font-semibold">Interactive Map Coming Soon</p>
            <p className="text-sm mt-2">
              Integration with Google Maps or custom SVG map would go here
            </p>
            <a
              href="https://www.kaist.ac.kr/en/html/campus/050101.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 px-4 py-2 bg-kaist-blue text-white rounded-lg hover:bg-kaist-light-blue"
            >
              View Official KAIST Map
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
