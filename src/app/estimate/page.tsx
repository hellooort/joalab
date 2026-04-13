'use client'

import { useState } from 'react'
import { FileText, Send, Phone, Mail, Building2 } from 'lucide-react'

export default function EstimatePage() {
  const [form, setForm] = useState({
    companyName: '',
    contactName: '',
    phone: '',
    email: '',
    productName: '',
    quantity: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.contactName || !form.phone || !form.productName) {
      alert('필수 항목을 입력해주세요.')
      return
    }
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="container-custom py-20 text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">견적문의가 접수되었습니다</h1>
        <p className="text-gray-500 mb-6">담당자가 확인 후 빠른 시일 내에 연락 드리겠습니다.</p>
        <div className="bg-gray-50 rounded-xl p-6 max-w-md mx-auto text-sm text-left space-y-2">
          <div className="flex"><span className="w-20 text-gray-500">담당자</span><span className="text-gray-800 font-medium">{form.contactName}</span></div>
          <div className="flex"><span className="w-20 text-gray-500">연락처</span><span className="text-gray-800">{form.phone}</span></div>
          <div className="flex"><span className="w-20 text-gray-500">제품명</span><span className="text-gray-800">{form.productName}</span></div>
          {form.quantity && <div className="flex"><span className="w-20 text-gray-500">수량</span><span className="text-gray-800">{form.quantity}</span></div>}
        </div>
        <div className="mt-8">
          <button onClick={() => { setSubmitted(false); setForm({ companyName: '', contactName: '', phone: '', email: '', productName: '', quantity: '', message: '' }) }} className="btn-outline mr-3">
            추가 견적문의
          </button>
          <a href="/" className="btn-primary inline-block">홈으로</a>
        </div>
      </div>
    )
  }

  return (
    <div className="container-custom py-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">견적문의</h1>
          <p className="text-gray-500">원하시는 제품의 견적을 문의해 주세요. 빠르게 답변 드리겠습니다.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 text-center">
            <Phone className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-sm font-semibold text-gray-800">전화 문의</p>
            <p className="text-primary font-bold">02-3463-7190</p>
          </div>
          <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 text-center">
            <Mail className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-sm font-semibold text-gray-800">이메일</p>
            <p className="text-primary font-bold text-sm">sales@joagene.com</p>
          </div>
          <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 text-center">
            <Building2 className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-sm font-semibold text-gray-800">FAX</p>
            <p className="text-primary font-bold">02-3463-7196</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">회사명</label>
              <input name="companyName" value={form.companyName} onChange={handleChange} type="text" className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm" placeholder="회사명을 입력하세요" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">담당자명 <span className="text-accent">*</span></label>
              <input name="contactName" value={form.contactName} onChange={handleChange} type="text" className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm" placeholder="담당자명을 입력하세요" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">연락처 <span className="text-accent">*</span></label>
              <input name="phone" value={form.phone} onChange={handleChange} type="tel" className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm" placeholder="010-0000-0000" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
              <input name="email" value={form.email} onChange={handleChange} type="email" className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm" placeholder="email@example.com" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">제품명 / 모델명 <span className="text-accent">*</span></label>
              <input name="productName" value={form.productName} onChange={handleChange} type="text" className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm" placeholder="견적을 원하시는 제품명 또는 모델명" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">수량</label>
              <input name="quantity" value={form.quantity} onChange={handleChange} type="text" className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm" placeholder="수량" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">상세 내용</label>
            <textarea name="message" value={form.message} onChange={handleChange} className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none" placeholder="추가 요청 사항이나 상세 내용을 입력해주세요" />
          </div>
          <button type="submit" className="btn-primary w-full h-12 text-base font-semibold flex items-center justify-center gap-2">
            <Send className="w-4 h-4" />
            견적문의 접수하기
          </button>
        </form>
      </div>
    </div>
  )
}
