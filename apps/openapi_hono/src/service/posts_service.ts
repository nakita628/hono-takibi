import type { Post } from '@prisma/client'
import prisma from '../infra/index.js'

export const postPosts = async (post: string): Promise<Post> => {
  return await prisma.post.create({
    data: {
      post,
    },
  })
}

export const getPosts = async (limit: number, offset: number): Promise<Post[]> => {
  return await prisma.post.findMany({
    take: limit,
    skip: offset,
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export const putPostsId = async (id: string, post: string): Promise<Post> => {
  return await prisma.post.update({
    where: { id },
    data: { post },
  })
}

export const deletePostsId = async (id: string): Promise<Post> => {
  return await prisma.post.delete({
    where: { id },
  })
}
