'use client'

import { formatDistanceToNowStrict } from 'date-fns'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import toast from 'react-hot-toast'
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from 'react-icons/ai'
import { mutate } from 'swr'
import { AvatarLink } from '@/components/molecules/AvatarLink'
import {
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

export function PostItem({ data }: Props) {
  const router = useRouter()
  const loginModal = useLoginModal()
  const { data: currentUser } = useGetCurrent()
  const { data: fetchedPost } = useGetPostsPostId({ param: { postId: data.id } })
  const { trigger: like } = usePostLike()
  const { trigger: unlike } = useDeleteLike()

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
        await unlike({ json: { postId: data.id } })
      } else {
        await like({ json: { postId: data.id } })
      }

      await mutate(getGetPostsPostIdKey({ param: { postId: data.id } }))
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
