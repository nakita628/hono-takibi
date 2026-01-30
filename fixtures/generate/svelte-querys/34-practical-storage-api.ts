import { createQuery, createMutation } from '@tanstack/svelte-query'
import type {
  CreateQueryOptions,
  QueryFunctionContext,
  CreateMutationOptions,
} from '@tanstack/svelte-query'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/34-practical-storage-api'

/**
 * Generates Svelte Query cache key for GET /files
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetFilesQueryKey(args: InferRequestType<typeof client.files.$get>) {
  return ['files', 'GET', '/files', args] as const
}

/**
 * Returns Svelte Query query options for GET /files
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetFilesQueryOptions = (
  args: InferRequestType<typeof client.files.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetFilesQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.files.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /files
 *
 * ファイル一覧取得
 */
export function createGetFiles(
  args: InferRequestType<typeof client.files.$get>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.files.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetFilesQueryOptions(args, opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /files/upload
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostFilesUploadMutationKey() {
  return ['files', 'POST', '/files/upload'] as const
}

/**
 * Returns Svelte Query mutation options for POST /files/upload
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostFilesUploadMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostFilesUploadMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.files.upload.$post>) =>
    parseResponse(client.files.upload.$post(args, clientOptions)),
})

/**
 * POST /files/upload
 *
 * ファイルアップロード
 */
export function createPostFilesUpload(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.files.upload.$post>>>>
      >,
      Error,
      InferRequestType<typeof client.files.upload.$post>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostFilesUploadMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /files/upload/multipart/init
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostFilesUploadMultipartInitMutationKey() {
  return ['files', 'POST', '/files/upload/multipart/init'] as const
}

/**
 * Returns Svelte Query mutation options for POST /files/upload/multipart/init
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostFilesUploadMultipartInitMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostFilesUploadMultipartInitMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.files.upload.multipart.init.$post>) =>
    parseResponse(client.files.upload.multipart.init.$post(args, clientOptions)),
})

/**
 * POST /files/upload/multipart/init
 *
 * マルチパートアップロード開始
 *
 * 大容量ファイルの分割アップロードを開始します
 */
export function createPostFilesUploadMultipartInit(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<typeof client.files.upload.multipart.init.$post>>>
        >
      >,
      Error,
      InferRequestType<typeof client.files.upload.multipart.init.$post>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } =
      getPostFilesUploadMultipartInitMutationOptions(opts?.client)
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /files/upload/multipart/{uploadId}/part
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostFilesUploadMultipartUploadIdPartMutationKey() {
  return ['files', 'POST', '/files/upload/multipart/:uploadId/part'] as const
}

/**
 * Returns Svelte Query mutation options for POST /files/upload/multipart/{uploadId}/part
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostFilesUploadMultipartUploadIdPartMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostFilesUploadMultipartUploadIdPartMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.files.upload.multipart)[':uploadId']['part']['$post']>,
  ) => parseResponse(client.files.upload.multipart[':uploadId'].part.$post(args, clientOptions)),
})

/**
 * POST /files/upload/multipart/{uploadId}/part
 *
 * パートアップロード
 */
export function createPostFilesUploadMultipartUploadIdPart(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<(typeof client.files.upload.multipart)[':uploadId']['part']['$post']>
            >
          >
        >
      >,
      Error,
      InferRequestType<(typeof client.files.upload.multipart)[':uploadId']['part']['$post']>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } =
      getPostFilesUploadMultipartUploadIdPartMutationOptions(opts?.client)
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /files/upload/multipart/{uploadId}/complete
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostFilesUploadMultipartUploadIdCompleteMutationKey() {
  return ['files', 'POST', '/files/upload/multipart/:uploadId/complete'] as const
}

/**
 * Returns Svelte Query mutation options for POST /files/upload/multipart/{uploadId}/complete
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostFilesUploadMultipartUploadIdCompleteMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostFilesUploadMultipartUploadIdCompleteMutationKey(),
  mutationFn: async (
    args: InferRequestType<
      (typeof client.files.upload.multipart)[':uploadId']['complete']['$post']
    >,
  ) =>
    parseResponse(client.files.upload.multipart[':uploadId'].complete.$post(args, clientOptions)),
})

/**
 * POST /files/upload/multipart/{uploadId}/complete
 *
 * マルチパートアップロード完了
 */
export function createPostFilesUploadMultipartUploadIdComplete(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<(typeof client.files.upload.multipart)[':uploadId']['complete']['$post']>
            >
          >
        >
      >,
      Error,
      InferRequestType<(typeof client.files.upload.multipart)[':uploadId']['complete']['$post']>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } =
      getPostFilesUploadMultipartUploadIdCompleteMutationOptions(opts?.client)
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /files/{fileId}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetFilesFileIdQueryKey(
  args: InferRequestType<(typeof client.files)[':fileId']['$get']>,
) {
  return ['files', 'GET', '/files/:fileId', args] as const
}

/**
 * Returns Svelte Query query options for GET /files/{fileId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetFilesFileIdQueryOptions = (
  args: InferRequestType<(typeof client.files)[':fileId']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetFilesFileIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.files[':fileId'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /files/{fileId}
 *
 * ファイル情報取得
 */
export function createGetFilesFileId(
  args: InferRequestType<(typeof client.files)[':fileId']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.files)[':fileId']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetFilesFileIdQueryOptions(args, opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query mutation key for DELETE /files/{fileId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteFilesFileIdMutationKey() {
  return ['files', 'DELETE', '/files/:fileId'] as const
}

/**
 * Returns Svelte Query mutation options for DELETE /files/{fileId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteFilesFileIdMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getDeleteFilesFileIdMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.files)[':fileId']['$delete']>) =>
    parseResponse(client.files[':fileId'].$delete(args, clientOptions)),
})

/**
 * DELETE /files/{fileId}
 *
 * ファイル削除（ゴミ箱へ移動）
 */
export function createDeleteFilesFileId(
  options?: () => {
    mutation?: CreateMutationOptions<
      | Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<(typeof client.files)[':fileId']['$delete']>>>
          >
        >
      | undefined,
      Error,
      InferRequestType<(typeof client.files)[':fileId']['$delete']>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getDeleteFilesFileIdMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for PATCH /files/{fileId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPatchFilesFileIdMutationKey() {
  return ['files', 'PATCH', '/files/:fileId'] as const
}

/**
 * Returns Svelte Query mutation options for PATCH /files/{fileId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPatchFilesFileIdMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPatchFilesFileIdMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.files)[':fileId']['$patch']>) =>
    parseResponse(client.files[':fileId'].$patch(args, clientOptions)),
})

/**
 * PATCH /files/{fileId}
 *
 * ファイル情報更新
 */
export function createPatchFilesFileId(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.files)[':fileId']['$patch']>>>
        >
      >,
      Error,
      InferRequestType<(typeof client.files)[':fileId']['$patch']>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPatchFilesFileIdMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /files/{fileId}/download
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetFilesFileIdDownloadQueryKey(
  args: InferRequestType<(typeof client.files)[':fileId']['download']['$get']>,
) {
  return ['files', 'GET', '/files/:fileId/download', args] as const
}

/**
 * Returns Svelte Query query options for GET /files/{fileId}/download
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetFilesFileIdDownloadQueryOptions = (
  args: InferRequestType<(typeof client.files)[':fileId']['download']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetFilesFileIdDownloadQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.files[':fileId'].download.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /files/{fileId}/download
 *
 * ファイルダウンロード
 */
export function createGetFilesFileIdDownload(
  args: InferRequestType<(typeof client.files)[':fileId']['download']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.files)[':fileId']['download']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetFilesFileIdDownloadQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /files/{fileId}/download-url
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetFilesFileIdDownloadUrlQueryKey(
  args: InferRequestType<(typeof client.files)[':fileId']['download-url']['$get']>,
) {
  return ['files', 'GET', '/files/:fileId/download-url', args] as const
}

/**
 * Returns Svelte Query query options for GET /files/{fileId}/download-url
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetFilesFileIdDownloadUrlQueryOptions = (
  args: InferRequestType<(typeof client.files)[':fileId']['download-url']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetFilesFileIdDownloadUrlQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.files[':fileId']['download-url'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /files/{fileId}/download-url
 *
 * 署名付きダウンロードURL取得
 */
export function createGetFilesFileIdDownloadUrl(
  args: InferRequestType<(typeof client.files)[':fileId']['download-url']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.files)[':fileId']['download-url']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetFilesFileIdDownloadUrlQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /files/{fileId}/copy
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostFilesFileIdCopyMutationKey() {
  return ['files', 'POST', '/files/:fileId/copy'] as const
}

/**
 * Returns Svelte Query mutation options for POST /files/{fileId}/copy
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostFilesFileIdCopyMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostFilesFileIdCopyMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.files)[':fileId']['copy']['$post']>) =>
    parseResponse(client.files[':fileId'].copy.$post(args, clientOptions)),
})

/**
 * POST /files/{fileId}/copy
 *
 * ファイルコピー
 */
export function createPostFilesFileIdCopy(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.files)[':fileId']['copy']['$post']>>
          >
        >
      >,
      Error,
      InferRequestType<(typeof client.files)[':fileId']['copy']['$post']>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostFilesFileIdCopyMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /files/{fileId}/move
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostFilesFileIdMoveMutationKey() {
  return ['files', 'POST', '/files/:fileId/move'] as const
}

/**
 * Returns Svelte Query mutation options for POST /files/{fileId}/move
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostFilesFileIdMoveMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostFilesFileIdMoveMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.files)[':fileId']['move']['$post']>) =>
    parseResponse(client.files[':fileId'].move.$post(args, clientOptions)),
})

/**
 * POST /files/{fileId}/move
 *
 * ファイル移動
 */
export function createPostFilesFileIdMove(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.files)[':fileId']['move']['$post']>>
          >
        >
      >,
      Error,
      InferRequestType<(typeof client.files)[':fileId']['move']['$post']>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostFilesFileIdMoveMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /files/{fileId}/thumbnail
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetFilesFileIdThumbnailQueryKey(
  args: InferRequestType<(typeof client.files)[':fileId']['thumbnail']['$get']>,
) {
  return ['files', 'GET', '/files/:fileId/thumbnail', args] as const
}

/**
 * Returns Svelte Query query options for GET /files/{fileId}/thumbnail
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetFilesFileIdThumbnailQueryOptions = (
  args: InferRequestType<(typeof client.files)[':fileId']['thumbnail']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetFilesFileIdThumbnailQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.files[':fileId'].thumbnail.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /files/{fileId}/thumbnail
 *
 * サムネイル取得
 */
export function createGetFilesFileIdThumbnail(
  args: InferRequestType<(typeof client.files)[':fileId']['thumbnail']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.files)[':fileId']['thumbnail']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetFilesFileIdThumbnailQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /folders
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostFoldersMutationKey() {
  return ['folders', 'POST', '/folders'] as const
}

/**
 * Returns Svelte Query mutation options for POST /folders
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostFoldersMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostFoldersMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.folders.$post>) =>
    parseResponse(client.folders.$post(args, clientOptions)),
})

/**
 * POST /folders
 *
 * フォルダ作成
 */
export function createPostFolders(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.folders.$post>>>>>,
      Error,
      InferRequestType<typeof client.folders.$post>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostFoldersMutationOptions(opts?.client)
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /folders/{folderId}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetFoldersFolderIdQueryKey(
  args: InferRequestType<(typeof client.folders)[':folderId']['$get']>,
) {
  return ['folders', 'GET', '/folders/:folderId', args] as const
}

/**
 * Returns Svelte Query query options for GET /folders/{folderId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetFoldersFolderIdQueryOptions = (
  args: InferRequestType<(typeof client.folders)[':folderId']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetFoldersFolderIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.folders[':folderId'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /folders/{folderId}
 *
 * フォルダ情報取得
 */
export function createGetFoldersFolderId(
  args: InferRequestType<(typeof client.folders)[':folderId']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.folders)[':folderId']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetFoldersFolderIdQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query mutation key for DELETE /folders/{folderId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteFoldersFolderIdMutationKey() {
  return ['folders', 'DELETE', '/folders/:folderId'] as const
}

/**
 * Returns Svelte Query mutation options for DELETE /folders/{folderId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteFoldersFolderIdMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getDeleteFoldersFolderIdMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.folders)[':folderId']['$delete']>) =>
    parseResponse(client.folders[':folderId'].$delete(args, clientOptions)),
})

/**
 * DELETE /folders/{folderId}
 *
 * フォルダ削除
 */
export function createDeleteFoldersFolderId(
  options?: () => {
    mutation?: CreateMutationOptions<
      | Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.folders)[':folderId']['$delete']>>
            >
          >
        >
      | undefined,
      Error,
      InferRequestType<(typeof client.folders)[':folderId']['$delete']>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getDeleteFoldersFolderIdMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for PATCH /folders/{folderId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPatchFoldersFolderIdMutationKey() {
  return ['folders', 'PATCH', '/folders/:folderId'] as const
}

/**
 * Returns Svelte Query mutation options for PATCH /folders/{folderId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPatchFoldersFolderIdMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPatchFoldersFolderIdMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.folders)[':folderId']['$patch']>) =>
    parseResponse(client.folders[':folderId'].$patch(args, clientOptions)),
})

/**
 * PATCH /folders/{folderId}
 *
 * フォルダ情報更新
 */
export function createPatchFoldersFolderId(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.folders)[':folderId']['$patch']>>>
        >
      >,
      Error,
      InferRequestType<(typeof client.folders)[':folderId']['$patch']>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPatchFoldersFolderIdMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /files/{fileId}/share
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetFilesFileIdShareQueryKey(
  args: InferRequestType<(typeof client.files)[':fileId']['share']['$get']>,
) {
  return ['files', 'GET', '/files/:fileId/share', args] as const
}

/**
 * Returns Svelte Query query options for GET /files/{fileId}/share
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetFilesFileIdShareQueryOptions = (
  args: InferRequestType<(typeof client.files)[':fileId']['share']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetFilesFileIdShareQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.files[':fileId'].share.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /files/{fileId}/share
 *
 * 共有設定取得
 */
export function createGetFilesFileIdShare(
  args: InferRequestType<(typeof client.files)[':fileId']['share']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.files)[':fileId']['share']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetFilesFileIdShareQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /files/{fileId}/share
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostFilesFileIdShareMutationKey() {
  return ['files', 'POST', '/files/:fileId/share'] as const
}

/**
 * Returns Svelte Query mutation options for POST /files/{fileId}/share
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostFilesFileIdShareMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostFilesFileIdShareMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.files)[':fileId']['share']['$post']>) =>
    parseResponse(client.files[':fileId'].share.$post(args, clientOptions)),
})

/**
 * POST /files/{fileId}/share
 *
 * ファイル共有
 */
export function createPostFilesFileIdShare(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.files)[':fileId']['share']['$post']>>
          >
        >
      >,
      Error,
      InferRequestType<(typeof client.files)[':fileId']['share']['$post']>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostFilesFileIdShareMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for DELETE /files/{fileId}/share
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteFilesFileIdShareMutationKey() {
  return ['files', 'DELETE', '/files/:fileId/share'] as const
}

/**
 * Returns Svelte Query mutation options for DELETE /files/{fileId}/share
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteFilesFileIdShareMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getDeleteFilesFileIdShareMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.files)[':fileId']['share']['$delete']>,
  ) => parseResponse(client.files[':fileId'].share.$delete(args, clientOptions)),
})

/**
 * DELETE /files/{fileId}/share
 *
 * 共有解除
 */
export function createDeleteFilesFileIdShare(
  options?: () => {
    mutation?: CreateMutationOptions<
      | Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.files)[':fileId']['share']['$delete']>>
            >
          >
        >
      | undefined,
      Error,
      InferRequestType<(typeof client.files)[':fileId']['share']['$delete']>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getDeleteFilesFileIdShareMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /files/{fileId}/share/link
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostFilesFileIdShareLinkMutationKey() {
  return ['files', 'POST', '/files/:fileId/share/link'] as const
}

/**
 * Returns Svelte Query mutation options for POST /files/{fileId}/share/link
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostFilesFileIdShareLinkMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostFilesFileIdShareLinkMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.files)[':fileId']['share']['link']['$post']>,
  ) => parseResponse(client.files[':fileId'].share.link.$post(args, clientOptions)),
})

/**
 * POST /files/{fileId}/share/link
 *
 * 共有リンク作成
 */
export function createPostFilesFileIdShareLink(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.files)[':fileId']['share']['link']['$post']>>
          >
        >
      >,
      Error,
      InferRequestType<(typeof client.files)[':fileId']['share']['link']['$post']>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostFilesFileIdShareLinkMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /files/{fileId}/versions
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetFilesFileIdVersionsQueryKey(
  args: InferRequestType<(typeof client.files)[':fileId']['versions']['$get']>,
) {
  return ['files', 'GET', '/files/:fileId/versions', args] as const
}

/**
 * Returns Svelte Query query options for GET /files/{fileId}/versions
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetFilesFileIdVersionsQueryOptions = (
  args: InferRequestType<(typeof client.files)[':fileId']['versions']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetFilesFileIdVersionsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.files[':fileId'].versions.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /files/{fileId}/versions
 *
 * バージョン一覧取得
 */
export function createGetFilesFileIdVersions(
  args: InferRequestType<(typeof client.files)[':fileId']['versions']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.files)[':fileId']['versions']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetFilesFileIdVersionsQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /files/{fileId}/versions/{versionId}/restore
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostFilesFileIdVersionsVersionIdRestoreMutationKey() {
  return ['files', 'POST', '/files/:fileId/versions/:versionId/restore'] as const
}

/**
 * Returns Svelte Query mutation options for POST /files/{fileId}/versions/{versionId}/restore
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostFilesFileIdVersionsVersionIdRestoreMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostFilesFileIdVersionsVersionIdRestoreMutationKey(),
  mutationFn: async (
    args: InferRequestType<
      (typeof client.files)[':fileId']['versions'][':versionId']['restore']['$post']
    >,
  ) =>
    parseResponse(
      client.files[':fileId'].versions[':versionId'].restore.$post(args, clientOptions),
    ),
})

/**
 * POST /files/{fileId}/versions/{versionId}/restore
 *
 * バージョン復元
 */
export function createPostFilesFileIdVersionsVersionIdRestore(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.files)[':fileId']['versions'][':versionId']['restore']['$post']
              >
            >
          >
        >
      >,
      Error,
      InferRequestType<
        (typeof client.files)[':fileId']['versions'][':versionId']['restore']['$post']
      >
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } =
      getPostFilesFileIdVersionsVersionIdRestoreMutationOptions(opts?.client)
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /trash
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetTrashQueryKey(args: InferRequestType<typeof client.trash.$get>) {
  return ['trash', 'GET', '/trash', args] as const
}

/**
 * Returns Svelte Query query options for GET /trash
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetTrashQueryOptions = (
  args: InferRequestType<typeof client.trash.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetTrashQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.trash.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /trash
 *
 * ゴミ箱一覧取得
 */
export function createGetTrash(
  args: InferRequestType<typeof client.trash.$get>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.trash.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetTrashQueryOptions(args, opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query mutation key for DELETE /trash
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteTrashMutationKey() {
  return ['trash', 'DELETE', '/trash'] as const
}

/**
 * Returns Svelte Query mutation options for DELETE /trash
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteTrashMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getDeleteTrashMutationKey(),
  mutationFn: async () => parseResponse(client.trash.$delete(undefined, clientOptions)),
})

/**
 * DELETE /trash
 *
 * ゴミ箱を空にする
 */
export function createDeleteTrash(
  options?: () => {
    mutation?: CreateMutationOptions<
      | Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.trash.$delete>>>>>
      | undefined,
      Error,
      void
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getDeleteTrashMutationOptions(opts?.client)
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /trash/{fileId}/restore
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostTrashFileIdRestoreMutationKey() {
  return ['trash', 'POST', '/trash/:fileId/restore'] as const
}

/**
 * Returns Svelte Query mutation options for POST /trash/{fileId}/restore
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostTrashFileIdRestoreMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostTrashFileIdRestoreMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.trash)[':fileId']['restore']['$post']>,
  ) => parseResponse(client.trash[':fileId'].restore.$post(args, clientOptions)),
})

/**
 * POST /trash/{fileId}/restore
 *
 * ゴミ箱から復元
 */
export function createPostTrashFileIdRestore(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.trash)[':fileId']['restore']['$post']>>
          >
        >
      >,
      Error,
      InferRequestType<(typeof client.trash)[':fileId']['restore']['$post']>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostTrashFileIdRestoreMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /storage/usage
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetStorageUsageQueryKey() {
  return ['storage', 'GET', '/storage/usage'] as const
}

/**
 * Returns Svelte Query query options for GET /storage/usage
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetStorageUsageQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetStorageUsageQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.storage.usage.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /storage/usage
 *
 * ストレージ使用量取得
 */
export function createGetStorageUsage(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.storage.usage.$get>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetStorageUsageQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}
