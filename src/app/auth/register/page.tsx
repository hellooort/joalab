'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuthStore } from '@/store/auth-store'
import type { UserRole } from '@/types'

export default function RegisterPage() {
  const router = useRouter()
  const register = useAuthStore((s) => s.register)
  const [form, setForm] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    name: '',
    phone: '',
    company: '',
    role: 'consumer' as UserRole,
  })
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.')
      return
    }
    if (register(form)) {
      alert('회원가입이 완료되었습니다.')
      router.push('/')
    } else {
      setError('이미 존재하는 이메일입니다.')
    }
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center py-12">
      <div className="w-full max-w-lg mx-4">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">회원가입</h1>
          <p className="text-sm text-gray-500 mt-2">JoaLab 회원이 되어보세요</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
          {error && <div className="bg-accent-light text-accent text-sm px-4 py-3 rounded-lg">{error}</div>}

          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">회원 유형</label>
            <div className="grid grid-cols-3 gap-2">
              {([
                { value: 'consumer', label: '일반고객', desc: '일반 고객' },
                { value: 'business', label: '사업자', desc: '사업자 회원' },
                { value: 'dealer', label: '대리점', desc: '대리점 회원' },
              ] as const).map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setForm({ ...form, role: opt.value })}
                  className={`p-3 rounded-lg border-2 text-center transition ${
                    form.role === opt.value
                      ? 'border-primary bg-primary-light'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-sm font-semibold">{opt.label}</span>
                  <span className="block text-xs text-gray-500 mt-0.5">{opt.desc}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">이메일 *</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full h-11 px-4 border border-gray-300 rounded-lg text-sm" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">비밀번호 *</label>
              <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full h-11 px-4 border border-gray-300 rounded-lg text-sm" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">비밀번호 확인 *</label>
              <input type="password" value={form.passwordConfirm} onChange={(e) => setForm({ ...form, passwordConfirm: e.target.value })} className="w-full h-11 px-4 border border-gray-300 rounded-lg text-sm" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">이름 *</label>
              <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full h-11 px-4 border border-gray-300 rounded-lg text-sm" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">연락처</label>
              <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full h-11 px-4 border border-gray-300 rounded-lg text-sm" placeholder="010-0000-0000" />
            </div>
            {(form.role === 'business' || form.role === 'dealer') && (
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">회사/업체명 *</label>
                <input type="text" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="w-full h-11 px-4 border border-gray-300 rounded-lg text-sm" required />
              </div>
            )}
          </div>

          <button type="submit" className="w-full btn-primary h-11 mt-2">회원가입</button>

          <p className="text-center text-sm text-gray-500">
            이미 회원이신가요? <Link href="/auth/login" className="text-primary hover:underline">로그인</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
