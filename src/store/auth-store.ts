import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User, UserRole } from '@/types'

interface AuthState {
  user: User | null
  isLoggedIn: boolean
  login: (email: string, password: string) => boolean
  logout: () => void
  register: (data: { email: string; password: string; name: string; role: UserRole; phone?: string; company?: string }) => boolean
  switchRole: (role: UserRole) => void
}

const DEMO_USERS: (User & { password: string })[] = [
  { id: '1', email: 'consumer@joalab.com', password: '1234', name: '김소비', role: 'consumer', phone: '010-1234-5678', createdAt: '2025-01-15' },
  { id: '2', email: 'business@joalab.com', password: '1234', name: '이업체', role: 'business', phone: '010-2345-6789', company: '(주)바이오텍', createdAt: '2025-02-10' },
  { id: '3', email: 'dealer@joalab.com', password: '1234', name: '박대리', role: 'dealer', phone: '010-3456-7890', company: '조아랩 대구지점', createdAt: '2025-01-05' },
  { id: '4', email: 'admin@joalab.com', password: 'admin', name: '관리자', role: 'admin', phone: '053-292-4574', company: 'JoaLab', createdAt: '2024-01-01' },
]

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,

      login: (email, password) => {
        const found = DEMO_USERS.find(u => u.email === email && u.password === password)
        if (found) {
          const { password: _, ...user } = found
          set({ user, isLoggedIn: true })
          return true
        }
        return false
      },

      logout: () => {
        set({ user: null, isLoggedIn: false })
      },

      register: (data) => {
        const exists = DEMO_USERS.find(u => u.email === data.email)
        if (exists) return false
        const newUser: User = {
          id: String(DEMO_USERS.length + 1),
          email: data.email,
          name: data.name,
          role: data.role,
          phone: data.phone,
          company: data.company,
          createdAt: new Date().toISOString().split('T')[0],
        }
        DEMO_USERS.push({ ...newUser, password: data.password })
        set({ user: newUser, isLoggedIn: true })
        return true
      },

      switchRole: (role) => {
        const { user } = get()
        if (user) {
          set({ user: { ...user, role } })
        }
      },
    }),
    { name: 'joalab-auth' }
  )
)
