'use client'

import { useEffect } from 'react'
import { mutate } from 'swr'
import { useGetCurrent, getGetCurrentKey, useGetNotificationsUserId } from '@/hooks/swr'
import { Logo } from '@/components/atoms/Logo'

export function NotificationsFeed() {
  const { data: currentUser } = useGetCurrent()
  const { data: fetchedNotifications, isLoading } = useGetNotificationsUserId(
    { param: { userId: currentUser?.id ?? '' } },
    { swr: { enabled: !!currentUser?.id } },
  )

  useEffect(() => {
    mutate(getGetCurrentKey())
  }, [])

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-20'>
        <div className='animate-spin rounded-full h-10 w-10 border-b-2 border-sky-500' />
      </div>
    )
  }

  if (!fetchedNotifications || fetchedNotifications.length === 0) {
    return <div className='text-neutral-600 text-center p-6 text-xl'>No notifications</div>
  }

  return (
    <div className='flex flex-col'>
      {fetchedNotifications.map((notification) => (
        <div
          key={notification.id}
          className='flex flex-row items-center p-6 gap-4 border-b-[1px] border-neutral-800'
        >
          <Logo size={32} />
          <p className='text-white'>{notification.body}</p>
        </div>
      ))}
    </div>
  )
}
