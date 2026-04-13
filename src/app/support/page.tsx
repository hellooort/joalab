'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Bell, HelpCircle, MessageSquare, ChevronDown, ChevronUp, Phone, Mail, Clock } from 'lucide-react'
import { notices, faqs } from '@/data/events'
import { formatDate } from '@/lib/utils'

const TABS = [
  { id: 'notice', label: '공지사항', icon: Bell },
  { id: 'faq', label: '자주 묻는 질문', icon: HelpCircle },
  { id: 'inquiry', label: '1:1 문의', icon: MessageSquare },
]

const FAQ_CATS = ['전체', '주문/결제', '배송', '교환/반품', '회원', 'A/S', '교정']

export default function SupportPage() {
  const [activeTab, setActiveTab] = useState('notice')
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null)
  const [faqCat, setFaqCat] = useState('전체')

  const filteredFaqs = faqCat === '전체' ? faqs : faqs.filter((f) => f.category === faqCat)

  return (
    <div className="container-custom py-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">고객센터</h1>
        <p className="text-sm text-gray-500 mt-2">궁금한 점이 있으시면 언제든 문의해주세요</p>
      </div>

      {/* Contact Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-primary-light rounded-xl p-5 text-center">
          <Phone className="w-8 h-8 text-primary mx-auto mb-2" />
          <h3 className="font-semibold text-gray-900">전화 문의</h3>
          <p className="text-lg font-bold text-primary mt-1">053-292-4574</p>
        </div>
        <div className="bg-primary-light rounded-xl p-5 text-center">
          <Mail className="w-8 h-8 text-primary mx-auto mb-2" />
          <h3 className="font-semibold text-gray-900">이메일 문의</h3>
          <p className="text-sm text-gray-600 mt-1">info@joalab.com</p>
        </div>
        <div className="bg-primary-light rounded-xl p-5 text-center">
          <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
          <h3 className="font-semibold text-gray-900">운영시간</h3>
          <p className="text-sm text-gray-600 mt-1">평일 09:00 ~ 18:00</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition ${
              activeTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notice */}
      {activeTab === 'notice' && (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-500 w-16">번호</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">제목</th>
                <th className="px-4 py-3 text-center font-medium text-gray-500 w-20">조회</th>
                <th className="px-4 py-3 text-center font-medium text-gray-500 w-28">날짜</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {notices.map((notice, i) => (
                <tr key={notice.id} className="hover:bg-gray-50 transition cursor-pointer">
                  <td className="px-4 py-3 text-gray-400">{notices.length - i}</td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-2">
                      {notice.isImportant && <span className="badge badge-hot text-[10px]">중요</span>}
                      <span className="text-gray-800 hover:text-primary">{notice.title}</span>
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center text-gray-400">{notice.views}</td>
                  <td className="px-4 py-3 text-center text-gray-400">{formatDate(notice.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* FAQ */}
      {activeTab === 'faq' && (
        <div>
          <div className="flex gap-2 mb-4">
            {FAQ_CATS.map((cat) => (
              <button key={cat} onClick={() => setFaqCat(cat)} className={`px-3 py-1.5 text-sm rounded-full transition ${faqCat === cat ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                {cat}
              </button>
            ))}
          </div>
          <div className="space-y-2">
            {filteredFaqs.map((faq) => (
              <div key={faq.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-primary font-bold text-sm">Q</span>
                    <span className="text-sm font-medium text-gray-800">{faq.question}</span>
                  </div>
                  {expandedFaq === faq.id ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </button>
                {expandedFaq === faq.id && (
                  <div className="px-5 pb-4 animate-fadeIn">
                    <div className="flex gap-3 bg-gray-50 p-4 rounded-lg">
                      <span className="text-accent font-bold text-sm">A</span>
                      <span className="text-sm text-gray-600">{faq.answer}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Inquiry */}
      {activeTab === 'inquiry' && (
        <div className="max-w-2xl mx-auto">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">1:1 문의하기</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">문의 유형</label>
                <select className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm">
                  <option>상품 문의</option>
                  <option>배송 문의</option>
                  <option>교환/반품</option>
                  <option>A/S 문의</option>
                  <option>기타</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">제목</label>
                <input type="text" className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm" placeholder="문의 제목을 입력하세요" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">내용</label>
                <textarea className="w-full h-40 px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none" placeholder="문의 내용을 자세히 작성해주세요" />
              </div>
              <button onClick={() => alert('문의가 등록되었습니다. 빠른 시일 내 답변 드리겠습니다. (데모)')} className="btn-primary w-full h-11">문의하기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
