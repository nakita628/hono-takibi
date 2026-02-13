'use client'

import { Logo } from '@/components/atoms/Logo'
import { Button } from '@/components/atoms/Button'
import { useLoginModal } from '@/hooks/useLoginModal'
import { useRegisterModal } from '@/hooks/useRegisterModal'

export default function Page() {
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()

  return (
    <div className='flex items-center justify-center h-screen bg-black'>
      <div className='flex flex-col items-center gap-8 p-8'>
        <Logo size={64} />
        <h1 className='text-3xl font-bold text-white'>いま何が起きているか見てみよう</h1>
        <div className='flex flex-col gap-4 w-full max-w-xs'>
          <Button
            label='ログイン'
            onClick={loginModal.onOpen}
            fullWidth
            large
          />
          <Button
            label='アカウント登録'
            onClick={registerModal.onOpen}
            fullWidth
            large
            secondary
          />
        </div>
      </div>
    </div>
  )
}
