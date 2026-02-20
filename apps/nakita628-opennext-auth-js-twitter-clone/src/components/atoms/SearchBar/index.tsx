'use client'

import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { BiSearch } from 'react-icons/bi'

export function SearchBar() {
  const router = useRouter()
  const [query, setQuery] = useState('')

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const trimmed = query.trim()
      if (!trimmed) return
      router.push(`/search?q=${encodeURIComponent(trimmed)}`)
    },
    [query, router],
  )

  return (
    <form onSubmit={onSubmit} className='relative'>
      <input
        type='text'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder='Search posts and users'
        className='w-full rounded-full bg-neutral-800 px-4 py-2 pl-10 text-sm text-white placeholder:text-neutral-500 outline-none focus:ring-2 focus:ring-sky-500'
      />
      <BiSearch className='absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500' size={18} />
    </form>
  )
}
