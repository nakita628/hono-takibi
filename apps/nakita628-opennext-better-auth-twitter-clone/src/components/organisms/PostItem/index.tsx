'use client'

import { formatDistanceToNowStrict } from 'date-fns'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import toast from 'react-hot-toast'
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from 'react-icons/ai'
import { mutate } from 'swr'
import { unstable_serialize } from 'swr/infinite'
import { AvatarLink } from '@/components/molecules/AvatarLink'
import {
  getGetPostsKey,
  getGetPostsPostIdKey,
  useDeleteLike,
  useGetCurrent,
  useGetPostsPostId,
  usePostLike,
} from '@/hooks'
import { useLoginModal } from '@/stores'

type PostItemUser = {
  id: string
  name: string
  username: string
  profileImage: string | null
}

type PostSummaryData = {
  id: string
  body: string
  createdAt: string
  user: PostItemUser
  commentCount: number
  likeCount: number
  hasLiked: boolean
}

type PostDetailComment = {
  id: string
  body: string
  createdAt: string
  user: PostItemUser
}

type PostDetailLike = {
  userId: string
}

type PostDetailData = {
  id: string
  body: string
  createdAt: string
  user: PostItemUser
  comments: PostDetailComment[]
  likes: PostDetailLike[]
}

type Props = {
  data: PostSummaryData | PostDetailData
}

/**
 * PostItem — Renders a single post (tweet) card
 *
 * Handles two data shapes:
 *   - PostSummaryData: from post feed (has commentCount, likeCount, hasLiked)
 *   - PostDetailData: from post detail page (has full comments[], likes[] arrays)
 *
 * ||| Like Status |||
 *
 *   PostSummaryData (feed): uses `hasLiked` from the API response (no extra fetch)
 *   PostDetailData (detail page): uses `likes[]` array to check against current user
 *
 * ||| Like Toggle Flow |||
 *
 *   User clicks heart icon
 *       |
 *       v
 *   Is logged in? ─ No ──→ Open login modal
 *       | Yes
 *       v
 *   Already liked? ─ Yes ──→ unlike({ postId })
 *       | No                     |
 *       v                       v
 *   like({ postId })       Invalidate caches:
 *       |                    - posts/:postId (detail)
 *       v                    - posts infinite (feed, to refresh hasLiked)
 *   Invalidate caches
 */
export function PostItem({ data }: Props) {
  const router = useRouter()
  const loginModal = useLoginModal()
  const { data: currentUser } = useGetCurrent()
  const { trigger: like } = usePostLike()
  const { trigger: unlike } = useDeleteLike()

  // For PostDetailData (detail page): fetch full post to stay fresh
  // For PostSummaryData (feed): don't fetch — use hasLiked from the API response
  const isDetailData = 'likes' in data
  const { data: fetchedPost } = useGetPostsPostId(
    { param: { postId: data.id } },
    { swr: { enabled: isDetailData } },
  )

  const hasLiked = useMemo(() => {
    if (isDetailData) {
      const likes = fetchedPost?.likes ?? (data as PostDetailData).likes
      return likes.some((l) => l.userId === currentUser?.id)
    }
    return (data as PostSummaryData).hasLiked
  }, [isDetailData, data, fetchedPost?.likes, currentUser?.id])

  const toggleLike = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen()
    }

    try {
      if (hasLiked) {
        await unlike({ json: { postId: data.id } })
      } else {
        await like({ json: { postId: data.id } })
      }

      // Invalidate both the detail cache and the feed cache
      await Promise.all([
        mutate(getGetPostsPostIdKey({ param: { postId: data.id } })),
        mutate(unstable_serialize((index) => getGetPostsKey({ query: { page: index + 1 } }))),
      ])
      toast.success(hasLiked ? 'Unliked' : 'Liked')
    } catch {
      toast.error('Something went wrong')
    }
  }, [currentUser, hasLiked, data.id, like, unlike, loginModal])

  const goToUser = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation()
      router.push(`/users/${data.user.id}`)
    },
    [router, data.user.id],
  )

  const goToPost = useCallback(() => {
    router.push(`/posts/${data.id}`)
  }, [router, data.id])

  const onLike = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation()
      if (!currentUser) {
        loginModal.onOpen()
        return
      }
      toggleLike()
    },
    [loginModal, currentUser, toggleLike],
  )

  const createdAt = useMemo(() => {
    if (!data?.createdAt) return null
    return formatDistanceToNowStrict(new Date(data.createdAt))
  }, [data?.createdAt])

  return (
    <button
      type='button'
      onClick={goToPost}
      className='border-b border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition w-full text-left'
    >
      <div className='flex flex-row items-start gap-3'>
        <AvatarLink
          userId={data.user.id}
          src={data.user.profileImage || '/images/placeholder.png'}
        />
        <div>
          <div className='flex flex-row items-center gap-2'>
            <button
              type='button'
              onClick={goToUser}
              className='text-white font-semibold cursor-pointer hover:underline'
            >
              {data.user.name}
            </button>
            <button
              type='button'
              onClick={goToUser}
              className='text-neutral-500 cursor-pointer hover:underline hidden md:block'
            >
              @{data.user.username}
            </button>
            <span className='text-neutral-500 text-sm'>{createdAt}</span>
          </div>
          <div className='text-white mt-1'>{data.body}</div>
          <div className='flex flex-row items-center mt-3 gap-10'>
            <div className='flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500'>
              <AiOutlineMessage size={20} />
              <p>{'commentCount' in data ? data.commentCount : data.comments.length}</p>
            </div>
            <button
              type='button'
              onClick={onLike}
              className='flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500'
            >
              {hasLiked ? <AiFillHeart size={20} color='red' /> : <AiOutlineHeart size={20} />}
              <p>{'likeCount' in data ? data.likeCount : data.likes.length}</p>
            </button>
          </div>
        </div>
      </div>
    </button>
  )
}
