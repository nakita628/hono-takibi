'use client'

import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { mutate } from 'swr'
import { unstable_serialize } from 'swr/infinite'
import { ImageUpload } from '@/components/atoms/ImageUpload'
import { Input } from '@/components/atoms/Input'
import { Modal } from '@/components/molecules/Modal'
import {
  getGetCurrentKey,
  getGetPostsKey,
  getGetUsersKey,
  getGetUsersUserIdKey,
  useGetCurrent,
  usePatchEdit,
} from '@/hooks'
import { useChangePasswordModal, useEditModal } from '@/stores'

function postsInfiniteKey(userId?: string) {
  return unstable_serialize((index) =>
    getGetPostsKey({
      query: userId ? { userId, page: index + 1 } : { page: index + 1 },
    }),
  )
}

/**
 * EditModal — Profile editing form
 *
 * ||| SWR Data Flow |||
 *
 *   useGetCurrent()  → pre-fill form with current user data
 *   usePatchEdit()   → mutation: PATCH /edit (update name, username, bio, images)
 *
 * ||| Cache Invalidation After Save |||
 *
 *   Revalidates multiple caches in parallel because profile data appears in many places:
 *     getGetCurrentKey()                    → refresh sidebar & auth state
 *     postsInfiniteKey()                    → refresh post feed (author name/avatar)
 *     getGetUsersKey({ query: {} })         → refresh "Who to follow" list
 *     getGetUsersUserIdKey({ userId })      → refresh user profile page
 *     postsInfiniteKey(currentUser.id)      → refresh user's own post feed
 *
 * ||| postsInfiniteKey(userId?) |||
 *
 *   Uses `unstable_serialize` from swr/infinite.
 *   Without userId: invalidates the global post feed.
 *   With userId: invalidates the user-specific post feed (on /users/:userId page).
 */
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

      const revalidations = [
        mutate(getGetCurrentKey()),
        mutate(postsInfiniteKey()),
        mutate(getGetUsersKey({ query: {} })),
      ]
      if (currentUser?.id) {
        revalidations.push(
          mutate(getGetUsersUserIdKey({ param: { userId: currentUser.id } })),
          mutate(postsInfiniteKey(currentUser.id)),
        )
      }
      await Promise.all(revalidations)
      toast.success('Profile updated')

      editModal.onClose()
    } catch {
      toast.error('Failed to update profile')
    } finally {
      setIsLoading(false)
    }
  }, [editModal, currentUser?.id, name, username, bio, coverImage, profileImage, patchEdit])

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
