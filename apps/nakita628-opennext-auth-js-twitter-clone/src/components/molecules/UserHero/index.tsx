'use client'

import Image from 'next/image'
import { Avatar } from '@/components/atoms/Avatar'
import { useGetUsersUserId } from '@/hooks/swr'

type Props = {
  userId: string
}

export function UserHero({ userId }: Props) {
  const { data: fetchedUser } = useGetUsersUserId({ param: { userId } })

  return (
    <div className='pb-16'>
      <div className='bg-neutral-700 h-44 relative'>
        {fetchedUser?.coverImage && (
          <Image
            src={fetchedUser.coverImage}
            fill
            alt='Cover Image'
            style={{ objectFit: 'cover' }}
          />
        )}
        <div className='absolute -bottom-16 left-4'>
          <Avatar src={fetchedUser?.profileImage || '/images/placeholder.png'} isLarge hasBorder />
        </div>
      </div>
    </div>
  )
}
