'use client'

import { useCallback, useMemo } from 'react'
import toast from 'react-hot-toast'
import { mutate } from 'swr'
import {
  getGetCurrentKey,
  getGetUsersUserIdKey,
  useDeleteFollow,
  useGetCurrent,
  usePostFollow,
} from '@/hooks/swr'
import { useLoginModal } from '@/hooks/useLoginModal'
import { client } from '@/lib'

/**
 * Hook to toggle follow/unfollow on a user.
 *
 * @param userId - The ID of the user to follow/unfollow
 * @returns `isFollowing` state and `toggleFollow` action
 *
 * @mermaid
 * graph TD
 *   A[toggleFollow called] --> B{currentUser?}
 *   B -- No --> C[Open login modal]
 *   B -- Yes --> D{isFollowing?}
 *   D -- Yes --> E[DELETE /follow]
 *   D -- No --> F[POST /follow]
 *   E --> G[mutate current + user data]
 *   F --> G
 *   G --> H[toast.success]
 *   E -. error .-> I[toast.error]
 *   F -. error .-> I
 */
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
        await client.follow.$delete({ json: { userId } })
      } else {
        await client.follow.$post({ json: { userId } })
      }
      await mutate(getGetCurrentKey())
      await mutate(getGetUsersUserIdKey({ param: { userId } }))
      toast.success(isFollowing ? 'Unfollowed' : 'Followed')
    } catch {
      toast.error('Something went wrong')
    }
  }, [currentUser, isFollowing, userId, follow, unfollow, loginModal])

  return { isFollowing, toggleFollow }
}
