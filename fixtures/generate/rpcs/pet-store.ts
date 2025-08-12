import { client } from '../index.ts'

/**
 * Update an existing pet
 *
 * Update an existing pet by Id
 *
 * PUT /pet
 */
export async function putPet(body: any) {
  return await client.pet.$put({ json: body })
}

/**
 * Add a new pet to the store
 *
 * Add a new pet to the store
 *
 * POST /pet
 */
export async function postPet(body: any) {
  return await client.pet.$post({ json: body })
}

/**
 * Finds Pets by status
 *
 * Multiple status values can be provided with comma separated strings
 *
 * GET /pet/findByStatus
 */
export async function getPetFindByStatus(params: { query: { status: string } }) {
  return await client.pet.findByStatus.$get({ query: { status: params.query.status } })
}

/**
 * Finds Pets by tags
 *
 * Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.
 *
 * GET /pet/findByTags
 */
export async function getPetFindByTags(params: { query: { tags: array } }) {
  return await client.pet.findByTags.$get({ query: { tags: params.query.tags } })
}

/**
 * Find pet by ID
 *
 * Returns a single pet
 *
 * GET /pet/{petId}
 */
export async function getPetPetId(params: { path: { petId: number } }) {
  return await client.pet[':petId'].$get({ param: { petId: params.path.petId } })
}

/**
 * Updates a pet in the store with form data
 *
 * POST /pet/{petId}
 */
export async function postPetPetId(params: {
  path: { petId: number }
  query: { name: string; status: string }
}) {
  return await client.pet[':petId'].$post({
    param: { petId: params.path.petId },
    query: { name: params.query.name, status: params.query.status },
  })
}

/**
 * Deletes a pet
 *
 * delete a pet
 *
 * DELETE /pet/{petId}
 */
export async function deletePetPetId(params: { path: { petId: number } }) {
  return await client.pet[':petId'].$delete({ param: { petId: params.path.petId } })
}

/**
 * uploads an image
 *
 * POST /pet/{petId}/uploadImage
 */
export async function postPetPetIdUploadImage(params: {
  path: { petId: number }
  query: { additionalMetadata: string }
}) {
  return await client.pet[':petId'].uploadImage.$post({
    param: { petId: params.path.petId },
    query: { additionalMetadata: params.query.additionalMetadata },
  })
}

/**
 * Returns pet inventories by status
 *
 * Returns a map of status codes to quantities
 *
 * GET /store/inventory
 */
export async function getStoreInventory() {
  return await client.store.inventory.$get()
}

/**
 * Place an order for a pet
 *
 * Place a new order in the store
 *
 * POST /store/order
 */
export async function postStoreOrder(body: any) {
  return await client.store.order.$post({ json: body })
}

/**
 * Find purchase order by ID
 *
 * For valid response try integer IDs with value <= 5 or > 10. Other values will generate exceptions.
 *
 * GET /store/order/{orderId}
 */
export async function getStoreOrderOrderId(params: { path: { orderId: number } }) {
  return await client.store.order[':orderId'].$get({ param: { orderId: params.path.orderId } })
}

/**
 * Delete purchase order by ID
 *
 * For valid response try integer IDs with value < 1000. Anything above 1000 or nonintegers will generate API errors
 *
 * DELETE /store/order/{orderId}
 */
export async function deleteStoreOrderOrderId(params: { path: { orderId: number } }) {
  return await client.store.order[':orderId'].$delete({ param: { orderId: params.path.orderId } })
}

/**
 * Create user
 *
 * This can only be done by the logged in user.
 *
 * POST /user
 */
export async function postUser(body: any) {
  return await client.user.$post({ json: body })
}

/**
 * Creates list of users with given input array
 *
 * Creates list of users with given input array
 *
 * POST /user/createWithList
 */
export async function postUserCreateWithList(body: any[]) {
  return await client.user.createWithList.$post({ json: body })
}

/**
 * Logs user into the system
 *
 * GET /user/login
 */
export async function getUserLogin(params: { query: { username: string; password: string } }) {
  return await client.user.login.$get({
    query: { username: params.query.username, password: params.query.password },
  })
}

/**
 * Logs out current logged in user session
 *
 * GET /user/logout
 */
export async function getUserLogout() {
  return await client.user.logout.$get()
}

/**
 * Get user by user name
 *
 * GET /user/{username}
 */
export async function getUserUsername(params: { path: { username: string } }) {
  return await client.user[':username'].$get({ param: { username: params.path.username } })
}

/**
 * Update user
 *
 * This can only be done by the logged in user.
 *
 * PUT /user/{username}
 */
export async function putUserUsername(params: { path: { username: string } }, body: any) {
  return await client.user[':username'].$put({
    param: { username: params.path.username },
    json: body,
  })
}

/**
 * Delete user
 *
 * This can only be done by the logged in user.
 *
 * DELETE /user/{username}
 */
export async function deleteUserUsername(params: { path: { username: string } }) {
  return await client.user[':username'].$delete({ param: { username: params.path.username } })
}
