import InteractiveMap from '@/components/map/InteractiveMap'

export const metadata = {
  title: 'Campus Map - KAIST Companion',
  description: 'Interactive campus map and building directory',
}

export default function MapPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Official Campus Map Link */}
      <div className="bg-gradient-to-r from-kaist-blue to-kaist-light-blue text-white p-6 rounded-lg shadow-lg mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-1">📄 Official Campus Map</h2>
            <p className="text-sm opacity-90">View the detailed PDF map with all buildings and facilities</p>
          </div>
          <a
            href="https://www.kaist.ac.kr/site/en/img/content/Campus_map.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-kaist-blue px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-md whitespace-nowrap"
          >
            View Detailed Map →
          </a>
        </div>
      </div>

      <InteractiveMap />
    </div>
  )
}
