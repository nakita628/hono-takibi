import { desc, eq } from 'drizzle-orm'
import db, { table } from '../infra'

export async function postPosts(post: string) {
  await db.insert(table.post).values({ post })
}

export async function getPosts(limit: number, offset: number) {
  return await db
    .select()
    .from(table.post)
    .orderBy(desc(table.post.createdAt))
    .limit(limit)
    .offset(offset)
}

export async function putPostsId(id: string, post: string) {
  await db.update(table.post).set({ post }).where(eq(table.post.id, id))
}

export async function deletePostsId(id: string) {
  await db.delete(table.post).where(eq(table.post.id, id))
}
