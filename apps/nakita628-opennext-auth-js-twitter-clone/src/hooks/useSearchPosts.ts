'use client'

import { parseResponse } from 'hono/client'
import useSWR from 'swr'
import { client } from '@/lib'

export function useSearchPosts(query: string, page = 1) {
  const swrKey = query ? ['search', query, page] : null

  return useSWR(swrKey, async () =>
    parseResponse(client.search.$get({ query: { q: query, page } })),
  )
}
