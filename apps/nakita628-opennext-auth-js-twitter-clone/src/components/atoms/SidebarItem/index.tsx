'use client'

import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { useGetCurrent } from '@/hooks/swr'
import { useLoginModal } from '@/hooks/useLoginModal'

type Props = {
  label: string
  href?: string | undefined
  icon: React.ReactNode
  onClick?: (() => void | Promise<void>) | undefined
  auth?: boolean | undefined
  alert?: boolean | undefined
}

export function SidebarItem({ label, href, icon, onClick, auth, alert }: Props) {
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

  return (
    <div onClick={handleClick} className='flex flex-row items-center'>
      <div className='relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer lg:hidden'>
        {icon}
        {alert && <span className='absolute -top-1 left-0 w-3 h-3 rounded-full bg-sky-500' />}
      </div>
      <div className='relative hidden lg:flex items-center gap-4 p-4 rounded-full hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer'>
        {icon}
        <p className='hidden lg:block text-white text-xl'>{label}</p>
        {alert && <span className='absolute -top-1 left-0 w-3 h-3 rounded-full bg-sky-500' />}
      </div>
    </div>
  )
}
