'use client'

import { useRouter } from 'next/navigation'
import { ClipLoader } from 'react-spinners'
import { Header } from '@/components/atoms/Header'
import { NotificationsFeed } from '@/components/organisms/NotificationsFeed'
import { useAuthGuard } from '@/hooks/useAuthGuard'

export default function Notifications() {
  const router = useRouter()
  const { currentUser, isLoading } = useAuthGuard()

  if (isLoading || !currentUser) {
    return (
      <div className='flex justify-center items-center h-full'>
        <ClipLoader color='lightblue' size={80} />
      </div>
    )
  }

  return (
    <>
      <Header label='Notifications' showBackArrow onBack={() => router.back()} />
      <NotificationsFeed />
    </>
  )
}
