'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Mail, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="container-custom py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <Image src="/logo.png" alt="JoaLab" width={120} height={40} className="h-9 w-auto brightness-0 invert" />
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>경기도 하남시 미사강변서로 16, F 1006 (하우스디 스마트밸리)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0" />
                <span>sales@joagene.com</span>
              </div>
              <p className="text-xs text-gray-400 mt-3">
                사업자등록번호: 119-81-98001 | 대표: 임경준<br />
                통신판매업신고: 2025-경기하남-0901
              </p>
            </div>
          </div>

          {/* Customer Center */}
          <div>
            <h3 className="text-sm font-bold text-white mb-4">고객센터</h3>
            <p className="text-2xl font-bold text-white mb-2">02-3463-7190</p>
            <div className="space-y-1 text-sm">
              <p>평일(월-금) 09:00 ~ 18:00</p>
              <p className="text-gray-400">(토·일요일 및 공휴일 휴무)</p>
              <p className="mt-2">Fax : 02-3463-7196</p>
            </div>
          </div>

          {/* Banking Info */}
          <div>
            <h3 className="text-sm font-bold text-white mb-4">무통장입금 안내</h3>
            <p className="text-lg font-bold text-white mb-1">421737-04001600</p>
            <p className="text-sm mb-2">국민은행 | 예금주: (주) 조아진</p>
            <p className="text-xs text-gray-400 leading-relaxed">
              ※ 입금자 성함과 기재하신 입금자 명이 다를 경우 확인이 지연될 수 있으니 고객센터로 꼭 연락 주세요.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-white mb-4">바로가기</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products" className="hover:text-white transition">전체상품</Link></li>
              <li><Link href="/market" className="hover:text-white transition">중고장터</Link></li>
              <li><Link href="/event" className="hover:text-white transition">이벤트</Link></li>
              <li><Link href="/support" className="hover:text-white transition">고객센터</Link></li>
              <li><Link href="/estimate" className="hover:text-white transition">견적문의</Link></li>
              <li><Link href="/terms" className="hover:text-white transition">이용약관</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition font-semibold text-white">개인정보처리방침</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-900 py-4">
        <div className="container-custom text-center text-xs text-gray-500">
          <p>Copyright &copy; Joagene Bioscience Co.,Ltd All right reserved</p>
        </div>
      </div>
    </footer>
  )
}
