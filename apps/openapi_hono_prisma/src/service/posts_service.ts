import prisma from '../infra'

export async function postPosts(post: string) {
  return await prisma.post.create({
    data: {
      post,
    },
  })
}

export async function getPosts(limit: number, offset: number) {
  return await prisma.post.findMany({
    take: limit,
    skip: offset,
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export async function putPostsId(id: string, post: string) {
  return await prisma.post.update({
    where: { id },
    data: { post },
  })
}

export async function deletePostsId(id: string) {
  return await prisma.post.delete({
    where: { id },
  })
}
