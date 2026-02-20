'use client'

import { BsBellFill, BsHouseFill } from 'react-icons/bs'
import { BiLogOut } from 'react-icons/bi'
import { FaUser } from 'react-icons/fa'
import { SidebarItem } from '@/components/atoms/SidebarItem'
import { SidebarLogo } from '@/components/atoms/SidebarLogo'
import { SidebarTweetButton } from '@/components/atoms/SidebarTweetButton'
import { useGetCurrent } from '@/hooks/swr'
import { authClient } from '@/lib/auth-client'

export function Sidebar() {
  const { data: currentUser } = useGetCurrent()

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
          <SidebarLogo />
          {items.map((item) => (
            <SidebarItem
              key={item.href}
              label={item.label}
              href={item.href}
              icon={item.icon}
              auth={item.auth}
              alert={item.alert}
            />
          ))}
          {currentUser && (
            <SidebarItem
              onClick={() => authClient.signOut()}
              icon={<BiLogOut size={24} color='white' />}
              label='Logout'
            />
          )}
          <SidebarTweetButton />
        </div>
      </div>
    </div>
  )
}
