'use client'

import { SearchBar } from '@/components/atoms/SearchBar'
import { AvatarLink } from '@/components/molecules/AvatarLink'
import { useGetUsers } from '@/hooks/swr'

export function FollowBar() {
  const { data: result } = useGetUsers({ query: {} })
  const users = result?.data ?? []

  return (
    <div className='px-6 py-4 hidden lg:block'>
      <SearchBar />
      {users.length > 0 && (
        <div className='bg-neutral-800 rounded-xl p-4 mt-4'>
          <h2 className='text-white text-xl font-semibold'>Who to follow</h2>
          <div className='flex flex-col gap-6 mt-4'>
            {users.map((user) => (
              <div key={user.id} className='flex flex-row gap-4'>
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
    </div>
  )
}
