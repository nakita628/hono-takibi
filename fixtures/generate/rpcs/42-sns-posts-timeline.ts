import type { ClientRequestOptions } from 'hono/client'
import { client } from '../clients/42-sns-posts-timeline'

/**
 * GET /posts
 *
 * 投稿一覧取得
 *
 * 公開投稿の一覧を取得（検索・フィルタ用）
 */
export async function getPosts(
  args: {
    query: {
      cursor?: string
      limit?: number
      userId?: string
      hashtag?: string
      mediaOnly?: string
    }
  },
  options?: ClientRequestOptions,
) {
  return await client.posts.$get(args, options)
}

/**
 * POST /posts
 *
 * 投稿作成
 */
export async function postPosts(
  args: {
    json: {
      text: string
      mediaIds?: string[]
      poll?: { options: string[]; duration: number }
      visibility?: 'public' | 'followers' | 'mentioned'
      replySettings?: 'everyone' | 'followers' | 'mentioned'
      quotedPostId?: string
    }
  },
  options?: ClientRequestOptions,
) {
  return await client.posts.$post(args, options)
}

/**
 * GET /posts/{postId}
 *
 * 投稿詳細取得
 */
export async function getPostsPostId(
  args: { param: { postId: string } },
  options?: ClientRequestOptions,
) {
  return await client['posts'][':postId']['$get'](args, options)
}

/**
 * DELETE /posts/{postId}
 *
 * 投稿削除
 */
export async function deletePostsPostId(
  args: { param: { postId: string } },
  options?: ClientRequestOptions,
) {
  return await client['posts'][':postId']['$delete'](args, options)
}

/**
 * GET /posts/{postId}/thread
 *
 * スレッド取得
 *
 * 投稿とその返信スレッドを取得
 */
export async function getPostsPostIdThread(
  args: { param: { postId: string } },
  options?: ClientRequestOptions,
) {
  return await client['posts'][':postId']['thread']['$get'](args, options)
}

/**
 * GET /posts/{postId}/context
 *
 * 投稿コンテキスト取得
 *
 * 親投稿と返信を含むコンテキストを取得
 */
export async function getPostsPostIdContext(
  args: { param: { postId: string } },
  options?: ClientRequestOptions,
) {
  return await client['posts'][':postId']['context']['$get'](args, options)
}

/**
 * GET /timeline/home
 *
 * ホームタイムライン取得
 *
 * フォローしているユーザーの投稿を時系列で取得
 */
export async function getTimelineHome(
  args: {
    query: { cursor?: string; limit?: number; includeReplies?: string; includeReposts?: string }
  },
  options?: ClientRequestOptions,
) {
  return await client['timeline']['home']['$get'](args, options)
}

/**
 * GET /timeline/for-you
 *
 * おすすめタイムライン取得
 *
 * アルゴリズムによるおすすめ投稿
 */
export async function getTimelineForYou(
  args: { query: { cursor?: string; limit?: number } },
  options?: ClientRequestOptions,
) {
  return await client['timeline']['for-you']['$get'](args, options)
}

/**
 * GET /timeline/user/{userId}
 *
 * ユーザータイムライン取得
 */
export async function getTimelineUserUserId(
  args: {
    param: { userId: string }
    query: {
      cursor?: string
      limit?: number
      includeReplies?: string
      includeReposts?: string
      mediaOnly?: string
    }
  },
  options?: ClientRequestOptions,
) {
  return await client['timeline']['user'][':userId']['$get'](args, options)
}

/**
 * GET /timeline/hashtag/{hashtag}
 *
 * ハッシュタグタイムライン取得
 */
export async function getTimelineHashtagHashtag(
  args: { param: { hashtag: string }; query: { cursor?: string; limit?: number } },
  options?: ClientRequestOptions,
) {
  return await client['timeline']['hashtag'][':hashtag']['$get'](args, options)
}

/**
 * POST /posts/{postId}/like
 *
 * いいね
 */
export async function postPostsPostIdLike(
  args: { param: { postId: string } },
  options?: ClientRequestOptions,
) {
  return await client['posts'][':postId']['like']['$post'](args, options)
}

/**
 * DELETE /posts/{postId}/like
 *
 * いいね解除
 */
export async function deletePostsPostIdLike(
  args: { param: { postId: string } },
  options?: ClientRequestOptions,
) {
  return await client['posts'][':postId']['like']['$delete'](args, options)
}

/**
 * POST /posts/{postId}/repost
 *
 * リポスト
 */
export async function postPostsPostIdRepost(
  args: { param: { postId: string } },
  options?: ClientRequestOptions,
) {
  return await client['posts'][':postId']['repost']['$post'](args, options)
}

/**
 * DELETE /posts/{postId}/repost
 *
 * リポスト解除
 */
export async function deletePostsPostIdRepost(
  args: { param: { postId: string } },
  options?: ClientRequestOptions,
) {
  return await client['posts'][':postId']['repost']['$delete'](args, options)
}

/**
 * POST /posts/{postId}/quote
 *
 * 引用投稿
 */
export async function postPostsPostIdQuote(
  args: { param: { postId: string }; json: { text: string; mediaIds?: string[] } },
  options?: ClientRequestOptions,
) {
  return await client['posts'][':postId']['quote']['$post'](args, options)
}

/**
 * POST /posts/{postId}/bookmark
 *
 * ブックマーク追加
 */
export async function postPostsPostIdBookmark(
  args: { param: { postId: string } },
  options?: ClientRequestOptions,
) {
  return await client['posts'][':postId']['bookmark']['$post'](args, options)
}

/**
 * DELETE /posts/{postId}/bookmark
 *
 * ブックマーク解除
 */
export async function deletePostsPostIdBookmark(
  args: { param: { postId: string } },
  options?: ClientRequestOptions,
) {
  return await client['posts'][':postId']['bookmark']['$delete'](args, options)
}

/**
 * GET /bookmarks
 *
 * ブックマーク一覧取得
 */
export async function getBookmarks(
  args: { query: { cursor?: string; limit?: number } },
  options?: ClientRequestOptions,
) {
  return await client.bookmarks.$get(args, options)
}

/**
 * GET /posts/{postId}/likes
 *
 * いいねしたユーザー一覧
 */
export async function getPostsPostIdLikes(
  args: { param: { postId: string }; query: { cursor?: string; limit?: number } },
  options?: ClientRequestOptions,
) {
  return await client['posts'][':postId']['likes']['$get'](args, options)
}

/**
 * GET /posts/{postId}/reposts
 *
 * リポストしたユーザー一覧
 */
export async function getPostsPostIdReposts(
  args: { param: { postId: string }; query: { cursor?: string; limit?: number } },
  options?: ClientRequestOptions,
) {
  return await client['posts'][':postId']['reposts']['$get'](args, options)
}

/**
 * GET /posts/{postId}/quotes
 *
 * 引用投稿一覧
 */
export async function getPostsPostIdQuotes(
  args: { param: { postId: string }; query: { cursor?: string; limit?: number } },
  options?: ClientRequestOptions,
) {
  return await client['posts'][':postId']['quotes']['$get'](args, options)
}

/**
 * GET /posts/{postId}/replies
 *
 * 返信一覧取得
 */
export async function getPostsPostIdReplies(
  args: {
    param: { postId: string }
    query: { cursor?: string; limit?: number; sort?: 'recent' | 'popular' | 'relevant' }
  },
  options?: ClientRequestOptions,
) {
  return await client['posts'][':postId']['replies']['$get'](args, options)
}

/**
 * POST /posts/{postId}/replies
 *
 * 返信投稿
 */
export async function postPostsPostIdReplies(
  args: {
    param: { postId: string }
    json: {
      text: string
      mediaIds?: string[]
      poll?: { options: string[]; duration: number }
      visibility?: 'public' | 'followers' | 'mentioned'
      replySettings?: 'everyone' | 'followers' | 'mentioned'
      quotedPostId?: string
    }
  },
  options?: ClientRequestOptions,
) {
  return await client['posts'][':postId']['replies']['$post'](args, options)
}

/**
 * POST /media/upload
 *
 * メディアアップロード
 */
export async function postMediaUpload(
  args: { form: { file: File; alt?: string } },
  options?: ClientRequestOptions,
) {
  return await client['media']['upload']['$post'](args, options)
}

/**
 * GET /media/{mediaId}
 *
 * メディア情報取得
 */
export async function getMediaMediaId(
  args: { param: { mediaId: string } },
  options?: ClientRequestOptions,
) {
  return await client['media'][':mediaId']['$get'](args, options)
}

/**
 * PATCH /media/{mediaId}
 *
 * メディア情報更新
 */
export async function patchMediaMediaId(
  args: { param: { mediaId: string }; json: { alt?: string } },
  options?: ClientRequestOptions,
) {
  return await client['media'][':mediaId']['$patch'](args, options)
}
