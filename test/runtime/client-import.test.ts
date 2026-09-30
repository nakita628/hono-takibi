// A client whose base URL is a property of an environment a module exports
// (cases/client-import, generated from specs/client-split.yaml with
// `client.baseUrl: { env: 'CLIENT_IMPORT_API_URL', import: './env' }` and no `basePath`).
//
// The module, cases/client-import/overlay/src/env.ts, validates the environment when it is
// loaded and exports what it parsed. The generated client imports it, so each test sets the
// variable and then loads the client anew.
//
// ベース URL を、モジュールが export する環境のプロパティから読み取るクライアントの検証
// (cases/client-import。specs/client-split.yaml から
// `client.baseUrl: { env: 'CLIENT_IMPORT_API_URL', import: './env' }` を指定し、
// `basePath` なしで生成)。
//
// モジュール(cases/client-import/overlay/src/env.ts)は、読み込まれた時点で環境を検証し、
// パース結果を export する。生成されたクライアントはこれを import するため、各テストは
// 変数を設定したうえで、クライアントを新たに読み込む。
import { afterEach, describe, expect, it, vi } from 'vite-plus/test'

afterEach(() => {
  vi.unstubAllEnvs()
  vi.resetModules()
})

describe('client: the base URL is the property of the imported environment', () => {
  // Without a base path the client of a group requests the path of the document.
  // ベースパスがなければ、グループのクライアントはドキュメントのパスにリクエストする。
  it('vaultsClient requests the URL of the environment', async () => {
    vi.stubEnv('CLIENT_IMPORT_API_URL', 'http://api.test')
    const { vaultsClient } = await import('../__generated__/client-import/src/client')
    const requested: string[] = []
    await vaultsClient.vaults.$get(undefined, {
      fetch: (input: string | URL | Request) => {
        requested.push(input instanceof Request ? input.url : input.toString())
        return Promise.resolve(Response.json([]))
      },
    })
    expect(requested).toStrictEqual(['http://api.test/vaults'])
  })

  // The client of the routes that belong to no group is created with the same URL. The
  // root is the one route of it, reached as index.
  // どのグループにも属さないルートのクライアントも、同じ URL で作られる。そのルートは
  // ルートパスだけであり、index として呼び出す。
  it('client requests the URL of the environment', async () => {
    vi.stubEnv('CLIENT_IMPORT_API_URL', 'http://api.test')
    const { client } = await import('../__generated__/client-import/src/client')
    const requested: string[] = []
    await client.index.$get(undefined, {
      fetch: (input: string | URL | Request) => {
        requested.push(input instanceof Request ? input.url : input.toString())
        return Promise.resolve(Response.json({ ok: true }))
      },
    })
    expect(requested).toStrictEqual(['http://api.test/'])
  })
})

describe('client: an environment that does not validate', () => {
  // The module throws when it is loaded, and the client that imports it with it: a client
  // is never created with a URL that is not one.
  // モジュールは読み込み時に例外を投げ、それを import するクライアントも同様に失敗する。
  // URL でない値でクライアントが作られることはない。
  it('the client fails to load when the variable is not a URL', async () => {
    vi.stubEnv('CLIENT_IMPORT_API_URL', 'not a url')
    await expect(import('../__generated__/client-import/src/client')).rejects.toThrow(
      'CLIENT_IMPORT_API_URL must be a URL',
    )
  })

  // The same when the variable is not set at all.
  // 変数がまったく設定されていない場合も同様である。
  it('the client fails to load when the variable is not set', async () => {
    vi.stubEnv('CLIENT_IMPORT_API_URL', undefined)
    await expect(import('../__generated__/client-import/src/client')).rejects.toThrow('Invalid env')
  })
})
