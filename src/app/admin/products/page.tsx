'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Search, Edit, Trash2, Eye, Package, ChevronDown, ChevronUp, Save, X } from 'lucide-react'
import { products } from '@/data/products'
import { formatPrice } from '@/lib/utils'
import { categories } from '@/data/categories'

export default function AdminProductsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCat, setSelectedCat] = useState('')
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null)
  const [editingOption, setEditingOption] = useState<string | null>(null)
  const [editValues, setEditValues] = useState<Record<string, { consumer: number; business: number; dealer: number; stock: number }>>({})

  const filtered = products.filter((p) => {
    if (selectedCat && p.category !== selectedCat) return false
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase()) && !p.code.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const toggleExpand = (productId: string) => {
    setExpandedProduct(expandedProduct === productId ? null : productId)
    setEditingOption(null)
  }

  const startEdit = (optId: string, opt: { consumerPrice: number; businessPrice: number; dealerPrice: number; stock: number }) => {
    setEditingOption(optId)
    setEditValues(prev => ({
      ...prev,
      [optId]: { consumer: opt.consumerPrice, business: opt.businessPrice, dealer: opt.dealerPrice, stock: opt.stock },
    }))
  }

  const handleSave = (optId: string) => {
    setEditingOption(null)
    alert('저장되었습니다. (데모)')
  }

  const updateVal = (optId: string, field: 'consumer' | 'business' | 'dealer' | 'stock', value: number) => {
    setEditValues(prev => ({
      ...prev,
      [optId]: { ...prev[optId], [field]: value },
    }))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">상품 관리</h1>
          <p className="text-sm text-gray-500 mt-1">상품 정보, 가격(소비자/업체/대리점), 재고를 통합 관리합니다</p>
        </div>
        <button onClick={() => alert('상품 등록 화면이 열립니다. (데모)')} className="btn-primary flex items-center gap-1">
          <Plus className="w-4 h-4" />
          상품 등록
        </button>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mb-4 text-xs">
        <span className="flex items-center gap-1"><span className="w-3 h-3 bg-gray-800 rounded" /> 일반고객가</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 bg-primary rounded" /> 사업자가</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 bg-accent rounded" /> 대리점가</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 bg-success rounded" /> 재고</span>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="상품명 또는 코드 검색..."
            className="w-full h-10 pl-10 pr-4 border border-gray-300 rounded-lg text-sm"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
        <select
          value={selectedCat}
          onChange={(e) => setSelectedCat(e.target.value)}
          className="h-10 px-3 border border-gray-300 rounded-lg text-sm"
        >
          <option value="">전체 카테고리</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.slug}>{cat.name}</option>
          ))}
        </select>
      </div>

      {/* Product List */}
      <div className="space-y-3">
        {filtered.map((product) => {
          const totalStock = product.options.reduce((sum, o) => sum + o.stock, 0)
          const isExpanded = expandedProduct === product.id

          return (
            <div key={product.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              {/* Product Summary Row */}
              <div
                className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 transition"
                onClick={() => toggleExpand(product.id)}
              >
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                  <Package className="w-5 h-5 text-gray-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-gray-400">{product.code}</span>
                    {product.isNew && <span className="badge badge-new text-[8px]">NEW</span>}
                    {product.isBest && <span className="badge badge-hot text-[8px]">BEST</span>}
                  </div>
                  <p className="text-sm font-semibold text-gray-900 line-clamp-1">{product.name}</p>
                </div>
                <div className="hidden md:flex items-center gap-6 shrink-0 text-xs">
                  <div className="text-center">
                    <p className="text-gray-400">브랜드</p>
                    <p className="font-medium text-gray-700">{product.brand}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400">카테고리</p>
                    <p className="font-medium text-gray-700">{categories.find(c => c.slug === product.category)?.name || product.category}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400">옵션</p>
                    <p className="font-medium text-gray-700">{product.options.length}개</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400">총 재고</p>
                    <p className={`font-bold ${totalStock > 0 ? 'text-success' : 'text-accent'}`}>{totalStock}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400">일반고객가</p>
                    <p className="font-bold text-gray-900">{formatPrice(product.options[0]?.consumerPrice || 0)}원~</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Link
                    href={`/products/${product.id}`}
                    className="p-1.5 text-gray-400 hover:text-primary rounded transition"
                    title="미리보기"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                  <button className="p-1.5 text-gray-400 hover:text-accent rounded transition" title="삭제" onClick={(e) => { e.stopPropagation(); alert('삭제 (데모)') }}>
                    <Trash2 className="w-4 h-4" />
                  </button>
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </div>
              </div>

              {/* Expanded: Option Detail Table */}
              {isExpanded && (
                <div className="border-t border-gray-200 animate-fadeIn">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200 text-gray-500">
                        <th className="px-4 py-2.5 text-left font-medium w-32">Model코드</th>
                        <th className="px-4 py-2.5 text-left font-medium">옵션명</th>
                        <th className="px-4 py-2.5 text-center font-medium w-16">단위</th>
                        <th className="px-4 py-2.5 text-right font-medium w-24">
                          <span className="flex items-center justify-end gap-1"><span className="w-2 h-2 bg-gray-800 rounded" />일반고객가</span>
                        </th>
                        <th className="px-4 py-2.5 text-right font-medium w-24">
                          <span className="flex items-center justify-end gap-1"><span className="w-2 h-2 bg-primary rounded" />사업자가</span>
                        </th>
                        <th className="px-4 py-2.5 text-right font-medium w-24">
                          <span className="flex items-center justify-end gap-1"><span className="w-2 h-2 bg-accent rounded" />대리점가</span>
                        </th>
                        <th className="px-4 py-2.5 text-center font-medium w-20">
                          <span className="flex items-center justify-center gap-1"><span className="w-2 h-2 bg-success rounded" />재고</span>
                        </th>
                        <th className="px-4 py-2.5 text-center font-medium w-24">관리</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {product.options.map((opt) => {
                        const isEditing = editingOption === opt.id
                        const vals = editValues[opt.id] || { consumer: opt.consumerPrice, business: opt.businessPrice, dealer: opt.dealerPrice, stock: opt.stock }

                        return (
                          <tr key={opt.id} className={`transition ${isEditing ? 'bg-blue-50' : 'hover:bg-gray-50'}`}>
                            <td className="px-4 py-2.5 font-mono text-gray-500">{opt.modelCode}</td>
                            <td className="px-4 py-2.5 text-gray-800 font-medium">{opt.name}</td>
                            <td className="px-4 py-2.5 text-center text-gray-500">{opt.unit}</td>

                            {isEditing ? (
                              <>
                                <td className="px-4 py-2.5 text-right">
                                  <input type="number" value={vals.consumer} onChange={(e) => updateVal(opt.id, 'consumer', Number(e.target.value))} className="w-full h-7 text-right border border-gray-300 rounded px-2 text-xs" />
                                </td>
                                <td className="px-4 py-2.5 text-right">
                                  <input type="number" value={vals.business} onChange={(e) => updateVal(opt.id, 'business', Number(e.target.value))} className="w-full h-7 text-right border border-blue-300 rounded px-2 text-xs" />
                                </td>
                                <td className="px-4 py-2.5 text-right">
                                  <input type="number" value={vals.dealer} onChange={(e) => updateVal(opt.id, 'dealer', Number(e.target.value))} className="w-full h-7 text-right border border-red-300 rounded px-2 text-xs" />
                                </td>
                                <td className="px-4 py-2.5 text-center">
                                  <input type="number" value={vals.stock} onChange={(e) => updateVal(opt.id, 'stock', Number(e.target.value))} className="w-16 h-7 text-center border border-green-300 rounded px-1 text-xs mx-auto" />
                                </td>
                                <td className="px-4 py-2.5">
                                  <div className="flex items-center justify-center gap-1">
                                    <button onClick={() => handleSave(opt.id)} className="p-1 text-primary hover:bg-primary-light rounded transition" title="저장">
                                      <Save className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => setEditingOption(null)} className="p-1 text-gray-400 hover:bg-gray-100 rounded transition" title="취소">
                                      <X className="w-4 h-4" />
                                    </button>
                                  </div>
                                </td>
                              </>
                            ) : (
                              <>
                                <td className="px-4 py-2.5 text-right font-semibold text-gray-800">{formatPrice(opt.consumerPrice)}원</td>
                                <td className="px-4 py-2.5 text-right font-semibold text-primary">{formatPrice(opt.businessPrice)}원</td>
                                <td className="px-4 py-2.5 text-right font-semibold text-accent">{formatPrice(opt.dealerPrice)}원</td>
                                <td className="px-4 py-2.5 text-center">
                                  <span className={`font-bold ${opt.stock > 0 ? 'text-success' : 'text-accent'}`}>
                                    {opt.stock > 0 ? opt.stock : '품절'}
                                  </span>
                                </td>
                                <td className="px-4 py-2.5 text-center">
                                  <button onClick={() => startEdit(opt.id, opt)} className="p-1 text-gray-400 hover:text-primary rounded transition" title="수정">
                                    <Edit className="w-4 h-4" />
                                  </button>
                                </td>
                              </>
                            )}
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="text-center mt-4 text-sm text-gray-500">
        총 {filtered.length}개 상품
      </div>
    </div>
  )
}
