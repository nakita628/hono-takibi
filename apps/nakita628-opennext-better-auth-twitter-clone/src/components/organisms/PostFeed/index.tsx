'use client'

import { useCallback, useRef } from 'react'
import { ClipLoader } from 'react-spinners'
import useSWRInfinite from 'swr/infinite'
import { PostItem } from '@/components/organisms/PostItem'
import { getGetPostsKey, getPosts } from '@/hooks'

type PostsResponse = Awaited<ReturnType<typeof getPosts>>

type Props = {
  userId?: string
}

export function PostFeed({ userId }: Props) {
  const getKey = (pageIndex: number, previousPageData: PostsResponse | null) => {
    if (previousPageData && pageIndex + 1 > previousPageData.meta.totalPages) return null
    const query = userId !== undefined ? { userId, page: pageIndex + 1 } : { page: pageIndex + 1 }
    return getGetPostsKey({ query })
  }

  const { data, isLoading, size, setSize } = useSWRInfinite(
    getKey,
    async ([, , , args]) => getPosts(args),
    { revalidateFirstPage: true },
  )

  const posts = data ? data.flatMap((page) => page.data) : []
  const isLoadingMore = isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined')
  const isEmpty = data?.[0]?.data.length === 0
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.meta.page >= data[data.length - 1]?.meta.totalPages)

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
      <div ref={sentinelRef} className='h-1' />
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
