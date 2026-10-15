// A client created with `credentials` (cases/client-credentials, generated from
// specs/client-split.yaml with `client.credentials: 'include'` under the base path `/api`).
//
// The generated file passes `{ init: { credentials: 'include' } }` to `hc`, so every
// request the client sends carries the cookies, to any origin: what the cookies guide of
// Hono asks for. The tests hand each request a `fetch` of their own and read what it is
// called with.
//
// `credentials` 付きで作られるクライアントの検証(cases/client-credentials。
// specs/client-split.yaml から `client.credentials: 'include'` とベースパス `/api` で生成)。
//
// 生成ファイルは `hc` に `{ init: { credentials: 'include' } }` を渡すため、クライアントが
// 送るすべてのリクエストが、どのオリジンへもクッキーを伴う。Hono の cookies ガイドが求める
// 形である。テストは各リクエストに独自の `fetch` を渡し、それが何で呼ばれたかを読む。
import fs from 'node:fs'
import path from 'node:path'

import { describe, expect, it } from 'vite-plus/test'

import { vaultsClient, healthClient } from '../__generated__/client-credentials/src/client'
import { getVaults } from '../__generated__/client-credentials/src/rpc'

describe('client: the credentials of every request', () => {
  // The client of a group sends its requests with the credentials.
  // グループのクライアントは、credentials 付きでリクエストを送る。
  it('vaultsClient requests with credentials include', async () => {
    const inits: (RequestInit | undefined)[] = []
    await vaultsClient.vaults.$get(undefined, {
      fetch: (_input: string | URL | Request, init?: RequestInit) => {
        inits.push(init)
        return Promise.resolve(Response.json([]))
      },
    })
    expect(inits.map((init) => init?.credentials)).toStrictEqual(['include'])
  })

  // So does the client of another group: every client of the file is created the same way.
  // 他のグループのクライアントも同様である。ファイルのすべてのクライアントが同じ形で作られる。
  it('healthClient requests with credentials include', async () => {
    const inits: (RequestInit | undefined)[] = []
    await healthClient.health.$get(undefined, {
      fetch: (_input: string | URL | Request, init?: RequestInit) => {
        inits.push(init)
        return Promise.resolve(Response.json({ status: 'up' }))
      },
    })
    expect(inits.map((init) => init?.credentials)).toStrictEqual(['include'])
  })

  // The per-request options stand beside the credentials: a header of the request and the
  // `fetch` of the test, with the credentials still there.
  // リクエストごとのオプションは credentials と並ぶ。リクエストのヘッダーとテストの `fetch`
  // を渡しても、credentials はそのまま残る。
  it('keeps the credentials beside the options of the request', async () => {
    const inits: (RequestInit | undefined)[] = []
    await vaultsClient.vaults.$get(undefined, {
      headers: { 'x-request-id': 'req-1' },
      fetch: (_input: string | URL | Request, init?: RequestInit) => {
        inits.push(init)
        return Promise.resolve(Response.json([]))
      },
    })
    expect(inits[0]?.credentials).toBe('include')
    expect(new Headers(inits[0]?.headers).get('x-request-id')).toBe('req-1')
  })

  // The generated rpc function goes through the same client.
  // 生成された rpc 関数も、同じクライアントを通る。
  it('getVaults requests with credentials include', async () => {
    const inits: (RequestInit | undefined)[] = []
    const body = await getVaults({
      fetch: (_input: string | URL | Request, init?: RequestInit) => {
        inits.push(init)
        return Promise.resolve(Response.json([{ id: 1, name: 'personal' }]))
      },
    })
    expect(inits.map((init) => init?.credentials)).toStrictEqual(['include'])
    expect(body).toStrictEqual([{ id: 1, name: 'personal' }])
  })
})

describe('client: the file', () => {
  // The credentials are the one `init` the file writes, after the base URL.
  // credentials は、ファイルが書く唯一の `init` であり、ベース URL の後に置かれる。
  it('writes the credentials as the init of hc', () => {
    const source = fs.readFileSync(
      path.resolve(import.meta.dirname, '../__generated__/client-credentials/src/client.ts'),
      'utf8',
    )
    expect(source).toContain("hcVaultsWithType('/', { init: { credentials: 'include' } }).api")
  })
})
