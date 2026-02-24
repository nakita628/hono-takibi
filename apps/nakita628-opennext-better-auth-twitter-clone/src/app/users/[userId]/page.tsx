'use client'

import { useParams, useRouter } from 'next/navigation'
import { ClipLoader } from 'react-spinners'
import { Header } from '@/components/atoms/Header'
import { UserHero } from '@/components/molecules/UserHero'
import { PostFeed } from '@/components/organisms/PostFeed'
import { UserBio } from '@/components/organisms/UserBio'
import { useGetUsersUserId } from '@/hooks/swr'
import { useAuthGuard } from '@/hooks/useAuthGuard'

export default function UserView() {
  const router = useRouter()
  const params = useParams()
  const { userId } = params

  if (!userId || typeof userId !== 'string') {
    throw new Error('Invalid ID')
  }

  const { currentUser, isLoading: isLoadingUser } = useAuthGuard()
  const { data: fetchedUser, isLoading: isLoadingProfile } = useGetUsersUserId(
    { param: { userId } },
    { swr: { enabled: !!currentUser } },
  )

  if (isLoadingUser || isLoadingProfile || !fetchedUser) {
    return (
      <div className='flex justify-center items-center h-full'>
        <ClipLoader color='lightblue' size={80} />
      </div>
    )
  }

  return (
    <>
      <Header showBackArrow label={fetchedUser.name} onBack={() => router.back()} />
      <UserHero coverImage={fetchedUser.coverImage} profileImage={fetchedUser.profileImage} />
      <UserBio userId={userId} />
      <PostFeed userId={userId} />
    </>
  )
}
