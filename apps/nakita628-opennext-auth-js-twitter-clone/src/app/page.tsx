'use client'

import { Button } from '@/components/atoms/Button'
import { useLoginModal } from '@/hooks/useLoginModal'
import { useRegisterModal } from '@/hooks/useRegisterModal'

export default function Page() {
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()

  return (
    <div className='py-8'>
      <h1 className='text-white text-2xl text-center font-bold mb-4'>Welcome to Twitter</h1>
      <div className='flex flex-row items-center justify-center gap-4'>
        <Button label='Login' onClick={loginModal.onOpen} />
        <Button label='Register' onClick={registerModal.onOpen} secondary />
      </div>
    </div>
  )
}
