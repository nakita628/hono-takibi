'use client'

import { useRouter } from 'next/navigation'
import { type FormEvent, useCallback, useState } from 'react'
import { SearchBar } from '@/components/atoms/SearchBar'

export function SearchBarContainer() {
  const router = useRouter()
  const [query, setQuery] = useState('')

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const trimmed = query.trim()
      if (!trimmed) return
      router.push(`/search?q=${encodeURIComponent(trimmed)}`)
    },
    [query, router],
  )

  return <SearchBar value={query} onChange={setQuery} onSubmit={onSubmit} />
}
