import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface WishlistItem {
  productId: string
  addedAt: string
}

interface WishlistState {
  items: WishlistItem[]
  addItem: (productId: string) => void
  removeItem: (productId: string) => void
  isWished: (productId: string) => boolean
  toggleItem: (productId: string) => void
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (productId) => {
        set((state) => {
          if (state.items.some((i) => i.productId === productId)) return state
          return { items: [...state.items, { productId, addedAt: new Date().toISOString().split('T')[0] }] }
        })
      },

      removeItem: (productId) => {
        set((state) => ({ items: state.items.filter((i) => i.productId !== productId) }))
      },

      isWished: (productId) => get().items.some((i) => i.productId === productId),

      toggleItem: (productId) => {
        if (get().isWished(productId)) {
          get().removeItem(productId)
        } else {
          get().addItem(productId)
        }
      },
    }),
    { name: 'joalab-wishlist' }
  )
)
