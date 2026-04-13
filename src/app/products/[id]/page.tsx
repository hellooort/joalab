'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ShoppingCart, Heart, ChevronRight, Package, Minus, Plus, Truck, RotateCcw, Headphones, X } from 'lucide-react'
import { products } from '@/data/products'
import { useAuthStore } from '@/store/auth-store'
import { useCartStore } from '@/store/cart-store'
import { useWishlistStore } from '@/store/wishlist-store'
import { getVisiblePrices } from '@/lib/pricing'
import { formatPrice } from '@/lib/utils'

interface SelectedOption {
  optionId: string
  quantity: number
}

const DETAIL_TABS = ['상품설명', '배송정보', '사용후기', '상품문의']

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const user = useAuthStore((s) => s.user)
  const addItem = useCartStore((s) => s.addItem)
  const { isWished, toggleItem } = useWishlistStore()
  const product = products.find((p) => p.id === params.id)
  const [selectedOptions, setSelectedOptions] = useState<SelectedOption[]>([])
  const [activeTab, setActiveTab] = useState(0)

  useEffect(() => {
    if (!product) return
    try {
      const stored = JSON.parse(localStorage.getItem('joalab-recent') || '[]')
      const filtered = stored.filter((p: { id: string }) => p.id !== product.id)
      filtered.unshift({ id: product.id, name: product.name })
      localStorage.setItem('joalab-recent', JSON.stringify(filtered.slice(0, 10)))
    } catch {}
  }, [product])

  if (!product) {
    return (
      <div className="container-custom py-20 text-center">
        <p className="text-gray-500">상품을 찾을 수 없습니다.</p>
        <Link href="/products" className="btn-primary mt-4 inline-block">상품 목록으로</Link>
      </div>
    )
  }

  const visiblePrices = getVisiblePrices(user?.role ?? null)
  const priceKey = visiblePrices[visiblePrices.length - 1].key

  const handleSelectOption = (optionId: string) => {
    if (selectedOptions.some((s) => s.optionId === optionId)) return
    setSelectedOptions((prev) => [...prev, { optionId, quantity: 1 }])
  }

  const handleRemoveOption = (optionId: string) => {
    setSelectedOptions((prev) => prev.filter((s) => s.optionId !== optionId))
  }

  const handleChangeQuantity = (optionId: string, qty: number) => {
    if (qty < 1) return
    setSelectedOptions((prev) => prev.map((s) => s.optionId === optionId ? { ...s, quantity: qty } : s))
  }

  const totalAmount = selectedOptions.reduce((sum, sel) => {
    const opt = product.options.find((o) => o.id === sel.optionId)
    return sum + (opt ? opt[priceKey] * sel.quantity : 0)
  }, 0)

  const handleAddToCart = () => {
    if (selectedOptions.length === 0) {
      alert('옵션을 선택해주세요.')
      return
    }
    selectedOptions.forEach((sel) => {
      addItem({ productId: product.id, optionId: sel.optionId, quantity: sel.quantity })
    })
    if (confirm('장바구니에 추가되었습니다. 장바구니로 이동하시겠습니까?')) {
      router.push('/cart')
    }
  }

  const handleBuyNow = () => {
    if (selectedOptions.length === 0) {
      alert('옵션을 선택해주세요.')
      return
    }
    selectedOptions.forEach((sel) => {
      addItem({ productId: product.id, optionId: sel.optionId, quantity: sel.quantity })
    })
    router.push('/checkout')
  }

  return (
    <div className="container-custom py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-primary">홈</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/products" className="hover:text-primary">상품</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href={`/products?category=${product.category}`} className="hover:text-primary">
          {product.category}
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-600">{product.name}</span>
      </nav>

      {/* Product Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Image */}
        <div>
          <div className="aspect-square bg-gray-100 rounded-xl flex items-center justify-center">
            <Package className="w-32 h-32 text-gray-300" />
          </div>
        </div>

        {/* Details */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
          <div className="flex items-center gap-2 mb-4">
            {product.tags.map((tag) => (
              <span key={tag} className={`badge ${tag === '인기' ? 'badge-hot' : tag === '당일출고' ? 'badge-ship' : 'badge-new'}`}>
                {tag}
              </span>
            ))}
          </div>

          <div className="space-y-2 text-sm border-t border-b border-gray-200 py-4 mb-4">
            <div className="flex"><span className="w-20 text-gray-500 font-medium">제품코드</span><span className="font-semibold">{product.code}</span></div>
            <div className="flex"><span className="w-20 text-gray-500 font-medium">브랜드</span><span>{product.brand}</span></div>
            <div className="flex"><span className="w-20 text-gray-500 font-medium">제조국</span><span>{product.origin}</span></div>
            <div className="flex"><span className="w-20 text-gray-500 font-medium">리드타임</span><span className="text-gray-600">{product.leadTime}</span></div>
          </div>

          {/* Shipping Condition */}
          <div className="mb-4 bg-blue-50 border border-blue-100 rounded-lg p-3 text-sm">
            <div className="flex items-center gap-2 mb-1">
              <Truck className="w-4 h-4 text-primary" />
              <span className="font-bold text-gray-800">배송비 조건</span>
            </div>
            <ul className="text-xs text-gray-600 space-y-0.5 ml-6">
              <li>• 기본배송비: <strong className="text-primary">3,500원</strong> (주문 금액 100,000원 이상 무료배송)</li>
              <li>• 제주/도서산간 지역: 추가 운임비 발생</li>
              <li>• 평균 1~3일 이내 발송 (주말 및 공휴일 제외)</li>
            </ul>
          </div>

          {/* Options Table */}
          <div className="mb-4">
            <h3 className="text-sm font-bold text-gray-900 mb-2">상품 옵션 <span className="text-xs font-normal text-gray-400 ml-1">(클릭하여 선택, 여러 옵션 동시 선택 가능)</span></h3>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full text-xs">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left font-medium text-gray-500">Model/코드</th>
                    <th className="px-3 py-2 text-left font-medium text-gray-500">제품명</th>
                    {visiblePrices.map((vp) => (
                      <th key={vp.key} className="px-3 py-2 text-right font-medium text-gray-500">{vp.label}</th>
                    ))}
                    <th className="px-3 py-2 text-center font-medium text-gray-500">재고</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {product.options.map((opt) => {
                    const isSelected = selectedOptions.some((s) => s.optionId === opt.id)
                    return (
                      <tr
                        key={opt.id}
                        className={`cursor-pointer transition hover:bg-blue-50 ${isSelected ? 'bg-blue-50 ring-1 ring-inset ring-primary/30' : ''}`}
                        onClick={() => handleSelectOption(opt.id)}
                      >
                        <td className="px-3 py-2 font-mono text-gray-600">{opt.modelCode}</td>
                        <td className="px-3 py-2 text-gray-800">
                          {opt.name}
                          {isSelected && <span className="ml-1.5 inline-block w-1.5 h-1.5 bg-primary rounded-full align-middle" />}
                        </td>
                        {visiblePrices.map((vp) => (
                          <td key={vp.key} className={`px-3 py-2 text-right font-semibold ${vp.key === 'dealerPrice' ? 'price-dealer' : vp.key === 'businessPrice' ? 'price-business' : 'price-consumer'}`}>
                            {formatPrice(opt[vp.key])}원
                          </td>
                        ))}
                        <td className="px-3 py-2 text-center">
                          {opt.stock > 0 ? (
                            <span className="text-success font-medium">{opt.stock}</span>
                          ) : (
                            <span className="text-accent font-medium badge badge-hot">품절</span>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Selected Options List */}
          {selectedOptions.length > 0 && (
            <div className="space-y-2 mb-4 animate-fadeIn">
              {selectedOptions.map((sel) => {
                const opt = product.options.find((o) => o.id === sel.optionId)
                if (!opt) return null
                const unitPrice = opt[priceKey]
                return (
                  <div key={sel.optionId} className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-800 font-medium truncate">{opt.name}</p>
                        <p className="text-xs text-gray-400 font-mono">{opt.modelCode}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button onClick={() => handleChangeQuantity(sel.optionId, sel.quantity - 1)} className="w-7 h-7 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100">
                          <Minus className="w-3 h-3" />
                        </button>
                        <input
                          type="number"
                          value={sel.quantity}
                          onChange={(e) => handleChangeQuantity(sel.optionId, Math.max(1, parseInt(e.target.value) || 1))}
                          className="w-12 h-7 text-center border border-gray-300 rounded text-sm"
                        />
                        <button onClick={() => handleChangeQuantity(sel.optionId, sel.quantity + 1)} className="w-7 h-7 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100">
                          <Plus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-bold text-primary w-24 text-right">{formatPrice(unitPrice * sel.quantity)}원</span>
                        <button onClick={() => handleRemoveOption(sel.optionId)} className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-accent hover:bg-gray-100 rounded transition">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
              <div className="flex items-center justify-between px-1 pt-2 border-t border-gray-200">
                <span className="text-sm font-medium text-gray-700">총 {selectedOptions.reduce((n, s) => n + s.quantity, 0)}개 상품</span>
                <span className="text-xl font-bold text-primary">{formatPrice(totalAmount)}원</span>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={() => toggleItem(product.id)}
              className={`flex items-center gap-1 shrink-0 px-3 py-2 rounded-lg border transition ${isWished(product.id) ? 'bg-red-50 border-red-200 text-accent' : 'btn-outline'}`}
              title="찜하기"
            >
              <Heart className={`w-4 h-4 ${isWished(product.id) ? 'fill-current' : ''}`} />
            </button>
            <button onClick={handleAddToCart} className="btn-outline flex-1 flex items-center justify-center gap-1">
              <ShoppingCart className="w-4 h-4" />
              장바구니
            </button>
            <button onClick={handleBuyNow} className="btn-primary flex-1">
              바로 구매
            </button>
          </div>
        </div>
      </div>

      {/* Detail Tabs */}
      <div className="border-t border-gray-200">
        <div className="flex">
          {DETAIL_TABS.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`flex-1 py-3 text-sm font-medium text-center border-b-2 transition ${
                activeTab === i ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="py-8">
          {activeTab === 0 && (
            <div className="prose max-w-none">
              <h3 className="text-lg font-bold mb-4">상품 설명</h3>
              <p className="text-gray-600">{product.description}</p>
            </div>
          )}
          {activeTab === 1 && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold flex items-center gap-2"><Truck className="w-5 h-5 text-primary" /> 배송정보</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <h4 className="font-semibold text-gray-800">배송 안내</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• 기본배송: 평균 1~3일 이내 발송 (주말 및 공휴일 제외)</li>
                    <li>• 당일발송: 평일(월~금) 오후 3시 이전 주문 및 결제 완료 건</li>
                    <li>• 토/일/공휴일 주문: 다음 영업일 기준 재고 분에 한하여 상품 출고</li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <h4 className="font-semibold text-gray-800">배송 비용</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• 개인고객: 주문 금액 100,000원 이상 무료배송</li>
                    <li>• 딜러고객: 주문자 배송비 부담</li>
                    <li>• 제주 및 도서 산간 지역: 추가 운임비 발생</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-bold flex items-center gap-2 mb-4"><RotateCcw className="w-5 h-5 text-primary" /> 반품/교환/환불</h3>
                <div className="bg-gray-50 rounded-lg p-4 text-sm space-y-2 text-gray-600">
                  <p><strong>교환 및 반품이 가능한 경우:</strong></p>
                  <ul className="space-y-1 ml-4">
                    <li>- 상품 배송 완료 후, 14일 이내에 하자가 없는 경우</li>
                    <li>- 포장상태에 이상이 없고, 사용흔적이 없으며, 재판매가 가능한 경우</li>
                  </ul>
                  <p className="mt-2"><strong>교환 및 반품이 불가능한 경우:</strong></p>
                  <ul className="space-y-1 ml-4">
                    <li>- 반품 요청 기간이 지난 경우</li>
                    <li>- 포장을 개봉하였거나 포장 및 제품이 훼손된 경우</li>
                    <li>- 고객의 주문에 의해 제작되는 주문제작의 경우</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-bold flex items-center gap-2 mb-4"><Headphones className="w-5 h-5 text-primary" /> A/S 안내</h3>
                <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
                  <p>JoaLab에서 구매하신 기기 고장 및 불량이 의심될 경우 사전접수 후 A/S가 가능합니다.</p>
                  <p className="mt-2"><strong>A/S절차:</strong> A/S접수 → 수리제품발송 → 상태및견적확인 → 수리진행 → 임금확인후발송</p>
                  <p className="mt-2">• 무상 A/S: 당사에서 제품 구매 후 초기 불량이 확인 될 경우 무상수리 또는 새제품 교환 가능</p>
                  <p>• 유상 A/S: 부품교체 및 고객님의 부주의로 인한 파손 시 비용 발생 가능</p>
                </div>
              </div>
            </div>
          )}
          {activeTab === 2 && (
            <div className="text-center py-12 text-gray-400">
              <p>등록된 사용후기가 없습니다.</p>
            </div>
          )}
          {activeTab === 3 && (
            <div className="text-center py-12 text-gray-400">
              <p>등록된 상품문의가 없습니다.</p>
              <button onClick={() => alert('상품문의가 등록되었습니다. (데모)')} className="btn-primary mt-4">문의하기</button>
            </div>
          )}
        </div>
      </div>
      {/* Related Products */}
      {(() => {
        const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)
        if (related.length === 0) return null
        return (
          <div className="border-t border-gray-200 pt-8 mt-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">관련 상품</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((rp) => (
                <Link key={rp.id} href={`/products/${rp.id}`} className="group border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition">
                  <div className="aspect-square bg-gray-100 flex items-center justify-center">
                    <Package className="w-12 h-12 text-gray-300 group-hover:text-primary/40 transition" />
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-medium text-gray-800 line-clamp-2 group-hover:text-primary transition">{rp.name}</p>
                    <p className="text-xs text-gray-400 mt-1">{rp.brand}</p>
                    <p className="text-sm font-bold text-primary mt-1">{formatPrice(rp.options[0]?.consumerPrice || 0)}원</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )
      })()}
    </div>
  )
}
