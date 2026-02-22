'use client'

import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { Input } from '@/components/atoms/Input'
import { Modal } from '@/components/molecules/Modal'
import { useChangePasswordModal } from '@/hooks/useChangePasswordModal'
import { authClient } from '@/infra/auth-client'

export function ChangePasswordModal() {
  const changePasswordModal = useChangePasswordModal()
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = useCallback(async () => {
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match')
      return
    }

    try {
      setIsLoading(true)
      await authClient.changePassword({
        currentPassword,
        newPassword,
      })
      toast.success('Password changed successfully')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      changePasswordModal.onClose()
    } catch {
      toast.error('Failed to change password')
    } finally {
      setIsLoading(false)
    }
  }, [currentPassword, newPassword, confirmPassword, changePasswordModal])

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Input
        placeholder='Current Password'
        value={currentPassword}
        type='password'
        disabled={isLoading}
        onChange={(e) => setCurrentPassword(e.target.value)}
      />
      <Input
        placeholder='New Password'
        value={newPassword}
        type='password'
        disabled={isLoading}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <Input
        placeholder='Confirm New Password'
        value={confirmPassword}
        type='password'
        disabled={isLoading}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={changePasswordModal.isOpen}
      title='Change Password'
      actionLabel='Change password'
      onClose={changePasswordModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  )
}
