import prisma from '../infra'

export async function postPosts(post: string): Promise<
  | {
      ok: true
      value: undefined
    }
  | {
      ok: false
      error: string
    }
> {
  try {
    await prisma.post.create({
      data: {
        post,
      },
    })
    return {
      ok: true,
      value: undefined,
    }
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : String(e),
    }
  }
}

export async function getPosts(
  limit: number,
  offset: number,
): Promise<
  | {
      ok: true
      value: {
        post: string
        id: string
        createdAt: Date
        updatedAt: Date
      }[]
    }
  | {
      ok: false
      error: string
    }
> {
  try {
    const res = await prisma.post.findMany({
      take: limit,
      skip: offset,
      orderBy: {
        createdAt: 'desc',
      },
    })
    return {
      ok: true,
      value: res,
    }
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : String(e),
    }
  }
}

export async function putPostsId(
  id: string,
  post: string,
): Promise<
  | {
      ok: true
      value: undefined
    }
  | {
      ok: false
      error: string
    }
> {
  try {
    await prisma.post.update({
      where: { id },
      data: { post },
    })
    return {
      ok: true,
      value: undefined,
    }
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : String(e),
    }
  }
}

export async function deletePostsId(id: string): Promise<
  | {
      ok: true
      value: undefined
    }
  | {
      ok: false
      error: string
    }
> {
  try {
    await prisma.post.delete({
      where: { id },
    })
    return {
      ok: true,
      value: undefined,
    }
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : String(e),
    }
  }
}
