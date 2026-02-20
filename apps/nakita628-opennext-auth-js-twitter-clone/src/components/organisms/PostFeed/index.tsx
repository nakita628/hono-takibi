'use client'

import { parseAsInteger, useQueryState } from 'nuqs'
import { Pagination } from '@/components/atoms/Pagination'
import { PostItem } from '@/components/molecules/PostItem'
import { useGetPosts } from '@/hooks/swr'

type Props = {
  userId?: string
}

export function PostFeed({ userId }: Props) {
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))

  const query = userId !== undefined ? { userId, page } : { page }
  const { data: result } = useGetPosts({ query })
  const posts = result?.data ?? []
  const meta = result?.meta

  return (
    <>
      {posts.map((post) => (
        <PostItem key={post.id} data={post} />
      ))}
      {meta && (
        <Pagination
          page={meta.page}
          totalPages={meta.totalPages}
          onPageChange={setPage}
        />
      )}
    </>
  )
}
