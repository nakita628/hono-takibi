'use client'

import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { BiLogOut } from 'react-icons/bi'
import { BsBellFill, BsHouseFill } from 'react-icons/bs'
import { FaUser } from 'react-icons/fa'
import { useSWRConfig } from 'swr'
import { SidebarItemContainer } from '@/components/molecules/SidebarItemContainer'
import { SidebarLogo } from '@/components/atoms/SidebarLogo'
import { SidebarTweetButton } from '@/components/atoms/SidebarTweetButton'
import { getGetCurrentKey, useGetCurrent } from '@/hooks/swr'
import { authClient } from '@/infra/auth-client'

export function Sidebar() {
  const router = useRouter()
  const { data: currentUser } = useGetCurrent()
  const { mutate } = useSWRConfig()

  const handleSignOut = useCallback(async () => {
    await authClient.signOut()
    await mutate(getGetCurrentKey(), undefined, { revalidate: false })
    router.push('/')
    router.refresh()
  }, [mutate, router])

  const items = [
    {
      label: 'Home',
      href: '/',
      icon: <BsHouseFill size={24} color='white' />,
    },
    {
      label: 'Notifications',
      href: '/notifications',
      icon: <BsBellFill size={24} color='white' />,
      auth: true,
      alert: currentUser?.hasNotification ?? undefined,
    },
    {
      label: 'Profile',
      href: currentUser ? `/users/${currentUser.id}` : '/',
      icon: <FaUser size={24} color='white' />,
      auth: true,
    },
  ]

  return (
    <div className='col-span-1 h-full pr-4 md:pr-6'>
      <div className='flex flex-col items-end'>
        <div className='space-y-2 lg:w-[230px]'>
          <SidebarLogo onClick={() => router.push('/')} />
          {items.map((item) => (
            <SidebarItemContainer
              key={item.href}
              label={item.label}
              href={item.href}
              icon={item.icon}
              auth={item.auth}
              alert={item.alert}
            />
          ))}
          {currentUser && (
            <SidebarItemContainer
              onClick={handleSignOut}
              icon={<BiLogOut size={24} color='white' />}
              label='Logout'
            />
          )}
          <SidebarTweetButton onClick={() => router.push('/')} />
        </div>
      </div>
    </div>
  )
}
