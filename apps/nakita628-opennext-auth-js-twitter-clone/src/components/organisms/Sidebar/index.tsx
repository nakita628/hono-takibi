'use client'

import { signOut } from '@hono/auth-js/react'
import { SidebarItem } from '@/components/atoms/SidebarItem'
import { SidebarLogo } from '@/components/atoms/SidebarLogo'
import { SidebarTweetButton } from '@/components/atoms/SidebarTweetButton'
import { useGetCurrent } from '@/hooks/swr'

const HomeIcon = (
  <svg width={24} height={24} viewBox='0 0 24 24' fill='white'>
    <path d='M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' />
  </svg>
)

const BellIcon = (
  <svg width={24} height={24} viewBox='0 0 24 24' fill='white'>
    <path d='M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z' />
  </svg>
)

const UserIcon = (
  <svg width={24} height={24} viewBox='0 0 24 24' fill='white'>
    <path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' />
  </svg>
)

const LogoutIcon = (
  <svg width={24} height={24} viewBox='0 0 24 24' fill='white'>
    <path d='M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z' />
  </svg>
)

export function Sidebar() {
  const { data: currentUser } = useGetCurrent()

  const items = [
    {
      label: 'Home',
      href: '/',
      icon: HomeIcon,
    },
    {
      label: 'Notifications',
      href: '/notifications',
      icon: BellIcon,
      auth: true,
      alert: currentUser?.hasNotification ?? undefined,
    },
    {
      label: 'Profile',
      href: currentUser ? `/users/${currentUser.id}` : '/',
      icon: UserIcon,
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
            <SidebarItem onClick={() => signOut()} icon={LogoutIcon} label='Logout' />
          )}
          <SidebarTweetButton />
        </div>
      </div>
    </div>
  )
}
