import { client } from '../clients/42-sns-posts-timeline'

/**
 * GET /posts
 *
 * 投稿一覧取得
 *
 * 公開投稿の一覧を取得（検索・フィルタ用）
 */
export async function getPosts(arg: {
  query: { cursor?: string; limit?: number; userId?: string; hashtag?: string; mediaOnly?: string }
}) {
  return await client.posts.$get(arg)
}

/**
 * POST /posts
 *
 * 投稿作成
 */
export async function postPosts(arg: {
  json: {
    text: string
    mediaIds?: string[]
    poll?: { options: string[]; duration: number }
    visibility?: 'public' | 'followers' | 'mentioned'
    replySettings?: 'everyone' | 'followers' | 'mentioned'
    quotedPostId?: string
  }
}) {
  return await client.posts.$post(arg)
}

/**
 * GET /posts/{postId}
 *
 * 投稿詳細取得
 */
export async function getPostsPostId(arg: { param: { postId: string } }) {
  return await client['posts'][':postId']['$get'](arg)
}

/**
 * DELETE /posts/{postId}
 *
 * 投稿削除
 */
export async function deletePostsPostId(arg: { param: { postId: string } }) {
  return await client['posts'][':postId']['$delete'](arg)
}

/**
 * GET /posts/{postId}/thread
 *
 * スレッド取得
 *
 * 投稿とその返信スレッドを取得
 */
export async function getPostsPostIdThread(arg: { param: { postId: string } }) {
  return await client['posts'][':postId']['thread']['$get'](arg)
}

/**
 * GET /posts/{postId}/context
 *
 * 投稿コンテキスト取得
 *
 * 親投稿と返信を含むコンテキストを取得
 */
export async function getPostsPostIdContext(arg: { param: { postId: string } }) {
  return await client['posts'][':postId']['context']['$get'](arg)
}

/**
 * GET /timeline/home
 *
 * ホームタイムライン取得
 *
 * フォローしているユーザーの投稿を時系列で取得
 */
export async function getTimelineHome(arg: {
  query: { cursor?: string; limit?: number; includeReplies?: string; includeReposts?: string }
}) {
  return await client['timeline']['home']['$get'](arg)
}

/**
 * GET /timeline/for-you
 *
 * おすすめタイムライン取得
 *
 * アルゴリズムによるおすすめ投稿
 */
export async function getTimelineForYou(arg: { query: { cursor?: string; limit?: number } }) {
  return await client['timeline']['for-you']['$get'](arg)
}

/**
 * GET /timeline/user/{userId}
 *
 * ユーザータイムライン取得
 */
export async function getTimelineUserUserId(arg: {
  param: { userId: string }
  query: {
    cursor?: string
    limit?: number
    includeReplies?: string
    includeReposts?: string
    mediaOnly?: string
  }
}) {
  return await client['timeline']['user'][':userId']['$get'](arg)
}

/**
 * GET /timeline/hashtag/{hashtag}
 *
 * ハッシュタグタイムライン取得
 */
export async function getTimelineHashtagHashtag(arg: {
  param: { hashtag: string }
  query: { cursor?: string; limit?: number }
}) {
  return await client['timeline']['hashtag'][':hashtag']['$get'](arg)
}

/**
 * POST /posts/{postId}/like
 *
 * いいね
 */
export async function postPostsPostIdLike(arg: { param: { postId: string } }) {
  return await client['posts'][':postId']['like']['$post'](arg)
}

/**
 * DELETE /posts/{postId}/like
 *
 * いいね解除
 */
export async function deletePostsPostIdLike(arg: { param: { postId: string } }) {
  return await client['posts'][':postId']['like']['$delete'](arg)
}

/**
 * POST /posts/{postId}/repost
 *
 * リポスト
 */
export async function postPostsPostIdRepost(arg: { param: { postId: string } }) {
  return await client['posts'][':postId']['repost']['$post'](arg)
}

/**
 * DELETE /posts/{postId}/repost
 *
 * リポスト解除
 */
export async function deletePostsPostIdRepost(arg: { param: { postId: string } }) {
  return await client['posts'][':postId']['repost']['$delete'](arg)
}

/**
 * POST /posts/{postId}/quote
 *
 * 引用投稿
 */
export async function postPostsPostIdQuote(arg: {
  param: { postId: string }
  json: { text: string; mediaIds?: string[] }
}) {
  return await client['posts'][':postId']['quote']['$post'](arg)
}

/**
 * POST /posts/{postId}/bookmark
 *
 * ブックマーク追加
 */
export async function postPostsPostIdBookmark(arg: { param: { postId: string } }) {
  return await client['posts'][':postId']['bookmark']['$post'](arg)
}

/**
 * DELETE /posts/{postId}/bookmark
 *
 * ブックマーク解除
 */
export async function deletePostsPostIdBookmark(arg: { param: { postId: string } }) {
  return await client['posts'][':postId']['bookmark']['$delete'](arg)
}

/**
 * GET /bookmarks
 *
 * ブックマーク一覧取得
 */
export async function getBookmarks(arg: { query: { cursor?: string; limit?: number } }) {
  return await client.bookmarks.$get(arg)
}

/**
 * GET /posts/{postId}/likes
 *
 * いいねしたユーザー一覧
 */
export async function getPostsPostIdLikes(arg: {
  param: { postId: string }
  query: { cursor?: string; limit?: number }
}) {
  return await client['posts'][':postId']['likes']['$get'](arg)
}

/**
 * GET /posts/{postId}/reposts
 *
 * リポストしたユーザー一覧
 */
export async function getPostsPostIdReposts(arg: {
  param: { postId: string }
  query: { cursor?: string; limit?: number }
}) {
  return await client['posts'][':postId']['reposts']['$get'](arg)
}

/**
 * GET /posts/{postId}/quotes
 *
 * 引用投稿一覧
 */
export async function getPostsPostIdQuotes(arg: {
  param: { postId: string }
  query: { cursor?: string; limit?: number }
}) {
  return await client['posts'][':postId']['quotes']['$get'](arg)
}

/**
 * GET /posts/{postId}/replies
 *
 * 返信一覧取得
 */
export async function getPostsPostIdReplies(arg: {
  param: { postId: string }
  query: { cursor?: string; limit?: number; sort?: 'recent' | 'popular' | 'relevant' }
}) {
  return await client['posts'][':postId']['replies']['$get'](arg)
}

/**
 * POST /posts/{postId}/replies
 *
 * 返信投稿
 */
export async function postPostsPostIdReplies(arg: {
  param: { postId: string }
  json: {
    text: string
    mediaIds?: string[]
    poll?: { options: string[]; duration: number }
    visibility?: 'public' | 'followers' | 'mentioned'
    replySettings?: 'everyone' | 'followers' | 'mentioned'
    quotedPostId?: string
  }
}) {
  return await client['posts'][':postId']['replies']['$post'](arg)
}

/**
 * POST /media/upload
 *
 * メディアアップロード
 */
export async function postMediaUpload(arg: { form: { file: File; alt?: string } }) {
  return await client['media']['upload']['$post'](arg)
}

/**
 * GET /media/{mediaId}
 *
 * メディア情報取得
 */
export async function getMediaMediaId(arg: { param: { mediaId: string } }) {
  return await client['media'][':mediaId']['$get'](arg)
}

/**
 * PATCH /media/{mediaId}
 *
 * メディア情報更新
 */
export async function patchMediaMediaId(arg: {
  param: { mediaId: string }
  json: { alt?: string }
}) {
  return await client['media'][':mediaId']['$patch'](arg)
}
