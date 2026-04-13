import type { UserRole, ProductOption } from '@/types'

export function getPrice(option: ProductOption, role: UserRole | null): number {
  switch (role) {
    case 'dealer':
    case 'admin':
      return option.dealerPrice
    case 'business':
      return option.businessPrice
    default:
      return option.consumerPrice
  }
}

export function getPriceLabel(role: UserRole | null): string {
  switch (role) {
    case 'dealer':
    case 'admin':
      return '대리점가'
    case 'business':
      return '사업자가'
    default:
      return '판매가'
  }
}

export function getVisiblePrices(role: UserRole | null): { label: string; key: keyof Pick<ProductOption, 'consumerPrice' | 'businessPrice' | 'dealerPrice'> }[] {
  switch (role) {
    case 'admin':
    case 'dealer':
      return [
        { label: '일반고객가', key: 'consumerPrice' },
        { label: '사업자가', key: 'businessPrice' },
        { label: '대리점가', key: 'dealerPrice' },
      ]
    case 'business':
      return [
        { label: '일반고객가', key: 'consumerPrice' },
        { label: '사업자가', key: 'businessPrice' },
      ]
    default:
      return [
        { label: '판매가', key: 'consumerPrice' },
      ]
  }
}
