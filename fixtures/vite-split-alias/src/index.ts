import { OpenAPIHono } from '@hono/zod-openapi'

// Verify generated routes resolve via the `~` alias.
import {
  deleteUsersIdRoute,
  getProductsRoute,
  getUsersIdRoute,
  getUsersRoute,
  postProductsRoute,
  postUsersRoute,
  putUsersIdRoute,
} from '~/routes'
// Verify schemas/components resolve via both `~` and `@` aliases.
import { ErrorSchema, UserSchema } from '~/components/schemas'
import { UserExampleExample } from '~/components/examples'
import { GetUserLinkLink } from '@/components/links'
import { UserCreatedCallback } from '~/components/callbacks'
import { ProductsItemPathItem } from '@/components/pathItems'
import { JsonUserMediaTypeSchema } from '~/components/mediaTypes'

const app = new OpenAPIHono()

// Touch the imports so that bundlers don't tree-shake them away — proves
// every alias-resolved module is reachable.
export const types = {
  user: UserSchema,
  error: ErrorSchema,
  example: UserExampleExample,
  link: GetUserLinkLink,
  callback: UserCreatedCallback,
  pathItem: ProductsItemPathItem,
  mediaType: JsonUserMediaTypeSchema,
}

export const routes = {
  getUsers: getUsersRoute,
  postUsers: postUsersRoute,
  getUsersId: getUsersIdRoute,
  putUsersId: putUsersIdRoute,
  deleteUsersId: deleteUsersIdRoute,
  getProducts: getProductsRoute,
  postProducts: postProductsRoute,
}

export default app
