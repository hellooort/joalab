'use client'

import { usePathname } from 'next/navigation'
import Header from './Header'
import Footer from './Footer'
import QuickMenu from './QuickMenu'
import Popup from './Popup'

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')

  if (isAdmin) {
    return <>{children}</>
  }

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <QuickMenu />
      <Popup />
    </>
  )
}
