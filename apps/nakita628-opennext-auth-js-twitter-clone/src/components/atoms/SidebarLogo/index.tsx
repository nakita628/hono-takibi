'use client'

import { useRouter } from 'next/navigation'
import { BsTwitter } from 'react-icons/bs'

export function SidebarLogo() {
  const router = useRouter()

  return (
    <button
      type='button'
      onClick={() => router.push('/')}
      className='rounded-full h-14 w-14 p-4 flex items-center justify-center hover:bg-blue-300 hover:bg-opacity-10 cursor-pointer transition'
    >
      <BsTwitter size={28} color='#0EA5E9' />
    </button>
  )
}
