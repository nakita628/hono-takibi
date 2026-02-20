'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { AvatarLink } from '@/components/molecules/AvatarLink'
import { PostItem } from '@/components/molecules/PostItem'
import { useSearchPosts } from '@/hooks/useSearchPosts'

function SearchContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') ?? ''
  const { data, isLoading } = useSearchPosts(query)

  if (!query) {
    return (
      <div className='p-6 text-center text-neutral-500'>
        Enter a search query to find posts and users.
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className='flex justify-center items-center py-8'>
        <div className='h-8 w-8 animate-spin rounded-full border-4 border-sky-500 border-t-transparent' />
      </div>
    )
  }

  const posts = data?.posts.data ?? []
  const users = data?.users.data ?? []

  return (
    <div>
      <div className='border-b border-neutral-800 p-4'>
        <h2 className='text-white text-xl font-semibold'>Search results for &quot;{query}&quot;</h2>
      </div>
      {users.length > 0 && (
        <div className='border-b border-neutral-800 p-4'>
          <h3 className='text-white text-lg font-semibold mb-4'>Users</h3>
          <div className='flex flex-col gap-4'>
            {users.map((user) => (
              <div key={user.id} className='flex flex-row gap-4 items-center'>
                <AvatarLink userId={user.id} src={user.profileImage || '/images/placeholder.png'} />
                <div className='flex flex-col'>
                  <p className='text-white font-semibold text-sm'>{user.name}</p>
                  <p className='text-neutral-400 text-sm'>@{user.username}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {posts.length > 0 ? (
        posts.map((post) => <PostItem key={post.id} data={post} />)
      ) : (
        <div className='p-6 text-center text-neutral-500'>
          No posts found for &quot;{query}&quot;
        </div>
      )}
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchContent />
    </Suspense>
  )
}
