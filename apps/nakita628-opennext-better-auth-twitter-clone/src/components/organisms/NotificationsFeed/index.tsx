'use client'

import { useEffect } from 'react'
import { BsTwitter } from 'react-icons/bs'
import { ClipLoader } from 'react-spinners'
import { mutate } from 'swr'
import { getGetCurrentKey, useGetCurrent, useGetNotificationsUserId } from '@/hooks/swr'

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
        <ClipLoader color='lightblue' size={35} />
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
          className='flex flex-row items-center p-6 gap-4 border-b border-neutral-800'
        >
          <BsTwitter size={32} color='#0EA5E9' />
          <p className='text-white'>{notification.body}</p>
        </div>
      ))}
    </div>
  )
}
