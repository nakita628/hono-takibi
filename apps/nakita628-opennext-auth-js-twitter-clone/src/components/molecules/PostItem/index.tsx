'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from 'react-icons/ai'
import { AvatarLink } from '@/components/molecules/AvatarLink'
import { useGetCurrent } from '@/hooks/swr'
import { useLike } from '@/hooks/useLike'
import { useLoginModal } from '@/hooks/useLoginModal'
import { formatRelativeTime } from '@/lib/format'

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
  const { hasLiked, toggleLike } = useLike({ postId: data.id })

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
    return formatRelativeTime(data.createdAt)
  }, [data.createdAt])

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
