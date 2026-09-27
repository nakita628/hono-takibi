import { OpenAPIHono } from '@hono/zod-openapi'

import { GetUserLinkLink } from '@/components/links'
import { ProductsItemPathItem } from '@/components/pathItems'
import { UserCreatedCallback } from '~/components/callbacks'
import { UserExampleExample } from '~/components/examples'
import { JsonUserMediaTypeSchema } from '~/components/mediaTypes'
// Verify schemas/components resolve via both `~` and `@` aliases.
// スキーマとコンポーネントが、`~` と `@` の両方のエイリアスで解決されることを確認する。
import { ErrorSchema, UserSchema } from '~/components/schemas'
// Verify generated routes resolve via the `~` alias.
// 生成されたルートが、`~` エイリアスで解決されることを確認する。
import {
  deleteUsersIdRoute,
  getProductsRoute,
  getUsersIdRoute,
  getUsersRoute,
  postProductsRoute,
  postUsersRoute,
  putUsersIdRoute,
} from '~/routes'

const app = new OpenAPIHono()

// Touch the imports so that bundlers don't tree-shake them away — proves
// every alias-resolved module is reachable.
// バンドラーのツリーシェイキングで除去されないよう、import した値を参照する。これにより、
// エイリアスで解決されたすべてのモジュールに到達できることが確認できる。
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
