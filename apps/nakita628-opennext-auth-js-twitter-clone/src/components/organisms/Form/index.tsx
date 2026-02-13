'use client'

import { useCallback, useState } from 'react'
import { mutate } from 'swr'
import { Button } from '@/components/atoms/Button'
import { AvatarLink } from '@/components/molecules/AvatarLink'
import { useGetCurrent, usePostComments, usePostPosts } from '@/hooks/swr'
import { useLoginModal } from '@/hooks/useLoginModal'
import { useRegisterModal } from '@/hooks/useRegisterModal'

type Props = {
  placeholder: string
  isComment?: boolean
  postId?: string
}

export function Form({ placeholder, isComment, postId }: Props) {
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()
  const { data: currentUser } = useGetCurrent()
  const { trigger: createPost } = usePostPosts()
  const { trigger: createComment } = usePostComments()

  const [body, setBody] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true)

      if (isComment && postId) {
        await createComment({ query: { postId }, json: { body } })
      } else {
        await createPost({ json: { body } })
      }

      setBody('')

      // Revalidate posts
      await mutate((key: unknown) => {
        if (Array.isArray(key) && key[0] === 'posts') return true
        return false
      })
    } catch {
      // Tweet creation failed
    } finally {
      setIsLoading(false)
    }
  }, [body, isComment, postId, createPost, createComment])

  return (
    <div className='border-b-[1px] border-neutral-800 px-5 py-2'>
      {currentUser ? (
        <div className='flex flex-row gap-4'>
          <div>
            <AvatarLink
              userId={currentUser.id}
              src={currentUser.profileImage || '/images/placeholder.png'}
            />
          </div>
          <div className='w-full'>
            <textarea
              disabled={isLoading}
              onChange={(e) => setBody(e.target.value)}
              value={body}
              placeholder={placeholder}
              className='disabled:opacity-80 peer resize-none mt-3 w-full bg-black ring-0 outline-none text-[20px] placeholder:text-neutral-500 text-white'
            />
            <hr className='opacity-0 peer-focus:opacity-100 h-[1px] w-full border-neutral-800 transition' />
            <div className='mt-4 flex flex-row justify-end'>
              <Button disabled={isLoading || !body} onClick={onSubmit} label='Tweet' />
            </div>
          </div>
        </div>
      ) : (
        <div className='py-8'>
          <h1 className='text-white text-2xl font-bold'>Welcome to Twitter</h1>
          <div className='flex flex-row items-center gap-4'>
            <Button label='Login' onClick={loginModal.onOpen} />
            <Button label='Register' onClick={registerModal.onOpen} secondary />
          </div>
        </div>
      )}
    </div>
  )
}
