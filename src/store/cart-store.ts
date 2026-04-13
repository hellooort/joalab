import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem } from '@/types'

interface CartState {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (productId: string, optionId: string) => void
  updateQuantity: (productId: string, optionId: string, quantity: number) => void
  clearCart: () => void
  getItemCount: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        set((state) => {
          const existing = state.items.find(
            i => i.productId === item.productId && i.optionId === item.optionId
          )
          if (existing) {
            return {
              items: state.items.map(i =>
                i.productId === item.productId && i.optionId === item.optionId
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            }
          }
          return { items: [...state.items, item] }
        })
      },

      removeItem: (productId, optionId) => {
        set((state) => ({
          items: state.items.filter(
            i => !(i.productId === productId && i.optionId === optionId)
          ),
        }))
      },

      updateQuantity: (productId, optionId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, optionId)
          return
        }
        set((state) => ({
          items: state.items.map(i =>
            i.productId === productId && i.optionId === optionId
              ? { ...i, quantity }
              : i
          ),
        }))
      },

      clearCart: () => set({ items: [] }),

      getItemCount: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    { name: 'joalab-cart' }
  )
)
