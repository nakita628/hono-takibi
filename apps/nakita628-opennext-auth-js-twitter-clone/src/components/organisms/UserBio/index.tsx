'use client'

import { useMemo } from 'react'
import { useGetCurrent, useGetUsersUserId } from '@/hooks/swr'
import { useEditModal } from '@/hooks/useEditModal'
import { useFollow } from '@/hooks/useFollow'
import { Button } from '@/components/atoms/Button'
import { formatJoinDate } from '@/lib/format'

type Props = {
  userId: string
}

export function UserBio({ userId }: Props) {
  const { data: currentUser } = useGetCurrent()
  const { data: fetchedUser } = useGetUsersUserId({ param: { userId } })
  const editModal = useEditModal()
  const { isFollowing, toggleFollow } = useFollow(userId)

  const createdAt = useMemo(() => {
    if (!fetchedUser?.createdAt) return null
    return formatJoinDate(fetchedUser.createdAt)
  }, [fetchedUser?.createdAt])

  return (
    <div className='border-b-[1px] border-neutral-800 pb-4'>
      <div className='flex justify-end p-2'>
        {currentUser?.id === userId ? (
          <Button secondary label='Edit' onClick={editModal.onOpen} />
        ) : (
          <Button
            onClick={toggleFollow}
            label={isFollowing ? 'Unfollow' : 'Follow'}
            secondary={!isFollowing}
            outline={isFollowing}
          />
        )}
      </div>
      <div className='mt-8 px-4'>
        <div className='flex flex-col'>
          <p className='text-white text-2xl font-semibold'>{fetchedUser?.name}</p>
          <p className='text-md text-neutral-500'>@{fetchedUser?.username}</p>
        </div>
        <div className='flex flex-col mt-4'>
          <p className='text-white'>{fetchedUser?.bio}</p>
          <div className='flex flex-row items-center gap-2 mt-4 text-neutral-500'>
            <svg width={24} height={24} viewBox='0 0 24 24' fill='currentColor'>
              <path d='M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z' />
            </svg>
            <p>Joined {createdAt}</p>
          </div>
        </div>
        <div className='flex flex-row items-center mt-4 gap-6'>
          <div className='flex flex-row items-center gap-1'>
            <p className='text-white'>{fetchedUser?._count?.following || 0}</p>
            <p className='text-neutral-500'>Following</p>
          </div>
          <div className='flex flex-row items-center gap-1'>
            <p className='text-white'>{fetchedUser?._count?.followers || 0}</p>
            <p className='text-neutral-500'>Followers</p>
          </div>
        </div>
      </div>
    </div>
  )
}
