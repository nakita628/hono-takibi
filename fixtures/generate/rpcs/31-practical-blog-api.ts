import type { ClientRequestOptions } from 'hono/client'
import { client } from '../clients/31-practical-blog-api'

/**
 * GET /posts
 *
 * 記事一覧取得
 */
export async function getPosts(args: {
  query: {
    page?: number
    limit?: number
    status?: 'draft' | 'published' | 'scheduled' | 'archived'
    category?: string
    tag?: string
    author?: string
    search?: string
    sort?: 'publishedAt:desc' | 'publishedAt:asc' | 'title:asc' | 'title:desc' | 'viewCount:desc'
  }
  options?: ClientRequestOptions
}) {
  return await client.posts.$get(args)
}

/**
 * POST /posts
 *
 * 記事作成
 */
export async function postPosts(args: {
  json: {
    title: string
    slug?: string
    excerpt?: string
    content?: string
    contentMarkdown?: string
    featuredImageId?: string
    categoryId?: string
    tagIds?: string[]
    seo?: {
      metaTitle?: string
      metaDescription?: string
      ogTitle?: string
      ogDescription?: string
      ogImage?: string
      canonicalUrl?: string
      noIndex?: boolean
    }
    status?: 'draft' | 'published'
  }
  options?: ClientRequestOptions
}) {
  return await client.posts.$post(args)
}

/**
 * GET /posts/{postId}
 *
 * 記事詳細取得
 */
export async function getPostsPostId(args: {
  param: { postId: string }
  options?: ClientRequestOptions
}) {
  return await client['posts'][':postId']['$get'](args)
}

/**
 * PUT /posts/{postId}
 *
 * 記事更新
 */
export async function putPostsPostId(args: {
  param: { postId: string }
  json: {
    title?: string
    slug?: string
    excerpt?: string
    content?: string
    contentMarkdown?: string
    featuredImageId?: string
    categoryId?: string
    tagIds?: string[]
    seo?: {
      metaTitle?: string
      metaDescription?: string
      ogTitle?: string
      ogDescription?: string
      ogImage?: string
      canonicalUrl?: string
      noIndex?: boolean
    }
  }
  options?: ClientRequestOptions
}) {
  return await client['posts'][':postId']['$put'](args)
}

/**
 * DELETE /posts/{postId}
 *
 * 記事削除
 */
export async function deletePostsPostId(args: {
  param: { postId: string }
  options?: ClientRequestOptions
}) {
  return await client['posts'][':postId']['$delete'](args)
}

/**
 * GET /posts/slug/{slug}
 *
 * スラッグで記事取得
 */
export async function getPostsSlugSlug(args: {
  param: { slug: string }
  options?: ClientRequestOptions
}) {
  return await client['posts']['slug'][':slug']['$get'](args)
}

/**
 * POST /posts/{postId}/publish
 *
 * 記事公開
 */
export async function postPostsPostIdPublish(args: {
  param: { postId: string }
  json: { scheduledAt?: string }
  options?: ClientRequestOptions
}) {
  return await client['posts'][':postId']['publish']['$post'](args)
}

/**
 * POST /posts/{postId}/unpublish
 *
 * 記事非公開化
 */
export async function postPostsPostIdUnpublish(args: {
  param: { postId: string }
  options?: ClientRequestOptions
}) {
  return await client['posts'][':postId']['unpublish']['$post'](args)
}

/**
 * GET /posts/{postId}/comments
 *
 * 記事のコメント一覧取得
 */
export async function getPostsPostIdComments(args: {
  param: { postId: string }
  query: { page?: number; limit?: number }
  options?: ClientRequestOptions
}) {
  return await client['posts'][':postId']['comments']['$get'](args)
}

/**
 * POST /posts/{postId}/comments
 *
 * コメント投稿
 */
export async function postPostsPostIdComments(args: {
  param: { postId: string }
  json: {
    content: string
    authorName: string
    authorEmail: string
    authorUrl?: string
    parentId?: string
  }
  options?: ClientRequestOptions
}) {
  return await client['posts'][':postId']['comments']['$post'](args)
}

/**
 * DELETE /comments/{commentId}
 *
 * コメント削除
 */
export async function deleteCommentsCommentId(args: {
  param: { commentId: string }
  options?: ClientRequestOptions
}) {
  return await client['comments'][':commentId']['$delete'](args)
}

/**
 * POST /comments/{commentId}/approve
 *
 * コメント承認
 */
export async function postCommentsCommentIdApprove(args: {
  param: { commentId: string }
  options?: ClientRequestOptions
}) {
  return await client['comments'][':commentId']['approve']['$post'](args)
}

/**
 * GET /categories
 *
 * カテゴリ一覧取得
 */
export async function getCategories(args?: { options?: ClientRequestOptions }) {
  return await client.categories.$get(args)
}

/**
 * POST /categories
 *
 * カテゴリ作成
 */
export async function postCategories(args: {
  json: { name: string; slug?: string; description?: string; parentId?: string }
  options?: ClientRequestOptions
}) {
  return await client.categories.$post(args)
}

/**
 * GET /categories/{categoryId}
 *
 * カテゴリ詳細取得
 */
export async function getCategoriesCategoryId(args: {
  param: { categoryId: string }
  options?: ClientRequestOptions
}) {
  return await client['categories'][':categoryId']['$get'](args)
}

/**
 * PUT /categories/{categoryId}
 *
 * カテゴリ更新
 */
export async function putCategoriesCategoryId(args: {
  param: { categoryId: string }
  json: { name?: string; slug?: string; description?: string; parentId?: string }
  options?: ClientRequestOptions
}) {
  return await client['categories'][':categoryId']['$put'](args)
}

/**
 * DELETE /categories/{categoryId}
 *
 * カテゴリ削除
 */
export async function deleteCategoriesCategoryId(args: {
  param: { categoryId: string }
  options?: ClientRequestOptions
}) {
  return await client['categories'][':categoryId']['$delete'](args)
}

/**
 * GET /tags
 *
 * タグ一覧取得
 */
export async function getTags(args: {
  query: { search?: string }
  options?: ClientRequestOptions
}) {
  return await client.tags.$get(args)
}

/**
 * POST /tags
 *
 * タグ作成
 */
export async function postTags(args: {
  json: { name: string; slug?: string }
  options?: ClientRequestOptions
}) {
  return await client.tags.$post(args)
}

/**
 * GET /media
 *
 * メディア一覧取得
 */
export async function getMedia(args: {
  query: { page?: number; limit?: number; type?: 'image' | 'video' | 'audio' | 'document' }
  options?: ClientRequestOptions
}) {
  return await client.media.$get(args)
}

/**
 * POST /media
 *
 * メディアアップロード
 */
export async function postMedia(args: {
  form: { file: File; altText?: string; caption?: string }
  options?: ClientRequestOptions
}) {
  return await client.media.$post(args)
}

/**
 * GET /media/{mediaId}
 *
 * メディア詳細取得
 */
export async function getMediaMediaId(args: {
  param: { mediaId: string }
  options?: ClientRequestOptions
}) {
  return await client['media'][':mediaId']['$get'](args)
}

/**
 * PUT /media/{mediaId}
 *
 * メディア情報更新
 */
export async function putMediaMediaId(args: {
  param: { mediaId: string }
  json: { altText?: string; caption?: string }
  options?: ClientRequestOptions
}) {
  return await client['media'][':mediaId']['$put'](args)
}

/**
 * DELETE /media/{mediaId}
 *
 * メディア削除
 */
export async function deleteMediaMediaId(args: {
  param: { mediaId: string }
  options?: ClientRequestOptions
}) {
  return await client['media'][':mediaId']['$delete'](args)
}

/**
 * GET /authors
 *
 * 著者一覧取得
 */
export async function getAuthors(args?: { options?: ClientRequestOptions }) {
  return await client.authors.$get(args)
}

/**
 * GET /authors/{authorId}
 *
 * 著者詳細取得
 */
export async function getAuthorsAuthorId(args: {
  param: { authorId: string }
  options?: ClientRequestOptions
}) {
  return await client['authors'][':authorId']['$get'](args)
}
