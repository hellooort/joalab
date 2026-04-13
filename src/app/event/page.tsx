'use client'

import Link from 'next/link'
import { Calendar, ChevronRight, Gift } from 'lucide-react'
import { events } from '@/data/events'
import { formatDate } from '@/lib/utils'

export default function EventPage() {
  return (
    <div className="container-custom py-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">이벤트</h1>
        <p className="text-sm text-gray-500 mt-2">JoaLab의 다양한 이벤트와 프로모션을 확인하세요</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((event) => {
          const isExpired = new Date(event.endDate) < new Date()
          return (
            <Link
              key={event.id}
              href={`/event/${event.id}`}
              className={`group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition ${isExpired ? 'opacity-60' : ''}`}
            >
              <div className="aspect-[2/1] bg-gradient-to-br from-primary-light to-blue-100 flex items-center justify-center relative">
                <Gift className="w-16 h-16 text-primary/30" />
                {isExpired && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="text-white font-bold text-lg bg-black/60 px-4 py-2 rounded-lg">종료된 이벤트</span>
                  </div>
                )}
                {!isExpired && event.isActive && (
                  <span className="absolute top-3 left-3 badge badge-hot">진행중</span>
                )}
              </div>
              <div className="p-4">
                <h2 className="text-lg font-bold text-gray-900 group-hover:text-primary transition">{event.title}</h2>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{event.content}</p>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Calendar className="w-3 h-3" />
                    {formatDate(event.startDate)} ~ {formatDate(event.endDate)}
                  </div>
                  <span className="text-xs text-primary font-medium flex items-center gap-1">
                    자세히 보기 <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
