// The generated RPC client functions (cases/rpc, generated from specs/users.yaml with
// `parseResponse: true`), called against the host in hosts/users-app.ts.
//
// With `parseResponse`, a generated function resolves with the parsed body of a 2xx
// response, and rejects with hono/client's `DetailedError` for anything else. The error
// carries the status and the parsed error body, so the caller gets the typed error
// contract the spec declares.
//
// 生成された RPC クライアント関数の検証(cases/rpc。specs/users.yaml から
// `parseResponse: true` を指定して生成)。hosts/users-app.ts のホストに対して呼び出す。
//
// `parseResponse` を指定すると、生成された関数は 2xx レスポンスではパース済みのボディで
// resolve し、それ以外では hono/client の `DetailedError` で reject する。エラーには
// ステータスとパース済みのエラーボディが含まれるため、呼び出し側は仕様で宣言された
// 型付きのエラー契約を受け取れる。
import { DetailedError } from 'hono/client'
import { afterEach, describe, expect, it, vi } from 'vite-plus/test'

import {
  deleteUsersId,
  getItems,
  getSlow,
  getUsers,
  getUsersId,
  postUsers,
} from '../__generated__/rpc/rpc'
import { fetchOf } from '../hosts/fetch'
import { app as host, requestLog } from '../hosts/users-app'

// The generated client reaches the host through this fetch.
// 生成されたクライアントは、この fetch を通してホストに届く。
vi.stubGlobal('fetch', fetchOf(host))

// The host records every request it serves. Each test starts from an empty log.
// ホストは、処理したすべてのリクエストを記録する。各テストは空のログから開始する。
afterEach(() => {
  requestLog.length = 0
})

describe('rpc: a 2xx response resolves with the parsed body', () => {
  // 200 with a JSON array.
  // JSON 配列を返す 200。
  it('getUsers resolves with the list on 200', async () => {
    expect(await getUsers()).toStrictEqual([
      { id: '1', name: 'Alice' },
      { id: '2', name: 'Bob' },
    ])
    expect(requestLog).toStrictEqual(['GET /users'])
  })

  // 200 with a JSON object. The path parameter is put into the URL.
  // JSON オブジェクトを返す 200。パスパラメータは URL に埋め込まれる。
  it('getUsersId resolves with the user on 200', async () => {
    expect(await getUsersId({ param: { id: '1' }, header: {} })).toStrictEqual({
      id: '1',
      name: 'Alice',
    })
    expect(requestLog).toStrictEqual(['GET /users/1'])
  })

  // The optional header `x-trace` is accepted beside the path parameter.
  // 任意ヘッダー `x-trace` を、パスパラメータと併せて指定できる。
  it('getUsersId accepts the optional header', async () => {
    expect(await getUsersId({ param: { id: '2' }, header: { 'x-trace': 't' } })).toStrictEqual({
      id: '2',
      name: 'Bob',
    })
    expect(requestLog).toStrictEqual(['GET /users/2'])
  })

  // 201 is a success too: the created resource is the resolved value.
  // 201 も成功である。作成されたリソースが resolve される値になる。
  it('postUsers resolves with the created resource on 201', async () => {
    expect(await postUsers({ json: { name: 'Charlie' } })).toStrictEqual({
      id: '99',
      name: 'Charlie',
    })
    expect(requestLog).toStrictEqual(['POST /users'])
  })

  // The JSON body is sent as UTF-8: multi-byte text and an emoji come back unchanged.
  // JSON ボディは UTF-8 で送信される。マルチバイト文字や絵文字も、変化せずに返ってくる。
  it('postUsers sends multi-byte text intact', async () => {
    expect(await postUsers({ json: { name: '太郎 🔥' } })).toStrictEqual({
      id: '99',
      name: '太郎 🔥',
    })
  })

  // 204 has no body, so there is nothing to parse: the function resolves with undefined.
  // 204 にはボディがなく、パースする対象がない。関数は undefined で resolve する。
  it('deleteUsersId resolves with undefined on 204', async () => {
    // oxlint-disable-next-line typescript/no-confusing-void-expression -- asserts the generated client resolves to undefined on 204
    expect(await deleteUsersId({ param: { id: '1' } })).toBeUndefined()
    expect(requestLog).toStrictEqual(['DELETE /users/1'])
  })

  // A query parameter is put into the query string.
  // クエリパラメータは、クエリ文字列に埋め込まれる。
  it('getItems sends the query parameter', async () => {
    expect(await getItems({ query: { page: '0' } })).toStrictEqual({
      items: ['a', 'b'],
      nextPage: 1,
    })
    expect(requestLog).toStrictEqual(['GET /items?page=0'])
  })

  // The last page has no `nextPage`: the key is absent from the parsed body, not null.
  // 最終ページには `nextPage` がない。パース済みのボディにはキー自体が存在せず、null でもない。
  it('getItems resolves without nextPage on the last page', async () => {
    expect(await getItems({ query: { page: '2' } })).toStrictEqual({ items: ['e'] })
  })

  // A page past the end is an empty list, not an error.
  // 末尾を超えたページは空のリストであり、エラーではない。
  it('getItems resolves with no items past the last page', async () => {
    expect(await getItems({ query: { page: '9' } })).toStrictEqual({ items: [] })
  })

  // A function with no arguments at all.
  // 引数を一切持たない関数。
  it('getSlow resolves once the slow response arrives', async () => {
    expect(await getSlow()).toStrictEqual({ ok: true })
    expect(requestLog).toStrictEqual(['GET /slow'])
  })
})

describe('rpc: a non-2xx response rejects with DetailedError', () => {
  // 404: the whole error contract, field by field. `detail.data` is the parsed error body.
  // 404 の場合。エラー契約の全フィールドを検証する。`detail.data` はパース済みの
  // エラーボディである。
  it('getUsersId rejects with the full error contract on 404', async () => {
    const captured = await getUsersId({ param: { id: '999' }, header: {} }).then(
      () => null,
      (e: unknown) => e,
    )
    expect(captured).toBeInstanceOf(DetailedError)
    const e = captured as DetailedError
    expect({
      name: e.name,
      statusCode: e.statusCode,
      detail: e.detail,
      code: e.code,
      log: e.log,
    }).toStrictEqual({
      name: 'DetailedError',
      statusCode: 404,
      detail: { data: { error: 'Not Found' }, statusText: '' },
      code: undefined,
      log: undefined,
    })
  })

  // A path parameter with multi-byte text is percent-encoded on the way out and decoded by
  // the host: the request log shows the decoded id.
  // マルチバイト文字を含むパスパラメータは、送信時にパーセントエンコードされ、ホスト側で
  // デコードされる。リクエストログには、デコード後の id が記録される。
  it('getUsersId encodes a multi-byte path parameter', async () => {
    const captured = await getUsersId({ param: { id: 'あ' }, header: {} }).then(
      () => null,
      (e: unknown) => e,
    )
    expect(captured).toBeInstanceOf(DetailedError)
    expect((captured as DetailedError).statusCode).toBe(404)
    expect(requestLog).toStrictEqual(['GET /users/あ'])
  })

  // 400 from the host's own validation of the JSON body.
  // ホスト自身による JSON ボディの検証結果としての 400。
  it('postUsers rejects with DetailedError on 400', async () => {
    const captured = await postUsers({ json: { name: '' } }).then(
      () => null,
      (e: unknown) => e,
    )
    expect(captured).toBeInstanceOf(DetailedError)
    const e = captured as DetailedError
    expect({ statusCode: e.statusCode, detail: e.detail }).toStrictEqual({
      statusCode: 400,
      detail: { data: { error: 'name is required' }, statusText: '' },
    })
  })

  // A rejected request did not run the handler: nothing was created.
  // 拒否されたリクエストでは、ハンドラは実行されない。リソースは作成されていない。
  it('postUsers does not reach the handler on 400', async () => {
    await postUsers({ json: { name: '' } }).catch(() => null)
    expect(requestLog).toStrictEqual([])
  })

  // 400 from the validation of a query parameter.
  // クエリパラメータの検証結果としての 400。
  it('getItems rejects with DetailedError on 400', async () => {
    const captured = await getItems({ query: { page: 'x' } }).then(
      () => null,
      (e: unknown) => e,
    )
    expect(captured).toBeInstanceOf(DetailedError)
    const e = captured as DetailedError
    expect({ statusCode: e.statusCode, detail: e.detail }).toStrictEqual({
      statusCode: 400,
      detail: { data: { error: 'page must be a non-negative integer' }, statusText: '' },
    })
  })
})

describe('rpc: calls are independent', () => {
  // A failed call must not poison the next one.
  // 失敗した呼び出しが、次の呼び出しに影響してはならない。
  it('a rejection does not affect the next call', async () => {
    await getUsersId({ param: { id: '999' }, header: {} }).catch(() => null)
    expect(await getUsersId({ param: { id: '1' }, header: {} })).toStrictEqual({
      id: '1',
      name: 'Alice',
    })
  })

  // Calls made at the same time each resolve with their own answer.
  // 同時に行った呼び出しは、それぞれ自身の応答で resolve する。
  it('concurrent calls each resolve with their own answer', async () => {
    const [first, second, created] = await Promise.all([
      getUsersId({ param: { id: '1' }, header: {} }),
      getUsersId({ param: { id: '2' }, header: {} }),
      postUsers({ json: { name: 'Dave' } }),
    ])
    expect(first).toStrictEqual({ id: '1', name: 'Alice' })
    expect(second).toStrictEqual({ id: '2', name: 'Bob' })
    expect(created).toStrictEqual({ id: '99', name: 'Dave' })
  })

  // The second argument, `options`, is passed through to the client: extra headers do not
  // change the result.
  // 第2引数の `options` は、クライアントにそのまま渡される。追加のヘッダーを指定しても、
  // 結果は変わらない。
  it('accepts client options', async () => {
    expect(await getUsers({ headers: { 'x-extra': '1' } })).toStrictEqual([
      { id: '1', name: 'Alice' },
      { id: '2', name: 'Bob' },
    ])
  })
})
