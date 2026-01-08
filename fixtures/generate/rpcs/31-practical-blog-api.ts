import type { InferRequestType } from 'hono/client'
import { client } from '../clients/31-practical-blog-api'

/**
 * GET /posts
 *
 * 記事一覧取得
 */
export async function getPosts(arg: InferRequestType<typeof client.posts.$get>) {
  return await client.posts.$get(arg)
}

/**
 * POST /posts
 *
 * 記事作成
 */
export async function postPosts(arg: InferRequestType<typeof client.posts.$post>) {
  return await client.posts.$post(arg)
}

/**
 * GET /posts/{postId}
 *
 * 記事詳細取得
 */
export async function getPostsPostId(
  arg: InferRequestType<(typeof client)['posts'][':postId']['$get']>,
) {
  return await client['posts'][':postId']['$get'](arg)
}

/**
 * PUT /posts/{postId}
 *
 * 記事更新
 */
export async function putPostsPostId(
  arg: InferRequestType<(typeof client)['posts'][':postId']['$put']>,
) {
  return await client['posts'][':postId']['$put'](arg)
}

/**
 * DELETE /posts/{postId}
 *
 * 記事削除
 */
export async function deletePostsPostId(
  arg: InferRequestType<(typeof client)['posts'][':postId']['$delete']>,
) {
  return await client['posts'][':postId']['$delete'](arg)
}

/**
 * GET /posts/slug/{slug}
 *
 * スラッグで記事取得
 */
export async function getPostsSlugSlug(
  arg: InferRequestType<(typeof client)['posts']['slug'][':slug']['$get']>,
) {
  return await client['posts']['slug'][':slug']['$get'](arg)
}

/**
 * POST /posts/{postId}/publish
 *
 * 記事公開
 */
export async function postPostsPostIdPublish(
  arg: InferRequestType<(typeof client)['posts'][':postId']['publish']['$post']>,
) {
  return await client['posts'][':postId']['publish']['$post'](arg)
}

/**
 * POST /posts/{postId}/unpublish
 *
 * 記事非公開化
 */
export async function postPostsPostIdUnpublish(
  arg: InferRequestType<(typeof client)['posts'][':postId']['unpublish']['$post']>,
) {
  return await client['posts'][':postId']['unpublish']['$post'](arg)
}

/**
 * GET /posts/{postId}/comments
 *
 * 記事のコメント一覧取得
 */
export async function getPostsPostIdComments(
  arg: InferRequestType<(typeof client)['posts'][':postId']['comments']['$get']>,
) {
  return await client['posts'][':postId']['comments']['$get'](arg)
}

/**
 * POST /posts/{postId}/comments
 *
 * コメント投稿
 */
export async function postPostsPostIdComments(
  arg: InferRequestType<(typeof client)['posts'][':postId']['comments']['$post']>,
) {
  return await client['posts'][':postId']['comments']['$post'](arg)
}

/**
 * DELETE /comments/{commentId}
 *
 * コメント削除
 */
export async function deleteCommentsCommentId(
  arg: InferRequestType<(typeof client)['comments'][':commentId']['$delete']>,
) {
  return await client['comments'][':commentId']['$delete'](arg)
}

/**
 * POST /comments/{commentId}/approve
 *
 * コメント承認
 */
export async function postCommentsCommentIdApprove(
  arg: InferRequestType<(typeof client)['comments'][':commentId']['approve']['$post']>,
) {
  return await client['comments'][':commentId']['approve']['$post'](arg)
}

/**
 * GET /categories
 *
 * カテゴリ一覧取得
 */
export async function getCategories() {
  return await client.categories.$get()
}

/**
 * POST /categories
 *
 * カテゴリ作成
 */
export async function postCategories(arg: InferRequestType<typeof client.categories.$post>) {
  return await client.categories.$post(arg)
}

/**
 * GET /categories/{categoryId}
 *
 * カテゴリ詳細取得
 */
export async function getCategoriesCategoryId(
  arg: InferRequestType<(typeof client)['categories'][':categoryId']['$get']>,
) {
  return await client['categories'][':categoryId']['$get'](arg)
}

/**
 * PUT /categories/{categoryId}
 *
 * カテゴリ更新
 */
export async function putCategoriesCategoryId(
  arg: InferRequestType<(typeof client)['categories'][':categoryId']['$put']>,
) {
  return await client['categories'][':categoryId']['$put'](arg)
}

/**
 * DELETE /categories/{categoryId}
 *
 * カテゴリ削除
 */
export async function deleteCategoriesCategoryId(
  arg: InferRequestType<(typeof client)['categories'][':categoryId']['$delete']>,
) {
  return await client['categories'][':categoryId']['$delete'](arg)
}

/**
 * GET /tags
 *
 * タグ一覧取得
 */
export async function getTags(arg: InferRequestType<typeof client.tags.$get>) {
  return await client.tags.$get(arg)
}

/**
 * POST /tags
 *
 * タグ作成
 */
export async function postTags(arg: InferRequestType<typeof client.tags.$post>) {
  return await client.tags.$post(arg)
}

/**
 * GET /media
 *
 * メディア一覧取得
 */
export async function getMedia(arg: InferRequestType<typeof client.media.$get>) {
  return await client.media.$get(arg)
}

/**
 * POST /media
 *
 * メディアアップロード
 */
export async function postMedia(arg: InferRequestType<typeof client.media.$post>) {
  return await client.media.$post(arg)
}

/**
 * GET /media/{mediaId}
 *
 * メディア詳細取得
 */
export async function getMediaMediaId(
  arg: InferRequestType<(typeof client)['media'][':mediaId']['$get']>,
) {
  return await client['media'][':mediaId']['$get'](arg)
}

/**
 * PUT /media/{mediaId}
 *
 * メディア情報更新
 */
export async function putMediaMediaId(
  arg: InferRequestType<(typeof client)['media'][':mediaId']['$put']>,
) {
  return await client['media'][':mediaId']['$put'](arg)
}

/**
 * DELETE /media/{mediaId}
 *
 * メディア削除
 */
export async function deleteMediaMediaId(
  arg: InferRequestType<(typeof client)['media'][':mediaId']['$delete']>,
) {
  return await client['media'][':mediaId']['$delete'](arg)
}

/**
 * GET /authors
 *
 * 著者一覧取得
 */
export async function getAuthors() {
  return await client.authors.$get()
}

/**
 * GET /authors/{authorId}
 *
 * 著者詳細取得
 */
export async function getAuthorsAuthorId(
  arg: InferRequestType<(typeof client)['authors'][':authorId']['$get']>,
) {
  return await client['authors'][':authorId']['$get'](arg)
}
