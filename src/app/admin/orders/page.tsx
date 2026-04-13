'use client'

import { useState } from 'react'
import { Search, ShoppingBag, FileText, ChevronDown, ChevronUp, Package } from 'lucide-react'
import { ORDERS, STATUS_MAP } from '@/data/orders'
import type { OrderData } from '@/data/orders'
import { formatPrice } from '@/lib/utils'
import InvoiceModal from '@/components/invoice/InvoiceModal'

export default function AdminOrdersPage() {
  const [statusFilter, setStatusFilter] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)
  const [invoiceOrder, setInvoiceOrder] = useState<OrderData | null>(null)

  const filtered = ORDERS.filter((o) => {
    if (statusFilter && o.status !== statusFilter) return false
    if (searchQuery && !o.customer.includes(searchQuery) && !o.id.includes(searchQuery)) return false
    return true
  })

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <ShoppingBag className="w-6 h-6 text-primary" />
        주문 관리
      </h1>

      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-1">
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="주문번호 또는 고객명 검색..." className="w-full h-10 pl-10 pr-4 border border-gray-300 rounded-lg text-sm" />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="h-10 px-3 border border-gray-300 rounded-lg text-sm">
          <option value="">전체 상태</option>
          {Object.entries(STATUS_MAP).map(([key, val]) => (
            <option key={key} value={key}>{val.label}</option>
          ))}
        </select>
      </div>

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
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${STATUS_MAP[order.status].color}`}>{STATUS_MAP[order.status].label}</span>
                  <span className="text-xs text-gray-400 w-24 text-center">{order.date}</span>
                  <button
                    onClick={(e) => { e.stopPropagation(); setInvoiceOrder(order) }}
                    className="p-1.5 text-gray-400 hover:text-[#1a56db] hover:bg-blue-50 rounded transition"
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
                    <div className="lg:col-span-2">
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
                        <div className="flex items-center justify-between bg-[#1a56db]/5 rounded-lg p-3 border border-[#1a56db]/20 text-sm">
                          <span className="font-bold text-gray-700">합계</span>
                          <span className="font-bold text-[#1a56db] text-base">{formatPrice(totalAmount)}원</span>
                        </div>
                      </div>
                    </div>

                    {/* Info + Actions */}
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-xs font-semibold text-gray-500 mb-2">고객 정보</h4>
                        <div className="bg-white rounded-lg p-3 border border-gray-100 text-xs space-y-1">
                          <p><span className="text-gray-400 w-12 inline-block">이름</span> {order.customer}</p>
                          <p><span className="text-gray-400 w-12 inline-block">소속</span> {order.company}</p>
                          <p><span className="text-gray-400 w-12 inline-block">주소</span> {order.address}</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-gray-500 mb-2">상태 변경</h4>
                        <select
                          defaultValue={order.status}
                          className="w-full h-9 px-3 border border-gray-300 rounded-lg text-sm"
                          onChange={() => alert('주문 상태가 변경되었습니다. (데모)')}
                        >
                          {Object.entries(STATUS_MAP).map(([key, val]) => (
                            <option key={key} value={key}>{val.label}</option>
                          ))}
                        </select>
                      </div>
                      <button
                        onClick={() => setInvoiceOrder(order)}
                        className="w-full bg-[#1a56db] text-white py-2.5 px-4 rounded-lg font-semibold text-sm hover:bg-[#1240a8] transition flex items-center justify-center gap-2"
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
      </div>

      {invoiceOrder && (
        <InvoiceModal order={invoiceOrder} onClose={() => setInvoiceOrder(null)} />
      )}
    </div>
  )
}
