'use client'

import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { useSWRConfig } from 'swr'

import { Input } from '@/components/atoms/Input'
import { Modal } from '@/components/molecules/Modal'
import { usePatchEdit } from '@/hooks'
import { authClient } from '@/infra/auth-client'
import { useLoginModal, useRegisterModal } from '@/stores'

export function RegisterModal() {
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()
  const { trigger: edit } = usePatchEdit()
  const { mutate } = useSWRConfig()
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

      const result = await authClient.signUp.email({ email, password, name })
      if (!result.data) {
        toast.error('Failed to create account')
        return
      }

      await edit({ json: { username, name } })
      toast.success('Account created')
      await mutate(() => true)

      registerModal.onClose()
    } catch {
      toast.error('Failed to create account')
    } finally {
      setIsLoading(false)
    }
  }, [email, username, name, password, edit, registerModal, mutate])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Email"
        value={email}
        disabled={isLoading}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="Name"
        value={name}
        disabled={isLoading}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder="Username"
        value={username}
        disabled={isLoading}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        placeholder="Password"
        value={password}
        disabled={isLoading}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
  )

  const footerContent = (
    <div className="mt-4 text-center text-neutral-400">
      <p>
        Already have an account?{' '}
        <button
          type="button"
          onClick={onToggle}
          className="text-white cursor-pointer hover:underline"
        >
          Sign in
        </button>
      </p>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Create an account"
      actionLabel="Register"
      onClose={registerModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  )
}
