import { createQuery, createMutation } from '@tanstack/svelte-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/34-practical-storage-api'

/**
 * GET /files
 *
 * ファイル一覧取得
 */
export function createGetFiles(
  args: InferRequestType<typeof client.files.$get>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<typeof client.files.$get>,
      ) => InferResponseType<typeof client.files.$get>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetFilesQueryKey(args),
    queryFn: async () => parseResponse(client.files.$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /files
 */
export function getGetFilesQueryKey(args: InferRequestType<typeof client.files.$get>) {
  return ['/files', args] as const
}

/**
 * POST /files/upload
 *
 * ファイルアップロード
 */
export function createPostFilesUpload(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.files.upload.$post>,
      variables: InferRequestType<typeof client.files.upload.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.files.upload.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.files.upload.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.files.upload.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.files.upload.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (args: InferRequestType<typeof client.files.upload.$post>) =>
      parseResponse(client.files.upload.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /files/upload/multipart/init
 *
 * マルチパートアップロード開始
 *
 * 大容量ファイルの分割アップロードを開始します
 */
export function createPostFilesUploadMultipartInit(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.files.upload.multipart.init.$post>,
      variables: InferRequestType<typeof client.files.upload.multipart.init.$post>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<typeof client.files.upload.multipart.init.$post>,
    ) => void
    onSettled?: (
      data: InferResponseType<typeof client.files.upload.multipart.init.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.files.upload.multipart.init.$post>,
    ) => void
    onMutate?: (
      variables: InferRequestType<typeof client.files.upload.multipart.init.$post>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (args: InferRequestType<typeof client.files.upload.multipart.init.$post>) =>
      parseResponse(client.files.upload.multipart.init.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /files/upload/multipart/{uploadId}/part
 *
 * パートアップロード
 */
export function createPostFilesUploadMultipartUploadIdPart(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.files.upload.multipart)[':uploadId']['part']['$post']>,
      variables: InferRequestType<
        (typeof client.files.upload.multipart)[':uploadId']['part']['$post']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.files.upload.multipart)[':uploadId']['part']['$post']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.files.upload.multipart)[':uploadId']['part']['$post']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.files.upload.multipart)[':uploadId']['part']['$post']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.files.upload.multipart)[':uploadId']['part']['$post']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.files.upload.multipart)[':uploadId']['part']['$post']>,
    ) => parseResponse(client.files.upload.multipart[':uploadId'].part.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /files/upload/multipart/{uploadId}/complete
 *
 * マルチパートアップロード完了
 */
export function createPostFilesUploadMultipartUploadIdComplete(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<
        (typeof client.files.upload.multipart)[':uploadId']['complete']['$post']
      >,
      variables: InferRequestType<
        (typeof client.files.upload.multipart)[':uploadId']['complete']['$post']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.files.upload.multipart)[':uploadId']['complete']['$post']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client.files.upload.multipart)[':uploadId']['complete']['$post']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.files.upload.multipart)[':uploadId']['complete']['$post']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.files.upload.multipart)[':uploadId']['complete']['$post']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<
        (typeof client.files.upload.multipart)[':uploadId']['complete']['$post']
      >,
    ) =>
      parseResponse(client.files.upload.multipart[':uploadId'].complete.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /files/{fileId}
 *
 * ファイル情報取得
 */
export function createGetFilesFileId(
  args: InferRequestType<(typeof client.files)[':fileId']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<(typeof client.files)[':fileId']['$get']>,
      ) => InferResponseType<(typeof client.files)[':fileId']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetFilesFileIdQueryKey(args),
    queryFn: async () => parseResponse(client.files[':fileId'].$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /files/{fileId}
 */
export function getGetFilesFileIdQueryKey(
  args: InferRequestType<(typeof client.files)[':fileId']['$get']>,
) {
  return ['/files/:fileId', args] as const
}

/**
 * DELETE /files/{fileId}
 *
 * ファイル削除（ゴミ箱へ移動）
 */
export function createDeleteFilesFileId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.files)[':fileId']['$delete']> | undefined,
      variables: InferRequestType<(typeof client.files)[':fileId']['$delete']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.files)[':fileId']['$delete']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.files)[':fileId']['$delete']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.files)[':fileId']['$delete']>,
    ) => void
    onMutate?: (variables: InferRequestType<(typeof client.files)[':fileId']['$delete']>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (args: InferRequestType<(typeof client.files)[':fileId']['$delete']>) =>
      parseResponse(client.files[':fileId'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * PATCH /files/{fileId}
 *
 * ファイル情報更新
 */
export function createPatchFilesFileId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.files)[':fileId']['$patch']>,
      variables: InferRequestType<(typeof client.files)[':fileId']['$patch']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.files)[':fileId']['$patch']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.files)[':fileId']['$patch']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.files)[':fileId']['$patch']>,
    ) => void
    onMutate?: (variables: InferRequestType<(typeof client.files)[':fileId']['$patch']>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (args: InferRequestType<(typeof client.files)[':fileId']['$patch']>) =>
      parseResponse(client.files[':fileId'].$patch(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /files/{fileId}/download
 *
 * ファイルダウンロード
 */
export function createGetFilesFileIdDownload(
  args: InferRequestType<(typeof client.files)[':fileId']['download']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<(typeof client.files)[':fileId']['download']['$get']>,
      ) => InferResponseType<(typeof client.files)[':fileId']['download']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetFilesFileIdDownloadQueryKey(args),
    queryFn: async () => parseResponse(client.files[':fileId'].download.$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /files/{fileId}/download
 */
export function getGetFilesFileIdDownloadQueryKey(
  args: InferRequestType<(typeof client.files)[':fileId']['download']['$get']>,
) {
  return ['/files/:fileId/download', args] as const
}

/**
 * GET /files/{fileId}/download-url
 *
 * 署名付きダウンロードURL取得
 */
export function createGetFilesFileIdDownloadUrl(
  args: InferRequestType<(typeof client.files)[':fileId']['download-url']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<(typeof client.files)[':fileId']['download-url']['$get']>,
      ) => InferResponseType<(typeof client.files)[':fileId']['download-url']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetFilesFileIdDownloadUrlQueryKey(args),
    queryFn: async () =>
      parseResponse(client.files[':fileId']['download-url'].$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /files/{fileId}/download-url
 */
export function getGetFilesFileIdDownloadUrlQueryKey(
  args: InferRequestType<(typeof client.files)[':fileId']['download-url']['$get']>,
) {
  return ['/files/:fileId/download-url', args] as const
}

/**
 * POST /files/{fileId}/copy
 *
 * ファイルコピー
 */
export function createPostFilesFileIdCopy(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.files)[':fileId']['copy']['$post']>,
      variables: InferRequestType<(typeof client.files)[':fileId']['copy']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.files)[':fileId']['copy']['$post']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.files)[':fileId']['copy']['$post']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.files)[':fileId']['copy']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.files)[':fileId']['copy']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (args: InferRequestType<(typeof client.files)[':fileId']['copy']['$post']>) =>
      parseResponse(client.files[':fileId'].copy.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /files/{fileId}/move
 *
 * ファイル移動
 */
export function createPostFilesFileIdMove(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.files)[':fileId']['move']['$post']>,
      variables: InferRequestType<(typeof client.files)[':fileId']['move']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.files)[':fileId']['move']['$post']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.files)[':fileId']['move']['$post']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.files)[':fileId']['move']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.files)[':fileId']['move']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (args: InferRequestType<(typeof client.files)[':fileId']['move']['$post']>) =>
      parseResponse(client.files[':fileId'].move.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /files/{fileId}/thumbnail
 *
 * サムネイル取得
 */
export function createGetFilesFileIdThumbnail(
  args: InferRequestType<(typeof client.files)[':fileId']['thumbnail']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<(typeof client.files)[':fileId']['thumbnail']['$get']>,
      ) => InferResponseType<(typeof client.files)[':fileId']['thumbnail']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetFilesFileIdThumbnailQueryKey(args),
    queryFn: async () => parseResponse(client.files[':fileId'].thumbnail.$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /files/{fileId}/thumbnail
 */
export function getGetFilesFileIdThumbnailQueryKey(
  args: InferRequestType<(typeof client.files)[':fileId']['thumbnail']['$get']>,
) {
  return ['/files/:fileId/thumbnail', args] as const
}

/**
 * POST /folders
 *
 * フォルダ作成
 */
export function createPostFolders(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.folders.$post>,
      variables: InferRequestType<typeof client.folders.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.folders.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.folders.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.folders.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.folders.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (args: InferRequestType<typeof client.folders.$post>) =>
      parseResponse(client.folders.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /folders/{folderId}
 *
 * フォルダ情報取得
 */
export function createGetFoldersFolderId(
  args: InferRequestType<(typeof client.folders)[':folderId']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<(typeof client.folders)[':folderId']['$get']>,
      ) => InferResponseType<(typeof client.folders)[':folderId']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetFoldersFolderIdQueryKey(args),
    queryFn: async () => parseResponse(client.folders[':folderId'].$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /folders/{folderId}
 */
export function getGetFoldersFolderIdQueryKey(
  args: InferRequestType<(typeof client.folders)[':folderId']['$get']>,
) {
  return ['/folders/:folderId', args] as const
}

/**
 * DELETE /folders/{folderId}
 *
 * フォルダ削除
 */
export function createDeleteFoldersFolderId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.folders)[':folderId']['$delete']> | undefined,
      variables: InferRequestType<(typeof client.folders)[':folderId']['$delete']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.folders)[':folderId']['$delete']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.folders)[':folderId']['$delete']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.folders)[':folderId']['$delete']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.folders)[':folderId']['$delete']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (args: InferRequestType<(typeof client.folders)[':folderId']['$delete']>) =>
      parseResponse(client.folders[':folderId'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * PATCH /folders/{folderId}
 *
 * フォルダ情報更新
 */
export function createPatchFoldersFolderId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.folders)[':folderId']['$patch']>,
      variables: InferRequestType<(typeof client.folders)[':folderId']['$patch']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.folders)[':folderId']['$patch']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.folders)[':folderId']['$patch']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.folders)[':folderId']['$patch']>,
    ) => void
    onMutate?: (variables: InferRequestType<(typeof client.folders)[':folderId']['$patch']>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (args: InferRequestType<(typeof client.folders)[':folderId']['$patch']>) =>
      parseResponse(client.folders[':folderId'].$patch(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /files/{fileId}/share
 *
 * 共有設定取得
 */
export function createGetFilesFileIdShare(
  args: InferRequestType<(typeof client.files)[':fileId']['share']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<(typeof client.files)[':fileId']['share']['$get']>,
      ) => InferResponseType<(typeof client.files)[':fileId']['share']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetFilesFileIdShareQueryKey(args),
    queryFn: async () => parseResponse(client.files[':fileId'].share.$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /files/{fileId}/share
 */
export function getGetFilesFileIdShareQueryKey(
  args: InferRequestType<(typeof client.files)[':fileId']['share']['$get']>,
) {
  return ['/files/:fileId/share', args] as const
}

/**
 * POST /files/{fileId}/share
 *
 * ファイル共有
 */
export function createPostFilesFileIdShare(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.files)[':fileId']['share']['$post']>,
      variables: InferRequestType<(typeof client.files)[':fileId']['share']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.files)[':fileId']['share']['$post']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.files)[':fileId']['share']['$post']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.files)[':fileId']['share']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.files)[':fileId']['share']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.files)[':fileId']['share']['$post']>,
    ) => parseResponse(client.files[':fileId'].share.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * DELETE /files/{fileId}/share
 *
 * 共有解除
 */
export function createDeleteFilesFileIdShare(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.files)[':fileId']['share']['$delete']> | undefined,
      variables: InferRequestType<(typeof client.files)[':fileId']['share']['$delete']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.files)[':fileId']['share']['$delete']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.files)[':fileId']['share']['$delete']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.files)[':fileId']['share']['$delete']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.files)[':fileId']['share']['$delete']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.files)[':fileId']['share']['$delete']>,
    ) => parseResponse(client.files[':fileId'].share.$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /files/{fileId}/share/link
 *
 * 共有リンク作成
 */
export function createPostFilesFileIdShareLink(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.files)[':fileId']['share']['link']['$post']>,
      variables: InferRequestType<(typeof client.files)[':fileId']['share']['link']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.files)[':fileId']['share']['link']['$post']>,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.files)[':fileId']['share']['link']['$post']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.files)[':fileId']['share']['link']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.files)[':fileId']['share']['link']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.files)[':fileId']['share']['link']['$post']>,
    ) => parseResponse(client.files[':fileId'].share.link.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /files/{fileId}/versions
 *
 * バージョン一覧取得
 */
export function createGetFilesFileIdVersions(
  args: InferRequestType<(typeof client.files)[':fileId']['versions']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<(typeof client.files)[':fileId']['versions']['$get']>,
      ) => InferResponseType<(typeof client.files)[':fileId']['versions']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetFilesFileIdVersionsQueryKey(args),
    queryFn: async () => parseResponse(client.files[':fileId'].versions.$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /files/{fileId}/versions
 */
export function getGetFilesFileIdVersionsQueryKey(
  args: InferRequestType<(typeof client.files)[':fileId']['versions']['$get']>,
) {
  return ['/files/:fileId/versions', args] as const
}

/**
 * POST /files/{fileId}/versions/{versionId}/restore
 *
 * バージョン復元
 */
export function createPostFilesFileIdVersionsVersionIdRestore(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<
        (typeof client.files)[':fileId']['versions'][':versionId']['restore']['$post']
      >,
      variables: InferRequestType<
        (typeof client.files)[':fileId']['versions'][':versionId']['restore']['$post']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.files)[':fileId']['versions'][':versionId']['restore']['$post']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client.files)[':fileId']['versions'][':versionId']['restore']['$post']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.files)[':fileId']['versions'][':versionId']['restore']['$post']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.files)[':fileId']['versions'][':versionId']['restore']['$post']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<
        (typeof client.files)[':fileId']['versions'][':versionId']['restore']['$post']
      >,
    ) =>
      parseResponse(
        client.files[':fileId'].versions[':versionId'].restore.$post(args, clientOptions),
      ),
    ...mutationOptions,
  })
}

/**
 * GET /trash
 *
 * ゴミ箱一覧取得
 */
export function createGetTrash(
  args: InferRequestType<typeof client.trash.$get>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<typeof client.trash.$get>,
      ) => InferResponseType<typeof client.trash.$get>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetTrashQueryKey(args),
    queryFn: async () => parseResponse(client.trash.$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /trash
 */
export function getGetTrashQueryKey(args: InferRequestType<typeof client.trash.$get>) {
  return ['/trash', args] as const
}

/**
 * DELETE /trash
 *
 * ゴミ箱を空にする
 */
export function createDeleteTrash(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.trash.$delete> | undefined,
      variables: void,
    ) => void
    onError?: (error: Error, variables: void) => void
    onSettled?: (
      data: InferResponseType<typeof client.trash.$delete> | undefined,
      error: Error | null,
      variables: void,
    ) => void
    onMutate?: (variables: void) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async () => parseResponse(client.trash.$delete(undefined, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /trash/{fileId}/restore
 *
 * ゴミ箱から復元
 */
export function createPostTrashFileIdRestore(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.trash)[':fileId']['restore']['$post']>,
      variables: InferRequestType<(typeof client.trash)[':fileId']['restore']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.trash)[':fileId']['restore']['$post']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.trash)[':fileId']['restore']['$post']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.trash)[':fileId']['restore']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.trash)[':fileId']['restore']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.trash)[':fileId']['restore']['$post']>,
    ) => parseResponse(client.trash[':fileId'].restore.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /storage/usage
 *
 * ストレージ使用量取得
 */
export function createGetStorageUsage(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
    select?: (
      data: InferResponseType<typeof client.storage.usage.$get>,
    ) => InferResponseType<typeof client.storage.usage.$get>
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetStorageUsageQueryKey(),
    queryFn: async () => parseResponse(client.storage.usage.$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /storage/usage
 */
export function getGetStorageUsageQueryKey() {
  return ['/storage/usage'] as const
}
