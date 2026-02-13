'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import { AvatarLink } from '@/components/molecules/AvatarLink'
import { formatRelativeTime } from '@/lib/format'

type Props = {
  data: Record<string, any>
}

export function CommentItem({ data }: Props) {
  const router = useRouter()

  const goToUser = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation()
      router.push(`/users/${data.user.id}`)
    },
    [router, data.user.id],
  )

  const createdAt = useMemo(() => {
    if (!data?.createdAt) return null
    return formatRelativeTime(data.createdAt)
  }, [data.createdAt])

  return (
    <div className='border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition'>
      <div className='flex flex-row items-start gap-3'>
        <AvatarLink
          userId={data.user.id}
          src={data.user.profileImage || '/images/placeholder.png'}
        />
        <div>
          <div className='flex flex-row items-center gap-2'>
            <p
              onClick={goToUser}
              className='text-white font-semibold cursor-pointer hover:underline'
            >
              {data.user.name}
            </p>
            <span className='text-neutral-500 cursor-pointer hover:underline hidden md:block'>
              @{data.user.username}
            </span>
            <span className='text-neutral-500 text-sm'>{createdAt}</span>
          </div>
          <div className='text-white mt-1'>{data.body}</div>
        </div>
      </div>
    </div>
  )
}
