'use client'

import { useState, useRef } from 'react'
import { X, Printer, FileText } from 'lucide-react'
import type { OrderData } from '@/data/orders'
import { formatPrice } from '@/lib/utils'

interface InvoiceModalProps {
  order: OrderData
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

export default function InvoiceModal({ order, onClose }: InvoiceModalProps) {
  const [step, setStep] = useState<'form' | 'preview'>('form')
  const [companyName, setCompanyName] = useState(order.company || '')
  const [personName, setPersonName] = useState(order.customer || '')
  const printRef = useRef<HTMLDivElement>(null)

  const itemsTotal = order.items.reduce((sum, item) => sum + item.totalPrice, 0)
  const grandTotal = itemsTotal + order.shippingFee
  const today = new Date().toISOString().split('T')[0]

  const handleGenerate = () => {
    if (!companyName.trim() || !personName.trim()) {
      alert('소속(상호명)과 성함을 모두 입력해주세요.')
      return
    }
    setStep('preview')
  }

  const handlePrint = () => {
    const printContent = printRef.current
    if (!printContent) return

    const printWindow = window.open('', '_blank', 'width=1000,height=700')
    if (!printWindow) return

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>거래 명세서 - ${order.id}</title>
        <style>
          @page { size: A4 landscape; margin: 10mm; }
          body { font-family: 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif; margin: 0; padding: 20px; color: #333; }
          .invoice-wrapper { max-width: 900px; margin: 0 auto; }
          .invoice-title { text-align: center; font-size: 26px; color: #1a56db; margin-bottom: 15px; font-weight: bold; }
          .recipient { text-align: right; font-weight: bold; font-size: 14px; margin-bottom: 15px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 15px; }
          th, td { border: 1px solid #ddd; padding: 7px 10px; font-size: 12px; }
          .info-label { background-color: #f8f8f8; font-weight: bold; text-align: center; width: 12%; }
          .items-header th { background-color: #1a56db; color: white; font-weight: bold; text-align: center; padding: 9px 10px; }
          .items-body td { text-align: center; }
          .items-body td.left { text-align: left; }
          .items-body td.right { text-align: right; }
          .items-body tr:nth-child(even) { background-color: #f9fafb; }
          .shipping-row { background-color: #f3f4f6 !important; }
          .total-row td { background-color: #f8f8f8; font-weight: bold; }
          .total-amount { color: #1a56db; }
          .footer { display: flex; justify-content: space-between; align-items: flex-start; margin-top: 20px; border-top: 1px solid #ddd; padding-top: 15px; }
          .notes { font-size: 12px; }
          .notes p { margin: 3px 0; }
          .stamp { text-align: right; font-size: 14px; font-weight: bold; color: #1a56db; }
        </style>
      </head>
      <body>${printContent.innerHTML}</body>
      </html>
    `)
    printWindow.document.close()
    setTimeout(() => {
      printWindow.print()
    }, 300)
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {step === 'form' ? (
        <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 animate-fadeIn">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 bg-[#1a56db] rounded-t-xl">
            <h3 className="text-white font-bold flex items-center gap-2"><FileText className="w-5 h-5" /> 거래 명세서 정보 입력</h3>
            <button onClick={onClose} className="text-white/80 hover:text-white"><X className="w-5 h-5" /></button>
          </div>
          <div className="p-5 space-y-4">
            <div>
              <p className="text-xs text-gray-500 mb-3 bg-gray-50 p-3 rounded-lg">
                주문번호: <span className="font-mono font-medium">{order.id}</span><br />
                주문일: {order.date} | 상품 {order.items.length}건
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">소속(상호명) *</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm"
                placeholder="소속 또는 상호명을 입력하세요"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">성함 *</label>
              <input
                type="text"
                value={personName}
                onChange={(e) => setPersonName(e.target.value)}
                className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm"
                placeholder="성함을 입력하세요"
              />
            </div>
          </div>
          <div className="flex gap-2 px-5 pb-5">
            <button onClick={onClose} className="btn-outline flex-1">취소</button>
            <button onClick={handleGenerate} className="flex-1 bg-[#1a56db] text-white py-2.5 px-4 rounded-lg font-semibold hover:bg-[#1240a8] transition">거래 명세서 생성</button>
          </div>
        </div>
      ) : (
        <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-4xl mx-4 max-h-[90vh] flex flex-col animate-fadeIn">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 bg-[#1a56db] rounded-t-xl shrink-0">
            <h3 className="text-white font-bold flex items-center gap-2"><FileText className="w-5 h-5" /> 거래 명세서</h3>
            <div className="flex items-center gap-2">
              <button onClick={handlePrint} className="flex items-center gap-1 bg-white/20 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-white/30 transition">
                <Printer className="w-4 h-4" /> 인쇄
              </button>
              <button onClick={onClose} className="text-white/80 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
          </div>

          <div className="overflow-auto p-5">
            <div ref={printRef}>
              <div className="invoice-wrapper" style={{ maxWidth: 900, margin: '0 auto', fontFamily: "'Malgun Gothic', sans-serif" }}>
                <h1 style={{ textAlign: 'center', fontSize: 26, color: '#1a56db', marginBottom: 15, fontWeight: 'bold' }}>거래 명세서</h1>
                <div style={{ textAlign: 'right', fontWeight: 'bold', fontSize: 14, marginBottom: 15 }}>
                  <span>{companyName}</span>
                  <span style={{ marginLeft: 15 }}>{personName} 귀하</span>
                </div>

                {/* Info Table */}
                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 15, fontSize: 12 }}>
                  <tbody>
                    <tr>
                      <td style={{ width: '12%', backgroundColor: '#f8f8f8', fontWeight: 'bold', textAlign: 'center', border: '1px solid #ddd', padding: '7px 10px' }}>주문번호</td>
                      <td style={{ width: '22%', border: '1px solid #ddd', padding: '7px 10px' }}>{order.id}</td>
                      <td style={{ width: '12%', backgroundColor: '#f8f8f8', fontWeight: 'bold', textAlign: 'center', border: '1px solid #ddd', padding: '7px 10px' }}>사업자번호</td>
                      <td style={{ border: '1px solid #ddd', padding: '7px 10px' }} colSpan={2}>{BUSINESS_INFO.businessNumber}</td>
                      <td style={{ width: '12%', textAlign: 'center', verticalAlign: 'middle', border: '1px solid #ddd', padding: '7px 10px', fontWeight: 'bold', color: '#1a56db' }} rowSpan={3}>{BUSINESS_INFO.companyName}</td>
                    </tr>
                    <tr>
                      <td style={{ backgroundColor: '#f8f8f8', fontWeight: 'bold', textAlign: 'center', border: '1px solid #ddd', padding: '7px 10px' }}>작성일</td>
                      <td style={{ border: '1px solid #ddd', padding: '7px 10px' }}>{today}</td>
                      <td style={{ backgroundColor: '#f8f8f8', fontWeight: 'bold', textAlign: 'center', border: '1px solid #ddd', padding: '7px 10px' }}>상호</td>
                      <td style={{ border: '1px solid #ddd', padding: '7px 10px' }}>{BUSINESS_INFO.companyName}</td>
                      <td style={{ border: '1px solid #ddd', padding: '7px 10px' }}>대표: {BUSINESS_INFO.ceo}</td>
                    </tr>
                    <tr>
                      <td style={{ backgroundColor: '#f8f8f8', fontWeight: 'bold', textAlign: 'center', border: '1px solid #ddd', padding: '7px 10px' }}>T E L</td>
                      <td style={{ border: '1px solid #ddd', padding: '7px 10px' }}>{BUSINESS_INFO.tel} / FAX: {BUSINESS_INFO.fax}</td>
                      <td style={{ backgroundColor: '#f8f8f8', fontWeight: 'bold', textAlign: 'center', border: '1px solid #ddd', padding: '7px 10px' }}>사업장 주소</td>
                      <td style={{ border: '1px solid #ddd', padding: '7px 10px' }} colSpan={2}>{BUSINESS_INFO.address}</td>
                    </tr>
                    <tr>
                      <td style={{ backgroundColor: '#f8f8f8', fontWeight: 'bold', textAlign: 'center', border: '1px solid #ddd', padding: '7px 10px' }}>E-mail</td>
                      <td style={{ border: '1px solid #ddd', padding: '7px 10px' }}>{BUSINESS_INFO.email}</td>
                      <td style={{ backgroundColor: '#f8f8f8', fontWeight: 'bold', textAlign: 'center', border: '1px solid #ddd', padding: '7px 10px' }}>업태 / 종목</td>
                      <td style={{ border: '1px solid #ddd', padding: '7px 10px' }} colSpan={2}>{BUSINESS_INFO.business} / {BUSINESS_INFO.category}</td>
                    </tr>
                  </tbody>
                </table>

                {/* Items Table */}
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                  <thead>
                    <tr>
                      <th style={{ backgroundColor: '#1a56db', color: 'white', fontWeight: 'bold', border: '1px solid #ddd', padding: '9px 10px', textAlign: 'center', width: 50 }}>순번</th>
                      <th style={{ backgroundColor: '#1a56db', color: 'white', fontWeight: 'bold', border: '1px solid #ddd', padding: '9px 10px', textAlign: 'center' }}>품목</th>
                      <th style={{ backgroundColor: '#1a56db', color: 'white', fontWeight: 'bold', border: '1px solid #ddd', padding: '9px 10px', textAlign: 'center', width: 160 }}>Cat.No.</th>
                      <th style={{ backgroundColor: '#1a56db', color: 'white', fontWeight: 'bold', border: '1px solid #ddd', padding: '9px 10px', textAlign: 'center', width: 60 }}>수량</th>
                      <th style={{ backgroundColor: '#1a56db', color: 'white', fontWeight: 'bold', border: '1px solid #ddd', padding: '9px 10px', textAlign: 'center', width: 110 }}>단가</th>
                      <th style={{ backgroundColor: '#1a56db', color: 'white', fontWeight: 'bold', border: '1px solid #ddd', padding: '9px 10px', textAlign: 'center', width: 110 }}>금액</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item, idx) => (
                      <tr key={idx} style={{ backgroundColor: idx % 2 === 1 ? '#f9fafb' : 'white' }}>
                        <td style={{ border: '1px solid #ddd', padding: '7px 10px', textAlign: 'center' }}>{idx + 1}</td>
                        <td style={{ border: '1px solid #ddd', padding: '7px 10px', textAlign: 'left' }}>{item.name}</td>
                        <td style={{ border: '1px solid #ddd', padding: '7px 10px', textAlign: 'center' }}>{item.option}</td>
                        <td style={{ border: '1px solid #ddd', padding: '7px 10px', textAlign: 'center' }}>{item.quantity}</td>
                        <td style={{ border: '1px solid #ddd', padding: '7px 10px', textAlign: 'right' }}>{formatPrice(item.unitPrice)}원</td>
                        <td style={{ border: '1px solid #ddd', padding: '7px 10px', textAlign: 'right' }}>{formatPrice(item.totalPrice)}원</td>
                      </tr>
                    ))}
                    {order.shippingFee > 0 && (
                      <tr style={{ backgroundColor: '#f3f4f6' }}>
                        <td style={{ border: '1px solid #ddd', padding: '7px 10px', textAlign: 'center' }}>-</td>
                        <td style={{ border: '1px solid #ddd', padding: '7px 10px', textAlign: 'right', fontWeight: 'bold' }} colSpan={4}>배송비</td>
                        <td style={{ border: '1px solid #ddd', padding: '7px 10px', textAlign: 'right', fontWeight: 'bold' }}>{formatPrice(order.shippingFee)}원</td>
                      </tr>
                    )}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td style={{ border: '1px solid #ddd', padding: '9px 10px', textAlign: 'right', fontWeight: 'bold', backgroundColor: '#f8f8f8' }} colSpan={5}>합계(부가세포함)</td>
                      <td style={{ border: '1px solid #ddd', padding: '9px 10px', textAlign: 'right', fontWeight: 'bold', color: '#1a56db', backgroundColor: '#f8f8f8', fontSize: 14 }}>{formatPrice(grandTotal)}원</td>
                    </tr>
                  </tfoot>
                </table>

                {/* Footer */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: 20, borderTop: '1px solid #ddd', paddingTop: 15 }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ marginBottom: 5, fontWeight: 'bold', fontSize: 13 }}>참고사항</p>
                    <p style={{ margin: '3px 0', fontSize: 12, color: '#555' }}>1. 상기 금액은 부가세 포함 금액입니다.</p>
                    <p style={{ margin: '3px 0', fontSize: 12, color: '#555' }}>2. 문의사항: {BUSINESS_INFO.tel}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: 16, fontWeight: 'bold', color: '#1a56db', marginBottom: 5 }}>{BUSINESS_INFO.companyName}</p>
                    <p style={{ fontSize: 11, color: '#888' }}>대표이사 {BUSINESS_INFO.ceo}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2 px-5 py-4 border-t border-gray-200 shrink-0">
            <button onClick={() => setStep('form')} className="btn-outline">← 정보 수정</button>
            <div className="flex-1" />
            <button onClick={onClose} className="btn-outline">닫기</button>
            <button onClick={handlePrint} className="bg-[#1a56db] text-white py-2.5 px-5 rounded-lg font-semibold hover:bg-[#1240a8] transition flex items-center gap-2">
              <Printer className="w-4 h-4" /> 인쇄
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
