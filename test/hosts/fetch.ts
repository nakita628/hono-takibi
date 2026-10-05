import type { Hono } from 'hono'

/**
 * A `fetch` that hands every request to `app` in-process. The generated client calls
 * `fetch` with the paths of the app, so a test installs this as the global fetch and the
 * host answers — the way `testClient` did when the hooks were handed a client.
 *
 * すべてのリクエストをプロセス内で `app` に渡す `fetch`。生成されたクライアントはアプリのパスで
 * `fetch` を呼ぶため、テストはこれをグローバルの fetch として差し込み、ホストが応答する。
 * フックにクライアントを渡していたころの `testClient` と同じ役割である。
 */
export function fetchOf(app: Pick<Hono, 'request'>) {
  return (input: string | URL | Request, init?: RequestInit) =>
    input instanceof Request ? app.request(input) : app.request(String(input), init)
}
