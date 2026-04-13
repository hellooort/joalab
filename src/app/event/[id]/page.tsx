'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Calendar, ChevronRight, Gift } from 'lucide-react'
import { events } from '@/data/events'
import { formatDate } from '@/lib/utils'

export default function EventDetailPage() {
  const params = useParams()
  const event = events.find((e) => e.id === params.id)

  if (!event) {
    return (
      <div className="container-custom py-20 text-center">
        <p className="text-gray-500">이벤트를 찾을 수 없습니다.</p>
        <Link href="/event" className="btn-primary mt-4 inline-block">목록으로</Link>
      </div>
    )
  }

  return (
    <div className="container-custom py-8 max-w-3xl">
      <nav className="flex items-center gap-1 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-primary">홈</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/event" className="hover:text-primary">이벤트</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-600">{event.title}</span>
      </nav>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="aspect-[2/1] bg-gradient-to-br from-primary-light to-blue-100 flex items-center justify-center">
          <div className="text-center">
            <Gift className="w-20 h-20 text-primary/30 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900">{event.title}</h1>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            {event.isActive && <span className="badge badge-hot">진행중</span>}
            <div className="flex items-center gap-1 text-sm text-gray-400">
              <Calendar className="w-4 h-4" />
              {formatDate(event.startDate)} ~ {formatDate(event.endDate)}
            </div>
          </div>
          <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">{event.content}</div>
          <div className="mt-6">
            <Link href="/event" className="btn-outline inline-block">목록으로</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
