import type { InferRequestType } from 'hono/client'
import { client } from '../clients/42-sns-posts-timeline'

/**
 * GET /posts
 *
 * 投稿一覧取得
 *
 * 公開投稿の一覧を取得（検索・フィルタ用）
 */
export async function getPosts(arg: InferRequestType<typeof client.posts.$get>) {
  return await client.posts.$get(arg)
}

/**
 * POST /posts
 *
 * 投稿作成
 */
export async function postPosts(arg: InferRequestType<typeof client.posts.$post>) {
  return await client.posts.$post(arg)
}

/**
 * GET /posts/{postId}
 *
 * 投稿詳細取得
 */
export async function getPostsPostId(
  arg: InferRequestType<(typeof client)['posts'][':postId']['$get']>,
) {
  return await client['posts'][':postId']['$get'](arg)
}

/**
 * DELETE /posts/{postId}
 *
 * 投稿削除
 */
export async function deletePostsPostId(
  arg: InferRequestType<(typeof client)['posts'][':postId']['$delete']>,
) {
  return await client['posts'][':postId']['$delete'](arg)
}

/**
 * GET /posts/{postId}/thread
 *
 * スレッド取得
 *
 * 投稿とその返信スレッドを取得
 */
export async function getPostsPostIdThread(
  arg: InferRequestType<(typeof client)['posts'][':postId']['thread']['$get']>,
) {
  return await client['posts'][':postId']['thread']['$get'](arg)
}

/**
 * GET /posts/{postId}/context
 *
 * 投稿コンテキスト取得
 *
 * 親投稿と返信を含むコンテキストを取得
 */
export async function getPostsPostIdContext(
  arg: InferRequestType<(typeof client)['posts'][':postId']['context']['$get']>,
) {
  return await client['posts'][':postId']['context']['$get'](arg)
}

/**
 * GET /timeline/home
 *
 * ホームタイムライン取得
 *
 * フォローしているユーザーの投稿を時系列で取得
 */
export async function getTimelineHome(
  arg: InferRequestType<(typeof client)['timeline']['home']['$get']>,
) {
  return await client['timeline']['home']['$get'](arg)
}

/**
 * GET /timeline/for-you
 *
 * おすすめタイムライン取得
 *
 * アルゴリズムによるおすすめ投稿
 */
export async function getTimelineForYou(
  arg: InferRequestType<(typeof client)['timeline']['for-you']['$get']>,
) {
  return await client['timeline']['for-you']['$get'](arg)
}

/**
 * GET /timeline/user/{userId}
 *
 * ユーザータイムライン取得
 */
export async function getTimelineUserUserId(
  arg: InferRequestType<(typeof client)['timeline']['user'][':userId']['$get']>,
) {
  return await client['timeline']['user'][':userId']['$get'](arg)
}

/**
 * GET /timeline/hashtag/{hashtag}
 *
 * ハッシュタグタイムライン取得
 */
export async function getTimelineHashtagHashtag(
  arg: InferRequestType<(typeof client)['timeline']['hashtag'][':hashtag']['$get']>,
) {
  return await client['timeline']['hashtag'][':hashtag']['$get'](arg)
}

/**
 * POST /posts/{postId}/like
 *
 * いいね
 */
export async function postPostsPostIdLike(
  arg: InferRequestType<(typeof client)['posts'][':postId']['like']['$post']>,
) {
  return await client['posts'][':postId']['like']['$post'](arg)
}

/**
 * DELETE /posts/{postId}/like
 *
 * いいね解除
 */
export async function deletePostsPostIdLike(
  arg: InferRequestType<(typeof client)['posts'][':postId']['like']['$delete']>,
) {
  return await client['posts'][':postId']['like']['$delete'](arg)
}

/**
 * POST /posts/{postId}/repost
 *
 * リポスト
 */
export async function postPostsPostIdRepost(
  arg: InferRequestType<(typeof client)['posts'][':postId']['repost']['$post']>,
) {
  return await client['posts'][':postId']['repost']['$post'](arg)
}

/**
 * DELETE /posts/{postId}/repost
 *
 * リポスト解除
 */
export async function deletePostsPostIdRepost(
  arg: InferRequestType<(typeof client)['posts'][':postId']['repost']['$delete']>,
) {
  return await client['posts'][':postId']['repost']['$delete'](arg)
}

/**
 * POST /posts/{postId}/quote
 *
 * 引用投稿
 */
export async function postPostsPostIdQuote(
  arg: InferRequestType<(typeof client)['posts'][':postId']['quote']['$post']>,
) {
  return await client['posts'][':postId']['quote']['$post'](arg)
}

/**
 * POST /posts/{postId}/bookmark
 *
 * ブックマーク追加
 */
export async function postPostsPostIdBookmark(
  arg: InferRequestType<(typeof client)['posts'][':postId']['bookmark']['$post']>,
) {
  return await client['posts'][':postId']['bookmark']['$post'](arg)
}

/**
 * DELETE /posts/{postId}/bookmark
 *
 * ブックマーク解除
 */
export async function deletePostsPostIdBookmark(
  arg: InferRequestType<(typeof client)['posts'][':postId']['bookmark']['$delete']>,
) {
  return await client['posts'][':postId']['bookmark']['$delete'](arg)
}

/**
 * GET /bookmarks
 *
 * ブックマーク一覧取得
 */
export async function getBookmarks(arg: InferRequestType<typeof client.bookmarks.$get>) {
  return await client.bookmarks.$get(arg)
}

/**
 * GET /posts/{postId}/likes
 *
 * いいねしたユーザー一覧
 */
export async function getPostsPostIdLikes(
  arg: InferRequestType<(typeof client)['posts'][':postId']['likes']['$get']>,
) {
  return await client['posts'][':postId']['likes']['$get'](arg)
}

/**
 * GET /posts/{postId}/reposts
 *
 * リポストしたユーザー一覧
 */
export async function getPostsPostIdReposts(
  arg: InferRequestType<(typeof client)['posts'][':postId']['reposts']['$get']>,
) {
  return await client['posts'][':postId']['reposts']['$get'](arg)
}

/**
 * GET /posts/{postId}/quotes
 *
 * 引用投稿一覧
 */
export async function getPostsPostIdQuotes(
  arg: InferRequestType<(typeof client)['posts'][':postId']['quotes']['$get']>,
) {
  return await client['posts'][':postId']['quotes']['$get'](arg)
}

/**
 * GET /posts/{postId}/replies
 *
 * 返信一覧取得
 */
export async function getPostsPostIdReplies(
  arg: InferRequestType<(typeof client)['posts'][':postId']['replies']['$get']>,
) {
  return await client['posts'][':postId']['replies']['$get'](arg)
}

/**
 * POST /posts/{postId}/replies
 *
 * 返信投稿
 */
export async function postPostsPostIdReplies(
  arg: InferRequestType<(typeof client)['posts'][':postId']['replies']['$post']>,
) {
  return await client['posts'][':postId']['replies']['$post'](arg)
}

/**
 * POST /media/upload
 *
 * メディアアップロード
 */
export async function postMediaUpload(
  arg: InferRequestType<(typeof client)['media']['upload']['$post']>,
) {
  return await client['media']['upload']['$post'](arg)
}

/**
 * GET /media/{mediaId}
 *
 * メディア情報取得
 */
export async function getMediaMediaId(
  arg: InferRequestType<(typeof client)['media'][':mediaId']['$get']>,
) {
  return await client['media'][':mediaId']['$get'](arg)
}

/**
 * PATCH /media/{mediaId}
 *
 * メディア情報更新
 */
export async function patchMediaMediaId(
  arg: InferRequestType<(typeof client)['media'][':mediaId']['$patch']>,
) {
  return await client['media'][':mediaId']['$patch'](arg)
}
