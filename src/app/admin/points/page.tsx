'use client'

import { useState } from 'react'
import { Coins, Save, RotateCcw } from 'lucide-react'

interface PointSettings {
  consumerRate: number
  businessRate: number
  dealerRate: number
  signupBonus: number
  minUseAmount: number
  minOrderAmount: number
  expiryDays: number
  enabled: boolean
}

const DEFAULT_SETTINGS: PointSettings = {
  consumerRate: 1,
  businessRate: 2,
  dealerRate: 3,
  signupBonus: 5000,
  minUseAmount: 1000,
  minOrderAmount: 10000,
  expiryDays: 365,
  enabled: true,
}

export default function AdminPointsPage() {
  const [settings, setSettings] = useState<PointSettings>(DEFAULT_SETTINGS)
  const [saved, setSaved] = useState(false)

  const handleChange = (key: keyof PointSettings, value: number | boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
    setSaved(false)
  }

  const handleSave = () => {
    setSaved(true)
    alert('적립금 설정이 저장되었습니다. (데모)')
  }

  const handleReset = () => {
    setSettings(DEFAULT_SETTINGS)
    setSaved(false)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Coins className="w-6 h-6 text-primary" />
            적립금 설정
          </h1>
          <p className="text-sm text-gray-500 mt-1">회원 등급별 적립률 및 적립금 정책을 설정합니다.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleReset} className="btn-outline flex items-center gap-1 text-sm">
            <RotateCcw className="w-4 h-4" />초기화
          </button>
          <button onClick={handleSave} className="btn-primary flex items-center gap-1 text-sm">
            <Save className="w-4 h-4" />저장
          </button>
        </div>
      </div>

      {saved && (
        <div className="mb-4 bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-lg">
          설정이 저장되었습니다.
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 적립금 활성화 */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-lg font-bold text-gray-900 mb-4">적립금 사용 여부</h2>
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleChange('enabled', !settings.enabled)}
              className={`relative w-12 h-6 rounded-full transition-colors ${settings.enabled ? 'bg-primary' : 'bg-gray-300'}`}
            >
              <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${settings.enabled ? 'left-6' : 'left-0.5'}`} />
            </button>
            <span className="text-sm text-gray-700">{settings.enabled ? '적립금 기능 활성화됨' : '적립금 기능 비활성화됨'}</span>
          </div>
        </div>

        {/* 회원가입 축하 적립금 */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-lg font-bold text-gray-900 mb-4">회원가입 축하 적립금</h2>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={settings.signupBonus}
              onChange={(e) => handleChange('signupBonus', parseInt(e.target.value) || 0)}
              className="w-40 h-10 px-3 border border-gray-300 rounded-lg text-sm text-right"
            />
            <span className="text-sm text-gray-600">원</span>
          </div>
          <p className="text-xs text-gray-400 mt-2">신규 회원가입 시 자동으로 지급되는 적립금입니다.</p>
        </div>

        {/* 등급별 적립률 */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 lg:col-span-2">
          <h2 className="text-lg font-bold text-gray-900 mb-4">등급별 적립률</h2>
          <p className="text-xs text-gray-400 mb-4">상품 구매 확정 시 결제 금액의 해당 비율만큼 적립됩니다.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-blue-200 rounded-xl p-4 bg-blue-50/30">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold">일반</span>
                <span className="text-sm font-semibold text-gray-800">일반고객</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={settings.consumerRate}
                  onChange={(e) => handleChange('consumerRate', parseFloat(e.target.value) || 0)}
                  className="w-20 h-10 px-3 border border-gray-300 rounded-lg text-sm text-right"
                  step="0.5"
                  min="0"
                  max="100"
                />
                <span className="text-sm font-bold text-gray-600">%</span>
              </div>
            </div>
            <div className="border border-green-200 rounded-xl p-4 bg-green-50/30">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xs font-bold">사업</span>
                <span className="text-sm font-semibold text-gray-800">사업자</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={settings.businessRate}
                  onChange={(e) => handleChange('businessRate', parseFloat(e.target.value) || 0)}
                  className="w-20 h-10 px-3 border border-gray-300 rounded-lg text-sm text-right"
                  step="0.5"
                  min="0"
                  max="100"
                />
                <span className="text-sm font-bold text-gray-600">%</span>
              </div>
            </div>
            <div className="border border-red-200 rounded-xl p-4 bg-red-50/30">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-8 h-8 bg-red-100 text-red-700 rounded-full flex items-center justify-center text-xs font-bold">대리</span>
                <span className="text-sm font-semibold text-gray-800">대리점</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={settings.dealerRate}
                  onChange={(e) => handleChange('dealerRate', parseFloat(e.target.value) || 0)}
                  className="w-20 h-10 px-3 border border-gray-300 rounded-lg text-sm text-right"
                  step="0.5"
                  min="0"
                  max="100"
                />
                <span className="text-sm font-bold text-gray-600">%</span>
              </div>
            </div>
          </div>
        </div>

        {/* 적립금 사용 조건 */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-lg font-bold text-gray-900 mb-4">적립금 사용 조건</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">최소 사용 금액</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={settings.minUseAmount}
                  onChange={(e) => handleChange('minUseAmount', parseInt(e.target.value) || 0)}
                  className="w-40 h-10 px-3 border border-gray-300 rounded-lg text-sm text-right"
                  step="500"
                />
                <span className="text-sm text-gray-600">원 이상</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">적립금 사용 시 최소 사용 금액입니다.</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">최소 주문 금액</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={settings.minOrderAmount}
                  onChange={(e) => handleChange('minOrderAmount', parseInt(e.target.value) || 0)}
                  className="w-40 h-10 px-3 border border-gray-300 rounded-lg text-sm text-right"
                  step="1000"
                />
                <span className="text-sm text-gray-600">원 이상 주문 시</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">해당 금액 이상 주문 시에만 적립금 사용 가능합니다.</p>
            </div>
          </div>
        </div>

        {/* 적립금 유효기간 */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-lg font-bold text-gray-900 mb-4">적립금 유효기간</h2>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={settings.expiryDays}
              onChange={(e) => handleChange('expiryDays', parseInt(e.target.value) || 0)}
              className="w-40 h-10 px-3 border border-gray-300 rounded-lg text-sm text-right"
              min="0"
            />
            <span className="text-sm text-gray-600">일</span>
          </div>
          <p className="text-xs text-gray-400 mt-2">적립일로부터 해당 기간 경과 시 적립금이 자동 소멸됩니다. (0 = 무제한)</p>
        </div>
      </div>
    </div>
  )
}
