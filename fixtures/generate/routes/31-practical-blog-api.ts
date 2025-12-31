import { createRoute, z } from '@hono/zod-openapi'

const SEOSchema = z
  .object({
    metaTitle: z.string().max(60).openapi({ type: 'string', maxLength: 60 }),
    metaDescription: z.string().max(160).openapi({ type: 'string', maxLength: 160 }),
    ogTitle: z.string().openapi({ type: 'string' }),
    ogDescription: z.string().openapi({ type: 'string' }),
    ogImage: z.url().openapi({ type: 'string', format: 'uri' }),
    canonicalUrl: z.url().openapi({ type: 'string', format: 'uri' }),
    noIndex: z.boolean().default(false).openapi({ type: 'boolean', default: false }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: {
      metaTitle: { type: 'string', maxLength: 60 },
      metaDescription: { type: 'string', maxLength: 160 },
      ogTitle: { type: 'string' },
      ogDescription: { type: 'string' },
      ogImage: { type: 'string', format: 'uri' },
      canonicalUrl: { type: 'string', format: 'uri' },
      noIndex: { type: 'boolean', default: false },
    },
  })
  .openapi('SEO')

const TagSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    name: z.string().openapi({ type: 'string' }),
    slug: z.string().openapi({ type: 'string' }),
    postCount: z.int().optional().openapi({ type: 'integer' }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'name', 'slug'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      name: { type: 'string' },
      slug: { type: 'string' },
      postCount: { type: 'integer' },
    },
  })
  .openapi('Tag')

const CategorySchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    name: z.string().openapi({ type: 'string' }),
    slug: z.string().openapi({ type: 'string' }),
    description: z.string().optional().openapi({ type: 'string' }),
    parentId: z.uuid().optional().openapi({ type: 'string', format: 'uuid' }),
    postCount: z.int().optional().openapi({ type: 'integer' }),
    createdAt: z.iso.datetime().optional().openapi({ type: 'string', format: 'date-time' }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'name', 'slug'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      name: { type: 'string' },
      slug: { type: 'string' },
      description: { type: 'string' },
      parentId: { type: 'string', format: 'uuid' },
      postCount: { type: 'integer' },
      createdAt: { type: 'string', format: 'date-time' },
    },
  })
  .openapi('Category')

const AuthorSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    name: z.string().openapi({ type: 'string' }),
    slug: z.string().optional().openapi({ type: 'string' }),
    bio: z.string().optional().openapi({ type: 'string' }),
    avatarUrl: z.url().optional().openapi({ type: 'string', format: 'uri' }),
    email: z.email().optional().openapi({ type: 'string', format: 'email' }),
    website: z.url().optional().openapi({ type: 'string', format: 'uri' }),
    socialLinks: z
      .object({
        twitter: z.string().openapi({ type: 'string' }),
        facebook: z.string().openapi({ type: 'string' }),
        instagram: z.string().openapi({ type: 'string' }),
        linkedin: z.string().openapi({ type: 'string' }),
      })
      .partial()
      .openapi({
        type: 'object',
        properties: {
          twitter: { type: 'string' },
          facebook: { type: 'string' },
          instagram: { type: 'string' },
          linkedin: { type: 'string' },
        },
      }),
    postCount: z.int().optional().openapi({ type: 'integer' }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'name'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      name: { type: 'string' },
      slug: { type: 'string' },
      bio: { type: 'string' },
      avatarUrl: { type: 'string', format: 'uri' },
      email: { type: 'string', format: 'email' },
      website: { type: 'string', format: 'uri' },
      socialLinks: {
        type: 'object',
        properties: {
          twitter: { type: 'string' },
          facebook: { type: 'string' },
          instagram: { type: 'string' },
          linkedin: { type: 'string' },
        },
      },
      postCount: { type: 'integer' },
    },
  })
  .openapi('Author')

const MediaSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    url: z.url().openapi({ type: 'string', format: 'uri' }),
    type: z
      .enum(['image', 'video', 'audio', 'document'])
      .openapi({ type: 'string', enum: ['image', 'video', 'audio', 'document'] }),
    mimeType: z.string().openapi({ type: 'string' }),
    filename: z.string().optional().openapi({ type: 'string' }),
    filesize: z
      .int()
      .optional()
      .openapi({ type: 'integer', description: 'ファイルサイズ（バイト）' }),
    width: z.int().optional().openapi({ type: 'integer', description: '画像の幅' }),
    height: z.int().optional().openapi({ type: 'integer', description: '画像の高さ' }),
    altText: z.string().optional().openapi({ type: 'string' }),
    caption: z.string().optional().openapi({ type: 'string' }),
    thumbnails: z
      .object({
        small: z.url().openapi({ type: 'string', format: 'uri' }),
        medium: z.url().openapi({ type: 'string', format: 'uri' }),
        large: z.url().openapi({ type: 'string', format: 'uri' }),
      })
      .partial()
      .openapi({
        type: 'object',
        properties: {
          small: { type: 'string', format: 'uri' },
          medium: { type: 'string', format: 'uri' },
          large: { type: 'string', format: 'uri' },
        },
      }),
    createdAt: z.iso.datetime().optional().openapi({ type: 'string', format: 'date-time' }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'url', 'type', 'mimeType'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      url: { type: 'string', format: 'uri' },
      type: { type: 'string', enum: ['image', 'video', 'audio', 'document'] },
      mimeType: { type: 'string' },
      filename: { type: 'string' },
      filesize: { type: 'integer', description: 'ファイルサイズ（バイト）' },
      width: { type: 'integer', description: '画像の幅' },
      height: { type: 'integer', description: '画像の高さ' },
      altText: { type: 'string' },
      caption: { type: 'string' },
      thumbnails: {
        type: 'object',
        properties: {
          small: { type: 'string', format: 'uri' },
          medium: { type: 'string', format: 'uri' },
          large: { type: 'string', format: 'uri' },
        },
      },
      createdAt: { type: 'string', format: 'date-time' },
    },
  })
  .openapi('Media')

const PostSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    title: z.string().openapi({ type: 'string' }),
    slug: z.string().openapi({ type: 'string' }),
    excerpt: z.string().optional().openapi({ type: 'string', description: '抜粋' }),
    content: z.string().optional().openapi({ type: 'string', description: '本文（HTML）' }),
    contentMarkdown: z
      .string()
      .optional()
      .openapi({ type: 'string', description: '本文（Markdown）' }),
    featuredImage: MediaSchema,
    status: z
      .enum(['draft', 'published', 'scheduled', 'archived'])
      .openapi({ type: 'string', enum: ['draft', 'published', 'scheduled', 'archived'] }),
    author: AuthorSchema,
    category: CategorySchema,
    tags: z
      .array(TagSchema)
      .optional()
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/Tag' } }),
    seo: SEOSchema,
    viewCount: z.int().optional().openapi({ type: 'integer' }),
    commentCount: z.int().optional().openapi({ type: 'integer' }),
    publishedAt: z.iso.datetime().optional().openapi({ type: 'string', format: 'date-time' }),
    scheduledAt: z.iso.datetime().optional().openapi({ type: 'string', format: 'date-time' }),
    createdAt: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
    updatedAt: z.iso.datetime().optional().openapi({ type: 'string', format: 'date-time' }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'title', 'slug', 'status', 'author', 'createdAt'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      title: { type: 'string' },
      slug: { type: 'string' },
      excerpt: { type: 'string', description: '抜粋' },
      content: { type: 'string', description: '本文（HTML）' },
      contentMarkdown: { type: 'string', description: '本文（Markdown）' },
      featuredImage: { $ref: '#/components/schemas/Media' },
      status: { type: 'string', enum: ['draft', 'published', 'scheduled', 'archived'] },
      author: { $ref: '#/components/schemas/Author' },
      category: { $ref: '#/components/schemas/Category' },
      tags: { type: 'array', items: { $ref: '#/components/schemas/Tag' } },
      seo: { $ref: '#/components/schemas/SEO' },
      viewCount: { type: 'integer' },
      commentCount: { type: 'integer' },
      publishedAt: { type: 'string', format: 'date-time' },
      scheduledAt: { type: 'string', format: 'date-time' },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' },
    },
  })
  .openapi('Post')

type CommentType = {
  id: string
  content: string
  authorName: string
  authorEmail?: string
  authorUrl?: string
  status: 'pending' | 'approved' | 'spam'
  parentId?: string
  replies?: CommentType[]
  createdAt: string
}

const CommentSchema: z.ZodType<CommentType> = z
  .lazy(() =>
    z
      .object({
        id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
        content: z.string().openapi({ type: 'string' }),
        authorName: z.string().openapi({ type: 'string' }),
        authorEmail: z.email().optional().openapi({ type: 'string', format: 'email' }),
        authorUrl: z.url().optional().openapi({ type: 'string', format: 'uri' }),
        status: z
          .enum(['pending', 'approved', 'spam'])
          .openapi({ type: 'string', enum: ['pending', 'approved', 'spam'] }),
        parentId: z
          .uuid()
          .optional()
          .openapi({ type: 'string', format: 'uuid', description: '返信先コメントID' }),
        replies: z
          .array(CommentSchema)
          .optional()
          .openapi({ type: 'array', items: { $ref: '#/components/schemas/Comment' } }),
        createdAt: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
      })
      .openapi({
        type: 'object',
        required: ['id', 'content', 'authorName', 'status', 'createdAt'],
        properties: {
          id: { type: 'string', format: 'uuid' },
          content: { type: 'string' },
          authorName: { type: 'string' },
          authorEmail: { type: 'string', format: 'email' },
          authorUrl: { type: 'string', format: 'uri' },
          status: { type: 'string', enum: ['pending', 'approved', 'spam'] },
          parentId: { type: 'string', format: 'uuid', description: '返信先コメントID' },
          replies: { type: 'array', items: { $ref: '#/components/schemas/Comment' } },
          createdAt: { type: 'string', format: 'date-time' },
        },
      }),
  )
  .openapi('Comment')

const CreatePostRequestSchema = z
  .object({
    title: z.string().min(1).max(200).openapi({ type: 'string', minLength: 1, maxLength: 200 }),
    slug: z
      .string()
      .regex(/^[a-z0-9-]+$/)
      .optional()
      .openapi({ type: 'string', pattern: '^[a-z0-9-]+$' }),
    excerpt: z.string().max(300).optional().openapi({ type: 'string', maxLength: 300 }),
    content: z.string().optional().openapi({ type: 'string' }),
    contentMarkdown: z.string().optional().openapi({ type: 'string' }),
    featuredImageId: z.uuid().optional().openapi({ type: 'string', format: 'uuid' }),
    categoryId: z.uuid().optional().openapi({ type: 'string', format: 'uuid' }),
    tagIds: z
      .array(z.uuid().optional().openapi({ type: 'string', format: 'uuid' }))
      .optional()
      .openapi({ type: 'array', items: { type: 'string', format: 'uuid' } }),
    seo: SEOSchema,
    status: z
      .enum(['draft', 'published'])
      .default('draft')
      .optional()
      .openapi({ type: 'string', enum: ['draft', 'published'], default: 'draft' }),
  })
  .openapi({
    type: 'object',
    required: ['title'],
    properties: {
      title: { type: 'string', minLength: 1, maxLength: 200 },
      slug: { type: 'string', pattern: '^[a-z0-9-]+$' },
      excerpt: { type: 'string', maxLength: 300 },
      content: { type: 'string' },
      contentMarkdown: { type: 'string' },
      featuredImageId: { type: 'string', format: 'uuid' },
      categoryId: { type: 'string', format: 'uuid' },
      tagIds: { type: 'array', items: { type: 'string', format: 'uuid' } },
      seo: { $ref: '#/components/schemas/SEO' },
      status: { type: 'string', enum: ['draft', 'published'], default: 'draft' },
    },
  })
  .openapi('CreatePostRequest')

const UpdatePostRequestSchema = z
  .object({
    title: z
      .string()
      .min(1)
      .max(200)
      .optional()
      .openapi({ type: 'string', minLength: 1, maxLength: 200 }),
    slug: z
      .string()
      .regex(/^[a-z0-9-]+$/)
      .optional()
      .openapi({ type: 'string', pattern: '^[a-z0-9-]+$' }),
    excerpt: z.string().max(300).optional().openapi({ type: 'string', maxLength: 300 }),
    content: z.string().optional().openapi({ type: 'string' }),
    contentMarkdown: z.string().optional().openapi({ type: 'string' }),
    featuredImageId: z.uuid().optional().openapi({ type: 'string', format: 'uuid' }),
    categoryId: z.uuid().optional().openapi({ type: 'string', format: 'uuid' }),
    tagIds: z
      .array(z.uuid().optional().openapi({ type: 'string', format: 'uuid' }))
      .optional()
      .openapi({ type: 'array', items: { type: 'string', format: 'uuid' } }),
    seo: SEOSchema,
  })
  .openapi({
    type: 'object',
    properties: {
      title: { type: 'string', minLength: 1, maxLength: 200 },
      slug: { type: 'string', pattern: '^[a-z0-9-]+$' },
      excerpt: { type: 'string', maxLength: 300 },
      content: { type: 'string' },
      contentMarkdown: { type: 'string' },
      featuredImageId: { type: 'string', format: 'uuid' },
      categoryId: { type: 'string', format: 'uuid' },
      tagIds: { type: 'array', items: { type: 'string', format: 'uuid' } },
      seo: { $ref: '#/components/schemas/SEO' },
    },
  })
  .openapi('UpdatePostRequest')

const CreateCommentRequestSchema = z
  .object({
    content: z.string().min(1).max(2000).openapi({ type: 'string', minLength: 1, maxLength: 2000 }),
    authorName: z
      .string()
      .min(1)
      .max(100)
      .openapi({ type: 'string', minLength: 1, maxLength: 100 }),
    authorEmail: z.email().openapi({ type: 'string', format: 'email' }),
    authorUrl: z.url().optional().openapi({ type: 'string', format: 'uri' }),
    parentId: z.uuid().optional().openapi({ type: 'string', format: 'uuid' }),
  })
  .openapi({
    type: 'object',
    required: ['content', 'authorName', 'authorEmail'],
    properties: {
      content: { type: 'string', minLength: 1, maxLength: 2000 },
      authorName: { type: 'string', minLength: 1, maxLength: 100 },
      authorEmail: { type: 'string', format: 'email' },
      authorUrl: { type: 'string', format: 'uri' },
      parentId: { type: 'string', format: 'uuid' },
    },
  })
  .openapi('CreateCommentRequest')

const CreateCategoryRequestSchema = z
  .object({
    name: z.string().min(1).max(100).openapi({ type: 'string', minLength: 1, maxLength: 100 }),
    slug: z
      .string()
      .regex(/^[a-z0-9-]+$/)
      .optional()
      .openapi({ type: 'string', pattern: '^[a-z0-9-]+$' }),
    description: z.string().optional().openapi({ type: 'string' }),
    parentId: z.uuid().optional().openapi({ type: 'string', format: 'uuid' }),
  })
  .openapi({
    type: 'object',
    required: ['name'],
    properties: {
      name: { type: 'string', minLength: 1, maxLength: 100 },
      slug: { type: 'string', pattern: '^[a-z0-9-]+$' },
      description: { type: 'string' },
      parentId: { type: 'string', format: 'uuid' },
    },
  })
  .openapi('CreateCategoryRequest')

const UpdateCategoryRequestSchema = z
  .object({
    name: z.string().min(1).max(100).openapi({ type: 'string', minLength: 1, maxLength: 100 }),
    slug: z
      .string()
      .regex(/^[a-z0-9-]+$/)
      .openapi({ type: 'string', pattern: '^[a-z0-9-]+$' }),
    description: z.string().openapi({ type: 'string' }),
    parentId: z.uuid().openapi({ type: 'string', format: 'uuid' }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: {
      name: { type: 'string', minLength: 1, maxLength: 100 },
      slug: { type: 'string', pattern: '^[a-z0-9-]+$' },
      description: { type: 'string' },
      parentId: { type: 'string', format: 'uuid' },
    },
  })
  .openapi('UpdateCategoryRequest')

const CreateTagRequestSchema = z
  .object({
    name: z.string().min(1).max(50).openapi({ type: 'string', minLength: 1, maxLength: 50 }),
    slug: z
      .string()
      .regex(/^[a-z0-9-]+$/)
      .optional()
      .openapi({ type: 'string', pattern: '^[a-z0-9-]+$' }),
  })
  .openapi({
    type: 'object',
    required: ['name'],
    properties: {
      name: { type: 'string', minLength: 1, maxLength: 50 },
      slug: { type: 'string', pattern: '^[a-z0-9-]+$' },
    },
  })
  .openapi('CreateTagRequest')

const PaginationSchema = z
  .object({
    page: z.int().openapi({ type: 'integer' }),
    limit: z.int().openapi({ type: 'integer' }),
    total: z.int().openapi({ type: 'integer' }),
    totalPages: z.int().openapi({ type: 'integer' }),
  })
  .openapi({
    type: 'object',
    required: ['page', 'limit', 'total', 'totalPages'],
    properties: {
      page: { type: 'integer' },
      limit: { type: 'integer' },
      total: { type: 'integer' },
      totalPages: { type: 'integer' },
    },
  })
  .openapi('Pagination')

const PostListResponseSchema = z
  .object({
    data: z
      .array(PostSchema)
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/Post' } }),
    pagination: PaginationSchema,
  })
  .openapi({
    type: 'object',
    required: ['data', 'pagination'],
    properties: {
      data: { type: 'array', items: { $ref: '#/components/schemas/Post' } },
      pagination: { $ref: '#/components/schemas/Pagination' },
    },
  })
  .openapi('PostListResponse')

const CommentListResponseSchema = z
  .object({
    data: z
      .array(CommentSchema)
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/Comment' } }),
    pagination: PaginationSchema,
  })
  .openapi({
    type: 'object',
    required: ['data', 'pagination'],
    properties: {
      data: { type: 'array', items: { $ref: '#/components/schemas/Comment' } },
      pagination: { $ref: '#/components/schemas/Pagination' },
    },
  })
  .openapi('CommentListResponse')

const MediaListResponseSchema = z
  .object({
    data: z
      .array(MediaSchema)
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/Media' } }),
    pagination: PaginationSchema,
  })
  .openapi({
    type: 'object',
    required: ['data', 'pagination'],
    properties: {
      data: { type: 'array', items: { $ref: '#/components/schemas/Media' } },
      pagination: { $ref: '#/components/schemas/Pagination' },
    },
  })
  .openapi('MediaListResponse')

const ErrorSchema = z
  .object({
    code: z.string().openapi({ type: 'string' }),
    message: z.string().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    required: ['code', 'message'],
    properties: { code: { type: 'string' }, message: { type: 'string' } },
  })
  .openapi('Error')

const PostIdParamParamsSchema = z
  .uuid()
  .openapi({
    param: {
      name: 'postId',
      in: 'path',
      required: true,
      schema: { type: 'string', format: 'uuid' },
    },
    type: 'string',
    format: 'uuid',
  })

const PageParamParamsSchema = z
  .int()
  .min(1)
  .default(1)
  .optional()
  .openapi({
    param: { name: 'page', in: 'query', schema: { type: 'integer', minimum: 1, default: 1 } },
    type: 'integer',
    minimum: 1,
    default: 1,
  })

const LimitParamParamsSchema = z
  .int()
  .min(1)
  .max(100)
  .default(20)
  .optional()
  .openapi({
    param: {
      name: 'limit',
      in: 'query',
      schema: { type: 'integer', minimum: 1, maximum: 100, default: 20 },
    },
    type: 'integer',
    minimum: 1,
    maximum: 100,
    default: 20,
  })

const BearerAuthSecurityScheme = { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }

const BadRequestResponse = {
  description: 'リクエストが不正です',
  content: { 'application/json': { schema: ErrorSchema } },
}

const UnauthorizedResponse = {
  description: '認証が必要です',
  content: { 'application/json': { schema: ErrorSchema } },
}

const NotFoundResponse = {
  description: 'リソースが見つかりません',
  content: { 'application/json': { schema: ErrorSchema } },
}

export const getPostsRoute = createRoute({
  method: 'get',
  path: '/posts',
  tags: ['Posts'],
  summary: '記事一覧取得',
  operationId: 'listPosts',
  request: {
    query: z.object({
      page: PageParamParamsSchema,
      limit: LimitParamParamsSchema,
      status: z
        .enum(['draft', 'published', 'scheduled', 'archived'])
        .optional()
        .openapi({
          param: {
            name: 'status',
            in: 'query',
            description: 'ステータスでフィルタ',
            schema: { type: 'string', enum: ['draft', 'published', 'scheduled', 'archived'] },
          },
          type: 'string',
          enum: ['draft', 'published', 'scheduled', 'archived'],
        }),
      category: z
        .string()
        .optional()
        .openapi({
          param: {
            name: 'category',
            in: 'query',
            description: 'カテゴリスラッグでフィルタ',
            schema: { type: 'string' },
          },
          type: 'string',
        }),
      tag: z
        .string()
        .optional()
        .openapi({
          param: {
            name: 'tag',
            in: 'query',
            description: 'タグスラッグでフィルタ',
            schema: { type: 'string' },
          },
          type: 'string',
        }),
      author: z
        .uuid()
        .optional()
        .openapi({
          param: {
            name: 'author',
            in: 'query',
            description: '著者IDでフィルタ',
            schema: { type: 'string', format: 'uuid' },
          },
          type: 'string',
          format: 'uuid',
        }),
      search: z
        .string()
        .optional()
        .openapi({
          param: {
            name: 'search',
            in: 'query',
            description: 'タイトル・本文を検索',
            schema: { type: 'string' },
          },
          type: 'string',
        }),
      sort: z
        .enum(['publishedAt:desc', 'publishedAt:asc', 'title:asc', 'title:desc', 'viewCount:desc'])
        .default('publishedAt:desc')
        .optional()
        .openapi({
          param: {
            name: 'sort',
            in: 'query',
            schema: {
              type: 'string',
              enum: [
                'publishedAt:desc',
                'publishedAt:asc',
                'title:asc',
                'title:desc',
                'viewCount:desc',
              ],
              default: 'publishedAt:desc',
            },
          },
          type: 'string',
          enum: [
            'publishedAt:desc',
            'publishedAt:asc',
            'title:asc',
            'title:desc',
            'viewCount:desc',
          ],
          default: 'publishedAt:desc',
        }),
    }),
  },
  responses: {
    200: {
      description: '記事一覧',
      content: { 'application/json': { schema: PostListResponseSchema } },
    },
  },
})

export const postPostsRoute = createRoute({
  method: 'post',
  path: '/posts',
  tags: ['Posts'],
  summary: '記事作成',
  operationId: 'createPost',
  request: {
    body: { content: { 'application/json': { schema: CreatePostRequestSchema } }, required: true },
  },
  responses: {
    201: { description: '作成成功', content: { 'application/json': { schema: PostSchema } } },
    400: BadRequestResponse,
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getPostsPostIdRoute = createRoute({
  method: 'get',
  path: '/posts/{postId}',
  tags: ['Posts'],
  summary: '記事詳細取得',
  operationId: 'getPost',
  request: { params: z.object({ postId: PostIdParamParamsSchema }) },
  responses: {
    200: { description: '記事詳細', content: { 'application/json': { schema: PostSchema } } },
    404: NotFoundResponse,
  },
})

export const putPostsPostIdRoute = createRoute({
  method: 'put',
  path: '/posts/{postId}',
  tags: ['Posts'],
  summary: '記事更新',
  operationId: 'updatePost',
  request: {
    body: { content: { 'application/json': { schema: UpdatePostRequestSchema } }, required: true },
  },
  responses: {
    200: { description: '更新成功', content: { 'application/json': { schema: PostSchema } } },
    401: UnauthorizedResponse,
    404: NotFoundResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const deletePostsPostIdRoute = createRoute({
  method: 'delete',
  path: '/posts/{postId}',
  tags: ['Posts'],
  summary: '記事削除',
  operationId: 'deletePost',
  request: { params: z.object({ postId: PostIdParamParamsSchema }) },
  responses: { 204: { description: '削除成功' }, 401: UnauthorizedResponse, 404: NotFoundResponse },
  security: [{ bearerAuth: [] }],
})

export const getPostsSlugSlugRoute = createRoute({
  method: 'get',
  path: '/posts/slug/{slug}',
  tags: ['Posts'],
  summary: 'スラッグで記事取得',
  operationId: 'getPostBySlug',
  request: {
    params: z.object({
      slug: z
        .string()
        .openapi({
          param: {
            name: 'slug',
            in: 'path',
            required: true,
            description: '記事スラッグ',
            schema: { type: 'string' },
          },
          type: 'string',
        }),
    }),
  },
  responses: {
    200: { description: '記事詳細', content: { 'application/json': { schema: PostSchema } } },
    404: NotFoundResponse,
  },
})

export const postPostsPostIdPublishRoute = createRoute({
  method: 'post',
  path: '/posts/{postId}/publish',
  tags: ['Posts'],
  summary: '記事公開',
  operationId: 'publishPost',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .object({
              scheduledAt: z.iso
                .datetime()
                .openapi({
                  type: 'string',
                  format: 'date-time',
                  description: '予約公開日時（指定しない場合は即時公開）',
                }),
            })
            .partial()
            .openapi({
              type: 'object',
              properties: {
                scheduledAt: {
                  type: 'string',
                  format: 'date-time',
                  description: '予約公開日時（指定しない場合は即時公開）',
                },
              },
            }),
        },
      },
    },
  },
  responses: {
    200: { description: '公開成功', content: { 'application/json': { schema: PostSchema } } },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const postPostsPostIdUnpublishRoute = createRoute({
  method: 'post',
  path: '/posts/{postId}/unpublish',
  tags: ['Posts'],
  summary: '記事非公開化',
  operationId: 'unpublishPost',
  request: { params: z.object({ postId: PostIdParamParamsSchema }) },
  responses: {
    200: { description: '非公開化成功', content: { 'application/json': { schema: PostSchema } } },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getPostsPostIdCommentsRoute = createRoute({
  method: 'get',
  path: '/posts/{postId}/comments',
  tags: ['Comments'],
  summary: '記事のコメント一覧取得',
  operationId: 'listPostComments',
  request: {
    params: z.object({ postId: PostIdParamParamsSchema }),
    query: z.object({ page: PageParamParamsSchema, limit: LimitParamParamsSchema }),
  },
  responses: {
    200: {
      description: 'コメント一覧',
      content: { 'application/json': { schema: CommentListResponseSchema } },
    },
  },
})

export const postPostsPostIdCommentsRoute = createRoute({
  method: 'post',
  path: '/posts/{postId}/comments',
  tags: ['Comments'],
  summary: 'コメント投稿',
  operationId: 'createComment',
  request: {
    body: {
      content: { 'application/json': { schema: CreateCommentRequestSchema } },
      required: true,
    },
  },
  responses: {
    201: { description: '投稿成功', content: { 'application/json': { schema: CommentSchema } } },
    400: BadRequestResponse,
  },
})

export const deleteCommentsCommentIdRoute = createRoute({
  method: 'delete',
  path: '/comments/{commentId}',
  tags: ['Comments'],
  summary: 'コメント削除',
  operationId: 'deleteComment',
  request: {
    params: z.object({
      commentId: z
        .uuid()
        .openapi({
          param: {
            name: 'commentId',
            in: 'path',
            required: true,
            schema: { type: 'string', format: 'uuid' },
          },
          type: 'string',
          format: 'uuid',
        }),
    }),
  },
  responses: { 204: { description: '削除成功' }, 401: UnauthorizedResponse, 404: NotFoundResponse },
  security: [{ bearerAuth: [] }],
})

export const postCommentsCommentIdApproveRoute = createRoute({
  method: 'post',
  path: '/comments/{commentId}/approve',
  tags: ['Comments'],
  summary: 'コメント承認',
  operationId: 'approveComment',
  request: {
    params: z.object({
      commentId: z
        .uuid()
        .openapi({
          param: {
            name: 'commentId',
            in: 'path',
            required: true,
            schema: { type: 'string', format: 'uuid' },
          },
          type: 'string',
          format: 'uuid',
        }),
    }),
  },
  responses: {
    200: { description: '承認成功', content: { 'application/json': { schema: CommentSchema } } },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getCategoriesRoute = createRoute({
  method: 'get',
  path: '/categories',
  tags: ['Categories'],
  summary: 'カテゴリ一覧取得',
  operationId: 'listCategories',
  responses: {
    200: {
      description: 'カテゴリ一覧',
      content: {
        'application/json': {
          schema: z
            .array(CategorySchema)
            .optional()
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/Category' } }),
        },
      },
    },
  },
})

export const postCategoriesRoute = createRoute({
  method: 'post',
  path: '/categories',
  tags: ['Categories'],
  summary: 'カテゴリ作成',
  operationId: 'createCategory',
  request: {
    body: {
      content: { 'application/json': { schema: CreateCategoryRequestSchema } },
      required: true,
    },
  },
  responses: {
    201: { description: '作成成功', content: { 'application/json': { schema: CategorySchema } } },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getCategoriesCategoryIdRoute = createRoute({
  method: 'get',
  path: '/categories/{categoryId}',
  tags: ['Categories'],
  summary: 'カテゴリ詳細取得',
  operationId: 'getCategory',
  request: {
    params: z.object({
      categoryId: z
        .uuid()
        .openapi({
          param: {
            name: 'categoryId',
            in: 'path',
            required: true,
            schema: { type: 'string', format: 'uuid' },
          },
          type: 'string',
          format: 'uuid',
        }),
    }),
  },
  responses: {
    200: {
      description: 'カテゴリ詳細',
      content: { 'application/json': { schema: CategorySchema } },
    },
    404: NotFoundResponse,
  },
})

export const putCategoriesCategoryIdRoute = createRoute({
  method: 'put',
  path: '/categories/{categoryId}',
  tags: ['Categories'],
  summary: 'カテゴリ更新',
  operationId: 'updateCategory',
  request: {
    body: {
      content: { 'application/json': { schema: UpdateCategoryRequestSchema } },
      required: true,
    },
  },
  responses: {
    200: { description: '更新成功', content: { 'application/json': { schema: CategorySchema } } },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const deleteCategoriesCategoryIdRoute = createRoute({
  method: 'delete',
  path: '/categories/{categoryId}',
  tags: ['Categories'],
  summary: 'カテゴリ削除',
  operationId: 'deleteCategory',
  request: {
    params: z.object({
      categoryId: z
        .uuid()
        .openapi({
          param: {
            name: 'categoryId',
            in: 'path',
            required: true,
            schema: { type: 'string', format: 'uuid' },
          },
          type: 'string',
          format: 'uuid',
        }),
    }),
  },
  responses: { 204: { description: '削除成功' }, 401: UnauthorizedResponse },
  security: [{ bearerAuth: [] }],
})

export const getTagsRoute = createRoute({
  method: 'get',
  path: '/tags',
  tags: ['Tags'],
  summary: 'タグ一覧取得',
  operationId: 'listTags',
  request: {
    query: z.object({
      search: z
        .string()
        .optional()
        .openapi({
          param: { name: 'search', in: 'query', schema: { type: 'string' } },
          type: 'string',
        }),
    }),
  },
  responses: {
    200: {
      description: 'タグ一覧',
      content: {
        'application/json': {
          schema: z
            .array(TagSchema)
            .optional()
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/Tag' } }),
        },
      },
    },
  },
})

export const postTagsRoute = createRoute({
  method: 'post',
  path: '/tags',
  tags: ['Tags'],
  summary: 'タグ作成',
  operationId: 'createTag',
  request: {
    body: { content: { 'application/json': { schema: CreateTagRequestSchema } }, required: true },
  },
  responses: {
    201: { description: '作成成功', content: { 'application/json': { schema: TagSchema } } },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getMediaRoute = createRoute({
  method: 'get',
  path: '/media',
  tags: ['Media'],
  summary: 'メディア一覧取得',
  operationId: 'listMedia',
  request: {
    query: z.object({
      page: PageParamParamsSchema,
      limit: LimitParamParamsSchema,
      type: z
        .enum(['image', 'video', 'audio', 'document'])
        .optional()
        .openapi({
          param: {
            name: 'type',
            in: 'query',
            description: 'メディアタイプでフィルタ',
            schema: { type: 'string', enum: ['image', 'video', 'audio', 'document'] },
          },
          type: 'string',
          enum: ['image', 'video', 'audio', 'document'],
        }),
    }),
  },
  responses: {
    200: {
      description: 'メディア一覧',
      content: { 'application/json': { schema: MediaListResponseSchema } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const postMediaRoute = createRoute({
  method: 'post',
  path: '/media',
  tags: ['Media'],
  summary: 'メディアアップロード',
  operationId: 'uploadMedia',
  request: {
    body: {
      content: {
        'multipart/form-data': {
          schema: z
            .object({
              file: z.file().openapi({ type: 'string', format: 'binary' }),
              altText: z.string().optional().openapi({ type: 'string' }),
              caption: z.string().optional().openapi({ type: 'string' }),
            })
            .openapi({
              type: 'object',
              required: ['file'],
              properties: {
                file: { type: 'string', format: 'binary' },
                altText: { type: 'string' },
                caption: { type: 'string' },
              },
            }),
        },
      },
      required: true,
    },
  },
  responses: {
    201: {
      description: 'アップロード成功',
      content: { 'application/json': { schema: MediaSchema } },
    },
    400: BadRequestResponse,
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getMediaMediaIdRoute = createRoute({
  method: 'get',
  path: '/media/{mediaId}',
  tags: ['Media'],
  summary: 'メディア詳細取得',
  operationId: 'getMedia',
  request: {
    params: z.object({
      mediaId: z
        .uuid()
        .openapi({
          param: {
            name: 'mediaId',
            in: 'path',
            required: true,
            schema: { type: 'string', format: 'uuid' },
          },
          type: 'string',
          format: 'uuid',
        }),
    }),
  },
  responses: {
    200: { description: 'メディア詳細', content: { 'application/json': { schema: MediaSchema } } },
    401: UnauthorizedResponse,
    404: NotFoundResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const putMediaMediaIdRoute = createRoute({
  method: 'put',
  path: '/media/{mediaId}',
  tags: ['Media'],
  summary: 'メディア情報更新',
  operationId: 'updateMedia',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .object({
              altText: z.string().openapi({ type: 'string' }),
              caption: z.string().openapi({ type: 'string' }),
            })
            .partial()
            .openapi({
              type: 'object',
              properties: { altText: { type: 'string' }, caption: { type: 'string' } },
            }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: { description: '更新成功', content: { 'application/json': { schema: MediaSchema } } },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const deleteMediaMediaIdRoute = createRoute({
  method: 'delete',
  path: '/media/{mediaId}',
  tags: ['Media'],
  summary: 'メディア削除',
  operationId: 'deleteMedia',
  request: {
    params: z.object({
      mediaId: z
        .uuid()
        .openapi({
          param: {
            name: 'mediaId',
            in: 'path',
            required: true,
            schema: { type: 'string', format: 'uuid' },
          },
          type: 'string',
          format: 'uuid',
        }),
    }),
  },
  responses: { 204: { description: '削除成功' }, 401: UnauthorizedResponse },
  security: [{ bearerAuth: [] }],
})

export const getAuthorsRoute = createRoute({
  method: 'get',
  path: '/authors',
  tags: ['Authors'],
  summary: '著者一覧取得',
  operationId: 'listAuthors',
  responses: {
    200: {
      description: '著者一覧',
      content: {
        'application/json': {
          schema: z
            .array(AuthorSchema)
            .optional()
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/Author' } }),
        },
      },
    },
  },
})

export const getAuthorsAuthorIdRoute = createRoute({
  method: 'get',
  path: '/authors/{authorId}',
  tags: ['Authors'],
  summary: '著者詳細取得',
  operationId: 'getAuthor',
  request: {
    params: z.object({
      authorId: z
        .uuid()
        .openapi({
          param: {
            name: 'authorId',
            in: 'path',
            required: true,
            schema: { type: 'string', format: 'uuid' },
          },
          type: 'string',
          format: 'uuid',
        }),
    }),
  },
  responses: {
    200: { description: '著者詳細', content: { 'application/json': { schema: AuthorSchema } } },
    404: NotFoundResponse,
  },
})
