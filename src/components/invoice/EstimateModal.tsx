'use client'

import { useState, useRef } from 'react'
import { X, Printer, FileText } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

export interface EstimateItem {
  name: string
  option: string
  quantity: number
  unitPrice: number
  totalPrice: number
}

interface EstimateModalProps {
  items: EstimateItem[]
  shippingFee: number
  onClose: () => void
}

const BUSINESS_INFO = {
  companyName: '(주) 조아진',
  ceo: '임경준',
  businessNumber: '119-81-98001',
  address: '경기도 하남시 미사강변서로 16, F 1006 (하우스디 스마트밸리)',
  tel: '02-3463-7190',
  fax: '02-3463-7196',
  email: 'sales@joagene.com',
  business: '제조, 도·소매',
  category: '시약, 장비, 과학기자재, 통신판매업',
  onlineSalesNumber: '2025-경기하남-0901',
}

export default function EstimateModal({ items, shippingFee, onClose }: EstimateModalProps) {
  const [step, setStep] = useState<'form' | 'preview'>('form')
  const [companyName, setCompanyName] = useState('')
  const [personName, setPersonName] = useState('')
  const printRef = useRef<HTMLDivElement>(null)

  const itemsTotal = items.reduce((sum, item) => sum + item.totalPrice, 0)
  const grandTotal = itemsTotal + shippingFee
  const today = new Date().toISOString().split('T')[0]

  const padRows = Math.max(3 - items.length, 0)

  const handleGenerate = () => {
    if (!companyName.trim() || !personName.trim()) {
      alert('소속(상호명)과 성함을 모두 입력해주세요.')
      return
    }
    setStep('preview')
  }

  const handlePrint = () => {
    const content = printRef.current
    if (!content) return
    const win = window.open('', '_blank', 'width=1000,height=700')
    if (!win) return
    win.document.write(`<!DOCTYPE html><html><head><title>견적서</title>
      <style>
        @page { size: A4 landscape; margin: 10mm; }
        body { font-family: 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif; margin: 0; padding: 20px; color: #333; }
        .est-wrap { max-width: 900px; margin: 0 auto; }
        .est-title { text-align: center; font-size: 26px; color: #1a56db; margin-bottom: 15px; font-weight: bold; }
        .est-to { text-align: right; font-weight: bold; font-size: 14px; margin-bottom: 15px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 15px; }
        th, td { border: 1px solid #ddd; padding: 7px 10px; font-size: 12px; }
        .lbl { background-color: #f8f8f8; font-weight: bold; text-align: center; }
        .hdr th { background-color: #1a56db; color: white; font-weight: bold; text-align: center; padding: 9px 10px; }
        .items td { text-align: center; }
        .items td.l { text-align: left; }
        .items td.r { text-align: right; }
        .items tr:nth-child(even) { background-color: #f9fafb; }
        .foot td { background-color: #f8f8f8; font-weight: bold; }
        .total { color: #1a56db; }
        .ft { display: flex; justify-content: space-between; align-items: flex-start; margin-top: 20px; border-top: 1px solid #ddd; padding-top: 15px; }
        .ft p { margin: 3px 0; font-size: 12px; }
      </style>
    </head><body>${content.innerHTML}</body></html>`)
    win.document.close()
    setTimeout(() => win.print(), 300)
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {step === 'form' ? (
        <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 animate-fadeIn">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 bg-[#1a56db] rounded-t-xl">
            <h3 className="text-white font-bold flex items-center gap-2"><FileText className="w-5 h-5" /> 견적서 정보 입력</h3>
            <button onClick={onClose} className="text-white/80 hover:text-white"><X className="w-5 h-5" /></button>
          </div>
          <div className="p-5 space-y-4">
            <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
              장바구니 상품 {items.length}건 | 합계 {formatPrice(grandTotal)}원
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">소속(상호명) *</label>
              <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm" placeholder="소속 또는 상호명을 입력하세요" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">성함 *</label>
              <input type="text" value={personName} onChange={(e) => setPersonName(e.target.value)} className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm" placeholder="성함을 입력하세요" />
            </div>
          </div>
          <div className="flex gap-2 px-5 pb-5">
            <button onClick={onClose} className="btn-outline flex-1">취소</button>
            <button onClick={handleGenerate} className="flex-1 bg-[#1a56db] text-white py-2.5 px-4 rounded-lg font-semibold hover:bg-[#1240a8] transition">견적서 생성</button>
          </div>
        </div>
      ) : (
        <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-4xl mx-4 max-h-[90vh] flex flex-col animate-fadeIn">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 bg-[#1a56db] rounded-t-xl shrink-0">
            <h3 className="text-white font-bold flex items-center gap-2"><FileText className="w-5 h-5" /> 견적서</h3>
            <div className="flex items-center gap-2">
              <button onClick={handlePrint} className="flex items-center gap-1 bg-white/20 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-white/30 transition"><Printer className="w-4 h-4" /> 인쇄</button>
              <button onClick={onClose} className="text-white/80 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
          </div>

          <div className="overflow-auto p-5">
            <div ref={printRef}>
              <div className="est-wrap" style={{ maxWidth: 900, margin: '0 auto', fontFamily: "'Malgun Gothic', sans-serif" }}>
                {/* Title */}
                <h1 style={{ textAlign: 'center', fontSize: 26, color: '#1a56db', marginBottom: 15, fontWeight: 'bold' }}>견적서</h1>
                <div style={{ textAlign: 'right', fontWeight: 'bold', fontSize: 14, marginBottom: 15 }}>
                  <span>{companyName}</span>
                  <span style={{ marginLeft: 15 }}>{personName} 귀중</span>
                </div>

                {/* Company Info Table */}
                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 15, fontSize: 12 }}>
                  <tbody>
                    <tr>
                      <td style={{ width: '8%', backgroundColor: '#f8f8f8', fontWeight: 'bold', textAlign: 'center', border: '1px solid #ddd', padding: '6px 10px' }}>T E L</td>
                      <td style={{ width: '15%', border: '1px solid #ddd', padding: '6px 10px' }}>{BUSINESS_INFO.tel}</td>
                      <td style={{ width: '10%', backgroundColor: '#f8f8f8', fontWeight: 'bold', textAlign: 'center', border: '1px solid #ddd', padding: '6px 10px' }}>사업자번호</td>
                      <td style={{ border: '1px solid #ddd', padding: '6px 10px' }} colSpan={3}>{BUSINESS_INFO.businessNumber}</td>
                      <td style={{ width: '12%', textAlign: 'center', verticalAlign: 'middle', border: '1px solid #ddd', padding: '6px 10px', fontWeight: 'bold', color: '#1a56db' }} rowSpan={2}>{BUSINESS_INFO.companyName}</td>
                    </tr>
                    <tr>
                      <td style={{ backgroundColor: '#f8f8f8', fontWeight: 'bold', textAlign: 'center', border: '1px solid #ddd', padding: '6px 10px' }}>F A X</td>
                      <td style={{ border: '1px solid #ddd', padding: '6px 10px' }}>{BUSINESS_INFO.fax}</td>
                      <td style={{ backgroundColor: '#f8f8f8', fontWeight: 'bold', textAlign: 'center', border: '1px solid #ddd', padding: '6px 10px' }}>상호</td>
                      <td style={{ backgroundColor: '#f8f8f8', fontWeight: 'bold', textAlign: 'center', border: '1px solid #ddd', padding: '6px 10px' }}>{BUSINESS_INFO.companyName}</td>
                      <td style={{ backgroundColor: '#f8f8f8', fontWeight: 'bold', textAlign: 'center', border: '1px solid #ddd', padding: '6px 10px' }}>성명</td>
                      <td style={{ textAlign: 'center', border: '1px solid #ddd', padding: '6px 10px' }}>{BUSINESS_INFO.ceo}</td>
                    </tr>
                    <tr>
                      <td style={{ backgroundColor: '#f8f8f8', fontWeight: 'bold', textAlign: 'center', border: '1px solid #ddd', padding: '6px 10px' }}>작성일</td>
                      <td style={{ border: '1px solid #ddd', padding: '6px 10px' }}>{today}</td>
                      <td style={{ backgroundColor: '#f8f8f8', fontWeight: 'bold', textAlign: 'center', border: '1px solid #ddd', padding: '6px 10px' }}>사업장<br />주소</td>
                      <td style={{ border: '1px solid #ddd', padding: '6px 10px' }} colSpan={4}>{BUSINESS_INFO.address}</td>
                    </tr>
                    <tr>
                      <td style={{ border: '1px solid #ddd', height: 25 }} colSpan={2}></td>
                      <td style={{ backgroundColor: '#f8f8f8', fontWeight: 'bold', textAlign: 'center', border: '1px solid #ddd', padding: '6px 10px' }}>업태</td>
                      <td style={{ textAlign: 'center', border: '1px solid #ddd', padding: '6px 10px' }}>{BUSINESS_INFO.business}</td>
                      <td style={{ backgroundColor: '#f8f8f8', fontWeight: 'bold', textAlign: 'center', border: '1px solid #ddd', padding: '6px 10px' }}>종목</td>
                      <td style={{ textAlign: 'center', border: '1px solid #ddd', padding: '6px 10px' }} colSpan={2}>{BUSINESS_INFO.category}</td>
                    </tr>
                  </tbody>
                </table>

                {/* Items Table */}
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                  <thead>
                    <tr>
                      <th style={{ backgroundColor: '#1a56db', color: 'white', fontWeight: 'bold', border: '1px solid #ddd', padding: '9px 10px', textAlign: 'center', width: 50 }}>순번</th>
                      <th style={{ backgroundColor: '#1a56db', color: 'white', fontWeight: 'bold', border: '1px solid #ddd', padding: '9px 10px', textAlign: 'center' }}>품목</th>
                      <th style={{ backgroundColor: '#1a56db', color: 'white', fontWeight: 'bold', border: '1px solid #ddd', padding: '9px 10px', textAlign: 'center', width: 180 }}>Cat.No. 및 사양</th>
                      <th style={{ backgroundColor: '#1a56db', color: 'white', fontWeight: 'bold', border: '1px solid #ddd', padding: '9px 10px', textAlign: 'center', width: 60 }}>수량</th>
                      <th style={{ backgroundColor: '#1a56db', color: 'white', fontWeight: 'bold', border: '1px solid #ddd', padding: '9px 10px', textAlign: 'center', width: 130 }}>금액(부가세포함)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, idx) => (
                      <tr key={idx} style={{ backgroundColor: idx % 2 === 1 ? '#f9fafb' : 'white' }}>
                        <td style={{ border: '1px solid #ddd', padding: '7px 10px', textAlign: 'center' }}>{idx + 1}</td>
                        <td style={{ border: '1px solid #ddd', padding: '7px 10px', textAlign: 'left' }}>{item.name}</td>
                        <td style={{ border: '1px solid #ddd', padding: '7px 10px', textAlign: 'center' }}>{item.option}</td>
                        <td style={{ border: '1px solid #ddd', padding: '7px 10px', textAlign: 'center' }}>{item.quantity}</td>
                        <td style={{ border: '1px solid #ddd', padding: '7px 10px', textAlign: 'right' }}>{formatPrice(item.totalPrice)}원</td>
                      </tr>
                    ))}
                    {Array.from({ length: padRows }).map((_, i) => (
                      <tr key={`empty-${i}`}>
                        <td style={{ border: '1px solid #ddd', padding: '7px 10px', textAlign: 'center' }}>{items.length + i + 1}</td>
                        <td style={{ border: '1px solid #ddd', padding: '7px 10px' }}></td>
                        <td style={{ border: '1px solid #ddd', padding: '7px 10px' }}></td>
                        <td style={{ border: '1px solid #ddd', padding: '7px 10px' }}></td>
                        <td style={{ border: '1px solid #ddd', padding: '7px 10px' }}></td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td style={{ border: '1px solid #ddd', padding: '8px 10px', textAlign: 'right', fontWeight: 'bold', backgroundColor: '#f0f0f0' }} colSpan={4}>배송비</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px 10px', textAlign: 'right', fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>{shippingFee === 0 ? '무료' : `${formatPrice(shippingFee)}원`}</td>
                    </tr>
                    <tr>
                      <td style={{ border: '1px solid #ddd', padding: '8px 10px', textAlign: 'right', fontWeight: 'bold', backgroundColor: '#f8f8f8' }} colSpan={4}>합계(부가세포함)</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px 10px', textAlign: 'right', fontWeight: 'bold', color: '#1a56db', backgroundColor: '#f8f8f8', fontSize: 14 }}>{formatPrice(grandTotal)}원</td>
                    </tr>
                  </tfoot>
                </table>

                {/* Footer */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: 20, borderTop: '1px solid #ddd', paddingTop: 15 }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ marginBottom: 5, fontWeight: 'bold', fontSize: 13 }}>참고사항</p>
                    <p style={{ margin: '3px 0', fontSize: 12, color: '#555' }}>1. 상기 금액은 부가세 포함 금액입니다.</p>
                    <p style={{ margin: '3px 0', fontSize: 12, color: '#555' }}>2. 견적 유효기간: 작성일로부터 1개월</p>
                    <p style={{ margin: '3px 0', fontSize: 12, color: '#555' }}>3. 문의: {BUSINESS_INFO.tel}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: 16, fontWeight: 'bold', color: '#1a56db', marginBottom: 5 }}>{BUSINESS_INFO.companyName}</p>
                    <p style={{ fontSize: 11, color: '#888', margin: 0 }}>대표이사 {BUSINESS_INFO.ceo}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2 px-5 py-4 border-t border-gray-200 shrink-0">
            <button onClick={() => setStep('form')} className="btn-outline">← 정보 수정</button>
            <div className="flex-1" />
            <button onClick={onClose} className="btn-outline">닫기</button>
            <button onClick={handlePrint} className="bg-[#1a56db] text-white py-2.5 px-5 rounded-lg font-semibold hover:bg-[#1240a8] transition flex items-center gap-2"><Printer className="w-4 h-4" /> 인쇄</button>
          </div>
        </div>
      )}
    </div>
  )
}
