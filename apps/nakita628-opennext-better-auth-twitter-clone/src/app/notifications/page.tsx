'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { ClipLoader } from 'react-spinners'
import { Header } from '@/components/atoms/Header'
import { NotificationsFeed } from '@/components/organisms/NotificationsFeed'
import { useGetCurrent } from '@/hooks'

export default function Notifications() {
  const router = useRouter()
  const { data: currentUser, isLoading } = useGetCurrent()

  useEffect(() => {
    if (!(isLoading || currentUser)) {
      router.push('/')
    }
  }, [isLoading, currentUser, router])

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
