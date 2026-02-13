'use client'

import { useCallback } from 'react'
import { Button } from '@/components/atoms/Button'

type Props = {
  isOpen?: boolean
  onClose: () => void
  onSubmit: () => void
  title?: string
  body?: React.ReactNode
  footer?: React.ReactNode
  actionLabel: string
  disabled?: boolean
}

export function Modal({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
}: Props) {
  const handleClose = useCallback(() => {
    if (disabled) return
    onClose()
  }, [disabled, onClose])

  const handleSubmit = useCallback(() => {
    if (disabled) return
    onSubmit()
  }, [disabled, onSubmit])

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-neutral-800 bg-opacity-70 outline-none focus:outline-none'>
      <div className='relative w-full mx-auto my-6 lg:w-3/6 lg:max-w-3xl h-full lg:h-auto'>
        <div className='relative flex flex-col w-full h-full lg:h-auto border-0 rounded-lg shadow-lg bg-black outline-none focus:outline-none'>
          {/* Header */}
          <div className='flex items-center justify-between p-10 rounded-t'>
            <h3 className='text-3xl font-semibold text-white'>{title}</h3>
            <button
              type='button'
              onClick={handleClose}
              className='p-1 ml-auto border-0 text-white hover:opacity-70 transition'
            >
              ✕
            </button>
          </div>
          {/* Body */}
          <div className='relative flex-auto p-10'>{body}</div>
          {/* Footer */}
          <div className='flex flex-col gap-2 p-10'>
            <Button
              label={actionLabel}
              disabled={disabled ?? false}
              secondary
              fullWidth
              large
              onClick={handleSubmit}
            />
            {footer}
          </div>
        </div>
      </div>
    </div>
  )
}
