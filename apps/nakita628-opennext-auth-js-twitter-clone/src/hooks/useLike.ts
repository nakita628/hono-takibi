'use client'

import { useCallback, useMemo } from 'react'
import toast from 'react-hot-toast'
import { mutate } from 'swr'
import {
  getGetPostsPostIdKey,
  useDeleteLike,
  useGetCurrent,
  useGetPostsPostId,
  usePostLike,
} from '@/hooks/swr'
import { useLoginModal } from '@/hooks/useLoginModal'

/**
 * Hook to toggle like/unlike on a post.
 *
 * @param postId - The ID of the post to like/unlike
 * @returns `hasLiked` state and `toggleLike` action
 *
 * @mermaid
 * graph TD
 *   A[toggleLike called] --> B{currentUser?}
 *   B -- No --> C[Open login modal]
 *   B -- Yes --> D{hasLiked?}
 *   D -- Yes --> E[DELETE /like]
 *   D -- No --> F[POST /like]
 *   E --> G[mutate post data]
 *   F --> G
 *   G --> H[toast.success]
 *   E -. error .-> I[toast.error]
 *   F -. error .-> I
 */
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
      toast.success(hasLiked ? 'Unliked' : 'Liked')
    } catch {
      toast.error('Something went wrong')
    }
  }, [currentUser, hasLiked, postId, like, unlike, loginModal])

  return { hasLiked, toggleLike }
}
