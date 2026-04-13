'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Upload } from 'lucide-react'
import { marketCategories } from '@/data/categories'

export default function MarketWritePage() {
  const router = useRouter()
  const [form, setForm] = useState({
    title: '',
    category: '',
    condition: '중고',
    price: '',
    phone: '',
    content: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('게시글이 등록되었습니다. (데모)')
    router.push('/market')
  }

  return (
    <div className="container-custom py-8 max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">중고장터 글쓰기</h1>

      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">카테고리 *</label>
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm" required>
            <option value="">카테고리 선택</option>
            {marketCategories.map((cat) => (
              <option key={cat.id} value={cat.slug}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">제목 *</label>
          <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm" required />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">상태 *</label>
            <select value={form.condition} onChange={(e) => setForm({ ...form, condition: e.target.value })} className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm">
              <option>새것</option>
              <option>중고</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">가격 (원) *</label>
            <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">연락처 *</label>
            <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm" placeholder="010-0000-0000" required />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">내용 *</label>
          <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="w-full h-40 px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">사진</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition cursor-pointer">
            <Upload className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p className="text-sm text-gray-500">클릭하여 사진을 업로드하세요</p>
            <p className="text-xs text-gray-400 mt-1">JPG, PNG (최대 5MB)</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Link href="/market" className="btn-outline flex-1 text-center">취소</Link>
          <button type="submit" className="btn-primary flex-1">등록하기</button>
        </div>
      </form>
    </div>
  )
}
