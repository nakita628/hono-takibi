'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/atoms/Button'

type Props = {
  isOpen: boolean
  onClose: () => void
  onSubmit: () => void
  title: string
  body: React.ReactNode
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
  const [showModal, setShowModal] = useState(isOpen)

  useEffect(() => {
    setShowModal(isOpen)
  }, [isOpen])

  const handleClose = useCallback(() => {
    if (disabled) return
    setShowModal(false)
    setTimeout(() => {
      onClose()
    }, 300)
  }, [disabled, onClose])

  const handleSubmit = useCallback(() => {
    if (disabled) return
    onSubmit()
  }, [disabled, onSubmit])

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-neutral-800/70 outline-none focus:outline-none'>
      <div className='relative w-full mx-auto my-6 lg:w-3/6 lg:max-w-lg h-auto'>
        <div
          className={`translate duration-300 h-full ${showModal ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
        >
          <div className='relative flex flex-col w-full h-full bg-black border-[1px] border-neutral-800 rounded-lg shadow-lg outline-none focus:outline-none'>
            {/* Header */}
            <div className='flex items-center justify-between p-6 rounded-t'>
              <h3 className='text-3xl font-semibold text-white'>{title}</h3>
              <button
                type='button'
                onClick={handleClose}
                className='p-1 ml-auto text-white hover:opacity-70 transition'
              >
                ✕
              </button>
            </div>
            {/* Body */}
            <div className='relative flex-auto p-6'>{body}</div>
            {/* Footer */}
            <div className='flex flex-col gap-2 p-6'>
              <Button
                label={actionLabel}
                type='button'
                disabled={disabled ?? false}
                fullWidth
                large
                onClick={handleSubmit}
              />
              {footer}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
