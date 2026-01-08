declare const routes: import('/workspaces/hono-takibi/node_modules/.pnpm/@hono+zod-openapi@1.2.0_hono@4.11.3_zod@4.3.5/node_modules/@hono/zod-openapi/dist/index').OpenAPIHono<
  import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/types').Env,
  {
    '/files': {
      $get:
        | {
            input: {
              query: {
                folderId?: string | undefined
                search?: string | undefined
                type?: 'document' | 'image' | 'video' | 'audio' | 'archive' | 'other' | undefined
                sort?:
                  | 'name:asc'
                  | 'name:desc'
                  | 'size:asc'
                  | 'size:desc'
                  | 'updatedAt:desc'
                  | 'updatedAt:asc'
                  | undefined
                page?: number | undefined
                limit?: number | undefined
              }
            }
            output: {
              data: (
                | {
                    id: string
                    name: string
                    type: 'document' | 'image' | 'video' | 'audio' | 'archive' | 'other'
                    size: number
                    mimeType: string
                    createdAt: string
                    description?: string | undefined
                    extension?: string | undefined
                    folderId?: string | undefined
                    path?: string | undefined
                    thumbnailUrl?: string | undefined
                    downloadUrl?: string | undefined
                    isShared?: boolean | undefined
                    isFavorite?: boolean | undefined
                    version?: number | undefined
                    owner?:
                      | {
                          id: string
                          name: string
                          email?: string | undefined
                          avatarUrl?: string | undefined
                        }
                      | undefined
                    updatedAt?: string | undefined
                    deletedAt?: string | undefined
                  }
                | {
                    id: string
                    name: string
                    createdAt: string
                    color?: string | undefined
                    parentId?: string | undefined
                    path?: string | undefined
                    fileCount?: number | undefined
                    folderCount?: number | undefined
                    size?: number | undefined
                    isShared?: boolean | undefined
                    owner?:
                      | {
                          id: string
                          name: string
                          email?: string | undefined
                          avatarUrl?: string | undefined
                        }
                      | undefined
                    updatedAt?: string | undefined
                  }
              )[]
              pagination: { page: number; limit: number; total: number; totalPages: number }
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: {
              query: {
                folderId?: string | undefined
                search?: string | undefined
                type?: 'document' | 'image' | 'video' | 'audio' | 'archive' | 'other' | undefined
                sort?:
                  | 'name:asc'
                  | 'name:desc'
                  | 'size:asc'
                  | 'size:desc'
                  | 'updatedAt:desc'
                  | 'updatedAt:asc'
                  | undefined
                page?: number | undefined
                limit?: number | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/files/upload': {
      $post:
        | {
            input: {
              form: {
                file: import('/workspaces/hono-takibi/node_modules/.pnpm/zod@4.3.5/node_modules/zod/v4/core/schemas').File
                folderId?: string | undefined
                name?: string | undefined
                overwrite?: boolean | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: {
              form: {
                file: import('/workspaces/hono-takibi/node_modules/.pnpm/zod@4.3.5/node_modules/zod/v4/core/schemas').File
                folderId?: string | undefined
                name?: string | undefined
                overwrite?: boolean | undefined
              }
            }
            output: {
              id: string
              name: string
              type: 'document' | 'image' | 'video' | 'audio' | 'archive' | 'other'
              size: number
              mimeType: string
              createdAt: string
              description?: string | undefined
              extension?: string | undefined
              folderId?: string | undefined
              path?: string | undefined
              thumbnailUrl?: string | undefined
              downloadUrl?: string | undefined
              isShared?: boolean | undefined
              isFavorite?: boolean | undefined
              version?: number | undefined
              owner?:
                | {
                    id: string
                    name: string
                    email?: string | undefined
                    avatarUrl?: string | undefined
                  }
                | undefined
              updatedAt?: string | undefined
              deletedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 201
          }
        | {
            input: {
              form: {
                file: import('/workspaces/hono-takibi/node_modules/.pnpm/zod@4.3.5/node_modules/zod/v4/core/schemas').File
                folderId?: string | undefined
                name?: string | undefined
                overwrite?: boolean | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: {
              form: {
                file: import('/workspaces/hono-takibi/node_modules/.pnpm/zod@4.3.5/node_modules/zod/v4/core/schemas').File
                folderId?: string | undefined
                name?: string | undefined
                overwrite?: boolean | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 409
          }
        | {
            input: {
              form: {
                file: import('/workspaces/hono-takibi/node_modules/.pnpm/zod@4.3.5/node_modules/zod/v4/core/schemas').File
                folderId?: string | undefined
                name?: string | undefined
                overwrite?: boolean | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 413
          }
    }
  } & {
    '/files/upload/multipart/init': {
      $post:
        | {
            input: {
              json: {
                filename: string
                size: number
                folderId?: string | undefined
                contentType?: string | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: {
              json: {
                filename: string
                size: number
                folderId?: string | undefined
                contentType?: string | undefined
              }
            }
            output: {
              uploadId?: string | undefined
              partSize?: number | undefined
              partCount?: number | undefined
            }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/files/upload/multipart/:uploadId/part': {
      $post:
        | {
            input: { param: { uploadId: string } } & { query: { partNumber: number } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { uploadId: string } } & { query: { partNumber: number } }
            output: { partNumber?: number | undefined; etag?: string | undefined }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/files/upload/multipart/:uploadId/complete': {
      $post:
        | {
            input: { param: { uploadId: string } } & {
              json: { parts: { partNumber: number; etag: string }[] }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { uploadId: string } } & {
              json: { parts: { partNumber: number; etag: string }[] }
            }
            output: {
              id: string
              name: string
              type: 'document' | 'image' | 'video' | 'audio' | 'archive' | 'other'
              size: number
              mimeType: string
              createdAt: string
              description?: string | undefined
              extension?: string | undefined
              folderId?: string | undefined
              path?: string | undefined
              thumbnailUrl?: string | undefined
              downloadUrl?: string | undefined
              isShared?: boolean | undefined
              isFavorite?: boolean | undefined
              version?: number | undefined
              owner?:
                | {
                    id: string
                    name: string
                    email?: string | undefined
                    avatarUrl?: string | undefined
                  }
                | undefined
              updatedAt?: string | undefined
              deletedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 201
          }
    }
  } & {
    '/files/:fileId': {
      $get:
        | {
            input: { param: { fileId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { fileId: string } }
            output: {
              id: string
              name: string
              type: 'document' | 'image' | 'video' | 'audio' | 'archive' | 'other'
              size: number
              mimeType: string
              createdAt: string
              description?: string | undefined
              extension?: string | undefined
              folderId?: string | undefined
              path?: string | undefined
              thumbnailUrl?: string | undefined
              downloadUrl?: string | undefined
              isShared?: boolean | undefined
              isFavorite?: boolean | undefined
              version?: number | undefined
              owner?:
                | {
                    id: string
                    name: string
                    email?: string | undefined
                    avatarUrl?: string | undefined
                  }
                | undefined
              updatedAt?: string | undefined
              deletedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { fileId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 404
          }
    }
  } & {
    '/files/:fileId': {
      $patch:
        | {
            input: { param: { fileId: string } } & {
              json: { name?: string | undefined; description?: string | undefined }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { fileId: string } } & {
              json: { name?: string | undefined; description?: string | undefined }
            }
            output: {
              id: string
              name: string
              type: 'document' | 'image' | 'video' | 'audio' | 'archive' | 'other'
              size: number
              mimeType: string
              createdAt: string
              description?: string | undefined
              extension?: string | undefined
              folderId?: string | undefined
              path?: string | undefined
              thumbnailUrl?: string | undefined
              downloadUrl?: string | undefined
              isShared?: boolean | undefined
              isFavorite?: boolean | undefined
              version?: number | undefined
              owner?:
                | {
                    id: string
                    name: string
                    email?: string | undefined
                    avatarUrl?: string | undefined
                  }
                | undefined
              updatedAt?: string | undefined
              deletedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/files/:fileId': {
      $delete:
        | {
            input: { param: { fileId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | { input: { param: { fileId: string } }; output: {}; outputFormat: string; status: 204 }
    }
  } & {
    '/files/:fileId/download': {
      $get:
        | {
            input: { param: { fileId: string } }
            output: Response
            outputFormat: 'json'
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').StatusCode
          }
        | {
            input: { param: { fileId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { fileId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 404
          }
    }
  } & {
    '/files/:fileId/download-url': {
      $get:
        | {
            input: { param: { fileId: string } } & { query: { expiresIn?: number | undefined } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { fileId: string } } & { query: { expiresIn?: number | undefined } }
            output: { url?: string | undefined; expiresAt?: string | undefined }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/files/:fileId/copy': {
      $post:
        | {
            input: { param: { fileId: string } } & {
              json: { destinationFolderId: string; name?: string | undefined }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { fileId: string } } & {
              json: { destinationFolderId: string; name?: string | undefined }
            }
            output: {
              id: string
              name: string
              type: 'document' | 'image' | 'video' | 'audio' | 'archive' | 'other'
              size: number
              mimeType: string
              createdAt: string
              description?: string | undefined
              extension?: string | undefined
              folderId?: string | undefined
              path?: string | undefined
              thumbnailUrl?: string | undefined
              downloadUrl?: string | undefined
              isShared?: boolean | undefined
              isFavorite?: boolean | undefined
              version?: number | undefined
              owner?:
                | {
                    id: string
                    name: string
                    email?: string | undefined
                    avatarUrl?: string | undefined
                  }
                | undefined
              updatedAt?: string | undefined
              deletedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 201
          }
    }
  } & {
    '/files/:fileId/move': {
      $post:
        | {
            input: { param: { fileId: string } } & { json: { destinationFolderId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { fileId: string } } & { json: { destinationFolderId: string } }
            output: {
              id: string
              name: string
              type: 'document' | 'image' | 'video' | 'audio' | 'archive' | 'other'
              size: number
              mimeType: string
              createdAt: string
              description?: string | undefined
              extension?: string | undefined
              folderId?: string | undefined
              path?: string | undefined
              thumbnailUrl?: string | undefined
              downloadUrl?: string | undefined
              isShared?: boolean | undefined
              isFavorite?: boolean | undefined
              version?: number | undefined
              owner?:
                | {
                    id: string
                    name: string
                    email?: string | undefined
                    avatarUrl?: string | undefined
                  }
                | undefined
              updatedAt?: string | undefined
              deletedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/files/:fileId/thumbnail': {
      $get:
        | {
            input: { param: { fileId: string } } & {
              query: { size?: 'small' | 'medium' | 'large' | undefined }
            }
            output: Response
            outputFormat: 'json'
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').StatusCode
          }
        | {
            input: { param: { fileId: string } } & {
              query: { size?: 'small' | 'medium' | 'large' | undefined }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { fileId: string } } & {
              query: { size?: 'small' | 'medium' | 'large' | undefined }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 404
          }
    }
  } & {
    '/folders': {
      $post:
        | {
            input: {
              json: { name: string; parentId?: string | undefined; color?: string | undefined }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: {
              json: { name: string; parentId?: string | undefined; color?: string | undefined }
            }
            output: {
              id: string
              name: string
              createdAt: string
              color?: string | undefined
              parentId?: string | undefined
              path?: string | undefined
              fileCount?: number | undefined
              folderCount?: number | undefined
              size?: number | undefined
              isShared?: boolean | undefined
              owner?:
                | {
                    id: string
                    name: string
                    email?: string | undefined
                    avatarUrl?: string | undefined
                  }
                | undefined
              updatedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 201
          }
    }
  } & {
    '/folders/:folderId': {
      $get:
        | {
            input: { param: { folderId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { folderId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 404
          }
        | {
            input: { param: { folderId: string } }
            output: {
              id: string
              name: string
              createdAt: string
              color?: string | undefined
              parentId?: string | undefined
              path?: string | undefined
              fileCount?: number | undefined
              folderCount?: number | undefined
              size?: number | undefined
              isShared?: boolean | undefined
              owner?:
                | {
                    id: string
                    name: string
                    email?: string | undefined
                    avatarUrl?: string | undefined
                  }
                | undefined
              updatedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/folders/:folderId': {
      $patch:
        | {
            input: { param: { folderId: string } } & {
              json: { name?: string | undefined; color?: string | undefined }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { folderId: string } } & {
              json: { name?: string | undefined; color?: string | undefined }
            }
            output: {
              id: string
              name: string
              createdAt: string
              color?: string | undefined
              parentId?: string | undefined
              path?: string | undefined
              fileCount?: number | undefined
              folderCount?: number | undefined
              size?: number | undefined
              isShared?: boolean | undefined
              owner?:
                | {
                    id: string
                    name: string
                    email?: string | undefined
                    avatarUrl?: string | undefined
                  }
                | undefined
              updatedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/folders/:folderId': {
      $delete:
        | {
            input: { param: { folderId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | { input: { param: { folderId: string } }; output: {}; outputFormat: string; status: 204 }
    }
  } & {
    '/files/:fileId/share': {
      $get:
        | {
            input: { param: { fileId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { fileId: string } }
            output: {
              isPublic?: boolean | undefined
              publicLink?:
                | {
                    url: string
                    createdAt: string
                    password?: boolean | undefined
                    expiresAt?: string | undefined
                    allowDownload?: boolean | undefined
                    viewCount?: number | undefined
                  }
                | undefined
              collaborators?:
                | {
                    user: {
                      id: string
                      name: string
                      email?: string | undefined
                      avatarUrl?: string | undefined
                    }
                    permission: 'owner' | 'viewer' | 'editor'
                    addedAt?: string | undefined
                  }[]
                | undefined
            }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/files/:fileId/share': {
      $post:
        | {
            input: { param: { fileId: string } } & {
              json: {
                collaborators: { email: string; permission: 'viewer' | 'editor' }[]
                message?: string | undefined
                notifyByEmail?: boolean | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { fileId: string } } & {
              json: {
                collaborators: { email: string; permission: 'viewer' | 'editor' }[]
                message?: string | undefined
                notifyByEmail?: boolean | undefined
              }
            }
            output: {
              isPublic?: boolean | undefined
              publicLink?:
                | {
                    url: string
                    createdAt: string
                    password?: boolean | undefined
                    expiresAt?: string | undefined
                    allowDownload?: boolean | undefined
                    viewCount?: number | undefined
                  }
                | undefined
              collaborators?:
                | {
                    user: {
                      id: string
                      name: string
                      email?: string | undefined
                      avatarUrl?: string | undefined
                    }
                    permission: 'owner' | 'viewer' | 'editor'
                    addedAt?: string | undefined
                  }[]
                | undefined
            }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/files/:fileId/share': {
      $delete:
        | {
            input: { param: { fileId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | { input: { param: { fileId: string } }; output: {}; outputFormat: string; status: 204 }
    }
  } & {
    '/files/:fileId/share/link': {
      $post:
        | {
            input: { param: { fileId: string } } & {
              json: {
                password?: string | undefined
                expiresAt?: string | undefined
                allowDownload?: boolean | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { fileId: string } } & {
              json: {
                password?: string | undefined
                expiresAt?: string | undefined
                allowDownload?: boolean | undefined
              }
            }
            output: {
              url: string
              createdAt: string
              password?: boolean | undefined
              expiresAt?: string | undefined
              allowDownload?: boolean | undefined
              viewCount?: number | undefined
            }
            outputFormat: 'json'
            status: 201
          }
    }
  } & {
    '/files/:fileId/versions': {
      $get:
        | {
            input: { param: { fileId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { fileId: string } }
            output: {
              id: string
              version: number
              size: number
              createdAt: string
              modifiedBy?:
                | {
                    id: string
                    name: string
                    email?: string | undefined
                    avatarUrl?: string | undefined
                  }
                | undefined
            }[]
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/files/:fileId/versions/:versionId/restore': {
      $post:
        | {
            input: { param: { fileId: string; versionId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { fileId: string; versionId: string } }
            output: {
              id: string
              name: string
              type: 'document' | 'image' | 'video' | 'audio' | 'archive' | 'other'
              size: number
              mimeType: string
              createdAt: string
              description?: string | undefined
              extension?: string | undefined
              folderId?: string | undefined
              path?: string | undefined
              thumbnailUrl?: string | undefined
              downloadUrl?: string | undefined
              isShared?: boolean | undefined
              isFavorite?: boolean | undefined
              version?: number | undefined
              owner?:
                | {
                    id: string
                    name: string
                    email?: string | undefined
                    avatarUrl?: string | undefined
                  }
                | undefined
              updatedAt?: string | undefined
              deletedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/trash': {
      $get:
        | {
            input: { query: { page?: number | undefined; limit?: number | undefined } }
            output: {
              data: (
                | {
                    id: string
                    name: string
                    type: 'document' | 'image' | 'video' | 'audio' | 'archive' | 'other'
                    size: number
                    mimeType: string
                    createdAt: string
                    description?: string | undefined
                    extension?: string | undefined
                    folderId?: string | undefined
                    path?: string | undefined
                    thumbnailUrl?: string | undefined
                    downloadUrl?: string | undefined
                    isShared?: boolean | undefined
                    isFavorite?: boolean | undefined
                    version?: number | undefined
                    owner?:
                      | {
                          id: string
                          name: string
                          email?: string | undefined
                          avatarUrl?: string | undefined
                        }
                      | undefined
                    updatedAt?: string | undefined
                    deletedAt?: string | undefined
                  }
                | {
                    id: string
                    name: string
                    createdAt: string
                    color?: string | undefined
                    parentId?: string | undefined
                    path?: string | undefined
                    fileCount?: number | undefined
                    folderCount?: number | undefined
                    size?: number | undefined
                    isShared?: boolean | undefined
                    owner?:
                      | {
                          id: string
                          name: string
                          email?: string | undefined
                          avatarUrl?: string | undefined
                        }
                      | undefined
                    updatedAt?: string | undefined
                  }
              )[]
              pagination: { page: number; limit: number; total: number; totalPages: number }
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { query: { page?: number | undefined; limit?: number | undefined } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/trash': {
      $delete:
        | {
            input: {}
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | { input: {}; output: {}; outputFormat: string; status: 204 }
    }
  } & {
    '/trash/:fileId/restore': {
      $post:
        | {
            input: { param: { fileId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { fileId: string } }
            output: {
              id: string
              name: string
              type: 'document' | 'image' | 'video' | 'audio' | 'archive' | 'other'
              size: number
              mimeType: string
              createdAt: string
              description?: string | undefined
              extension?: string | undefined
              folderId?: string | undefined
              path?: string | undefined
              thumbnailUrl?: string | undefined
              downloadUrl?: string | undefined
              isShared?: boolean | undefined
              isFavorite?: boolean | undefined
              version?: number | undefined
              owner?:
                | {
                    id: string
                    name: string
                    email?: string | undefined
                    avatarUrl?: string | undefined
                  }
                | undefined
              updatedAt?: string | undefined
              deletedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/storage/usage': {
      $get:
        | {
            input: {}
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: {}
            output: {
              used: number
              total: number
              percentage?: number | undefined
              breakdown?:
                | {
                    documents?: number | undefined
                    images?: number | undefined
                    videos?: number | undefined
                    audio?: number | undefined
                    archives?: number | undefined
                    other?: number | undefined
                    trash?: number | undefined
                  }
                | undefined
            }
            outputFormat: 'json'
            status: 200
          }
    }
  },
  '/'
>
export default routes
