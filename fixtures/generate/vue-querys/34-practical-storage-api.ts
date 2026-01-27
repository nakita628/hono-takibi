import { useQuery, useMutation } from '@tanstack/vue-query'
import type { UseQueryOptions, QueryFunctionContext, UseMutationOptions } from '@tanstack/vue-query'
import { unref } from 'vue'
import type { MaybeRef } from 'vue'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/34-practical-storage-api'

/**
 * Generates Vue Query cache key for GET /files
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetFilesQueryKey(args: MaybeRef<InferRequestType<typeof client.files.$get>>) {
  return ['files', '/files', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /files
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
export function useGetFiles(
  args: InferRequestType<typeof client.files.$get>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.files.$get>>>>>,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetFilesQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * POST /files/upload
 *
 * ファイルアップロード
 */
export function usePostFilesUpload(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.files.upload.$post>>>>
        >,
        Error,
        InferRequestType<typeof client.files.upload.$post>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.files.upload.$post>) =>
      parseResponse(client.files.upload.$post(args, clientOptions)),
  })
}

/**
 * POST /files/upload/multipart/init
 *
 * マルチパートアップロード開始
 *
 * 大容量ファイルの分割アップロードを開始します
 */
export function usePostFilesUploadMultipartInit(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<typeof client.files.upload.multipart.init.$post>>
            >
          >
        >,
        Error,
        InferRequestType<typeof client.files.upload.multipart.init.$post>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.files.upload.multipart.init.$post>) =>
      parseResponse(client.files.upload.multipart.init.$post(args, clientOptions)),
  })
}

/**
 * POST /files/upload/multipart/{uploadId}/part
 *
 * パートアップロード
 */
export function usePostFilesUploadMultipartUploadIdPart(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.files.upload.multipart)[':uploadId']['part']['$post']>,
    ) => parseResponse(client.files.upload.multipart[':uploadId'].part.$post(args, clientOptions)),
  })
}

/**
 * POST /files/upload/multipart/{uploadId}/complete
 *
 * マルチパートアップロード完了
 */
export function usePostFilesUploadMultipartUploadIdComplete(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.files.upload.multipart)[':uploadId']['complete']['$post']
      >,
    ) =>
      parseResponse(client.files.upload.multipart[':uploadId'].complete.$post(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /files/{fileId}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetFilesFileIdQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.files)[':fileId']['$get']>>,
) {
  return ['files', '/files/:fileId', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /files/{fileId}
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
export function useGetFilesFileId(
  args: InferRequestType<(typeof client.files)[':fileId']['$get']>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<Awaited<ReturnType<(typeof client.files)[':fileId']['$get']>>>
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetFilesFileIdQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * DELETE /files/{fileId}
 *
 * ファイル削除（ゴミ箱へ移動）
 */
export function useDeleteFilesFileId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        | Awaited<
            ReturnType<
              typeof parseResponse<Awaited<ReturnType<(typeof client.files)[':fileId']['$delete']>>>
            >
          >
        | undefined,
        Error,
        InferRequestType<(typeof client.files)[':fileId']['$delete']>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.files)[':fileId']['$delete']>) =>
      parseResponse(client.files[':fileId'].$delete(args, clientOptions)),
  })
}

/**
 * PATCH /files/{fileId}
 *
 * ファイル情報更新
 */
export function usePatchFilesFileId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<(typeof client.files)[':fileId']['$patch']>>>
          >
        >,
        Error,
        InferRequestType<(typeof client.files)[':fileId']['$patch']>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.files)[':fileId']['$patch']>) =>
      parseResponse(client.files[':fileId'].$patch(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /files/{fileId}/download
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetFilesFileIdDownloadQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.files)[':fileId']['download']['$get']>>,
) {
  return ['files', '/files/:fileId/download', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /files/{fileId}/download
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
export function useGetFilesFileIdDownload(
  args: InferRequestType<(typeof client.files)[':fileId']['download']['$get']>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.files)[':fileId']['download']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetFilesFileIdDownloadQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /files/{fileId}/download-url
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetFilesFileIdDownloadUrlQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.files)[':fileId']['download-url']['$get']>>,
) {
  return ['files', '/files/:fileId/download-url', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /files/{fileId}/download-url
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
export function useGetFilesFileIdDownloadUrl(
  args: InferRequestType<(typeof client.files)[':fileId']['download-url']['$get']>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.files)[':fileId']['download-url']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetFilesFileIdDownloadUrlQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * POST /files/{fileId}/copy
 *
 * ファイルコピー
 */
export function usePostFilesFileIdCopy(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.files)[':fileId']['copy']['$post']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.files)[':fileId']['copy']['$post']>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.files)[':fileId']['copy']['$post']>) =>
      parseResponse(client.files[':fileId'].copy.$post(args, clientOptions)),
  })
}

/**
 * POST /files/{fileId}/move
 *
 * ファイル移動
 */
export function usePostFilesFileIdMove(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.files)[':fileId']['move']['$post']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.files)[':fileId']['move']['$post']>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.files)[':fileId']['move']['$post']>) =>
      parseResponse(client.files[':fileId'].move.$post(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /files/{fileId}/thumbnail
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetFilesFileIdThumbnailQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.files)[':fileId']['thumbnail']['$get']>>,
) {
  return ['files', '/files/:fileId/thumbnail', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /files/{fileId}/thumbnail
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
export function useGetFilesFileIdThumbnail(
  args: InferRequestType<(typeof client.files)[':fileId']['thumbnail']['$get']>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.files)[':fileId']['thumbnail']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetFilesFileIdThumbnailQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * POST /folders
 *
 * フォルダ作成
 */
export function usePostFolders(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.folders.$post>>>>>,
        Error,
        InferRequestType<typeof client.folders.$post>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.folders.$post>) =>
      parseResponse(client.folders.$post(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /folders/{folderId}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetFoldersFolderIdQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.folders)[':folderId']['$get']>>,
) {
  return ['folders', '/folders/:folderId', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /folders/{folderId}
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
export function useGetFoldersFolderId(
  args: InferRequestType<(typeof client.folders)[':folderId']['$get']>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.folders)[':folderId']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetFoldersFolderIdQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * DELETE /folders/{folderId}
 *
 * フォルダ削除
 */
export function useDeleteFoldersFolderId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.folders)[':folderId']['$delete']>) =>
      parseResponse(client.folders[':folderId'].$delete(args, clientOptions)),
  })
}

/**
 * PATCH /folders/{folderId}
 *
 * フォルダ情報更新
 */
export function usePatchFoldersFolderId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.folders)[':folderId']['$patch']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.folders)[':folderId']['$patch']>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.folders)[':folderId']['$patch']>) =>
      parseResponse(client.folders[':folderId'].$patch(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /files/{fileId}/share
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetFilesFileIdShareQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.files)[':fileId']['share']['$get']>>,
) {
  return ['files', '/files/:fileId/share', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /files/{fileId}/share
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
export function useGetFilesFileIdShare(
  args: InferRequestType<(typeof client.files)[':fileId']['share']['$get']>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.files)[':fileId']['share']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetFilesFileIdShareQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * POST /files/{fileId}/share
 *
 * ファイル共有
 */
export function usePostFilesFileIdShare(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.files)[':fileId']['share']['$post']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.files)[':fileId']['share']['$post']>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.files)[':fileId']['share']['$post']>,
    ) => parseResponse(client.files[':fileId'].share.$post(args, clientOptions)),
  })
}

/**
 * DELETE /files/{fileId}/share
 *
 * 共有解除
 */
export function useDeleteFilesFileIdShare(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.files)[':fileId']['share']['$delete']>,
    ) => parseResponse(client.files[':fileId'].share.$delete(args, clientOptions)),
  })
}

/**
 * POST /files/{fileId}/share/link
 *
 * 共有リンク作成
 */
export function usePostFilesFileIdShareLink(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.files)[':fileId']['share']['link']['$post']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.files)[':fileId']['share']['link']['$post']>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.files)[':fileId']['share']['link']['$post']>,
    ) => parseResponse(client.files[':fileId'].share.link.$post(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /files/{fileId}/versions
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetFilesFileIdVersionsQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.files)[':fileId']['versions']['$get']>>,
) {
  return ['files', '/files/:fileId/versions', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /files/{fileId}/versions
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
export function useGetFilesFileIdVersions(
  args: InferRequestType<(typeof client.files)[':fileId']['versions']['$get']>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.files)[':fileId']['versions']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetFilesFileIdVersionsQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * POST /files/{fileId}/versions/{versionId}/restore
 *
 * バージョン復元
 */
export function usePostFilesFileIdVersionsVersionIdRestore(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.files)[':fileId']['versions'][':versionId']['restore']['$post']
      >,
    ) =>
      parseResponse(
        client.files[':fileId'].versions[':versionId'].restore.$post(args, clientOptions),
      ),
  })
}

/**
 * Generates Vue Query cache key for GET /trash
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetTrashQueryKey(args: MaybeRef<InferRequestType<typeof client.trash.$get>>) {
  return ['trash', '/trash', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /trash
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
export function useGetTrash(
  args: InferRequestType<typeof client.trash.$get>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.trash.$get>>>>>,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetTrashQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * DELETE /trash
 *
 * ゴミ箱を空にする
 */
export function useDeleteTrash(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        | Awaited<
            ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.trash.$delete>>>>
          >
        | undefined,
        Error,
        void
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async () => parseResponse(client.trash.$delete(undefined, clientOptions)),
  })
}

/**
 * POST /trash/{fileId}/restore
 *
 * ゴミ箱から復元
 */
export function usePostTrashFileIdRestore(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.trash)[':fileId']['restore']['$post']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.trash)[':fileId']['restore']['$post']>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.trash)[':fileId']['restore']['$post']>,
    ) => parseResponse(client.trash[':fileId'].restore.$post(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /storage/usage
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetStorageUsageQueryKey() {
  return ['storage', '/storage/usage'] as const
}

/**
 * Returns Vue Query query options for GET /storage/usage
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
export function useGetStorageUsage(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.storage.usage.$get>>>>
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetStorageUsageQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}
