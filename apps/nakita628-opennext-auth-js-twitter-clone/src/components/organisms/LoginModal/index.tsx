'use client'

import { useState, useCallback } from 'react'
import { useLoginModal } from '@/hooks/useLoginModal'
import { useRegisterModal } from '@/hooks/useRegisterModal'
import { signIn } from '@/lib'
import { Modal } from '@/components/molecules/Modal'
import { FormField } from '@/components/molecules/FormField'

export function LoginModal() {
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = useCallback(async () => {
    setIsLoading(true)
    const result = await signIn(email, password)
    if (result.ok) {
      loginModal.onClose()
      window.location.reload()
    }
    setIsLoading(false)
  }, [email, password, loginModal])

  const onToggle = useCallback(() => {
    loginModal.onClose()
    registerModal.onOpen()
  }, [loginModal, registerModal])

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <FormField
        label='メールアドレス'
        id='email'
        placeholder='メールアドレスを入力'
        value={email}
        type='email'
        disabled={isLoading}
        onChange={(e) => setEmail(e.target.value)}
      />
      <FormField
        label='パスワード'
        id='password'
        placeholder='パスワードを入力'
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
        アカウントがありませんか？{' '}
        <span
          onClick={onToggle}
          className='text-white cursor-pointer hover:underline'
        >
          登録する
        </span>
      </p>
    </div>
  )

  return (
    <Modal
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      onSubmit={onSubmit}
      title='ログイン'
      body={bodyContent}
      footer={footerContent}
      actionLabel='ログイン'
      disabled={isLoading}
    />
  )
}
