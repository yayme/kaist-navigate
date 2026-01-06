'use client'

import { useState, useEffect } from 'react'
import { CheckCircle2, Circle, ChevronDown, ChevronUp, ExternalLink, Clock, FileText } from 'lucide-react'
import newcomerData from '@/data/newcomer.json'

interface ChecklistItem {
  id: string
  title: string
  description: string
  category: string
  priority: number
  estimatedTime: string
  steps: string[]
  location?: string
  requiredDocuments: string[]
  notes?: string
  links?: { text: string; url: string }[]
}

export default function NewcomerChecklist() {
  const [completedItems, setCompletedItems] = useState<string[]>([])
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  // Load completed items from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('kaist-checklist-completed')
    if (saved) {
      setCompletedItems(JSON.parse(saved))
    }
  }, [])

  // Save completed items to localStorage
  const toggleComplete = (itemId: string) => {
    const newCompleted = completedItems.includes(itemId)
      ? completedItems.filter(id => id !== itemId)
      : [...completedItems, itemId]
    
    setCompletedItems(newCompleted)
    localStorage.setItem('kaist-checklist-completed', JSON.stringify(newCompleted))
  }

  const toggleExpand = (itemId: string) => {
    setExpandedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  const isCompleted = (itemId: string) => completedItems.includes(itemId)
  const isExpanded = (itemId: string) => expandedItems.includes(itemId)

  const progressPercentage = Math.round(
    (completedItems.length / newcomerData.checklistItems.length) * 100
  )

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      account: 'bg-blue-100 text-blue-800',
      health: 'bg-green-100 text-green-800',
      legal: 'bg-red-100 text-red-800',
      finance: 'bg-yellow-100 text-yellow-800',
      campus: 'bg-purple-100 text-purple-800',
      technology: 'bg-indigo-100 text-indigo-800',
      housing: 'bg-pink-100 text-pink-800',
      academic: 'bg-orange-100 text-orange-800',
      orientation: 'bg-teal-100 text-teal-800'
    }
    return colors[category] || 'bg-gray-100 text-gray-800'
  }

  const sortedItems = [...newcomerData.checklistItems].sort((a, b) => a.priority - b.priority)

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-kaist-blue mb-4">
          Newcomer Onboarding Checklist
        </h2>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-700 font-semibold">Progress</span>
            <span className="text-kaist-blue font-bold text-lg">
              {completedItems.length} / {newcomerData.checklistItems.length} completed
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="bg-gradient-to-r from-kaist-blue to-green-500 h-full transition-all duration-500 flex items-center justify-end pr-2"
              style={{ width: `${progressPercentage}%` }}
            >
              {progressPercentage > 10 && (
                <span className="text-white text-xs font-bold">{progressPercentage}%</span>
              )}
            </div>
          </div>

          {progressPercentage === 100 && (
            <div className="bg-green-50 border-2 border-green-500 p-4 rounded-lg mt-4">
              <p className="text-green-800 font-bold text-center text-lg">
                🎉 Congratulations! You've completed all onboarding tasks!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Checklist Items */}
      <div className="space-y-3">
        {sortedItems.map((item: ChecklistItem) => (
          <div
            key={item.id}
            className={`bg-white rounded-lg shadow-md overflow-hidden transition-all ${
              isCompleted(item.id) ? 'opacity-75' : ''
            }`}
          >
            {/* Item Header */}
            <div className="p-5">
              <div className="flex items-start gap-4">
                {/* Checkbox */}
                <button
                  onClick={() => toggleComplete(item.id)}
                  className="flex-shrink-0 mt-1"
                >
                  {isCompleted(item.id) ? (
                    <CheckCircle2 size={28} className="text-green-500" />
                  ) : (
                    <Circle size={28} className="text-gray-400 hover:text-kaist-blue" />
                  )}
                </button>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className={`text-lg font-bold ${isCompleted(item.id) ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                    </div>
                    <button
                      onClick={() => toggleExpand(item.id)}
                      className="ml-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      {isExpanded(item.id) ? (
                        <ChevronUp size={20} className="text-gray-600" />
                      ) : (
                        <ChevronDown size={20} className="text-gray-600" />
                      )}
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(item.category)}`}>
                      {item.category.toUpperCase()}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 flex items-center gap-1">
                      <Clock size={12} />
                      {item.estimatedTime}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                      Priority {item.priority}
                    </span>
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              {isExpanded(item.id) && (
                <div className="mt-4 pl-12 space-y-4 border-t pt-4">
                  {/* Steps */}
                  <div>
                    <h4 className="font-semibold text-kaist-blue mb-2 flex items-center gap-2">
                      <FileText size={16} />
                      Steps to Complete
                    </h4>
                    <ol className="space-y-2">
                      {item.steps.map((step, index) => (
                        <li key={index} className="text-sm text-gray-700 flex gap-2">
                          <span className="font-bold text-kaist-blue">{index + 1}.</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Location */}
                  {item.location && (
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <h4 className="font-semibold text-blue-900 text-sm mb-1">📍 Location</h4>
                      <p className="text-sm text-blue-800">{item.location}</p>
                    </div>
                  )}

                  {/* Required Documents */}
                  {item.requiredDocuments.length > 0 && (
                    <div className="bg-yellow-50 p-3 rounded-lg">
                      <h4 className="font-semibold text-yellow-900 text-sm mb-2">
                        📄 Required Documents
                      </h4>
                      <ul className="space-y-1">
                        {item.requiredDocuments.map((doc, index) => (
                          <li key={index} className="text-sm text-yellow-800 flex items-start gap-2">
                            <span>•</span>
                            <span>{doc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Notes */}
                  {item.notes && (
                    <div className="bg-purple-50 p-3 rounded-lg">
                      <h4 className="font-semibold text-purple-900 text-sm mb-1">💡 Notes</h4>
                      <p className="text-sm text-purple-800">{item.notes}</p>
                    </div>
                  )}

                  {/* Links */}
                  {item.links && item.links.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm mb-2">🔗 Useful Links</h4>
                      <div className="space-y-2">
                        {item.links.map((link, index) => (
                          <a
                            key={index}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-kaist-blue hover:underline flex items-center gap-2"
                          >
                            <ExternalLink size={14} />
                            {link.text}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Links Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-kaist-blue mb-4">Essential Links</h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {newcomerData.quickLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-between group"
            >
              <div>
                <h4 className="font-semibold text-gray-800">{link.name}</h4>
                <p className="text-xs text-gray-500">{link.category}</p>
              </div>
              <ExternalLink size={18} className="text-gray-400 group-hover:text-kaist-blue" />
            </a>
          ))}
        </div>
      </div>

      {/* Reset Progress Button */}
      <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Your progress is saved automatically in your browser
        </p>
        <button
          onClick={() => {
            if (confirm('Are you sure you want to reset your progress? This cannot be undone.')) {
              setCompletedItems([])
              localStorage.removeItem('kaist-checklist-completed')
            }
          }}
          className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-semibold"
        >
          Reset Progress
        </button>
      </div>
    </div>
  )
}
