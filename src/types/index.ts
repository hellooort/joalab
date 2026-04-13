export type UserRole = 'consumer' | 'business' | 'dealer' | 'admin'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  phone?: string
  company?: string
  createdAt: string
}

export interface ProductOption {
  id: string
  modelCode: string
  name: string
  consumerPrice: number
  businessPrice: number
  dealerPrice: number
  unit: string
  stock: number
  calibration?: boolean
}

export interface Product {
  id: string
  code: string
  name: string
  brand: string
  origin: string
  category: string
  subCategory: string
  description: string
  images: string[]
  options: ProductOption[]
  leadTime: string
  tags: string[]
  isNew?: boolean
  isBest?: boolean
  createdAt: string
}

export interface CartItem {
  productId: string
  optionId: string
  quantity: number
}

export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  totalAmount: number
  status: OrderStatus
  shippingAddress: string
  createdAt: string
}

export interface OrderItem {
  productId: string
  productName: string
  optionId: string
  optionName: string
  quantity: number
  unitPrice: number
  totalPrice: number
}

export type OrderStatus = 'pending' | 'paid' | 'preparing' | 'shipping' | 'delivered' | 'cancelled'

export interface MarketPost {
  id: string
  title: string
  content: string
  category: string
  condition: '새것' | '중고'
  price: number
  images: string[]
  author: string
  phone: string
  views: number
  createdAt: string
}

export interface EventPost {
  id: string
  title: string
  content: string
  thumbnail: string
  startDate: string
  endDate: string
  isActive: boolean
  createdAt: string
}

export interface Notice {
  id: string
  title: string
  content: string
  isImportant: boolean
  views: number
  createdAt: string
}

export interface FAQ {
  id: string
  category: string
  question: string
  answer: string
}

export interface Inquiry {
  id: string
  userId: string
  title: string
  content: string
  status: 'waiting' | 'answered'
  answer?: string
  createdAt: string
}

export interface PopupConfig {
  id: string
  title: string
  imageUrl: string
  linkUrl?: string
  isActive: boolean
  startDate: string
  endDate: string
  position: { top: number; left: number }
  size: { width: number; height: number }
}

export interface Category {
  id: string
  name: string
  slug: string
  children?: Category[]
}
