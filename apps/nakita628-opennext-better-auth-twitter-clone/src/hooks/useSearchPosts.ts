'use client'

import { parseResponse } from 'hono/client'
import useSWR from 'swr'
import { client } from '@/lib'

/**
 * Hook to search posts and users by query string.
 *
 * @param query - The search query
 * @param page - Page number for pagination (default: 1)
 * @returns SWR response with search results
 *
 * @mermaid
 * graph TD
 *   A[query changes] --> B{query empty?}
 *   B -- Yes --> C[swrKey = null, skip fetch]
 *   B -- No --> D[swrKey = search/query/page]
 *   D --> E[client.search.$get]
 *   E --> F[parseResponse]
 *   F --> G[return posts + users]
 */
export function useSearchPosts(query: string, page = 1) {
  const swrKey = query ? ['search', query, page] : null

  return useSWR(swrKey, async () =>
    parseResponse(client.search.$get({ query: { q: query, page } })),
  )
}
