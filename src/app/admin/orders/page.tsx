'use client'

import { useState } from 'react'
import { Search, ShoppingBag, FileText, ChevronDown, ChevronUp, Package, Truck, X, Phone, Mail, MapPin, CreditCard, StickyNote, AlertCircle } from 'lucide-react'
import { ORDERS, STATUS_MAP, CARRIERS } from '@/data/orders'
import type { OrderData } from '@/data/orders'
import { formatPrice } from '@/lib/utils'
import InvoiceModal from '@/components/invoice/InvoiceModal'

interface TrackingModalProps {
  order: OrderData
  onClose: () => void
  onConfirm: (carrier: string, trackingNumber: string) => void
}

function TrackingModal({ order, onClose, onConfirm }: TrackingModalProps) {
  const [carrier, setCarrier] = useState(order.tracking?.carrier || CARRIERS[0].name)
  const [trackingNumber, setTrackingNumber] = useState(order.tracking?.trackingNumber || '')

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 animate-fadeIn" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-bold text-gray-900">운송장 입력</h3>
          </div>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-5 space-y-4">
          <div className="bg-gray-50 rounded-lg p-3 text-sm">
            <p className="text-gray-500">주문번호</p>
            <p className="font-mono font-bold text-gray-900">{order.id}</p>
            <p className="text-gray-500 mt-1">{order.customer} ({order.company})</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">택배사</label>
            <select
              value={carrier}
              onChange={(e) => setCarrier(e.target.value)}
              className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm"
            >
              {CARRIERS.map((c) => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">운송장번호</label>
            <input
              type="text"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              placeholder="운송장번호를 입력하세요"
              className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm"
            />
          </div>
        </div>
        <div className="flex gap-2 px-5 py-4 border-t border-gray-200">
          <button onClick={onClose} className="flex-1 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
            취소
          </button>
          <button
            onClick={() => {
              if (!trackingNumber.trim()) { alert('운송장번호를 입력하세요.'); return }
              onConfirm(carrier, trackingNumber.trim())
            }}
            className="flex-1 py-2.5 text-sm font-bold text-white bg-primary rounded-lg hover:bg-primary-dark transition"
          >
            배송중 처리
          </button>
        </div>
      </div>
    </div>
  )
}

interface CancelModalProps {
  order: OrderData
  onClose: () => void
  onConfirm: (reason: string) => void
}

function CancelModal({ order, onClose, onConfirm }: CancelModalProps) {
  const [reason, setReason] = useState('')

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 animate-fadeIn" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <h3 className="text-lg font-bold text-gray-900">주문 취소</h3>
          </div>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-5 space-y-4">
          <div className="bg-red-50 rounded-lg p-3 text-sm">
            <p className="text-red-600 font-medium">주문번호 {order.id}</p>
            <p className="text-red-500 mt-0.5">{order.customer} — 이 주문을 취소합니다.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">취소 사유</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="취소 사유를 입력하세요"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none"
            />
          </div>
        </div>
        <div className="flex gap-2 px-5 py-4 border-t border-gray-200">
          <button onClick={onClose} className="flex-1 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
            돌아가기
          </button>
          <button
            onClick={() => {
              if (!reason.trim()) { alert('취소 사유를 입력하세요.'); return }
              onConfirm(reason.trim())
            }}
            className="flex-1 py-2.5 text-sm font-bold text-white bg-red-500 rounded-lg hover:bg-red-600 transition"
          >
            취소 확정
          </button>
        </div>
      </div>
    </div>
  )
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderData[]>(ORDERS)
  const [statusFilter, setStatusFilter] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)
  const [invoiceOrder, setInvoiceOrder] = useState<OrderData | null>(null)
  const [trackingOrder, setTrackingOrder] = useState<OrderData | null>(null)
  const [cancelOrder, setCancelOrder] = useState<OrderData | null>(null)
  const [editingMemo, setEditingMemo] = useState<string | null>(null)
  const [memoText, setMemoText] = useState('')

  const filtered = orders.filter((o) => {
    if (statusFilter && o.status !== statusFilter) return false
    if (searchQuery && !o.customer.includes(searchQuery) && !o.id.includes(searchQuery) && !o.phone.includes(searchQuery)) return false
    return true
  })

  const updateOrder = (orderId: string, updates: Partial<OrderData>) => {
    setOrders((prev) => prev.map((o) => o.id === orderId ? { ...o, ...updates } : o))
  }

  const handleStatusChange = (order: OrderData, newStatus: string) => {
    if (newStatus === 'shipping') {
      setTrackingOrder(order)
      return
    }
    if (newStatus === 'cancelled') {
      setCancelOrder(order)
      return
    }
    updateOrder(order.id, { status: newStatus })
  }

  const handleTrackingConfirm = (carrier: string, trackingNumber: string) => {
    if (trackingOrder) {
      updateOrder(trackingOrder.id, {
        status: 'shipping',
        tracking: { carrier, trackingNumber },
      })
      setTrackingOrder(null)
    }
  }

  const handleCancelConfirm = (reason: string) => {
    if (cancelOrder) {
      updateOrder(cancelOrder.id, {
        status: 'cancelled',
        cancelReason: reason,
      })
      setCancelOrder(null)
    }
  }

  const handleMemoSave = (orderId: string) => {
    updateOrder(orderId, { adminMemo: memoText })
    setEditingMemo(null)
    setMemoText('')
  }

  const statusCounts = orders.reduce<Record<string, number>>((acc, o) => {
    acc[o.status] = (acc[o.status] || 0) + 1
    return acc
  }, {})

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <ShoppingBag className="w-6 h-6 text-primary" />
        주문 관리
      </h1>

      {/* Status Summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        {Object.entries(STATUS_MAP).map(([key, val]) => (
          <button
            key={key}
            onClick={() => setStatusFilter(statusFilter === key ? '' : key)}
            className={`flex items-center justify-between p-3 rounded-xl border transition ${statusFilter === key ? 'border-primary bg-primary/5' : 'border-gray-200 bg-white hover:border-gray-300'}`}
          >
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${val.color}`}>{val.label}</span>
            <span className="text-lg font-bold text-gray-900">{statusCounts[key] || 0}</span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-1">
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="주문번호, 고객명, 연락처 검색..." className="w-full h-10 pl-10 pr-4 border border-gray-300 rounded-lg text-sm" />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Order List */}
      <div className="space-y-2">
        {filtered.map((order) => {
          const totalAmount = order.items.reduce((sum, item) => sum + item.totalPrice, 0) + order.shippingFee
          const isExpanded = expandedOrder === order.id

          return (
            <div key={order.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              {/* Summary Row */}
              <div className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 transition" onClick={() => setExpandedOrder(isExpanded ? null : order.id)}>
                <div className="flex-1 min-w-0 flex items-center gap-4">
                  <span className="font-mono text-xs text-gray-500 shrink-0 w-36">{order.id}</span>
                  <span className="text-sm font-medium text-gray-800 shrink-0 w-16">{order.customer}</span>
                  <span className={`badge text-[10px] shrink-0 ${order.role === '일반고객' ? 'bg-blue-100 text-blue-700' : order.role === '사업자' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{order.role}</span>
                  <span className="text-xs text-gray-500 truncate">{order.items.map(i => i.name).join(', ')}</span>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <span className="text-sm font-bold text-gray-900 w-24 text-right">{formatPrice(totalAmount)}원</span>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${STATUS_MAP[order.status]?.color || 'bg-gray-100 text-gray-600'}`}>
                    {STATUS_MAP[order.status]?.label || order.status}
                  </span>
                  {order.tracking && (
                    <span className="text-[10px] text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded font-medium">
                      {order.tracking.carrier}
                    </span>
                  )}
                  <span className="text-xs text-gray-400 w-24 text-center">{order.date}</span>
                  <button
                    onClick={(e) => { e.stopPropagation(); setInvoiceOrder(order) }}
                    className="p-1.5 text-gray-400 hover:text-primary hover:bg-blue-50 rounded transition"
                    title="거래 명세서"
                  >
                    <FileText className="w-4 h-4" />
                  </button>
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </div>
              </div>

              {/* Expanded Detail */}
              {isExpanded && (
                <div className="border-t border-gray-200 bg-gray-50 animate-fadeIn">
                  <div className="p-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Items */}
                    <div className="lg:col-span-2 space-y-4">
                      <div>
                        <h4 className="text-xs font-semibold text-gray-500 mb-2">주문 상품</h4>
                        <div className="space-y-2">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3 bg-white rounded-lg p-3 border border-gray-100">
                              <div className="w-9 h-9 bg-gray-100 rounded flex items-center justify-center shrink-0">
                                <Package className="w-4 h-4 text-gray-300" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-800">{item.name}</p>
                                <p className="text-xs text-gray-500">{item.option} x {item.quantity}</p>
                              </div>
                              <div className="text-right shrink-0">
                                <p className="text-xs text-gray-400">@{formatPrice(item.unitPrice)}원</p>
                                <p className="text-sm font-bold text-gray-900">{formatPrice(item.totalPrice)}원</p>
                              </div>
                            </div>
                          ))}
                          {order.shippingFee > 0 && (
                            <div className="flex items-center justify-between bg-white rounded-lg p-3 border border-gray-100 text-sm">
                              <span className="text-gray-500">배송비</span>
                              <span className="font-medium">{formatPrice(order.shippingFee)}원</span>
                            </div>
                          )}
                          <div className="flex items-center justify-between bg-primary/5 rounded-lg p-3 border border-primary/20 text-sm">
                            <span className="font-bold text-gray-700">합계</span>
                            <span className="font-bold text-primary text-base">{formatPrice(totalAmount)}원</span>
                          </div>
                        </div>
                      </div>

                      {/* Tracking Info */}
                      {order.tracking && (
                        <div>
                          <h4 className="text-xs font-semibold text-gray-500 mb-2 flex items-center gap-1">
                            <Truck className="w-3 h-3" /> 배송 정보
                          </h4>
                          <div className="bg-white rounded-lg p-3 border border-gray-100 text-sm space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-gray-400 w-16">택배사</span>
                              <span className="font-medium">{order.tracking.carrier}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-gray-400 w-16">운송장</span>
                              <span className="font-mono font-bold text-primary">{order.tracking.trackingNumber}</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Cancel Reason */}
                      {order.status === 'cancelled' && order.cancelReason && (
                        <div>
                          <h4 className="text-xs font-semibold text-red-500 mb-2 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> 취소 사유
                          </h4>
                          <div className="bg-red-50 rounded-lg p-3 border border-red-100 text-sm text-red-700">
                            {order.cancelReason}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right Column: Info + Actions */}
                    <div className="space-y-3">
                      {/* Customer Info */}
                      <div>
                        <h4 className="text-xs font-semibold text-gray-500 mb-2">고객 정보</h4>
                        <div className="bg-white rounded-lg p-3 border border-gray-100 text-xs space-y-1.5">
                          <p className="flex items-center gap-1.5"><span className="text-gray-400 w-12">이름</span> <span className="font-medium">{order.customer}</span></p>
                          <p className="flex items-center gap-1.5"><span className="text-gray-400 w-12">소속</span> {order.company}</p>
                          <p className="flex items-center gap-1.5"><Phone className="w-3 h-3 text-gray-400" /> <span className="text-gray-400 w-9">연락처</span> {order.phone}</p>
                          <p className="flex items-center gap-1.5"><Mail className="w-3 h-3 text-gray-400" /> <span className="text-gray-400 w-9">이메일</span> {order.email}</p>
                          <p className="flex items-start gap-1.5"><MapPin className="w-3 h-3 text-gray-400 mt-0.5" /> <span className="text-gray-400 w-9 shrink-0">주소</span> <span>{order.address}</span></p>
                          {order.shippingRequest && (
                            <p className="flex items-start gap-1.5 pt-1 border-t border-gray-50">
                              <Truck className="w-3 h-3 text-gray-400 mt-0.5" />
                              <span className="text-gray-400 w-9 shrink-0">요청</span>
                              <span className="text-primary font-medium">{order.shippingRequest}</span>
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Payment Info */}
                      <div>
                        <h4 className="text-xs font-semibold text-gray-500 mb-2 flex items-center gap-1">
                          <CreditCard className="w-3 h-3" /> 결제 정보
                        </h4>
                        <div className="bg-white rounded-lg p-3 border border-gray-100 text-xs space-y-1.5">
                          <p><span className="text-gray-400 w-16 inline-block">결제수단</span> <span className="font-medium">{order.payment.method}</span></p>
                          <p><span className="text-gray-400 w-16 inline-block">결제일시</span> {order.payment.paidAt}</p>
                          {order.payment.tid && (
                            <p><span className="text-gray-400 w-16 inline-block">거래번호</span> <span className="font-mono text-[10px]">{order.payment.tid}</span></p>
                          )}
                        </div>
                      </div>

                      {/* Admin Memo */}
                      <div>
                        <h4 className="text-xs font-semibold text-gray-500 mb-2 flex items-center gap-1">
                          <StickyNote className="w-3 h-3" /> 관리자 메모
                        </h4>
                        {editingMemo === order.id ? (
                          <div className="space-y-2">
                            <textarea
                              value={memoText}
                              onChange={(e) => setMemoText(e.target.value)}
                              rows={2}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs resize-none"
                              placeholder="메모를 입력하세요..."
                              autoFocus
                            />
                            <div className="flex gap-1">
                              <button onClick={() => handleMemoSave(order.id)} className="flex-1 py-1.5 text-xs font-bold text-white bg-primary rounded-lg hover:bg-primary-dark transition">저장</button>
                              <button onClick={() => setEditingMemo(null)} className="flex-1 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition">취소</button>
                            </div>
                          </div>
                        ) : (
                          <div
                            onClick={() => { setEditingMemo(order.id); setMemoText(order.adminMemo || '') }}
                            className="bg-white rounded-lg p-3 border border-gray-100 text-xs text-gray-500 cursor-pointer hover:border-primary/30 transition min-h-[40px]"
                          >
                            {order.adminMemo || '클릭하여 메모 추가...'}
                          </div>
                        )}
                      </div>

                      {/* Status Change */}
                      {order.status !== 'cancelled' && (
                        <div>
                          <h4 className="text-xs font-semibold text-gray-500 mb-2">상태 변경</h4>
                          <select
                            value={order.status}
                            className="w-full h-9 px-3 border border-gray-300 rounded-lg text-sm"
                            onChange={(e) => handleStatusChange(order, e.target.value)}
                          >
                            {Object.entries(STATUS_MAP).map(([key, val]) => (
                              <option key={key} value={key}>{val.label}</option>
                            ))}
                          </select>
                        </div>
                      )}

                      {/* Invoice Button */}
                      <button
                        onClick={() => setInvoiceOrder(order)}
                        className="w-full bg-primary text-white py-2.5 px-4 rounded-lg font-semibold text-sm hover:bg-primary-dark transition flex items-center justify-center gap-2"
                      >
                        <FileText className="w-4 h-4" />
                        거래 명세서 생성
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}

        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <ShoppingBag className="w-12 h-12 mx-auto mb-3 text-gray-200" />
            <p>검색 결과가 없습니다.</p>
          </div>
        )}
      </div>

      {/* Modals */}
      {invoiceOrder && (
        <InvoiceModal order={invoiceOrder} onClose={() => setInvoiceOrder(null)} />
      )}
      {trackingOrder && (
        <TrackingModal order={trackingOrder} onClose={() => setTrackingOrder(null)} onConfirm={handleTrackingConfirm} />
      )}
      {cancelOrder && (
        <CancelModal order={cancelOrder} onClose={() => setCancelOrder(null)} onConfirm={handleCancelConfirm} />
      )}
    </div>
  )
}
