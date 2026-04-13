'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'
import { popups } from '@/data/events'

export default function Popup() {
  const [visiblePopups, setVisiblePopups] = useState<string[]>([])

  useEffect(() => {
    const hidden = JSON.parse(localStorage.getItem('joalab-hidden-popups') || '{}')
    const now = new Date()
    const active = popups.filter((p) => {
      if (!p.isActive) return false
      if (new Date(p.endDate) < now) return false
      if (hidden[p.id] && new Date(hidden[p.id]) > now) return false
      return true
    })
    setVisiblePopups(active.map((p) => p.id))
  }, [])

  const closePopup = (id: string) => {
    setVisiblePopups((prev) => prev.filter((pid) => pid !== id))
  }

  const hideToday = (id: string) => {
    const hidden = JSON.parse(localStorage.getItem('joalab-hidden-popups') || '{}')
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(0, 0, 0, 0)
    hidden[id] = tomorrow.toISOString()
    localStorage.setItem('joalab-hidden-popups', JSON.stringify(hidden))
    closePopup(id)
  }

  if (visiblePopups.length === 0) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-[100]" onClick={() => setVisiblePopups([])} />
      {popups
        .filter((p) => visiblePopups.includes(p.id))
        .map((popup) => (
          <div
            key={popup.id}
            className="fixed z-[101] bg-white rounded-lg shadow-2xl overflow-hidden animate-fadeIn"
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: Math.min(popup.size.width, 460),
              maxHeight: '80vh',
            }}
          >
            <div className="relative">
              <Link href={popup.linkUrl || '#'} onClick={() => closePopup(popup.id)}>
                <div className="aspect-[5/6] bg-gradient-to-br from-primary-light to-blue-100 flex flex-col items-center justify-center p-8">
                  <div className="text-center">
                    <p className="text-sm text-primary font-semibold mb-2">EVENT</p>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{popup.title}</h2>
                    <div className="w-20 h-1 bg-primary mx-auto mb-4 rounded-full" />
                    <p className="text-gray-600 text-sm">자세히 보기 →</p>
                  </div>
                </div>
              </Link>
              <button
                onClick={() => closePopup(popup.id)}
                className="absolute top-3 right-3 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex border-t border-gray-200">
              <button
                onClick={() => hideToday(popup.id)}
                className="flex-1 py-3 text-xs text-gray-500 hover:bg-gray-50 transition"
              >
                오늘 하루 보지 않기
              </button>
              <div className="w-px bg-gray-200" />
              <button
                onClick={() => closePopup(popup.id)}
                className="flex-1 py-3 text-xs text-gray-500 hover:bg-gray-50 transition"
              >
                닫기
              </button>
            </div>
          </div>
        ))}
    </>
  )
}
