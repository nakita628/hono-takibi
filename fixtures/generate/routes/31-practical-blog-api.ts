import { createRoute, z } from '@hono/zod-openapi'

const MediaSchema = z
  .object({
    id: z.uuid(),
    url: z.url(),
    type: z.enum(['image', 'video', 'audio', 'document']),
    mimeType: z.string(),
    filename: z.string().exactOptional(),
    filesize: z.int().exactOptional().openapi({ description: 'ファイルサイズ（バイト）' }),
    width: z.int().exactOptional().openapi({ description: '画像の幅' }),
    height: z.int().exactOptional().openapi({ description: '画像の高さ' }),
    altText: z.string().exactOptional(),
    caption: z.string().exactOptional(),
    thumbnails: z
      .object({
        small: z.url().exactOptional(),
        medium: z.url().exactOptional(),
        large: z.url().exactOptional(),
      })
      .exactOptional(),
    createdAt: z.iso.datetime().exactOptional(),
  })
  .openapi({ required: ['id', 'url', 'type', 'mimeType'] })
  .openapi('Media')

const AuthorSchema = z
  .object({
    id: z.uuid(),
    name: z.string(),
    slug: z.string().exactOptional(),
    bio: z.string().exactOptional(),
    avatarUrl: z.url().exactOptional(),
    email: z.email().exactOptional(),
    website: z.url().exactOptional(),
    socialLinks: z
      .object({
        twitter: z.string().exactOptional(),
        facebook: z.string().exactOptional(),
        instagram: z.string().exactOptional(),
        linkedin: z.string().exactOptional(),
      })
      .exactOptional(),
    postCount: z.int().exactOptional(),
  })
  .openapi({ required: ['id', 'name'] })
  .openapi('Author')

const CategorySchema = z
  .object({
    id: z.uuid(),
    name: z.string(),
    slug: z.string(),
    description: z.string().exactOptional(),
    parentId: z.uuid().exactOptional(),
    postCount: z.int().exactOptional(),
    createdAt: z.iso.datetime().exactOptional(),
  })
  .openapi({ required: ['id', 'name', 'slug'] })
  .openapi('Category')

const TagSchema = z
  .object({ id: z.uuid(), name: z.string(), slug: z.string(), postCount: z.int().exactOptional() })
  .openapi({ required: ['id', 'name', 'slug'] })
  .openapi('Tag')

const SEOSchema = z
  .object({
    metaTitle: z.string().max(60).exactOptional(),
    metaDescription: z.string().max(160).exactOptional(),
    ogTitle: z.string().exactOptional(),
    ogDescription: z.string().exactOptional(),
    ogImage: z.url().exactOptional(),
    canonicalUrl: z.url().exactOptional(),
    noIndex: z.boolean().default(false).exactOptional(),
  })
  .openapi('SEO')

const PostSchema = z
  .object({
    id: z.uuid(),
    title: z.string(),
    slug: z.string(),
    excerpt: z.string().exactOptional().openapi({ description: '抜粋' }),
    content: z.string().exactOptional().openapi({ description: '本文（HTML）' }),
    contentMarkdown: z.string().exactOptional().openapi({ description: '本文（Markdown）' }),
    featuredImage: MediaSchema.exactOptional(),
    status: z.enum(['draft', 'published', 'scheduled', 'archived']),
    author: AuthorSchema,
    category: CategorySchema.exactOptional(),
    tags: z.array(TagSchema).exactOptional(),
    seo: SEOSchema.exactOptional(),
    viewCount: z.int().exactOptional(),
    commentCount: z.int().exactOptional(),
    publishedAt: z.iso.datetime().exactOptional(),
    scheduledAt: z.iso.datetime().exactOptional(),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime().exactOptional(),
  })
  .openapi({ required: ['id', 'title', 'slug', 'status', 'author', 'createdAt'] })
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
        id: z.uuid(),
        content: z.string(),
        authorName: z.string(),
        authorEmail: z.email().exactOptional(),
        authorUrl: z.url().exactOptional(),
        status: z.enum(['pending', 'approved', 'spam']),
        parentId: z.uuid().exactOptional().openapi({ description: '返信先コメントID' }),
        replies: z.array(CommentSchema).exactOptional(),
        createdAt: z.iso.datetime(),
      })
      .openapi({ required: ['id', 'content', 'authorName', 'status', 'createdAt'] }),
  )
  .openapi('Comment')

const CreatePostRequestSchema = z
  .object({
    title: z.string().min(1).max(200),
    slug: z
      .string()
      .regex(/^[a-z0-9-]+$/)
      .exactOptional(),
    excerpt: z.string().max(300).exactOptional(),
    content: z.string().exactOptional(),
    contentMarkdown: z.string().exactOptional(),
    featuredImageId: z.uuid().exactOptional(),
    categoryId: z.uuid().exactOptional(),
    tagIds: z.array(z.uuid()).exactOptional(),
    seo: SEOSchema.exactOptional(),
    status: z.enum(['draft', 'published']).default('draft').exactOptional(),
  })
  .openapi({ required: ['title'] })
  .openapi('CreatePostRequest')

const UpdatePostRequestSchema = z
  .object({
    title: z.string().min(1).max(200).exactOptional(),
    slug: z
      .string()
      .regex(/^[a-z0-9-]+$/)
      .exactOptional(),
    excerpt: z.string().max(300).exactOptional(),
    content: z.string().exactOptional(),
    contentMarkdown: z.string().exactOptional(),
    featuredImageId: z.uuid().exactOptional(),
    categoryId: z.uuid().exactOptional(),
    tagIds: z.array(z.uuid()).exactOptional(),
    seo: SEOSchema.exactOptional(),
  })
  .openapi('UpdatePostRequest')

const CreateCommentRequestSchema = z
  .object({
    content: z.string().min(1).max(2000),
    authorName: z.string().min(1).max(100),
    authorEmail: z.email(),
    authorUrl: z.url().exactOptional(),
    parentId: z.uuid().exactOptional(),
  })
  .openapi({ required: ['content', 'authorName', 'authorEmail'] })
  .openapi('CreateCommentRequest')

const CreateCategoryRequestSchema = z
  .object({
    name: z.string().min(1).max(100),
    slug: z
      .string()
      .regex(/^[a-z0-9-]+$/)
      .exactOptional(),
    description: z.string().exactOptional(),
    parentId: z.uuid().exactOptional(),
  })
  .openapi({ required: ['name'] })
  .openapi('CreateCategoryRequest')

const UpdateCategoryRequestSchema = z
  .object({
    name: z.string().min(1).max(100).exactOptional(),
    slug: z
      .string()
      .regex(/^[a-z0-9-]+$/)
      .exactOptional(),
    description: z.string().exactOptional(),
    parentId: z.uuid().exactOptional(),
  })
  .openapi('UpdateCategoryRequest')

const CreateTagRequestSchema = z
  .object({
    name: z.string().min(1).max(50),
    slug: z
      .string()
      .regex(/^[a-z0-9-]+$/)
      .exactOptional(),
  })
  .openapi({ required: ['name'] })
  .openapi('CreateTagRequest')

const PaginationSchema = z
  .object({ page: z.int(), limit: z.int(), total: z.int(), totalPages: z.int() })
  .openapi({ required: ['page', 'limit', 'total', 'totalPages'] })
  .openapi('Pagination')

const PostListResponseSchema = z
  .object({ data: z.array(PostSchema), pagination: PaginationSchema })
  .openapi({ required: ['data', 'pagination'] })
  .openapi('PostListResponse')

const CommentListResponseSchema = z
  .object({ data: z.array(CommentSchema), pagination: PaginationSchema })
  .openapi({ required: ['data', 'pagination'] })
  .openapi('CommentListResponse')

const MediaListResponseSchema = z
  .object({ data: z.array(MediaSchema), pagination: PaginationSchema })
  .openapi({ required: ['data', 'pagination'] })
  .openapi('MediaListResponse')

const ErrorSchema = z
  .object({ code: z.string(), message: z.string() })
  .openapi({ required: ['code', 'message'] })
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
  })

const PageParamParamsSchema = z
  .int()
  .min(1)
  .default(1)
  .exactOptional()
  .openapi({
    param: { name: 'page', in: 'query', schema: { type: 'integer', minimum: 1, default: 1 } },
  })

const LimitParamParamsSchema = z
  .int()
  .min(1)
  .max(100)
  .default(20)
  .exactOptional()
  .openapi({
    param: {
      name: 'limit',
      in: 'query',
      schema: { type: 'integer', minimum: 1, maximum: 100, default: 20 },
    },
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
        .exactOptional()
        .openapi({
          param: {
            name: 'status',
            in: 'query',
            description: 'ステータスでフィルタ',
            schema: { type: 'string', enum: ['draft', 'published', 'scheduled', 'archived'] },
          },
        }),
      category: z
        .string()
        .exactOptional()
        .openapi({
          param: {
            name: 'category',
            in: 'query',
            description: 'カテゴリスラッグでフィルタ',
            schema: { type: 'string' },
          },
        }),
      tag: z
        .string()
        .exactOptional()
        .openapi({
          param: {
            name: 'tag',
            in: 'query',
            description: 'タグスラッグでフィルタ',
            schema: { type: 'string' },
          },
        }),
      author: z
        .uuid()
        .exactOptional()
        .openapi({
          param: {
            name: 'author',
            in: 'query',
            description: '著者IDでフィルタ',
            schema: { type: 'string', format: 'uuid' },
          },
        }),
      search: z
        .string()
        .exactOptional()
        .openapi({
          param: {
            name: 'search',
            in: 'query',
            description: 'タイトル・本文を検索',
            schema: { type: 'string' },
          },
        }),
      sort: z
        .enum(['publishedAt:desc', 'publishedAt:asc', 'title:asc', 'title:desc', 'viewCount:desc'])
        .default('publishedAt:desc')
        .exactOptional()
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
    params: z.object({ postId: PostIdParamParamsSchema }),
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
    params: z.object({ postId: PostIdParamParamsSchema }),
    body: {
      content: {
        'application/json': {
          schema: z.object({
            scheduledAt: z.iso
              .datetime()
              .exactOptional()
              .openapi({ description: '予約公開日時（指定しない場合は即時公開）' }),
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
    params: z.object({ postId: PostIdParamParamsSchema }),
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
      content: { 'application/json': { schema: z.array(CategorySchema) } },
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
        }),
    }),
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
        .exactOptional()
        .openapi({ param: { name: 'search', in: 'query', schema: { type: 'string' } } }),
    }),
  },
  responses: {
    200: {
      description: 'タグ一覧',
      content: { 'application/json': { schema: z.array(TagSchema) } },
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
        .exactOptional()
        .openapi({
          param: {
            name: 'type',
            in: 'query',
            description: 'メディアタイプでフィルタ',
            schema: { type: 'string', enum: ['image', 'video', 'audio', 'document'] },
          },
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
              file: z.file(),
              altText: z.string().exactOptional(),
              caption: z.string().exactOptional(),
            })
            .openapi({ required: ['file'] }),
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
        }),
    }),
    body: {
      content: {
        'application/json': {
          schema: z.object({
            altText: z.string().exactOptional(),
            caption: z.string().exactOptional(),
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
      content: { 'application/json': { schema: z.array(AuthorSchema) } },
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
        }),
    }),
  },
  responses: {
    200: { description: '著者詳細', content: { 'application/json': { schema: AuthorSchema } } },
    404: NotFoundResponse,
  },
})
