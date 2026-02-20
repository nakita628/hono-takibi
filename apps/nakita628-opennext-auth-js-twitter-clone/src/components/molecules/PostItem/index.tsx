'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from 'react-icons/ai'
import { AvatarLink } from '@/components/molecules/AvatarLink'
import { useGetCurrent } from '@/hooks/swr'
import { useLike } from '@/hooks/useLike'
import { useLoginModal } from '@/hooks/useLoginModal'
import { formatRelativeTime } from '@/lib/format'

type Props = {
  data: Record<string, any>
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
    <div
      onClick={goToPost}
      className='border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition'
    >
      <div className='flex flex-row items-start gap-3'>
        <AvatarLink
          userId={data.user.id}
          src={data.user.profileImage || '/images/placeholder.png'}
        />
        <div>
          <div className='flex flex-row items-center gap-2'>
            <p
              onClick={goToUser}
              className='text-white font-semibold cursor-pointer hover:underline'
            >
              {data.user.name}
            </p>
            <span
              onClick={goToUser}
              className='text-neutral-500 cursor-pointer hover:underline hidden md:block'
            >
              @{data.user.username}
            </span>
            <span className='text-neutral-500 text-sm'>{createdAt}</span>
          </div>
          <div className='text-white mt-1'>{data.body}</div>
          <div className='flex flex-row items-center mt-3 gap-10'>
            <div className='flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500'>
              <AiOutlineMessage size={20} />
              <p>{data.comments?.length || 0}</p>
            </div>
            <div
              onClick={onLike}
              className='flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500'
            >
              {hasLiked ? (
                <AiFillHeart size={20} color='red' />
              ) : (
                <AiOutlineHeart size={20} />
              )}
              <p>{data.likes?.length || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
