'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { CreditCard, Package, CheckCircle, ShieldCheck } from 'lucide-react'
import { useCartStore } from '@/store/cart-store'
import { useAuthStore } from '@/store/auth-store'
import { products } from '@/data/products'
import { getPrice, getPriceLabel } from '@/lib/pricing'
import { formatPrice } from '@/lib/utils'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, clearCart } = useCartStore()
  const user = useAuthStore((s) => s.user)
  const [orderComplete, setOrderComplete] = useState(false)
  const [form, setForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: '',
    addressDetail: '',
    memo: '',
    paymentMethod: 'card',
  })

  const cartDetails = items.map((item) => {
    const product = products.find((p) => p.id === item.productId)
    const option = product?.options.find((o) => o.id === item.optionId)
    if (!product || !option) return null
    const price = getPrice(option, user?.role ?? null)
    return { ...item, product, option, price, total: price * item.quantity }
  }).filter(Boolean) as any[]

  const totalAmount = cartDetails.reduce((sum: number, item: any) => sum + item.total, 0)
  const shippingFee = totalAmount >= 100000 ? 0 : 3000

  const handleOrder = () => {
    if (!form.name || !form.phone || !form.address) {
      alert('필수 정보를 입력해주세요.')
      return
    }
    setOrderComplete(true)
    clearCart()
  }

  if (orderComplete) {
    return (
      <div className="container-custom py-20 text-center">
        <CheckCircle className="w-20 h-20 text-success mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">주문이 완료되었습니다!</h1>
        <p className="text-gray-500 mb-6">주문해주셔서 감사합니다. 빠른 시일 내에 배송해 드리겠습니다.</p>
        <div className="bg-gray-50 rounded-xl p-6 max-w-md mx-auto mb-6 text-left">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-gray-500">주문번호</span><span className="font-mono font-medium">JL-{Date.now().toString().slice(-8)}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">결제금액</span><span className="font-bold text-primary">{formatPrice(totalAmount + shippingFee)}원</span></div>
            <div className="flex justify-between"><span className="text-gray-500">결제방법</span><span>{form.paymentMethod === 'card' ? '카드결제' : form.paymentMethod === 'bank' ? '계좌이체' : '가상계좌'}</span></div>
          </div>
        </div>
        <div className="flex gap-3 justify-center">
          <Link href="/mypage" className="btn-outline">주문 내역 보기</Link>
          <Link href="/" className="btn-primary">쇼핑 계속하기</Link>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="container-custom py-20 text-center">
        <p className="text-gray-500 mb-4">주문할 상품이 없습니다.</p>
        <Link href="/products" className="btn-primary inline-block">쇼핑하러 가기</Link>
      </div>
    )
  }

  return (
    <div className="container-custom py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">주문/결제</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-primary" />
              주문 상품
            </h2>
            <div className="space-y-3">
              {cartDetails.map((item: any) => (
                <div key={`${item.productId}-${item.optionId}`} className="flex items-center gap-3 pb-3 border-b border-gray-100 last:border-0">
                  <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                    <Package className="w-5 h-5 text-gray-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 line-clamp-1">{item.product.name}</p>
                    <p className="text-xs text-gray-500">{item.option.name} x {item.quantity}</p>
                  </div>
                  <p className="text-sm font-bold text-gray-900 shrink-0">{formatPrice(item.total)}원</p>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Info */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h2 className="text-lg font-bold text-gray-900 mb-4">배송 정보</h2>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">받는 분 *</label>
                  <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">연락처 *</label>
                  <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">주소 *</label>
                <input type="text" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm" placeholder="주소를 입력하세요" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">상세 주소</label>
                <input type="text" value={form.addressDetail} onChange={(e) => setForm({ ...form, addressDetail: e.target.value })} className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">배송 메모</label>
                <select value={form.memo} onChange={(e) => setForm({ ...form, memo: e.target.value })} className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm">
                  <option value="">배송 메모를 선택하세요</option>
                  <option>부재 시 경비실에 맡겨주세요</option>
                  <option>문 앞에 놓아주세요</option>
                  <option>배송 전 연락 부탁드립니다</option>
                  <option>직접 입력</option>
                </select>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-primary" />
              결제 방법
            </h2>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'card', label: '카드결제' },
                { value: 'bank', label: '계좌이체' },
                { value: 'virtual', label: '가상계좌' },
              ].map((method) => (
                <button
                  key={method.value}
                  onClick={() => setForm({ ...form, paymentMethod: method.value })}
                  className={`p-3 rounded-lg border-2 text-sm font-medium text-center transition ${
                    form.paymentMethod === method.value ? 'border-primary bg-primary-light text-primary' : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {method.label}
                </button>
              ))}
            </div>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <p className="text-xs text-gray-600">토스페이먼츠 테스트 모드로 결제됩니다. 실제 결제는 진행되지 않습니다.</p>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-white border border-gray-200 rounded-xl p-5 sticky top-24">
            <h3 className="text-lg font-bold text-gray-900 mb-4">결제 금액</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">상품 금액</span><span>{formatPrice(totalAmount)}원</span></div>
              <div className="flex justify-between"><span className="text-gray-500">배송비</span><span>{shippingFee === 0 ? '무료' : `${formatPrice(shippingFee)}원`}</span></div>
              <hr />
              <div className="flex justify-between text-base"><span className="font-bold">총 결제 금액</span><span className="font-bold text-primary text-lg">{formatPrice(totalAmount + shippingFee)}원</span></div>
              <p className="text-xs text-gray-400">({getPriceLabel(user?.role ?? null)} 기준)</p>
            </div>
            <button onClick={handleOrder} className="w-full btn-accent mt-4 h-12 text-base">{formatPrice(totalAmount + shippingFee)}원 결제하기</button>
            <p className="text-xs text-gray-400 text-center mt-3">주문 내용을 확인하였으며, 결제에 동의합니다.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
