import { client } from '../clients/31-practical-blog-api'

/**
 * GET /posts
 *
 * 記事一覧取得
 */
export async function getPosts(arg: {
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
}) {
  return await client.posts.$get(arg)
}

/**
 * POST /posts
 *
 * 記事作成
 */
export async function postPosts(arg: {
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
}) {
  return await client.posts.$post(arg)
}

/**
 * GET /posts/{postId}
 *
 * 記事詳細取得
 */
export async function getPostsPostId(arg: { param: { postId: string } }) {
  return await client['posts'][':postId']['$get'](arg)
}

/**
 * PUT /posts/{postId}
 *
 * 記事更新
 */
export async function putPostsPostId(arg: {
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
}) {
  return await client['posts'][':postId']['$put'](arg)
}

/**
 * DELETE /posts/{postId}
 *
 * 記事削除
 */
export async function deletePostsPostId(arg: { param: { postId: string } }) {
  return await client['posts'][':postId']['$delete'](arg)
}

/**
 * GET /posts/slug/{slug}
 *
 * スラッグで記事取得
 */
export async function getPostsSlugSlug(arg: { param: { slug: string } }) {
  return await client['posts']['slug'][':slug']['$get'](arg)
}

/**
 * POST /posts/{postId}/publish
 *
 * 記事公開
 */
export async function postPostsPostIdPublish(arg: {
  param: { postId: string }
  json: { scheduledAt?: string }
}) {
  return await client['posts'][':postId']['publish']['$post'](arg)
}

/**
 * POST /posts/{postId}/unpublish
 *
 * 記事非公開化
 */
export async function postPostsPostIdUnpublish(arg: { param: { postId: string } }) {
  return await client['posts'][':postId']['unpublish']['$post'](arg)
}

/**
 * GET /posts/{postId}/comments
 *
 * 記事のコメント一覧取得
 */
export async function getPostsPostIdComments(arg: {
  param: { postId: string }
  query: { page?: number; limit?: number }
}) {
  return await client['posts'][':postId']['comments']['$get'](arg)
}

/**
 * POST /posts/{postId}/comments
 *
 * コメント投稿
 */
export async function postPostsPostIdComments(arg: {
  param: { postId: string }
  json: {
    content: string
    authorName: string
    authorEmail: string
    authorUrl?: string
    parentId?: string
  }
}) {
  return await client['posts'][':postId']['comments']['$post'](arg)
}

/**
 * DELETE /comments/{commentId}
 *
 * コメント削除
 */
export async function deleteCommentsCommentId(arg: { param: { commentId: string } }) {
  return await client['comments'][':commentId']['$delete'](arg)
}

/**
 * POST /comments/{commentId}/approve
 *
 * コメント承認
 */
export async function postCommentsCommentIdApprove(arg: { param: { commentId: string } }) {
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
export async function postCategories(arg: {
  json: { name: string; slug?: string; description?: string; parentId?: string }
}) {
  return await client.categories.$post(arg)
}

/**
 * GET /categories/{categoryId}
 *
 * カテゴリ詳細取得
 */
export async function getCategoriesCategoryId(arg: { param: { categoryId: string } }) {
  return await client['categories'][':categoryId']['$get'](arg)
}

/**
 * PUT /categories/{categoryId}
 *
 * カテゴリ更新
 */
export async function putCategoriesCategoryId(arg: {
  param: { categoryId: string }
  json: { name?: string; slug?: string; description?: string; parentId?: string }
}) {
  return await client['categories'][':categoryId']['$put'](arg)
}

/**
 * DELETE /categories/{categoryId}
 *
 * カテゴリ削除
 */
export async function deleteCategoriesCategoryId(arg: { param: { categoryId: string } }) {
  return await client['categories'][':categoryId']['$delete'](arg)
}

/**
 * GET /tags
 *
 * タグ一覧取得
 */
export async function getTags(arg: { query: { search?: string } }) {
  return await client.tags.$get(arg)
}

/**
 * POST /tags
 *
 * タグ作成
 */
export async function postTags(arg: { json: { name: string; slug?: string } }) {
  return await client.tags.$post(arg)
}

/**
 * GET /media
 *
 * メディア一覧取得
 */
export async function getMedia(arg: {
  query: { page?: number; limit?: number; type?: 'image' | 'video' | 'audio' | 'document' }
}) {
  return await client.media.$get(arg)
}

/**
 * POST /media
 *
 * メディアアップロード
 */
export async function postMedia(arg: { form: { file: File; altText?: string; caption?: string } }) {
  return await client.media.$post(arg)
}

/**
 * GET /media/{mediaId}
 *
 * メディア詳細取得
 */
export async function getMediaMediaId(arg: { param: { mediaId: string } }) {
  return await client['media'][':mediaId']['$get'](arg)
}

/**
 * PUT /media/{mediaId}
 *
 * メディア情報更新
 */
export async function putMediaMediaId(arg: {
  param: { mediaId: string }
  json: { altText?: string; caption?: string }
}) {
  return await client['media'][':mediaId']['$put'](arg)
}

/**
 * DELETE /media/{mediaId}
 *
 * メディア削除
 */
export async function deleteMediaMediaId(arg: { param: { mediaId: string } }) {
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
export async function getAuthorsAuthorId(arg: { param: { authorId: string } }) {
  return await client['authors'][':authorId']['$get'](arg)
}
