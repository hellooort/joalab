'use client'

import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Package, SlidersHorizontal, Grid3X3, List } from 'lucide-react'
import ProductCard from '@/components/product/ProductCard'
import { products } from '@/data/products'
import { formatPrice } from '@/lib/utils'
import { Suspense } from 'react'

const ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

function ProductListInner() {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('search') || ''

  const [selectedAlpha, setSelectedAlpha] = useState<string>('A')
  const [sort, setSort] = useState('name')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const searchFiltered = useMemo(() => {
    if (!searchQuery) return null
    const q = searchQuery.toLowerCase()
    return products.filter((p) =>
      p.name.toLowerCase().includes(q) ||
      p.code.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.options.some((o) => o.name.toLowerCase().includes(q) || o.modelCode.toLowerCase().includes(q))
    )
  }, [searchQuery])

  const alphaFiltered = useMemo(() => {
    if (searchQuery) return []
    return products.filter((p) => p.name.charAt(0).toUpperCase() === selectedAlpha)
  }, [selectedAlpha, searchQuery])

  const sorted = useMemo(() => {
    const list = searchFiltered ?? alphaFiltered
    const result = [...list]
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
  }, [searchFiltered, alphaFiltered, sort])

  const alphaCountMap = useMemo(() => {
    const map: Record<string, number> = {}
    ALPHA.forEach((a) => { map[a] = 0 })
    products.forEach((p) => {
      const first = p.name.charAt(0).toUpperCase()
      if (/[A-Z]/.test(first) && map[first] !== undefined) map[first]++
    })
    return map
  }, [])

  if (searchQuery) {
    return (
      <div className="container-custom py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">&quot;{searchQuery}&quot; 검색 결과</h1>
            <p className="text-sm text-gray-500 mt-1">총 {sorted.length}개의 상품</p>
          </div>
          <div className="flex items-center gap-3">
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="text-sm border border-gray-300 rounded-lg px-3 py-2">
              <option value="name">이름순</option>
              <option value="newest">최신순</option>
              <option value="price-asc">낮은가격순</option>
              <option value="price-desc">높은가격순</option>
            </select>
          </div>
        </div>
        {sorted.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {sorted.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <SlidersHorizontal className="w-12 h-12 mx-auto mb-3" />
            <p>검색 결과가 없습니다.</p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="container-custom py-8">
      <div className="flex items-center gap-2 mb-6">
        <Package className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-bold text-gray-900">전체상품</h1>
      </div>

      {/* A-Z Tabs */}
      <div className="flex flex-wrap gap-1 mb-6 bg-white border border-gray-200 rounded-xl p-3">
        {ALPHA.map((letter) => (
          <button
            key={letter}
            onClick={() => setSelectedAlpha(letter)}
            className={`w-10 h-10 text-sm font-bold rounded-lg transition ${
              selectedAlpha === letter
                ? 'bg-primary text-white shadow-sm'
                : alphaCountMap[letter] > 0
                  ? 'bg-gray-50 text-gray-700 hover:bg-primary/10 hover:text-primary'
                  : 'bg-gray-50 text-gray-300 cursor-default'
            }`}
            disabled={alphaCountMap[letter] === 0}
          >
            {letter}
          </button>
        ))}
      </div>

      {/* Header & Sort */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-gray-500">
          <span className="font-bold text-primary">{selectedAlpha}</span>
          (으)로 시작하는 상품 <span className="font-semibold text-gray-900">{sorted.length}개</span>
        </div>
        <div className="flex items-center gap-3">
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="text-sm border border-gray-300 rounded-lg px-3 py-2">
            <option value="name">이름순</option>
            <option value="newest">최신순</option>
            <option value="price-asc">낮은가격순</option>
            <option value="price-desc">높은가격순</option>
          </select>
          <div className="hidden md:flex border border-gray-300 rounded-lg overflow-hidden">
            <button onClick={() => setViewMode('grid')} className={`p-2 ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-gray-500'}`}>
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button onClick={() => setViewMode('list')} className={`p-2 ${viewMode === 'list' ? 'bg-primary text-white' : 'text-gray-500'}`}>
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      {sorted.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl py-20 text-center">
          <Package className="w-12 h-12 text-gray-200 mx-auto mb-3" />
          <p className="text-gray-400">해당 글자로 시작하는 상품이 없습니다.</p>
        </div>
      ) : (
        <div className={viewMode === 'grid' ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4' : 'space-y-3'}>
          {sorted.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition"
            >
              <div className="aspect-square bg-gray-100 flex items-center justify-center">
                <Package className="w-12 h-12 text-gray-300 group-hover:text-primary/40 transition" />
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-gray-800 line-clamp-2 group-hover:text-primary transition min-h-[2.5rem]">
                  {product.name}
                </p>
                <p className="text-xs text-gray-400 mt-1">{product.brand}</p>
                <p className="text-sm font-bold text-primary mt-1">
                  {formatPrice(product.options[0]?.consumerPrice || 0)}원
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="container-custom py-8">로딩 중...</div>}>
      <ProductListInner />
    </Suspense>
  )
}
