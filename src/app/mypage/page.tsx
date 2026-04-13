'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  User, ShoppingBag, Heart, Settings, ChevronRight, Package,
  CreditCard, Truck, CheckCircle, FileText, Star,
  HelpCircle, Trash2
} from 'lucide-react'
import { useAuthStore } from '@/store/auth-store'
import { useWishlistStore } from '@/store/wishlist-store'
import { ORDERS, STATUS_MAP } from '@/data/orders'
import type { OrderData } from '@/data/orders'
import { products } from '@/data/products'
import { getPrice, getVisiblePrices } from '@/lib/pricing'
import { formatPrice } from '@/lib/utils'
import InvoiceModal from '@/components/invoice/InvoiceModal'

type TabKey = 'orders' | 'points' | 'estimates' | 'wishlist' | 'reviews' | 'qna' | 'profile'

const SIDEBAR_MENU: { key: TabKey; icon: any; label: string }[] = [
  { key: 'orders', icon: ShoppingBag, label: '주문배송조회' },
  { key: 'points', icon: CreditCard, label: '적립금내역' },
  { key: 'estimates', icon: FileText, label: '견적서내역' },
  { key: 'wishlist', icon: Heart, label: '위시리스트' },
  { key: 'reviews', icon: Star, label: '나의상품후기' },
  { key: 'qna', icon: HelpCircle, label: '나의Q&A' },
  { key: 'profile', icon: Settings, label: '회원정보수정' },
]

const ORDER_STEPS = [
  { icon: CreditCard, label: '결제완료', count: 2 },
  { icon: Package, label: '상품준비', count: 1 },
  { icon: Truck, label: '배송중', count: 0 },
  { icon: CheckCircle, label: '배송완료', count: 5 },
]

export default function MyPage() {
  const router = useRouter()
  const { user, isLoggedIn } = useAuthStore()
  const wishlistStore = useWishlistStore()
  const [activeTab, setActiveTab] = useState<TabKey>('orders')
  const [invoiceOrder, setInvoiceOrder] = useState<OrderData | null>(null)

  if (!isLoggedIn || !user) {
    router.push('/auth/login')
    return null
  }

  const roleLabel = { consumer: '일반고객', business: '사업자', dealer: '대리점', admin: '관리자' }[user.role]
  const roleColor = { consumer: 'bg-blue-100 text-blue-700', business: 'bg-green-100 text-green-700', dealer: 'bg-red-100 text-red-700', admin: 'bg-gray-800 text-white' }[user.role]

  const myOrders = ORDERS.filter(o => o.customer === user.name)
  const displayOrders = myOrders.length > 0 ? myOrders : ORDERS.slice(0, 3)

  const visiblePrices = getVisiblePrices(user.role)
  const priceKey = visiblePrices[visiblePrices.length - 1].key

  const wishedProducts = wishlistStore.items
    .map((w) => {
      const p = products.find((prod) => prod.id === w.productId)
      return p ? { product: p, addedAt: w.addedAt } : null
    })
    .filter((x): x is NonNullable<typeof x> => x !== null)

  return (
    <div className="container-custom py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">마이페이지</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-xl p-5 mb-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-gray-400" />
              </div>
              <div>
                <p className="font-bold text-gray-900">{user.name}님</p>
                <span className={`badge text-xs ${roleColor}`}>{roleLabel}</span>
              </div>
            </div>
            <div className="text-xs text-gray-500 space-y-1">
              <p>{user.email}</p>
              {user.phone && <p>{user.phone}</p>}
              {user.company && <p>{user.company}</p>}
            </div>
          </div>

          <nav className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            {SIDEBAR_MENU.map((menu) => (
              <button
                key={menu.key}
                onClick={() => setActiveTab(menu.key)}
                className={`w-full flex items-center justify-between px-4 py-3 text-sm transition border-b border-gray-100 last:border-0 ${
                  activeTab === menu.key ? 'bg-primary-light text-primary font-semibold border-l-4 border-l-primary' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="flex items-center gap-2">
                  <menu.icon className={`w-4 h-4 ${activeTab === menu.key ? 'text-primary' : 'text-gray-400'}`} />
                  {menu.label}
                </span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">

          {/* === 주문배송조회 === */}
          {activeTab === 'orders' && (
            <>
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <h2 className="text-lg font-bold text-gray-900 mb-4">주문 현황</h2>
                <div className="grid grid-cols-4 gap-3">
                  {ORDER_STEPS.map((step) => (
                    <div key={step.label} className="text-center p-3 md:p-4 bg-gray-50 rounded-xl">
                      <step.icon className="w-5 h-5 md:w-6 md:h-6 text-primary mx-auto mb-2" />
                      <p className="text-xl md:text-2xl font-bold text-gray-900">{step.count}</p>
                      <p className="text-[11px] md:text-xs text-gray-500 mt-1">{step.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <h2 className="text-lg font-bold text-gray-900 mb-4">주문내역</h2>
                <p className="text-xs text-gray-400 mb-4">- 최근 주문내역을 확인할 수 있습니다.</p>
                {displayOrders.length === 0 ? (
                  <p className="text-center py-10 text-gray-400 text-sm">주문내역이 없습니다.</p>
                ) : (
                  <div className="space-y-3">
                    {displayOrders.map((order) => {
                      const totalAmount = order.items.reduce((sum, i) => sum + i.totalPrice, 0) + order.shippingFee
                      const statusInfo = STATUS_MAP[order.status]
                      return (
                        <div key={order.id} className="bg-gray-50 rounded-xl overflow-hidden">
                          <div className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-gray-200 shrink-0">
                                <Package className="w-5 h-5 text-gray-300" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-medium text-gray-800 truncate">
                                  {order.items.map(i => i.name).join(', ')}
                                </p>
                                <div className="flex items-center gap-2 mt-0.5">
                                  <span className="text-xs text-gray-400 font-mono">{order.id}</span>
                                  <span className="text-xs text-gray-400">{order.date}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 shrink-0">
                              <div className="text-right">
                                <p className="text-sm font-bold text-gray-900">{formatPrice(totalAmount)}원</p>
                                <span className={`text-xs font-medium ${order.status === 'delivered' ? 'text-success' : order.status === 'cancelled' ? 'text-accent' : 'text-primary'}`}>
                                  {statusInfo?.label || order.status}
                                </span>
                              </div>
                              <button onClick={() => setInvoiceOrder(order)} className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-[#1a56db] bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition">
                                <FileText className="w-3.5 h-3.5" />
                                거래명세서
                              </button>
                            </div>
                          </div>
                          <div className="px-4 pb-3">
                            <div className="flex flex-wrap gap-1">
                              {order.items.map((item, idx) => (
                                <span key={idx} className="text-[11px] bg-white px-2 py-0.5 rounded border border-gray-200 text-gray-500">
                                  {item.option} x{item.quantity}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </>
          )}

          {/* === 적립금내역 === */}
          {activeTab === 'points' && (
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h2 className="text-lg font-bold text-gray-900 mb-2">적립금내역</h2>
              <p className="text-xs text-gray-400 mb-6">- 적립금 사용 및 적립 내역을 확인할 수 있습니다.</p>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-primary-light rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">총 적립금</p>
                  <p className="text-xl font-bold text-primary">5,000원</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">사용 적립금</p>
                  <p className="text-xl font-bold text-gray-900">0원</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">가용 적립금</p>
                  <p className="text-xl font-bold text-success">5,000원</p>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium text-gray-500">날짜</th>
                      <th className="px-4 py-3 text-left font-medium text-gray-500">내용</th>
                      <th className="px-4 py-3 text-right font-medium text-gray-500">적립/사용</th>
                      <th className="px-4 py-3 text-right font-medium text-gray-500">잔액</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="px-4 py-3 text-gray-500">2025-03-01</td>
                      <td className="px-4 py-3 text-gray-700">회원가입 축하 적립금</td>
                      <td className="px-4 py-3 text-right text-primary font-medium">+5,000원</td>
                      <td className="px-4 py-3 text-right text-gray-900 font-medium">5,000원</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* === 견적서내역 === */}
          {activeTab === 'estimates' && (
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h2 className="text-lg font-bold text-gray-900 mb-2">견적서내역</h2>
              <p className="text-xs text-gray-400 mb-6">- 요청하신 견적서 내역을 확인할 수 있습니다.</p>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium text-gray-500">견적번호</th>
                      <th className="px-4 py-3 text-left font-medium text-gray-500">상품정보</th>
                      <th className="px-4 py-3 text-right font-medium text-gray-500">금액</th>
                      <th className="px-4 py-3 text-center font-medium text-gray-500">요청일</th>
                      <th className="px-4 py-3 text-center font-medium text-gray-500">상태</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={5} className="px-4 py-12 text-center text-gray-400">견적서 내역이 없습니다.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* === 위시리스트 === */}
          {activeTab === 'wishlist' && (
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h2 className="text-lg font-bold text-gray-900 mb-2">위시리스트</h2>
              <p className="text-xs text-gray-400 mb-6">- 위시리스트에 상품을 보관하고 언제든지 주문하시면 됩니다.</p>
              {wishedProducts.length === 0 ? (
                <div className="text-center py-16">
                  <Heart className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                  <p className="text-gray-400 text-sm">위시리스트가 비어있습니다.</p>
                  <Link href="/products" className="btn-primary inline-block mt-4 text-sm">상품 둘러보기</Link>
                </div>
              ) : (
                <>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-center font-medium text-gray-500 w-10">선택</th>
                          <th className="px-4 py-3 text-left font-medium text-gray-500">상품정보</th>
                          <th className="px-4 py-3 text-right font-medium text-gray-500">판매금액</th>
                          <th className="px-4 py-3 text-center font-medium text-gray-500">보관날짜</th>
                          <th className="px-4 py-3 text-center font-medium text-gray-500">구매</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {wishedProducts.map(({ product, addedAt }) => {
                          const basePrice = product.options[0] ? product.options[0][priceKey] : 0
                          return (
                            <tr key={product.id} className="hover:bg-gray-50">
                              <td className="px-4 py-3 text-center">
                                <input type="checkbox" className="accent-primary" />
                              </td>
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-3">
                                  <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                                    <Package className="w-5 h-5 text-gray-300" />
                                  </div>
                                  <div>
                                    <Link href={`/products/${product.id}`} className="text-sm font-medium text-gray-800 hover:text-primary transition line-clamp-1">
                                      {product.name}
                                    </Link>
                                    <p className="text-xs text-gray-400 mt-0.5">{product.brand}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-3 text-right">
                                <span className="font-semibold text-gray-900">{formatPrice(basePrice)}원</span>
                              </td>
                              <td className="px-4 py-3 text-center text-xs text-gray-500">{addedAt}</td>
                              <td className="px-4 py-3 text-center">
                                <div className="flex items-center justify-center gap-1">
                                  <Link href={`/products/${product.id}`} className="px-3 py-1.5 text-xs font-medium text-white bg-primary rounded-lg hover:bg-primary-dark transition">
                                    상품바로가기
                                  </Link>
                                  <button
                                    onClick={() => wishlistStore.removeItem(product.id)}
                                    className="p-1.5 text-gray-400 hover:text-accent rounded-lg hover:bg-red-50 transition"
                                    title="삭제"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-3">
                    <button className="text-xs text-gray-500 border border-gray-300 px-3 py-1.5 rounded hover:bg-gray-50 transition">
                      선택삭제
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* === 나의상품후기 === */}
          {activeTab === 'reviews' && (
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h2 className="text-lg font-bold text-gray-900 mb-2">나의상품후기</h2>
              <p className="text-xs text-gray-400 mb-6">- 작성하신 상품후기를 확인할 수 있습니다.</p>
              <div className="text-center py-16">
                <Star className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                <p className="text-gray-400 text-sm">작성한 상품후기가 없습니다.</p>
              </div>
            </div>
          )}

          {/* === 나의Q&A === */}
          {activeTab === 'qna' && (
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h2 className="text-lg font-bold text-gray-900 mb-2">나의Q&A</h2>
              <p className="text-xs text-gray-400 mb-6">- 문의하신 Q&A 내역을 확인할 수 있습니다.</p>
              <div className="text-center py-16">
                <HelpCircle className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                <p className="text-gray-400 text-sm">등록한 Q&A가 없습니다.</p>
              </div>
            </div>
          )}

          {/* === 회원정보수정 === */}
          {activeTab === 'profile' && (
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h2 className="text-lg font-bold text-gray-900 mb-2">회원정보수정</h2>
              <p className="text-xs text-gray-400 mb-6">- 회원정보를 수정할 수 있습니다.</p>
              <div className="space-y-4 max-w-lg">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
                  <input type="text" defaultValue={user.name} className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                  <input type="email" defaultValue={user.email} className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm bg-gray-50" readOnly />
                  <p className="text-xs text-gray-400 mt-1">이메일은 변경할 수 없습니다.</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">연락처</label>
                  <input type="tel" defaultValue={user.phone || ''} className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm" placeholder="연락처를 입력하세요" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">소속/회사명</label>
                  <input type="text" defaultValue={user.company || ''} className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm" placeholder="소속 또는 회사명을 입력하세요" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">회원등급</label>
                  <div className="flex items-center gap-2">
                    <span className={`badge text-xs ${roleColor}`}>{roleLabel}</span>
                    <span className="text-xs text-gray-400">등급 변경은 관리자에게 문의하세요.</span>
                  </div>
                </div>
                <hr className="my-4" />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">비밀번호 변경</label>
                  <input type="password" className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm mb-2" placeholder="현재 비밀번호" />
                  <input type="password" className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm mb-2" placeholder="새 비밀번호" />
                  <input type="password" className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm" placeholder="새 비밀번호 확인" />
                </div>
                <div className="flex gap-2 pt-4">
                  <button onClick={() => alert('회원정보가 수정되었습니다. (데모)')} className="btn-primary px-8">저장</button>
                  <button className="btn-outline px-8">취소</button>
                </div>
                <hr className="my-4" />
                <button className="text-xs text-gray-400 hover:text-accent transition">회원탈퇴</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {invoiceOrder && (
        <InvoiceModal order={invoiceOrder} onClose={() => setInvoiceOrder(null)} />
      )}
    </div>
  )
}
