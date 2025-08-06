import { desc, eq } from 'drizzle-orm'
import db, { table } from '../infra'

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
    await db.insert(table.post).values({ post })
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
        id: string
        post: string
        createdAt: string
        updatedAt: string
      }[]
    }
  | {
      ok: false
      error: string
    }
> {
  try {
    const res = await db
      .select()
      .from(table.post)
      .orderBy(desc(table.post.createdAt))
      .limit(limit)
      .offset(offset)
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
    await db.update(table.post).set({ post }).where(eq(table.post.id, id))
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
    await db.delete(table.post).where(eq(table.post.id, id))
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
