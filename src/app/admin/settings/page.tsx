'use client'

import { useState } from 'react'
import { Save, Settings, Globe, Truck, CreditCard } from 'lucide-react'

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    siteName: 'JoaLab',
    phone: '053-292-4574',
    email: 'info@joalab.com',
    address: '대구광역시 북구 과학로 123, JoaLab 빌딩 3층',
    freeShippingThreshold: 100000,
    defaultShippingFee: 3000,
    businessHours: '평일 09:00 ~ 18:00',
    bankInfo: '국민은행 123-456-789012 (주)조아랩',
  })

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <Settings className="w-6 h-6 text-primary" />
        사이트 설정
      </h1>

      <div className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            기본 정보
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">사이트명</label>
              <input type="text" value={settings.siteName} onChange={(e) => setSettings({ ...settings, siteName: e.target.value })} className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">연락처</label>
              <input type="text" value={settings.phone} onChange={(e) => setSettings({ ...settings, phone: e.target.value })} className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
              <input type="email" value={settings.email} onChange={(e) => setSettings({ ...settings, email: e.target.value })} className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">운영시간</label>
              <input type="text" value={settings.businessHours} onChange={(e) => setSettings({ ...settings, businessHours: e.target.value })} className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm" />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">주소</label>
              <input type="text" value={settings.address} onChange={(e) => setSettings({ ...settings, address: e.target.value })} className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm" />
            </div>
          </div>
        </div>

        {/* Shipping */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Truck className="w-5 h-5 text-primary" />
            배송 설정
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">무료배송 기준 금액 (원)</label>
              <input type="number" value={settings.freeShippingThreshold} onChange={(e) => setSettings({ ...settings, freeShippingThreshold: Number(e.target.value) })} className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">기본 배송비 (원)</label>
              <input type="number" value={settings.defaultShippingFee} onChange={(e) => setSettings({ ...settings, defaultShippingFee: Number(e.target.value) })} className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm" />
            </div>
          </div>
        </div>

        {/* Payment */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary" />
            결제 정보
          </h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">입금 계좌 정보</label>
            <input type="text" value={settings.bankInfo} onChange={(e) => setSettings({ ...settings, bankInfo: e.target.value })} className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm" />
          </div>
        </div>

        <button onClick={() => alert('설정이 저장되었습니다. (데모)')} className="btn-primary flex items-center gap-2">
          <Save className="w-4 h-4" />
          설정 저장
        </button>
      </div>
    </div>
  )
}
