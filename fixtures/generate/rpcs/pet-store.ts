import type { ClientRequestOptions } from 'hono/client'
import { client } from '../clients/pet-store'

/**
 * PUT /pet
 *
 * Update an existing pet
 *
 * Update an existing pet by Id
 */
export async function putPet(args: {
  form: {
    id?: bigint
    name: string
    category?: { id?: bigint; name?: string }
    photoUrls: string[]
    tags?: { id?: bigint; name?: string }[]
    status?: 'available' | 'pending' | 'sold'
  }
  json:
    | {
        id?: bigint
        name: string
        category?: { id?: bigint; name?: string }
        photoUrls: string[]
        tags?: { id?: bigint; name?: string }[]
        status?: 'available' | 'pending' | 'sold'
      }
    | {
        id?: bigint
        name: string
        category?: { id?: bigint; name?: string }
        photoUrls: string[]
        tags?: { id?: bigint; name?: string }[]
        status?: 'available' | 'pending' | 'sold'
      }
  options?: ClientRequestOptions
}) {
  return await client.pet.$put(args)
}

/**
 * POST /pet
 *
 * Add a new pet to the store
 *
 * Add a new pet to the store
 */
export async function postPet(args: {
  form: {
    id?: bigint
    name: string
    category?: { id?: bigint; name?: string }
    photoUrls: string[]
    tags?: { id?: bigint; name?: string }[]
    status?: 'available' | 'pending' | 'sold'
  }
  json:
    | {
        id?: bigint
        name: string
        category?: { id?: bigint; name?: string }
        photoUrls: string[]
        tags?: { id?: bigint; name?: string }[]
        status?: 'available' | 'pending' | 'sold'
      }
    | {
        id?: bigint
        name: string
        category?: { id?: bigint; name?: string }
        photoUrls: string[]
        tags?: { id?: bigint; name?: string }[]
        status?: 'available' | 'pending' | 'sold'
      }
  options?: ClientRequestOptions
}) {
  return await client.pet.$post(args)
}

/**
 * GET /pet/findByStatus
 *
 * Finds Pets by status
 *
 * Multiple status values can be provided with comma separated strings
 */
export async function getPetFindByStatus(args: {
  query: { status?: 'available' | 'pending' | 'sold' }
  options?: ClientRequestOptions
}) {
  return await client['pet']['findByStatus']['$get'](args)
}

/**
 * GET /pet/findByTags
 *
 * Finds Pets by tags
 *
 * Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.
 */
export async function getPetFindByTags(args: {
  query: { tags?: string[] }
  options?: ClientRequestOptions
}) {
  return await client['pet']['findByTags']['$get'](args)
}

/**
 * GET /pet/{petId}
 *
 * Find pet by ID
 *
 * Returns a single pet
 */
export async function getPetPetId(args: {
  param: { petId: bigint }
  options?: ClientRequestOptions
}) {
  return await client['pet'][':petId']['$get'](args)
}

/**
 * POST /pet/{petId}
 *
 * Updates a pet in the store with form data
 */
export async function postPetPetId(args: {
  param: { petId: bigint }
  query: { name?: string; status?: string }
  options?: ClientRequestOptions
}) {
  return await client['pet'][':petId']['$post'](args)
}

/**
 * DELETE /pet/{petId}
 *
 * Deletes a pet
 *
 * delete a pet
 */
export async function deletePetPetId(args: {
  param: { petId: bigint }
  header: { api_key?: string }
  options?: ClientRequestOptions
}) {
  return await client['pet'][':petId']['$delete'](args)
}

/**
 * POST /pet/{petId}/uploadImage
 *
 * uploads an image
 */
export async function postPetPetIdUploadImage(args: {
  param: { petId: bigint }
  query: { additionalMetadata?: string }
  json: File
  options?: ClientRequestOptions
}) {
  return await client['pet'][':petId']['uploadImage']['$post'](args)
}

/**
 * GET /store/inventory
 *
 * Returns pet inventories by status
 *
 * Returns a map of status codes to quantities
 */
export async function getStoreInventory(args?: { options?: ClientRequestOptions }) {
  return await client['store']['inventory']['$get'](args)
}

/**
 * POST /store/order
 *
 * Place an order for a pet
 *
 * Place a new order in the store
 */
export async function postStoreOrder(args: {
  form: {
    id?: bigint
    petId?: bigint
    quantity?: number
    shipDate?: string
    status?: 'placed' | 'approved' | 'delivered'
    complete?: boolean
  }
  json:
    | {
        id?: bigint
        petId?: bigint
        quantity?: number
        shipDate?: string
        status?: 'placed' | 'approved' | 'delivered'
        complete?: boolean
      }
    | {
        id?: bigint
        petId?: bigint
        quantity?: number
        shipDate?: string
        status?: 'placed' | 'approved' | 'delivered'
        complete?: boolean
      }
  options?: ClientRequestOptions
}) {
  return await client['store']['order']['$post'](args)
}

/**
 * GET /store/order/{orderId}
 *
 * Find purchase order by ID
 *
 * For valid response try integer IDs with value <= 5 or > 10. Other values will generate exceptions.
 */
export async function getStoreOrderOrderId(args: {
  param: { orderId: bigint }
  options?: ClientRequestOptions
}) {
  return await client['store']['order'][':orderId']['$get'](args)
}

/**
 * DELETE /store/order/{orderId}
 *
 * Delete purchase order by ID
 *
 * For valid response try integer IDs with value < 1000. Anything above 1000 or nonintegers will generate API errors
 */
export async function deleteStoreOrderOrderId(args: {
  param: { orderId: bigint }
  options?: ClientRequestOptions
}) {
  return await client['store']['order'][':orderId']['$delete'](args)
}

/**
 * POST /user
 *
 * Create user
 *
 * This can only be done by the logged in user.
 */
export async function postUser(args: {
  form: {
    id?: bigint
    username?: string
    firstName?: string
    lastName?: string
    email?: string
    password?: string
    phone?: string
    userStatus?: number
  }
  json:
    | {
        id?: bigint
        username?: string
        firstName?: string
        lastName?: string
        email?: string
        password?: string
        phone?: string
        userStatus?: number
      }
    | {
        id?: bigint
        username?: string
        firstName?: string
        lastName?: string
        email?: string
        password?: string
        phone?: string
        userStatus?: number
      }
  options?: ClientRequestOptions
}) {
  return await client.user.$post(args)
}

/**
 * POST /user/createWithList
 *
 * Creates list of users with given input array
 *
 * Creates list of users with given input array
 */
export async function postUserCreateWithList(args: {
  json: {
    id?: bigint
    username?: string
    firstName?: string
    lastName?: string
    email?: string
    password?: string
    phone?: string
    userStatus?: number
  }[]
  options?: ClientRequestOptions
}) {
  return await client['user']['createWithList']['$post'](args)
}

/**
 * GET /user/login
 *
 * Logs user into the system
 */
export async function getUserLogin(args: {
  query: { username?: string; password?: string }
  options?: ClientRequestOptions
}) {
  return await client['user']['login']['$get'](args)
}

/**
 * GET /user/logout
 *
 * Logs out current logged in user session
 */
export async function getUserLogout(args?: { options?: ClientRequestOptions }) {
  return await client['user']['logout']['$get'](args)
}

/**
 * GET /user/{username}
 *
 * Get user by user name
 */
export async function getUserUsername(args: {
  param: { username: string }
  options?: ClientRequestOptions
}) {
  return await client['user'][':username']['$get'](args)
}

/**
 * PUT /user/{username}
 *
 * Update user
 *
 * This can only be done by the logged in user.
 */
export async function putUserUsername(args: {
  param: { username: string }
  form: {
    id?: bigint
    username?: string
    firstName?: string
    lastName?: string
    email?: string
    password?: string
    phone?: string
    userStatus?: number
  }
  json:
    | {
        id?: bigint
        username?: string
        firstName?: string
        lastName?: string
        email?: string
        password?: string
        phone?: string
        userStatus?: number
      }
    | {
        id?: bigint
        username?: string
        firstName?: string
        lastName?: string
        email?: string
        password?: string
        phone?: string
        userStatus?: number
      }
  options?: ClientRequestOptions
}) {
  return await client['user'][':username']['$put'](args)
}

/**
 * DELETE /user/{username}
 *
 * Delete user
 *
 * This can only be done by the logged in user.
 */
export async function deleteUserUsername(args: {
  param: { username: string }
  options?: ClientRequestOptions
}) {
  return await client['user'][':username']['$delete'](args)
}
