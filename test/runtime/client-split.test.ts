// A split application and its clients (cases/client-split, generated from
// specs/client-split.yaml with `template.split` and `client`).
//
// `template.split` divides the routes by the first segment of each path: `vaults` is
// `/vaults` and `/vaults/{id}`, registered on the one app like every other group. `client`
// generates the file of typed clients, `vaultsClient` for `vaults` and `client` for the
// routes that belong to no group. The rpc functions are generated to call the client of
// their group.
//
// What this file checks is that the division changes nothing a caller can see: every route
// answers under the base path as before, and every generated function reaches its route.
//
// 分割されたアプリケーションと、そのクライアントの検証(cases/client-split。
// specs/client-split.yaml から `template.split` と `client` を指定して生成)。
//
// `template.split` は、各パスの先頭セグメントでルートを分割する。`vaults` は `/vaults` と
// `/vaults/{id}` であり、他のグループと同じく、1つのアプリに登録される。`client` は
// 型付きクライアントのファイルを生成する。`vaults` 用が `vaultsClient`、どのグループにも
// 属さないルート用が `client` である。rpc 関数は、自身のグループのクライアントを呼び出す
// ように生成される。
//
// このファイルが確認するのは、分割によって呼び出し側から見える挙動が変わらないことである。
// すべてのルートは従来どおりベースパスの下で応答し、生成された関数はすべて自身のルートに届く。
import { describe, expect, it } from 'vite-plus/test'

import { healthClient, itemsClient, vaultsClient } from '../__generated__/client-split/src/client'
import app, { health, items, v2Public, vaults } from '../__generated__/client-split/src/index'
import {
  get,
  getHealth,
  getItems,
  getV2PublicPing,
  getVaults,
  getVaultsId,
  postItemsIdShares,
  postVaults,
} from '../__generated__/client-split/src/rpc'

// The generated clients are created with the base URL "/", so a call is a request for a
// path, which the app answers without a server.
// 生成されたクライアントはベース URL "/" で作られるため、呼び出しはパスへのリクエストになる。
// アプリは、サーバーなしでこれに応答する。
const options = {
  fetch: (input: string | URL | Request, init?: RequestInit) => app.request(input, init),
}

describe('app: every route answers under the base path', () => {
  // health is a group, registered on the app.
  // health はグループであり、アプリに登録されている。
  it('GET /api/health reaches the health group', async () => {
    const res = await app.request('/api/health')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ status: 'up' })
  })

  // A path with a parameter belongs to the group of its first segment.
  // パラメータを持つパスは、先頭セグメントのグループに属する。
  it('GET /api/vaults/7 reaches the vaults group', async () => {
    const res = await app.request('/api/vaults/7')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ id: 7, name: 'personal' })
  })

  // The first segment decides, however deep the path: a share of an item is an item.
  // パスがどれだけ深くても、先頭セグメントで決まる。item の share は item に属する。
  it('POST /api/items/3/shares reaches the items group', async () => {
    const res = await app.request('/api/items/3/shares', { method: 'POST' })
    expect(res.status).toBe(201)
    expect(await res.json()).toStrictEqual({ id: 3, title: 'shared' })
  })

  // The root names no group and is a route of api.
  // ルートはグループ名にならないため、api のルートになる。
  it('GET /api is a route of api', async () => {
    const res = await app.request('/api')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ ok: true })
  })

  // v2-public is not an identifier as it stands; its group goes by v2Public, the name a
  // handler file of it takes.
  // v2-public はそのままでは識別子ではない。グループ名は、ハンドラーファイルと同じ
  // v2Public になる。
  it('GET /api/v2-public/ping reaches the v2Public group', async () => {
    const res = await app.request('/api/v2-public/ping')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ ok: true })
  })

  // Without the base path nothing is mounted.
  // ベースパスがなければ、何もマウントされていない。
  it('GET /vaults is not found without the base path', async () => {
    const res = await app.request('/vaults')
    expect(res.status).toBe(404)
  })
})

describe('groups: every group is the one app', () => {
  // A group is what registering its routes on the app returns, which is the app. What
  // differs from group to group is the type.
  // グループは、アプリにルートを登録した結果として返される値であり、それはアプリ自身である。
  // グループごとに異なるのは、型である。
  it('vaults, items, health and v2Public are the app', () => {
    expect(vaults).toBe(app)
    expect(items).toBe(app)
    expect(health).toBe(app)
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

  // A path parameter is written into the path.
  // パスパラメータは、パスの中に書き込まれる。
  it('vaultsClient requests /api/vaults/7 for id 7', async () => {
    const requested: string[] = []
    await vaultsClient.vaults[':id'].$get(
      { param: { id: 7 } },
      {
        fetch: (input: string | URL | Request, init?: RequestInit) => {
          requested.push(input instanceof Request ? input.url : input.toString())
          return app.request(input, init)
        },
      },
    )
    expect(requested).toStrictEqual(['/api/vaults/7'])
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

  // The same for health.
  // health も同様である。
  it('healthClient requests /api/health', async () => {
    const requested: string[] = []
    await healthClient.health.$get(undefined, {
      fetch: (input: string | URL | Request, init?: RequestInit) => {
        requested.push(input instanceof Request ? input.url : input.toString())
        return app.request(input, init)
      },
    })
    expect(requested).toStrictEqual(['/api/health'])
  })
})

describe('rpc: every generated function reaches its route', () => {
  // A route of no group, called through client.
  // どのグループにも属さないルート。client を通して呼び出される。
  it('get resolves with the body of /api', async () => {
    expect(await get(options)).toStrictEqual({ ok: true })
  })

  // A route of v2Public, called through v2PublicClient.
  // v2Public のルート。v2PublicClient を通して呼び出される。
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
  it('getItems resolves with as many items as the limit', async () => {
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
