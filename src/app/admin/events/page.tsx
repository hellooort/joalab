'use client'

import { useState } from 'react'
import { Plus, Edit, Trash2, Eye, EyeOff, Megaphone, Image } from 'lucide-react'
import { events, popups } from '@/data/events'
import { formatDate } from '@/lib/utils'

export default function AdminEventsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <Megaphone className="w-6 h-6 text-primary" />
        이벤트 / 팝업 관리
      </h1>

      {/* Events */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">이벤트 관리</h2>
          <button onClick={() => alert('이벤트 등록 화면이 열립니다. (데모)')} className="btn-primary flex items-center gap-1 text-sm">
            <Plus className="w-4 h-4" />이벤트 등록
          </button>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-500">제목</th>
                <th className="px-4 py-3 text-center font-medium text-gray-500">시작일</th>
                <th className="px-4 py-3 text-center font-medium text-gray-500">종료일</th>
                <th className="px-4 py-3 text-center font-medium text-gray-500">상태</th>
                <th className="px-4 py-3 text-center font-medium text-gray-500 w-28">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {events.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 font-medium text-gray-800">{event.title}</td>
                  <td className="px-4 py-3 text-center text-xs text-gray-500">{formatDate(event.startDate)}</td>
                  <td className="px-4 py-3 text-center text-xs text-gray-500">{formatDate(event.endDate)}</td>
                  <td className="px-4 py-3 text-center">
                    {event.isActive ? (
                      <span className="badge badge-new text-[10px]">진행중</span>
                    ) : (
                      <span className="badge bg-gray-200 text-gray-600 text-[10px]">종료</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1">
                      <button onClick={() => alert(`"${event.title}" 수정 화면이 열립니다. (데모)`)} className="p-1.5 text-gray-400 hover:text-primary rounded"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => alert(`"${event.title}" 이벤트가 삭제되었습니다. (데모)`)} className="p-1.5 text-gray-400 hover:text-accent rounded"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Popups */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">팝업 관리</h2>
          <button onClick={() => alert('팝업 등록 화면이 열립니다. (데모)')} className="btn-primary flex items-center gap-1 text-sm">
            <Plus className="w-4 h-4" />팝업 등록
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {popups.map((popup) => (
            <div key={popup.id} className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-gray-900">{popup.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">{formatDate(popup.startDate)} ~ {formatDate(popup.endDate)}</p>
                </div>
                {popup.isActive ? (
                  <span className="badge badge-new text-[10px]">활성</span>
                ) : (
                  <span className="badge bg-gray-200 text-gray-600 text-[10px]">비활성</span>
                )}
              </div>
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                <Image className="w-8 h-8 text-gray-300" />
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>크기: {popup.size.width} x {popup.size.height}px</span>
                <div className="flex gap-2">
                  <button onClick={() => alert(`"${popup.title}" 수정 화면이 열립니다. (데모)`)} className="text-primary hover:underline font-medium">수정</button>
                  <button onClick={() => alert(`"${popup.title}" 팝업이 삭제되었습니다. (데모)`)} className="text-accent hover:underline font-medium">삭제</button>
                  <button onClick={() => alert(`"${popup.title}" 팝업이 ${popup.isActive ? '비활성화' : '활성화'}되었습니다. (데모)`)} className="text-gray-600 hover:underline font-medium">
                    {popup.isActive ? '비활성화' : '활성화'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
