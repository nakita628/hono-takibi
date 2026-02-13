'use client'

import { LoginModal } from '@/components/organisms/LoginModal'
import { RegisterModal } from '@/components/organisms/RegisterModal'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LoginModal />
      <RegisterModal />
      {children}
    </>
  )
}
