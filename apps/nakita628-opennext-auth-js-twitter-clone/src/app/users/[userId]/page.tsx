'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Header } from '@/components/atoms/Header'
import { UserHero } from '@/components/molecules/UserHero'
import { PostFeed } from '@/components/organisms/PostFeed'
import { UserBio } from '@/components/organisms/UserBio'
import { useGetCurrent, useGetUsersUserId } from '@/hooks/swr'

export default function UserView() {
  const router = useRouter()
  const params = useParams()
  const { userId } = params

  if (!userId || typeof userId !== 'string') {
    throw new Error('Invalid ID')
  }

  const { data: currentUser, isLoading: isLoadingUser } = useGetCurrent()
  const { data: fetchedUser, isLoading: isLoadingProfile } = useGetUsersUserId(
    { param: { userId } },
    { swr: { enabled: !!currentUser } },
  )

  useEffect(() => {
    if (!isLoadingUser && !currentUser) {
      router.push('/')
    }
  }, [isLoadingUser, currentUser, router])

  if (isLoadingUser || isLoadingProfile || !fetchedUser) {
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
