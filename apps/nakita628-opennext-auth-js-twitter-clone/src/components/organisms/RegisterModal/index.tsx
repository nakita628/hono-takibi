'use client'

import { useState, useCallback } from 'react'
import { useLoginModal } from '@/hooks/useLoginModal'
import { useRegisterModal } from '@/hooks/useRegisterModal'
import { usePostRegister } from '@/hooks/swr'
import { signIn } from '@/lib'
import { Modal } from '@/components/molecules/Modal'
import { FormField } from '@/components/molecules/FormField'

export function RegisterModal() {
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()
  const { trigger: register } = usePostRegister()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = useCallback(async () => {
    setIsLoading(true)
    try {
      await register({
        json: { email, name, username, password },
      })
      const result = await signIn(email, password)
      if (result.ok) {
        registerModal.onClose()
        window.location.reload()
      }
    } catch {
      // Registration failed
    } finally {
      setIsLoading(false)
    }
  }, [email, name, username, password, register, registerModal])

  const onToggle = useCallback(() => {
    registerModal.onClose()
    loginModal.onOpen()
  }, [registerModal, loginModal])

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <FormField
        label='メールアドレス'
        id='register-email'
        placeholder='メールアドレスを入力'
        value={email}
        type='email'
        disabled={isLoading}
        onChange={(e) => setEmail(e.target.value)}
      />
      <FormField
        label='名前'
        id='register-name'
        placeholder='名前を入力'
        value={name}
        disabled={isLoading}
        onChange={(e) => setName(e.target.value)}
      />
      <FormField
        label='ユーザー名'
        id='register-username'
        placeholder='ユーザー名を入力'
        value={username}
        disabled={isLoading}
        onChange={(e) => setUsername(e.target.value)}
      />
      <FormField
        label='パスワード'
        id='register-password'
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
        すでにアカウントをお持ちですか？{' '}
        <span
          onClick={onToggle}
          className='text-white cursor-pointer hover:underline'
        >
          ログインする
        </span>
      </p>
    </div>
  )

  return (
    <Modal
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      onSubmit={onSubmit}
      title='アカウント登録'
      body={bodyContent}
      footer={footerContent}
      actionLabel='登録'
      disabled={isLoading}
    />
  )
}
