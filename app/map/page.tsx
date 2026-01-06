import InteractiveMap from '@/components/map/InteractiveMap'

export const metadata = {
  title: 'Campus Map - KAIST Companion',
  description: 'Interactive campus map and building directory',
}

export default function MapPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <InteractiveMap />
    </div>
  )
}
