import { CommentItem } from '@/components/molecules/CommentItem'

type Props = {
  comments?: Record<string, any>[]
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
