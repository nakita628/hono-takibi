'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Header } from '@/components/atoms/Header'
import { NotificationsFeed } from '@/components/organisms/NotificationsFeed'
import { useGetCurrent } from '@/hooks/swr'

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
        <div className='animate-spin rounded-full h-20 w-20 border-b-2 border-sky-500' />
      </div>
    )
  }

  return (
    <>
      <Header label='Notifications' showBackArrow />
      <NotificationsFeed />
    </>
  )
}
