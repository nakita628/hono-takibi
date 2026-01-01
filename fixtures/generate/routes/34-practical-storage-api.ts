import { createRoute, z } from '@hono/zod-openapi'

const UserSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    name: z.string().openapi({ type: 'string' }),
    email: z.email().optional().openapi({ type: 'string', format: 'email' }),
    avatarUrl: z.url().optional().openapi({ type: 'string', format: 'uri' }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'name'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      name: { type: 'string' },
      email: { type: 'string', format: 'email' },
      avatarUrl: { type: 'string', format: 'uri' },
    },
  })
  .openapi('User')

const FileSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    name: z.string().openapi({ type: 'string' }),
    description: z.string().optional().openapi({ type: 'string' }),
    type: z
      .enum(['document', 'image', 'video', 'audio', 'archive', 'other'])
      .openapi({
        type: 'string',
        enum: ['document', 'image', 'video', 'audio', 'archive', 'other'],
      }),
    size: z.int().openapi({ type: 'integer', description: 'ファイルサイズ（バイト）' }),
    mimeType: z.string().openapi({ type: 'string' }),
    extension: z.string().optional().openapi({ type: 'string' }),
    folderId: z.uuid().optional().openapi({ type: 'string', format: 'uuid' }),
    path: z.string().optional().openapi({ type: 'string', description: 'フルパス' }),
    thumbnailUrl: z.url().optional().openapi({ type: 'string', format: 'uri' }),
    downloadUrl: z.url().optional().openapi({ type: 'string', format: 'uri' }),
    isShared: z.boolean().optional().openapi({ type: 'boolean' }),
    isFavorite: z.boolean().optional().openapi({ type: 'boolean' }),
    version: z.int().optional().openapi({ type: 'integer' }),
    owner: UserSchema.optional(),
    createdAt: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
    updatedAt: z.iso.datetime().optional().openapi({ type: 'string', format: 'date-time' }),
    deletedAt: z.iso.datetime().optional().openapi({ type: 'string', format: 'date-time' }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'name', 'type', 'size', 'mimeType', 'createdAt'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      name: { type: 'string' },
      description: { type: 'string' },
      type: { type: 'string', enum: ['document', 'image', 'video', 'audio', 'archive', 'other'] },
      size: { type: 'integer', description: 'ファイルサイズ（バイト）' },
      mimeType: { type: 'string' },
      extension: { type: 'string' },
      folderId: { type: 'string', format: 'uuid' },
      path: { type: 'string', description: 'フルパス' },
      thumbnailUrl: { type: 'string', format: 'uri' },
      downloadUrl: { type: 'string', format: 'uri' },
      isShared: { type: 'boolean' },
      isFavorite: { type: 'boolean' },
      version: { type: 'integer' },
      owner: { $ref: '#/components/schemas/User' },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' },
      deletedAt: { type: 'string', format: 'date-time' },
    },
  })
  .openapi('File')

const FolderSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    name: z.string().openapi({ type: 'string' }),
    color: z.string().optional().openapi({ type: 'string' }),
    parentId: z.uuid().optional().openapi({ type: 'string', format: 'uuid' }),
    path: z.string().optional().openapi({ type: 'string' }),
    fileCount: z.int().optional().openapi({ type: 'integer' }),
    folderCount: z.int().optional().openapi({ type: 'integer' }),
    size: z.int().optional().openapi({ type: 'integer', description: '総サイズ（バイト）' }),
    isShared: z.boolean().optional().openapi({ type: 'boolean' }),
    owner: UserSchema.optional(),
    createdAt: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
    updatedAt: z.iso.datetime().optional().openapi({ type: 'string', format: 'date-time' }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'name', 'createdAt'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      name: { type: 'string' },
      color: { type: 'string' },
      parentId: { type: 'string', format: 'uuid' },
      path: { type: 'string' },
      fileCount: { type: 'integer' },
      folderCount: { type: 'integer' },
      size: { type: 'integer', description: '総サイズ（バイト）' },
      isShared: { type: 'boolean' },
      owner: { $ref: '#/components/schemas/User' },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' },
    },
  })
  .openapi('Folder')

const ShareLinkSchema = z
  .object({
    url: z.url().openapi({ type: 'string', format: 'uri' }),
    password: z
      .boolean()
      .optional()
      .openapi({ type: 'boolean', description: 'パスワード保護されているか' }),
    expiresAt: z.iso.datetime().optional().openapi({ type: 'string', format: 'date-time' }),
    allowDownload: z.boolean().optional().openapi({ type: 'boolean' }),
    viewCount: z.int().optional().openapi({ type: 'integer' }),
    createdAt: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
  })
  .openapi({
    type: 'object',
    required: ['url', 'createdAt'],
    properties: {
      url: { type: 'string', format: 'uri' },
      password: { type: 'boolean', description: 'パスワード保護されているか' },
      expiresAt: { type: 'string', format: 'date-time' },
      allowDownload: { type: 'boolean' },
      viewCount: { type: 'integer' },
      createdAt: { type: 'string', format: 'date-time' },
    },
  })
  .openapi('ShareLink')

const CollaboratorSchema = z
  .object({
    user: UserSchema,
    permission: z
      .enum(['viewer', 'editor', 'owner'])
      .openapi({ type: 'string', enum: ['viewer', 'editor', 'owner'] }),
    addedAt: z.iso.datetime().optional().openapi({ type: 'string', format: 'date-time' }),
  })
  .openapi({
    type: 'object',
    required: ['user', 'permission'],
    properties: {
      user: { $ref: '#/components/schemas/User' },
      permission: { type: 'string', enum: ['viewer', 'editor', 'owner'] },
      addedAt: { type: 'string', format: 'date-time' },
    },
  })
  .openapi('Collaborator')

const ShareSettingsSchema = z
  .object({
    isPublic: z.boolean().openapi({ type: 'boolean' }),
    publicLink: ShareLinkSchema,
    collaborators: z
      .array(CollaboratorSchema)
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/Collaborator' } }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: {
      isPublic: { type: 'boolean' },
      publicLink: { $ref: '#/components/schemas/ShareLink' },
      collaborators: { type: 'array', items: { $ref: '#/components/schemas/Collaborator' } },
    },
  })
  .openapi('ShareSettings')

const ShareRequestSchema = z
  .object({
    collaborators: z
      .array(
        z
          .object({
            email: z.email().openapi({ type: 'string', format: 'email' }),
            permission: z
              .enum(['viewer', 'editor'])
              .openapi({ type: 'string', enum: ['viewer', 'editor'] }),
          })
          .openapi({
            type: 'object',
            required: ['email', 'permission'],
            properties: {
              email: { type: 'string', format: 'email' },
              permission: { type: 'string', enum: ['viewer', 'editor'] },
            },
          }),
      )
      .openapi({
        type: 'array',
        items: {
          type: 'object',
          required: ['email', 'permission'],
          properties: {
            email: { type: 'string', format: 'email' },
            permission: { type: 'string', enum: ['viewer', 'editor'] },
          },
        },
      }),
    message: z.string().openapi({ type: 'string', description: '招待メッセージ' }),
    notifyByEmail: z.boolean().default(true).openapi({ type: 'boolean', default: true }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: {
      collaborators: {
        type: 'array',
        items: {
          type: 'object',
          required: ['email', 'permission'],
          properties: {
            email: { type: 'string', format: 'email' },
            permission: { type: 'string', enum: ['viewer', 'editor'] },
          },
        },
      },
      message: { type: 'string', description: '招待メッセージ' },
      notifyByEmail: { type: 'boolean', default: true },
    },
  })
  .openapi('ShareRequest')

const FileVersionSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    version: z.int().openapi({ type: 'integer' }),
    size: z.int().openapi({ type: 'integer' }),
    modifiedBy: UserSchema.optional(),
    createdAt: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'version', 'size', 'createdAt'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      version: { type: 'integer' },
      size: { type: 'integer' },
      modifiedBy: { $ref: '#/components/schemas/User' },
      createdAt: { type: 'string', format: 'date-time' },
    },
  })
  .openapi('FileVersion')

const CreateFolderRequestSchema = z
  .object({
    name: z.string().min(1).max(255).openapi({ type: 'string', minLength: 1, maxLength: 255 }),
    parentId: z.uuid().optional().openapi({ type: 'string', format: 'uuid' }),
    color: z
      .string()
      .regex(/^#[0-9A-Fa-f]{6}$/)
      .optional()
      .openapi({ type: 'string', pattern: '^#[0-9A-Fa-f]{6}$' }),
  })
  .openapi({
    type: 'object',
    required: ['name'],
    properties: {
      name: { type: 'string', minLength: 1, maxLength: 255 },
      parentId: { type: 'string', format: 'uuid' },
      color: { type: 'string', pattern: '^#[0-9A-Fa-f]{6}$' },
    },
  })
  .openapi('CreateFolderRequest')

const StorageUsageSchema = z
  .object({
    used: z.int().openapi({ type: 'integer', description: '使用量（バイト）' }),
    total: z.int().openapi({ type: 'integer', description: '上限（バイト）' }),
    percentage: z.number().optional().openapi({ type: 'number', description: '使用率（%）' }),
    breakdown: z
      .object({
        documents: z.int().openapi({ type: 'integer' }),
        images: z.int().openapi({ type: 'integer' }),
        videos: z.int().openapi({ type: 'integer' }),
        audio: z.int().openapi({ type: 'integer' }),
        archives: z.int().openapi({ type: 'integer' }),
        other: z.int().openapi({ type: 'integer' }),
        trash: z.int().openapi({ type: 'integer' }),
      })
      .partial()
      .openapi({
        type: 'object',
        properties: {
          documents: { type: 'integer' },
          images: { type: 'integer' },
          videos: { type: 'integer' },
          audio: { type: 'integer' },
          archives: { type: 'integer' },
          other: { type: 'integer' },
          trash: { type: 'integer' },
        },
      }),
  })
  .openapi({
    type: 'object',
    required: ['used', 'total'],
    properties: {
      used: { type: 'integer', description: '使用量（バイト）' },
      total: { type: 'integer', description: '上限（バイト）' },
      percentage: { type: 'number', description: '使用率（%）' },
      breakdown: {
        type: 'object',
        properties: {
          documents: { type: 'integer' },
          images: { type: 'integer' },
          videos: { type: 'integer' },
          audio: { type: 'integer' },
          archives: { type: 'integer' },
          other: { type: 'integer' },
          trash: { type: 'integer' },
        },
      },
    },
  })
  .openapi('StorageUsage')

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

const FileListResponseSchema = z
  .object({
    data: z
      .array(
        z
          .union([FileSchema, FolderSchema])
          .openapi({
            oneOf: [{ $ref: '#/components/schemas/File' }, { $ref: '#/components/schemas/Folder' }],
          }),
      )
      .optional()
      .openapi({
        type: 'array',
        items: {
          oneOf: [{ $ref: '#/components/schemas/File' }, { $ref: '#/components/schemas/Folder' }],
        },
      }),
    pagination: PaginationSchema,
  })
  .openapi({
    type: 'object',
    required: ['data', 'pagination'],
    properties: {
      data: {
        type: 'array',
        items: {
          oneOf: [{ $ref: '#/components/schemas/File' }, { $ref: '#/components/schemas/Folder' }],
        },
      },
      pagination: { $ref: '#/components/schemas/Pagination' },
    },
  })
  .openapi('FileListResponse')

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

const FileIdParamParamsSchema = z
  .uuid()
  .openapi({
    param: {
      name: 'fileId',
      in: 'path',
      required: true,
      schema: { type: 'string', format: 'uuid' },
    },
    type: 'string',
    format: 'uuid',
  })

const FolderIdParamParamsSchema = z
  .uuid()
  .openapi({
    param: {
      name: 'folderId',
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
  .default(50)
  .optional()
  .openapi({
    param: {
      name: 'limit',
      in: 'query',
      schema: { type: 'integer', minimum: 1, maximum: 100, default: 50 },
    },
    type: 'integer',
    minimum: 1,
    maximum: 100,
    default: 50,
  })

const BearerAuthSecurityScheme = { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }

const BadRequestResponse = {
  description: 'リクエストが不正です',
  content: { 'application/json': { schema: ErrorSchema.optional() } },
}

const UnauthorizedResponse = {
  description: '認証が必要です',
  content: { 'application/json': { schema: ErrorSchema.optional() } },
}

const NotFoundResponse = {
  description: 'リソースが見つかりません',
  content: { 'application/json': { schema: ErrorSchema.optional() } },
}

export const getFilesRoute = createRoute({
  method: 'get',
  path: '/files',
  tags: ['Files'],
  summary: 'ファイル一覧取得',
  operationId: 'listFiles',
  request: {
    query: z.object({
      folderId: z
        .uuid()
        .optional()
        .openapi({
          param: {
            name: 'folderId',
            in: 'query',
            description: 'フォルダID（指定しない場合はルート）',
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
            description: 'ファイル名検索',
            schema: { type: 'string' },
          },
          type: 'string',
        }),
      type: z
        .enum(['document', 'image', 'video', 'audio', 'archive', 'other'])
        .optional()
        .openapi({
          param: {
            name: 'type',
            in: 'query',
            description: 'ファイルタイプでフィルタ',
            schema: {
              type: 'string',
              enum: ['document', 'image', 'video', 'audio', 'archive', 'other'],
            },
          },
          type: 'string',
          enum: ['document', 'image', 'video', 'audio', 'archive', 'other'],
        }),
      sort: z
        .enum(['name:asc', 'name:desc', 'size:asc', 'size:desc', 'updatedAt:desc', 'updatedAt:asc'])
        .default('name:asc')
        .optional()
        .openapi({
          param: {
            name: 'sort',
            in: 'query',
            schema: {
              type: 'string',
              enum: [
                'name:asc',
                'name:desc',
                'size:asc',
                'size:desc',
                'updatedAt:desc',
                'updatedAt:asc',
              ],
              default: 'name:asc',
            },
          },
          type: 'string',
          enum: [
            'name:asc',
            'name:desc',
            'size:asc',
            'size:desc',
            'updatedAt:desc',
            'updatedAt:asc',
          ],
          default: 'name:asc',
        }),
      page: PageParamParamsSchema,
      limit: LimitParamParamsSchema,
    }),
  },
  responses: {
    200: {
      description: 'ファイル一覧',
      content: { 'application/json': { schema: FileListResponseSchema.optional() } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const postFilesUploadRoute = createRoute({
  method: 'post',
  path: '/files/upload',
  tags: ['Files'],
  summary: 'ファイルアップロード',
  operationId: 'uploadFile',
  request: {
    body: {
      content: {
        'multipart/form-data': {
          schema: z
            .object({
              file: z.file().openapi({ type: 'string', format: 'binary' }),
              folderId: z
                .uuid()
                .optional()
                .openapi({ type: 'string', format: 'uuid', description: 'アップロード先フォルダ' }),
              name: z
                .string()
                .optional()
                .openapi({ type: 'string', description: 'ファイル名（省略時は元のファイル名）' }),
              overwrite: z
                .boolean()
                .default(false)
                .optional()
                .openapi({
                  type: 'boolean',
                  default: false,
                  description: '同名ファイルを上書きするか',
                }),
            })
            .openapi({
              type: 'object',
              required: ['file'],
              properties: {
                file: { type: 'string', format: 'binary' },
                folderId: { type: 'string', format: 'uuid', description: 'アップロード先フォルダ' },
                name: { type: 'string', description: 'ファイル名（省略時は元のファイル名）' },
                overwrite: {
                  type: 'boolean',
                  default: false,
                  description: '同名ファイルを上書きするか',
                },
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
      content: { 'application/json': { schema: FileSchema.optional() } },
    },
    400: BadRequestResponse,
    401: UnauthorizedResponse,
    409: {
      description: '同名ファイルが存在します',
      content: { 'application/json': { schema: ErrorSchema.optional() } },
    },
    413: {
      description: 'ファイルサイズが上限を超えています',
      content: { 'application/json': { schema: ErrorSchema.optional() } },
    },
  },
  security: [{ bearerAuth: [] }],
})

export const postFilesUploadMultipartInitRoute = createRoute({
  method: 'post',
  path: '/files/upload/multipart/init',
  tags: ['Files'],
  summary: 'マルチパートアップロード開始',
  description: '大容量ファイルの分割アップロードを開始します',
  operationId: 'initMultipartUpload',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .object({
              filename: z.string().openapi({ type: 'string' }),
              size: z.int().openapi({ type: 'integer', description: 'ファイルサイズ（バイト）' }),
              folderId: z.uuid().optional().openapi({ type: 'string', format: 'uuid' }),
              contentType: z.string().optional().openapi({ type: 'string' }),
            })
            .openapi({
              type: 'object',
              required: ['filename', 'size'],
              properties: {
                filename: { type: 'string' },
                size: { type: 'integer', description: 'ファイルサイズ（バイト）' },
                folderId: { type: 'string', format: 'uuid' },
                contentType: { type: 'string' },
              },
            }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: 'アップロードセッション作成',
      content: {
        'application/json': {
          schema: z
            .object({
              uploadId: z.string().openapi({ type: 'string' }),
              partSize: z.int().openapi({ type: 'integer', description: '推奨パートサイズ' }),
              partCount: z.int().openapi({ type: 'integer', description: '必要なパート数' }),
            })
            .partial()
            .openapi({
              type: 'object',
              properties: {
                uploadId: { type: 'string' },
                partSize: { type: 'integer', description: '推奨パートサイズ' },
                partCount: { type: 'integer', description: '必要なパート数' },
              },
            }),
        },
      },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const postFilesUploadMultipartUploadIdPartRoute = createRoute({
  method: 'post',
  path: '/files/upload/multipart/{uploadId}/part',
  tags: ['Files'],
  summary: 'パートアップロード',
  operationId: 'uploadPart',
  request: {
    body: {
      content: {
        'application/octet-stream': {
          schema: z.file().optional().openapi({ type: 'string', format: 'binary' }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: 'パートアップロード成功',
      content: {
        'application/json': {
          schema: z
            .object({
              partNumber: z.int().openapi({ type: 'integer' }),
              etag: z.string().openapi({ type: 'string' }),
            })
            .partial()
            .openapi({
              type: 'object',
              properties: { partNumber: { type: 'integer' }, etag: { type: 'string' } },
            }),
        },
      },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const postFilesUploadMultipartUploadIdCompleteRoute = createRoute({
  method: 'post',
  path: '/files/upload/multipart/{uploadId}/complete',
  tags: ['Files'],
  summary: 'マルチパートアップロード完了',
  operationId: 'completeMultipartUpload',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .object({
              parts: z
                .array(
                  z
                    .object({
                      partNumber: z.int().openapi({ type: 'integer' }),
                      etag: z.string().openapi({ type: 'string' }),
                    })
                    .openapi({
                      type: 'object',
                      required: ['partNumber', 'etag'],
                      properties: { partNumber: { type: 'integer' }, etag: { type: 'string' } },
                    }),
                )
                .openapi({
                  type: 'array',
                  items: {
                    type: 'object',
                    required: ['partNumber', 'etag'],
                    properties: { partNumber: { type: 'integer' }, etag: { type: 'string' } },
                  },
                }),
            })
            .openapi({
              type: 'object',
              required: ['parts'],
              properties: {
                parts: {
                  type: 'array',
                  items: {
                    type: 'object',
                    required: ['partNumber', 'etag'],
                    properties: { partNumber: { type: 'integer' }, etag: { type: 'string' } },
                  },
                },
              },
            }),
        },
      },
      required: true,
    },
  },
  responses: {
    201: {
      description: 'アップロード完了',
      content: { 'application/json': { schema: FileSchema.optional() } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getFilesFileIdRoute = createRoute({
  method: 'get',
  path: '/files/{fileId}',
  tags: ['Files'],
  summary: 'ファイル情報取得',
  operationId: 'getFile',
  request: { params: z.object({ fileId: FileIdParamParamsSchema }) },
  responses: {
    200: {
      description: 'ファイル情報',
      content: { 'application/json': { schema: FileSchema.optional() } },
    },
    401: UnauthorizedResponse,
    404: NotFoundResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const deleteFilesFileIdRoute = createRoute({
  method: 'delete',
  path: '/files/{fileId}',
  tags: ['Files'],
  summary: 'ファイル削除（ゴミ箱へ移動）',
  operationId: 'deleteFile',
  request: { params: z.object({ fileId: FileIdParamParamsSchema }) },
  responses: { 204: { description: '削除成功' }, 401: UnauthorizedResponse },
  security: [{ bearerAuth: [] }],
})

export const patchFilesFileIdRoute = createRoute({
  method: 'patch',
  path: '/files/{fileId}',
  tags: ['Files'],
  summary: 'ファイル情報更新',
  operationId: 'updateFile',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .object({
              name: z.string().openapi({ type: 'string' }),
              description: z.string().openapi({ type: 'string' }),
            })
            .partial()
            .openapi({
              type: 'object',
              properties: { name: { type: 'string' }, description: { type: 'string' } },
            }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: '更新成功',
      content: { 'application/json': { schema: FileSchema.optional() } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getFilesFileIdDownloadRoute = createRoute({
  method: 'get',
  path: '/files/{fileId}/download',
  tags: ['Files'],
  summary: 'ファイルダウンロード',
  operationId: 'downloadFile',
  request: { params: z.object({ fileId: FileIdParamParamsSchema }) },
  responses: {
    200: {
      description: 'ファイルコンテンツ',
      content: {
        'application/octet-stream': {
          schema: z.file().optional().openapi({ type: 'string', format: 'binary' }),
        },
      },
    },
    401: UnauthorizedResponse,
    404: NotFoundResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getFilesFileIdDownloadUrlRoute = createRoute({
  method: 'get',
  path: '/files/{fileId}/download-url',
  tags: ['Files'],
  summary: '署名付きダウンロードURL取得',
  operationId: 'getDownloadUrl',
  request: {
    params: z.object({ fileId: FileIdParamParamsSchema }),
    query: z.object({
      expiresIn: z
        .int()
        .min(60)
        .max(86400)
        .default(3600)
        .optional()
        .openapi({
          param: {
            name: 'expiresIn',
            in: 'query',
            description: '有効期限（秒）',
            schema: { type: 'integer', minimum: 60, maximum: 86400, default: 3600 },
          },
          type: 'integer',
          minimum: 60,
          maximum: 86400,
          default: 3600,
        }),
    }),
  },
  responses: {
    200: {
      description: 'ダウンロードURL',
      content: {
        'application/json': {
          schema: z
            .object({
              url: z.url().openapi({ type: 'string', format: 'uri' }),
              expiresAt: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
            })
            .partial()
            .openapi({
              type: 'object',
              properties: {
                url: { type: 'string', format: 'uri' },
                expiresAt: { type: 'string', format: 'date-time' },
              },
            }),
        },
      },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const postFilesFileIdCopyRoute = createRoute({
  method: 'post',
  path: '/files/{fileId}/copy',
  tags: ['Files'],
  summary: 'ファイルコピー',
  operationId: 'copyFile',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .object({
              destinationFolderId: z.uuid().openapi({ type: 'string', format: 'uuid' }),
              name: z
                .string()
                .optional()
                .openapi({ type: 'string', description: '新しいファイル名' }),
            })
            .openapi({
              type: 'object',
              required: ['destinationFolderId'],
              properties: {
                destinationFolderId: { type: 'string', format: 'uuid' },
                name: { type: 'string', description: '新しいファイル名' },
              },
            }),
        },
      },
      required: true,
    },
  },
  responses: {
    201: {
      description: 'コピー成功',
      content: { 'application/json': { schema: FileSchema.optional() } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const postFilesFileIdMoveRoute = createRoute({
  method: 'post',
  path: '/files/{fileId}/move',
  tags: ['Files'],
  summary: 'ファイル移動',
  operationId: 'moveFile',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .object({ destinationFolderId: z.uuid().openapi({ type: 'string', format: 'uuid' }) })
            .openapi({
              type: 'object',
              required: ['destinationFolderId'],
              properties: { destinationFolderId: { type: 'string', format: 'uuid' } },
            }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: '移動成功',
      content: { 'application/json': { schema: FileSchema.optional() } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getFilesFileIdThumbnailRoute = createRoute({
  method: 'get',
  path: '/files/{fileId}/thumbnail',
  tags: ['Files'],
  summary: 'サムネイル取得',
  operationId: 'getFileThumbnail',
  request: {
    params: z.object({ fileId: FileIdParamParamsSchema }),
    query: z.object({
      size: z
        .enum(['small', 'medium', 'large'])
        .default('medium')
        .optional()
        .openapi({
          param: {
            name: 'size',
            in: 'query',
            schema: { type: 'string', enum: ['small', 'medium', 'large'], default: 'medium' },
          },
          type: 'string',
          enum: ['small', 'medium', 'large'],
          default: 'medium',
        }),
    }),
  },
  responses: {
    200: {
      description: 'サムネイル画像',
      content: {
        'image/jpeg': { schema: z.file().optional().openapi({ type: 'string', format: 'binary' }) },
        'image/png': { schema: z.file().optional().openapi({ type: 'string', format: 'binary' }) },
      },
    },
    401: UnauthorizedResponse,
    404: NotFoundResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const postFoldersRoute = createRoute({
  method: 'post',
  path: '/folders',
  tags: ['Folders'],
  summary: 'フォルダ作成',
  operationId: 'createFolder',
  request: {
    body: {
      content: { 'application/json': { schema: CreateFolderRequestSchema.optional() } },
      required: true,
    },
  },
  responses: {
    201: {
      description: '作成成功',
      content: { 'application/json': { schema: FolderSchema.optional() } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getFoldersFolderIdRoute = createRoute({
  method: 'get',
  path: '/folders/{folderId}',
  tags: ['Folders'],
  summary: 'フォルダ情報取得',
  operationId: 'getFolder',
  request: { params: z.object({ folderId: FolderIdParamParamsSchema }) },
  responses: {
    200: {
      description: 'フォルダ情報',
      content: { 'application/json': { schema: FolderSchema.optional() } },
    },
    401: UnauthorizedResponse,
    404: NotFoundResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const deleteFoldersFolderIdRoute = createRoute({
  method: 'delete',
  path: '/folders/{folderId}',
  tags: ['Folders'],
  summary: 'フォルダ削除',
  operationId: 'deleteFolder',
  request: { params: z.object({ folderId: FolderIdParamParamsSchema }) },
  responses: { 204: { description: '削除成功' }, 401: UnauthorizedResponse },
  security: [{ bearerAuth: [] }],
})

export const patchFoldersFolderIdRoute = createRoute({
  method: 'patch',
  path: '/folders/{folderId}',
  tags: ['Folders'],
  summary: 'フォルダ情報更新',
  operationId: 'updateFolder',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .object({
              name: z.string().openapi({ type: 'string' }),
              color: z
                .string()
                .regex(/^#[0-9A-Fa-f]{6}$/)
                .openapi({ type: 'string', pattern: '^#[0-9A-Fa-f]{6}$' }),
            })
            .partial()
            .openapi({
              type: 'object',
              properties: {
                name: { type: 'string' },
                color: { type: 'string', pattern: '^#[0-9A-Fa-f]{6}$' },
              },
            }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: '更新成功',
      content: { 'application/json': { schema: FolderSchema.optional() } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getFilesFileIdShareRoute = createRoute({
  method: 'get',
  path: '/files/{fileId}/share',
  tags: ['Sharing'],
  summary: '共有設定取得',
  operationId: 'getFileSharing',
  request: { params: z.object({ fileId: FileIdParamParamsSchema }) },
  responses: {
    200: {
      description: '共有設定',
      content: { 'application/json': { schema: ShareSettingsSchema.optional() } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const postFilesFileIdShareRoute = createRoute({
  method: 'post',
  path: '/files/{fileId}/share',
  tags: ['Sharing'],
  summary: 'ファイル共有',
  operationId: 'shareFile',
  request: {
    body: {
      content: { 'application/json': { schema: ShareRequestSchema.optional() } },
      required: true,
    },
  },
  responses: {
    200: {
      description: '共有成功',
      content: { 'application/json': { schema: ShareSettingsSchema.optional() } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const deleteFilesFileIdShareRoute = createRoute({
  method: 'delete',
  path: '/files/{fileId}/share',
  tags: ['Sharing'],
  summary: '共有解除',
  operationId: 'unshareFile',
  request: { params: z.object({ fileId: FileIdParamParamsSchema }) },
  responses: { 204: { description: '解除成功' }, 401: UnauthorizedResponse },
  security: [{ bearerAuth: [] }],
})

export const postFilesFileIdShareLinkRoute = createRoute({
  method: 'post',
  path: '/files/{fileId}/share/link',
  tags: ['Sharing'],
  summary: '共有リンク作成',
  operationId: 'createShareLink',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .object({
              password: z.string().openapi({ type: 'string', description: 'パスワード保護' }),
              expiresAt: z.iso
                .datetime()
                .openapi({ type: 'string', format: 'date-time', description: '有効期限' }),
              allowDownload: z.boolean().default(true).openapi({ type: 'boolean', default: true }),
            })
            .partial()
            .openapi({
              type: 'object',
              properties: {
                password: { type: 'string', description: 'パスワード保護' },
                expiresAt: { type: 'string', format: 'date-time', description: '有効期限' },
                allowDownload: { type: 'boolean', default: true },
              },
            }),
        },
      },
    },
  },
  responses: {
    201: {
      description: 'リンク作成成功',
      content: { 'application/json': { schema: ShareLinkSchema.optional() } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getFilesFileIdVersionsRoute = createRoute({
  method: 'get',
  path: '/files/{fileId}/versions',
  tags: ['Versions'],
  summary: 'バージョン一覧取得',
  operationId: 'listFileVersions',
  request: { params: z.object({ fileId: FileIdParamParamsSchema }) },
  responses: {
    200: {
      description: 'バージョン一覧',
      content: {
        'application/json': {
          schema: z
            .array(FileVersionSchema)
            .optional()
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/FileVersion' } }),
        },
      },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const postFilesFileIdVersionsVersionIdRestoreRoute = createRoute({
  method: 'post',
  path: '/files/{fileId}/versions/{versionId}/restore',
  tags: ['Versions'],
  summary: 'バージョン復元',
  operationId: 'restoreFileVersion',
  request: {
    params: z.object({
      fileId: FileIdParamParamsSchema,
      versionId: z
        .uuid()
        .openapi({
          param: {
            name: 'versionId',
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
      description: '復元成功',
      content: { 'application/json': { schema: FileSchema.optional() } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getTrashRoute = createRoute({
  method: 'get',
  path: '/trash',
  tags: ['Trash'],
  summary: 'ゴミ箱一覧取得',
  operationId: 'listTrash',
  request: { query: z.object({ page: PageParamParamsSchema, limit: LimitParamParamsSchema }) },
  responses: {
    200: {
      description: 'ゴミ箱一覧',
      content: { 'application/json': { schema: FileListResponseSchema.optional() } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const deleteTrashRoute = createRoute({
  method: 'delete',
  path: '/trash',
  tags: ['Trash'],
  summary: 'ゴミ箱を空にする',
  operationId: 'emptyTrash',
  responses: { 204: { description: '成功' }, 401: UnauthorizedResponse },
  security: [{ bearerAuth: [] }],
})

export const postTrashFileIdRestoreRoute = createRoute({
  method: 'post',
  path: '/trash/{fileId}/restore',
  tags: ['Trash'],
  summary: 'ゴミ箱から復元',
  operationId: 'restoreFromTrash',
  request: { params: z.object({ fileId: FileIdParamParamsSchema }) },
  responses: {
    200: {
      description: '復元成功',
      content: { 'application/json': { schema: FileSchema.optional() } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getStorageUsageRoute = createRoute({
  method: 'get',
  path: '/storage/usage',
  tags: ['Files'],
  summary: 'ストレージ使用量取得',
  operationId: 'getStorageUsage',
  responses: {
    200: {
      description: 'ストレージ使用量',
      content: { 'application/json': { schema: StorageUsageSchema.optional() } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})
