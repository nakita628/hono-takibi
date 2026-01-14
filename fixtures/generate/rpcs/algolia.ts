import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { client } from '../clients/algolia'

/**
 * GET /{path}
 *
 * Send requests to the Algolia REST API
 *
 * This method lets you send requests to the Algolia REST API.
 */
export async function getPath(
  args: InferRequestType<(typeof client)[':path']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client[':path'].$get(args, options)
}

/**
 * PUT /{path}
 *
 * Send requests to the Algolia REST API
 *
 * This method lets you send requests to the Algolia REST API.
 */
export async function putPath(
  args: InferRequestType<(typeof client)[':path']['$put']>,
  options?: ClientRequestOptions,
) {
  return await client[':path'].$put(args, options)
}

/**
 * POST /{path}
 *
 * Send requests to the Algolia REST API
 *
 * This method lets you send requests to the Algolia REST API.
 */
export async function postPath(
  args: InferRequestType<(typeof client)[':path']['$post']>,
  options?: ClientRequestOptions,
) {
  return await client[':path'].$post(args, options)
}

/**
 * DELETE /{path}
 *
 * Send requests to the Algolia REST API
 *
 * This method lets you send requests to the Algolia REST API.
 */
export async function deletePath(
  args: InferRequestType<(typeof client)[':path']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await client[':path'].$delete(args, options)
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
export async function post1IndexesIndexNameQuery(
  args: InferRequestType<(typeof client)['1']['indexes'][':indexName']['query']['$post']>,
  options?: ClientRequestOptions,
) {
  return await client['1'].indexes[':indexName'].query.$post(args, options)
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
export async function post1IndexesQueries(
  args: InferRequestType<(typeof client)['1']['indexes']['*']['queries']['$post']>,
  options?: ClientRequestOptions,
) {
  return await client['1'].indexes['*'].queries.$post(args, options)
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
export async function post1IndexesIndexNameFacetsFacetNameQuery(
  args: InferRequestType<
    (typeof client)['1']['indexes'][':indexName']['facets'][':facetName']['query']['$post']
  >,
  options?: ClientRequestOptions,
) {
  return await client['1'].indexes[':indexName'].facets[':facetName'].query.$post(args, options)
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
export async function post1IndexesIndexNameBrowse(
  args: InferRequestType<(typeof client)['1']['indexes'][':indexName']['browse']['$post']>,
  options?: ClientRequestOptions,
) {
  return await client['1'].indexes[':indexName'].browse.$post(args, options)
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
export async function post1IndexesIndexName(
  args: InferRequestType<(typeof client)['1']['indexes'][':indexName']['$post']>,
  options?: ClientRequestOptions,
) {
  return await client['1'].indexes[':indexName'].$post(args, options)
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
export async function delete1IndexesIndexName(
  args: InferRequestType<(typeof client)['1']['indexes'][':indexName']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await client['1'].indexes[':indexName'].$delete(args, options)
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
export async function get1IndexesIndexNameObjectID(
  args: InferRequestType<(typeof client)['1']['indexes'][':indexName'][':objectID']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client['1'].indexes[':indexName'][':objectID'].$get(args, options)
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
export async function put1IndexesIndexNameObjectID(
  args: InferRequestType<(typeof client)['1']['indexes'][':indexName'][':objectID']['$put']>,
  options?: ClientRequestOptions,
) {
  return await client['1'].indexes[':indexName'][':objectID'].$put(args, options)
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
export async function delete1IndexesIndexNameObjectID(
  args: InferRequestType<(typeof client)['1']['indexes'][':indexName'][':objectID']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await client['1'].indexes[':indexName'][':objectID'].$delete(args, options)
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
export async function post1IndexesIndexNameDeleteByQuery(
  args: InferRequestType<(typeof client)['1']['indexes'][':indexName']['deleteByQuery']['$post']>,
  options?: ClientRequestOptions,
) {
  return await client['1'].indexes[':indexName'].deleteByQuery.$post(args, options)
}

/**
 * POST /1/indexes/{indexName}/clear
 *
 * Delete all records from an index
 *
 * Deletes only the records from an index while keeping settings, synonyms, and rules.
 * This operation is resource-intensive and subject to [indexing rate limits](https://support.algolia.com/hc/articles/4406975251089-Is-there-a-rate-limit-for-indexing-on-Algolia).
 */
export async function post1IndexesIndexNameClear(
  args: InferRequestType<(typeof client)['1']['indexes'][':indexName']['clear']['$post']>,
  options?: ClientRequestOptions,
) {
  return await client['1'].indexes[':indexName'].clear.$post(args, options)
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
export async function post1IndexesIndexNameObjectIDPartial(
  args: InferRequestType<
    (typeof client)['1']['indexes'][':indexName'][':objectID']['partial']['$post']
  >,
  options?: ClientRequestOptions,
) {
  return await client['1'].indexes[':indexName'][':objectID'].partial.$post(args, options)
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
export async function post1IndexesIndexNameBatch(
  args: InferRequestType<(typeof client)['1']['indexes'][':indexName']['batch']['$post']>,
  options?: ClientRequestOptions,
) {
  return await client['1'].indexes[':indexName'].batch.$post(args, options)
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
export async function post1IndexesBatch(
  args: InferRequestType<(typeof client)['1']['indexes']['*']['batch']['$post']>,
  options?: ClientRequestOptions,
) {
  return await client['1'].indexes['*'].batch.$post(args, options)
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
export async function post1IndexesObjects(
  args: InferRequestType<(typeof client)['1']['indexes']['*']['objects']['$post']>,
  options?: ClientRequestOptions,
) {
  return await client['1'].indexes['*'].objects.$post(args, options)
}

/**
 * GET /1/indexes/{indexName}/settings
 *
 * Retrieve index settings
 *
 * Retrieves an object with non-null index settings.
 */
export async function get1IndexesIndexNameSettings(
  args: InferRequestType<(typeof client)['1']['indexes'][':indexName']['settings']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client['1'].indexes[':indexName'].settings.$get(args, options)
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
export async function put1IndexesIndexNameSettings(
  args: InferRequestType<(typeof client)['1']['indexes'][':indexName']['settings']['$put']>,
  options?: ClientRequestOptions,
) {
  return await client['1'].indexes[':indexName'].settings.$put(args, options)
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
export async function get1IndexesIndexNameSynonymsObjectID(
  args: InferRequestType<
    (typeof client)['1']['indexes'][':indexName']['synonyms'][':objectID']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await client['1'].indexes[':indexName'].synonyms[':objectID'].$get(args, options)
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
export async function put1IndexesIndexNameSynonymsObjectID(
  args: InferRequestType<
    (typeof client)['1']['indexes'][':indexName']['synonyms'][':objectID']['$put']
  >,
  options?: ClientRequestOptions,
) {
  return await client['1'].indexes[':indexName'].synonyms[':objectID'].$put(args, options)
}

/**
 * DELETE /1/indexes/{indexName}/synonyms/{objectID}
 *
 * Delete a synonym
 *
 * Deletes a synonym by its ID.
 * To find the object IDs of your synonyms, use the [`search` operation](https://www.algolia.com/doc/rest-api/search/search-synonyms).
 */
export async function delete1IndexesIndexNameSynonymsObjectID(
  args: InferRequestType<
    (typeof client)['1']['indexes'][':indexName']['synonyms'][':objectID']['$delete']
  >,
  options?: ClientRequestOptions,
) {
  return await client['1'].indexes[':indexName'].synonyms[':objectID'].$delete(args, options)
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
export async function post1IndexesIndexNameSynonymsBatch(
  args: InferRequestType<
    (typeof client)['1']['indexes'][':indexName']['synonyms']['batch']['$post']
  >,
  options?: ClientRequestOptions,
) {
  return await client['1'].indexes[':indexName'].synonyms.batch.$post(args, options)
}

/**
 * POST /1/indexes/{indexName}/synonyms/clear
 *
 * Delete all synonyms
 *
 * Deletes all synonyms from the index.
 */
export async function post1IndexesIndexNameSynonymsClear(
  args: InferRequestType<
    (typeof client)['1']['indexes'][':indexName']['synonyms']['clear']['$post']
  >,
  options?: ClientRequestOptions,
) {
  return await client['1'].indexes[':indexName'].synonyms.clear.$post(args, options)
}

/**
 * POST /1/indexes/{indexName}/synonyms/search
 *
 * Search for synonyms
 *
 * Searches for synonyms in your index.
 */
export async function post1IndexesIndexNameSynonymsSearch(
  args: InferRequestType<
    (typeof client)['1']['indexes'][':indexName']['synonyms']['search']['$post']
  >,
  options?: ClientRequestOptions,
) {
  return await client['1'].indexes[':indexName'].synonyms.search.$post(args, options)
}

/**
 * GET /1/keys
 *
 * List API keys
 *
 * Lists all API keys associated with your Algolia application, including their permissions and restrictions.
 */
export async function get1Keys(options?: ClientRequestOptions) {
  return await client['1'].keys.$get(undefined, options)
}

/**
 * POST /1/keys
 *
 * Create an API key
 *
 * Creates a new API key with specific permissions and restrictions.
 */
export async function post1Keys(
  args: InferRequestType<(typeof client)['1']['keys']['$post']>,
  options?: ClientRequestOptions,
) {
  return await client['1'].keys.$post(args, options)
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
export async function get1KeysKey(
  args: InferRequestType<(typeof client)['1']['keys'][':key']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client['1'].keys[':key'].$get(args, options)
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
export async function put1KeysKey(
  args: InferRequestType<(typeof client)['1']['keys'][':key']['$put']>,
  options?: ClientRequestOptions,
) {
  return await client['1'].keys[':key'].$put(args, options)
}

/**
 * DELETE /1/keys/{key}
 *
 * Delete an API key
 *
 * Deletes the API key.
 */
export async function delete1KeysKey(
  args: InferRequestType<(typeof client)['1']['keys'][':key']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await client['1'].keys[':key'].$delete(args, options)
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
export async function post1KeysKeyRestore(
  args: InferRequestType<(typeof client)['1']['keys'][':key']['restore']['$post']>,
  options?: ClientRequestOptions,
) {
  return await client['1'].keys[':key'].restore.$post(args, options)
}

/**
 * GET /1/indexes/{indexName}/rules/{objectID}
 *
 * Retrieve a rule
 *
 * Retrieves a rule by its ID.
 * To find the object ID of rules, use the [`search` operation](https://www.algolia.com/doc/rest-api/search/search-rules).
 */
export async function get1IndexesIndexNameRulesObjectID(
  args: InferRequestType<
    (typeof client)['1']['indexes'][':indexName']['rules'][':objectID']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await client['1'].indexes[':indexName'].rules[':objectID'].$get(args, options)
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
export async function put1IndexesIndexNameRulesObjectID(
  args: InferRequestType<
    (typeof client)['1']['indexes'][':indexName']['rules'][':objectID']['$put']
  >,
  options?: ClientRequestOptions,
) {
  return await client['1'].indexes[':indexName'].rules[':objectID'].$put(args, options)
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
export async function delete1IndexesIndexNameRulesObjectID(
  args: InferRequestType<
    (typeof client)['1']['indexes'][':indexName']['rules'][':objectID']['$delete']
  >,
  options?: ClientRequestOptions,
) {
  return await client['1'].indexes[':indexName'].rules[':objectID'].$delete(args, options)
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
export async function post1IndexesIndexNameRulesBatch(
  args: InferRequestType<(typeof client)['1']['indexes'][':indexName']['rules']['batch']['$post']>,
  options?: ClientRequestOptions,
) {
  return await client['1'].indexes[':indexName'].rules.batch.$post(args, options)
}

/**
 * POST /1/indexes/{indexName}/rules/clear
 *
 * Delete all rules
 *
 * Deletes all rules from the index.
 */
export async function post1IndexesIndexNameRulesClear(
  args: InferRequestType<(typeof client)['1']['indexes'][':indexName']['rules']['clear']['$post']>,
  options?: ClientRequestOptions,
) {
  return await client['1'].indexes[':indexName'].rules.clear.$post(args, options)
}

/**
 * POST /1/indexes/{indexName}/rules/search
 *
 * Search for rules
 *
 * Searches for rules in your index.
 */
export async function post1IndexesIndexNameRulesSearch(
  args: InferRequestType<(typeof client)['1']['indexes'][':indexName']['rules']['search']['$post']>,
  options?: ClientRequestOptions,
) {
  return await client['1'].indexes[':indexName'].rules.search.$post(args, options)
}

/**
 * POST /1/dictionaries/{dictionaryName}/batch
 *
 * Add or delete dictionary entries
 *
 * Adds or deletes multiple entries from your plurals, segmentation, or stop word dictionaries.
 */
export async function post1DictionariesDictionaryNameBatch(
  args: InferRequestType<(typeof client)['1']['dictionaries'][':dictionaryName']['batch']['$post']>,
  options?: ClientRequestOptions,
) {
  return await client['1'].dictionaries[':dictionaryName'].batch.$post(args, options)
}

/**
 * POST /1/dictionaries/{dictionaryName}/search
 *
 * Search dictionary entries
 *
 * Searches for standard and custom dictionary entries.
 */
export async function post1DictionariesDictionaryNameSearch(
  args: InferRequestType<
    (typeof client)['1']['dictionaries'][':dictionaryName']['search']['$post']
  >,
  options?: ClientRequestOptions,
) {
  return await client['1'].dictionaries[':dictionaryName'].search.$post(args, options)
}

/**
 * GET /1/dictionaries/[*]/settings
 *
 * Retrieve dictionary settings
 *
 * Retrieves the languages for which standard dictionary entries are turned off.
 */
export async function get1DictionariesSettings(options?: ClientRequestOptions) {
  return await client['1'].dictionaries['*'].settings.$get(undefined, options)
}

/**
 * PUT /1/dictionaries/[*]/settings
 *
 * Update dictionary settings
 *
 * Turns standard stop word dictionary entries on or off for a given language.
 */
export async function put1DictionariesSettings(
  args: InferRequestType<(typeof client)['1']['dictionaries']['*']['settings']['$put']>,
  options?: ClientRequestOptions,
) {
  return await client['1'].dictionaries['*'].settings.$put(args, options)
}

/**
 * GET /1/dictionaries/[*]/languages
 *
 * List available languages
 *
 * Lists supported languages with their supported dictionary types and number of custom entries.
 */
export async function get1DictionariesLanguages(options?: ClientRequestOptions) {
  return await client['1'].dictionaries['*'].languages.$get(undefined, options)
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
export async function get1ClustersMapping(
  args: InferRequestType<(typeof client)['1']['clusters']['mapping']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client['1'].clusters.mapping.$get(args, options)
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
export async function post1ClustersMapping(
  args: InferRequestType<(typeof client)['1']['clusters']['mapping']['$post']>,
  options?: ClientRequestOptions,
) {
  return await client['1'].clusters.mapping.$post(args, options)
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
export async function post1ClustersMappingBatch(
  args: InferRequestType<(typeof client)['1']['clusters']['mapping']['batch']['$post']>,
  options?: ClientRequestOptions,
) {
  return await client['1'].clusters.mapping.batch.$post(args, options)
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
export async function get1ClustersMappingTop(options?: ClientRequestOptions) {
  return await client['1'].clusters.mapping.top.$get(undefined, options)
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
export async function get1ClustersMappingUserID(
  args: InferRequestType<(typeof client)['1']['clusters']['mapping'][':userID']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client['1'].clusters.mapping[':userID'].$get(args, options)
}

/**
 * DELETE /1/clusters/mapping/{userID}
 *
 * Delete user ID
 *
 * Deletes a user ID and its associated data from the clusters.
 */
export async function delete1ClustersMappingUserID(
  args: InferRequestType<(typeof client)['1']['clusters']['mapping'][':userID']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await client['1'].clusters.mapping[':userID'].$delete(args, options)
}

/**
 * GET /1/clusters
 *
 * List clusters
 *
 * Lists the available clusters in a multi-cluster setup.
 */
export async function get1Clusters(options?: ClientRequestOptions) {
  return await client['1'].clusters.$get(undefined, options)
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
export async function post1ClustersMappingSearch(
  args: InferRequestType<(typeof client)['1']['clusters']['mapping']['search']['$post']>,
  options?: ClientRequestOptions,
) {
  return await client['1'].clusters.mapping.search.$post(args, options)
}

/**
 * GET /1/clusters/mapping/pending
 *
 * Get migration and user mapping status
 *
 * To determine when the time-consuming process of creating a large batch of users or migrating users from one cluster to another is complete, this operation retrieves the status of the process.
 */
export async function get1ClustersMappingPending(
  args: InferRequestType<(typeof client)['1']['clusters']['mapping']['pending']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client['1'].clusters.mapping.pending.$get(args, options)
}

/**
 * GET /1/security/sources
 *
 * List allowed sources
 *
 * Retrieves all allowed IP addresses with access to your application.
 */
export async function get1SecuritySources(options?: ClientRequestOptions) {
  return await client['1'].security.sources.$get(undefined, options)
}

/**
 * PUT /1/security/sources
 *
 * Replace allowed sources
 *
 * Replaces the list of allowed sources.
 */
export async function put1SecuritySources(
  args: InferRequestType<(typeof client)['1']['security']['sources']['$put']>,
  options?: ClientRequestOptions,
) {
  return await client['1'].security.sources.$put(args, options)
}

/**
 * POST /1/security/sources/append
 *
 * Add a source
 *
 * Adds a source to the list of allowed sources.
 */
export async function post1SecuritySourcesAppend(
  args: InferRequestType<(typeof client)['1']['security']['sources']['append']['$post']>,
  options?: ClientRequestOptions,
) {
  return await client['1'].security.sources.append.$post(args, options)
}

/**
 * DELETE /1/security/sources/{source}
 *
 * Delete a source
 *
 * Deletes a source from the list of allowed sources.
 */
export async function delete1SecuritySourcesSource(
  args: InferRequestType<(typeof client)['1']['security']['sources'][':source']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await client['1'].security.sources[':source'].$delete(args, options)
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
export async function get1Logs(
  args: InferRequestType<(typeof client)['1']['logs']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client['1'].logs.$get(args, options)
}

/**
 * GET /1/task/{taskID}
 *
 * Check application task status
 *
 * Checks the status of a given application task.
 */
export async function get1TaskTaskID(
  args: InferRequestType<(typeof client)['1']['task'][':taskID']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client['1'].task[':taskID'].$get(args, options)
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
export async function get1IndexesIndexNameTaskTaskID(
  args: InferRequestType<(typeof client)['1']['indexes'][':indexName']['task'][':taskID']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client['1'].indexes[':indexName'].task[':taskID'].$get(args, options)
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
export async function post1IndexesIndexNameOperation(
  args: InferRequestType<(typeof client)['1']['indexes'][':indexName']['operation']['$post']>,
  options?: ClientRequestOptions,
) {
  return await client['1'].indexes[':indexName'].operation.$post(args, options)
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
export async function get1Indexes(
  args: InferRequestType<(typeof client)['1']['indexes']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client['1'].indexes.$get(args, options)
}

/**
 * GET /waitForApiKey
 *
 * Wait for an API key operation
 *
 * Waits for an API key to be added, updated, or deleted.
 */
export async function getWaitForApiKey(
  args: InferRequestType<typeof client.waitForApiKey.$get>,
  options?: ClientRequestOptions,
) {
  return await client.waitForApiKey.$get(args, options)
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
export async function getWaitForTask(
  args: InferRequestType<typeof client.waitForTask.$get>,
  options?: ClientRequestOptions,
) {
  return await client.waitForTask.$get(args, options)
}

/**
 * GET /waitForAppTask
 *
 * Wait for application-level operation to complete
 *
 * Wait for a application-level task to complete.
 */
export async function getWaitForAppTask(
  args: InferRequestType<typeof client.waitForAppTask.$get>,
  options?: ClientRequestOptions,
) {
  return await client.waitForAppTask.$get(args, options)
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
export async function getBrowseObjects(
  args: InferRequestType<typeof client.browseObjects.$get>,
  options?: ClientRequestOptions,
) {
  return await client.browseObjects.$get(args, options)
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
export async function getGenerateSecuredApiKey(
  args: InferRequestType<typeof client.generateSecuredApiKey.$get>,
  options?: ClientRequestOptions,
) {
  return await client.generateSecuredApiKey.$get(args, options)
}

/**
 * GET /accountCopyIndex
 *
 * Copies the given `sourceIndexName` records, rules and synonyms to an other Algolia application for the given `destinationIndexName`
 *
 * Copies the given `sourceIndexName` records, rules and synonyms to an other Algolia application for the given `destinationIndexName`.
 */
export async function getAccountCopyIndex(
  args: InferRequestType<typeof client.accountCopyIndex.$get>,
  options?: ClientRequestOptions,
) {
  return await client.accountCopyIndex.$get(args, options)
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
export async function getReplaceAllObjects(
  args: InferRequestType<typeof client.replaceAllObjects.$get>,
  options?: ClientRequestOptions,
) {
  return await client.replaceAllObjects.$get(args, options)
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
export async function getReplaceAllObjectsWithTransformation(
  args: InferRequestType<typeof client.replaceAllObjectsWithTransformation.$get>,
  options?: ClientRequestOptions,
) {
  return await client.replaceAllObjectsWithTransformation.$get(args, options)
}

/**
 * GET /chunkedBatch
 *
 * Replace all records in an index
 *
 * Helper: Chunks the given `objects` list in subset of 1000 elements max in order to make it fit in `batch` requests.
 */
export async function getChunkedBatch(
  args: InferRequestType<typeof client.chunkedBatch.$get>,
  options?: ClientRequestOptions,
) {
  return await client.chunkedBatch.$get(args, options)
}

/**
 * GET /saveObjects
 *
 * Saves the given array of objects in the given index
 *
 * Helper: Saves the given array of objects in the given index. The `chunkedBatch` helper is used under the hood, which creates a `batch` requests with at most 1000 objects in it.
 */
export async function getSaveObjects(
  args: InferRequestType<typeof client.saveObjects.$get>,
  options?: ClientRequestOptions,
) {
  return await client.saveObjects.$get(args, options)
}

/**
 * GET /saveObjectsWithTransformation
 *
 * Save objects to an Algolia index by leveraging the Transformation pipeline setup using the Push connector (https://www.algolia.com/doc/guides/sending-and-managing-data/send-and-update-your-data/connectors/push)
 *
 * Helper: Similar to the `saveObjects` method but requires a Push connector (https://www.algolia.com/doc/guides/sending-and-managing-data/send-and-update-your-data/connectors/push) to be created first, in order to transform records before indexing them to Algolia. The `region` must have been passed to the client instantiation method.
 */
export async function getSaveObjectsWithTransformation(
  args: InferRequestType<typeof client.saveObjectsWithTransformation.$get>,
  options?: ClientRequestOptions,
) {
  return await client.saveObjectsWithTransformation.$get(args, options)
}

/**
 * POST /deleteObjects
 *
 * Deletes every records for the given objectIDs
 *
 * Helper: Deletes every records for the given objectIDs. The `chunkedBatch` helper is used under the hood, which creates a `batch` requests with at most 1000 objectIDs in it.
 */
export async function postDeleteObjects(
  args: InferRequestType<typeof client.deleteObjects.$post>,
  options?: ClientRequestOptions,
) {
  return await client.deleteObjects.$post(args, options)
}

/**
 * POST /partialUpdateObjects
 *
 * Replaces object content of all the given objects according to their respective `objectID` field
 *
 * Helper: Replaces object content of all the given objects according to their respective `objectID` field. The `chunkedBatch` helper is used under the hood, which creates a `batch` requests with at most 1000 objects in it.
 */
export async function postPartialUpdateObjects(
  args: InferRequestType<typeof client.partialUpdateObjects.$post>,
  options?: ClientRequestOptions,
) {
  return await client.partialUpdateObjects.$post(args, options)
}

/**
 * POST /partialUpdateObjectsWithTransformation
 *
 * Save objects to an Algolia index by leveraging the Transformation pipeline setup using the Push connector (https://www.algolia.com/doc/guides/sending-and-managing-data/send-and-update-your-data/connectors/push)
 *
 * Helper: Similar to the `partialUpdateObjects` method but requires a Push connector (https://www.algolia.com/doc/guides/sending-and-managing-data/send-and-update-your-data/connectors/push) to be created first, in order to transform records before indexing them to Algolia. The `region` must have been passed to the client instantiation method.
 */
export async function postPartialUpdateObjectsWithTransformation(
  args: InferRequestType<typeof client.partialUpdateObjectsWithTransformation.$post>,
  options?: ClientRequestOptions,
) {
  return await client.partialUpdateObjectsWithTransformation.$post(args, options)
}

/**
 * GET /indexExists
 *
 * Check if an index exists or not
 *
 * You can initialize an index with any name. The index is created on Algolia's servers when you add objects or set settings. To prevent accidentally creating new indices, or changing existing indices, you can use the exists method. The exists method returns a boolean that indicates whether an initialized index has been created.
 */
export async function getIndexExists(
  args: InferRequestType<typeof client.indexExists.$get>,
  options?: ClientRequestOptions,
) {
  return await client.indexExists.$get(args, options)
}

/**
 * GET /setClientApiKey
 *
 * Switch the API key used to authenticate requests
 *
 * Switch the API key used to authenticate requests.
 */
export async function getSetClientApiKey(
  args: InferRequestType<typeof client.setClientApiKey.$get>,
  options?: ClientRequestOptions,
) {
  return await client.setClientApiKey.$get(args, options)
}
