'use client'

import { useCallback, useState } from 'react'
import { toast } from 'sonner'
import { useSWRConfig } from 'swr'
import { Input } from '@/components/atoms/Input'
import { Modal } from '@/components/molecules/Modal'
import { useLoginModal } from '@/hooks/useLoginModal'
import { useRegisterModal } from '@/hooks/useRegisterModal'
import { authClient } from '@/lib/auth-client'

export function LoginModal() {
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()
  const { mutate } = useSWRConfig()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const onToggle = useCallback(() => {
    if (isLoading) return
    loginModal.onClose()
    registerModal.onOpen()
  }, [isLoading, loginModal, registerModal])

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true)
      const result = await authClient.signIn.email({ email, password })
      if (result.data) {
        await mutate(() => true)
        loginModal.onClose()
      }
    } catch {
      toast.error('Failed to sign in')
    } finally {
      setIsLoading(false)
    }
  }, [email, password, loginModal, mutate])

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Input
        placeholder='Email'
        value={email}
        disabled={isLoading}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder='Password'
        value={password}
        type='password'
        disabled={isLoading}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
  )

  const footerContent = (
    <div className='mt-4 text-center text-neutral-400'>
      <p>
        First time using Twitter?{' '}
        <button type='button' onClick={onToggle} className='text-white cursor-pointer hover:underline'>
          Create an account
        </button>
      </p>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title='Login'
      actionLabel='Sign in'
      onClose={loginModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  )
}
