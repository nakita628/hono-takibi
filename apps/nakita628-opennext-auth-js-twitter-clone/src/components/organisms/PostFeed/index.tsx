'use client'

import { useGetPosts } from '@/hooks/swr'
import { PostItem } from '@/components/molecules/PostItem'

type Props = {
  userId?: string
}

export function PostFeed({ userId }: Props) {
  const { data: posts = [] } = useGetPosts({ query: { userId } })

  return (
    <>
      {posts.map((post: Record<string, any>) => (
        <PostItem key={post.id} data={post} />
      ))}
    </>
  )
}
