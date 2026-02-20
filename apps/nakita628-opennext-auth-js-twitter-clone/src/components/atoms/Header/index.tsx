'use client'

import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { BiArrowBack } from 'react-icons/bi'

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
            <BiArrowBack size={24} />
          </button>
        )}
        <h1 className='text-2xl font-bold text-white'>{label}</h1>
      </div>
    </div>
  )
}
