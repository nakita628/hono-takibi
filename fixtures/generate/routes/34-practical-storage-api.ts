import { createRoute, z } from '@hono/zod-openapi'

const UserSchema = z
  .object({
    id: z.uuid(),
    name: z.string(),
    email: z.email().exactOptional(),
    avatarUrl: z.url().exactOptional(),
  })
  .openapi({ required: ['id', 'name'] })
  .openapi('User')

const FileSchema = z
  .object({
    id: z.uuid(),
    name: z.string(),
    description: z.string().exactOptional(),
    type: z.enum(['document', 'image', 'video', 'audio', 'archive', 'other']),
    size: z.int().openapi({ description: 'ファイルサイズ（バイト）' }),
    mimeType: z.string(),
    extension: z.string().exactOptional(),
    folderId: z.uuid().exactOptional(),
    path: z.string().exactOptional().openapi({ description: 'フルパス' }),
    thumbnailUrl: z.url().exactOptional(),
    downloadUrl: z.url().exactOptional(),
    isShared: z.boolean().exactOptional(),
    isFavorite: z.boolean().exactOptional(),
    version: z.int().exactOptional(),
    owner: UserSchema.exactOptional(),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime().exactOptional(),
    deletedAt: z.iso.datetime().exactOptional(),
  })
  .openapi({ required: ['id', 'name', 'type', 'size', 'mimeType', 'createdAt'] })
  .openapi('File')

const FolderSchema = z
  .object({
    id: z.uuid(),
    name: z.string(),
    color: z.string().exactOptional(),
    parentId: z.uuid().exactOptional(),
    path: z.string().exactOptional(),
    fileCount: z.int().exactOptional(),
    folderCount: z.int().exactOptional(),
    size: z.int().exactOptional().openapi({ description: '総サイズ（バイト）' }),
    isShared: z.boolean().exactOptional(),
    owner: UserSchema.exactOptional(),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime().exactOptional(),
  })
  .openapi({ required: ['id', 'name', 'createdAt'] })
  .openapi('Folder')

const ShareLinkSchema = z
  .object({
    url: z.url(),
    password: z.boolean().exactOptional().openapi({ description: 'パスワード保護されているか' }),
    expiresAt: z.iso.datetime().exactOptional(),
    allowDownload: z.boolean().exactOptional(),
    viewCount: z.int().exactOptional(),
    createdAt: z.iso.datetime(),
  })
  .openapi({ required: ['url', 'createdAt'] })
  .openapi('ShareLink')

const CollaboratorSchema = z
  .object({
    user: UserSchema,
    permission: z.enum(['viewer', 'editor', 'owner']),
    addedAt: z.iso.datetime().exactOptional(),
  })
  .openapi({ required: ['user', 'permission'] })
  .openapi('Collaborator')

const ShareSettingsSchema = z
  .object({
    isPublic: z.boolean().exactOptional(),
    publicLink: ShareLinkSchema.exactOptional(),
    collaborators: z.array(CollaboratorSchema).exactOptional(),
  })
  .openapi('ShareSettings')

const ShareRequestSchema = z
  .object({
    collaborators: z
      .array(
        z
          .object({ email: z.email(), permission: z.enum(['viewer', 'editor']) })
          .openapi({ required: ['email', 'permission'] }),
      )
      .exactOptional(),
    message: z.string().exactOptional().openapi({ description: '招待メッセージ' }),
    notifyByEmail: z.boolean().default(true).exactOptional(),
  })
  .openapi('ShareRequest')

const FileVersionSchema = z
  .object({
    id: z.uuid(),
    version: z.int(),
    size: z.int(),
    modifiedBy: UserSchema.exactOptional(),
    createdAt: z.iso.datetime(),
  })
  .openapi({ required: ['id', 'version', 'size', 'createdAt'] })
  .openapi('FileVersion')

const CreateFolderRequestSchema = z
  .object({
    name: z.string().min(1).max(255),
    parentId: z.uuid().exactOptional(),
    color: z
      .string()
      .regex(/^#[0-9A-Fa-f]{6}$/)
      .exactOptional(),
  })
  .openapi({ required: ['name'] })
  .openapi('CreateFolderRequest')

const StorageUsageSchema = z
  .object({
    used: z.int().openapi({ description: '使用量（バイト）' }),
    total: z.int().openapi({ description: '上限（バイト）' }),
    percentage: z.number().exactOptional().openapi({ description: '使用率（%）' }),
    breakdown: z
      .object({
        documents: z.int().exactOptional(),
        images: z.int().exactOptional(),
        videos: z.int().exactOptional(),
        audio: z.int().exactOptional(),
        archives: z.int().exactOptional(),
        other: z.int().exactOptional(),
        trash: z.int().exactOptional(),
      })
      .exactOptional(),
  })
  .openapi({ required: ['used', 'total'] })
  .openapi('StorageUsage')

const PaginationSchema = z
  .object({ page: z.int(), limit: z.int(), total: z.int(), totalPages: z.int() })
  .openapi({ required: ['page', 'limit', 'total', 'totalPages'] })
  .openapi('Pagination')

const FileListResponseSchema = z
  .object({ data: z.array(z.xor([FileSchema, FolderSchema])), pagination: PaginationSchema })
  .openapi({ required: ['data', 'pagination'] })
  .openapi('FileListResponse')

const ErrorSchema = z
  .object({ code: z.string(), message: z.string() })
  .openapi({ required: ['code', 'message'] })
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
  .default(50)
  .exactOptional()
  .openapi({
    param: {
      name: 'limit',
      in: 'query',
      schema: { type: 'integer', minimum: 1, maximum: 100, default: 50 },
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
        .exactOptional()
        .openapi({
          param: {
            name: 'folderId',
            in: 'query',
            description: 'フォルダID（指定しない場合はルート）',
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
            description: 'ファイル名検索',
            schema: { type: 'string' },
          },
        }),
      type: z
        .enum(['document', 'image', 'video', 'audio', 'archive', 'other'])
        .exactOptional()
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
        }),
      sort: z
        .enum(['name:asc', 'name:desc', 'size:asc', 'size:desc', 'updatedAt:desc', 'updatedAt:asc'])
        .default('name:asc')
        .exactOptional()
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
        }),
      page: PageParamParamsSchema,
      limit: LimitParamParamsSchema,
    }),
  },
  responses: {
    200: {
      description: 'ファイル一覧',
      content: { 'application/json': { schema: FileListResponseSchema } },
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
              file: z.file(),
              folderId: z.uuid().exactOptional().openapi({ description: 'アップロード先フォルダ' }),
              name: z
                .string()
                .exactOptional()
                .openapi({ description: 'ファイル名（省略時は元のファイル名）' }),
              overwrite: z
                .boolean()
                .default(false)
                .exactOptional()
                .openapi({ description: '同名ファイルを上書きするか' }),
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
      content: { 'application/json': { schema: FileSchema } },
    },
    400: BadRequestResponse,
    401: UnauthorizedResponse,
    409: {
      description: '同名ファイルが存在します',
      content: { 'application/json': { schema: ErrorSchema } },
    },
    413: {
      description: 'ファイルサイズが上限を超えています',
      content: { 'application/json': { schema: ErrorSchema } },
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
              filename: z.string(),
              size: z.int().openapi({ description: 'ファイルサイズ（バイト）' }),
              folderId: z.uuid().exactOptional(),
              contentType: z.string().exactOptional(),
            })
            .openapi({ required: ['filename', 'size'] }),
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
          schema: z.object({
            uploadId: z.string().exactOptional(),
            partSize: z.int().exactOptional().openapi({ description: '推奨パートサイズ' }),
            partCount: z.int().exactOptional().openapi({ description: '必要なパート数' }),
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
    params: z.object({
      uploadId: z
        .string()
        .openapi({
          param: { name: 'uploadId', in: 'path', required: true, schema: { type: 'string' } },
        }),
    }),
    query: z.object({
      partNumber: z
        .int()
        .min(1)
        .openapi({
          param: {
            name: 'partNumber',
            in: 'query',
            required: true,
            schema: { type: 'integer', minimum: 1 },
          },
        }),
    }),
    body: { content: { 'application/octet-stream': { schema: z.file() } }, required: true },
  },
  responses: {
    200: {
      description: 'パートアップロード成功',
      content: {
        'application/json': {
          schema: z.object({
            partNumber: z.int().exactOptional(),
            etag: z.string().exactOptional(),
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
    params: z.object({
      uploadId: z
        .string()
        .openapi({
          param: { name: 'uploadId', in: 'path', required: true, schema: { type: 'string' } },
        }),
    }),
    body: {
      content: {
        'application/json': {
          schema: z
            .object({
              parts: z.array(
                z
                  .object({ partNumber: z.int(), etag: z.string() })
                  .openapi({ required: ['partNumber', 'etag'] }),
              ),
            })
            .openapi({ required: ['parts'] }),
        },
      },
      required: true,
    },
  },
  responses: {
    201: {
      description: 'アップロード完了',
      content: { 'application/json': { schema: FileSchema } },
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
    200: { description: 'ファイル情報', content: { 'application/json': { schema: FileSchema } } },
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
    params: z.object({ fileId: FileIdParamParamsSchema }),
    body: {
      content: {
        'application/json': {
          schema: z.object({
            name: z.string().exactOptional(),
            description: z.string().exactOptional(),
          }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: { description: '更新成功', content: { 'application/json': { schema: FileSchema } } },
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
      headers: z.object({
        'Content-Disposition': { schema: z.string().exactOptional() },
        'Content-Type': { schema: z.string().exactOptional() },
      }),
      content: { 'application/octet-stream': { schema: z.file() } },
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
        .exactOptional()
        .openapi({
          param: {
            name: 'expiresIn',
            in: 'query',
            description: '有効期限（秒）',
            schema: { type: 'integer', minimum: 60, maximum: 86400, default: 3600 },
          },
        }),
    }),
  },
  responses: {
    200: {
      description: 'ダウンロードURL',
      content: {
        'application/json': {
          schema: z.object({
            url: z.url().exactOptional(),
            expiresAt: z.iso.datetime().exactOptional(),
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
    params: z.object({ fileId: FileIdParamParamsSchema }),
    body: {
      content: {
        'application/json': {
          schema: z
            .object({
              destinationFolderId: z.uuid(),
              name: z.string().exactOptional().openapi({ description: '新しいファイル名' }),
            })
            .openapi({ required: ['destinationFolderId'] }),
        },
      },
      required: true,
    },
  },
  responses: {
    201: { description: 'コピー成功', content: { 'application/json': { schema: FileSchema } } },
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
    params: z.object({ fileId: FileIdParamParamsSchema }),
    body: {
      content: {
        'application/json': {
          schema: z
            .object({ destinationFolderId: z.uuid() })
            .openapi({ required: ['destinationFolderId'] }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: { description: '移動成功', content: { 'application/json': { schema: FileSchema } } },
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
        .exactOptional()
        .openapi({
          param: {
            name: 'size',
            in: 'query',
            schema: { type: 'string', enum: ['small', 'medium', 'large'], default: 'medium' },
          },
        }),
    }),
  },
  responses: {
    200: {
      description: 'サムネイル画像',
      content: { 'image/jpeg': { schema: z.file() }, 'image/png': { schema: z.file() } },
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
      content: { 'application/json': { schema: CreateFolderRequestSchema } },
      required: true,
    },
  },
  responses: {
    201: { description: '作成成功', content: { 'application/json': { schema: FolderSchema } } },
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
    200: { description: 'フォルダ情報', content: { 'application/json': { schema: FolderSchema } } },
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
    params: z.object({ folderId: FolderIdParamParamsSchema }),
    body: {
      content: {
        'application/json': {
          schema: z.object({
            name: z.string().exactOptional(),
            color: z
              .string()
              .regex(/^#[0-9A-Fa-f]{6}$/)
              .exactOptional(),
          }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: { description: '更新成功', content: { 'application/json': { schema: FolderSchema } } },
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
      content: { 'application/json': { schema: ShareSettingsSchema } },
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
    params: z.object({ fileId: FileIdParamParamsSchema }),
    body: { content: { 'application/json': { schema: ShareRequestSchema } }, required: true },
  },
  responses: {
    200: {
      description: '共有成功',
      content: { 'application/json': { schema: ShareSettingsSchema } },
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
    params: z.object({ fileId: FileIdParamParamsSchema }),
    body: {
      content: {
        'application/json': {
          schema: z.object({
            password: z.string().exactOptional().openapi({ description: 'パスワード保護' }),
            expiresAt: z.iso.datetime().exactOptional().openapi({ description: '有効期限' }),
            allowDownload: z.boolean().default(true).exactOptional(),
          }),
        },
      },
    },
  },
  responses: {
    201: {
      description: 'リンク作成成功',
      content: { 'application/json': { schema: ShareLinkSchema } },
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
      content: { 'application/json': { schema: z.array(FileVersionSchema) } },
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
        }),
    }),
  },
  responses: {
    200: { description: '復元成功', content: { 'application/json': { schema: FileSchema } } },
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
      content: { 'application/json': { schema: FileListResponseSchema } },
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
    200: { description: '復元成功', content: { 'application/json': { schema: FileSchema } } },
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
      content: { 'application/json': { schema: StorageUsageSchema } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})
