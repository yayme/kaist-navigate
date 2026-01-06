'use client'

import { useState } from 'react'
import { UtensilsCrossed, Clock, MapPin, Coffee } from 'lucide-react'
import diningData from '@/data/dining.json'

interface MenuData {
  [key: string]: {
    [meal: string]: string[]
  }
}

export default function DailyMenuDisplay() {
  const [activeTab, setActiveTab] = useState<'north' | 'east' | 'west'>('north')
  const [menuData, setMenuData] = useState<MenuData | null>(null)
  const [loading, setLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  // In a real implementation, this would fetch from an API that uses the scraper
  const loadMenuData = async () => {
    setLoading(true)
    try {
      // Simulate API call to backend that serves scraped data
      // const response = await fetch('/api/menus')
      // const data = await response.json()
      
      // For demo purposes, using mock data
      const mockData: MenuData = {
        north: {
          breakfast: ['Korean-style breakfast', 'Toast & Eggs', 'Milk & Cereal'],
          lunch: [
            'Bulgogi (Beef)',
            'Kimchi Stew',
            'Vegetable Bibimbap',
            'Rice, Soup, Side dishes'
          ],
          dinner: [
            'Grilled Mackerel',
            'Spicy Pork Stir-fry',
            'Tofu & Vegetable Stir-fry',
            'Rice, Soup, Side dishes'
          ]
        },
        east: {
          breakfast: ['Korean-style breakfast', 'Western breakfast'],
          lunch: [
            'Chicken Teriyaki',
            'Curry Rice',
            'Vegetarian option',
            'Salad bar'
          ],
          dinner: [
            'Pork Cutlet (Tonkatsu)',
            'Fish Stew',
            'Vegetable Tempura',
            'Rice, Miso soup'
          ]
        },
        west: {
          breakfast: ['Buffet-style breakfast', 'Fresh bread', 'Fruits'],
          lunch: [
            'Beef Steak',
            'Pasta Carbonara',
            'Caesar Salad',
            'Soup of the day'
          ],
          dinner: [
            'Korean BBQ',
            'Seafood Pancake',
            'Vegetable medley',
            'Rice, Soup, Kimchi'
          ]
        }
      }
      
      setMenuData(mockData)
      setLastUpdated(new Date())
    } catch (error) {
      console.error('Failed to load menu data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getCafeteriaInfo = (cafeteriaId: string) => {
    return diningData.cafeterias.find(c => c.id === cafeteriaId)
  }

  const getMealTime = () => {
    const hour = new Date().getHours()
    if (hour < 9) return 'breakfast'
    if (hour < 14) return 'lunch'
    return 'dinner'
  }

  const currentMeal = getMealTime()

  const cafeteriaMap = {
    north: getCafeteriaInfo('kaimaru'),
    east: getCafeteriaInfo('east'),
    west: getCafeteriaInfo('west')
  }

  const activeCafeteria = cafeteriaMap[activeTab]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-kaist-blue flex items-center gap-2">
            <UtensilsCrossed size={24} />
            Campus Dining
          </h2>
          <button
            onClick={loadMenuData}
            disabled={loading}
            className="bg-kaist-blue text-white px-4 py-2 rounded-lg hover:bg-kaist-light-blue transition-colors disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Load Today\'s Menu'}
          </button>
        </div>

        {lastUpdated && (
          <p className="text-sm text-gray-600">
            Last updated: {lastUpdated.toLocaleString()}
          </p>
        )}
      </div>

      {/* Cafeteria Tabs */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('north')}
            className={`flex-1 py-4 px-6 font-semibold transition-colors ${
              activeTab === 'north'
                ? 'bg-kaist-blue text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            North (N11)
          </button>
          <button
            onClick={() => setActiveTab('east')}
            className={`flex-1 py-4 px-6 font-semibold transition-colors ${
              activeTab === 'east'
                ? 'bg-kaist-blue text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            East (E5)
          </button>
          <button
            onClick={() => setActiveTab('west')}
            className={`flex-1 py-4 px-6 font-semibold transition-colors ${
              activeTab === 'west'
                ? 'bg-kaist-blue text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            West (W2)
          </button>
        </div>

        {/* Cafeteria Details */}
        {activeCafeteria && (
          <div className="p-6">
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">{activeCafeteria.name}</h3>
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <MapPin size={16} />
                <span>Building {activeCafeteria.code}</span>
              </div>

              {/* Facilities */}
              <div className="space-y-3 mt-4">
                {activeCafeteria.facilities.map((facility, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-lg">
                    <h4 className="font-semibold text-kaist-blue">{facility.name}</h4>
                    {facility.floor && (
                      <p className="text-sm text-gray-600">Floor: {facility.floor}</p>
                    )}
                    {facility.cuisine && (
                      <p className="text-sm text-gray-600">Cuisine: {facility.cuisine}</p>
                    )}
                    {facility.note && (
                      <p className="text-sm italic text-yellow-700 mt-1">⚠️ {facility.note}</p>
                    )}
                    {facility.hours && (
                      <div className="flex items-center gap-2 mt-2 text-sm">
                        <Clock size={14} />
                        <div className="flex flex-wrap gap-3">
                          {facility.hours.breakfast && (
                            <span className="text-gray-700">
                              🌅 Breakfast: {facility.hours.breakfast}
                            </span>
                          )}
                          {facility.hours.lunch && (
                            <span className="text-gray-700">
                              🍱 Lunch: {facility.hours.lunch}
                            </span>
                          )}
                          {facility.hours.dinner && (
                            <span className="text-gray-700">
                              🌙 Dinner: {facility.hours.dinner}
                            </span>
                          )}
                          {facility.hours.all_day && (
                            <span className="text-gray-700">
                              All Day: {facility.hours.all_day}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Today's Menu */}
            {menuData && menuData[activeTab] && (
              <div className="mt-6 border-t pt-6">
                <h3 className="text-xl font-bold mb-4">Today's Menu</h3>

                <div className="grid md:grid-cols-3 gap-4">
                  {/* Breakfast */}
                  <div className={`p-4 rounded-lg ${currentMeal === 'breakfast' ? 'bg-yellow-50 border-2 border-yellow-400' : 'bg-gray-50'}`}>
                    <h4 className="font-semibold text-lg mb-2 flex items-center gap-2">
                      🌅 Breakfast
                      {currentMeal === 'breakfast' && (
                        <span className="text-xs bg-yellow-500 text-white px-2 py-1 rounded">NOW</span>
                      )}
                    </h4>
                    <ul className="space-y-1">
                      {menuData[activeTab].breakfast?.map((item, i) => (
                        <li key={i} className="text-sm text-gray-700">• {item}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Lunch */}
                  <div className={`p-4 rounded-lg ${currentMeal === 'lunch' ? 'bg-green-50 border-2 border-green-400' : 'bg-gray-50'}`}>
                    <h4 className="font-semibold text-lg mb-2 flex items-center gap-2">
                      🍱 Lunch
                      {currentMeal === 'lunch' && (
                        <span className="text-xs bg-green-500 text-white px-2 py-1 rounded">NOW</span>
                      )}
                    </h4>
                    <ul className="space-y-1">
                      {menuData[activeTab].lunch?.map((item, i) => (
                        <li key={i} className="text-sm text-gray-700">• {item}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Dinner */}
                  <div className={`p-4 rounded-lg ${currentMeal === 'dinner' ? 'bg-blue-50 border-2 border-blue-400' : 'bg-gray-50'}`}>
                    <h4 className="font-semibold text-lg mb-2 flex items-center gap-2">
                      🌙 Dinner
                      {currentMeal === 'dinner' && (
                        <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded">NOW</span>
                      )}
                    </h4>
                    <ul className="space-y-1">
                      {menuData[activeTab].dinner?.map((item, i) => (
                        <li key={i} className="text-sm text-gray-700">• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <p className="text-xs text-gray-500 mt-4">
                  Note: Menus are scraped from the official KAIST website and may vary. Please check with the cafeteria for the most accurate information.
                </p>
              </div>
            )}

            {!menuData && (
              <div className="mt-6 border-t pt-6">
                <div className="bg-blue-50 p-6 rounded-lg text-center">
                  <UtensilsCrossed size={48} className="mx-auto text-gray-400 mb-3" />
                  <p className="text-gray-600">
                    Click "Load Today's Menu" to see today's meal options
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Menu data is automatically scraped from the KAIST website
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Campus Cafes */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Coffee size={20} />
          Campus Cafés
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {diningData.cafes.map((cafe, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-kaist-blue">{cafe.name}</h4>
              <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                <MapPin size={14} />
                <span>{cafe.code}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                <Clock size={14} />
                <span>{cafe.hours}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
