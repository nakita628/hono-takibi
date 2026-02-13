'use client'

import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

type Props = {
  label: string
  showBackArrow?: boolean
}

export function Header({ label, showBackArrow }: Props) {
  const router = useRouter()

  const handleBack = useCallback(() => {
    router.back()
  }, [router])

  return (
    <div className='border-b-[1px] border-neutral-800 p-5'>
      <div className='flex flex-row items-center gap-2'>
        {showBackArrow && (
          <button
            type='button'
            onClick={handleBack}
            className='text-white cursor-pointer hover:opacity-70 transition'
          >
            <svg width={24} height={24} viewBox='0 0 24 24' fill='currentColor'>
              <path d='M20 11H7.414l4.293-4.293a1 1 0 00-1.414-1.414l-6 6a1 1 0 000 1.414l6 6a1 1 0 001.414-1.414L7.414 13H20a1 1 0 000-2z' />
            </svg>
          </button>
        )}
        <h1 className='text-2xl font-bold text-white'>{label}</h1>
      </div>
    </div>
  )
}
