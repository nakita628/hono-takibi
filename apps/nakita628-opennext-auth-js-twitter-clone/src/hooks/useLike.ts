'use client'

import { useCallback, useMemo } from 'react'
import { mutate } from 'swr'
import {
  getGetPostsPostIdKey,
  useDeleteLike,
  useGetCurrent,
  useGetPostsPostId,
  usePostLike,
} from '@/hooks/swr'
import { useLoginModal } from '@/hooks/useLoginModal'

export function useLike({ postId }: { postId: string }) {
  const { data: currentUser } = useGetCurrent()
  const { data: fetchedPost } = useGetPostsPostId({ param: { postId } })
  const { trigger: like } = usePostLike()
  const { trigger: unlike } = useDeleteLike()
  const loginModal = useLoginModal()

  const hasLiked = useMemo(() => {
    const likes = fetchedPost?.likes || []
    return likes.some((l) => l.userId === currentUser?.id)
  }, [fetchedPost?.likes, currentUser?.id])

  const toggleLike = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen()
    }

    try {
      if (hasLiked) {
        await unlike({ json: { postId } })
      } else {
        await like({ json: { postId } })
      }

      await mutate(getGetPostsPostIdKey({ param: { postId } }))
    } catch {
      // Like operation failed
    }
  }, [currentUser, hasLiked, postId, like, unlike, loginModal])

  return { hasLiked, toggleLike }
}
