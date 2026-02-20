'use client'

import { useCallback, useRef } from 'react'
import { ClipLoader } from 'react-spinners'
import { PostItem } from '@/components/molecules/PostItem'
import { usePostsInfinite } from '@/hooks/usePostsInfinite'

type Props = {
  userId?: string
}

/**
 * Infinite-scroll post feed using IntersectionObserver.
 * Observes a sentinel element at the bottom and triggers `setSize` to load the next page.
 *
 * @param userId - Optional user ID to filter posts by author
 */
export function PostFeed({ userId }: Props) {
  const { posts, isLoading, isLoadingMore, isReachingEnd, setSize } = usePostsInfinite(userId)
  const observer = useRef<IntersectionObserver | null>(null)

  const sentinelRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoadingMore) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting && !isReachingEnd) {
            setSize((prev) => prev + 1)
          }
        },
        { rootMargin: '200px' },
      )
      if (node) observer.current.observe(node)
    },
    [isLoadingMore, isReachingEnd, setSize],
  )

  if (isLoading) {
    return (
      <div className='flex justify-center items-center py-8'>
        <ClipLoader color='lightblue' size={35} />
      </div>
    )
  }

  return (
    <>
      {posts.map((post) => (
        <PostItem key={post.id} data={post} />
      ))}
      <div ref={sentinelRef} />
      {isLoadingMore && (
        <div className='flex justify-center items-center py-4'>
          <ClipLoader color='lightblue' size={25} />
        </div>
      )}
      {isReachingEnd && posts.length > 0 && (
        <p className='text-center text-neutral-500 py-4'>No more posts</p>
      )}
    </>
  )
}
