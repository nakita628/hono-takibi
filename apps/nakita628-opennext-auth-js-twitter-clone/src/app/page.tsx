'use client'

import { Header } from '@/components/atoms/Header'
import { Form } from '@/components/organisms/Form'
import { PostFeed } from '@/components/organisms/PostFeed'

export default function Home() {
  return (
    <>
      <Header label='Home' />
      <Form placeholder="What's happening?" />
      <PostFeed />
    </>
  )
}
