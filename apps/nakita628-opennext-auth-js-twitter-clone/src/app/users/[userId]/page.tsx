'use client'

import { useParams } from 'next/navigation'
import { useGetUsersUserId } from '@/hooks/swr'
import { Header } from '@/components/atoms/Header'
import { UserHero } from '@/components/molecules/UserHero'
import { UserBio } from '@/components/organisms/UserBio'
import { PostFeed } from '@/components/organisms/PostFeed'

export default function UserView() {
  const params = useParams()
  const { userId } = params

  if (!userId || typeof userId !== 'string') {
    throw new Error('Invalid ID')
  }

  const { data: fetchedUser, isLoading } = useGetUsersUserId({
    param: { userId },
  })

  if (isLoading || !fetchedUser) {
    return (
      <div className='flex justify-center items-center h-full'>
        <div className='animate-spin rounded-full h-20 w-20 border-b-2 border-sky-500' />
      </div>
    )
  }

  return (
    <>
      <Header showBackArrow label={fetchedUser.name} />
      <UserHero userId={userId} />
      <UserBio userId={userId} />
      <PostFeed userId={userId} />
    </>
  )
}
