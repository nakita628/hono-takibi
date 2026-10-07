// The three scaffold modes (cases/template-inline, cases/template-route-handler,
// cases/template-define, generated from specs/health.yaml), each with the routes in a split
// directory and a client. The cases typecheck, which is what proves the imports resolve;
// this file proves the same at run time: the app entry registers every route through the
// handlers it imports, and the generated client reaches it.
//
// scaffold の 3 モード(cases/template-inline、cases/template-route-handler、
// cases/template-define。specs/health.yaml から生成)。いずれも routes は分割ディレクトリで、
// クライアント付き。import が解決することはケースの typecheck が証明する。このファイルは同じことを
// 実行時に確認する。app entry が import したハンドラを通してすべてのルートを登録し、生成された
// クライアントがそこに届く。
import { describe, expect, it, vi } from 'vite-plus/test'

import defineApp from '../__generated__/template-define/src/index'
import { getHealth as defineGetHealth } from '../__generated__/template-define/src/rpc'
import inlineApp from '../__generated__/template-inline/src/index'
import { getHealth as inlineGetHealth } from '../__generated__/template-inline/src/rpc'
import routeHandlerApp from '../__generated__/template-route-handler/src/index'
import { getHealth as routeHandlerGetHealth } from '../__generated__/template-route-handler/src/rpc'
import { fetchOf } from '../hosts/fetch'

const PATHS = ['/api/health', '/api/health/test', '/api/styles/query']

describe.each([
  ['inline', inlineApp, inlineGetHealth],
  ['routeHandler', routeHandlerApp, routeHandlerGetHealth],
  ['define', defineApp, defineGetHealth],
] as const)('template %s', (_mode, app, getHealth) => {
  // Every route of the document is on the app, under the base path.
  // ドキュメントのすべてのルートが、ベースパスの下でアプリに載っている。
  it('registers every route through the imported handlers', () => {
    const registered = app.routes.map((route) => route.path)
    for (const path of PATHS) {
      expect(registered).toContain(path)
    }
  })

  // The handlers are stubs the harness filled with `c.notFound()`, so a request is answered
  // by the route, with 404, rather than falling through to the app's own 404.
  // ハンドラはハーネスが `c.notFound()` で埋めたスタブなので、リクエストはアプリ自身の 404 では
  // なく、ルートが 404 で応答する。
  it('is reached by the generated client', async () => {
    const requested: string[] = []
    const fetch = fetchOf(app)
    vi.stubGlobal('fetch', (input: string | URL | Request, init?: RequestInit) => {
      requested.push(input instanceof Request ? input.url : String(input))
      return fetch(input, init)
    })
    try {
      const res = await getHealth()
      expect(res.status).toBe(404)
      expect(requested).toStrictEqual(['/api/health'])
    } finally {
      vi.unstubAllGlobals()
    }
  })
})
