import { client } from '../clients/pet-store'

/**
 * PUT /pet
 *
 * Update an existing pet
 *
 * Update an existing pet by Id
 */
export async function putPet(arg: {
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
}) {
  return await client.pet.$put(arg)
}

/**
 * POST /pet
 *
 * Add a new pet to the store
 *
 * Add a new pet to the store
 */
export async function postPet(arg: {
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
}) {
  return await client.pet.$post(arg)
}

/**
 * GET /pet/findByStatus
 *
 * Finds Pets by status
 *
 * Multiple status values can be provided with comma separated strings
 */
export async function getPetFindByStatus(arg: {
  query: { status?: 'available' | 'pending' | 'sold' }
}) {
  return await client['pet']['findByStatus']['$get'](arg)
}

/**
 * GET /pet/findByTags
 *
 * Finds Pets by tags
 *
 * Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.
 */
export async function getPetFindByTags(arg: { query: { tags?: string[] } }) {
  return await client['pet']['findByTags']['$get'](arg)
}

/**
 * GET /pet/{petId}
 *
 * Find pet by ID
 *
 * Returns a single pet
 */
export async function getPetPetId(arg: { param: { petId: bigint } }) {
  return await client['pet'][':petId']['$get'](arg)
}

/**
 * POST /pet/{petId}
 *
 * Updates a pet in the store with form data
 */
export async function postPetPetId(arg: {
  param: { petId: bigint }
  query: { name?: string; status?: string }
}) {
  return await client['pet'][':petId']['$post'](arg)
}

/**
 * DELETE /pet/{petId}
 *
 * Deletes a pet
 *
 * delete a pet
 */
export async function deletePetPetId(arg: {
  param: { petId: bigint }
  header: { api_key?: string }
}) {
  return await client['pet'][':petId']['$delete'](arg)
}

/**
 * POST /pet/{petId}/uploadImage
 *
 * uploads an image
 */
export async function postPetPetIdUploadImage(arg: {
  param: { petId: bigint }
  query: { additionalMetadata?: string }
  json: File
}) {
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
export async function postStoreOrder(arg: {
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
}) {
  return await client['store']['order']['$post'](arg)
}

/**
 * GET /store/order/{orderId}
 *
 * Find purchase order by ID
 *
 * For valid response try integer IDs with value <= 5 or > 10. Other values will generate exceptions.
 */
export async function getStoreOrderOrderId(arg: { param: { orderId: bigint } }) {
  return await client['store']['order'][':orderId']['$get'](arg)
}

/**
 * DELETE /store/order/{orderId}
 *
 * Delete purchase order by ID
 *
 * For valid response try integer IDs with value < 1000. Anything above 1000 or nonintegers will generate API errors
 */
export async function deleteStoreOrderOrderId(arg: { param: { orderId: bigint } }) {
  return await client['store']['order'][':orderId']['$delete'](arg)
}

/**
 * POST /user
 *
 * Create user
 *
 * This can only be done by the logged in user.
 */
export async function postUser(arg: {
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
}) {
  return await client.user.$post(arg)
}

/**
 * POST /user/createWithList
 *
 * Creates list of users with given input array
 *
 * Creates list of users with given input array
 */
export async function postUserCreateWithList(arg: {
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
}) {
  return await client['user']['createWithList']['$post'](arg)
}

/**
 * GET /user/login
 *
 * Logs user into the system
 */
export async function getUserLogin(arg: { query: { username?: string; password?: string } }) {
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
export async function getUserUsername(arg: { param: { username: string } }) {
  return await client['user'][':username']['$get'](arg)
}

/**
 * PUT /user/{username}
 *
 * Update user
 *
 * This can only be done by the logged in user.
 */
export async function putUserUsername(arg: {
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
}) {
  return await client['user'][':username']['$put'](arg)
}

/**
 * DELETE /user/{username}
 *
 * Delete user
 *
 * This can only be done by the logged in user.
 */
export async function deleteUserUsername(arg: { param: { username: string } }) {
  return await client['user'][':username']['$delete'](arg)
}
