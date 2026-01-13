import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { client } from '../clients/31-practical-blog-api'

/**
 * GET /posts
 *
 * 記事一覧取得
 */
export async function getPosts(
  args: InferRequestType<typeof client.posts.$get>,
  options?: ClientRequestOptions,
) {
  return await client.posts.$get(args, options)
}

/**
 * POST /posts
 *
 * 記事作成
 */
export async function postPosts(
  args: InferRequestType<typeof client.posts.$post>,
  options?: ClientRequestOptions,
) {
  return await client.posts.$post(args, options)
}

/**
 * GET /posts/{postId}
 *
 * 記事詳細取得
 */
export async function getPostsPostId(
  args: InferRequestType<(typeof client.posts)[':postId']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.posts[':postId'].$get(args, options)
}

/**
 * PUT /posts/{postId}
 *
 * 記事更新
 */
export async function putPostsPostId(
  args: InferRequestType<(typeof client.posts)[':postId']['$put']>,
  options?: ClientRequestOptions,
) {
  return await client.posts[':postId'].$put(args, options)
}

/**
 * DELETE /posts/{postId}
 *
 * 記事削除
 */
export async function deletePostsPostId(
  args: InferRequestType<(typeof client.posts)[':postId']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await client.posts[':postId'].$delete(args, options)
}

/**
 * GET /posts/slug/{slug}
 *
 * スラッグで記事取得
 */
export async function getPostsSlugSlug(
  args: InferRequestType<(typeof client.posts.slug)[':slug']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.posts.slug[':slug'].$get(args, options)
}

/**
 * POST /posts/{postId}/publish
 *
 * 記事公開
 */
export async function postPostsPostIdPublish(
  args: InferRequestType<(typeof client.posts)[':postId']['publish']['$post']>,
  options?: ClientRequestOptions,
) {
  return await client.posts[':postId'].publish.$post(args, options)
}

/**
 * POST /posts/{postId}/unpublish
 *
 * 記事非公開化
 */
export async function postPostsPostIdUnpublish(
  args: InferRequestType<(typeof client.posts)[':postId']['unpublish']['$post']>,
  options?: ClientRequestOptions,
) {
  return await client.posts[':postId'].unpublish.$post(args, options)
}

/**
 * GET /posts/{postId}/comments
 *
 * 記事のコメント一覧取得
 */
export async function getPostsPostIdComments(
  args: InferRequestType<(typeof client.posts)[':postId']['comments']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.posts[':postId'].comments.$get(args, options)
}

/**
 * POST /posts/{postId}/comments
 *
 * コメント投稿
 */
export async function postPostsPostIdComments(
  args: InferRequestType<(typeof client.posts)[':postId']['comments']['$post']>,
  options?: ClientRequestOptions,
) {
  return await client.posts[':postId'].comments.$post(args, options)
}

/**
 * DELETE /comments/{commentId}
 *
 * コメント削除
 */
export async function deleteCommentsCommentId(
  args: InferRequestType<(typeof client.comments)[':commentId']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await client.comments[':commentId'].$delete(args, options)
}

/**
 * POST /comments/{commentId}/approve
 *
 * コメント承認
 */
export async function postCommentsCommentIdApprove(
  args: InferRequestType<(typeof client.comments)[':commentId']['approve']['$post']>,
  options?: ClientRequestOptions,
) {
  return await client.comments[':commentId'].approve.$post(args, options)
}

/**
 * GET /categories
 *
 * カテゴリ一覧取得
 */
export async function getCategories(options?: ClientRequestOptions) {
  return await client.categories.$get(undefined, options)
}

/**
 * POST /categories
 *
 * カテゴリ作成
 */
export async function postCategories(
  args: InferRequestType<typeof client.categories.$post>,
  options?: ClientRequestOptions,
) {
  return await client.categories.$post(args, options)
}

/**
 * GET /categories/{categoryId}
 *
 * カテゴリ詳細取得
 */
export async function getCategoriesCategoryId(
  args: InferRequestType<(typeof client.categories)[':categoryId']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.categories[':categoryId'].$get(args, options)
}

/**
 * PUT /categories/{categoryId}
 *
 * カテゴリ更新
 */
export async function putCategoriesCategoryId(
  args: InferRequestType<(typeof client.categories)[':categoryId']['$put']>,
  options?: ClientRequestOptions,
) {
  return await client.categories[':categoryId'].$put(args, options)
}

/**
 * DELETE /categories/{categoryId}
 *
 * カテゴリ削除
 */
export async function deleteCategoriesCategoryId(
  args: InferRequestType<(typeof client.categories)[':categoryId']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await client.categories[':categoryId'].$delete(args, options)
}

/**
 * GET /tags
 *
 * タグ一覧取得
 */
export async function getTags(
  args: InferRequestType<typeof client.tags.$get>,
  options?: ClientRequestOptions,
) {
  return await client.tags.$get(args, options)
}

/**
 * POST /tags
 *
 * タグ作成
 */
export async function postTags(
  args: InferRequestType<typeof client.tags.$post>,
  options?: ClientRequestOptions,
) {
  return await client.tags.$post(args, options)
}

/**
 * GET /media
 *
 * メディア一覧取得
 */
export async function getMedia(
  args: InferRequestType<typeof client.media.$get>,
  options?: ClientRequestOptions,
) {
  return await client.media.$get(args, options)
}

/**
 * POST /media
 *
 * メディアアップロード
 */
export async function postMedia(
  args: InferRequestType<typeof client.media.$post>,
  options?: ClientRequestOptions,
) {
  return await client.media.$post(args, options)
}

/**
 * GET /media/{mediaId}
 *
 * メディア詳細取得
 */
export async function getMediaMediaId(
  args: InferRequestType<(typeof client.media)[':mediaId']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.media[':mediaId'].$get(args, options)
}

/**
 * PUT /media/{mediaId}
 *
 * メディア情報更新
 */
export async function putMediaMediaId(
  args: InferRequestType<(typeof client.media)[':mediaId']['$put']>,
  options?: ClientRequestOptions,
) {
  return await client.media[':mediaId'].$put(args, options)
}

/**
 * DELETE /media/{mediaId}
 *
 * メディア削除
 */
export async function deleteMediaMediaId(
  args: InferRequestType<(typeof client.media)[':mediaId']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await client.media[':mediaId'].$delete(args, options)
}

/**
 * GET /authors
 *
 * 著者一覧取得
 */
export async function getAuthors(options?: ClientRequestOptions) {
  return await client.authors.$get(undefined, options)
}

/**
 * GET /authors/{authorId}
 *
 * 著者詳細取得
 */
export async function getAuthorsAuthorId(
  args: InferRequestType<(typeof client.authors)[':authorId']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.authors[':authorId'].$get(args, options)
}
