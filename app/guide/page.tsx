import NewcomerChecklist from '@/components/guide/NewcomerChecklist'

export const metadata = {
  title: 'Newcomer Guide - KAIST Companion',
  description: 'Complete onboarding checklist for KAIST newcomers',
}

export default function GuidePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <NewcomerChecklist />
    </div>
  )
}
