import { CommentItem } from '@/components/molecules/CommentItem'

type CommentUser = {
  id: string
  name: string
  username: string
  profileImage: string | null
}

type CommentData = {
  id: string
  body: string
  createdAt: string
  user: CommentUser
}

type Props = {
  comments?: CommentData[]
}

export function CommentFeed({ comments = [] }: Props) {
  return (
    <>
      {comments.map((comment) => (
        <CommentItem key={comment.id} data={comment} />
      ))}
    </>
  )
}
