'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function PricingRedirect() {
  const router = useRouter()
  useEffect(() => {
    router.replace('/admin/products')
  }, [router])
  return (
    <div className="text-center py-20 text-gray-400">
      <p>상품 관리 페이지로 이동합니다...</p>
    </div>
  )
}
