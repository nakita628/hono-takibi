import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/pet-store'

/**
 * PUT /pet
 *
 * Update an existing pet
 *
 * Update an existing pet by Id
 */
export async function putPet(
  args: InferRequestType<typeof client.pet.$put>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.pet.$put(args, options))
}

/**
 * POST /pet
 *
 * Add a new pet to the store
 *
 * Add a new pet to the store
 */
export async function postPet(
  args: InferRequestType<typeof client.pet.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.pet.$post(args, options))
}

/**
 * GET /pet/findByStatus
 *
 * Finds Pets by status
 *
 * Multiple status values can be provided with comma separated strings
 */
export async function getPetFindByStatus(
  args: InferRequestType<typeof client.pet.findByStatus.$get>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.pet.findByStatus.$get(args, options))
}

/**
 * GET /pet/findByTags
 *
 * Finds Pets by tags
 *
 * Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.
 */
export async function getPetFindByTags(
  args: InferRequestType<typeof client.pet.findByTags.$get>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.pet.findByTags.$get(args, options))
}

/**
 * GET /pet/{petId}
 *
 * Find pet by ID
 *
 * Returns a single pet
 */
export async function getPetPetId(
  args: InferRequestType<(typeof client.pet)[':petId']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.pet[':petId'].$get(args, options))
}

/**
 * POST /pet/{petId}
 *
 * Updates a pet in the store with form data
 */
export async function postPetPetId(
  args: InferRequestType<(typeof client.pet)[':petId']['$post']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.pet[':petId'].$post(args, options))
}

/**
 * DELETE /pet/{petId}
 *
 * Deletes a pet
 *
 * delete a pet
 */
export async function deletePetPetId(
  args: InferRequestType<(typeof client.pet)[':petId']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.pet[':petId'].$delete(args, options))
}

/**
 * POST /pet/{petId}/uploadImage
 *
 * uploads an image
 */
export async function postPetPetIdUploadImage(
  args: InferRequestType<(typeof client.pet)[':petId']['uploadImage']['$post']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.pet[':petId'].uploadImage.$post(args, options))
}

/**
 * GET /store/inventory
 *
 * Returns pet inventories by status
 *
 * Returns a map of status codes to quantities
 */
export async function getStoreInventory(options?: ClientRequestOptions) {
  return await parseResponse(client.store.inventory.$get(undefined, options))
}

/**
 * POST /store/order
 *
 * Place an order for a pet
 *
 * Place a new order in the store
 */
export async function postStoreOrder(
  args: InferRequestType<typeof client.store.order.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.store.order.$post(args, options))
}

/**
 * GET /store/order/{orderId}
 *
 * Find purchase order by ID
 *
 * For valid response try integer IDs with value <= 5 or > 10. Other values will generate exceptions.
 */
export async function getStoreOrderOrderId(
  args: InferRequestType<(typeof client.store.order)[':orderId']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.store.order[':orderId'].$get(args, options))
}

/**
 * DELETE /store/order/{orderId}
 *
 * Delete purchase order by ID
 *
 * For valid response try integer IDs with value < 1000. Anything above 1000 or nonintegers will generate API errors
 */
export async function deleteStoreOrderOrderId(
  args: InferRequestType<(typeof client.store.order)[':orderId']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.store.order[':orderId'].$delete(args, options))
}

/**
 * POST /user
 *
 * Create user
 *
 * This can only be done by the logged in user.
 */
export async function postUser(
  args: InferRequestType<typeof client.user.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.user.$post(args, options))
}

/**
 * POST /user/createWithList
 *
 * Creates list of users with given input array
 *
 * Creates list of users with given input array
 */
export async function postUserCreateWithList(
  args: InferRequestType<typeof client.user.createWithList.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.user.createWithList.$post(args, options))
}

/**
 * GET /user/login
 *
 * Logs user into the system
 */
export async function getUserLogin(
  args: InferRequestType<typeof client.user.login.$get>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.user.login.$get(args, options))
}

/**
 * GET /user/logout
 *
 * Logs out current logged in user session
 */
export async function getUserLogout(options?: ClientRequestOptions) {
  return await parseResponse(client.user.logout.$get(undefined, options))
}

/**
 * GET /user/{username}
 *
 * Get user by user name
 */
export async function getUserUsername(
  args: InferRequestType<(typeof client.user)[':username']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.user[':username'].$get(args, options))
}

/**
 * PUT /user/{username}
 *
 * Update user
 *
 * This can only be done by the logged in user.
 */
export async function putUserUsername(
  args: InferRequestType<(typeof client.user)[':username']['$put']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.user[':username'].$put(args, options))
}

/**
 * DELETE /user/{username}
 *
 * Delete user
 *
 * This can only be done by the logged in user.
 */
export async function deleteUserUsername(
  args: InferRequestType<(typeof client.user)[':username']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.user[':username'].$delete(args, options))
}
