'use client'

import { useState } from 'react'
import { Search, UserCog, Shield } from 'lucide-react'
import type { UserRole } from '@/types'

const DEMO_USERS = [
  { id: '1', name: '김소비', email: 'consumer@joalab.com', role: 'consumer' as UserRole, phone: '010-1234-5678', company: '-', joined: '2025-01-15', orders: 8 },
  { id: '2', name: '이업체', email: 'business@joalab.com', role: 'business' as UserRole, phone: '010-2345-6789', company: '(주)바이오텍', joined: '2025-02-10', orders: 23 },
  { id: '3', name: '박대리', email: 'dealer@joalab.com', role: 'dealer' as UserRole, phone: '010-3456-7890', company: '조아랩 대구지점', joined: '2025-01-05', orders: 156 },
  { id: '4', name: '최연구', email: 'choi@lab.ac.kr', role: 'consumer' as UserRole, phone: '010-4567-8901', company: '대구대학교', joined: '2025-03-01', orders: 3 },
  { id: '5', name: '정바이오', email: 'jung@biotech.co.kr', role: 'business' as UserRole, phone: '010-5678-9012', company: '(주)정바이오', joined: '2025-02-20', orders: 15 },
  { id: '6', name: '한실험', email: 'han@research.kr', role: 'consumer' as UserRole, phone: '010-6789-0123', company: '-', joined: '2025-03-10', orders: 1 },
]

const ROLE_MAP: Record<UserRole, { label: string; color: string }> = {
  consumer: { label: '일반고객', color: 'bg-blue-100 text-blue-700' },
  business: { label: '사업자', color: 'bg-green-100 text-green-700' },
  dealer: { label: '대리점', color: 'bg-red-100 text-red-700' },
  admin: { label: '관리자', color: 'bg-gray-800 text-white' },
}

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState<string>('')

  const filtered = DEMO_USERS.filter((u) => {
    if (roleFilter && u.role !== roleFilter) return false
    if (searchQuery && !u.name.includes(searchQuery) && !u.email.includes(searchQuery)) return false
    return true
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <UserCog className="w-6 h-6 text-primary" />
          회원 관리
        </h1>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-1">
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="이름 또는 이메일 검색..." className="w-full h-10 pl-10 pr-4 border border-gray-300 rounded-lg text-sm" />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
        <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="h-10 px-3 border border-gray-300 rounded-lg text-sm">
          <option value="">전체 회원</option>
          <option value="consumer">일반고객</option>
          <option value="business">사업자</option>
          <option value="dealer">대리점</option>
        </select>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-500">이름</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">이메일</th>
              <th className="px-4 py-3 text-center font-medium text-gray-500">유형</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">회사</th>
              <th className="px-4 py-3 text-center font-medium text-gray-500">주문수</th>
              <th className="px-4 py-3 text-center font-medium text-gray-500">가입일</th>
              <th className="px-4 py-3 text-center font-medium text-gray-500">권한변경</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-3 font-medium text-gray-800">{user.name}</td>
                <td className="px-4 py-3 text-gray-600">{user.email}</td>
                <td className="px-4 py-3 text-center">
                  <span className={`badge text-[10px] ${ROLE_MAP[user.role].color}`}>{ROLE_MAP[user.role].label}</span>
                </td>
                <td className="px-4 py-3 text-gray-600 text-xs">{user.company}</td>
                <td className="px-4 py-3 text-center text-gray-600">{user.orders}</td>
                <td className="px-4 py-3 text-center text-gray-400 text-xs">{user.joined}</td>
                <td className="px-4 py-3 text-center">
                  <select
                    defaultValue={user.role}
                    className="text-xs border border-gray-300 rounded px-2 py-1"
                    onChange={() => alert('회원 유형이 변경되었습니다. (데모)')}
                  >
                    <option value="consumer">일반고객</option>
                    <option value="business">사업자</option>
                    <option value="dealer">대리점</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-center mt-4 text-sm text-gray-500">총 {filtered.length}명</div>
    </div>
  )
}
