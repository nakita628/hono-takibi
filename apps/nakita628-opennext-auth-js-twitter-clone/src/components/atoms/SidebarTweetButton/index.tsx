'use client'

import { useRouter } from 'next/navigation'

export function SidebarTweetButton() {
  const router = useRouter()

  return (
    <div onClick={() => router.push('/')}>
      <div className='mt-6 lg:hidden rounded-full h-14 w-14 p-4 flex items-center justify-center bg-sky-500 hover:opacity-80 transition cursor-pointer'>
        <svg width={24} height={24} viewBox='0 0 24 24' fill='white'>
          <path d='M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z' />
        </svg>
      </div>
      <div className='mt-6 hidden lg:block px-4 py-2 rounded-full bg-sky-500 hover:bg-opacity-90 cursor-pointer transition'>
        <p className='hidden lg:block text-center font-semibold text-white text-[20px]'>Tweet</p>
      </div>
    </div>
  )
}
