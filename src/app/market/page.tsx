'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Eye, Package, PenSquare } from 'lucide-react'
import { marketPosts } from '@/data/events'
import { marketCategories } from '@/data/categories'
import { formatPrice, formatDate } from '@/lib/utils'

export default function MarketPage() {
  const [selectedCat, setSelectedCat] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = marketPosts.filter((post) => {
    if (selectedCat && post.category !== selectedCat) return false
    if (searchQuery && !post.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  return (
    <div className="container-custom py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">중고장터</h1>
          <p className="text-sm text-gray-500 mt-1">실험실 중고 장비 및 소모품을 사고팔 수 있습니다</p>
        </div>
        <Link href="/market/write" className="btn-primary flex items-center gap-1">
          <PenSquare className="w-4 h-4" />
          글쓰기
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex gap-2">
          <button onClick={() => setSelectedCat('')} className={`px-3 py-1.5 text-sm rounded-full transition ${!selectedCat ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>전체</button>
          {marketCategories.map((cat) => (
            <button key={cat.id} onClick={() => setSelectedCat(cat.slug)} className={`px-3 py-1.5 text-sm rounded-full transition ${selectedCat === cat.slug ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              {cat.name}
            </button>
          ))}
        </div>
        <div className="relative ml-auto">
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="검색..." className="h-9 pl-3 pr-9 border border-gray-300 rounded-lg text-sm w-48" />
          <Search className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Post List */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((post) => (
            <Link key={post.id} href={`/market/${post.id}`} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition group">
              <div className="flex gap-4">
                <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                  <Package className="w-8 h-8 text-gray-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`badge text-[10px] ${post.condition === '새것' ? 'badge-new' : 'bg-gray-200 text-gray-600'}`}>{post.condition}</span>
                    <span className="text-xs text-gray-400">{marketCategories.find(c => c.slug === post.category)?.name}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-800 group-hover:text-primary transition line-clamp-1">{post.title}</h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-1">{post.content}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-base font-bold text-primary">{formatPrice(post.price)}원</span>
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span>{post.author}</span>
                      <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{post.views}</span>
                      <span>{formatDate(post.createdAt)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-400">
          <p>해당 조건의 게시글이 없습니다.</p>
        </div>
      )}
    </div>
  )
}
