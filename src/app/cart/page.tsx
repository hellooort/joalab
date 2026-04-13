'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Trash2, Minus, Plus, ShoppingCart, Package, FileText } from 'lucide-react'
import { useCartStore } from '@/store/cart-store'
import { useAuthStore } from '@/store/auth-store'
import { products } from '@/data/products'
import { getPrice, getPriceLabel, getVisiblePrices } from '@/lib/pricing'
import { formatPrice } from '@/lib/utils'
import EstimateModal from '@/components/invoice/EstimateModal'
import type { EstimateItem } from '@/components/invoice/EstimateModal'

export default function CartPage() {
  const router = useRouter()
  const { items, removeItem, updateQuantity, clearCart } = useCartStore()
  const user = useAuthStore((s) => s.user)
  const [showEstimate, setShowEstimate] = useState(false)

  const cartDetails = items.map((item) => {
    const product = products.find((p) => p.id === item.productId)
    const option = product?.options.find((o) => o.id === item.optionId)
    if (!product || !option) return null
    const price = getPrice(option, user?.role ?? null)
    return { ...item, product, option, price, total: price * item.quantity }
  }).filter((x): x is NonNullable<typeof x> => x !== null)

  const totalAmount = cartDetails.reduce((sum: number, item) => sum + item.total, 0)
  const shippingFee = totalAmount >= 100000 ? 0 : 3000

  if (items.length === 0) {
    return (
      <div className="container-custom py-20 text-center">
        <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-lg text-gray-500 mb-4">장바구니가 비어있습니다.</p>
        <Link href="/products" className="btn-primary inline-block">쇼핑 계속하기</Link>
      </div>
    )
  }

  return (
    <div className="container-custom py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">장바구니</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 text-sm font-medium text-gray-500 grid grid-cols-12 gap-2">
              <span className="col-span-5">상품정보</span>
              <span className="col-span-2 text-center">단가</span>
              <span className="col-span-2 text-center">수량</span>
              <span className="col-span-2 text-right">금액</span>
              <span className="col-span-1"></span>
            </div>
            {cartDetails.map((item: any) => (
              <div key={`${item.productId}-${item.optionId}`} className="px-4 py-4 border-t border-gray-100 grid grid-cols-12 gap-2 items-center">
                <div className="col-span-5 flex items-center gap-3">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                    <Package className="w-6 h-6 text-gray-300" />
                  </div>
                  <div className="min-w-0">
                    <Link href={`/products/${item.product.id}`} className="text-sm font-medium text-gray-800 hover:text-primary line-clamp-1">{item.product.name}</Link>
                    <p className="text-xs text-gray-500 mt-0.5">{item.option.name}</p>
                  </div>
                </div>
                <div className="col-span-2 text-center text-sm font-medium">{formatPrice(item.price)}원</div>
                <div className="col-span-2 flex items-center justify-center gap-1">
                  <button onClick={() => updateQuantity(item.productId, item.optionId, item.quantity - 1)} className="w-7 h-7 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50">
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-8 text-center text-sm">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.productId, item.optionId, item.quantity + 1)} className="w-7 h-7 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50">
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
                <div className="col-span-2 text-right text-sm font-bold text-primary">{formatPrice(item.total)}원</div>
                <div className="col-span-1 text-right">
                  <button onClick={() => removeItem(item.productId, item.optionId)} className="text-gray-400 hover:text-accent p-1">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-3">
            <button onClick={clearCart} className="text-sm text-gray-500 hover:text-accent">전체 삭제</button>
            <Link href="/products" className="text-sm text-primary hover:underline">쇼핑 계속하기</Link>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-white border border-gray-200 rounded-xl p-5 sticky top-24">
            <h3 className="text-lg font-bold text-gray-900 mb-4">주문 요약</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">상품 금액</span>
                <span className="font-medium">{formatPrice(totalAmount)}원</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">배송비</span>
                <span className="font-medium">{shippingFee === 0 ? '무료' : `${formatPrice(shippingFee)}원`}</span>
              </div>
              {shippingFee > 0 && (
                <p className="text-xs text-gray-400">100,000원 이상 주문 시 무료배송</p>
              )}
              <hr />
              <div className="flex justify-between text-base">
                <span className="font-bold text-gray-900">결제 예정 금액</span>
                <span className="font-bold text-primary text-lg">{formatPrice(totalAmount + shippingFee)}원</span>
              </div>
              <p className="text-xs text-gray-400">({getPriceLabel(user?.role ?? null)} 기준)</p>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => router.push('/checkout')}
                className="flex-1 btn-primary h-12 text-base"
              >
                주문하기
              </button>
              <button
                onClick={() => setShowEstimate(true)}
                className="flex-1 h-12 text-base font-semibold rounded-lg border-2 border-[#1a56db] text-[#1a56db] hover:bg-[#1a56db] hover:text-white transition flex items-center justify-center gap-1.5"
              >
                <FileText className="w-4 h-4" />
                견적서
              </button>
            </div>
          </div>
        </div>
      </div>

      {showEstimate && (
        <EstimateModal
          items={cartDetails.map((item) => ({
            name: item.product.name,
            option: item.option.name,
            quantity: item.quantity,
            unitPrice: item.price,
            totalPrice: item.total,
          }))}
          shippingFee={shippingFee}
          onClose={() => setShowEstimate(false)}
        />
      )}
    </div>
  )
}
