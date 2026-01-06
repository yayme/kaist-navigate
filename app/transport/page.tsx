import ShuttleTracker from '@/components/transport/ShuttleTracker'
import { ExternalLink } from 'lucide-react'

export const metadata = {
  title: 'Transportation - KAIST Companion',
  description: 'Real-time shuttle tracking and transportation information for KAIST campus',
}

export default function TransportPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Live OLEV Tracking Link */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 text-white p-6 rounded-lg shadow-lg mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">🚌 Live OLEV Bus Tracking</h2>
            <p className="text-sm opacity-90">Track shuttle buses in real-time on the official KAIST bus system</p>
          </div>
          <a
            href="https://bus.kaist.ac.kr/olev.html"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2 shadow-md"
          >
            Track Live Buses
            <ExternalLink size={18} />
          </a>
        </div>
      </div>

      <ShuttleTracker />
      
      {/* Getting to KAIST Section */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-kaist-blue mb-4">
          🛬 Getting to KAIST from the Airport
        </h2>
        
        <div className="space-y-6">
          {/* From Incheon Airport */}
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              From Incheon International Airport (ICN)
            </h3>
            
            <div className="space-y-3">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Option 1: Airport Limousine Bus</h4>
                <ol className="text-sm text-gray-700 space-y-1 list-decimal list-inside">
                  <li>Take Airport Limousine Bus to Daejeon (Bus routes available)</li>
                  <li>Get off at Government Complex or Yuseong bus terminals</li>
                  <li>Take taxi to KAIST (약 15-20분, ~10,000 KRW)</li>
                  <li>Total time: ~3.5-4 hours</li>
                </ol>
                <p className="text-sm text-blue-800 mt-2 font-semibold">
                  💰 Cost: ~30,000 KRW (bus) + 10,000 KRW (taxi)
                </p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">Option 2: KTX Train</h4>
                <ol className="text-sm text-gray-700 space-y-1 list-decimal list-inside">
                  <li>Take Airport Railroad Express (AREX) to Seoul Station</li>
                  <li>Transfer to KTX train to Daejeon Station</li>
                  <li>From Daejeon Station, take taxi to KAIST (~20 min, 15,000 KRW)</li>
                  <li>Total time: ~3 hours</li>
                </ol>
                <p className="text-sm text-green-800 mt-2 font-semibold">
                  💰 Cost: ~60,000 KRW total (faster option)
                </p>
              </div>
            </div>
          </div>

          {/* From Gimpo Airport */}
          <div className="border-l-4 border-purple-500 pl-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              From Gimpo Airport (GMP)
            </h3>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <ol className="text-sm text-gray-700 space-y-1 list-decimal list-inside">
                <li>Take Airport Railroad to Seoul Station</li>
                <li>Transfer to KTX to Daejeon</li>
                <li>Taxi from Daejeon Station to KAIST</li>
                <li>Total time: ~2.5 hours</li>
              </ol>
            </div>
          </div>

          {/* Taxi Information */}
          <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-300">
            <h4 className="font-semibold text-yellow-900 mb-2">🚕 Taxi Instructions</h4>
            <p className="text-sm text-gray-700 mb-2">
              Show this to the taxi driver:
            </p>
            <div className="bg-white p-3 rounded border-2 border-dashed border-gray-300">
              <p className="font-bold text-lg">카이스트 (KAIST)</p>
              <p className="text-sm text-gray-600">대전광역시 유성구 대학로 291</p>
              <p className="text-sm text-gray-600">291 Daehak-ro, Yuseong-gu, Daejeon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
