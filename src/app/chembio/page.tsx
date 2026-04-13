'use client'

import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Package, ChevronRight } from 'lucide-react'
import ProductCard from '@/components/product/ProductCard'
import { products } from '@/data/products'
import { categories } from '@/data/categories'
import { Suspense } from 'react'

function ChembioInner() {
  const searchParams = useSearchParams()
  const categorySlug = searchParams.get('category')
  const subSlug = searchParams.get('sub')

  const [selectedCat, setSelectedCat] = useState(categorySlug || '')
  const [selectedSub, setSelectedSub] = useState(subSlug || '')
  const [sort, setSort] = useState('name')

  const filtered = useMemo(() => {
    let result = [...products]
    if (selectedCat) {
      result = result.filter((p) => p.category === selectedCat)
    }
    if (selectedSub) {
      result = result.filter((p) => p.subCategory === selectedSub)
    }
    switch (sort) {
      case 'price-asc':
        result.sort((a, b) => a.options[0].consumerPrice - b.options[0].consumerPrice)
        break
      case 'price-desc':
        result.sort((a, b) => b.options[0].consumerPrice - a.options[0].consumerPrice)
        break
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      default:
        result.sort((a, b) => a.name.localeCompare(b.name))
    }
    return result
  }, [selectedCat, selectedSub, sort])

  const currentCategory = categories.find((c) => c.slug === selectedCat)

  return (
    <div className="container-custom py-8">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary transition">홈</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-900 font-medium">Chembio</span>
        {currentCategory && (
          <>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-900 font-medium">{currentCategory.name}</span>
          </>
        )}
      </div>

      <div className="flex gap-8">
        {/* Sidebar */}
        <aside className="w-56 shrink-0 hidden lg:block">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Chembio 카테고리</h2>
          <nav className="space-y-1">
            <button
              onClick={() => { setSelectedCat(''); setSelectedSub('') }}
              className={`block w-full text-left px-3 py-2 text-sm rounded-lg transition ${!selectedCat ? 'bg-primary text-white font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              전체
            </button>
            {categories.map((cat) => (
              <div key={cat.id}>
                <button
                  onClick={() => { setSelectedCat(cat.slug); setSelectedSub('') }}
                  className={`block w-full text-left px-3 py-2 text-sm rounded-lg transition ${selectedCat === cat.slug ? 'bg-primary text-white font-semibold' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  {cat.name}
                </button>
                {selectedCat === cat.slug && cat.children && cat.children.length > 0 && (
                  <div className="ml-3 mt-1 space-y-1">
                    <button
                      onClick={() => setSelectedSub('')}
                      className={`block w-full text-left px-3 py-1.5 text-xs rounded transition ${!selectedSub ? 'text-primary font-semibold' : 'text-gray-500 hover:text-primary'}`}
                    >
                      전체
                    </button>
                    {cat.children.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => setSelectedSub(sub.slug)}
                        className={`block w-full text-left px-3 py-1.5 text-xs rounded transition ${selectedSub === sub.slug ? 'text-primary font-semibold' : 'text-gray-500 hover:text-primary'}`}
                      >
                        {sub.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </aside>

        {/* Main */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {currentCategory?.name || 'Chembio 전체 제품'}
              </h1>
              <p className="text-sm text-gray-500 mt-1">총 {filtered.length}개의 상품</p>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="text-sm border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="name">이름순</option>
                <option value="newest">최신순</option>
                <option value="price-asc">낮은가격순</option>
                <option value="price-desc">높은가격순</option>
              </select>
            </div>
          </div>

          {/* Mobile category selector */}
          <div className="lg:hidden mb-4">
            <select
              value={selectedCat}
              onChange={(e) => { setSelectedCat(e.target.value); setSelectedSub('') }}
              className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="">전체 카테고리</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.slug}>{cat.name}</option>
              ))}
            </select>
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-400">
              <Package className="w-12 h-12 mx-auto mb-3" />
              <p>해당 카테고리의 상품이 없습니다.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ChembioPage() {
  return (
    <Suspense fallback={<div className="container-custom py-8">로딩 중...</div>}>
      <ChembioInner />
    </Suspense>
  )
}
