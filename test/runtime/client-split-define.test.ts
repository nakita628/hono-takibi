// A split application written by the template with `define: true` (cases/client-split-define,
// generated from specs/client-split.yaml with `template.split` and `client`).
//
// Every group is the one app; what differs from group to group is the type, which is what a
// client of the group resolves. What this file checks is that the division changes nothing
// a caller can see: every route answers under the base path, and every generated function
// reaches its route through the client of its group.
//
// `define: true` の template が書き出した、分割されたアプリケーションの検証
// (cases/client-split-define。specs/client-split.yaml から `template.split` と `client` を
// 指定して生成)。
//
// すべてのグループは1つのアプリである。グループごとに異なるのは型であり、グループの
// クライアントが解決するのはその型である。このファイルが確認するのは、分割によって
// 呼び出し側から見える挙動が変わらないことである。すべてのルートはベースパスの下で応答し、
// 生成された関数はすべて、自身のグループのクライアントを通してルートに届く。
import { describe, expect, it } from 'vite-plus/test'

import {
  itemsClient,
  v2PublicClient,
  vaultsClient,
} from '../__generated__/client-split-define/src/client'
import app, {
  api,
  health,
  items,
  v2Public,
  vaults,
} from '../__generated__/client-split-define/src/index'
import {
  get,
  getHealth,
  getItems,
  getV2PublicPing,
  getVaults,
  getVaultsId,
  postItemsIdShares,
  postVaults,
} from '../__generated__/client-split-define/src/rpc'

// The generated clients are created with the base URL "/", so a call is a request for a
// path, which the app answers without a server.
// 生成されたクライアントはベース URL "/" で作られるため、呼び出しはパスへのリクエストになる。
// アプリは、サーバーなしでこれに応答する。
const options = {
  fetch: (input: string | URL | Request, init?: RequestInit) => app.request(input, init),
}

describe('groups: every group is the one app', () => {
  // A group is what registering its routes on the app returns, which is the app.
  // グループは、アプリにルートを登録した結果として返される値であり、それはアプリ自身である。
  it('api and the groups are the app', () => {
    expect(api).toBe(app)
    expect(health).toBe(app)
    expect(items).toBe(app)
    expect(vaults).toBe(app)
    expect(v2Public).toBe(app)
  })

  // The routes of every group are documented once, under the base path.
  // すべてのグループのルートは、ベースパスの下に1回ずつドキュメント化される。
  it('the document lists the routes of every group', () => {
    const document = app.getOpenAPI31Document({
      openapi: '3.1.0',
      info: { title: 'Vault', version: '0.0.0' },
    })
    expect(Object.keys(document.paths ?? {}).sort()).toStrictEqual([
      '/api',
      '/api/health',
      '/api/items',
      '/api/items/{id}/shares',
      '/api/v2-public/ping',
      '/api/vaults',
      '/api/vaults/{id}',
    ])
  })
})

describe('clients: the client of a group requests under the base path', () => {
  // vaultsClient is typed by the routes of vaults, base path included. The request is handed
  // to a fetch that records what it was asked for.
  // vaultsClient は、ベースパスを含む vaults のルートで型付けされている。リクエストは、
  // 要求された内容を記録する fetch に渡す。
  it('vaultsClient requests /api/vaults', async () => {
    const requested: string[] = []
    await vaultsClient.vaults.$get(undefined, {
      fetch: (input: string | URL | Request, init?: RequestInit) => {
        requested.push(input instanceof Request ? input.url : input.toString())
        return app.request(input, init)
      },
    })
    expect(requested).toStrictEqual(['/api/vaults'])
  })

  // The same for items.
  // items も同様である。
  it('itemsClient requests /api/items', async () => {
    const requested: string[] = []
    await itemsClient.items.$get(
      { query: {} },
      {
        fetch: (input: string | URL | Request, init?: RequestInit) => {
          requested.push(input instanceof Request ? input.url : input.toString())
          return app.request(input, init)
        },
      },
    )
    expect(requested).toStrictEqual(['/api/items'])
  })

  // v2-public goes by v2Public, which is a group of its own.
  // v2-public は v2Public という名前になり、独立したグループになる。
  it('v2PublicClient requests /api/v2-public/ping', async () => {
    const requested: string[] = []
    await v2PublicClient['v2-public'].ping.$get(undefined, {
      fetch: (input: string | URL | Request, init?: RequestInit) => {
        requested.push(input instanceof Request ? input.url : input.toString())
        return app.request(input, init)
      },
    })
    expect(requested).toStrictEqual(['/api/v2-public/ping'])
  })

  // The type of a client holds the routes of its group and no others.
  // クライアントの型は、自身のグループのルートだけを持ち、他のルートは持たない。
  it('vaultsClient does not hold the routes of items', () => {
    // @ts-expect-error -- items is no route of vaults
    expect(vaultsClient.items).toBeDefined()
  })
})

describe('rpc: every generated function reaches its route', () => {
  // A route of no group, called through client.
  // どのグループにも属さないルート。client を通して呼び出される。
  it('get resolves with the body of /api', async () => {
    expect(await get(options)).toStrictEqual({ ok: true })
  })

  // v2-public goes by v2Public, which is a group of its own.
  // v2-public は v2Public という名前になり、独立したグループになる。
  it('getV2PublicPing resolves with the body of /api/v2-public/ping', async () => {
    expect(await getV2PublicPing(options)).toStrictEqual({ ok: true })
  })

  // A route of health, called through healthClient.
  // health のルート。healthClient を通して呼び出される。
  it('getHealth resolves with the body of /api/health', async () => {
    expect(await getHealth(options)).toStrictEqual({ status: 'up' })
  })

  // A route of vaults, called through vaultsClient.
  // vaults のルート。vaultsClient を通して呼び出される。
  it('getVaults resolves with the list', async () => {
    expect(await getVaults(options)).toStrictEqual([{ id: 1, name: 'personal' }])
  })

  // A request body travels through the client of the group.
  // リクエストボディは、グループのクライアントを通して送られる。
  it('postVaults resolves with the vault it created', async () => {
    expect(await postVaults({ json: { name: 'work' } }, options)).toStrictEqual({
      id: 2,
      name: 'work',
    })
  })

  // A path parameter travels through the client of the group.
  // パスパラメータは、グループのクライアントを通して送られる。
  it('getVaultsId resolves with the vault of the id', async () => {
    expect(await getVaultsId({ param: { id: 7 } }, options)).toStrictEqual({
      id: 7,
      name: 'personal',
    })
  })

  // A query parameter travels through the client of the group.
  // クエリパラメータは、グループのクライアントを通して送られる。
  it('getItems resolves with the items', async () => {
    expect(await getItems({ query: { limit: 1 } }, options)).toStrictEqual([
      { id: 1, title: 'first' },
    ])
  })

  // A route deep under /items is called through itemsClient.
  // /items の深い階層にあるルートは、itemsClient を通して呼び出される。
  it('postItemsIdShares resolves with the item it shared', async () => {
    expect(await postItemsIdShares({ param: { id: 3 } }, options)).toStrictEqual({
      id: 3,
      title: 'shared',
    })
  })
})
