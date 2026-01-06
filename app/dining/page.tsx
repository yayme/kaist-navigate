import DailyMenuDisplay from '@/components/dining/DailyMenuDisplay'

export const metadata = {
  title: 'Dining - KAIST Companion',
  description: 'Campus cafeteria menus and dining information',
}

export default function DiningPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <DailyMenuDisplay />
    </div>
  )
}
