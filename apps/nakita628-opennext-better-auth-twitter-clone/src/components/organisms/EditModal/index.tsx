'use client'

import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { mutate } from 'swr'
import { ImageUpload } from '@/components/atoms/ImageUpload'
import { Input } from '@/components/atoms/Input'
import { Modal } from '@/components/molecules/Modal'
import { getGetCurrentKey, useGetCurrent, usePatchEdit } from '@/hooks'
import { useChangePasswordModal, useEditModal } from '@/stores'

export function EditModal() {
  const { data: currentUser } = useGetCurrent()
  const editModal = useEditModal()
  const changePasswordModal = useChangePasswordModal()
  const { trigger: patchEdit } = usePatchEdit()

  const [profileImage, setProfileImage] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [bio, setBio] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (currentUser) {
      setProfileImage(currentUser.profileImage || '')
      setCoverImage(currentUser.coverImage || '')
      setName(currentUser.name || '')
      setUsername(currentUser.username || '')
      setBio(currentUser.bio || '')
    }
  }, [currentUser])

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true)

      await patchEdit({
        json: {
          name,
          username,
          bio,
          coverImage: coverImage || null,
          profileImage: profileImage || null,
        },
      })

      await mutate(getGetCurrentKey())
      toast.success('Profile updated')

      editModal.onClose()
    } catch {
      toast.error('Failed to update profile')
    } finally {
      setIsLoading(false)
    }
  }, [editModal, name, username, bio, coverImage, profileImage, patchEdit])

  const onChangePassword = useCallback(() => {
    editModal.onClose()
    changePasswordModal.onOpen()
  }, [editModal, changePasswordModal])

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <ImageUpload
        value={profileImage}
        disabled={isLoading}
        onChange={(image) => setProfileImage(image)}
        label='Upload profile image'
      />
      <ImageUpload
        value={coverImage}
        disabled={isLoading}
        onChange={(image) => setCoverImage(image)}
        label='Upload cover image'
      />
      <Input
        placeholder='Name'
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={isLoading}
      />
      <Input
        placeholder='Username'
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        disabled={isLoading}
      />
      <Input
        placeholder='Bio'
        onChange={(e) => setBio(e.target.value)}
        value={bio}
        disabled={isLoading}
      />
    </div>
  )

  const footerContent = (
    <div className='mt-4 text-center'>
      <button
        type='button'
        onClick={onChangePassword}
        className='text-sky-500 cursor-pointer hover:underline text-sm'
      >
        Change Password
      </button>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={editModal.isOpen}
      title='Edit Profile'
      actionLabel='Save'
      onClose={editModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  )
}
