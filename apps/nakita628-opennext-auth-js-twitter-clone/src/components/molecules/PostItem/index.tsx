'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useMemo } from 'react'
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
              <svg width={20} height={20} viewBox='0 0 24 24' fill='currentColor'>
                <path d='M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18z' />
              </svg>
              <p>{data.comments?.length || 0}</p>
            </div>
            <div
              onClick={onLike}
              className='flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500'
            >
              {hasLiked ? (
                <svg width={20} height={20} viewBox='0 0 24 24' fill='red'>
                  <path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' />
                </svg>
              ) : (
                <svg width={20} height={20} viewBox='0 0 24 24' fill='currentColor'>
                  <path d='M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z' />
                </svg>
              )}
              <p>{data.likes?.length || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
