import type { InferRequestType } from 'hono/client'
import { client } from '../clients/pet-store'

/**
 * PUT /pet
 *
 * Update an existing pet
 *
 * Update an existing pet by Id
 */
export async function putPet(arg: InferRequestType<typeof client.pet.$put>) {
  return await client.pet.$put(arg)
}

/**
 * POST /pet
 *
 * Add a new pet to the store
 *
 * Add a new pet to the store
 */
export async function postPet(arg: InferRequestType<typeof client.pet.$post>) {
  return await client.pet.$post(arg)
}

/**
 * GET /pet/findByStatus
 *
 * Finds Pets by status
 *
 * Multiple status values can be provided with comma separated strings
 */
export async function getPetFindByStatus(
  arg: InferRequestType<(typeof client)['pet']['findByStatus']['$get']>,
) {
  return await client['pet']['findByStatus']['$get'](arg)
}

/**
 * GET /pet/findByTags
 *
 * Finds Pets by tags
 *
 * Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.
 */
export async function getPetFindByTags(
  arg: InferRequestType<(typeof client)['pet']['findByTags']['$get']>,
) {
  return await client['pet']['findByTags']['$get'](arg)
}

/**
 * GET /pet/{petId}
 *
 * Find pet by ID
 *
 * Returns a single pet
 */
export async function getPetPetId(arg: InferRequestType<(typeof client)['pet'][':petId']['$get']>) {
  return await client['pet'][':petId']['$get'](arg)
}

/**
 * POST /pet/{petId}
 *
 * Updates a pet in the store with form data
 */
export async function postPetPetId(
  arg: InferRequestType<(typeof client)['pet'][':petId']['$post']>,
) {
  return await client['pet'][':petId']['$post'](arg)
}

/**
 * DELETE /pet/{petId}
 *
 * Deletes a pet
 *
 * delete a pet
 */
export async function deletePetPetId(
  arg: InferRequestType<(typeof client)['pet'][':petId']['$delete']>,
) {
  return await client['pet'][':petId']['$delete'](arg)
}

/**
 * POST /pet/{petId}/uploadImage
 *
 * uploads an image
 */
export async function postPetPetIdUploadImage(
  arg: InferRequestType<(typeof client)['pet'][':petId']['uploadImage']['$post']>,
) {
  return await client['pet'][':petId']['uploadImage']['$post'](arg)
}

/**
 * GET /store/inventory
 *
 * Returns pet inventories by status
 *
 * Returns a map of status codes to quantities
 */
export async function getStoreInventory() {
  return await client['store']['inventory']['$get']()
}

/**
 * POST /store/order
 *
 * Place an order for a pet
 *
 * Place a new order in the store
 */
export async function postStoreOrder(
  arg: InferRequestType<(typeof client)['store']['order']['$post']>,
) {
  return await client['store']['order']['$post'](arg)
}

/**
 * GET /store/order/{orderId}
 *
 * Find purchase order by ID
 *
 * For valid response try integer IDs with value <= 5 or > 10. Other values will generate exceptions.
 */
export async function getStoreOrderOrderId(
  arg: InferRequestType<(typeof client)['store']['order'][':orderId']['$get']>,
) {
  return await client['store']['order'][':orderId']['$get'](arg)
}

/**
 * DELETE /store/order/{orderId}
 *
 * Delete purchase order by ID
 *
 * For valid response try integer IDs with value < 1000. Anything above 1000 or nonintegers will generate API errors
 */
export async function deleteStoreOrderOrderId(
  arg: InferRequestType<(typeof client)['store']['order'][':orderId']['$delete']>,
) {
  return await client['store']['order'][':orderId']['$delete'](arg)
}

/**
 * POST /user
 *
 * Create user
 *
 * This can only be done by the logged in user.
 */
export async function postUser(arg: InferRequestType<typeof client.user.$post>) {
  return await client.user.$post(arg)
}

/**
 * POST /user/createWithList
 *
 * Creates list of users with given input array
 *
 * Creates list of users with given input array
 */
export async function postUserCreateWithList(
  arg: InferRequestType<(typeof client)['user']['createWithList']['$post']>,
) {
  return await client['user']['createWithList']['$post'](arg)
}

/**
 * GET /user/login
 *
 * Logs user into the system
 */
export async function getUserLogin(
  arg: InferRequestType<(typeof client)['user']['login']['$get']>,
) {
  return await client['user']['login']['$get'](arg)
}

/**
 * GET /user/logout
 *
 * Logs out current logged in user session
 */
export async function getUserLogout() {
  return await client['user']['logout']['$get']()
}

/**
 * GET /user/{username}
 *
 * Get user by user name
 */
export async function getUserUsername(
  arg: InferRequestType<(typeof client)['user'][':username']['$get']>,
) {
  return await client['user'][':username']['$get'](arg)
}

/**
 * PUT /user/{username}
 *
 * Update user
 *
 * This can only be done by the logged in user.
 */
export async function putUserUsername(
  arg: InferRequestType<(typeof client)['user'][':username']['$put']>,
) {
  return await client['user'][':username']['$put'](arg)
}

/**
 * DELETE /user/{username}
 *
 * Delete user
 *
 * This can only be done by the logged in user.
 */
export async function deleteUserUsername(
  arg: InferRequestType<(typeof client)['user'][':username']['$delete']>,
) {
  return await client['user'][':username']['$delete'](arg)
}
