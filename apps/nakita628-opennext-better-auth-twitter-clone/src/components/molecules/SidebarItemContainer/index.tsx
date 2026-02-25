'use client'

import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { SidebarItem } from '@/components/atoms/SidebarItem'
import { useGetCurrent } from '@/hooks'
import { useLoginModal } from '@/stores'

type Props = {
  label: string
  href?: string | undefined
  icon: React.ReactNode
  onClick?: (() => void | Promise<void>) | undefined
  auth?: boolean | undefined
  alert?: boolean | undefined
}

export function SidebarItemContainer({ label, href, icon, onClick, auth, alert }: Props) {
  const router = useRouter()
  const loginModal = useLoginModal()
  const { data: currentUser } = useGetCurrent()

  const handleClick = useCallback(async () => {
    if (onClick) {
      return await onClick()
    }

    if (auth && !currentUser) {
      loginModal.onOpen()
      return
    }

    if (href) {
      router.push(href)
    }
  }, [router, onClick, href, currentUser, auth, loginModal])

  return <SidebarItem label={label} icon={icon} onClick={handleClick} alert={alert} />
}
