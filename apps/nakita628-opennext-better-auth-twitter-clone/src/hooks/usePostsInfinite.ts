'use client'

import { parseResponse } from 'hono/client'
import useSWRInfinite from 'swr/infinite'
import { getGetPostsKey } from '@/hooks/swr'
import { client } from '@/lib'

type PostsResponse = Awaited<
  ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.posts.$get>>>>
>

/**
 * Hook for infinite scroll pagination of posts.
 *
 * @param userId - Optional user ID to filter posts by author
 * @returns Paginated posts with loading states and `setSize` to load more
 *
 * @mermaid
 * graph TD
 *   A[getKey called] --> B{previousPageData?}
 *   B -- End reached --> C[return null]
 *   B -- More pages --> D[return key tuple]
 *   D --> E[fetcher: client.posts.$get]
 *   E --> F[flatMap pages into posts]
 *   F --> G[IntersectionObserver sentinel]
 *   G -- visible --> H[setSize + 1]
 *   H --> A
 */
export function usePostsInfinite(userId?: string) {
  const getKey = (pageIndex: number, previousPageData: PostsResponse | null) => {
    if (previousPageData && pageIndex + 1 > previousPageData.meta.totalPages) return null
    const query = userId !== undefined ? { userId, page: pageIndex + 1 } : { page: pageIndex + 1 }
    return getGetPostsKey({ query })
  }

  const { data, error, size, setSize, isLoading, isValidating } = useSWRInfinite(
    getKey,
    async ([, , , args]) => parseResponse(client.posts.$get(args)),
    { revalidateFirstPage: true },
  )

  const posts = data ? data.flatMap((page) => page.data) : []
  const isLoadingMore = isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined')
  const isEmpty = data?.[0]?.data.length === 0
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.meta.page >= data[data.length - 1]?.meta.totalPages)

  return {
    posts,
    error,
    isLoading,
    isLoadingMore,
    isValidating,
    size,
    setSize,
    isReachingEnd,
  }
}
