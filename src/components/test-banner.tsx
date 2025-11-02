'use client'

import { AlertTriangle, X } from 'lucide-react'
import { useState } from 'react'

export function TestBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="bg-red-600 text-white px-4 py-3 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <AlertTriangle className="w-5 h-5 flex-shrink-0" />
          <div className="text-sm font-medium">
            <strong>⚠️ TEST ENVIRONMENT - DO NOT USE REAL PATIENT DATA</strong>
            <span className="hidden sm:inline"> | This is a testing environment. Please use only fictional/dummy data. Not HIPAA-compliant. Not for use with real patient information.</span>
          </div>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-white hover:text-gray-200 flex-shrink-0"
          aria-label="Close warning"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}