'use client'

import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

type Props = {
  value: string
  disabled: boolean
  onChange: (base64: string) => void
  label: string
}

export function ImageUpload({ value, disabled, onChange, label }: Props) {
  const handleDrop = useCallback(
    (files: File[]) => {
      const file = files[0]
      if (!file) return

      const reader = new FileReader()
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const result = event.target?.result
        if (typeof result === 'string') {
          onChange(result)
        }
      }
      reader.readAsDataURL(file)
    },
    [onChange],
  )

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: handleDrop,
    disabled,
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
  })

  return (
    <div
      {...getRootProps({
        className:
          'w-full p-4 text-white text-center border-2 border-dotted rounded-md border-neutral-700 cursor-pointer hover:border-white transition',
      })}
    >
      <input {...getInputProps()} />
      {value ? (
        <div className='flex items-center justify-center'>
          <img src={value} height={100} width={100} alt='Uploaded image' />
        </div>
      ) : (
        <p className='text-white'>{label}</p>
      )}
    </div>
  )
}
