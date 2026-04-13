'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Search, ShoppingCart, Menu, X, Phone, LogOut, User, Settings } from 'lucide-react'
import { useAuthStore } from '@/store/auth-store'
import { useCartStore } from '@/store/cart-store'

export default function Header() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, isLoggedIn, logout } = useAuthStore()
  const cartItems = useCartStore((s) => s.items)

  const roleLabel = user ? { consumer: '일반고객', business: '사업자', dealer: '대리점', admin: '관리자' }[user.role] : ''

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [sidebarOpen])

  const handleSearch = (q?: string) => {
    const query = (q ?? searchQuery).trim()
    if (!query) return
    router.push(`/products?search=${encodeURIComponent(query)}`)
    setSidebarOpen(false)
  }

  const closeSidebar = () => {
    setSidebarOpen(false)
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        {/* Top bar - desktop only */}
        <div className="bg-gray-50 border-b border-gray-100 hidden md:block">
          <div className="container-custom flex items-center justify-between h-8 text-xs text-gray-500">
            <div className="flex items-center gap-3">
              <Phone className="w-3 h-3" />
              <span>02-3463-7190</span>
              <span className="text-gray-300">|</span>
              <span>평일 09:00~18:00</span>
            </div>
            <div className="flex items-center gap-3">
              {isLoggedIn ? (
                <>
                  <span className="font-medium text-gray-700">{user?.name}님</span>
                  <span className="badge badge-new text-[10px]">{roleLabel}</span>
                  <Link href="/mypage" className="hover:text-primary">마이페이지</Link>
                  {user?.role === 'admin' && (
                    <Link href="/admin" className="hover:text-accent font-semibold">관리자</Link>
                  )}
                  <button onClick={logout} className="hover:text-accent flex items-center gap-1">
                    <LogOut className="w-3 h-3" />로그아웃
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" className="hover:text-primary">로그인</Link>
                  <Link href="/auth/register" className="hover:text-primary">회원가입</Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Main header */}
        <div className="container-custom">
          <div className="flex items-center justify-between h-14 md:h-16 gap-3 md:gap-6">
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 -ml-2 text-gray-700"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Logo */}
            <Link href="/" className="shrink-0">
              <Image src="/logo.png" alt="JoaLab" width={140} height={48} className="h-8 md:h-10 w-auto" priority />
            </Link>

            {/* Search - desktop */}
            <div className="flex-1 max-w-xl hidden md:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="찾는 제품이나 단어를 입력하세요"
                  className="w-full h-10 pl-4 pr-12 border border-gray-300 rounded-lg text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button onClick={() => handleSearch()} className="absolute right-0 top-0 h-10 w-10 flex items-center justify-center bg-primary text-white rounded-r-lg hover:bg-primary-dark transition">
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1">
              <Link href="/cart" className="relative flex items-center gap-1 px-2 md:px-3 py-2 text-sm text-gray-600 hover:text-primary rounded-lg hover:bg-gray-50 transition">
                <ShoppingCart className="w-5 h-5 md:w-4 md:h-4" />
                <span className="hidden lg:inline">장바구니</span>
                {cartItems.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </Link>
              <Link href="/estimate" className="hidden md:flex items-center gap-1 px-3 py-2 text-sm font-bold text-white bg-primary/80 hover:bg-primary rounded-lg transition">
                견적문의
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation - desktop */}
        <nav className="bg-white border-t border-gray-100 hidden md:block">
          <div className="container-custom">
            <ul className="flex items-center h-11">
              <li>
                <Link href="/products" className="px-4 h-11 flex items-center text-sm font-bold text-white bg-primary hover:bg-primary-dark transition">전체상품</Link>
              </li>
              <li>
                <Link href="/chembio" className="px-4 h-11 flex items-center text-sm font-medium text-gray-700 hover:text-primary transition">Chembio</Link>
              </li>
              <li>
                <Link href="/brand" className="px-4 h-11 flex items-center text-sm font-medium text-gray-700 hover:text-primary transition">브랜드</Link>
              </li>
              <li>
                <Link href="/market" className="px-4 h-11 flex items-center text-sm font-medium text-gray-700 hover:text-primary transition">중고장터</Link>
              </li>
              <li className="border-l border-gray-200 ml-1 pl-1">
                <Link href="/event" className="px-4 h-11 flex items-center text-sm font-medium text-gray-700 hover:text-primary transition">이벤트</Link>
              </li>
              <li>
                <Link href="/support" className="px-4 h-11 flex items-center text-sm font-medium text-gray-700 hover:text-primary transition">고객센터</Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={closeSidebar} />
          <div className="absolute top-0 left-0 bottom-0 w-[280px] bg-white flex flex-col shadow-2xl animate-slideRight">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-primary">
              <Link href="/" onClick={closeSidebar}>
                <Image src="/logo.png" alt="JoaLab" width={100} height={34} className="h-7 w-auto brightness-0 invert" />
              </Link>
              <button onClick={closeSidebar} className="p-1 text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search */}
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="relative">
                <input
                  type="text"
                  placeholder="검색어를 입력하세요"
                  className="w-full h-9 pl-3 pr-9 border border-gray-300 rounded-lg text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button onClick={() => handleSearch()} className="absolute right-0 top-0 h-9 w-9 flex items-center justify-center text-gray-400 hover:text-primary">
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Scrollable Menu */}
            <div className="flex-1 overflow-y-auto">
              {/* Quick Links */}
              <div className="px-4 py-3 border-b border-gray-100">
                <Link href="/products" onClick={closeSidebar} className="flex items-center gap-2 px-2 py-2.5 text-sm font-semibold text-gray-800 hover:text-primary rounded-lg hover:bg-gray-50 transition">
                  전체상품
                </Link>
                <Link href="/chembio" onClick={closeSidebar} className="flex items-center gap-2 px-2 py-2.5 text-sm font-semibold text-gray-800 hover:text-primary rounded-lg hover:bg-gray-50 transition">
                  Chembio
                </Link>
                <Link href="/brand" onClick={closeSidebar} className="flex items-center gap-2 px-2 py-2.5 text-sm font-semibold text-gray-800 hover:text-primary rounded-lg hover:bg-gray-50 transition">
                  브랜드
                </Link>
                <Link href="/market" onClick={closeSidebar} className="flex items-center gap-2 px-2 py-2.5 text-sm font-semibold text-gray-800 hover:text-primary rounded-lg hover:bg-gray-50 transition">
                  중고장터
                </Link>
                <Link href="/event" onClick={closeSidebar} className="flex items-center gap-2 px-2 py-2.5 text-sm font-semibold text-gray-800 hover:text-primary rounded-lg hover:bg-gray-50 transition">
                  이벤트
                </Link>
                <Link href="/support" onClick={closeSidebar} className="flex items-center gap-2 px-2 py-2.5 text-sm font-semibold text-gray-800 hover:text-primary rounded-lg hover:bg-gray-50 transition">
                  고객센터
                </Link>
                <Link href="/estimate" onClick={closeSidebar} className="flex items-center gap-2 px-2 py-2.5 text-sm font-bold text-primary rounded-lg hover:bg-primary/5 transition">
                  견적문의
                </Link>
              </div>
            </div>

            {/* Sidebar Footer - Auth */}
            <div className="border-t border-gray-200 bg-gray-50">
              {isLoggedIn ? (
                <div className="p-4 space-y-2">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{user?.name}님</p>
                      <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full font-medium">{roleLabel}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Link href="/mypage" onClick={closeSidebar} className="flex items-center justify-center gap-1 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                      <User className="w-3.5 h-3.5" /> 마이페이지
                    </Link>
                    <Link href="/cart" onClick={closeSidebar} className="flex items-center justify-center gap-1 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                      <ShoppingCart className="w-3.5 h-3.5" /> 장바구니
                      {cartItems.length > 0 && <span className="text-accent font-bold">({cartItems.length})</span>}
                    </Link>
                  </div>
                  {user?.role === 'admin' && (
                    <Link href="/admin" onClick={closeSidebar} className="flex items-center justify-center gap-1 w-full py-2 text-xs font-medium text-white bg-gray-700 rounded-lg hover:bg-gray-800 transition">
                      <Settings className="w-3.5 h-3.5" /> 관리자 페이지
                    </Link>
                  )}
                  <button
                    onClick={() => { logout(); closeSidebar() }}
                    className="flex items-center justify-center gap-1 w-full py-2 text-xs font-medium text-gray-500 hover:text-accent transition"
                  >
                    <LogOut className="w-3.5 h-3.5" /> 로그아웃
                  </button>
                </div>
              ) : (
                <div className="p-4 space-y-2">
                  <Link href="/auth/login" onClick={closeSidebar} className="flex items-center justify-center gap-1 w-full py-2.5 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-primary-dark transition">
                    로그인
                  </Link>
                  <Link href="/auth/register" onClick={closeSidebar} className="flex items-center justify-center gap-1 w-full py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                    회원가입
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
