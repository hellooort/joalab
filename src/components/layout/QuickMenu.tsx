'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ShoppingCart, MessageCircle, Headphones, Clock, ChevronUp, Phone } from 'lucide-react'

interface RecentProduct {
  id: string
  name: string
}

export default function QuickMenu() {
  const [showRecent, setShowRecent] = useState(false)
  const [recentProducts, setRecentProducts] = useState<RecentProduct[]>([])

  useEffect(() => {
    try {
      const stored = localStorage.getItem('joalab-recent')
      if (stored) setRecentProducts(JSON.parse(stored))
    } catch {}
  }, [showRecent])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <div className="fixed right-3 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-0 w-[90px]">
      {/* Call Center Header */}
      <div className="bg-white border border-gray-200 rounded-t-xl w-full text-center pt-3 pb-2 shadow-lg">
        <Phone className="w-7 h-7 text-green-500 mx-auto mb-1" />
        <p className="text-[10px] font-bold text-gray-500 tracking-wider">CALL CENTER</p>
        <p className="text-sm font-extrabold text-gray-900 leading-tight">02-3463<br/>-7190</p>
        <p className="text-[9px] text-gray-400 mt-1">평일 09:00~18:00</p>
        <p className="text-[8px] text-gray-400">[점심시간]</p>
        <p className="text-[8px] text-gray-400">12:00~13:00</p>
      </div>

      {/* Menu Items */}
      <div className="bg-white border-x border-gray-200 w-full divide-y divide-gray-100 shadow-lg">
        <Link href="/cart" className="flex items-center gap-1.5 px-2 py-2.5 text-xs text-gray-600 hover:text-primary hover:bg-gray-50 transition">
          <ShoppingCart className="w-4 h-4 shrink-0" />
          <span className="font-medium">장바구니</span>
        </Link>
        <a href="https://pf.kakao.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-2 py-2.5 text-xs text-gray-600 hover:text-yellow-600 hover:bg-gray-50 transition">
          <MessageCircle className="w-4 h-4 shrink-0" />
          <span className="font-medium">카톡상담</span>
        </a>
        <button className="flex items-center gap-1.5 px-2 py-2.5 text-xs text-gray-600 hover:text-primary hover:bg-gray-50 transition w-full text-left" onClick={() => alert('실시간 상담 기능 준비 중입니다. (데모)')}>
          <Headphones className="w-4 h-4 shrink-0" />
          <span className="font-medium">실시간상담</span>
        </button>
        <div className="relative">
          <button
            className="flex items-center gap-1.5 px-2 py-2.5 text-xs text-gray-600 hover:text-primary hover:bg-gray-50 transition w-full text-left"
            onClick={() => setShowRecent(!showRecent)}
          >
            <Clock className="w-4 h-4 shrink-0" />
            <span className="font-medium">최근 본 상품</span>
          </button>
          {showRecent && (
            <div className="absolute right-full mr-2 top-0 w-48 bg-white border border-gray-200 rounded-lg shadow-xl p-3 z-50">
              <p className="text-xs font-bold text-gray-700 mb-2 border-b pb-1">최근 본 상품</p>
              {recentProducts.length === 0 ? (
                <p className="text-xs text-gray-400 py-2">최근 본 상품이 없습니다.</p>
              ) : (
                <ul className="space-y-1.5 max-h-40 overflow-y-auto">
                  {recentProducts.slice(0, 5).map((p) => (
                    <li key={p.id}>
                      <Link href={`/products/${p.id}`} className="text-xs text-gray-600 hover:text-primary line-clamp-1 block">
                        {p.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>

      {/* TOP */}
      <button
        onClick={scrollToTop}
        className="bg-white border border-gray-200 border-t-0 rounded-b-xl w-full py-2.5 text-xs font-bold text-gray-500 hover:text-primary hover:bg-gray-50 transition shadow-lg flex items-center justify-center gap-1"
      >
        <ChevronUp className="w-3.5 h-3.5" />
        TOP
      </button>
    </div>
  )
}
