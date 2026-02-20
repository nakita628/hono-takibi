'use client'

import { SWRConfig } from 'swr'
import { EditModal } from '@/components/organisms/EditModal'
import { LoginModal } from '@/components/organisms/LoginModal'
import { RegisterModal } from '@/components/organisms/RegisterModal'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig
      value={{
        shouldRetryOnError: false,
      }}
    >
      <LoginModal />
      <RegisterModal />
      <EditModal />
      {children}
    </SWRConfig>
  )
}
