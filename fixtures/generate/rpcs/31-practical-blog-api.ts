import { client } from '../index.ts'

/**
 * GET /posts
 *
 * 記事一覧取得
 */
export async function getPosts(params: {
  query: {
    page: number
    limit: number
    status: 'draft' | 'published' | 'scheduled' | 'archived'
    category: string
    tag: string
    author: string
    search: string
    sort: 'publishedAt:desc' | 'publishedAt:asc' | 'title:asc' | 'title:desc' | 'viewCount:desc'
  }
}) {
  return await client.posts.$get({ query: params.query })
}

/**
 * POST /posts
 *
 * 記事作成
 */
export async function postPosts(body: {
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
}) {
  return await client.posts.$post({ json: body })
}

/**
 * GET /posts/{postId}
 *
 * 記事詳細取得
 */
export async function getPostsPostId(params: { path: { postId: string } }) {
  return await client.posts[':postId'].$get({ param: params.path })
}

/**
 * PUT /posts/{postId}
 *
 * 記事更新
 */
export async function putPostsPostId(
  params: { path: { postId: string } },
  body: {
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
  },
) {
  return await client.posts[':postId'].$put({ param: params.path, json: body })
}

/**
 * DELETE /posts/{postId}
 *
 * 記事削除
 */
export async function deletePostsPostId(params: { path: { postId: string } }) {
  return await client.posts[':postId'].$delete({ param: params.path })
}

/**
 * GET /posts/slug/{slug}
 *
 * スラッグで記事取得
 */
export async function getPostsSlugSlug(params: { path: { slug: string } }) {
  return await client.posts.slug[':slug'].$get({ param: params.path })
}

/**
 * POST /posts/{postId}/publish
 *
 * 記事公開
 */
export async function postPostsPostIdPublish(
  params: { path: { postId: string } },
  body: { scheduledAt?: string },
) {
  return await client.posts[':postId'].publish.$post({ param: params.path, json: body })
}

/**
 * POST /posts/{postId}/unpublish
 *
 * 記事非公開化
 */
export async function postPostsPostIdUnpublish(params: { path: { postId: string } }) {
  return await client.posts[':postId'].unpublish.$post({ param: params.path })
}

/**
 * GET /posts/{postId}/comments
 *
 * 記事のコメント一覧取得
 */
export async function getPostsPostIdComments(params: {
  path: { postId: string }
  query: { page: number; limit: number }
}) {
  return await client.posts[':postId'].comments.$get({ param: params.path, query: params.query })
}

/**
 * POST /posts/{postId}/comments
 *
 * コメント投稿
 */
export async function postPostsPostIdComments(
  params: { path: { postId: string } },
  body: {
    content: string
    authorName: string
    authorEmail: string
    authorUrl?: string
    parentId?: string
  },
) {
  return await client.posts[':postId'].comments.$post({ param: params.path, json: body })
}

/**
 * DELETE /comments/{commentId}
 *
 * コメント削除
 */
export async function deleteCommentsCommentId(params: { path: { commentId: string } }) {
  return await client.comments[':commentId'].$delete({ param: params.path })
}

/**
 * POST /comments/{commentId}/approve
 *
 * コメント承認
 */
export async function postCommentsCommentIdApprove(params: { path: { commentId: string } }) {
  return await client.comments[':commentId'].approve.$post({ param: params.path })
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
export async function postCategories(body: {
  name: string
  slug?: string
  description?: string
  parentId?: string
}) {
  return await client.categories.$post({ json: body })
}

/**
 * GET /categories/{categoryId}
 *
 * カテゴリ詳細取得
 */
export async function getCategoriesCategoryId(params: { path: { categoryId: string } }) {
  return await client.categories[':categoryId'].$get({ param: params.path })
}

/**
 * PUT /categories/{categoryId}
 *
 * カテゴリ更新
 */
export async function putCategoriesCategoryId(
  params: { path: { categoryId: string } },
  body: { name?: string; slug?: string; description?: string; parentId?: string },
) {
  return await client.categories[':categoryId'].$put({ param: params.path, json: body })
}

/**
 * DELETE /categories/{categoryId}
 *
 * カテゴリ削除
 */
export async function deleteCategoriesCategoryId(params: { path: { categoryId: string } }) {
  return await client.categories[':categoryId'].$delete({ param: params.path })
}

/**
 * GET /tags
 *
 * タグ一覧取得
 */
export async function getTags(params: { query: { search: string } }) {
  return await client.tags.$get({ query: params.query })
}

/**
 * POST /tags
 *
 * タグ作成
 */
export async function postTags(body: { name: string; slug?: string }) {
  return await client.tags.$post({ json: body })
}

/**
 * GET /media
 *
 * メディア一覧取得
 */
export async function getMedia(params: {
  query: { page: number; limit: number; type: 'image' | 'video' | 'audio' | 'document' }
}) {
  return await client.media.$get({ query: params.query })
}

/**
 * POST /media
 *
 * メディアアップロード
 */
export async function postMedia(body: { file: string; altText?: string; caption?: string }) {
  return await client.media.$post({ json: body })
}

/**
 * GET /media/{mediaId}
 *
 * メディア詳細取得
 */
export async function getMediaMediaId(params: { path: { mediaId: string } }) {
  return await client.media[':mediaId'].$get({ param: params.path })
}

/**
 * PUT /media/{mediaId}
 *
 * メディア情報更新
 */
export async function putMediaMediaId(
  params: { path: { mediaId: string } },
  body: { altText?: string; caption?: string },
) {
  return await client.media[':mediaId'].$put({ param: params.path, json: body })
}

/**
 * DELETE /media/{mediaId}
 *
 * メディア削除
 */
export async function deleteMediaMediaId(params: { path: { mediaId: string } }) {
  return await client.media[':mediaId'].$delete({ param: params.path })
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
export async function getAuthorsAuthorId(params: { path: { authorId: string } }) {
  return await client.authors[':authorId'].$get({ param: params.path })
}
