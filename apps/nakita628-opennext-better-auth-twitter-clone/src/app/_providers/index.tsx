'use client'

import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { Toaster } from 'react-hot-toast'
import { SWRConfig } from 'swr'
import { ChangePasswordModal } from '@/components/organisms/ChangePasswordModal'
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
        <Toaster />
        <LoginModal />
        <RegisterModal />
        <EditModal />
        <ChangePasswordModal />
        {children}
      </SWRConfig>
    </NuqsAdapter>
  )
}
