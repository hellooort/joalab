import type { Metadata } from 'next'
import './globals.css'
import ShopLayout from '@/components/layout/ShopLayout'

export const metadata: Metadata = {
  title: 'JoaLab - 실험실 전문 쇼핑몰',
  description: '마이크로피펫, 실험소모품, 이화학기기 전문 쇼핑몰 JoaLab',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen flex flex-col">
        <ShopLayout>{children}</ShopLayout>
      </body>
    </html>
  )
}
