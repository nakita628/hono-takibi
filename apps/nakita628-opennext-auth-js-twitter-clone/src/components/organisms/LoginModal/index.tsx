'use client'

import { useState, useCallback } from 'react'
import { useLoginModal } from '@/hooks/useLoginModal'
import { useRegisterModal } from '@/hooks/useRegisterModal'
import { signIn } from '@/lib'
import { Modal } from '@/components/molecules/Modal'
import { Input } from '@/components/atoms/Input'

export function LoginModal() {
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()
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
      const result = await signIn(email, password)
      if (result.ok) {
        loginModal.onClose()
      }
    } catch {
      // Login failed
    } finally {
      setIsLoading(false)
    }
  }, [email, password, loginModal])

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
        <span
          onClick={onToggle}
          className='text-white cursor-pointer hover:underline'
        >
          Create an account
        </span>
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
