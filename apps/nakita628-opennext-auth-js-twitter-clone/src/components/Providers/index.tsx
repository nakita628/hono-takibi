'use client'

import { SessionProvider } from '@hono/auth-js/react'
import { LoginModal } from '@/components/organisms/LoginModal'
import { RegisterModal } from '@/components/organisms/RegisterModal'
import { EditModal } from '@/components/organisms/EditModal'

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
