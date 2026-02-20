'use client'

import { useMemo } from 'react'
import { BiCalendar } from 'react-icons/bi'
import { Button } from '@/components/atoms/Button'
import { useGetCurrent, useGetUsersUserId } from '@/hooks/swr'
import { useEditModal } from '@/hooks/useEditModal'
import { useFollow } from '@/hooks/useFollow'
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
    <div className='border-b border-neutral-800 pb-4'>
      <div className='flex justify-end pt-16 pr-2 pb-2 pl-2'>
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
      <div className='mt-4 px-4'>
        <div className='flex flex-col'>
          <p className='text-white text-2xl font-semibold'>{fetchedUser?.name}</p>
          <p className='text-md text-neutral-500'>@{fetchedUser?.username}</p>
        </div>
        <div className='flex flex-col mt-4'>
          <p className='text-white'>{fetchedUser?.bio}</p>
          <div className='flex flex-row items-center gap-2 mt-4 text-neutral-500'>
            <BiCalendar size={24} />
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
