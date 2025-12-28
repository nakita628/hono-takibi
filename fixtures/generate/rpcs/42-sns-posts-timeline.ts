import { client } from '../index.ts'

/**
 * GET /posts
 *
 * 投稿一覧取得
 *
 * 公開投稿の一覧を取得（検索・フィルタ用）
 */
export async function getPosts(params: {
  query: { cursor: string; limit: number; userId: string; hashtag: string; mediaOnly: boolean }
}) {
  return await client.posts.$get({ query: params.query })
}

/**
 * POST /posts
 *
 * 投稿作成
 */
export async function postPosts(body: {
  text: string
  mediaIds?: string[]
  poll?: { options: string[]; duration: number }
  visibility?: 'public' | 'followers' | 'mentioned'
  replySettings?: 'everyone' | 'followers' | 'mentioned'
  quotedPostId?: string
}) {
  return await client.posts.$post({ json: body })
}

/**
 * GET /posts/{postId}
 *
 * 投稿詳細取得
 */
export async function getPostsPostId(params: { path: { postId: string } }) {
  return await client.posts[':postId'].$get({ param: params.path })
}

/**
 * DELETE /posts/{postId}
 *
 * 投稿削除
 */
export async function deletePostsPostId(params: { path: { postId: string } }) {
  return await client.posts[':postId'].$delete({ param: params.path })
}

/**
 * GET /posts/{postId}/thread
 *
 * スレッド取得
 *
 * 投稿とその返信スレッドを取得
 */
export async function getPostsPostIdThread(params: { path: { postId: string } }) {
  return await client.posts[':postId'].thread.$get({ param: params.path })
}

/**
 * GET /posts/{postId}/context
 *
 * 投稿コンテキスト取得
 *
 * 親投稿と返信を含むコンテキストを取得
 */
export async function getPostsPostIdContext(params: { path: { postId: string } }) {
  return await client.posts[':postId'].context.$get({ param: params.path })
}

/**
 * GET /timeline/home
 *
 * ホームタイムライン取得
 *
 * フォローしているユーザーの投稿を時系列で取得
 */
export async function getTimelineHome(params: {
  query: { cursor: string; limit: number; includeReplies: boolean; includeReposts: boolean }
}) {
  return await client.timeline.home.$get({ query: params.query })
}

/**
 * GET /timeline/for-you
 *
 * おすすめタイムライン取得
 *
 * アルゴリズムによるおすすめ投稿
 */
export async function getTimelineForYou(params: { query: { cursor: string; limit: number } }) {
  return await client.timeline['for-you'].$get({ query: params.query })
}

/**
 * GET /timeline/user/{userId}
 *
 * ユーザータイムライン取得
 */
export async function getTimelineUserUserId(params: {
  path: { userId: string }
  query: {
    cursor: string
    limit: number
    includeReplies: boolean
    includeReposts: boolean
    mediaOnly: boolean
  }
}) {
  return await client.timeline.user[':userId'].$get({ param: params.path, query: params.query })
}

/**
 * GET /timeline/hashtag/{hashtag}
 *
 * ハッシュタグタイムライン取得
 */
export async function getTimelineHashtagHashtag(params: {
  path: { hashtag: string }
  query: { cursor: string; limit: number }
}) {
  return await client.timeline.hashtag[':hashtag'].$get({ param: params.path, query: params.query })
}

/**
 * POST /posts/{postId}/like
 *
 * いいね
 */
export async function postPostsPostIdLike(params: { path: { postId: string } }) {
  return await client.posts[':postId'].like.$post({ param: params.path })
}

/**
 * DELETE /posts/{postId}/like
 *
 * いいね解除
 */
export async function deletePostsPostIdLike(params: { path: { postId: string } }) {
  return await client.posts[':postId'].like.$delete({ param: params.path })
}

/**
 * POST /posts/{postId}/repost
 *
 * リポスト
 */
export async function postPostsPostIdRepost(params: { path: { postId: string } }) {
  return await client.posts[':postId'].repost.$post({ param: params.path })
}

/**
 * DELETE /posts/{postId}/repost
 *
 * リポスト解除
 */
export async function deletePostsPostIdRepost(params: { path: { postId: string } }) {
  return await client.posts[':postId'].repost.$delete({ param: params.path })
}

/**
 * POST /posts/{postId}/quote
 *
 * 引用投稿
 */
export async function postPostsPostIdQuote(
  params: { path: { postId: string } },
  body: { text: string; mediaIds?: string[] },
) {
  return await client.posts[':postId'].quote.$post({ param: params.path, json: body })
}

/**
 * POST /posts/{postId}/bookmark
 *
 * ブックマーク追加
 */
export async function postPostsPostIdBookmark(params: { path: { postId: string } }) {
  return await client.posts[':postId'].bookmark.$post({ param: params.path })
}

/**
 * DELETE /posts/{postId}/bookmark
 *
 * ブックマーク解除
 */
export async function deletePostsPostIdBookmark(params: { path: { postId: string } }) {
  return await client.posts[':postId'].bookmark.$delete({ param: params.path })
}

/**
 * GET /bookmarks
 *
 * ブックマーク一覧取得
 */
export async function getBookmarks(params: { query: { cursor: string; limit: number } }) {
  return await client.bookmarks.$get({ query: params.query })
}

/**
 * GET /posts/{postId}/likes
 *
 * いいねしたユーザー一覧
 */
export async function getPostsPostIdLikes(params: {
  path: { postId: string }
  query: { cursor: string; limit: number }
}) {
  return await client.posts[':postId'].likes.$get({ param: params.path, query: params.query })
}

/**
 * GET /posts/{postId}/reposts
 *
 * リポストしたユーザー一覧
 */
export async function getPostsPostIdReposts(params: {
  path: { postId: string }
  query: { cursor: string; limit: number }
}) {
  return await client.posts[':postId'].reposts.$get({ param: params.path, query: params.query })
}

/**
 * GET /posts/{postId}/quotes
 *
 * 引用投稿一覧
 */
export async function getPostsPostIdQuotes(params: {
  path: { postId: string }
  query: { cursor: string; limit: number }
}) {
  return await client.posts[':postId'].quotes.$get({ param: params.path, query: params.query })
}

/**
 * GET /posts/{postId}/replies
 *
 * 返信一覧取得
 */
export async function getPostsPostIdReplies(params: {
  path: { postId: string }
  query: { cursor: string; limit: number; sort: 'recent' | 'popular' | 'relevant' }
}) {
  return await client.posts[':postId'].replies.$get({ param: params.path, query: params.query })
}

/**
 * POST /posts/{postId}/replies
 *
 * 返信投稿
 */
export async function postPostsPostIdReplies(
  params: { path: { postId: string } },
  body: {
    text: string
    mediaIds?: string[]
    poll?: { options: string[]; duration: number }
    visibility?: 'public' | 'followers' | 'mentioned'
    replySettings?: 'everyone' | 'followers' | 'mentioned'
    quotedPostId?: string
  },
) {
  return await client.posts[':postId'].replies.$post({ param: params.path, json: body })
}

/**
 * POST /media/upload
 *
 * メディアアップロード
 */
export async function postMediaUpload(body: { file: string; alt?: string }) {
  return await client.media.upload.$post({ json: body })
}

/**
 * GET /media/{mediaId}
 *
 * メディア情報取得
 */
export async function getMediaMediaId(params: { path: { mediaId: string } }) {
  return await client.media[':mediaId'].$get({ param: params.path })
}

/**
 * PATCH /media/{mediaId}
 *
 * メディア情報更新
 */
export async function patchMediaMediaId(
  params: { path: { mediaId: string } },
  body: { alt?: string },
) {
  return await client.media[':mediaId'].$patch({ param: params.path, json: body })
}
