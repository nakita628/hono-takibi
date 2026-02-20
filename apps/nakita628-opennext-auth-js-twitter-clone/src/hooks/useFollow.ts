'use client'

import { useCallback, useMemo } from 'react'
import { toast } from 'sonner'
import { mutate } from 'swr'
import {
  getGetCurrentKey,
  getGetUsersUserIdKey,
  useDeleteFollow,
  useGetCurrent,
  usePostFollow,
} from '@/hooks/swr'
import { useLoginModal } from '@/hooks/useLoginModal'

export function useFollow(userId: string) {
  const { data: currentUser } = useGetCurrent()
  const { trigger: follow } = usePostFollow()
  const { trigger: unfollow } = useDeleteFollow()
  const loginModal = useLoginModal()

  const isFollowing = useMemo(() => {
    if (!currentUser?.following) return false
    return currentUser.following.some((f) => f.followingId === userId)
  }, [currentUser?.following, userId])

  const toggleFollow = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen()
    }

    try {
      if (isFollowing) {
        await unfollow({ json: { userId } })
      } else {
        await follow({ json: { userId } })
      }

      await mutate(getGetCurrentKey())
      await mutate(getGetUsersUserIdKey({ param: { userId } }))
    } catch {
      toast.error('Something went wrong')
    }
  }, [currentUser, isFollowing, userId, follow, unfollow, loginModal])

  return { isFollowing, toggleFollow }
}
