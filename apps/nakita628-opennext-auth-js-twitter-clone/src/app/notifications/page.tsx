'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Header } from '@/components/atoms/Header'
import { NotificationsFeed } from '@/components/organisms/NotificationsFeed'
import { useGetCurrent } from '@/hooks/swr'

export default function Notifications() {
  const router = useRouter()
  const { data: currentUser, isLoading } = useGetCurrent()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!isLoading) {
      if (currentUser) {
        setReady(true)
      } else {
        router.push('/')
      }
    }
  }, [isLoading, currentUser, router])

  if (!ready) {
    return <p className='text-white text-center p-4'>Loading...</p>
  }

  return (
    <>
      <Header label='Notifications' showBackArrow />
      <NotificationsFeed />
    </>
  )
}
