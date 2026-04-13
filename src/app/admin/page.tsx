'use client'

import { Package, ShoppingBag, Users, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react'

const STATS = [
  { label: '오늘 주문', value: '12', change: '+15%', up: true, icon: ShoppingBag, color: 'bg-blue-50 text-blue-600' },
  { label: '총 상품수', value: '156', change: '+3', up: true, icon: Package, color: 'bg-green-50 text-green-600' },
  { label: '총 회원수', value: '1,284', change: '+28', up: true, icon: Users, color: 'bg-purple-50 text-purple-600' },
  { label: '이번달 매출', value: '12,450,000', change: '-5%', up: false, icon: TrendingUp, color: 'bg-orange-50 text-orange-600' },
]

const RECENT_ORDERS = [
  { id: 'JL-20260327-001', customer: '김소비', role: '일반고객', product: 'Research plus 피펫', amount: '424,000', status: '결제완료' },
  { id: 'JL-20260327-002', customer: '이업체', role: '사업자', product: 'Nitrile Gloves M (5박스)', amount: '126,000', status: '상품준비' },
  { id: 'JL-20260326-003', customer: '박대리', role: '대리점', product: 'PBS pH 7.4 500mL (10개)', amount: '96,000', status: '배송중' },
  { id: 'JL-20260326-004', customer: '최연구', role: '일반고객', product: 'CB Universal Tips 200μL', amount: '48,000', status: '배송완료' },
  { id: 'JL-20260325-005', customer: '정바이오', role: '사업자', product: 'FBS Premium 500mL', amount: '315,000', status: '배송완료' },
]

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">대시보드</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {STATS.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div className={`flex items-center gap-1 text-xs font-medium ${stat.up ? 'text-green-600' : 'text-red-500'}`}>
                {stat.change}
                {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h2 className="text-lg font-bold text-gray-900 mb-4">최근 주문</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-500 border-b border-gray-100">
              <th className="text-left py-2 font-medium">주문번호</th>
              <th className="text-left py-2 font-medium">고객</th>
              <th className="text-left py-2 font-medium">유형</th>
              <th className="text-left py-2 font-medium">상품</th>
              <th className="text-right py-2 font-medium">금액</th>
              <th className="text-center py-2 font-medium">상태</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {RECENT_ORDERS.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition">
                <td className="py-3 font-mono text-xs text-gray-600">{order.id}</td>
                <td className="py-3 text-gray-800">{order.customer}</td>
                <td className="py-3">
                  <span className={`badge text-[10px] ${
                    order.role === '일반고객' ? 'bg-blue-100 text-blue-700' :
                    order.role === '사업자' ? 'bg-green-100 text-green-700' :
                    'bg-red-100 text-red-700'
                  }`}>{order.role}</span>
                </td>
                <td className="py-3 text-gray-600">{order.product}</td>
                <td className="py-3 text-right font-semibold">{order.amount}원</td>
                <td className="py-3 text-center">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    order.status === '결제완료' ? 'bg-blue-50 text-blue-600' :
                    order.status === '상품준비' ? 'bg-yellow-50 text-yellow-600' :
                    order.status === '배송중' ? 'bg-purple-50 text-purple-600' :
                    'bg-green-50 text-green-600'
                  }`}>{order.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
