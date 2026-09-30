// A client whose base URL is read from the environment (cases/client-env, generated from
// specs/client-split.yaml with `client.baseUrl: { env: 'CLIENT_ENV_API_URL' }`).
//
// The generated file reads the variable once, when it is loaded, so each test sets the
// variable and then loads the file anew.
//
// The client is written to src/lib/client.ts and re-exported by the barrel beside it,
// src/lib/index.ts. The tests import the barrel, as the generated rpc file does.
//
// ベース URL を環境変数から読み取るクライアントの検証(cases/client-env。
// specs/client-split.yaml から `client.baseUrl: { env: 'CLIENT_ENV_API_URL' }` を指定して生成)。
//
// 生成されたファイルは、読み込まれた時点で一度だけ変数を読み取る。そのため、各テストは
// 変数を設定したうえで、ファイルを新たに読み込む。
//
// クライアントは src/lib/client.ts に出力され、隣のバレル src/lib/index.ts から再 export
// される。テストは、生成された rpc ファイルと同じく、バレルを import する。
import { afterEach, describe, expect, it, vi } from 'vite-plus/test'

afterEach(() => {
  vi.unstubAllEnvs()
  vi.resetModules()
})

describe('client: the base URL is the value of the variable', () => {
  // The client of a group requests below the base path of the app.
  // グループのクライアントは、アプリのベースパスの下にリクエストする。
  it('healthClient requests the URL of the variable and the base path', async () => {
    vi.stubEnv('CLIENT_ENV_API_URL', 'http://api.test')
    const { healthClient } = await import('../__generated__/client-env/src/lib')
    const requested: string[] = []
    await healthClient.health.$get(undefined, {
      fetch: (input: string | URL | Request) => {
        requested.push(input instanceof Request ? input.url : input.toString())
        return Promise.resolve(Response.json({ status: 'up' }))
      },
    })
    expect(requested).toStrictEqual(['http://api.test/api/health'])
  })

  // The same for another group.
  // 他のグループも同様である。
  it('vaultsClient requests the URL of the variable and the base path', async () => {
    vi.stubEnv('CLIENT_ENV_API_URL', 'http://api.test')
    const { vaultsClient } = await import('../__generated__/client-env/src/lib')
    const requested: string[] = []
    await vaultsClient.vaults.$get(undefined, {
      fetch: (input: string | URL | Request) => {
        requested.push(input instanceof Request ? input.url : input.toString())
        return Promise.resolve(Response.json([]))
      },
    })
    expect(requested).toStrictEqual(['http://api.test/api/vaults'])
  })

  // A slash at the end of the value is not doubled by the path that follows it.
  // 値の末尾のスラッシュは、後に続くパスと重複しない。
  it('vaultsClient does not double a slash the variable ends with', async () => {
    vi.stubEnv('CLIENT_ENV_API_URL', 'http://api.test/')
    const { vaultsClient } = await import('../__generated__/client-env/src/lib')
    const requested: string[] = []
    await vaultsClient.vaults.$get(undefined, {
      fetch: (input: string | URL | Request) => {
        requested.push(input instanceof Request ? input.url : input.toString())
        return Promise.resolve(Response.json([]))
      },
    })
    expect(requested).toStrictEqual(['http://api.test/api/vaults'])
  })
})

describe('client: a variable that is not set', () => {
  // Without the variable the base URL is "/", the origin the page was served from.
  // 変数がなければ、ベース URL は "/" になる。ページを配信したオリジンである。
  it('vaultsClient requests the path alone', async () => {
    vi.stubEnv('CLIENT_ENV_API_URL', undefined)
    const { vaultsClient } = await import('../__generated__/client-env/src/lib')
    const requested: string[] = []
    await vaultsClient.vaults.$get(undefined, {
      fetch: (input: string | URL | Request) => {
        requested.push(input instanceof Request ? input.url : input.toString())
        return Promise.resolve(Response.json([]))
      },
    })
    expect(requested).toStrictEqual(['/api/vaults'])
  })
})

describe('barrel: the client is reached through the index beside it', () => {
  // The generated rpc file imports the barrel and reaches the routes through it.
  // 生成された rpc ファイルはバレルを import し、それを通してルートに到達する。
  it('getVaults requests through the client of the barrel', async () => {
    vi.stubEnv('CLIENT_ENV_API_URL', 'http://api.test')
    const { getVaults } = await import('../__generated__/client-env/src/rpc')
    const requested: string[] = []
    const body = await getVaults({
      fetch: (input: string | URL | Request) => {
        requested.push(input instanceof Request ? input.url : input.toString())
        return Promise.resolve(Response.json([{ id: 1, name: 'personal' }]))
      },
    })
    expect(requested).toStrictEqual(['http://api.test/api/vaults'])
    expect(body).toStrictEqual([{ id: 1, name: 'personal' }])
  })
})
