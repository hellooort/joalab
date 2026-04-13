'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, Eye, Phone, Package, Calendar, Tag } from 'lucide-react'
import { marketPosts } from '@/data/events'
import { marketCategories } from '@/data/categories'
import { formatPrice, formatDate } from '@/lib/utils'

export default function MarketDetailPage() {
  const params = useParams()
  const post = marketPosts.find((p) => p.id === params.id)

  if (!post) {
    return (
      <div className="container-custom py-20 text-center">
        <p className="text-gray-500">게시글을 찾을 수 없습니다.</p>
        <Link href="/market" className="btn-primary mt-4 inline-block">목록으로</Link>
      </div>
    )
  }

  return (
    <div className="container-custom py-8 max-w-3xl">
      <nav className="flex items-center gap-1 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-primary">홈</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/market" className="hover:text-primary">중고장터</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-600">{post.title}</span>
      </nav>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="aspect-video bg-gray-100 flex items-center justify-center">
          <Package className="w-24 h-24 text-gray-300" />
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className={`badge ${post.condition === '새것' ? 'badge-new' : 'bg-gray-200 text-gray-600'}`}>{post.condition}</span>
            <span className="text-xs text-gray-400">{marketCategories.find(c => c.slug === post.category)?.name}</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h1>
          <p className="text-2xl font-bold text-primary mb-4">{formatPrice(post.price)}원</p>

          <div className="grid grid-cols-2 gap-3 text-sm border-t border-b border-gray-200 py-4 mb-4">
            <div className="flex items-center gap-2 text-gray-600"><Tag className="w-4 h-4" /> 상태: {post.condition}</div>
            <div className="flex items-center gap-2 text-gray-600"><Eye className="w-4 h-4" /> 조회수: {post.views}</div>
            <div className="flex items-center gap-2 text-gray-600"><Calendar className="w-4 h-4" /> {formatDate(post.createdAt)}</div>
            <div className="flex items-center gap-2 text-gray-600"><Phone className="w-4 h-4" /> {post.phone}</div>
          </div>

          <div className="text-sm text-gray-700 whitespace-pre-line">{post.content}</div>

          <div className="mt-6 flex gap-3">
            <Link href="/market" className="btn-outline flex-1 text-center">목록으로</Link>
            <button className="btn-primary flex-1 flex items-center justify-center gap-1"><Phone className="w-4 h-4" /> 연락하기</button>
          </div>
        </div>
      </div>
    </div>
  )
}
