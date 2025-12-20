import { client } from '../index.ts'

/**
 * PUT /pet
 *
 * Update an existing pet
 *
 * Update an existing pet by Id
 */
export async function putPet(body: {
  id?: number
  name: string
  category?: { id?: number; name?: string }
  photoUrls: string[]
  tags?: { id?: number; name?: string }[]
  status?: 'available' | 'pending' | 'sold'
}) {
  return await client.pet.$put({ json: body })
}

/**
 * POST /pet
 *
 * Add a new pet to the store
 *
 * Add a new pet to the store
 */
export async function postPet(body: {
  id?: number
  name: string
  category?: { id?: number; name?: string }
  photoUrls: string[]
  tags?: { id?: number; name?: string }[]
  status?: 'available' | 'pending' | 'sold'
}) {
  return await client.pet.$post({ json: body })
}

/**
 * GET /pet/findByStatus
 *
 * Finds Pets by status
 *
 * Multiple status values can be provided with comma separated strings
 */
export async function getPetFindByStatus(params: {
  query: { status: 'available' | 'pending' | 'sold' }
}) {
  return await client.pet.findByStatus.$get({ query: params.query })
}

/**
 * GET /pet/findByTags
 *
 * Finds Pets by tags
 *
 * Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.
 */
export async function getPetFindByTags(params: { query: { tags: string[] } }) {
  return await client.pet.findByTags.$get({ query: params.query })
}

/**
 * GET /pet/{petId}
 *
 * Find pet by ID
 *
 * Returns a single pet
 */
export async function getPetPetId(params: { path: { petId: number } }) {
  return await client.pet[':petId'].$get({ param: params.path })
}

/**
 * POST /pet/{petId}
 *
 * Updates a pet in the store with form data
 */
export async function postPetPetId(params: {
  path: { petId: number }
  query: { name: string; status: string }
}) {
  return await client.pet[':petId'].$post({ param: params.path, query: params.query })
}

/**
 * DELETE /pet/{petId}
 *
 * Deletes a pet
 *
 * delete a pet
 */
export async function deletePetPetId(params: { path: { petId: number } }) {
  return await client.pet[':petId'].$delete({ param: params.path })
}

/**
 * POST /pet/{petId}/uploadImage
 *
 * uploads an image
 */
export async function postPetPetIdUploadImage(
  params: { path: { petId: number }; query: { additionalMetadata: string } },
  body: string,
) {
  return await client.pet[':petId'].uploadImage.$post({
    param: params.path,
    query: params.query,
    json: body,
  })
}

/**
 * GET /store/inventory
 *
 * Returns pet inventories by status
 *
 * Returns a map of status codes to quantities
 */
export async function getStoreInventory() {
  return await client.store.inventory.$get()
}

/**
 * POST /store/order
 *
 * Place an order for a pet
 *
 * Place a new order in the store
 */
export async function postStoreOrder(body: {
  id?: number
  petId?: number
  quantity?: number
  shipDate?: string
  status?: 'placed' | 'approved' | 'delivered'
  complete?: boolean
}) {
  return await client.store.order.$post({ json: body })
}

/**
 * GET /store/order/{orderId}
 *
 * Find purchase order by ID
 *
 * For valid response try integer IDs with value <= 5 or > 10. Other values will generate exceptions.
 */
export async function getStoreOrderOrderId(params: { path: { orderId: number } }) {
  return await client.store.order[':orderId'].$get({ param: params.path })
}

/**
 * DELETE /store/order/{orderId}
 *
 * Delete purchase order by ID
 *
 * For valid response try integer IDs with value < 1000. Anything above 1000 or nonintegers will generate API errors
 */
export async function deleteStoreOrderOrderId(params: { path: { orderId: number } }) {
  return await client.store.order[':orderId'].$delete({ param: params.path })
}

/**
 * POST /user
 *
 * Create user
 *
 * This can only be done by the logged in user.
 */
export async function postUser(body: {
  id?: number
  username?: string
  firstName?: string
  lastName?: string
  email?: string
  password?: string
  phone?: string
  userStatus?: number
}) {
  return await client.user.$post({ json: body })
}

/**
 * POST /user/createWithList
 *
 * Creates list of users with given input array
 *
 * Creates list of users with given input array
 */
export async function postUserCreateWithList(
  body: {
    id?: number
    username?: string
    firstName?: string
    lastName?: string
    email?: string
    password?: string
    phone?: string
    userStatus?: number
  }[],
) {
  return await client.user.createWithList.$post({ json: body })
}

/**
 * GET /user/login
 *
 * Logs user into the system
 */
export async function getUserLogin(params: { query: { username: string; password: string } }) {
  return await client.user.login.$get({ query: params.query })
}

/**
 * GET /user/logout
 *
 * Logs out current logged in user session
 */
export async function getUserLogout() {
  return await client.user.logout.$get()
}

/**
 * GET /user/{username}
 *
 * Get user by user name
 */
export async function getUserUsername(params: { path: { username: string } }) {
  return await client.user[':username'].$get({ param: params.path })
}

/**
 * PUT /user/{username}
 *
 * Update user
 *
 * This can only be done by the logged in user.
 */
export async function putUserUsername(
  params: { path: { username: string } },
  body: {
    id?: number
    username?: string
    firstName?: string
    lastName?: string
    email?: string
    password?: string
    phone?: string
    userStatus?: number
  },
) {
  return await client.user[':username'].$put({ param: params.path, json: body })
}

/**
 * DELETE /user/{username}
 *
 * Delete user
 *
 * This can only be done by the logged in user.
 */
export async function deleteUserUsername(params: { path: { username: string } }) {
  return await client.user[':username'].$delete({ param: params.path })
}
