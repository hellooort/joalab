'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Package, Search } from 'lucide-react'
import { products } from '@/data/products'
import { formatPrice } from '@/lib/utils'

const ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

const KOREAN_TABS = [
  { label: '가', start: 0xAC00, end: 0xB097 },
  { label: '나', start: 0xB098, end: 0xB2E3 },
  { label: '다', start: 0xB2E4, end: 0xB77B },
  { label: '라', start: 0xB77C, end: 0xB9C7 },
  { label: '마', start: 0xB9C8, end: 0xBC13 },
  { label: '바', start: 0xBC14, end: 0xC0AB },
  { label: '사', start: 0xC0AC, end: 0xC543 },
  { label: '아', start: 0xC544, end: 0xC9DB },
  { label: '자', start: 0xC9DC, end: 0xCC27 },
  { label: '차', start: 0xCC28, end: 0xCE73 },
  { label: '카', start: 0xCE74, end: 0xD0BF },
  { label: '타', start: 0xD0C0, end: 0xD30B },
  { label: '파', start: 0xD30C, end: 0xD557 },
  { label: '하', start: 0xD558, end: 0xD7A3 },
]

function getKoreanGroup(char: string): string {
  const code = char.charCodeAt(0)
  if (code < 0xAC00 || code > 0xD7A3) return ''
  for (const tab of KOREAN_TABS) {
    if (code >= tab.start && code <= tab.end) return tab.label
  }
  return ''
}

type Mode = 'alpha' | 'korean'

export default function SearchPage() {
  const [mode, setMode] = useState<Mode>('alpha')
  const [selectedAlpha, setSelectedAlpha] = useState<string>('A')
  const [selectedKorean, setSelectedKorean] = useState<string>('가')

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const first = p.name.charAt(0).toUpperCase()
      if (mode === 'alpha') {
        return first === selectedAlpha
      } else {
        return getKoreanGroup(p.name.charAt(0)) === selectedKorean
      }
    })
  }, [mode, selectedAlpha, selectedKorean])

  const alphaCountMap = useMemo(() => {
    const map: Record<string, number> = {}
    ALPHA.forEach((a) => { map[a] = 0 })
    products.forEach((p) => {
      const first = p.name.charAt(0).toUpperCase()
      if (/[A-Z]/.test(first) && map[first] !== undefined) map[first]++
    })
    return map
  }, [])

  const koreanCountMap = useMemo(() => {
    const map: Record<string, number> = {}
    KOREAN_TABS.forEach((t) => { map[t.label] = 0 })
    products.forEach((p) => {
      const group = getKoreanGroup(p.name.charAt(0))
      if (group && map[group] !== undefined) map[group]++
    })
    return map
  }, [])

  return (
    <div className="container-custom py-8">
      <div className="flex items-center gap-2 mb-6">
        <Search className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-bold text-gray-900">알파벳/가나다 검색</h1>
      </div>

      {/* Mode Toggle */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setMode('alpha')}
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition ${mode === 'alpha' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
        >
          A ~ Z (영문)
        </button>
        <button
          onClick={() => setMode('korean')}
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition ${mode === 'korean' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
        >
          가 ~ 하 (한글)
        </button>
      </div>

      {/* Alpha Tabs */}
      {mode === 'alpha' && (
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
      )}

      {/* Korean Tabs */}
      {mode === 'korean' && (
        <div className="flex flex-wrap gap-1.5 mb-6 bg-white border border-gray-200 rounded-xl p-3">
          {KOREAN_TABS.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setSelectedKorean(tab.label)}
              className={`w-11 h-11 text-sm font-bold rounded-lg transition ${
                selectedKorean === tab.label
                  ? 'bg-primary text-white shadow-sm'
                  : koreanCountMap[tab.label] > 0
                    ? 'bg-gray-50 text-gray-700 hover:bg-primary/10 hover:text-primary'
                    : 'bg-gray-50 text-gray-300 cursor-default'
              }`}
              disabled={koreanCountMap[tab.label] === 0}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* Results */}
      <div className="mb-2 text-sm text-gray-500">
        <span className="font-bold text-primary">{mode === 'alpha' ? selectedAlpha : selectedKorean}</span>
        {' '}(으)로 시작하는 상품 <span className="font-semibold text-gray-900">{filtered.length}개</span>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl py-20 text-center">
          <Package className="w-12 h-12 text-gray-200 mx-auto mb-3" />
          <p className="text-gray-400">해당 글자로 시작하는 상품이 없습니다.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filtered.map((product) => (
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
