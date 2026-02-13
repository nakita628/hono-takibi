'use client'

import { useState, useCallback } from 'react'
import { useLoginModal } from '@/hooks/useLoginModal'
import { useRegisterModal } from '@/hooks/useRegisterModal'
import { usePostRegister } from '@/hooks/swr'
import { signIn } from '@/lib'
import { Modal } from '@/components/molecules/Modal'
import { Input } from '@/components/atoms/Input'

export function RegisterModal() {
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()
  const { trigger: register } = usePostRegister()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const onToggle = useCallback(() => {
    if (isLoading) return
    registerModal.onClose()
    loginModal.onOpen()
  }, [isLoading, registerModal, loginModal])

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true)

      await register({
        json: { email, username, name, password },
      })

      signIn(email, password)

      registerModal.onClose()
    } catch {
      // Registration failed
    } finally {
      setIsLoading(false)
    }
  }, [email, username, name, password, register, registerModal])

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Input
        placeholder='Email'
        value={email}
        disabled={isLoading}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder='Name'
        value={name}
        disabled={isLoading}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder='Username'
        value={username}
        disabled={isLoading}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        placeholder='Password'
        value={password}
        disabled={isLoading}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
  )

  const footerContent = (
    <div className='mt-4 text-center text-neutral-400'>
      <p>
        Already have an account?{' '}
        <span
          onClick={onToggle}
          className='text-white cursor-pointer hover:underline'
        >
          Sign in
        </span>
      </p>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title='Create an account'
      actionLabel='Register'
      onClose={registerModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  )
}
