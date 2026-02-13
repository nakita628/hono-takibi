'use client'

import { SessionProvider } from '@hono/auth-js/react'
import { EditModal } from '@/components/organisms/EditModal'
import { LoginModal } from '@/components/organisms/LoginModal'
import { RegisterModal } from '@/components/organisms/RegisterModal'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <LoginModal />
      <RegisterModal />
      <EditModal />
      {children}
    </SessionProvider>
  )
}
