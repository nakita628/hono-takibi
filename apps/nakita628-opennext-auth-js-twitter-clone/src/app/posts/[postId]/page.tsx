'use client'

import { useParams } from 'next/navigation'
import { Header } from '@/components/atoms/Header'
import { CommentFeed } from '@/components/molecules/CommentFeed'
import { PostItem } from '@/components/molecules/PostItem'
import { Form } from '@/components/organisms/Form'
import { useGetPostsPostId } from '@/hooks/swr'

export default function PostView() {
  const params = useParams()
  const { postId } = params

  if (!postId || typeof postId !== 'string') {
    throw new Error('Invalid post ID')
  }

  const { data: fetchedPost, isLoading } = useGetPostsPostId({
    param: { postId },
  })

  if (isLoading || !fetchedPost) {
    return (
      <div className='flex justify-center items-center h-full'>
        <div className='animate-spin rounded-full h-20 w-20 border-b-2 border-sky-500' />
      </div>
    )
  }

  return (
    <>
      <Header showBackArrow label='Post' />
      <PostItem data={fetchedPost} />
      <Form postId={postId} isComment placeholder='Tweet your reply' />
      <CommentFeed comments={fetchedPost.comments} />
    </>
  )
}
