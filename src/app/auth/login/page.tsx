'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuthStore } from '@/store/auth-store'
import { Eye, EyeOff, LogIn } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const login = useAuthStore((s) => s.login)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (login(email, password)) {
      router.push('/')
    } else {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.')
    }
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center py-12">
      <div className="w-full max-w-md mx-4">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">로그인</h1>
          <p className="text-sm text-gray-500 mt-2">JoaLab에 오신 것을 환영합니다</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          {error && (
            <div className="bg-accent-light text-accent text-sm px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 px-4 border border-gray-300 rounded-lg text-sm"
                placeholder="example@joalab.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">비밀번호</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-11 px-4 pr-10 border border-gray-300 rounded-lg text-sm"
                  placeholder="비밀번호를 입력하세요"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          <button type="submit" className="w-full btn-primary mt-6 flex items-center justify-center gap-2 h-11">
            <LogIn className="w-4 h-4" />
            로그인
          </button>

          <div className="mt-4 text-center">
            <Link href="/auth/register" className="text-sm text-primary hover:underline">
              아직 회원이 아니신가요? 회원가입
            </Link>
          </div>
        </form>

        {/* Demo Accounts */}
        <div className="mt-6 bg-blue-50 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">데모 계정 안내</h3>
          <div className="space-y-2 text-xs text-gray-600">
            <div className="flex justify-between items-center p-2 bg-white rounded-lg">
              <div>
                <span className="badge badge-new text-[10px] mr-1">소비자</span>
                consumer@joalab.com / 1234
              </div>
              <button onClick={() => { setEmail('consumer@joalab.com'); setPassword('1234') }} className="text-primary font-semibold hover:underline">입력</button>
            </div>
            <div className="flex justify-between items-center p-2 bg-white rounded-lg">
              <div>
                <span className="badge badge-ship text-[10px] mr-1">업체</span>
                business@joalab.com / 1234
              </div>
              <button onClick={() => { setEmail('business@joalab.com'); setPassword('1234') }} className="text-primary font-semibold hover:underline">입력</button>
            </div>
            <div className="flex justify-between items-center p-2 bg-white rounded-lg">
              <div>
                <span className="badge badge-hot text-[10px] mr-1">대리점</span>
                dealer@joalab.com / 1234
              </div>
              <button onClick={() => { setEmail('dealer@joalab.com'); setPassword('1234') }} className="text-primary font-semibold hover:underline">입력</button>
            </div>
            <div className="flex justify-between items-center p-2 bg-white rounded-lg">
              <div>
                <span className="bg-gray-800 text-white badge text-[10px] mr-1">관리자</span>
                admin@joalab.com / admin
              </div>
              <button onClick={() => { setEmail('admin@joalab.com'); setPassword('admin') }} className="text-primary font-semibold hover:underline">입력</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
