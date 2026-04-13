'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Package, ShoppingBag, Users, Megaphone, Settings, ChevronLeft, LogOut, Coins } from 'lucide-react'
import { useAuthStore } from '@/store/auth-store'

const ADMIN_MENU = [
  { href: '/admin', icon: LayoutDashboard, label: '대시보드' },
  { href: '/admin/products', icon: Package, label: '상품 관리' },
  { href: '/admin/orders', icon: ShoppingBag, label: '주문 관리' },
  { href: '/admin/users', icon: Users, label: '회원 관리' },
  { href: '/admin/events', icon: Megaphone, label: '이벤트/팝업' },
  { href: '/admin/points', icon: Coins, label: '적립금 설정' },
  { href: '/admin/settings', icon: Settings, label: '설정' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { user, logout } = useAuthStore()

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center shadow-sm">
          <p className="text-gray-500 mb-4">관리자 권한이 필요합니다.</p>
          <Link href="/auth/login" className="btn-primary inline-block">로그인</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-56 bg-gray-900 text-white shrink-0 flex flex-col">
        <div className="p-4 border-b border-gray-800">
          <Link href="/" className="block mb-3">
            <Image src="/logo.png" alt="JoaLab" width={110} height={36} className="h-8 w-auto brightness-0 invert" />
          </Link>
          <Link href="/" className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition">
            <ChevronLeft className="w-3 h-3" />
            사이트로 돌아가기
          </Link>
        </div>

        <nav className="flex-1 py-2">
          {ADMIN_MENU.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 text-sm transition ${
                  isActive ? 'bg-primary text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-xs font-bold">{user.name[0]}</div>
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">{user.name}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
          </div>
          <button onClick={logout} className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition w-full">
            <LogOut className="w-3 h-3" />
            로그아웃
          </button>
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 bg-gray-50 p-6 overflow-auto">
        {children}
      </div>
    </div>
  )
}
