'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useGetCurrent } from '@/hooks/swr'

export function useAuthGuard() {
  const router = useRouter()
  const { data: currentUser, isLoading } = useGetCurrent()

  useEffect(() => {
    if (!(isLoading || currentUser)) {
      router.push('/')
    }
  }, [isLoading, currentUser, router])

  return { currentUser, isLoading }
}
