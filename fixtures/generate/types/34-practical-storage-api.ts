declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
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
                    description?: string | undefined
                    type: 'document' | 'image' | 'video' | 'audio' | 'archive' | 'other'
                    size: number
                    mimeType: string
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
                    createdAt: string
                    updatedAt?: string | undefined
                    deletedAt?: string | undefined
                  }
                | {
                    id: string
                    name: string
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
                    createdAt: string
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
                file: File
                folderId?: string | undefined
                name?: string | undefined
                overwrite?: boolean | undefined
              }
            }
            output: {
              id: string
              name: string
              description?: string | undefined
              type: 'document' | 'image' | 'video' | 'audio' | 'archive' | 'other'
              size: number
              mimeType: string
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
              createdAt: string
              updatedAt?: string | undefined
              deletedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 201
          }
        | {
            input: {
              form: {
                file: File
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
                file: File
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
                file: File
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
                file: File
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
            output: {
              uploadId?: string | undefined
              partSize?: number | undefined
              partCount?: number | undefined
            }
            outputFormat: 'json'
            status: 200
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
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/files/upload/multipart/:uploadId/part': {
      $post:
        | {
            input: { param: { uploadId: string } } & { query: { partNumber: number } } & {
              json: File
            }
            output: { partNumber?: number | undefined; etag?: string | undefined }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { uploadId: string } } & { query: { partNumber: number } } & {
              json: File
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/files/upload/multipart/:uploadId/complete': {
      $post:
        | {
            input: { param: { uploadId: string } } & {
              json: { parts: { partNumber: number; etag: string }[] }
            }
            output: {
              id: string
              name: string
              description?: string | undefined
              type: 'document' | 'image' | 'video' | 'audio' | 'archive' | 'other'
              size: number
              mimeType: string
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
              createdAt: string
              updatedAt?: string | undefined
              deletedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 201
          }
        | {
            input: { param: { uploadId: string } } & {
              json: { parts: { partNumber: number; etag: string }[] }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/files/:fileId': {
      $get:
        | {
            input: { param: { fileId: string } }
            output: {
              id: string
              name: string
              description?: string | undefined
              type: 'document' | 'image' | 'video' | 'audio' | 'archive' | 'other'
              size: number
              mimeType: string
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
              createdAt: string
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
            status: 401
          }
        | {
            input: { param: { fileId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 404
          }
      $patch:
        | {
            input: { param: { fileId: string } } & {
              json: { name?: string | undefined; description?: string | undefined }
            }
            output: {
              id: string
              name: string
              description?: string | undefined
              type: 'document' | 'image' | 'video' | 'audio' | 'archive' | 'other'
              size: number
              mimeType: string
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
              createdAt: string
              updatedAt?: string | undefined
              deletedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { fileId: string } } & {
              json: { name?: string | undefined; description?: string | undefined }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
      $delete:
        | { input: { param: { fileId: string } }; output: {}; outputFormat: string; status: 204 }
        | {
            input: { param: { fileId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/files/:fileId/download': {
      $get:
        | { input: { param: { fileId: string } }; output: File; outputFormat: 'text'; status: 200 }
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
            output: { url?: string | undefined; expiresAt?: string | undefined }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { fileId: string } } & { query: { expiresIn?: number | undefined } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/files/:fileId/copy': {
      $post:
        | {
            input: { param: { fileId: string } } & {
              json: { destinationFolderId: string; name?: string | undefined }
            }
            output: {
              id: string
              name: string
              description?: string | undefined
              type: 'document' | 'image' | 'video' | 'audio' | 'archive' | 'other'
              size: number
              mimeType: string
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
              createdAt: string
              updatedAt?: string | undefined
              deletedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 201
          }
        | {
            input: { param: { fileId: string } } & {
              json: { destinationFolderId: string; name?: string | undefined }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/files/:fileId/move': {
      $post:
        | {
            input: { param: { fileId: string } } & { json: { destinationFolderId: string } }
            output: {
              id: string
              name: string
              description?: string | undefined
              type: 'document' | 'image' | 'video' | 'audio' | 'archive' | 'other'
              size: number
              mimeType: string
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
              createdAt: string
              updatedAt?: string | undefined
              deletedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { fileId: string } } & { json: { destinationFolderId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/files/:fileId/thumbnail': {
      $get:
        | {
            input: { param: { fileId: string } } & {
              query: { size?: 'small' | 'medium' | 'large' | undefined }
            }
            output: File
            outputFormat: 'text'
            status: 200
          }
        | {
            input: { param: { fileId: string } } & {
              query: { size?: 'small' | 'medium' | 'large' | undefined }
            }
            output: File
            outputFormat: 'text'
            status: 200
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
            output: {
              id: string
              name: string
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
              createdAt: string
              updatedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 201
          }
        | {
            input: {
              json: { name: string; parentId?: string | undefined; color?: string | undefined }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/folders/:folderId': {
      $get:
        | {
            input: { param: { folderId: string } }
            output: {
              id: string
              name: string
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
              createdAt: string
              updatedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
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
      $patch:
        | {
            input: { param: { folderId: string } } & {
              json: { name?: string | undefined; color?: string | undefined }
            }
            output: {
              id: string
              name: string
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
              createdAt: string
              updatedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { folderId: string } } & {
              json: { name?: string | undefined; color?: string | undefined }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
      $delete:
        | { input: { param: { folderId: string } }; output: {}; outputFormat: string; status: 204 }
        | {
            input: { param: { folderId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/files/:fileId/share': {
      $get:
        | {
            input: { param: { fileId: string } }
            output: {
              isPublic?: boolean | undefined
              publicLink?:
                | {
                    url: string
                    password?: boolean | undefined
                    expiresAt?: string | undefined
                    allowDownload?: boolean | undefined
                    viewCount?: number | undefined
                    createdAt: string
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
                    permission: 'viewer' | 'editor' | 'owner'
                    addedAt?: string | undefined
                  }[]
                | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { fileId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
      $post:
        | {
            input: { param: { fileId: string } } & {
              json: {
                collaborators?: { email: string; permission: 'viewer' | 'editor' }[] | undefined
                message?: string | undefined
                notifyByEmail?: boolean | undefined
              }
            }
            output: {
              isPublic?: boolean | undefined
              publicLink?:
                | {
                    url: string
                    password?: boolean | undefined
                    expiresAt?: string | undefined
                    allowDownload?: boolean | undefined
                    viewCount?: number | undefined
                    createdAt: string
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
                    permission: 'viewer' | 'editor' | 'owner'
                    addedAt?: string | undefined
                  }[]
                | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { fileId: string } } & {
              json: {
                collaborators?: { email: string; permission: 'viewer' | 'editor' }[] | undefined
                message?: string | undefined
                notifyByEmail?: boolean | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
      $delete:
        | { input: { param: { fileId: string } }; output: {}; outputFormat: string; status: 204 }
        | {
            input: { param: { fileId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
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
            output: {
              url: string
              password?: boolean | undefined
              expiresAt?: string | undefined
              allowDownload?: boolean | undefined
              viewCount?: number | undefined
              createdAt: string
            }
            outputFormat: 'json'
            status: 201
          }
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
    }
  } & {
    '/files/:fileId/versions': {
      $get:
        | {
            input: { param: { fileId: string } }
            output: {
              id: string
              version: number
              size: number
              modifiedBy?:
                | {
                    id: string
                    name: string
                    email?: string | undefined
                    avatarUrl?: string | undefined
                  }
                | undefined
              createdAt: string
            }[]
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { fileId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/files/:fileId/versions/:versionId/restore': {
      $post:
        | {
            input: { param: { fileId: string; versionId: string } }
            output: {
              id: string
              name: string
              description?: string | undefined
              type: 'document' | 'image' | 'video' | 'audio' | 'archive' | 'other'
              size: number
              mimeType: string
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
              createdAt: string
              updatedAt?: string | undefined
              deletedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { fileId: string; versionId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
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
                    description?: string | undefined
                    type: 'document' | 'image' | 'video' | 'audio' | 'archive' | 'other'
                    size: number
                    mimeType: string
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
                    createdAt: string
                    updatedAt?: string | undefined
                    deletedAt?: string | undefined
                  }
                | {
                    id: string
                    name: string
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
                    createdAt: string
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
      $delete:
        | { input: {}; output: {}; outputFormat: string; status: 204 }
        | {
            input: {}
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/trash/:fileId/restore': {
      $post:
        | {
            input: { param: { fileId: string } }
            output: {
              id: string
              name: string
              description?: string | undefined
              type: 'document' | 'image' | 'video' | 'audio' | 'archive' | 'other'
              size: number
              mimeType: string
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
              createdAt: string
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
            status: 401
          }
    }
  } & {
    '/storage/usage': {
      $get:
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
        | {
            input: {}
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  },
  '/'
>
export default routes
