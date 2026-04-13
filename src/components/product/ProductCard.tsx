'use client'

import Link from 'next/link'
import { useAuthStore } from '@/store/auth-store'
import { getPrice, getPriceLabel } from '@/lib/pricing'
import { formatPrice } from '@/lib/utils'
import type { Product } from '@/types'
import { Package } from 'lucide-react'

interface ProductCardProps {
  product: Product
  variant?: 'grid' | 'circle'
}

export default function ProductCard({ product, variant = 'grid' }: ProductCardProps) {
  const user = useAuthStore((s) => s.user)
  const firstOption = product.options[0]
  const price = firstOption ? getPrice(firstOption, user?.role ?? null) : 0
  const priceLabel = getPriceLabel(user?.role ?? null)
  const hasStock = product.options.some((o) => o.stock > 0)

  if (variant === 'circle') {
    return (
      <Link href={`/products/${product.id}`} className="flex flex-col items-center group">
        <div className="w-36 h-36 rounded-full bg-gray-100 flex items-center justify-center mb-3 group-hover:shadow-lg transition overflow-hidden">
          <Package className="w-12 h-12 text-gray-400" />
        </div>
        <p className="text-xs text-gray-400 uppercase tracking-wide">{product.brand}</p>
        <h3 className="text-sm font-medium text-gray-800 text-center mt-1 line-clamp-2 group-hover:text-primary transition">
          {product.name}
        </h3>
        <p className="text-sm font-bold text-primary mt-2">{formatPrice(price)}원</p>
      </Link>
    )
  }

  return (
    <Link href={`/products/${product.id}`} className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition">
      <div className="aspect-square bg-gray-50 flex items-center justify-center relative">
        <Package className="w-16 h-16 text-gray-300" />
        <div className="absolute top-2 left-2 flex gap-1">
          {product.isNew && <span className="badge badge-new">NEW</span>}
          {product.isBest && <span className="badge badge-hot">인기</span>}
          {product.tags.includes('당일출고') && <span className="badge badge-ship">당일출고</span>}
        </div>
        {!hasStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="text-white font-bold text-sm bg-black/60 px-3 py-1 rounded">품절</span>
          </div>
        )}
      </div>
      <div className="p-3">
        <p className="text-xs text-gray-400 uppercase tracking-wide">{product.brand}</p>
        <h3 className="text-sm font-medium text-gray-800 mt-1 line-clamp-2 min-h-[2.5rem] group-hover:text-primary transition">
          {product.name}
        </h3>
        <div className="mt-2">
          <span className="text-xs text-gray-400">{priceLabel}</span>
          <p className="text-base font-bold price-tag">{formatPrice(price)}<span className="text-sm font-normal text-gray-500">원</span></p>
        </div>
        {user?.role === 'business' && firstOption && (
          <p className="text-xs text-gray-400 line-through mt-0.5">{formatPrice(firstOption.consumerPrice)}원</p>
        )}
        {(user?.role === 'dealer' || user?.role === 'admin') && firstOption && (
          <p className="text-xs text-gray-400 line-through mt-0.5">{formatPrice(firstOption.consumerPrice)}원</p>
        )}
      </div>
    </Link>
  )
}
