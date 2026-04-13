'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, FlaskConical, Pipette, Shield, TestTubes, Beaker, Microscope, Snowflake, Droplets } from 'lucide-react'
import ProductCard from '@/components/product/ProductCard'
import { products } from '@/data/products'
import { events } from '@/data/events'
import { categories } from '@/data/categories'

const BANNERS = [
  { id: 1, title: '3월 트리플 혜택', subtitle: '전품목 할인 + Set상품 추가할인 + 5mL 튜브 키링증정', bg: 'from-blue-600 to-blue-800', link: '/event/ev001' },
  { id: 2, title: 'BANDIO Bio Science', subtitle: '이달의 브랜드 - 전 제품 특별 할인', bg: 'from-green-600 to-green-800', link: '/event/ev002' },
  { id: 3, title: 'Eppendorf 피펫 세트', subtitle: '3개 세트 구매 시 15% 추가 할인 + 무료 교정', bg: 'from-purple-600 to-purple-800', link: '/event/ev003' },
]

const QUICK_CATEGORIES = [
  { icon: Pipette, label: 'Pipette Tips', slug: 'pipette-tips' },
  { icon: Beaker, label: 'Cell Culture', slug: 'cell-culture' },
  { icon: TestTubes, label: 'Tubes', slug: 'tubes' },
  { icon: FlaskConical, label: 'Filtration', slug: 'filtration' },
  { icon: Shield, label: 'Gloves', slug: 'gloves' },
  { icon: Snowflake, label: 'Cryo', slug: 'cryo' },
  { icon: Microscope, label: 'Chembio 기기', slug: 'chembio-equipment' },
  { icon: Droplets, label: 'Chembio Buffer', slug: 'chembio-buffer' },
]

const PRODUCT_TABS = [
  { id: 'all', label: '전체' },
  { id: 'pipette-tips', label: 'PIPETTE TIPS' },
  { id: 'cell-culture', label: 'CELL CULTURE' },
  { id: 'tubes', label: 'TUBES' },
  { id: 'pcr', label: 'PCR' },
  { id: 'filtration', label: 'FILTRATION' },
  { id: 'gloves', label: 'GLOVES' },
  { id: 'cryo', label: 'CRYO' },
  { id: 'chembio-equipment', label: 'CHEMBIO 기기' },
  { id: 'chembio-reagent', label: 'CHEMBIO 시약' },
  { id: 'chembio-buffer', label: 'CHEMBIO BUFFER' },
]

export default function HomePage() {
  const [currentBanner, setCurrentBanner] = useState(0)
  const [activeTab, setActiveTab] = useState('all')

  const newProducts = products.filter((p) => p.isNew).slice(0, 4)
  const bestProducts = products.filter((p) => p.isBest)
  const filteredProducts = activeTab === 'all' ? products : products.filter((p) => p.category === activeTab)

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative overflow-hidden">
        <div className={`bg-gradient-to-r ${BANNERS[currentBanner].bg} py-16 md:py-24 transition-all duration-500`}>
          <div className="container-custom">
            <div className="text-center text-white">
              <p className="text-sm md:text-base opacity-80 mb-2">EVENT</p>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">{BANNERS[currentBanner].title}</h1>
              <p className="text-base md:text-lg opacity-90 mb-6">{BANNERS[currentBanner].subtitle}</p>
              <Link href={BANNERS[currentBanner].link} className="inline-flex items-center gap-1 bg-white text-gray-900 px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-gray-100 transition">
                자세히 보기 <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {BANNERS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentBanner(i)}
              className={`w-2.5 h-2.5 rounded-full transition ${i === currentBanner ? 'bg-white' : 'bg-white/40'}`}
            />
          ))}
        </div>
      </section>

      {/* Quick Category */}
      <section className="py-8 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            {QUICK_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/products?category=${cat.slug}`}
                className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-gray-50 transition group"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center group-hover:bg-primary-light transition">
                  <cat.icon className="w-7 h-7 text-gray-500 group-hover:text-primary transition" />
                </div>
                <span className="text-sm font-medium text-gray-700">{cat.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Products */}
      <section className="py-10 bg-gray-50">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="text-accent font-bold text-lg">NEW</span>
              <h2 className="text-xl font-bold text-gray-900">PRODUCT</h2>
              <span className="text-gray-400 text-sm">신상품</span>
            </div>
            <Link href="/products?sort=new" className="text-sm text-gray-500 hover:text-primary flex items-center gap-1">
              더보기 <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Best Products */}
      <section className="py-10 bg-white">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="text-accent font-bold text-lg">BEST</span>
              <h2 className="text-xl font-bold text-gray-900">SELLER</h2>
              <span className="text-gray-400 text-sm">인기상품</span>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {bestProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Product Tabs (Chembio Style) */}
      <section className="py-10 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-1">쇼핑하기</h2>
            <p className="text-sm text-gray-500">고객의 신뢰를 바탕으로 JoaLab이 엄선한 제품들을 만나보세요</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {PRODUCT_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition ${
                  activeTab === tab.id
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-primary hover:text-primary'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filteredProducts.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {filteredProducts.length > 8 && (
            <div className="text-center mt-6">
              <Link href={`/products${activeTab !== 'all' ? `?category=${activeTab}` : ''}`} className="btn-outline inline-flex items-center gap-1">
                전체 상품 보기 <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Brand / Event Banner */}
      <section className="py-10 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {events.filter(e => e.isActive).slice(0, 2).map((event) => (
              <Link
                key={event.id}
                href={`/event/${event.id}`}
                className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 p-8 hover:shadow-lg transition group"
              >
                <p className="text-xs text-primary font-semibold mb-1">EVENT</p>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition">{event.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{event.content}</p>
                <p className="text-xs text-gray-400 mt-3">{event.startDate} ~ {event.endDate}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
