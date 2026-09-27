// The `basePath` config option (cases/basepath, generated from specs/petstore.yaml with
// `basePath: '/api/v3'`).
//
// The prefix belongs to the app, not to the routes: the generated route definitions keep
// the paths the spec declares (`/user/login`), and the generated app mounts them under the
// prefix with `.basePath('/api/v3')`. So a request resolves under `/api/v3` and nowhere
// else.
//
// `basePath` 設定オプションの検証(cases/basepath。specs/petstore.yaml から
// `basePath: '/api/v3'` を指定して生成)。
//
// プレフィックスはルートではなくアプリに属する。生成されるルート定義は仕様どおりのパス
// (`/user/login`)を保ち、生成されるアプリが `.basePath('/api/v3')` でそれらをプレフィックス
// 配下にマウントする。そのため、リクエストは `/api/v3` 配下でのみ解決される。
//
// The app under test is the generated mock, which answers every route with generated data.
// The tests therefore assert the status, which is what routing decides, and not the body.
// テスト対象のアプリは生成されたモックであり、すべてのルートに生成データで応答する。
// そのため、ここではボディではなく、ルーティングの結果であるステータスを検証する。
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { describe, expect, it } from 'vite-plus/test'

import app from '../__generated__/basepath/mock'

const generatedDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  '__generated__',
  'basepath',
)

describe('basePath: routes are served under the prefix', () => {
  // A route with no parameter.
  // パラメータを持たないルート。
  it('serves GET /api/v3/user/login', async () => {
    const res = await app.request('/api/v3/user/login')
    expect(res.status).toBe(200)
  })

  // Another route with no parameter, two segments deep.
  // パラメータを持たない、2階層のルート。
  it('serves GET /api/v3/store/inventory', async () => {
    const res = await app.request('/api/v3/store/inventory')
    expect(res.status).toBe(200)
  })

  // A route with a path parameter: the prefix does not disturb the parameter.
  // パスパラメータを持つルート。プレフィックスがパラメータの解釈を乱すことはない。
  it('serves GET /api/v3/pet/1', async () => {
    const res = await app.request('/api/v3/pet/1')
    expect(res.status).toBe(200)
  })

  // A static route beside a parameterised one, `/pet/findByStatus` and `/pet/{petId}`:
  // under the prefix the static one still wins.
  // 静的ルート `/pet/findByStatus` と、パラメータ付きルート `/pet/{petId}` が並ぶケース。
  // プレフィックス配下でも、静的ルートが優先される。
  it('serves GET /api/v3/pet/findByStatus', async () => {
    const res = await app.request('/api/v3/pet/findByStatus?status=available')
    expect(res.status).toBe(200)
  })

  // A second method on the same path.
  // 同じパスに対する2つ目のメソッド。
  it('serves DELETE /api/v3/pet/1', async () => {
    const res = await app.request('/api/v3/pet/1', { method: 'DELETE' })
    expect(res.status).toBe(200)
  })

  // Validation still runs under the prefix: `petId` is an int64, and "x" is not one. The
  // answer is 400, not 404, so the request reached the route.
  // プレフィックス配下でも検証は行われる。`petId` は int64 であり、"x" は int64 ではない。
  // 応答は 404 ではなく 400 であり、リクエストがルートまで到達したことが分かる。
  it('validates a path parameter under the prefix', async () => {
    const res = await app.request('/api/v3/pet/x')
    expect(res.status).toBe(400)
  })
})

describe('basePath: nothing is served outside the prefix', () => {
  // The path as the spec declares it, with no prefix.
  // プレフィックスなしの、仕様で宣言されたとおりのパス。
  it('does not serve /user/login', async () => {
    const res = await app.request('/user/login')
    expect(res.status).toBe(404)
  })

  // The prefix alone is not a route.
  // プレフィックスだけでは、ルートにならない。
  it('does not serve /api/v3', async () => {
    const res = await app.request('/api/v3')
    expect(res.status).toBe(404)
  })

  // Nor is the prefix with a trailing slash.
  // 末尾にスラッシュを付けたプレフィックスも、ルートにならない。
  it('does not serve /api/v3/', async () => {
    const res = await app.request('/api/v3/')
    expect(res.status).toBe(404)
  })

  // Half of the prefix.
  // プレフィックスの前半だけの場合。
  it('does not serve /api', async () => {
    const res = await app.request('/api')
    expect(res.status).toBe(404)
  })

  // The prefix is applied once: a route is not reachable under the prefix twice over.
  // プレフィックスが適用されるのは1回だけである。二重のプレフィックスではルートに届かない。
  it('does not serve /api/v3/api/v3/user/login', async () => {
    const res = await app.request('/api/v3/api/v3/user/login')
    expect(res.status).toBe(404)
  })

  // The prefix is matched segment by segment: "/api/v30" merely starts with "/api/v3".
  // プレフィックスはセグメント単位で照合される。"/api/v30" は "/api/v3" で始まるだけである。
  it('does not serve /api/v30/user/login', async () => {
    const res = await app.request('/api/v30/user/login')
    expect(res.status).toBe(404)
  })

  // Without the slash between the prefix and the route, it is a different path.
  // プレフィックスとルートの間のスラッシュがなければ、別のパスになる。
  it('does not serve /api/v3user/login', async () => {
    const res = await app.request('/api/v3user/login')
    expect(res.status).toBe(404)
  })

  // The prefix is case-sensitive, like the rest of the path.
  // プレフィックスも、パスの他の部分と同じく大文字小文字を区別する。
  it('does not serve /API/V3/user/login', async () => {
    const res = await app.request('/API/V3/user/login')
    expect(res.status).toBe(404)
  })

  // A trailing slash after the route makes it a different path.
  // ルートの末尾にスラッシュを付けると、別のパスになる。
  it('does not serve /api/v3/user/login/', async () => {
    const res = await app.request('/api/v3/user/login/')
    expect(res.status).toBe(404)
  })

  // A path the spec does not declare, under the prefix.
  // プレフィックス配下の、仕様で宣言されていないパス。
  it('does not serve /api/v3/nope', async () => {
    const res = await app.request('/api/v3/nope')
    expect(res.status).toBe(404)
  })

  // A method the spec does not declare for the path: `/user/login` is GET only.
  // パスに対して仕様で宣言されていないメソッド。`/user/login` は GET のみである。
  it('does not serve POST /api/v3/user/login', async () => {
    const res = await app.request('/api/v3/user/login', { method: 'POST' })
    expect(res.status).toBe(404)
  })
})

describe('basePath: the generated sources', () => {
  // The route definitions carry no trace of the prefix. If they did, mounting them with
  // `.basePath()` would apply it twice, and the OpenAPI document generated from the routes
  // would repeat it in every path.
  // ルート定義には、プレフィックスの痕跡が一切ない。もし含まれていれば、`.basePath()` での
  // マウント時に二重に適用され、ルートから生成される OpenAPI ドキュメントでも、すべての
  // パスにプレフィックスが重複してしまう。
  it('keeps the prefix out of routes.ts', () => {
    const routes = readFileSync(path.join(generatedDir, 'routes.ts'), 'utf8')
    expect(routes).not.toContain('/api/v3')
    expect(routes).toContain("path: '/user/login'")
    expect(routes).toContain("path: '/pet/{petId}'")
  })

  // The app mounts the prefix exactly once.
  // アプリは、プレフィックスをちょうど1回だけマウントする。
  it('mounts the prefix once in the app', () => {
    const mock = readFileSync(path.join(generatedDir, 'mock.ts'), 'utf8')
    expect(mock.split(".basePath('/api/v3')")).toHaveLength(2)
  })
})
