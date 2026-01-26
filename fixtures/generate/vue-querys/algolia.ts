import { queryOptions, useMutation, useQuery } from '@tanstack/vue-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/algolia'

/**
 * GET /{path}
 *
 * Send requests to the Algolia REST API
 *
 * This method lets you send requests to the Algolia REST API.
 */
export function useGetPath(
  args: InferRequestType<(typeof client)[':path']['$get']>,
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
      placeholderData?:
        | InferResponseType<(typeof client)[':path']['$get']>
        | (() => InferResponseType<(typeof client)[':path']['$get']>)
      initialData?:
        | InferResponseType<(typeof client)[':path']['$get']>
        | (() => InferResponseType<(typeof client)[':path']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetPathQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client[':path'].$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /{path}
 */
export function getGetPathQueryKey(args: InferRequestType<(typeof client)[':path']['$get']>) {
  return ['/:path', args] as const
}

/**
 * Returns Vue Query query options for GET /{path}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetPathQueryOptions = (
  args: InferRequestType<(typeof client)[':path']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetPathQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client[':path'].$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
  })

/**
 * PUT /{path}
 *
 * Send requests to the Algolia REST API
 *
 * This method lets you send requests to the Algolia REST API.
 */
export function usePutPath(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client)[':path']['$put']>,
      variables: InferRequestType<(typeof client)[':path']['$put']>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<(typeof client)[':path']['$put']>) => void
    onSettled?: (
      data: InferResponseType<(typeof client)[':path']['$put']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client)[':path']['$put']>,
    ) => void
    onMutate?: (variables: InferRequestType<(typeof client)[':path']['$put']>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<(typeof client)[':path']['$put']>) =>
      parseResponse(client[':path'].$put(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /{path}
 *
 * Send requests to the Algolia REST API
 *
 * This method lets you send requests to the Algolia REST API.
 */
export function usePostPath(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client)[':path']['$post']>,
      variables: InferRequestType<(typeof client)[':path']['$post']>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<(typeof client)[':path']['$post']>) => void
    onSettled?: (
      data: InferResponseType<(typeof client)[':path']['$post']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client)[':path']['$post']>,
    ) => void
    onMutate?: (variables: InferRequestType<(typeof client)[':path']['$post']>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<(typeof client)[':path']['$post']>) =>
      parseResponse(client[':path'].$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * DELETE /{path}
 *
 * Send requests to the Algolia REST API
 *
 * This method lets you send requests to the Algolia REST API.
 */
export function useDeletePath(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client)[':path']['$delete']>,
      variables: InferRequestType<(typeof client)[':path']['$delete']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client)[':path']['$delete']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client)[':path']['$delete']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client)[':path']['$delete']>,
    ) => void
    onMutate?: (variables: InferRequestType<(typeof client)[':path']['$delete']>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<(typeof client)[':path']['$delete']>) =>
      parseResponse(client[':path'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /1/indexes/{indexName}/query
 *
 * Search an index
 *
 * Searches a single index and returns matching search results as hits.
 *
 * This method lets you retrieve up to 1,000 hits.
 * If you need more, use the [`browse` operation](https://www.algolia.com/doc/rest-api/search/browse) or increase the `paginatedLimitedTo` index setting.
 */
export function usePost1IndexesIndexNameQuery(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client)['1']['indexes'][':indexName']['query']['$post']>,
      variables: InferRequestType<(typeof client)['1']['indexes'][':indexName']['query']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client)['1']['indexes'][':indexName']['query']['$post']>,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client)['1']['indexes'][':indexName']['query']['$post']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client)['1']['indexes'][':indexName']['query']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client)['1']['indexes'][':indexName']['query']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client)['1']['indexes'][':indexName']['query']['$post']>,
    ) => parseResponse(client['1'].indexes[':indexName'].query.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /1/indexes/[*]/queries
 *
 * Search multiple indices
 *
 * Sends multiple search requests to one or more indices.
 *
 * This can be useful in these cases:
 *
 * - Different indices for different purposes, such as, one index for products, another one for marketing content.
 * - Multiple searches to the same index—for example, with different filters.
 *
 * Use the helper `searchForHits` or `searchForFacets` to get the results in a more convenient format, if you already know the return type you want.
 */
export function usePost1IndexesQueries(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client)['1']['indexes']['*']['queries']['$post']>,
      variables: InferRequestType<(typeof client)['1']['indexes']['*']['queries']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client)['1']['indexes']['*']['queries']['$post']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client)['1']['indexes']['*']['queries']['$post']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client)['1']['indexes']['*']['queries']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client)['1']['indexes']['*']['queries']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client)['1']['indexes']['*']['queries']['$post']>,
    ) => parseResponse(client['1'].indexes['*'].queries.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /1/indexes/{indexName}/facets/{facetName}/query
 *
 * Search for facet values
 *
 * Searches for values of a specified facet attribute.
 *
 * - By default, facet values are sorted by decreasing count.
 *   You can adjust this with the `sortFacetValueBy` parameter.
 * - Searching for facet values doesn't work if you have **more than 65 searchable facets and searchable attributes combined**.
 */
export function usePost1IndexesIndexNameFacetsFacetNameQuery(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<
        (typeof client)['1']['indexes'][':indexName']['facets'][':facetName']['query']['$post']
      >,
      variables: InferRequestType<
        (typeof client)['1']['indexes'][':indexName']['facets'][':facetName']['query']['$post']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client)['1']['indexes'][':indexName']['facets'][':facetName']['query']['$post']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client)['1']['indexes'][':indexName']['facets'][':facetName']['query']['$post']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client)['1']['indexes'][':indexName']['facets'][':facetName']['query']['$post']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client)['1']['indexes'][':indexName']['facets'][':facetName']['query']['$post']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['1']['indexes'][':indexName']['facets'][':facetName']['query']['$post']
      >,
    ) =>
      parseResponse(
        client['1'].indexes[':indexName'].facets[':facetName'].query.$post(args, clientOptions),
      ),
    ...mutationOptions,
  })
}

/**
 * POST /1/indexes/{indexName}/browse
 *
 * Browse for records
 *
 * Retrieves records from an index, up to 1,000 per request.
 *
 * While searching retrieves _hits_ (records augmented with attributes for highlighting and ranking details),
 * browsing _just_ returns matching records.
 * This can be useful if you want to export your indices.
 *
 * - The Analytics API doesn't collect data when using `browse`.
 * - Records are ranked by attributes and custom ranking.
 * - There's no ranking for: typo-tolerance, number of matched words, proximity, geo distance.
 *
 * Browse requests automatically apply these settings:
 *
 * - `advancedSyntax`: `false`
 * - `attributesToHighlight`: `[]`
 * - `attributesToSnippet`: `[]`
 * - `distinct`: `false`
 * - `enablePersonalization`: `false`
 * - `enableRules`: `false`
 * - `facets`: `[]`
 * - `getRankingInfo`: `false`
 * - `ignorePlurals`: `false`
 * - `optionalFilters`: `[]`
 * - `typoTolerance`: `true` or `false` (`min` and `strict` evaluate to `true`)
 *
 * If you send these parameters with your browse requests, they'll be ignored.
 */
export function usePost1IndexesIndexNameBrowse(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client)['1']['indexes'][':indexName']['browse']['$post']>,
      variables: InferRequestType<(typeof client)['1']['indexes'][':indexName']['browse']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client)['1']['indexes'][':indexName']['browse']['$post']>,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client)['1']['indexes'][':indexName']['browse']['$post']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client)['1']['indexes'][':indexName']['browse']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client)['1']['indexes'][':indexName']['browse']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client)['1']['indexes'][':indexName']['browse']['$post']>,
    ) => parseResponse(client['1'].indexes[':indexName'].browse.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /1/indexes/{indexName}
 *
 * Add a new record (with auto-generated object ID)
 *
 * Adds a record to an index or replaces it.
 *
 * - If the record doesn't have an object ID, a new record with an auto-generated object ID is added to your index.
 * - If a record with the specified object ID exists, the existing record is replaced.
 * - If a record with the specified object ID doesn't exist, a new record is added to your index.
 * - If you add a record to an index that doesn't exist yet, a new index is created.
 *
 * To update _some_ attributes of a record, use the [`partial` operation](https://www.algolia.com/doc/rest-api/search/partial-update-object).
 * To add, update, or replace multiple records, use the [`batch` operation](https://www.algolia.com/doc/rest-api/search/batch).
 *
 * This operation is subject to [indexing rate limits](https://support.algolia.com/hc/articles/4406975251089-Is-there-a-rate-limit-for-indexing-on-Algolia).
 */
export function usePost1IndexesIndexName(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client)['1']['indexes'][':indexName']['$post']>,
      variables: InferRequestType<(typeof client)['1']['indexes'][':indexName']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client)['1']['indexes'][':indexName']['$post']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client)['1']['indexes'][':indexName']['$post']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client)['1']['indexes'][':indexName']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client)['1']['indexes'][':indexName']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client)['1']['indexes'][':indexName']['$post']>,
    ) => parseResponse(client['1'].indexes[':indexName'].$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * DELETE /1/indexes/{indexName}
 *
 * Delete an index
 *
 * Deletes an index and all its settings.
 *
 * - Deleting an index doesn't delete its analytics data.
 * - If you try to delete a non-existing index, the operation is ignored without warning.
 * - If the index you want to delete has replica indices, the replicas become independent indices.
 * - If the index you want to delete is a replica index, you must first unlink it from its primary index before you can delete it.
 *   For more information, see [Delete replica indices](https://www.algolia.com/doc/guides/managing-results/refine-results/sorting/how-to/deleting-replicas).
 */
export function useDelete1IndexesIndexName(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client)['1']['indexes'][':indexName']['$delete']>,
      variables: InferRequestType<(typeof client)['1']['indexes'][':indexName']['$delete']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client)['1']['indexes'][':indexName']['$delete']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client)['1']['indexes'][':indexName']['$delete']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client)['1']['indexes'][':indexName']['$delete']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client)['1']['indexes'][':indexName']['$delete']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client)['1']['indexes'][':indexName']['$delete']>,
    ) => parseResponse(client['1'].indexes[':indexName'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /1/indexes/{indexName}/{objectID}
 *
 * Retrieve a record
 *
 * Retrieves one record by its object ID.
 *
 * To retrieve more than one record, use the [`objects` operation](https://www.algolia.com/doc/rest-api/search/get-objects).
 */
export function useGet1IndexesIndexNameObjectID(
  args: InferRequestType<(typeof client)['1']['indexes'][':indexName'][':objectID']['$get']>,
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
      placeholderData?:
        | InferResponseType<(typeof client)['1']['indexes'][':indexName'][':objectID']['$get']>
        | (() => InferResponseType<
            (typeof client)['1']['indexes'][':indexName'][':objectID']['$get']
          >)
      initialData?:
        | InferResponseType<(typeof client)['1']['indexes'][':indexName'][':objectID']['$get']>
        | (() => InferResponseType<
            (typeof client)['1']['indexes'][':indexName'][':objectID']['$get']
          >)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGet1IndexesIndexNameObjectIDQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client['1'].indexes[':indexName'][':objectID'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /1/indexes/{indexName}/{objectID}
 */
export function getGet1IndexesIndexNameObjectIDQueryKey(
  args: InferRequestType<(typeof client)['1']['indexes'][':indexName'][':objectID']['$get']>,
) {
  return ['/1/indexes/:indexName/:objectID', args] as const
}

/**
 * Returns Vue Query query options for GET /1/indexes/{indexName}/{objectID}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet1IndexesIndexNameObjectIDQueryOptions = (
  args: InferRequestType<(typeof client)['1']['indexes'][':indexName'][':objectID']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGet1IndexesIndexNameObjectIDQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client['1'].indexes[':indexName'][':objectID'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * PUT /1/indexes/{indexName}/{objectID}
 *
 * Add or replace a record
 *
 * If a record with the specified object ID exists, the existing record is replaced.
 * Otherwise, a new record is added to the index.
 *
 * If you want to use auto-generated object IDs, use the [`saveObject` operation](https://www.algolia.com/doc/rest-api/search/save-object).
 * To update _some_ attributes of an existing record, use the [`partial` operation](https://www.algolia.com/doc/rest-api/search/partial-update-object) instead.
 * To add, update, or replace multiple records, use the [`batch` operation](https://www.algolia.com/doc/rest-api/search/batch).
 */
export function usePut1IndexesIndexNameObjectID(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client)['1']['indexes'][':indexName'][':objectID']['$put']>,
      variables: InferRequestType<
        (typeof client)['1']['indexes'][':indexName'][':objectID']['$put']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client)['1']['indexes'][':indexName'][':objectID']['$put']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client)['1']['indexes'][':indexName'][':objectID']['$put']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client)['1']['indexes'][':indexName'][':objectID']['$put']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client)['1']['indexes'][':indexName'][':objectID']['$put']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client)['1']['indexes'][':indexName'][':objectID']['$put']>,
    ) => parseResponse(client['1'].indexes[':indexName'][':objectID'].$put(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * DELETE /1/indexes/{indexName}/{objectID}
 *
 * Delete a record
 *
 * Deletes a record by its object ID.
 *
 * To delete more than one record, use the [`batch` operation](https://www.algolia.com/doc/rest-api/search/batch).
 * To delete records matching a query, use the [`deleteBy` operation](https://www.algolia.com/doc/rest-api/search/delete-by).
 */
export function useDelete1IndexesIndexNameObjectID(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<
        (typeof client)['1']['indexes'][':indexName'][':objectID']['$delete']
      >,
      variables: InferRequestType<
        (typeof client)['1']['indexes'][':indexName'][':objectID']['$delete']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client)['1']['indexes'][':indexName'][':objectID']['$delete']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client)['1']['indexes'][':indexName'][':objectID']['$delete']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client)['1']['indexes'][':indexName'][':objectID']['$delete']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client)['1']['indexes'][':indexName'][':objectID']['$delete']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client)['1']['indexes'][':indexName'][':objectID']['$delete']>,
    ) => parseResponse(client['1'].indexes[':indexName'][':objectID'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /1/indexes/{indexName}/deleteByQuery
 *
 * Delete records matching a filter
 *
 * This operation doesn't accept empty filters.
 *
 * This operation is resource-intensive.
 * You should only use it if you can't get the object IDs of the records you want to delete.
 * It's more efficient to get a list of object IDs with the [`browse` operation](https://www.algolia.com/doc/rest-api/search/browse),
 * and then delete the records using the [`batch` operation](https://www.algolia.com/doc/rest-api/search/batch).
 *
 * This operation is subject to [indexing rate limits](https://support.algolia.com/hc/articles/4406975251089-Is-there-a-rate-limit-for-indexing-on-Algolia).
 */
export function usePost1IndexesIndexNameDeleteByQuery(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<
        (typeof client)['1']['indexes'][':indexName']['deleteByQuery']['$post']
      >,
      variables: InferRequestType<
        (typeof client)['1']['indexes'][':indexName']['deleteByQuery']['$post']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client)['1']['indexes'][':indexName']['deleteByQuery']['$post']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client)['1']['indexes'][':indexName']['deleteByQuery']['$post']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client)['1']['indexes'][':indexName']['deleteByQuery']['$post']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client)['1']['indexes'][':indexName']['deleteByQuery']['$post']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['1']['indexes'][':indexName']['deleteByQuery']['$post']
      >,
    ) => parseResponse(client['1'].indexes[':indexName'].deleteByQuery.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /1/indexes/{indexName}/clear
 *
 * Delete all records from an index
 *
 * Deletes only the records from an index while keeping settings, synonyms, and rules.
 * This operation is resource-intensive and subject to [indexing rate limits](https://support.algolia.com/hc/articles/4406975251089-Is-there-a-rate-limit-for-indexing-on-Algolia).
 */
export function usePost1IndexesIndexNameClear(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client)['1']['indexes'][':indexName']['clear']['$post']>,
      variables: InferRequestType<(typeof client)['1']['indexes'][':indexName']['clear']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client)['1']['indexes'][':indexName']['clear']['$post']>,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client)['1']['indexes'][':indexName']['clear']['$post']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client)['1']['indexes'][':indexName']['clear']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client)['1']['indexes'][':indexName']['clear']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client)['1']['indexes'][':indexName']['clear']['$post']>,
    ) => parseResponse(client['1'].indexes[':indexName'].clear.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /1/indexes/{indexName}/{objectID}/partial
 *
 * Add or update attributes
 *
 * Adds new attributes to a record, or updates existing ones.
 *
 * - If a record with the specified object ID doesn't exist,
 *   a new record is added to the index **if** `createIfNotExists` is true.
 * - If the index doesn't exist yet, this method creates a new index.
 * - You can use any first-level attribute but not nested attributes.
 *   If you specify a nested attribute, this operation replaces its first-level ancestor.
 *
 * To update an attribute without pushing the entire record, you can use these built-in operations.
 * These operations can be helpful if you don't have access to your initial data.
 *
 * - Increment: increment a numeric attribute
 * - Decrement: decrement a numeric attribute
 * - Add: append a number or string element to an array attribute
 * - Remove: remove all matching number or string elements from an array attribute made of numbers or strings
 * - AddUnique: add a number or string element to an array attribute made of numbers or strings only if it's not already present
 * - IncrementFrom: increment a numeric integer attribute only if the provided value matches the current value, and otherwise ignore the whole object update. For example, if you pass an IncrementFrom value of 2 for the version attribute, but the current value of the attribute is 1, the engine ignores the update. If the object doesn't exist, the engine only creates it if you pass an IncrementFrom value of 0.
 * - IncrementSet: increment a numeric integer attribute only if the provided value is greater than the current value, and otherwise ignore the whole object update. For example, if you pass an IncrementSet value of 2 for the version attribute, and the current value of the attribute is 1, the engine updates the object. If the object doesn't exist yet, the engine only creates it if you pass an IncrementSet value greater than 0.
 *
 * You can specify an operation by providing an object with the attribute to update as the key and its value being an object with the following properties:
 *
 * - _operation: the operation to apply on the attribute
 * - value: the right-hand side argument to the operation, for example, increment or decrement step, value to add or remove.
 *
 * When updating multiple attributes or using multiple operations targeting the same record, you should use a single partial update for faster processing.
 *
 * This operation is subject to [indexing rate limits](https://support.algolia.com/hc/articles/4406975251089-Is-there-a-rate-limit-for-indexing-on-Algolia).
 */
export function usePost1IndexesIndexNameObjectIDPartial(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<
        (typeof client)['1']['indexes'][':indexName'][':objectID']['partial']['$post']
      >,
      variables: InferRequestType<
        (typeof client)['1']['indexes'][':indexName'][':objectID']['partial']['$post']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client)['1']['indexes'][':indexName'][':objectID']['partial']['$post']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client)['1']['indexes'][':indexName'][':objectID']['partial']['$post']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client)['1']['indexes'][':indexName'][':objectID']['partial']['$post']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client)['1']['indexes'][':indexName'][':objectID']['partial']['$post']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['1']['indexes'][':indexName'][':objectID']['partial']['$post']
      >,
    ) =>
      parseResponse(
        client['1'].indexes[':indexName'][':objectID'].partial.$post(args, clientOptions),
      ),
    ...mutationOptions,
  })
}

/**
 * POST /1/indexes/{indexName}/batch
 *
 * Batch indexing operations on one index
 *
 * Adds, updates, or deletes records in one index with a single API request.
 *
 * Batching index updates reduces latency and increases data integrity.
 *
 * - Actions are applied in the order they're specified.
 * - Actions are equivalent to the individual API requests of the same name.
 *
 * This operation is subject to [indexing rate limits](https://support.algolia.com/hc/articles/4406975251089-Is-there-a-rate-limit-for-indexing-on-Algolia).
 */
export function usePost1IndexesIndexNameBatch(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client)['1']['indexes'][':indexName']['batch']['$post']>,
      variables: InferRequestType<(typeof client)['1']['indexes'][':indexName']['batch']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client)['1']['indexes'][':indexName']['batch']['$post']>,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client)['1']['indexes'][':indexName']['batch']['$post']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client)['1']['indexes'][':indexName']['batch']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client)['1']['indexes'][':indexName']['batch']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client)['1']['indexes'][':indexName']['batch']['$post']>,
    ) => parseResponse(client['1'].indexes[':indexName'].batch.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /1/indexes/[*]/batch
 *
 * Batch indexing operations on multiple indices
 *
 * Adds, updates, or deletes records in multiple indices with a single API request.
 *
 * - Actions are applied in the order they are specified.
 * - Actions are equivalent to the individual API requests of the same name.
 *
 * This operation is subject to [indexing rate limits](https://support.algolia.com/hc/articles/4406975251089-Is-there-a-rate-limit-for-indexing-on-Algolia).
 */
export function usePost1IndexesBatch(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client)['1']['indexes']['*']['batch']['$post']>,
      variables: InferRequestType<(typeof client)['1']['indexes']['*']['batch']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client)['1']['indexes']['*']['batch']['$post']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client)['1']['indexes']['*']['batch']['$post']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client)['1']['indexes']['*']['batch']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client)['1']['indexes']['*']['batch']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client)['1']['indexes']['*']['batch']['$post']>,
    ) => parseResponse(client['1'].indexes['*'].batch.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /1/indexes/[*]/objects
 *
 * Retrieve records
 *
 * Retrieves one or more records, potentially from different indices.
 *
 * Records are returned in the same order as the requests.
 */
export function usePost1IndexesObjects(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client)['1']['indexes']['*']['objects']['$post']>,
      variables: InferRequestType<(typeof client)['1']['indexes']['*']['objects']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client)['1']['indexes']['*']['objects']['$post']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client)['1']['indexes']['*']['objects']['$post']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client)['1']['indexes']['*']['objects']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client)['1']['indexes']['*']['objects']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client)['1']['indexes']['*']['objects']['$post']>,
    ) => parseResponse(client['1'].indexes['*'].objects.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /1/indexes/{indexName}/settings
 *
 * Retrieve index settings
 *
 * Retrieves an object with non-null index settings.
 */
export function useGet1IndexesIndexNameSettings(
  args: InferRequestType<(typeof client)['1']['indexes'][':indexName']['settings']['$get']>,
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
      placeholderData?:
        | InferResponseType<(typeof client)['1']['indexes'][':indexName']['settings']['$get']>
        | (() => InferResponseType<
            (typeof client)['1']['indexes'][':indexName']['settings']['$get']
          >)
      initialData?:
        | InferResponseType<(typeof client)['1']['indexes'][':indexName']['settings']['$get']>
        | (() => InferResponseType<
            (typeof client)['1']['indexes'][':indexName']['settings']['$get']
          >)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGet1IndexesIndexNameSettingsQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client['1'].indexes[':indexName'].settings.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /1/indexes/{indexName}/settings
 */
export function getGet1IndexesIndexNameSettingsQueryKey(
  args: InferRequestType<(typeof client)['1']['indexes'][':indexName']['settings']['$get']>,
) {
  return ['/1/indexes/:indexName/settings', args] as const
}

/**
 * Returns Vue Query query options for GET /1/indexes/{indexName}/settings
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet1IndexesIndexNameSettingsQueryOptions = (
  args: InferRequestType<(typeof client)['1']['indexes'][':indexName']['settings']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGet1IndexesIndexNameSettingsQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client['1'].indexes[':indexName'].settings.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * PUT /1/indexes/{indexName}/settings
 *
 * Update index settings
 *
 * Update the specified index settings.
 *
 * Index settings that you don't specify are left unchanged.
 * Specify `null` to reset a setting to its default value.
 *
 * For best performance, update the index settings before you add new records to your index.
 */
export function usePut1IndexesIndexNameSettings(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client)['1']['indexes'][':indexName']['settings']['$put']>,
      variables: InferRequestType<
        (typeof client)['1']['indexes'][':indexName']['settings']['$put']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client)['1']['indexes'][':indexName']['settings']['$put']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client)['1']['indexes'][':indexName']['settings']['$put']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client)['1']['indexes'][':indexName']['settings']['$put']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client)['1']['indexes'][':indexName']['settings']['$put']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client)['1']['indexes'][':indexName']['settings']['$put']>,
    ) => parseResponse(client['1'].indexes[':indexName'].settings.$put(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /1/indexes/{indexName}/synonyms/{objectID}
 *
 * Retrieve a synonym
 *
 * Retrieves a synonym by its ID.
 * To find the object IDs for your synonyms,
 * use the [`search` operation](https://www.algolia.com/doc/rest-api/search/search-synonyms).
 */
export function useGet1IndexesIndexNameSynonymsObjectID(
  args: InferRequestType<
    (typeof client)['1']['indexes'][':indexName']['synonyms'][':objectID']['$get']
  >,
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
      placeholderData?:
        | InferResponseType<
            (typeof client)['1']['indexes'][':indexName']['synonyms'][':objectID']['$get']
          >
        | (() => InferResponseType<
            (typeof client)['1']['indexes'][':indexName']['synonyms'][':objectID']['$get']
          >)
      initialData?:
        | InferResponseType<
            (typeof client)['1']['indexes'][':indexName']['synonyms'][':objectID']['$get']
          >
        | (() => InferResponseType<
            (typeof client)['1']['indexes'][':indexName']['synonyms'][':objectID']['$get']
          >)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGet1IndexesIndexNameSynonymsObjectIDQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client['1'].indexes[':indexName'].synonyms[':objectID'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /1/indexes/{indexName}/synonyms/{objectID}
 */
export function getGet1IndexesIndexNameSynonymsObjectIDQueryKey(
  args: InferRequestType<
    (typeof client)['1']['indexes'][':indexName']['synonyms'][':objectID']['$get']
  >,
) {
  return ['/1/indexes/:indexName/synonyms/:objectID', args] as const
}

/**
 * Returns Vue Query query options for GET /1/indexes/{indexName}/synonyms/{objectID}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet1IndexesIndexNameSynonymsObjectIDQueryOptions = (
  args: InferRequestType<
    (typeof client)['1']['indexes'][':indexName']['synonyms'][':objectID']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGet1IndexesIndexNameSynonymsObjectIDQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client['1'].indexes[':indexName'].synonyms[':objectID'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * PUT /1/indexes/{indexName}/synonyms/{objectID}
 *
 * Create or replace a synonym
 *
 * If a synonym with the specified object ID doesn't exist, Algolia adds a new one.
 * Otherwise, the existing synonym is replaced.
 * To add multiple synonyms in a single API request, use the [`batch` operation](https://www.algolia.com/doc/rest-api/search/save-synonyms).
 */
export function usePut1IndexesIndexNameSynonymsObjectID(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<
        (typeof client)['1']['indexes'][':indexName']['synonyms'][':objectID']['$put']
      >,
      variables: InferRequestType<
        (typeof client)['1']['indexes'][':indexName']['synonyms'][':objectID']['$put']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client)['1']['indexes'][':indexName']['synonyms'][':objectID']['$put']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client)['1']['indexes'][':indexName']['synonyms'][':objectID']['$put']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client)['1']['indexes'][':indexName']['synonyms'][':objectID']['$put']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client)['1']['indexes'][':indexName']['synonyms'][':objectID']['$put']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['1']['indexes'][':indexName']['synonyms'][':objectID']['$put']
      >,
    ) =>
      parseResponse(
        client['1'].indexes[':indexName'].synonyms[':objectID'].$put(args, clientOptions),
      ),
    ...mutationOptions,
  })
}

/**
 * DELETE /1/indexes/{indexName}/synonyms/{objectID}
 *
 * Delete a synonym
 *
 * Deletes a synonym by its ID.
 * To find the object IDs of your synonyms, use the [`search` operation](https://www.algolia.com/doc/rest-api/search/search-synonyms).
 */
export function useDelete1IndexesIndexNameSynonymsObjectID(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<
        (typeof client)['1']['indexes'][':indexName']['synonyms'][':objectID']['$delete']
      >,
      variables: InferRequestType<
        (typeof client)['1']['indexes'][':indexName']['synonyms'][':objectID']['$delete']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client)['1']['indexes'][':indexName']['synonyms'][':objectID']['$delete']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client)['1']['indexes'][':indexName']['synonyms'][':objectID']['$delete']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client)['1']['indexes'][':indexName']['synonyms'][':objectID']['$delete']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client)['1']['indexes'][':indexName']['synonyms'][':objectID']['$delete']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['1']['indexes'][':indexName']['synonyms'][':objectID']['$delete']
      >,
    ) =>
      parseResponse(
        client['1'].indexes[':indexName'].synonyms[':objectID'].$delete(args, clientOptions),
      ),
    ...mutationOptions,
  })
}

/**
 * POST /1/indexes/{indexName}/synonyms/batch
 *
 * Create or replace synonyms
 *
 * If a synonym with the `objectID` doesn't exist, Algolia adds a new one.
 * Otherwise, existing synonyms are replaced.
 *
 * This operation is subject to [indexing rate limits](https://support.algolia.com/hc/articles/4406975251089-Is-there-a-rate-limit-for-indexing-on-Algolia).
 */
export function usePost1IndexesIndexNameSynonymsBatch(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<
        (typeof client)['1']['indexes'][':indexName']['synonyms']['batch']['$post']
      >,
      variables: InferRequestType<
        (typeof client)['1']['indexes'][':indexName']['synonyms']['batch']['$post']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client)['1']['indexes'][':indexName']['synonyms']['batch']['$post']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client)['1']['indexes'][':indexName']['synonyms']['batch']['$post']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client)['1']['indexes'][':indexName']['synonyms']['batch']['$post']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client)['1']['indexes'][':indexName']['synonyms']['batch']['$post']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['1']['indexes'][':indexName']['synonyms']['batch']['$post']
      >,
    ) => parseResponse(client['1'].indexes[':indexName'].synonyms.batch.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /1/indexes/{indexName}/synonyms/clear
 *
 * Delete all synonyms
 *
 * Deletes all synonyms from the index.
 */
export function usePost1IndexesIndexNameSynonymsClear(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<
        (typeof client)['1']['indexes'][':indexName']['synonyms']['clear']['$post']
      >,
      variables: InferRequestType<
        (typeof client)['1']['indexes'][':indexName']['synonyms']['clear']['$post']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client)['1']['indexes'][':indexName']['synonyms']['clear']['$post']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client)['1']['indexes'][':indexName']['synonyms']['clear']['$post']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client)['1']['indexes'][':indexName']['synonyms']['clear']['$post']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client)['1']['indexes'][':indexName']['synonyms']['clear']['$post']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['1']['indexes'][':indexName']['synonyms']['clear']['$post']
      >,
    ) => parseResponse(client['1'].indexes[':indexName'].synonyms.clear.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /1/indexes/{indexName}/synonyms/search
 *
 * Search for synonyms
 *
 * Searches for synonyms in your index.
 */
export function usePost1IndexesIndexNameSynonymsSearch(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<
        (typeof client)['1']['indexes'][':indexName']['synonyms']['search']['$post']
      >,
      variables: InferRequestType<
        (typeof client)['1']['indexes'][':indexName']['synonyms']['search']['$post']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client)['1']['indexes'][':indexName']['synonyms']['search']['$post']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client)['1']['indexes'][':indexName']['synonyms']['search']['$post']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client)['1']['indexes'][':indexName']['synonyms']['search']['$post']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client)['1']['indexes'][':indexName']['synonyms']['search']['$post']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['1']['indexes'][':indexName']['synonyms']['search']['$post']
      >,
    ) =>
      parseResponse(client['1'].indexes[':indexName'].synonyms.search.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /1/keys
 *
 * List API keys
 *
 * Lists all API keys associated with your Algolia application, including their permissions and restrictions.
 */
export function useGet1Keys(options?: {
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
    placeholderData?:
      | InferResponseType<(typeof client)['1']['keys']['$get']>
      | (() => InferResponseType<(typeof client)['1']['keys']['$get']>)
    initialData?:
      | InferResponseType<(typeof client)['1']['keys']['$get']>
      | (() => InferResponseType<(typeof client)['1']['keys']['$get']>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGet1KeysQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client['1'].keys.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /1/keys
 */
export function getGet1KeysQueryKey() {
  return ['/1/keys'] as const
}

/**
 * Returns Vue Query query options for GET /1/keys
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet1KeysQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGet1KeysQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client['1'].keys.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * POST /1/keys
 *
 * Create an API key
 *
 * Creates a new API key with specific permissions and restrictions.
 */
export function usePost1Keys(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client)['1']['keys']['$post']>,
      variables: InferRequestType<(typeof client)['1']['keys']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client)['1']['keys']['$post']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client)['1']['keys']['$post']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client)['1']['keys']['$post']>,
    ) => void
    onMutate?: (variables: InferRequestType<(typeof client)['1']['keys']['$post']>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<(typeof client)['1']['keys']['$post']>) =>
      parseResponse(client['1'].keys.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /1/keys/{key}
 *
 * Retrieve API key permissions
 *
 * Gets the permissions and restrictions of an API key.
 *
 * When authenticating with the admin API key, you can request information for any of your application's keys.
 * When authenticating with other API keys, you can only retrieve information for that key,
 * with the description replaced by `<redacted>`.
 */
export function useGet1KeysKey(
  args: InferRequestType<(typeof client)['1']['keys'][':key']['$get']>,
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
      placeholderData?:
        | InferResponseType<(typeof client)['1']['keys'][':key']['$get']>
        | (() => InferResponseType<(typeof client)['1']['keys'][':key']['$get']>)
      initialData?:
        | InferResponseType<(typeof client)['1']['keys'][':key']['$get']>
        | (() => InferResponseType<(typeof client)['1']['keys'][':key']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGet1KeysKeyQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client['1'].keys[':key'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /1/keys/{key}
 */
export function getGet1KeysKeyQueryKey(
  args: InferRequestType<(typeof client)['1']['keys'][':key']['$get']>,
) {
  return ['/1/keys/:key', args] as const
}

/**
 * Returns Vue Query query options for GET /1/keys/{key}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet1KeysKeyQueryOptions = (
  args: InferRequestType<(typeof client)['1']['keys'][':key']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGet1KeysKeyQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client['1'].keys[':key'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * PUT /1/keys/{key}
 *
 * Update an API key
 *
 * Replaces the permissions of an existing API key.
 *
 * Any unspecified attribute resets that attribute to its default value.
 */
export function usePut1KeysKey(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client)['1']['keys'][':key']['$put']>,
      variables: InferRequestType<(typeof client)['1']['keys'][':key']['$put']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client)['1']['keys'][':key']['$put']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client)['1']['keys'][':key']['$put']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client)['1']['keys'][':key']['$put']>,
    ) => void
    onMutate?: (variables: InferRequestType<(typeof client)['1']['keys'][':key']['$put']>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<(typeof client)['1']['keys'][':key']['$put']>) =>
      parseResponse(client['1'].keys[':key'].$put(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * DELETE /1/keys/{key}
 *
 * Delete an API key
 *
 * Deletes the API key.
 */
export function useDelete1KeysKey(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client)['1']['keys'][':key']['$delete']>,
      variables: InferRequestType<(typeof client)['1']['keys'][':key']['$delete']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client)['1']['keys'][':key']['$delete']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client)['1']['keys'][':key']['$delete']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client)['1']['keys'][':key']['$delete']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client)['1']['keys'][':key']['$delete']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<(typeof client)['1']['keys'][':key']['$delete']>) =>
      parseResponse(client['1'].keys[':key'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /1/keys/{key}/restore
 *
 * Restore an API key
 *
 * Restores a deleted API key.
 *
 * Restoring resets the `validity` attribute to `0`.
 *
 * Algolia stores up to 1,000 API keys per application.
 * If you create more, the oldest API keys are deleted and can't be restored.
 */
export function usePost1KeysKeyRestore(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client)['1']['keys'][':key']['restore']['$post']>,
      variables: InferRequestType<(typeof client)['1']['keys'][':key']['restore']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client)['1']['keys'][':key']['restore']['$post']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client)['1']['keys'][':key']['restore']['$post']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client)['1']['keys'][':key']['restore']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client)['1']['keys'][':key']['restore']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client)['1']['keys'][':key']['restore']['$post']>,
    ) => parseResponse(client['1'].keys[':key'].restore.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /1/indexes/{indexName}/rules/{objectID}
 *
 * Retrieve a rule
 *
 * Retrieves a rule by its ID.
 * To find the object ID of rules, use the [`search` operation](https://www.algolia.com/doc/rest-api/search/search-rules).
 */
export function useGet1IndexesIndexNameRulesObjectID(
  args: InferRequestType<
    (typeof client)['1']['indexes'][':indexName']['rules'][':objectID']['$get']
  >,
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
      placeholderData?:
        | InferResponseType<
            (typeof client)['1']['indexes'][':indexName']['rules'][':objectID']['$get']
          >
        | (() => InferResponseType<
            (typeof client)['1']['indexes'][':indexName']['rules'][':objectID']['$get']
          >)
      initialData?:
        | InferResponseType<
            (typeof client)['1']['indexes'][':indexName']['rules'][':objectID']['$get']
          >
        | (() => InferResponseType<
            (typeof client)['1']['indexes'][':indexName']['rules'][':objectID']['$get']
          >)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGet1IndexesIndexNameRulesObjectIDQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client['1'].indexes[':indexName'].rules[':objectID'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /1/indexes/{indexName}/rules/{objectID}
 */
export function getGet1IndexesIndexNameRulesObjectIDQueryKey(
  args: InferRequestType<
    (typeof client)['1']['indexes'][':indexName']['rules'][':objectID']['$get']
  >,
) {
  return ['/1/indexes/:indexName/rules/:objectID', args] as const
}

/**
 * Returns Vue Query query options for GET /1/indexes/{indexName}/rules/{objectID}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet1IndexesIndexNameRulesObjectIDQueryOptions = (
  args: InferRequestType<
    (typeof client)['1']['indexes'][':indexName']['rules'][':objectID']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGet1IndexesIndexNameRulesObjectIDQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client['1'].indexes[':indexName'].rules[':objectID'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * PUT /1/indexes/{indexName}/rules/{objectID}
 *
 * Create or replace a rule
 *
 * If a rule with the specified object ID doesn't exist, it's created.
 * Otherwise, the existing rule is replaced.
 *
 * To create or update more than one rule, use the [`batch` operation](https://www.algolia.com/doc/rest-api/search/save-rules).
 */
export function usePut1IndexesIndexNameRulesObjectID(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<
        (typeof client)['1']['indexes'][':indexName']['rules'][':objectID']['$put']
      >,
      variables: InferRequestType<
        (typeof client)['1']['indexes'][':indexName']['rules'][':objectID']['$put']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client)['1']['indexes'][':indexName']['rules'][':objectID']['$put']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client)['1']['indexes'][':indexName']['rules'][':objectID']['$put']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client)['1']['indexes'][':indexName']['rules'][':objectID']['$put']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client)['1']['indexes'][':indexName']['rules'][':objectID']['$put']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['1']['indexes'][':indexName']['rules'][':objectID']['$put']
      >,
    ) =>
      parseResponse(client['1'].indexes[':indexName'].rules[':objectID'].$put(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * DELETE /1/indexes/{indexName}/rules/{objectID}
 *
 * Delete a rule
 *
 * Deletes a rule by its ID.
 * To find the object ID for rules,
 * use the [`search` operation](https://www.algolia.com/doc/rest-api/search/search-rules).
 */
export function useDelete1IndexesIndexNameRulesObjectID(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<
        (typeof client)['1']['indexes'][':indexName']['rules'][':objectID']['$delete']
      >,
      variables: InferRequestType<
        (typeof client)['1']['indexes'][':indexName']['rules'][':objectID']['$delete']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client)['1']['indexes'][':indexName']['rules'][':objectID']['$delete']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client)['1']['indexes'][':indexName']['rules'][':objectID']['$delete']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client)['1']['indexes'][':indexName']['rules'][':objectID']['$delete']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client)['1']['indexes'][':indexName']['rules'][':objectID']['$delete']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['1']['indexes'][':indexName']['rules'][':objectID']['$delete']
      >,
    ) =>
      parseResponse(
        client['1'].indexes[':indexName'].rules[':objectID'].$delete(args, clientOptions),
      ),
    ...mutationOptions,
  })
}

/**
 * POST /1/indexes/{indexName}/rules/batch
 *
 * Create or update rules
 *
 * Create or update multiple rules.
 *
 * If a rule with the specified object ID doesn't exist, Algolia creates a new one.
 * Otherwise, existing rules are replaced.
 *
 * This operation is subject to [indexing rate limits](https://support.algolia.com/hc/articles/4406975251089-Is-there-a-rate-limit-for-indexing-on-Algolia).
 */
export function usePost1IndexesIndexNameRulesBatch(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<
        (typeof client)['1']['indexes'][':indexName']['rules']['batch']['$post']
      >,
      variables: InferRequestType<
        (typeof client)['1']['indexes'][':indexName']['rules']['batch']['$post']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client)['1']['indexes'][':indexName']['rules']['batch']['$post']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client)['1']['indexes'][':indexName']['rules']['batch']['$post']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client)['1']['indexes'][':indexName']['rules']['batch']['$post']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client)['1']['indexes'][':indexName']['rules']['batch']['$post']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['1']['indexes'][':indexName']['rules']['batch']['$post']
      >,
    ) => parseResponse(client['1'].indexes[':indexName'].rules.batch.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /1/indexes/{indexName}/rules/clear
 *
 * Delete all rules
 *
 * Deletes all rules from the index.
 */
export function usePost1IndexesIndexNameRulesClear(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<
        (typeof client)['1']['indexes'][':indexName']['rules']['clear']['$post']
      >,
      variables: InferRequestType<
        (typeof client)['1']['indexes'][':indexName']['rules']['clear']['$post']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client)['1']['indexes'][':indexName']['rules']['clear']['$post']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client)['1']['indexes'][':indexName']['rules']['clear']['$post']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client)['1']['indexes'][':indexName']['rules']['clear']['$post']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client)['1']['indexes'][':indexName']['rules']['clear']['$post']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['1']['indexes'][':indexName']['rules']['clear']['$post']
      >,
    ) => parseResponse(client['1'].indexes[':indexName'].rules.clear.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /1/indexes/{indexName}/rules/search
 *
 * Search for rules
 *
 * Searches for rules in your index.
 */
export function usePost1IndexesIndexNameRulesSearch(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<
        (typeof client)['1']['indexes'][':indexName']['rules']['search']['$post']
      >,
      variables: InferRequestType<
        (typeof client)['1']['indexes'][':indexName']['rules']['search']['$post']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client)['1']['indexes'][':indexName']['rules']['search']['$post']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client)['1']['indexes'][':indexName']['rules']['search']['$post']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client)['1']['indexes'][':indexName']['rules']['search']['$post']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client)['1']['indexes'][':indexName']['rules']['search']['$post']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['1']['indexes'][':indexName']['rules']['search']['$post']
      >,
    ) => parseResponse(client['1'].indexes[':indexName'].rules.search.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /1/dictionaries/{dictionaryName}/batch
 *
 * Add or delete dictionary entries
 *
 * Adds or deletes multiple entries from your plurals, segmentation, or stop word dictionaries.
 */
export function usePost1DictionariesDictionaryNameBatch(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<
        (typeof client)['1']['dictionaries'][':dictionaryName']['batch']['$post']
      >,
      variables: InferRequestType<
        (typeof client)['1']['dictionaries'][':dictionaryName']['batch']['$post']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client)['1']['dictionaries'][':dictionaryName']['batch']['$post']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client)['1']['dictionaries'][':dictionaryName']['batch']['$post']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client)['1']['dictionaries'][':dictionaryName']['batch']['$post']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client)['1']['dictionaries'][':dictionaryName']['batch']['$post']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['1']['dictionaries'][':dictionaryName']['batch']['$post']
      >,
    ) =>
      parseResponse(client['1'].dictionaries[':dictionaryName'].batch.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /1/dictionaries/{dictionaryName}/search
 *
 * Search dictionary entries
 *
 * Searches for standard and custom dictionary entries.
 */
export function usePost1DictionariesDictionaryNameSearch(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<
        (typeof client)['1']['dictionaries'][':dictionaryName']['search']['$post']
      >,
      variables: InferRequestType<
        (typeof client)['1']['dictionaries'][':dictionaryName']['search']['$post']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client)['1']['dictionaries'][':dictionaryName']['search']['$post']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client)['1']['dictionaries'][':dictionaryName']['search']['$post']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client)['1']['dictionaries'][':dictionaryName']['search']['$post']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client)['1']['dictionaries'][':dictionaryName']['search']['$post']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['1']['dictionaries'][':dictionaryName']['search']['$post']
      >,
    ) =>
      parseResponse(client['1'].dictionaries[':dictionaryName'].search.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /1/dictionaries/[*]/settings
 *
 * Retrieve dictionary settings
 *
 * Retrieves the languages for which standard dictionary entries are turned off.
 */
export function useGet1DictionariesSettings(options?: {
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
    placeholderData?:
      | InferResponseType<(typeof client)['1']['dictionaries']['*']['settings']['$get']>
      | (() => InferResponseType<(typeof client)['1']['dictionaries']['*']['settings']['$get']>)
    initialData?:
      | InferResponseType<(typeof client)['1']['dictionaries']['*']['settings']['$get']>
      | (() => InferResponseType<(typeof client)['1']['dictionaries']['*']['settings']['$get']>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGet1DictionariesSettingsQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client['1'].dictionaries['*'].settings.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /1/dictionaries/* /settings
 */
export function getGet1DictionariesSettingsQueryKey() {
  return ['/1/dictionaries/*/settings'] as const
}

/**
 * Returns Vue Query query options for GET /1/dictionaries/* /settings
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet1DictionariesSettingsQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGet1DictionariesSettingsQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client['1'].dictionaries['*'].settings.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * PUT /1/dictionaries/[*]/settings
 *
 * Update dictionary settings
 *
 * Turns standard stop word dictionary entries on or off for a given language.
 */
export function usePut1DictionariesSettings(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client)['1']['dictionaries']['*']['settings']['$put']>,
      variables: InferRequestType<(typeof client)['1']['dictionaries']['*']['settings']['$put']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client)['1']['dictionaries']['*']['settings']['$put']>,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client)['1']['dictionaries']['*']['settings']['$put']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client)['1']['dictionaries']['*']['settings']['$put']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client)['1']['dictionaries']['*']['settings']['$put']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client)['1']['dictionaries']['*']['settings']['$put']>,
    ) => parseResponse(client['1'].dictionaries['*'].settings.$put(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /1/dictionaries/[*]/languages
 *
 * List available languages
 *
 * Lists supported languages with their supported dictionary types and number of custom entries.
 */
export function useGet1DictionariesLanguages(options?: {
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
    placeholderData?:
      | InferResponseType<(typeof client)['1']['dictionaries']['*']['languages']['$get']>
      | (() => InferResponseType<(typeof client)['1']['dictionaries']['*']['languages']['$get']>)
    initialData?:
      | InferResponseType<(typeof client)['1']['dictionaries']['*']['languages']['$get']>
      | (() => InferResponseType<(typeof client)['1']['dictionaries']['*']['languages']['$get']>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGet1DictionariesLanguagesQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client['1'].dictionaries['*'].languages.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /1/dictionaries/* /languages
 */
export function getGet1DictionariesLanguagesQueryKey() {
  return ['/1/dictionaries/*/languages'] as const
}

/**
 * Returns Vue Query query options for GET /1/dictionaries/* /languages
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet1DictionariesLanguagesQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGet1DictionariesLanguagesQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client['1'].dictionaries['*'].languages.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /1/clusters/mapping
 *
 * List user IDs
 *
 * Lists the userIDs assigned to a multi-cluster application.
 *
 * Since it can take a few seconds to get the data from the different clusters,
 * the response isn't real-time.
 */
export function useGet1ClustersMapping(
  args: InferRequestType<(typeof client)['1']['clusters']['mapping']['$get']>,
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
      placeholderData?:
        | InferResponseType<(typeof client)['1']['clusters']['mapping']['$get']>
        | (() => InferResponseType<(typeof client)['1']['clusters']['mapping']['$get']>)
      initialData?:
        | InferResponseType<(typeof client)['1']['clusters']['mapping']['$get']>
        | (() => InferResponseType<(typeof client)['1']['clusters']['mapping']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGet1ClustersMappingQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client['1'].clusters.mapping.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /1/clusters/mapping
 */
export function getGet1ClustersMappingQueryKey(
  args: InferRequestType<(typeof client)['1']['clusters']['mapping']['$get']>,
) {
  return ['/1/clusters/mapping', args] as const
}

/**
 * Returns Vue Query query options for GET /1/clusters/mapping
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet1ClustersMappingQueryOptions = (
  args: InferRequestType<(typeof client)['1']['clusters']['mapping']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGet1ClustersMappingQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client['1'].clusters.mapping.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * POST /1/clusters/mapping
 *
 * Assign or move a user ID
 *
 * Assigns or moves a user ID to a cluster.
 *
 * The time it takes to move a user is proportional to the amount of data linked to the user ID.
 */
export function usePost1ClustersMapping(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client)['1']['clusters']['mapping']['$post']>,
      variables: InferRequestType<(typeof client)['1']['clusters']['mapping']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client)['1']['clusters']['mapping']['$post']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client)['1']['clusters']['mapping']['$post']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client)['1']['clusters']['mapping']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client)['1']['clusters']['mapping']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client)['1']['clusters']['mapping']['$post']>,
    ) => parseResponse(client['1'].clusters.mapping.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /1/clusters/mapping/batch
 *
 * Assign multiple userIDs
 *
 * Assigns multiple user IDs to a cluster.
 *
 * **You can't move users with this operation**.
 */
export function usePost1ClustersMappingBatch(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client)['1']['clusters']['mapping']['batch']['$post']>,
      variables: InferRequestType<(typeof client)['1']['clusters']['mapping']['batch']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client)['1']['clusters']['mapping']['batch']['$post']>,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client)['1']['clusters']['mapping']['batch']['$post']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client)['1']['clusters']['mapping']['batch']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client)['1']['clusters']['mapping']['batch']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client)['1']['clusters']['mapping']['batch']['$post']>,
    ) => parseResponse(client['1'].clusters.mapping.batch.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /1/clusters/mapping/top
 *
 * Get top user IDs
 *
 * Get the IDs of the 10 users with the highest number of records per cluster.
 *
 * Since it can take a few seconds to get the data from the different clusters,
 * the response isn't real-time.
 */
export function useGet1ClustersMappingTop(options?: {
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
    placeholderData?:
      | InferResponseType<(typeof client)['1']['clusters']['mapping']['top']['$get']>
      | (() => InferResponseType<(typeof client)['1']['clusters']['mapping']['top']['$get']>)
    initialData?:
      | InferResponseType<(typeof client)['1']['clusters']['mapping']['top']['$get']>
      | (() => InferResponseType<(typeof client)['1']['clusters']['mapping']['top']['$get']>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGet1ClustersMappingTopQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client['1'].clusters.mapping.top.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /1/clusters/mapping/top
 */
export function getGet1ClustersMappingTopQueryKey() {
  return ['/1/clusters/mapping/top'] as const
}

/**
 * Returns Vue Query query options for GET /1/clusters/mapping/top
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet1ClustersMappingTopQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGet1ClustersMappingTopQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client['1'].clusters.mapping.top.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /1/clusters/mapping/{userID}
 *
 * Retrieve user ID
 *
 * Returns the user ID data stored in the mapping.
 *
 * Since it can take a few seconds to get the data from the different clusters,
 * the response isn't real-time.
 */
export function useGet1ClustersMappingUserID(
  args: InferRequestType<(typeof client)['1']['clusters']['mapping'][':userID']['$get']>,
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
      placeholderData?:
        | InferResponseType<(typeof client)['1']['clusters']['mapping'][':userID']['$get']>
        | (() => InferResponseType<(typeof client)['1']['clusters']['mapping'][':userID']['$get']>)
      initialData?:
        | InferResponseType<(typeof client)['1']['clusters']['mapping'][':userID']['$get']>
        | (() => InferResponseType<(typeof client)['1']['clusters']['mapping'][':userID']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGet1ClustersMappingUserIDQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client['1'].clusters.mapping[':userID'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /1/clusters/mapping/{userID}
 */
export function getGet1ClustersMappingUserIDQueryKey(
  args: InferRequestType<(typeof client)['1']['clusters']['mapping'][':userID']['$get']>,
) {
  return ['/1/clusters/mapping/:userID', args] as const
}

/**
 * Returns Vue Query query options for GET /1/clusters/mapping/{userID}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet1ClustersMappingUserIDQueryOptions = (
  args: InferRequestType<(typeof client)['1']['clusters']['mapping'][':userID']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGet1ClustersMappingUserIDQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client['1'].clusters.mapping[':userID'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * DELETE /1/clusters/mapping/{userID}
 *
 * Delete user ID
 *
 * Deletes a user ID and its associated data from the clusters.
 */
export function useDelete1ClustersMappingUserID(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client)['1']['clusters']['mapping'][':userID']['$delete']>,
      variables: InferRequestType<
        (typeof client)['1']['clusters']['mapping'][':userID']['$delete']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client)['1']['clusters']['mapping'][':userID']['$delete']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client)['1']['clusters']['mapping'][':userID']['$delete']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client)['1']['clusters']['mapping'][':userID']['$delete']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client)['1']['clusters']['mapping'][':userID']['$delete']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client)['1']['clusters']['mapping'][':userID']['$delete']>,
    ) => parseResponse(client['1'].clusters.mapping[':userID'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /1/clusters
 *
 * List clusters
 *
 * Lists the available clusters in a multi-cluster setup.
 */
export function useGet1Clusters(options?: {
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
    placeholderData?:
      | InferResponseType<(typeof client)['1']['clusters']['$get']>
      | (() => InferResponseType<(typeof client)['1']['clusters']['$get']>)
    initialData?:
      | InferResponseType<(typeof client)['1']['clusters']['$get']>
      | (() => InferResponseType<(typeof client)['1']['clusters']['$get']>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGet1ClustersQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client['1'].clusters.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /1/clusters
 */
export function getGet1ClustersQueryKey() {
  return ['/1/clusters'] as const
}

/**
 * Returns Vue Query query options for GET /1/clusters
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet1ClustersQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGet1ClustersQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client['1'].clusters.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * POST /1/clusters/mapping/search
 *
 * Search for user IDs
 *
 * Since it can take a few seconds to get the data from the different clusters,
 * the response isn't real-time.
 *
 * To ensure rapid updates, the user IDs index isn't built at the same time as the mapping. Instead, it's built every 12 hours, at the same time as the update of user ID usage. For example, if you add or move a user ID, the search will show an old value until the next time the mapping is rebuilt (every 12 hours).
 */
export function usePost1ClustersMappingSearch(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client)['1']['clusters']['mapping']['search']['$post']>,
      variables: InferRequestType<(typeof client)['1']['clusters']['mapping']['search']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client)['1']['clusters']['mapping']['search']['$post']>,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client)['1']['clusters']['mapping']['search']['$post']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client)['1']['clusters']['mapping']['search']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client)['1']['clusters']['mapping']['search']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client)['1']['clusters']['mapping']['search']['$post']>,
    ) => parseResponse(client['1'].clusters.mapping.search.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /1/clusters/mapping/pending
 *
 * Get migration and user mapping status
 *
 * To determine when the time-consuming process of creating a large batch of users or migrating users from one cluster to another is complete, this operation retrieves the status of the process.
 */
export function useGet1ClustersMappingPending(
  args: InferRequestType<(typeof client)['1']['clusters']['mapping']['pending']['$get']>,
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
      placeholderData?:
        | InferResponseType<(typeof client)['1']['clusters']['mapping']['pending']['$get']>
        | (() => InferResponseType<(typeof client)['1']['clusters']['mapping']['pending']['$get']>)
      initialData?:
        | InferResponseType<(typeof client)['1']['clusters']['mapping']['pending']['$get']>
        | (() => InferResponseType<(typeof client)['1']['clusters']['mapping']['pending']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGet1ClustersMappingPendingQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client['1'].clusters.mapping.pending.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /1/clusters/mapping/pending
 */
export function getGet1ClustersMappingPendingQueryKey(
  args: InferRequestType<(typeof client)['1']['clusters']['mapping']['pending']['$get']>,
) {
  return ['/1/clusters/mapping/pending', args] as const
}

/**
 * Returns Vue Query query options for GET /1/clusters/mapping/pending
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet1ClustersMappingPendingQueryOptions = (
  args: InferRequestType<(typeof client)['1']['clusters']['mapping']['pending']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGet1ClustersMappingPendingQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client['1'].clusters.mapping.pending.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /1/security/sources
 *
 * List allowed sources
 *
 * Retrieves all allowed IP addresses with access to your application.
 */
export function useGet1SecuritySources(options?: {
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
    placeholderData?:
      | InferResponseType<(typeof client)['1']['security']['sources']['$get']>
      | (() => InferResponseType<(typeof client)['1']['security']['sources']['$get']>)
    initialData?:
      | InferResponseType<(typeof client)['1']['security']['sources']['$get']>
      | (() => InferResponseType<(typeof client)['1']['security']['sources']['$get']>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGet1SecuritySourcesQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client['1'].security.sources.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /1/security/sources
 */
export function getGet1SecuritySourcesQueryKey() {
  return ['/1/security/sources'] as const
}

/**
 * Returns Vue Query query options for GET /1/security/sources
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet1SecuritySourcesQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGet1SecuritySourcesQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client['1'].security.sources.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * PUT /1/security/sources
 *
 * Replace allowed sources
 *
 * Replaces the list of allowed sources.
 */
export function usePut1SecuritySources(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client)['1']['security']['sources']['$put']>,
      variables: InferRequestType<(typeof client)['1']['security']['sources']['$put']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client)['1']['security']['sources']['$put']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client)['1']['security']['sources']['$put']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client)['1']['security']['sources']['$put']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client)['1']['security']['sources']['$put']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client)['1']['security']['sources']['$put']>,
    ) => parseResponse(client['1'].security.sources.$put(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /1/security/sources/append
 *
 * Add a source
 *
 * Adds a source to the list of allowed sources.
 */
export function usePost1SecuritySourcesAppend(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client)['1']['security']['sources']['append']['$post']>,
      variables: InferRequestType<(typeof client)['1']['security']['sources']['append']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client)['1']['security']['sources']['append']['$post']>,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client)['1']['security']['sources']['append']['$post']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client)['1']['security']['sources']['append']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client)['1']['security']['sources']['append']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client)['1']['security']['sources']['append']['$post']>,
    ) => parseResponse(client['1'].security.sources.append.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * DELETE /1/security/sources/{source}
 *
 * Delete a source
 *
 * Deletes a source from the list of allowed sources.
 */
export function useDelete1SecuritySourcesSource(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client)['1']['security']['sources'][':source']['$delete']>,
      variables: InferRequestType<
        (typeof client)['1']['security']['sources'][':source']['$delete']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client)['1']['security']['sources'][':source']['$delete']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client)['1']['security']['sources'][':source']['$delete']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client)['1']['security']['sources'][':source']['$delete']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client)['1']['security']['sources'][':source']['$delete']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client)['1']['security']['sources'][':source']['$delete']>,
    ) => parseResponse(client['1'].security.sources[':source'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /1/logs
 *
 * Retrieve log entries
 *
 * The request must be authenticated by an API key with the [`logs` ACL](https://www.algolia.com/doc/guides/security/api-keys/#access-control-list-acl).
 *
 * - Logs are held for the last seven days.
 * - Up to 1,000 API requests per server are logged.
 * - This request counts towards your [operations quota](https://support.algolia.com/hc/articles/17245378392977-How-does-Algolia-count-records-and-operations) but doesn't appear in the logs itself.
 */
export function useGet1Logs(
  args: InferRequestType<(typeof client)['1']['logs']['$get']>,
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
      placeholderData?:
        | InferResponseType<(typeof client)['1']['logs']['$get']>
        | (() => InferResponseType<(typeof client)['1']['logs']['$get']>)
      initialData?:
        | InferResponseType<(typeof client)['1']['logs']['$get']>
        | (() => InferResponseType<(typeof client)['1']['logs']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGet1LogsQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client['1'].logs.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /1/logs
 */
export function getGet1LogsQueryKey(args: InferRequestType<(typeof client)['1']['logs']['$get']>) {
  return ['/1/logs', args] as const
}

/**
 * Returns Vue Query query options for GET /1/logs
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet1LogsQueryOptions = (
  args: InferRequestType<(typeof client)['1']['logs']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGet1LogsQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client['1'].logs.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
  })

/**
 * GET /1/task/{taskID}
 *
 * Check application task status
 *
 * Checks the status of a given application task.
 */
export function useGet1TaskTaskID(
  args: InferRequestType<(typeof client)['1']['task'][':taskID']['$get']>,
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
      placeholderData?:
        | InferResponseType<(typeof client)['1']['task'][':taskID']['$get']>
        | (() => InferResponseType<(typeof client)['1']['task'][':taskID']['$get']>)
      initialData?:
        | InferResponseType<(typeof client)['1']['task'][':taskID']['$get']>
        | (() => InferResponseType<(typeof client)['1']['task'][':taskID']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGet1TaskTaskIDQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client['1'].task[':taskID'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /1/task/{taskID}
 */
export function getGet1TaskTaskIDQueryKey(
  args: InferRequestType<(typeof client)['1']['task'][':taskID']['$get']>,
) {
  return ['/1/task/:taskID', args] as const
}

/**
 * Returns Vue Query query options for GET /1/task/{taskID}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet1TaskTaskIDQueryOptions = (
  args: InferRequestType<(typeof client)['1']['task'][':taskID']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGet1TaskTaskIDQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client['1'].task[':taskID'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /1/indexes/{indexName}/task/{taskID}
 *
 * Check task status
 *
 * Checks the status of a given task.
 *
 * Indexing tasks are asynchronous.
 * When you add, update, or delete records or indices,
 * a task is created on a queue and completed depending on the load on the server.
 *
 * The indexing tasks' responses include a task ID that you can use to check the status.
 */
export function useGet1IndexesIndexNameTaskTaskID(
  args: InferRequestType<(typeof client)['1']['indexes'][':indexName']['task'][':taskID']['$get']>,
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
      placeholderData?:
        | InferResponseType<
            (typeof client)['1']['indexes'][':indexName']['task'][':taskID']['$get']
          >
        | (() => InferResponseType<
            (typeof client)['1']['indexes'][':indexName']['task'][':taskID']['$get']
          >)
      initialData?:
        | InferResponseType<
            (typeof client)['1']['indexes'][':indexName']['task'][':taskID']['$get']
          >
        | (() => InferResponseType<
            (typeof client)['1']['indexes'][':indexName']['task'][':taskID']['$get']
          >)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGet1IndexesIndexNameTaskTaskIDQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client['1'].indexes[':indexName'].task[':taskID'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /1/indexes/{indexName}/task/{taskID}
 */
export function getGet1IndexesIndexNameTaskTaskIDQueryKey(
  args: InferRequestType<(typeof client)['1']['indexes'][':indexName']['task'][':taskID']['$get']>,
) {
  return ['/1/indexes/:indexName/task/:taskID', args] as const
}

/**
 * Returns Vue Query query options for GET /1/indexes/{indexName}/task/{taskID}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet1IndexesIndexNameTaskTaskIDQueryOptions = (
  args: InferRequestType<(typeof client)['1']['indexes'][':indexName']['task'][':taskID']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGet1IndexesIndexNameTaskTaskIDQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client['1'].indexes[':indexName'].task[':taskID'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * POST /1/indexes/{indexName}/operation
 *
 * Copy or move an index
 *
 * Copies or moves (renames) an index within the same Algolia application.
 *
 * - Existing destination indices are overwritten, except for their analytics data.
 * - If the destination index doesn't exist yet, it'll be created.
 * - This operation is resource-intensive.
 *
 * **Copy**
 *
 * - Copying a source index that doesn't exist creates a new index with 0 records and default settings.
 * - The API keys of the source index are merged with the existing keys in the destination index.
 * - You can't copy the `enableReRanking`, `mode`, and `replicas` settings.
 * - You can't copy to a destination index that already has replicas.
 * - Be aware of the [size limits](https://www.algolia.com/doc/guides/scaling/algolia-service-limits/#application-record-and-index-limits).
 * - Related guide: [Copy indices](https://www.algolia.com/doc/guides/sending-and-managing-data/manage-indices-and-apps/manage-indices/how-to/copy-indices)
 *
 * **Move**
 *
 * - Moving a source index that doesn't exist is ignored without returning an error.
 * - When moving an index, the analytics data keeps its original name, and a new set of analytics data is started for the new name.
 *   To access the original analytics in the dashboard, create an index with the original name.
 * - If the destination index has replicas, moving will overwrite the existing index and copy the data to the replica indices.
 * - Related guide: [Move indices](https://www.algolia.com/doc/guides/sending-and-managing-data/manage-indices-and-apps/manage-indices/how-to/move-indices).
 *
 * This operation is subject to [indexing rate limits](https://support.algolia.com/hc/articles/4406975251089-Is-there-a-rate-limit-for-indexing-on-Algolia).
 */
export function usePost1IndexesIndexNameOperation(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client)['1']['indexes'][':indexName']['operation']['$post']>,
      variables: InferRequestType<
        (typeof client)['1']['indexes'][':indexName']['operation']['$post']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client)['1']['indexes'][':indexName']['operation']['$post']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client)['1']['indexes'][':indexName']['operation']['$post']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client)['1']['indexes'][':indexName']['operation']['$post']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client)['1']['indexes'][':indexName']['operation']['$post']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client)['1']['indexes'][':indexName']['operation']['$post']>,
    ) => parseResponse(client['1'].indexes[':indexName'].operation.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /1/indexes
 *
 * List indices
 *
 * Lists all indices in the current Algolia application.
 *
 * The request follows any index restrictions of the API key you use to make the request.
 */
export function useGet1Indexes(
  args: InferRequestType<(typeof client)['1']['indexes']['$get']>,
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
      placeholderData?:
        | InferResponseType<(typeof client)['1']['indexes']['$get']>
        | (() => InferResponseType<(typeof client)['1']['indexes']['$get']>)
      initialData?:
        | InferResponseType<(typeof client)['1']['indexes']['$get']>
        | (() => InferResponseType<(typeof client)['1']['indexes']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGet1IndexesQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client['1'].indexes.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /1/indexes
 */
export function getGet1IndexesQueryKey(
  args: InferRequestType<(typeof client)['1']['indexes']['$get']>,
) {
  return ['/1/indexes', args] as const
}

/**
 * Returns Vue Query query options for GET /1/indexes
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet1IndexesQueryOptions = (
  args: InferRequestType<(typeof client)['1']['indexes']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGet1IndexesQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client['1'].indexes.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /waitForApiKey
 *
 * Wait for an API key operation
 *
 * Waits for an API key to be added, updated, or deleted.
 */
export function useGetWaitForApiKey(
  args: InferRequestType<typeof client.waitForApiKey.$get>,
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
      placeholderData?:
        | InferResponseType<typeof client.waitForApiKey.$get>
        | (() => InferResponseType<typeof client.waitForApiKey.$get>)
      initialData?:
        | InferResponseType<typeof client.waitForApiKey.$get>
        | (() => InferResponseType<typeof client.waitForApiKey.$get>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetWaitForApiKeyQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.waitForApiKey.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /waitForApiKey
 */
export function getGetWaitForApiKeyQueryKey(
  args: InferRequestType<typeof client.waitForApiKey.$get>,
) {
  return ['/waitForApiKey', args] as const
}

/**
 * Returns Vue Query query options for GET /waitForApiKey
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetWaitForApiKeyQueryOptions = (
  args: InferRequestType<typeof client.waitForApiKey.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetWaitForApiKeyQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.waitForApiKey.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /waitForTask
 *
 * Wait for operation to complete
 *
 * Wait for a task to complete to ensure synchronized index updates.
 *
 * All Algolia write operations are asynchronous. When you make a request for a write operation, for example, to add or update records in your index, Algolia creates a task on a queue and returns a taskID. The task itself runs separately, depending on the server load.
 */
export function useGetWaitForTask(
  args: InferRequestType<typeof client.waitForTask.$get>,
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
      placeholderData?:
        | InferResponseType<typeof client.waitForTask.$get>
        | (() => InferResponseType<typeof client.waitForTask.$get>)
      initialData?:
        | InferResponseType<typeof client.waitForTask.$get>
        | (() => InferResponseType<typeof client.waitForTask.$get>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetWaitForTaskQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.waitForTask.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /waitForTask
 */
export function getGetWaitForTaskQueryKey(args: InferRequestType<typeof client.waitForTask.$get>) {
  return ['/waitForTask', args] as const
}

/**
 * Returns Vue Query query options for GET /waitForTask
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetWaitForTaskQueryOptions = (
  args: InferRequestType<typeof client.waitForTask.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetWaitForTaskQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.waitForTask.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /waitForAppTask
 *
 * Wait for application-level operation to complete
 *
 * Wait for a application-level task to complete.
 */
export function useGetWaitForAppTask(
  args: InferRequestType<typeof client.waitForAppTask.$get>,
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
      placeholderData?:
        | InferResponseType<typeof client.waitForAppTask.$get>
        | (() => InferResponseType<typeof client.waitForAppTask.$get>)
      initialData?:
        | InferResponseType<typeof client.waitForAppTask.$get>
        | (() => InferResponseType<typeof client.waitForAppTask.$get>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetWaitForAppTaskQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.waitForAppTask.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /waitForAppTask
 */
export function getGetWaitForAppTaskQueryKey(
  args: InferRequestType<typeof client.waitForAppTask.$get>,
) {
  return ['/waitForAppTask', args] as const
}

/**
 * Returns Vue Query query options for GET /waitForAppTask
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetWaitForAppTaskQueryOptions = (
  args: InferRequestType<typeof client.waitForAppTask.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetWaitForAppTaskQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.waitForAppTask.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /browseObjects
 *
 * Get all records from an index
 *
 * You can use the browse method to get records from an index—for example, to export your index as a backup. To export all records, use an empty query.
 *
 * Use browse instead of search when exporting records from your index, when ranking, or analytics, isn't important. The Analytics API doesn't collect data when using browse.
 *
 * Don't use this method for building a search UI. Use search instead.
 */
export function useGetBrowseObjects(
  args: InferRequestType<typeof client.browseObjects.$get>,
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
      placeholderData?:
        | InferResponseType<typeof client.browseObjects.$get>
        | (() => InferResponseType<typeof client.browseObjects.$get>)
      initialData?:
        | InferResponseType<typeof client.browseObjects.$get>
        | (() => InferResponseType<typeof client.browseObjects.$get>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetBrowseObjectsQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.browseObjects.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /browseObjects
 */
export function getGetBrowseObjectsQueryKey(
  args: InferRequestType<typeof client.browseObjects.$get>,
) {
  return ['/browseObjects', args] as const
}

/**
 * Returns Vue Query query options for GET /browseObjects
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetBrowseObjectsQueryOptions = (
  args: InferRequestType<typeof client.browseObjects.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetBrowseObjectsQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.browseObjects.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /generateSecuredApiKey
 *
 * Create secured API keys
 *
 * Generates a secured API key without any requests to Algolia's servers.
 *
 * Secured API keys are API keys that you generate on your server without any API request to Algolia.
 * Secured API keys help in environments where you can't easily update the client-side code, such as mobile apps,
 * or when you need to restrict access to a part of your index for every user.
 *
 * When your users start searching, instead of using the Search API key, they request a short-lived secured API key from your server.
 * On your server, you use this method to create a secured API key, with any restrictions you'd like, such as filters, index access restrictions,
 * or expiration times. The API key gets longer the more restrictions you add.
 * Your users then use the secured API key to search with Algolia.
 *
 * You can't create secured API keys from other secured API keys or from your Admin API key.
 * The generated API key can have the same restrictions as the parent API key, or be more restrictive.
 */
export function useGetGenerateSecuredApiKey(
  args: InferRequestType<typeof client.generateSecuredApiKey.$get>,
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
      placeholderData?:
        | InferResponseType<typeof client.generateSecuredApiKey.$get>
        | (() => InferResponseType<typeof client.generateSecuredApiKey.$get>)
      initialData?:
        | InferResponseType<typeof client.generateSecuredApiKey.$get>
        | (() => InferResponseType<typeof client.generateSecuredApiKey.$get>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetGenerateSecuredApiKeyQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.generateSecuredApiKey.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /generateSecuredApiKey
 */
export function getGetGenerateSecuredApiKeyQueryKey(
  args: InferRequestType<typeof client.generateSecuredApiKey.$get>,
) {
  return ['/generateSecuredApiKey', args] as const
}

/**
 * Returns Vue Query query options for GET /generateSecuredApiKey
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGenerateSecuredApiKeyQueryOptions = (
  args: InferRequestType<typeof client.generateSecuredApiKey.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetGenerateSecuredApiKeyQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.generateSecuredApiKey.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /accountCopyIndex
 *
 * Copies the given `sourceIndexName` records, rules and synonyms to an other Algolia application for the given `destinationIndexName`
 *
 * Copies the given `sourceIndexName` records, rules and synonyms to an other Algolia application for the given `destinationIndexName`.
 */
export function useGetAccountCopyIndex(
  args: InferRequestType<typeof client.accountCopyIndex.$get>,
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
      placeholderData?:
        | InferResponseType<typeof client.accountCopyIndex.$get>
        | (() => InferResponseType<typeof client.accountCopyIndex.$get>)
      initialData?:
        | InferResponseType<typeof client.accountCopyIndex.$get>
        | (() => InferResponseType<typeof client.accountCopyIndex.$get>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetAccountCopyIndexQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.accountCopyIndex.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /accountCopyIndex
 */
export function getGetAccountCopyIndexQueryKey(
  args: InferRequestType<typeof client.accountCopyIndex.$get>,
) {
  return ['/accountCopyIndex', args] as const
}

/**
 * Returns Vue Query query options for GET /accountCopyIndex
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetAccountCopyIndexQueryOptions = (
  args: InferRequestType<typeof client.accountCopyIndex.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetAccountCopyIndexQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.accountCopyIndex.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /replaceAllObjects
 *
 * Replace all records in an index
 *
 * This method replaces all records in an index without interrupting ongoing searches.
 *
 * It combines [batch](https://www.algolia.com/doc/rest-api/search/batch) and [copy/move](https://www.algolia.com/doc/rest-api/search/operation-index) index operations:
 * 1. Copy settings, synonyms, and rules to a temporary index.
 * 2. Add the records from the `objects` parameter to the temporary index.
 * 3. Replace the original index with the temporary one.
 *
 * If there's an error during one of these steps, the temporary index is deleted if your API key has the `deleteIndex` ACL.
 *
 * If your API key restricts access to specific indices, make sure it also grants access to the temporary index INDEX_NAME_tmp_* (replace INDEX_NAME with the name of your original index).
 *
 * This method is subject to [indexing rate limits](https://support.algolia.com/hc/en-us/articles/4406975251089-Is-there-a-rate-limit-for-indexing-on-Algolia).
 *
 * The response includes the results of the individual API requests.
 *
 * This method creates a temporary index: your record count is temporarily doubled. Algolia doesn't count the three days with the highest number of records towards your monthly usage.
 */
export function useGetReplaceAllObjects(
  args: InferRequestType<typeof client.replaceAllObjects.$get>,
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
      placeholderData?:
        | InferResponseType<typeof client.replaceAllObjects.$get>
        | (() => InferResponseType<typeof client.replaceAllObjects.$get>)
      initialData?:
        | InferResponseType<typeof client.replaceAllObjects.$get>
        | (() => InferResponseType<typeof client.replaceAllObjects.$get>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetReplaceAllObjectsQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.replaceAllObjects.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /replaceAllObjects
 */
export function getGetReplaceAllObjectsQueryKey(
  args: InferRequestType<typeof client.replaceAllObjects.$get>,
) {
  return ['/replaceAllObjects', args] as const
}

/**
 * Returns Vue Query query options for GET /replaceAllObjects
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetReplaceAllObjectsQueryOptions = (
  args: InferRequestType<typeof client.replaceAllObjects.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetReplaceAllObjectsQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.replaceAllObjects.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /replaceAllObjectsWithTransformation
 *
 * Replace all records in an index
 *
 * Replace all records from your index with a new set of records by leveraging the Transformation pipeline setup in the Push connector (https://www.algolia.com/doc/guides/sending-and-managing-data/send-and-update-your-data/connectors/push).
 *
 * This method lets you replace all records in your index without downtime. It performs these operations:
 *   1. Copy settings, synonyms, and rules from your original index to a temporary index.
 *   2. Add your new records to the temporary index.
 *   3. Replace your original index with the temporary index.
 *
 * Use the safe parameter to ensure that these (asynchronous) operations are performed in sequence.
 * If there's an error duing one of these steps, the temporary index won't be deleted.
 * This operation is rate-limited.
 * This method creates a temporary index: your record count is temporarily doubled. Algolia doesn't count the three days with the highest number of records towards your monthly usage.
 * If you're on a legacy plan (before July 2020), this method counts two operations towards your usage (in addition to the number of records): copySettings and moveIndex.
 * The API key you use for this operation must have access to the index YourIndex and the temporary index YourIndex_tmp.
 */
export function useGetReplaceAllObjectsWithTransformation(
  args: InferRequestType<typeof client.replaceAllObjectsWithTransformation.$get>,
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
      placeholderData?:
        | InferResponseType<typeof client.replaceAllObjectsWithTransformation.$get>
        | (() => InferResponseType<typeof client.replaceAllObjectsWithTransformation.$get>)
      initialData?:
        | InferResponseType<typeof client.replaceAllObjectsWithTransformation.$get>
        | (() => InferResponseType<typeof client.replaceAllObjectsWithTransformation.$get>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetReplaceAllObjectsWithTransformationQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.replaceAllObjectsWithTransformation.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /replaceAllObjectsWithTransformation
 */
export function getGetReplaceAllObjectsWithTransformationQueryKey(
  args: InferRequestType<typeof client.replaceAllObjectsWithTransformation.$get>,
) {
  return ['/replaceAllObjectsWithTransformation', args] as const
}

/**
 * Returns Vue Query query options for GET /replaceAllObjectsWithTransformation
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetReplaceAllObjectsWithTransformationQueryOptions = (
  args: InferRequestType<typeof client.replaceAllObjectsWithTransformation.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetReplaceAllObjectsWithTransformationQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.replaceAllObjectsWithTransformation.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /chunkedBatch
 *
 * Replace all records in an index
 *
 * Helper: Chunks the given `objects` list in subset of 1000 elements max in order to make it fit in `batch` requests.
 */
export function useGetChunkedBatch(
  args: InferRequestType<typeof client.chunkedBatch.$get>,
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
      placeholderData?:
        | InferResponseType<typeof client.chunkedBatch.$get>
        | (() => InferResponseType<typeof client.chunkedBatch.$get>)
      initialData?:
        | InferResponseType<typeof client.chunkedBatch.$get>
        | (() => InferResponseType<typeof client.chunkedBatch.$get>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetChunkedBatchQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.chunkedBatch.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /chunkedBatch
 */
export function getGetChunkedBatchQueryKey(
  args: InferRequestType<typeof client.chunkedBatch.$get>,
) {
  return ['/chunkedBatch', args] as const
}

/**
 * Returns Vue Query query options for GET /chunkedBatch
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetChunkedBatchQueryOptions = (
  args: InferRequestType<typeof client.chunkedBatch.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetChunkedBatchQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.chunkedBatch.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /saveObjects
 *
 * Saves the given array of objects in the given index
 *
 * Helper: Saves the given array of objects in the given index. The `chunkedBatch` helper is used under the hood, which creates a `batch` requests with at most 1000 objects in it.
 */
export function useGetSaveObjects(
  args: InferRequestType<typeof client.saveObjects.$get>,
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
      placeholderData?:
        | InferResponseType<typeof client.saveObjects.$get>
        | (() => InferResponseType<typeof client.saveObjects.$get>)
      initialData?:
        | InferResponseType<typeof client.saveObjects.$get>
        | (() => InferResponseType<typeof client.saveObjects.$get>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetSaveObjectsQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.saveObjects.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /saveObjects
 */
export function getGetSaveObjectsQueryKey(args: InferRequestType<typeof client.saveObjects.$get>) {
  return ['/saveObjects', args] as const
}

/**
 * Returns Vue Query query options for GET /saveObjects
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSaveObjectsQueryOptions = (
  args: InferRequestType<typeof client.saveObjects.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetSaveObjectsQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.saveObjects.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /saveObjectsWithTransformation
 *
 * Save objects to an Algolia index by leveraging the Transformation pipeline setup using the Push connector (https://www.algolia.com/doc/guides/sending-and-managing-data/send-and-update-your-data/connectors/push)
 *
 * Helper: Similar to the `saveObjects` method but requires a Push connector (https://www.algolia.com/doc/guides/sending-and-managing-data/send-and-update-your-data/connectors/push) to be created first, in order to transform records before indexing them to Algolia. The `region` must have been passed to the client instantiation method.
 */
export function useGetSaveObjectsWithTransformation(
  args: InferRequestType<typeof client.saveObjectsWithTransformation.$get>,
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
      placeholderData?:
        | InferResponseType<typeof client.saveObjectsWithTransformation.$get>
        | (() => InferResponseType<typeof client.saveObjectsWithTransformation.$get>)
      initialData?:
        | InferResponseType<typeof client.saveObjectsWithTransformation.$get>
        | (() => InferResponseType<typeof client.saveObjectsWithTransformation.$get>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetSaveObjectsWithTransformationQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.saveObjectsWithTransformation.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /saveObjectsWithTransformation
 */
export function getGetSaveObjectsWithTransformationQueryKey(
  args: InferRequestType<typeof client.saveObjectsWithTransformation.$get>,
) {
  return ['/saveObjectsWithTransformation', args] as const
}

/**
 * Returns Vue Query query options for GET /saveObjectsWithTransformation
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSaveObjectsWithTransformationQueryOptions = (
  args: InferRequestType<typeof client.saveObjectsWithTransformation.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetSaveObjectsWithTransformationQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.saveObjectsWithTransformation.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * POST /deleteObjects
 *
 * Deletes every records for the given objectIDs
 *
 * Helper: Deletes every records for the given objectIDs. The `chunkedBatch` helper is used under the hood, which creates a `batch` requests with at most 1000 objectIDs in it.
 */
export function usePostDeleteObjects(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.deleteObjects.$post>,
      variables: InferRequestType<typeof client.deleteObjects.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.deleteObjects.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.deleteObjects.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.deleteObjects.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.deleteObjects.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.deleteObjects.$post>) =>
      parseResponse(client.deleteObjects.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /partialUpdateObjects
 *
 * Replaces object content of all the given objects according to their respective `objectID` field
 *
 * Helper: Replaces object content of all the given objects according to their respective `objectID` field. The `chunkedBatch` helper is used under the hood, which creates a `batch` requests with at most 1000 objects in it.
 */
export function usePostPartialUpdateObjects(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.partialUpdateObjects.$post>,
      variables: InferRequestType<typeof client.partialUpdateObjects.$post>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<typeof client.partialUpdateObjects.$post>,
    ) => void
    onSettled?: (
      data: InferResponseType<typeof client.partialUpdateObjects.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.partialUpdateObjects.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.partialUpdateObjects.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.partialUpdateObjects.$post>) =>
      parseResponse(client.partialUpdateObjects.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /partialUpdateObjectsWithTransformation
 *
 * Save objects to an Algolia index by leveraging the Transformation pipeline setup using the Push connector (https://www.algolia.com/doc/guides/sending-and-managing-data/send-and-update-your-data/connectors/push)
 *
 * Helper: Similar to the `partialUpdateObjects` method but requires a Push connector (https://www.algolia.com/doc/guides/sending-and-managing-data/send-and-update-your-data/connectors/push) to be created first, in order to transform records before indexing them to Algolia. The `region` must have been passed to the client instantiation method.
 */
export function usePostPartialUpdateObjectsWithTransformation(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.partialUpdateObjectsWithTransformation.$post>,
      variables: InferRequestType<typeof client.partialUpdateObjectsWithTransformation.$post>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<typeof client.partialUpdateObjectsWithTransformation.$post>,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<typeof client.partialUpdateObjectsWithTransformation.$post>
        | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.partialUpdateObjectsWithTransformation.$post>,
    ) => void
    onMutate?: (
      variables: InferRequestType<typeof client.partialUpdateObjectsWithTransformation.$post>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (
      args: InferRequestType<typeof client.partialUpdateObjectsWithTransformation.$post>,
    ) => parseResponse(client.partialUpdateObjectsWithTransformation.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /indexExists
 *
 * Check if an index exists or not
 *
 * You can initialize an index with any name. The index is created on Algolia's servers when you add objects or set settings. To prevent accidentally creating new indices, or changing existing indices, you can use the exists method. The exists method returns a boolean that indicates whether an initialized index has been created.
 */
export function useGetIndexExists(
  args: InferRequestType<typeof client.indexExists.$get>,
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
      placeholderData?:
        | InferResponseType<typeof client.indexExists.$get>
        | (() => InferResponseType<typeof client.indexExists.$get>)
      initialData?:
        | InferResponseType<typeof client.indexExists.$get>
        | (() => InferResponseType<typeof client.indexExists.$get>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetIndexExistsQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.indexExists.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /indexExists
 */
export function getGetIndexExistsQueryKey(args: InferRequestType<typeof client.indexExists.$get>) {
  return ['/indexExists', args] as const
}

/**
 * Returns Vue Query query options for GET /indexExists
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetIndexExistsQueryOptions = (
  args: InferRequestType<typeof client.indexExists.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetIndexExistsQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.indexExists.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /setClientApiKey
 *
 * Switch the API key used to authenticate requests
 *
 * Switch the API key used to authenticate requests.
 */
export function useGetSetClientApiKey(
  args: InferRequestType<typeof client.setClientApiKey.$get>,
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
      placeholderData?:
        | InferResponseType<typeof client.setClientApiKey.$get>
        | (() => InferResponseType<typeof client.setClientApiKey.$get>)
      initialData?:
        | InferResponseType<typeof client.setClientApiKey.$get>
        | (() => InferResponseType<typeof client.setClientApiKey.$get>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetSetClientApiKeyQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.setClientApiKey.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /setClientApiKey
 */
export function getGetSetClientApiKeyQueryKey(
  args: InferRequestType<typeof client.setClientApiKey.$get>,
) {
  return ['/setClientApiKey', args] as const
}

/**
 * Returns Vue Query query options for GET /setClientApiKey
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSetClientApiKeyQueryOptions = (
  args: InferRequestType<typeof client.setClientApiKey.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetSetClientApiKeyQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.setClientApiKey.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })
