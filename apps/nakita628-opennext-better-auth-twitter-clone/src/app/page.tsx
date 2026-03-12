'use client'

import { Header } from '@/components/atoms/Header'
import { Form } from '@/components/organisms/Form'
import { PostFeed } from '@/components/organisms/PostFeed'
import { useGetCurrent } from '@/hooks'

/**
 * Home Page — Post feed with tweet form
 *
 * useGetCurrent() gates the PostFeed: only renders when logged in.
 * Guest users see the Form component's welcome/login prompt instead.
 */
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
