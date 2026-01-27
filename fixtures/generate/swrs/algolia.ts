import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetPathKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client[':path'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /{path}
 * Uses $url() for type-safe key generation
 */
export function getGetPathKey(args: InferRequestType<(typeof client)[':path']['$get']>) {
  return client[':path'].$url(args).pathname
}

/**
 * PUT /{path}
 *
 * Send requests to the Algolia REST API
 *
 * This method lets you send requests to the Algolia REST API.
 */
export function usePutPath(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)[':path']['$put']>>>>
    >,
    Error,
    Key,
    InferRequestType<(typeof client)[':path']['$put']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPutPathMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<(typeof client)[':path']['$put']> }) =>
        parseResponse(client[':path'].$put(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /{path}
 * Uses $url() for type-safe key generation
 */
export function getPutPathMutationKey() {
  return `PUT ${client[':path'].$url().pathname}`
}

/**
 * POST /{path}
 *
 * Send requests to the Algolia REST API
 *
 * This method lets you send requests to the Algolia REST API.
 */
export function usePostPath(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)[':path']['$post']>>>>
    >,
    Error,
    Key,
    InferRequestType<(typeof client)[':path']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPostPathMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<(typeof client)[':path']['$post']> }) =>
        parseResponse(client[':path'].$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /{path}
 * Uses $url() for type-safe key generation
 */
export function getPostPathMutationKey() {
  return `POST ${client[':path'].$url().pathname}`
}

/**
 * DELETE /{path}
 *
 * Send requests to the Algolia REST API
 *
 * This method lets you send requests to the Algolia REST API.
 */
export function useDeletePath(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)[':path']['$delete']>>>>
    >,
    Error,
    Key,
    InferRequestType<(typeof client)[':path']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getDeletePathMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<(typeof client)[':path']['$delete']> }) =>
        parseResponse(client[':path'].$delete(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /{path}
 * Uses $url() for type-safe key generation
 */
export function getDeletePathMutationKey() {
  return `DELETE ${client[':path'].$url().pathname}`
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
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client)['1']['indexes'][':indexName']['query']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client)['1']['indexes'][':indexName']['query']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPost1IndexesIndexNameQueryMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<(typeof client)['1']['indexes'][':indexName']['query']['$post']>
        },
      ) => parseResponse(client['1'].indexes[':indexName'].query.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /1/indexes/{indexName}/query
 * Uses $url() for type-safe key generation
 */
export function getPost1IndexesIndexNameQueryMutationKey() {
  return `POST ${client['1'].indexes[':indexName'].query.$url().pathname}`
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
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client)['1']['indexes']['*']['queries']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client)['1']['indexes']['*']['queries']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPost1IndexesQueriesMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: { arg: InferRequestType<(typeof client)['1']['indexes']['*']['queries']['$post']> },
      ) => parseResponse(client['1'].indexes['*'].queries.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /1/indexes/* /queries
 * Uses $url() for type-safe key generation
 */
export function getPost1IndexesQueriesMutationKey() {
  return `POST ${client['1'].indexes['*'].queries.$url().pathname}`
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
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client)['1']['indexes'][':indexName']['facets'][':facetName']['query']['$post']
            >
          >
        >
      >
    >,
    Error,
    Key,
    InferRequestType<
      (typeof client)['1']['indexes'][':indexName']['facets'][':facetName']['query']['$post']
    >
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey =
    mutationOptions?.swrKey ?? getPost1IndexesIndexNameFacetsFacetNameQueryMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<
            (typeof client)['1']['indexes'][':indexName']['facets'][':facetName']['query']['$post']
          >
        },
      ) =>
        parseResponse(
          client['1'].indexes[':indexName'].facets[':facetName'].query.$post(arg, clientOptions),
        ),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /1/indexes/{indexName}/facets/{facetName}/query
 * Uses $url() for type-safe key generation
 */
export function getPost1IndexesIndexNameFacetsFacetNameQueryMutationKey() {
  return `POST ${client['1'].indexes[':indexName'].facets[':facetName'].query.$url().pathname}`
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
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client)['1']['indexes'][':indexName']['browse']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client)['1']['indexes'][':indexName']['browse']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPost1IndexesIndexNameBrowseMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<(typeof client)['1']['indexes'][':indexName']['browse']['$post']>
        },
      ) => parseResponse(client['1'].indexes[':indexName'].browse.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /1/indexes/{indexName}/browse
 * Uses $url() for type-safe key generation
 */
export function getPost1IndexesIndexNameBrowseMutationKey() {
  return `POST ${client['1'].indexes[':indexName'].browse.$url().pathname}`
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
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client)['1']['indexes'][':indexName']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client)['1']['indexes'][':indexName']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPost1IndexesIndexNameMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client)['1']['indexes'][':indexName']['$post']> },
      ) => parseResponse(client['1'].indexes[':indexName'].$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /1/indexes/{indexName}
 * Uses $url() for type-safe key generation
 */
export function getPost1IndexesIndexNameMutationKey() {
  return `POST ${client['1'].indexes[':indexName'].$url().pathname}`
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
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client)['1']['indexes'][':indexName']['$delete']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client)['1']['indexes'][':indexName']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getDelete1IndexesIndexNameMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: { arg: InferRequestType<(typeof client)['1']['indexes'][':indexName']['$delete']> },
      ) => parseResponse(client['1'].indexes[':indexName'].$delete(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /1/indexes/{indexName}
 * Uses $url() for type-safe key generation
 */
export function getDelete1IndexesIndexNameMutationKey() {
  return `DELETE ${client['1'].indexes[':indexName'].$url().pathname}`
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGet1IndexesIndexNameObjectIDKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client['1'].indexes[':indexName'][':objectID'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /1/indexes/{indexName}/{objectID}
 * Uses $url() for type-safe key generation
 */
export function getGet1IndexesIndexNameObjectIDKey(
  args: InferRequestType<(typeof client)['1']['indexes'][':indexName'][':objectID']['$get']>,
) {
  return client['1'].indexes[':indexName'][':objectID'].$url(args).pathname
}

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
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client)['1']['indexes'][':indexName'][':objectID']['$put']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client)['1']['indexes'][':indexName'][':objectID']['$put']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPut1IndexesIndexNameObjectIDMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<(typeof client)['1']['indexes'][':indexName'][':objectID']['$put']>
        },
      ) => parseResponse(client['1'].indexes[':indexName'][':objectID'].$put(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /1/indexes/{indexName}/{objectID}
 * Uses $url() for type-safe key generation
 */
export function getPut1IndexesIndexNameObjectIDMutationKey() {
  return `PUT ${client['1'].indexes[':indexName'][':objectID'].$url().pathname}`
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
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client)['1']['indexes'][':indexName'][':objectID']['$delete']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client)['1']['indexes'][':indexName'][':objectID']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getDelete1IndexesIndexNameObjectIDMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<
            (typeof client)['1']['indexes'][':indexName'][':objectID']['$delete']
          >
        },
      ) =>
        parseResponse(client['1'].indexes[':indexName'][':objectID'].$delete(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /1/indexes/{indexName}/{objectID}
 * Uses $url() for type-safe key generation
 */
export function getDelete1IndexesIndexNameObjectIDMutationKey() {
  return `DELETE ${client['1'].indexes[':indexName'][':objectID'].$url().pathname}`
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
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<(typeof client)['1']['indexes'][':indexName']['deleteByQuery']['$post']>
          >
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client)['1']['indexes'][':indexName']['deleteByQuery']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPost1IndexesIndexNameDeleteByQueryMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<
            (typeof client)['1']['indexes'][':indexName']['deleteByQuery']['$post']
          >
        },
      ) => parseResponse(client['1'].indexes[':indexName'].deleteByQuery.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /1/indexes/{indexName}/deleteByQuery
 * Uses $url() for type-safe key generation
 */
export function getPost1IndexesIndexNameDeleteByQueryMutationKey() {
  return `POST ${client['1'].indexes[':indexName'].deleteByQuery.$url().pathname}`
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
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client)['1']['indexes'][':indexName']['clear']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client)['1']['indexes'][':indexName']['clear']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPost1IndexesIndexNameClearMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<(typeof client)['1']['indexes'][':indexName']['clear']['$post']>
        },
      ) => parseResponse(client['1'].indexes[':indexName'].clear.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /1/indexes/{indexName}/clear
 * Uses $url() for type-safe key generation
 */
export function getPost1IndexesIndexNameClearMutationKey() {
  return `POST ${client['1'].indexes[':indexName'].clear.$url().pathname}`
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
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client)['1']['indexes'][':indexName'][':objectID']['partial']['$post']
            >
          >
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client)['1']['indexes'][':indexName'][':objectID']['partial']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPost1IndexesIndexNameObjectIDPartialMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<
            (typeof client)['1']['indexes'][':indexName'][':objectID']['partial']['$post']
          >
        },
      ) =>
        parseResponse(
          client['1'].indexes[':indexName'][':objectID'].partial.$post(arg, clientOptions),
        ),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /1/indexes/{indexName}/{objectID}/partial
 * Uses $url() for type-safe key generation
 */
export function getPost1IndexesIndexNameObjectIDPartialMutationKey() {
  return `POST ${client['1'].indexes[':indexName'][':objectID'].partial.$url().pathname}`
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
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client)['1']['indexes'][':indexName']['batch']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client)['1']['indexes'][':indexName']['batch']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPost1IndexesIndexNameBatchMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<(typeof client)['1']['indexes'][':indexName']['batch']['$post']>
        },
      ) => parseResponse(client['1'].indexes[':indexName'].batch.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /1/indexes/{indexName}/batch
 * Uses $url() for type-safe key generation
 */
export function getPost1IndexesIndexNameBatchMutationKey() {
  return `POST ${client['1'].indexes[':indexName'].batch.$url().pathname}`
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
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client)['1']['indexes']['*']['batch']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client)['1']['indexes']['*']['batch']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPost1IndexesBatchMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client)['1']['indexes']['*']['batch']['$post']> },
      ) => parseResponse(client['1'].indexes['*'].batch.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /1/indexes/* /batch
 * Uses $url() for type-safe key generation
 */
export function getPost1IndexesBatchMutationKey() {
  return `POST ${client['1'].indexes['*'].batch.$url().pathname}`
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
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client)['1']['indexes']['*']['objects']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client)['1']['indexes']['*']['objects']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPost1IndexesObjectsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: { arg: InferRequestType<(typeof client)['1']['indexes']['*']['objects']['$post']> },
      ) => parseResponse(client['1'].indexes['*'].objects.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /1/indexes/* /objects
 * Uses $url() for type-safe key generation
 */
export function getPost1IndexesObjectsMutationKey() {
  return `POST ${client['1'].indexes['*'].objects.$url().pathname}`
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGet1IndexesIndexNameSettingsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client['1'].indexes[':indexName'].settings.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /1/indexes/{indexName}/settings
 * Uses $url() for type-safe key generation
 */
export function getGet1IndexesIndexNameSettingsKey(
  args: InferRequestType<(typeof client)['1']['indexes'][':indexName']['settings']['$get']>,
) {
  return client['1'].indexes[':indexName'].settings.$url(args).pathname
}

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
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client)['1']['indexes'][':indexName']['settings']['$put']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client)['1']['indexes'][':indexName']['settings']['$put']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPut1IndexesIndexNameSettingsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<(typeof client)['1']['indexes'][':indexName']['settings']['$put']>
        },
      ) => parseResponse(client['1'].indexes[':indexName'].settings.$put(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /1/indexes/{indexName}/settings
 * Uses $url() for type-safe key generation
 */
export function getPut1IndexesIndexNameSettingsMutationKey() {
  return `PUT ${client['1'].indexes[':indexName'].settings.$url().pathname}`
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ?? (isEnabled ? getGet1IndexesIndexNameSynonymsObjectIDKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(
          client['1'].indexes[':indexName'].synonyms[':objectID'].$get(args, clientOptions),
        ),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /1/indexes/{indexName}/synonyms/{objectID}
 * Uses $url() for type-safe key generation
 */
export function getGet1IndexesIndexNameSynonymsObjectIDKey(
  args: InferRequestType<
    (typeof client)['1']['indexes'][':indexName']['synonyms'][':objectID']['$get']
  >,
) {
  return client['1'].indexes[':indexName'].synonyms[':objectID'].$url(args).pathname
}

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
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client)['1']['indexes'][':indexName']['synonyms'][':objectID']['$put']
            >
          >
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client)['1']['indexes'][':indexName']['synonyms'][':objectID']['$put']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPut1IndexesIndexNameSynonymsObjectIDMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<
            (typeof client)['1']['indexes'][':indexName']['synonyms'][':objectID']['$put']
          >
        },
      ) =>
        parseResponse(
          client['1'].indexes[':indexName'].synonyms[':objectID'].$put(arg, clientOptions),
        ),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /1/indexes/{indexName}/synonyms/{objectID}
 * Uses $url() for type-safe key generation
 */
export function getPut1IndexesIndexNameSynonymsObjectIDMutationKey() {
  return `PUT ${client['1'].indexes[':indexName'].synonyms[':objectID'].$url().pathname}`
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
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client)['1']['indexes'][':indexName']['synonyms'][':objectID']['$delete']
            >
          >
        >
      >
    >,
    Error,
    Key,
    InferRequestType<
      (typeof client)['1']['indexes'][':indexName']['synonyms'][':objectID']['$delete']
    >
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getDelete1IndexesIndexNameSynonymsObjectIDMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<
            (typeof client)['1']['indexes'][':indexName']['synonyms'][':objectID']['$delete']
          >
        },
      ) =>
        parseResponse(
          client['1'].indexes[':indexName'].synonyms[':objectID'].$delete(arg, clientOptions),
        ),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /1/indexes/{indexName}/synonyms/{objectID}
 * Uses $url() for type-safe key generation
 */
export function getDelete1IndexesIndexNameSynonymsObjectIDMutationKey() {
  return `DELETE ${client['1'].indexes[':indexName'].synonyms[':objectID'].$url().pathname}`
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
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<(typeof client)['1']['indexes'][':indexName']['synonyms']['batch']['$post']>
          >
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client)['1']['indexes'][':indexName']['synonyms']['batch']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPost1IndexesIndexNameSynonymsBatchMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<
            (typeof client)['1']['indexes'][':indexName']['synonyms']['batch']['$post']
          >
        },
      ) =>
        parseResponse(client['1'].indexes[':indexName'].synonyms.batch.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /1/indexes/{indexName}/synonyms/batch
 * Uses $url() for type-safe key generation
 */
export function getPost1IndexesIndexNameSynonymsBatchMutationKey() {
  return `POST ${client['1'].indexes[':indexName'].synonyms.batch.$url().pathname}`
}

/**
 * POST /1/indexes/{indexName}/synonyms/clear
 *
 * Delete all synonyms
 *
 * Deletes all synonyms from the index.
 */
export function usePost1IndexesIndexNameSynonymsClear(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<(typeof client)['1']['indexes'][':indexName']['synonyms']['clear']['$post']>
          >
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client)['1']['indexes'][':indexName']['synonyms']['clear']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPost1IndexesIndexNameSynonymsClearMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<
            (typeof client)['1']['indexes'][':indexName']['synonyms']['clear']['$post']
          >
        },
      ) =>
        parseResponse(client['1'].indexes[':indexName'].synonyms.clear.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /1/indexes/{indexName}/synonyms/clear
 * Uses $url() for type-safe key generation
 */
export function getPost1IndexesIndexNameSynonymsClearMutationKey() {
  return `POST ${client['1'].indexes[':indexName'].synonyms.clear.$url().pathname}`
}

/**
 * POST /1/indexes/{indexName}/synonyms/search
 *
 * Search for synonyms
 *
 * Searches for synonyms in your index.
 */
export function usePost1IndexesIndexNameSynonymsSearch(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<(typeof client)['1']['indexes'][':indexName']['synonyms']['search']['$post']>
          >
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client)['1']['indexes'][':indexName']['synonyms']['search']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPost1IndexesIndexNameSynonymsSearchMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<
            (typeof client)['1']['indexes'][':indexName']['synonyms']['search']['$post']
          >
        },
      ) =>
        parseResponse(client['1'].indexes[':indexName'].synonyms.search.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /1/indexes/{indexName}/synonyms/search
 * Uses $url() for type-safe key generation
 */
export function getPost1IndexesIndexNameSynonymsSearchMutationKey() {
  return `POST ${client['1'].indexes[':indexName'].synonyms.search.$url().pathname}`
}

/**
 * GET /1/keys
 *
 * List API keys
 *
 * Lists all API keys associated with your Algolia application, including their permissions and restrictions.
 */
export function useGet1Keys(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGet1KeysKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['1'].keys.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /1/keys
 * Uses $url() for type-safe key generation
 */
export function getGet1KeysKey() {
  return client['1'].keys.$url().pathname
}

/**
 * POST /1/keys
 *
 * Create an API key
 *
 * Creates a new API key with specific permissions and restrictions.
 */
export function usePost1Keys(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['1']['keys']['$post']>>>>
    >,
    Error,
    Key,
    InferRequestType<(typeof client)['1']['keys']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPost1KeysMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<(typeof client)['1']['keys']['$post']> }) =>
        parseResponse(client['1'].keys.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /1/keys
 * Uses $url() for type-safe key generation
 */
export function getPost1KeysMutationKey() {
  return `POST ${client['1'].keys.$url().pathname}`
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGet1KeysKeyKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['1'].keys[':key'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /1/keys/{key}
 * Uses $url() for type-safe key generation
 */
export function getGet1KeysKeyKey(
  args: InferRequestType<(typeof client)['1']['keys'][':key']['$get']>,
) {
  return client['1'].keys[':key'].$url(args).pathname
}

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
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client)['1']['keys'][':key']['$put']>>>
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client)['1']['keys'][':key']['$put']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPut1KeysKeyMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client)['1']['keys'][':key']['$put']> },
      ) => parseResponse(client['1'].keys[':key'].$put(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /1/keys/{key}
 * Uses $url() for type-safe key generation
 */
export function getPut1KeysKeyMutationKey() {
  return `PUT ${client['1'].keys[':key'].$url().pathname}`
}

/**
 * DELETE /1/keys/{key}
 *
 * Delete an API key
 *
 * Deletes the API key.
 */
export function useDelete1KeysKey(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client)['1']['keys'][':key']['$delete']>>>
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client)['1']['keys'][':key']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getDelete1KeysKeyMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client)['1']['keys'][':key']['$delete']> },
      ) => parseResponse(client['1'].keys[':key'].$delete(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /1/keys/{key}
 * Uses $url() for type-safe key generation
 */
export function getDelete1KeysKeyMutationKey() {
  return `DELETE ${client['1'].keys[':key'].$url().pathname}`
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
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client)['1']['keys'][':key']['restore']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client)['1']['keys'][':key']['restore']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPost1KeysKeyRestoreMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: { arg: InferRequestType<(typeof client)['1']['keys'][':key']['restore']['$post']> },
      ) => parseResponse(client['1'].keys[':key'].restore.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /1/keys/{key}/restore
 * Uses $url() for type-safe key generation
 */
export function getPost1KeysKeyRestoreMutationKey() {
  return `POST ${client['1'].keys[':key'].restore.$url().pathname}`
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ?? (isEnabled ? getGet1IndexesIndexNameRulesObjectIDKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(
          client['1'].indexes[':indexName'].rules[':objectID'].$get(args, clientOptions),
        ),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /1/indexes/{indexName}/rules/{objectID}
 * Uses $url() for type-safe key generation
 */
export function getGet1IndexesIndexNameRulesObjectIDKey(
  args: InferRequestType<
    (typeof client)['1']['indexes'][':indexName']['rules'][':objectID']['$get']
  >,
) {
  return client['1'].indexes[':indexName'].rules[':objectID'].$url(args).pathname
}

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
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<(typeof client)['1']['indexes'][':indexName']['rules'][':objectID']['$put']>
          >
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client)['1']['indexes'][':indexName']['rules'][':objectID']['$put']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPut1IndexesIndexNameRulesObjectIDMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<
            (typeof client)['1']['indexes'][':indexName']['rules'][':objectID']['$put']
          >
        },
      ) =>
        parseResponse(
          client['1'].indexes[':indexName'].rules[':objectID'].$put(arg, clientOptions),
        ),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /1/indexes/{indexName}/rules/{objectID}
 * Uses $url() for type-safe key generation
 */
export function getPut1IndexesIndexNameRulesObjectIDMutationKey() {
  return `PUT ${client['1'].indexes[':indexName'].rules[':objectID'].$url().pathname}`
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
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client)['1']['indexes'][':indexName']['rules'][':objectID']['$delete']
            >
          >
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client)['1']['indexes'][':indexName']['rules'][':objectID']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getDelete1IndexesIndexNameRulesObjectIDMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<
            (typeof client)['1']['indexes'][':indexName']['rules'][':objectID']['$delete']
          >
        },
      ) =>
        parseResponse(
          client['1'].indexes[':indexName'].rules[':objectID'].$delete(arg, clientOptions),
        ),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /1/indexes/{indexName}/rules/{objectID}
 * Uses $url() for type-safe key generation
 */
export function getDelete1IndexesIndexNameRulesObjectIDMutationKey() {
  return `DELETE ${client['1'].indexes[':indexName'].rules[':objectID'].$url().pathname}`
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
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<(typeof client)['1']['indexes'][':indexName']['rules']['batch']['$post']>
          >
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client)['1']['indexes'][':indexName']['rules']['batch']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPost1IndexesIndexNameRulesBatchMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<
            (typeof client)['1']['indexes'][':indexName']['rules']['batch']['$post']
          >
        },
      ) => parseResponse(client['1'].indexes[':indexName'].rules.batch.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /1/indexes/{indexName}/rules/batch
 * Uses $url() for type-safe key generation
 */
export function getPost1IndexesIndexNameRulesBatchMutationKey() {
  return `POST ${client['1'].indexes[':indexName'].rules.batch.$url().pathname}`
}

/**
 * POST /1/indexes/{indexName}/rules/clear
 *
 * Delete all rules
 *
 * Deletes all rules from the index.
 */
export function usePost1IndexesIndexNameRulesClear(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<(typeof client)['1']['indexes'][':indexName']['rules']['clear']['$post']>
          >
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client)['1']['indexes'][':indexName']['rules']['clear']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPost1IndexesIndexNameRulesClearMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<
            (typeof client)['1']['indexes'][':indexName']['rules']['clear']['$post']
          >
        },
      ) => parseResponse(client['1'].indexes[':indexName'].rules.clear.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /1/indexes/{indexName}/rules/clear
 * Uses $url() for type-safe key generation
 */
export function getPost1IndexesIndexNameRulesClearMutationKey() {
  return `POST ${client['1'].indexes[':indexName'].rules.clear.$url().pathname}`
}

/**
 * POST /1/indexes/{indexName}/rules/search
 *
 * Search for rules
 *
 * Searches for rules in your index.
 */
export function usePost1IndexesIndexNameRulesSearch(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<(typeof client)['1']['indexes'][':indexName']['rules']['search']['$post']>
          >
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client)['1']['indexes'][':indexName']['rules']['search']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPost1IndexesIndexNameRulesSearchMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<
            (typeof client)['1']['indexes'][':indexName']['rules']['search']['$post']
          >
        },
      ) => parseResponse(client['1'].indexes[':indexName'].rules.search.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /1/indexes/{indexName}/rules/search
 * Uses $url() for type-safe key generation
 */
export function getPost1IndexesIndexNameRulesSearchMutationKey() {
  return `POST ${client['1'].indexes[':indexName'].rules.search.$url().pathname}`
}

/**
 * POST /1/dictionaries/{dictionaryName}/batch
 *
 * Add or delete dictionary entries
 *
 * Adds or deletes multiple entries from your plurals, segmentation, or stop word dictionaries.
 */
export function usePost1DictionariesDictionaryNameBatch(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<(typeof client)['1']['dictionaries'][':dictionaryName']['batch']['$post']>
          >
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client)['1']['dictionaries'][':dictionaryName']['batch']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPost1DictionariesDictionaryNameBatchMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<
            (typeof client)['1']['dictionaries'][':dictionaryName']['batch']['$post']
          >
        },
      ) =>
        parseResponse(client['1'].dictionaries[':dictionaryName'].batch.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /1/dictionaries/{dictionaryName}/batch
 * Uses $url() for type-safe key generation
 */
export function getPost1DictionariesDictionaryNameBatchMutationKey() {
  return `POST ${client['1'].dictionaries[':dictionaryName'].batch.$url().pathname}`
}

/**
 * POST /1/dictionaries/{dictionaryName}/search
 *
 * Search dictionary entries
 *
 * Searches for standard and custom dictionary entries.
 */
export function usePost1DictionariesDictionaryNameSearch(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<(typeof client)['1']['dictionaries'][':dictionaryName']['search']['$post']>
          >
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client)['1']['dictionaries'][':dictionaryName']['search']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPost1DictionariesDictionaryNameSearchMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<
            (typeof client)['1']['dictionaries'][':dictionaryName']['search']['$post']
          >
        },
      ) =>
        parseResponse(client['1'].dictionaries[':dictionaryName'].search.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /1/dictionaries/{dictionaryName}/search
 * Uses $url() for type-safe key generation
 */
export function getPost1DictionariesDictionaryNameSearchMutationKey() {
  return `POST ${client['1'].dictionaries[':dictionaryName'].search.$url().pathname}`
}

/**
 * GET /1/dictionaries/[*]/settings
 *
 * Retrieve dictionary settings
 *
 * Retrieves the languages for which standard dictionary entries are turned off.
 */
export function useGet1DictionariesSettings(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGet1DictionariesSettingsKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client['1'].dictionaries['*'].settings.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /1/dictionaries/* /settings
 * Uses $url() for type-safe key generation
 */
export function getGet1DictionariesSettingsKey() {
  return client['1'].dictionaries['*'].settings.$url().pathname
}

/**
 * PUT /1/dictionaries/[*]/settings
 *
 * Update dictionary settings
 *
 * Turns standard stop word dictionary entries on or off for a given language.
 */
export function usePut1DictionariesSettings(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client)['1']['dictionaries']['*']['settings']['$put']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client)['1']['dictionaries']['*']['settings']['$put']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPut1DictionariesSettingsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: { arg: InferRequestType<(typeof client)['1']['dictionaries']['*']['settings']['$put']> },
      ) => parseResponse(client['1'].dictionaries['*'].settings.$put(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /1/dictionaries/* /settings
 * Uses $url() for type-safe key generation
 */
export function getPut1DictionariesSettingsMutationKey() {
  return `PUT ${client['1'].dictionaries['*'].settings.$url().pathname}`
}

/**
 * GET /1/dictionaries/[*]/languages
 *
 * List available languages
 *
 * Lists supported languages with their supported dictionary types and number of custom entries.
 */
export function useGet1DictionariesLanguages(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGet1DictionariesLanguagesKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client['1'].dictionaries['*'].languages.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /1/dictionaries/* /languages
 * Uses $url() for type-safe key generation
 */
export function getGet1DictionariesLanguagesKey() {
  return client['1'].dictionaries['*'].languages.$url().pathname
}

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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGet1ClustersMappingKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['1'].clusters.mapping.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /1/clusters/mapping
 * Uses $url() for type-safe key generation
 */
export function getGet1ClustersMappingKey(
  args: InferRequestType<(typeof client)['1']['clusters']['mapping']['$get']>,
) {
  return client['1'].clusters.mapping.$url(args).pathname
}

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
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client)['1']['clusters']['mapping']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client)['1']['clusters']['mapping']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPost1ClustersMappingMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client)['1']['clusters']['mapping']['$post']> },
      ) => parseResponse(client['1'].clusters.mapping.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /1/clusters/mapping
 * Uses $url() for type-safe key generation
 */
export function getPost1ClustersMappingMutationKey() {
  return `POST ${client['1'].clusters.mapping.$url().pathname}`
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
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client)['1']['clusters']['mapping']['batch']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client)['1']['clusters']['mapping']['batch']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPost1ClustersMappingBatchMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: { arg: InferRequestType<(typeof client)['1']['clusters']['mapping']['batch']['$post']> },
      ) => parseResponse(client['1'].clusters.mapping.batch.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /1/clusters/mapping/batch
 * Uses $url() for type-safe key generation
 */
export function getPost1ClustersMappingBatchMutationKey() {
  return `POST ${client['1'].clusters.mapping.batch.$url().pathname}`
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
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGet1ClustersMappingTopKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['1'].clusters.mapping.top.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /1/clusters/mapping/top
 * Uses $url() for type-safe key generation
 */
export function getGet1ClustersMappingTopKey() {
  return client['1'].clusters.mapping.top.$url().pathname
}

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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGet1ClustersMappingUserIDKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['1'].clusters.mapping[':userID'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /1/clusters/mapping/{userID}
 * Uses $url() for type-safe key generation
 */
export function getGet1ClustersMappingUserIDKey(
  args: InferRequestType<(typeof client)['1']['clusters']['mapping'][':userID']['$get']>,
) {
  return client['1'].clusters.mapping[':userID'].$url(args).pathname
}

/**
 * DELETE /1/clusters/mapping/{userID}
 *
 * Delete user ID
 *
 * Deletes a user ID and its associated data from the clusters.
 */
export function useDelete1ClustersMappingUserID(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client)['1']['clusters']['mapping'][':userID']['$delete']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client)['1']['clusters']['mapping'][':userID']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getDelete1ClustersMappingUserIDMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<(typeof client)['1']['clusters']['mapping'][':userID']['$delete']>
        },
      ) => parseResponse(client['1'].clusters.mapping[':userID'].$delete(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /1/clusters/mapping/{userID}
 * Uses $url() for type-safe key generation
 */
export function getDelete1ClustersMappingUserIDMutationKey() {
  return `DELETE ${client['1'].clusters.mapping[':userID'].$url().pathname}`
}

/**
 * GET /1/clusters
 *
 * List clusters
 *
 * Lists the available clusters in a multi-cluster setup.
 */
export function useGet1Clusters(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGet1ClustersKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['1'].clusters.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /1/clusters
 * Uses $url() for type-safe key generation
 */
export function getGet1ClustersKey() {
  return client['1'].clusters.$url().pathname
}

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
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client)['1']['clusters']['mapping']['search']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client)['1']['clusters']['mapping']['search']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPost1ClustersMappingSearchMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<(typeof client)['1']['clusters']['mapping']['search']['$post']>
        },
      ) => parseResponse(client['1'].clusters.mapping.search.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /1/clusters/mapping/search
 * Uses $url() for type-safe key generation
 */
export function getPost1ClustersMappingSearchMutationKey() {
  return `POST ${client['1'].clusters.mapping.search.$url().pathname}`
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGet1ClustersMappingPendingKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['1'].clusters.mapping.pending.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /1/clusters/mapping/pending
 * Uses $url() for type-safe key generation
 */
export function getGet1ClustersMappingPendingKey(
  args: InferRequestType<(typeof client)['1']['clusters']['mapping']['pending']['$get']>,
) {
  return client['1'].clusters.mapping.pending.$url(args).pathname
}

/**
 * GET /1/security/sources
 *
 * List allowed sources
 *
 * Retrieves all allowed IP addresses with access to your application.
 */
export function useGet1SecuritySources(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGet1SecuritySourcesKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['1'].security.sources.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /1/security/sources
 * Uses $url() for type-safe key generation
 */
export function getGet1SecuritySourcesKey() {
  return client['1'].security.sources.$url().pathname
}

/**
 * PUT /1/security/sources
 *
 * Replace allowed sources
 *
 * Replaces the list of allowed sources.
 */
export function usePut1SecuritySources(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client)['1']['security']['sources']['$put']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client)['1']['security']['sources']['$put']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPut1SecuritySourcesMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client)['1']['security']['sources']['$put']> },
      ) => parseResponse(client['1'].security.sources.$put(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /1/security/sources
 * Uses $url() for type-safe key generation
 */
export function getPut1SecuritySourcesMutationKey() {
  return `PUT ${client['1'].security.sources.$url().pathname}`
}

/**
 * POST /1/security/sources/append
 *
 * Add a source
 *
 * Adds a source to the list of allowed sources.
 */
export function usePost1SecuritySourcesAppend(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client)['1']['security']['sources']['append']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client)['1']['security']['sources']['append']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPost1SecuritySourcesAppendMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<(typeof client)['1']['security']['sources']['append']['$post']>
        },
      ) => parseResponse(client['1'].security.sources.append.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /1/security/sources/append
 * Uses $url() for type-safe key generation
 */
export function getPost1SecuritySourcesAppendMutationKey() {
  return `POST ${client['1'].security.sources.append.$url().pathname}`
}

/**
 * DELETE /1/security/sources/{source}
 *
 * Delete a source
 *
 * Deletes a source from the list of allowed sources.
 */
export function useDelete1SecuritySourcesSource(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client)['1']['security']['sources'][':source']['$delete']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client)['1']['security']['sources'][':source']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getDelete1SecuritySourcesSourceMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<(typeof client)['1']['security']['sources'][':source']['$delete']>
        },
      ) => parseResponse(client['1'].security.sources[':source'].$delete(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /1/security/sources/{source}
 * Uses $url() for type-safe key generation
 */
export function getDelete1SecuritySourcesSourceMutationKey() {
  return `DELETE ${client['1'].security.sources[':source'].$url().pathname}`
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGet1LogsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['1'].logs.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /1/logs
 * Uses $url() for type-safe key generation
 */
export function getGet1LogsKey(args: InferRequestType<(typeof client)['1']['logs']['$get']>) {
  return client['1'].logs.$url(args).pathname
}

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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGet1TaskTaskIDKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['1'].task[':taskID'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /1/task/{taskID}
 * Uses $url() for type-safe key generation
 */
export function getGet1TaskTaskIDKey(
  args: InferRequestType<(typeof client)['1']['task'][':taskID']['$get']>,
) {
  return client['1'].task[':taskID'].$url(args).pathname
}

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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ?? (isEnabled ? getGet1IndexesIndexNameTaskTaskIDKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client['1'].indexes[':indexName'].task[':taskID'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /1/indexes/{indexName}/task/{taskID}
 * Uses $url() for type-safe key generation
 */
export function getGet1IndexesIndexNameTaskTaskIDKey(
  args: InferRequestType<(typeof client)['1']['indexes'][':indexName']['task'][':taskID']['$get']>,
) {
  return client['1'].indexes[':indexName'].task[':taskID'].$url(args).pathname
}

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
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client)['1']['indexes'][':indexName']['operation']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client)['1']['indexes'][':indexName']['operation']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPost1IndexesIndexNameOperationMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<(typeof client)['1']['indexes'][':indexName']['operation']['$post']>
        },
      ) => parseResponse(client['1'].indexes[':indexName'].operation.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /1/indexes/{indexName}/operation
 * Uses $url() for type-safe key generation
 */
export function getPost1IndexesIndexNameOperationMutationKey() {
  return `POST ${client['1'].indexes[':indexName'].operation.$url().pathname}`
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGet1IndexesKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['1'].indexes.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /1/indexes
 * Uses $url() for type-safe key generation
 */
export function getGet1IndexesKey(args: InferRequestType<(typeof client)['1']['indexes']['$get']>) {
  return client['1'].indexes.$url(args).pathname
}

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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetWaitForApiKeyKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.waitForApiKey.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /waitForApiKey
 * Uses $url() for type-safe key generation
 */
export function getGetWaitForApiKeyKey(args: InferRequestType<typeof client.waitForApiKey.$get>) {
  return client.waitForApiKey.$url(args).pathname
}

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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetWaitForTaskKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.waitForTask.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /waitForTask
 * Uses $url() for type-safe key generation
 */
export function getGetWaitForTaskKey(args: InferRequestType<typeof client.waitForTask.$get>) {
  return client.waitForTask.$url(args).pathname
}

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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetWaitForAppTaskKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.waitForAppTask.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /waitForAppTask
 * Uses $url() for type-safe key generation
 */
export function getGetWaitForAppTaskKey(args: InferRequestType<typeof client.waitForAppTask.$get>) {
  return client.waitForAppTask.$url(args).pathname
}

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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetBrowseObjectsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.browseObjects.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /browseObjects
 * Uses $url() for type-safe key generation
 */
export function getGetBrowseObjectsKey(args: InferRequestType<typeof client.browseObjects.$get>) {
  return client.browseObjects.$url(args).pathname
}

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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetGenerateSecuredApiKeyKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.generateSecuredApiKey.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /generateSecuredApiKey
 * Uses $url() for type-safe key generation
 */
export function getGetGenerateSecuredApiKeyKey(
  args: InferRequestType<typeof client.generateSecuredApiKey.$get>,
) {
  return client.generateSecuredApiKey.$url(args).pathname
}

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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetAccountCopyIndexKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.accountCopyIndex.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /accountCopyIndex
 * Uses $url() for type-safe key generation
 */
export function getGetAccountCopyIndexKey(
  args: InferRequestType<typeof client.accountCopyIndex.$get>,
) {
  return client.accountCopyIndex.$url(args).pathname
}

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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetReplaceAllObjectsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.replaceAllObjects.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /replaceAllObjects
 * Uses $url() for type-safe key generation
 */
export function getGetReplaceAllObjectsKey(
  args: InferRequestType<typeof client.replaceAllObjects.$get>,
) {
  return client.replaceAllObjects.$url(args).pathname
}

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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ?? (isEnabled ? getGetReplaceAllObjectsWithTransformationKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.replaceAllObjectsWithTransformation.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /replaceAllObjectsWithTransformation
 * Uses $url() for type-safe key generation
 */
export function getGetReplaceAllObjectsWithTransformationKey(
  args: InferRequestType<typeof client.replaceAllObjectsWithTransformation.$get>,
) {
  return client.replaceAllObjectsWithTransformation.$url(args).pathname
}

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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetChunkedBatchKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.chunkedBatch.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /chunkedBatch
 * Uses $url() for type-safe key generation
 */
export function getGetChunkedBatchKey(args: InferRequestType<typeof client.chunkedBatch.$get>) {
  return client.chunkedBatch.$url(args).pathname
}

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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetSaveObjectsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.saveObjects.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /saveObjects
 * Uses $url() for type-safe key generation
 */
export function getGetSaveObjectsKey(args: InferRequestType<typeof client.saveObjects.$get>) {
  return client.saveObjects.$url(args).pathname
}

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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ?? (isEnabled ? getGetSaveObjectsWithTransformationKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.saveObjectsWithTransformation.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /saveObjectsWithTransformation
 * Uses $url() for type-safe key generation
 */
export function getGetSaveObjectsWithTransformationKey(
  args: InferRequestType<typeof client.saveObjectsWithTransformation.$get>,
) {
  return client.saveObjectsWithTransformation.$url(args).pathname
}

/**
 * POST /deleteObjects
 *
 * Deletes every records for the given objectIDs
 *
 * Helper: Deletes every records for the given objectIDs. The `chunkedBatch` helper is used under the hood, which creates a `batch` requests with at most 1000 objectIDs in it.
 */
export function usePostDeleteObjects(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.deleteObjects.$post>>>>
    >,
    Error,
    Key,
    InferRequestType<typeof client.deleteObjects.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPostDeleteObjectsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.deleteObjects.$post> }) =>
        parseResponse(client.deleteObjects.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /deleteObjects
 * Uses $url() for type-safe key generation
 */
export function getPostDeleteObjectsMutationKey() {
  return `POST ${client.deleteObjects.$url().pathname}`
}

/**
 * POST /partialUpdateObjects
 *
 * Replaces object content of all the given objects according to their respective `objectID` field
 *
 * Helper: Replaces object content of all the given objects according to their respective `objectID` field. The `chunkedBatch` helper is used under the hood, which creates a `batch` requests with at most 1000 objects in it.
 */
export function usePostPartialUpdateObjects(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.partialUpdateObjects.$post>>>
      >
    >,
    Error,
    Key,
    InferRequestType<typeof client.partialUpdateObjects.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPostPartialUpdateObjectsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<typeof client.partialUpdateObjects.$post> },
      ) => parseResponse(client.partialUpdateObjects.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /partialUpdateObjects
 * Uses $url() for type-safe key generation
 */
export function getPostPartialUpdateObjectsMutationKey() {
  return `POST ${client.partialUpdateObjects.$url().pathname}`
}

/**
 * POST /partialUpdateObjectsWithTransformation
 *
 * Save objects to an Algolia index by leveraging the Transformation pipeline setup using the Push connector (https://www.algolia.com/doc/guides/sending-and-managing-data/send-and-update-your-data/connectors/push)
 *
 * Helper: Similar to the `partialUpdateObjects` method but requires a Push connector (https://www.algolia.com/doc/guides/sending-and-managing-data/send-and-update-your-data/connectors/push) to be created first, in order to transform records before indexing them to Algolia. The `region` must have been passed to the client instantiation method.
 */
export function usePostPartialUpdateObjectsWithTransformation(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<typeof client.partialUpdateObjectsWithTransformation.$post>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<typeof client.partialUpdateObjectsWithTransformation.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey =
    mutationOptions?.swrKey ?? getPostPartialUpdateObjectsWithTransformationMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: { arg: InferRequestType<typeof client.partialUpdateObjectsWithTransformation.$post> },
      ) => parseResponse(client.partialUpdateObjectsWithTransformation.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /partialUpdateObjectsWithTransformation
 * Uses $url() for type-safe key generation
 */
export function getPostPartialUpdateObjectsWithTransformationMutationKey() {
  return `POST ${client.partialUpdateObjectsWithTransformation.$url().pathname}`
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetIndexExistsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.indexExists.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /indexExists
 * Uses $url() for type-safe key generation
 */
export function getGetIndexExistsKey(args: InferRequestType<typeof client.indexExists.$get>) {
  return client.indexExists.$url(args).pathname
}

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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetSetClientApiKeyKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.setClientApiKey.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /setClientApiKey
 * Uses $url() for type-safe key generation
 */
export function getGetSetClientApiKeyKey(
  args: InferRequestType<typeof client.setClientApiKey.$get>,
) {
  return client.setClientApiKey.$url(args).pathname
}
