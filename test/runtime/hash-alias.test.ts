// A `#` pathAlias (cases/hash-alias, generated from specs/users.yaml with `pathAlias: '#/'`
// and seed/package.json mapping `#/*` to `src/*`). Package.json `imports` is what Node
// resolves, and Node neither searches for extensions nor resolves a directory to its index.ts,
// so the generated files import one another fully specified. What the case typechecks (under
// `nodenext`) is that tsc resolves them; this file checks the specifiers, and that Node runs
// the app straight from the TypeScript sources.
//
// `#` エイリアスの検証(cases/hash-alias。specs/users.yaml から `pathAlias: '#/'` で生成し、
// seed/package.json が `#/*` を `src/*` にマップする)。Node が解決するのは package.json の
// `imports` であり、Node は拡張子を探さず、ディレクトリを index.ts に解決もしない。そのため
// 生成ファイルは互いをファイルまで指定して import する。ケースの typecheck(`nodenext`)は tsc が
// それを解決することを、このファイルは指定子と、Node が TypeScript のソースからそのままアプリを
// 実行できることを確認する。
import { spawnSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import path from 'node:path'

import { describe, expect, it } from 'vite-plus/test'

const root = path.resolve(import.meta.dirname, '../__generated__/hash-alias')
const read = (file: string) => readFileSync(path.join(root, 'src', file), 'utf8')

describe('hash-alias: fully specified imports', () => {
  // The app entry imports the routes file and the handler barrel under the alias, by file.
  // app entry は、routes ファイルとハンドラのバレルを、エイリアスでファイルまで指定して import する。
  it('the app entry imports #/routes.ts and #/handlers/index.ts', () => {
    expect(read('index.ts')).toBe(`import { OpenAPIHono } from '@hono/zod-openapi'
import {
  getUsersRoute,
  postUsersRoute,
  getUsersIdRoute,
  deleteUsersIdRoute,
  getItemsRoute,
  getSlowRoute,
} from '#/routes.ts'
import {
  getUsersRouteHandler,
  postUsersRouteHandler,
  getUsersIdRouteHandler,
  deleteUsersIdRouteHandler,
  getItemsRouteHandler,
  getSlowRouteHandler,
} from '#/handlers/index.ts'

const app = new OpenAPIHono()

export const api = app
  .openapi(getUsersRoute, getUsersRouteHandler)
  .openapi(postUsersRoute, postUsersRouteHandler)
  .openapi(getUsersIdRoute, getUsersIdRouteHandler)
  .openapi(deleteUsersIdRoute, deleteUsersIdRouteHandler)
  .openapi(getItemsRoute, getItemsRouteHandler)
  .openapi(getSlowRoute, getSlowRouteHandler)

export default app
`)
  })

  // A barrel reached through the alias is loaded by Node too, so its lines name files.
  // エイリアス経由で読み込まれるバレルも Node が読むため、各行はファイルを指す。
  it('the handler barrel re-exports its files by name', () => {
    expect(read('handlers/index.ts')).toBe(`export * from './users.ts'
export * from './items.ts'
export * from './slow.ts'
`)
  })

  it('a split component barrel re-exports its files by name', () => {
    expect(read('components/schemas/index.ts')).toBe(`export * from './apiError.ts'
export * from './itemPage.ts'
export * from './user.ts'
export * from './userInput.ts'
`)
  })

  it('the client imports the app, and rpc the client barrel, by file', () => {
    expect(read('lib/client.ts')).toBe(`import { hc } from 'hono/client'
import type { api } from '#/index.ts'

type Client = ReturnType<typeof hc<typeof api>>

const hcWithType = (...args: Parameters<typeof hc>): Client => hc<typeof api>(...args)

export const client = hcWithType('/')
`)
    expect(read('lib/index.ts')).toBe("export * from './client.ts'\n")
    expect(read('rpc.ts'))
      .toBe(`import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { client } from '#/lib/index.ts'

export async function getUsers(options?: ClientRequestOptions) {
  return await client.users.$get(undefined, options)
}

export async function postUsers(
  args: InferRequestType<typeof client.users.$post>,
  options?: ClientRequestOptions,
) {
  return await client.users.$post(args, options)
}

export async function getUsersId(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.users[':id'].$get(args, options)
}

export async function deleteUsersId(
  args: InferRequestType<(typeof client.users)[':id']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await client.users[':id'].$delete(args, options)
}

export async function getItems(
  args: InferRequestType<typeof client.items.$get>,
  options?: ClientRequestOptions,
) {
  return await client.items.$get(args, options)
}

export async function getSlow(options?: ClientRequestOptions) {
  return await client.slow.$get(undefined, options)
}
`)
  })

  // No specifier of a generated file is left without its extension.
  // 生成ファイルを指す指定子に、拡張子のないものは残らない。
  it('leaves no relative or alias specifier extensionless', () => {
    const files = ['index.ts', 'routes.ts', 'handlers/index.ts', 'lib/client.ts', 'rpc.ts']
    const specifiers = files.flatMap((file) =>
      Array.from(read(file).matchAll(/from '([.#][^']*)'/gu), (match) => match[1]),
    )
    expect(specifiers).toStrictEqual([
      '#/routes.ts',
      '#/handlers/index.ts',
      './users.ts',
      './items.ts',
      './slow.ts',
      '#/index.ts',
      '#/lib/index.ts',
    ])
  })
})

describe('hash-alias: runs on Node from the sources', () => {
  // Node strips the types and resolves every `#` and relative import itself: no bundler.
  // Node が型を取り除き、`#` と相対の import をすべて自力で解決する。バンドラーは使わない。
  it('GET /users answers from the implemented handler', () => {
    const script = [
      `const { default: app } = await import(${JSON.stringify(path.join(root, 'src/index.ts'))})`,
      `const response = await app.request('/users')`,
      'console.log(JSON.stringify({ status: response.status, body: await response.json() }))',
    ].join('\n')
    const result = spawnSync(process.execPath, ['--input-type=module', '--eval', script], {
      encoding: 'utf8',
    })
    expect(result.stderr).toBe('')
    expect(JSON.parse(result.stdout)).toStrictEqual({
      status: 200,
      body: [{ id: '1', name: 'Alice' }],
    })
  })
})
