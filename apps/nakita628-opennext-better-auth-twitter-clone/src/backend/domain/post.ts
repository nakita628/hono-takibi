export function makeFormatPostWithLikes(post: {
  id: string
  body: string
  createdAt: Date
  updatedAt: Date
  userId: string
  likes: { userId: string; postId: string; createdAt: Date }[]
}) {
  return {
    id: post.id,
    body: post.body,
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
    userId: post.userId,
    likes: post.likes.map((like) => ({
      userId: like.userId,
      postId: like.postId,
      createdAt: like.createdAt.toISOString(),
    })),
  }
}
