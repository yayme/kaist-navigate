'use client'

import { useState, useEffect } from 'react'
import { Clock, MapPin, Info } from 'lucide-react'
import transportationData from '@/data/transportation.json'

interface ShuttleTime {
  route: string
  routeName: string
  nextDeparture: string
  minutesUntil: number
  currentStop?: string
  isOperating: boolean
}

export default function ShuttleTracker() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [shuttleTimes, setShuttleTimes] = useState<ShuttleTime[]>([])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    calculateNextShuttles()
  }, [currentTime])

  const calculateNextShuttles = () => {
    const now = currentTime
    const dayOfWeek = now.getDay() // 0 = Sunday, 1 = Monday, etc.
    const currentHour = now.getHours()
    const currentMinute = now.getMinutes()
    const currentTotalMinutes = currentHour * 60 + currentMinute

    const times: ShuttleTime[] = []

    // OLEV Shuttle (Weekdays only, 15-min intervals)
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      const olevPeriods = [
        { start: '08:45', end: '11:45' },
        { start: '13:15', end: '16:55' }
      ]

      for (const period of olevPeriods) {
        const [startHour, startMin] = period.start.split(':').map(Number)
        const [endHour, endMin] = period.end.split(':').map(Number)
        const startTotal = startHour * 60 + startMin
        const endTotal = endHour * 60 + endMin

        if (currentTotalMinutes >= startTotal && currentTotalMinutes <= endTotal) {
          // Find next departure (15-min interval)
          const minutesSinceStart = currentTotalMinutes - startTotal
          const nextInterval = Math.ceil(minutesSinceStart / 15) * 15
          const nextDepartureTotal = startTotal + nextInterval

          if (nextDepartureTotal <= endTotal) {
            const nextHour = Math.floor(nextDepartureTotal / 60)
            const nextMin = nextDepartureTotal % 60
            const minutesUntil = nextDepartureTotal - currentTotalMinutes

            times.push({
              route: 'olev',
              routeName: 'OLEV Shuttle',
              nextDeparture: `${String(nextHour).padStart(2, '0')}:${String(nextMin).padStart(2, '0')}`,
              minutesUntil,
              isOperating: true
            })
          }
          break
        }
      }

      if (!times.find(t => t.route === 'olev')) {
        times.push({
          route: 'olev',
          routeName: 'OLEV Shuttle',
          nextDeparture: 'Not Operating',
          minutesUntil: -1,
          isOperating: false
        })
      }
    } else {
      times.push({
        route: 'olev',
        routeName: 'OLEV Shuttle',
        nextDeparture: 'Weekdays Only',
        minutesUntil: -1,
        isOperating: false
      })
    }

    // Main-Munji-Hwaam Shuttle (Daily, fixed times)
    const munjiTimes = ['08:00', '09:00', '10:00', '12:00', '13:00', '14:00', '16:00', '17:00', '18:00', '20:00']
    let nextMunji = null

    for (const time of munjiTimes) {
      const [hour, min] = time.split(':').map(Number)
      const totalMin = hour * 60 + min

      if (totalMin > currentTotalMinutes) {
        const minutesUntil = totalMin - currentTotalMinutes
        nextMunji = {
          route: 'munji',
          routeName: 'Main-Munji-Hwaam',
          nextDeparture: time,
          minutesUntil,
          isOperating: true
        }
        break
      }
    }

    if (!nextMunji) {
      times.push({
        route: 'munji',
        routeName: 'Main-Munji-Hwaam',
        nextDeparture: 'Last bus departed',
        minutesUntil: -1,
        isOperating: false
      })
    } else {
      times.push(nextMunji)
    }

    // Wolpyeong Station Shuttle (Weekdays only)
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      const wolpyeongTimes = [
        { time: '07:50', dir: 'To Campus' },
        { time: '08:20', dir: 'To Campus' },
        { time: '09:00', dir: 'To Station' },
        { time: '12:00', dir: 'To Station' },
        { time: '13:00', dir: 'To Campus' },
        { time: '17:00', dir: 'To Station' },
        { time: '18:00', dir: 'To Station' }
      ]

      let nextWolpyeong = null

      for (const item of wolpyeongTimes) {
        const [hour, min] = item.time.split(':').map(Number)
        const totalMin = hour * 60 + min

        if (totalMin > currentTotalMinutes) {
          const minutesUntil = totalMin - currentTotalMinutes
          nextWolpyeong = {
            route: 'wolpyeong',
            routeName: `Wolpyeong (${item.dir})`,
            nextDeparture: item.time,
            minutesUntil,
            isOperating: true
          }
          break
        }
      }

      if (!nextWolpyeong) {
        times.push({
          route: 'wolpyeong',
          routeName: 'Wolpyeong Station',
          nextDeparture: 'Last bus departed',
          minutesUntil: -1,
          isOperating: false
        })
      } else {
        times.push(nextWolpyeong)
      }
    } else {
      times.push({
        route: 'wolpyeong',
        routeName: 'Wolpyeong Station',
        nextDeparture: 'Weekdays Only',
        minutesUntil: -1,
        isOperating: false
      })
    }

    setShuttleTimes(times)
  }

  const getStatusColor = (minutesUntil: number) => {
    if (minutesUntil < 0) return 'text-gray-400'
    if (minutesUntil <= 5) return 'text-red-500'
    if (minutesUntil <= 15) return 'text-yellow-500'
    return 'text-green-500'
  }

  const getUrgencyBadge = (minutesUntil: number) => {
    if (minutesUntil < 0) return null
    if (minutesUntil <= 5) return <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">LEAVING SOON!</span>
    if (minutesUntil <= 15) return <span className="bg-yellow-500 text-white px-2 py-1 rounded text-xs font-bold">Get Ready</span>
    return null
  }

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-kaist-blue flex items-center gap-2">
            <Clock size={24} />
            Live Shuttle Tracker
          </h2>
          <div className="text-sm text-gray-600">
            Current Time: <span className="font-mono font-bold">{currentTime.toLocaleTimeString()}</span>
          </div>
        </div>

        <div className="space-y-3">
          {shuttleTimes.map((shuttle) => (
            <div
              key={shuttle.route}
              className={`p-4 rounded-lg border-2 transition-all ${
                shuttle.isOperating && shuttle.minutesUntil <= 5
                  ? 'border-red-500 bg-red-50'
                  : shuttle.isOperating
                  ? 'border-blue-200 bg-blue-50'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{shuttle.routeName}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock size={16} className={getStatusColor(shuttle.minutesUntil)} />
                    <span className="text-sm text-gray-600">
                      Next: <span className="font-bold">{shuttle.nextDeparture}</span>
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  {shuttle.isOperating && shuttle.minutesUntil >= 0 ? (
                    <div>
                      <div className={`text-3xl font-bold ${getStatusColor(shuttle.minutesUntil)}`}>
                        {shuttle.minutesUntil}
                      </div>
                      <div className="text-sm text-gray-600">minutes</div>
                      {getUrgencyBadge(shuttle.minutesUntil)}
                    </div>
                  ) : (
                    <div className="text-gray-400 text-sm font-semibold">
                      {shuttle.nextDeparture}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Route Information */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
          <Info size={20} />
          Route Information
        </h3>

        <div className="space-y-4">
          {/* OLEV Route */}
          <div className="border-l-4 border-blue-500 pl-3">
            <h4 className="font-semibold text-kaist-blue">OLEV Shuttle</h4>
            <p className="text-sm text-gray-600 mt-1">
              <strong>Operating:</strong> Weekdays only
            </p>
            <p className="text-sm text-gray-600">
              <strong>Hours:</strong> 08:45-11:45 & 13:15-16:55 (Every 15 min)
            </p>
            <div className="flex items-start gap-2 mt-2">
              <MapPin size={14} className="mt-1 text-blue-500" />
              <p className="text-sm text-gray-700">
                N11 → N3 → E7 → E21 → E11 → Main Gate → Duck Pond → W8 → N11
              </p>
            </div>
          </div>

          {/* Munji Route */}
          <div className="border-l-4 border-green-500 pl-3">
            <h4 className="font-semibold text-green-700">Main-Munji-Hwaam Shuttle</h4>
            <p className="text-sm text-gray-600 mt-1">
              <strong>Operating:</strong> Daily
            </p>
            <p className="text-sm text-gray-600">
              <strong>Times:</strong> 08:00, 09:00, 10:00, 12:00, 13:00, 14:00, 16:00, 17:00, 18:00, 20:00
            </p>
            <div className="flex items-start gap-2 mt-2">
              <MapPin size={14} className="mt-1 text-green-500" />
              <p className="text-sm text-gray-700">
                E15 (Main Auditorium) → W8 → Duck Pond → Hwaam Dorm → Munji Campus
              </p>
            </div>
          </div>

          {/* Wolpyeong Route */}
          <div className="border-l-4 border-purple-500 pl-3">
            <h4 className="font-semibold text-purple-700">Wolpyeong Station Shuttle</h4>
            <p className="text-sm text-gray-600 mt-1">
              <strong>Operating:</strong> Weekdays only
            </p>
            <p className="text-sm text-gray-600">
              <strong>Times:</strong> 07:50, 08:20, 09:00, 12:00, 13:00, 17:00, 18:00
            </p>
            <div className="flex items-start gap-2 mt-2">
              <MapPin size={14} className="mt-1 text-purple-500" />
              <p className="text-sm text-gray-700">
                Main Campus ↔ Wolpyeong Station ↔ Galleria Timeworld ↔ Govt Complex
              </p>
            </div>
          </div>

          {/* Taxi Stand */}
          <div className="border-l-4 border-yellow-500 pl-3">
            <h4 className="font-semibold text-yellow-700">🚕 Taxi Stand</h4>
            <p className="text-sm text-gray-600 mt-1">
              <strong>Location:</strong> Beside N13 (Tae Wul Gwan)
            </p>
            <p className="text-sm text-gray-700 mt-1">
              Available 24/7 for quick trips around campus or to nearby areas
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
