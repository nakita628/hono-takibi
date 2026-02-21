'use client'

import { Header } from '@/components/atoms/Header'
import { Form } from '@/components/organisms/Form'
import { PostFeed } from '@/components/organisms/PostFeed'
import { useGetCurrent } from '@/hooks/swr'

export default function Home() {
  const { data: currentUser, isLoading } = useGetCurrent()

  return (
    <>
      <Header label='Home' />
      <Form placeholder="What's happening?" />
      {!isLoading && currentUser && <PostFeed />}
    </>
  )
}
