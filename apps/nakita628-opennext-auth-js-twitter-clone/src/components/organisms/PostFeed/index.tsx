'use client'

import { PostItem } from '@/components/molecules/PostItem'
import { useGetPosts } from '@/hooks/swr'

type Props = {
  userId?: string
}

export function PostFeed({ userId }: Props) {
  const query = userId !== undefined ? { userId } : {}
  const { data: posts = [] } = useGetPosts({ query })

  return (
    <>
      {posts.map((post: Record<string, any>) => (
        <PostItem key={post.id} data={post} />
      ))}
    </>
  )
}
