'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { ClipLoader } from 'react-spinners'
import { Header } from '@/components/atoms/Header'
import { CommentFeed } from '@/components/organisms/CommentFeed'
import { Form } from '@/components/organisms/Form'
import { PostItem } from '@/components/organisms/PostItem'
import { useGetCurrent, useGetPostsPostId } from '@/hooks'

export default function PostView() {
  const router = useRouter()
  const params = useParams()
  const { postId } = params

  if (!postId || typeof postId !== 'string') {
    throw new Error('Invalid post ID')
  }

  const { data: currentUser, isLoading: isLoadingUser } = useGetCurrent()
  const { data: fetchedPost, isLoading: isLoadingPost } = useGetPostsPostId(
    { param: { postId } },
    { swr: { enabled: !!currentUser } },
  )

  useEffect(() => {
    if (!(isLoadingUser || currentUser)) {
      router.push('/')
    }
  }, [isLoadingUser, currentUser, router])

  if (isLoadingUser || isLoadingPost || !fetchedPost) {
    return (
      <div className='flex justify-center items-center h-full'>
        <ClipLoader color='lightblue' size={80} />
      </div>
    )
  }

  return (
    <>
      <Header showBackArrow label='Post' onBack={() => router.back()} />
      <PostItem data={fetchedPost} />
      <Form postId={postId} isComment placeholder='Tweet your reply' />
      <CommentFeed comments={fetchedPost.comments} />
    </>
  )
}
