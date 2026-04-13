'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Tag, ChevronRight, Package } from 'lucide-react'
import { brands } from '@/data/brands'

const ALPHA_GROUPS = [
  { label: 'ABC', letters: ['A', 'B', 'C'] },
  { label: 'DEF', letters: ['D', 'E', 'F'] },
  { label: 'GHI', letters: ['G', 'H', 'I'] },
  { label: 'JKL', letters: ['J', 'K', 'L'] },
  { label: 'MNO', letters: ['M', 'N', 'O'] },
  { label: 'PQR', letters: ['P', 'Q', 'R'] },
  { label: 'STU', letters: ['S', 'T', 'U'] },
  { label: 'VWX', letters: ['V', 'W', 'X'] },
  { label: 'YZ', letters: ['Y', 'Z'] },
]

export default function BrandPage() {
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null)

  const brandsByGroup = useMemo(() => {
    const map: Record<string, typeof brands> = {}
    ALPHA_GROUPS.forEach((g) => { map[g.label] = [] })
    brands.forEach((b) => {
      const first = b.name.charAt(0).toUpperCase()
      const group = ALPHA_GROUPS.find((g) => g.letters.includes(first))
      if (group) map[group.label].push(b)
    })
    return map
  }, [])

  const groupCountMap = useMemo(() => {
    const map: Record<string, number> = {}
    ALPHA_GROUPS.forEach((g) => { map[g.label] = brandsByGroup[g.label]?.length ?? 0 })
    return map
  }, [brandsByGroup])

  const visibleGroups = useMemo(() => {
    if (selectedGroup) return [selectedGroup]
    return ALPHA_GROUPS.map((g) => g.label).filter((label) => groupCountMap[label] > 0)
  }, [selectedGroup, groupCountMap])

  return (
    <div className="container-custom py-8">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary transition">홈</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-900 font-medium">브랜드</span>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <Tag className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-bold text-gray-900">브랜드</h1>
      </div>

      {/* Group Tabs: ABC / DEF / GHI ... */}
      <div className="flex flex-wrap gap-2 mb-8 bg-white border border-gray-200 rounded-xl p-3">
        <button
          onClick={() => setSelectedGroup(null)}
          className={`px-4 h-10 text-sm font-bold rounded-lg transition ${
            selectedGroup === null
              ? 'bg-primary text-white shadow-sm'
              : 'bg-gray-50 text-gray-700 hover:bg-primary/10 hover:text-primary'
          }`}
        >
          전체
        </button>
        {ALPHA_GROUPS.map((group) => (
          <button
            key={group.label}
            onClick={() => setSelectedGroup(group.label)}
            className={`px-4 h-10 text-sm font-bold rounded-lg transition ${
              selectedGroup === group.label
                ? 'bg-primary text-white shadow-sm'
                : groupCountMap[group.label] > 0
                  ? 'bg-gray-50 text-gray-700 hover:bg-primary/10 hover:text-primary'
                  : 'bg-gray-50 text-gray-300 cursor-default'
            }`}
            disabled={groupCountMap[group.label] === 0}
          >
            {group.label}
          </button>
        ))}
      </div>

      {/* Brand List grouped, 3 per row */}
      <div className="space-y-8">
        {visibleGroups.map((groupLabel) => {
          const groupBrands = brandsByGroup[groupLabel]
          if (!groupBrands || groupBrands.length === 0) return null

          return (
            <div key={groupLabel}>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 h-10 bg-primary text-white text-base font-bold rounded-lg flex items-center justify-center">
                  {groupLabel}
                </span>
                <span className="text-sm text-gray-500">{groupBrands.length}개 브랜드</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {groupBrands.map((brand) => (
                  <Link
                    key={brand.id}
                    href={`/products?search=${encodeURIComponent(brand.name)}`}
                    className="group flex items-start gap-3 p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md hover:border-primary/30 transition"
                  >
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition">
                      <Package className="w-6 h-6 text-gray-400 group-hover:text-primary transition" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-gray-900 group-hover:text-primary transition">{brand.name}</p>
                      {brand.description && (
                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{brand.description}</p>
                      )}
                      <p className="text-xs text-primary font-medium mt-1">
                        {brand.productCount > 0 ? `${brand.productCount}개 상품` : '준비 중'}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {visibleGroups.length === 0 && (
        <div className="bg-white border border-gray-200 rounded-xl py-20 text-center">
          <Tag className="w-12 h-12 text-gray-200 mx-auto mb-3" />
          <p className="text-gray-400">해당 그룹에 브랜드가 없습니다.</p>
        </div>
      )}
    </div>
  )
}
