'use client'

import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { SWRConfig } from 'swr'
import { EditModal } from '@/components/organisms/EditModal'
import { LoginModal } from '@/components/organisms/LoginModal'
import { RegisterModal } from '@/components/organisms/RegisterModal'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NuqsAdapter>
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
    </NuqsAdapter>
  )
}
