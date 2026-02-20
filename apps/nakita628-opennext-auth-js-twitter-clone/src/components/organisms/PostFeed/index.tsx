'use client'

import { useCallback, useRef } from 'react'
import { PostItem } from '@/components/molecules/PostItem'
import { usePostsInfinite } from '@/hooks/usePostsInfinite'

type Props = {
  userId?: string
}

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
        <div className='h-8 w-8 animate-spin rounded-full border-4 border-sky-500 border-t-transparent' />
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
          <div className='h-6 w-6 animate-spin rounded-full border-4 border-sky-500 border-t-transparent' />
        </div>
      )}
      {isReachingEnd && posts.length > 0 && (
        <p className='text-center text-neutral-500 py-4'>No more posts</p>
      )}
    </>
  )
}
