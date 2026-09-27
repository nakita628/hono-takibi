// The full-stack template output (cases/crud: template + rpc + mock, generated from
// specs/crud.yaml with `basePath: '/api'`), end to end: the generated routes and the
// generated app, with the hand-written handlers and in-memory store of cases/crud/overlay.
//
// フルスタックテンプレートの出力(cases/crud: template + rpc + mock。specs/crud.yaml から
// `basePath: '/api'` を指定して生成)を、エンドツーエンドで検証する。生成されたルートと
// アプリに、cases/crud/overlay の手書きハンドラとインメモリストアを組み合わせている。
//
// The store is emptied before every test, so the ids are known: the first task created in
// a test is "1", the second "2". The clock is fixed, so `createdAt` and `updatedAt` are
// known too, and every body can be compared whole.
// ストアは各テストの前に空にするため、id は既知である。テスト内で最初に作成したタスクは
// "1"、2番目は "2" になる。時計も固定しているので `createdAt` と `updatedAt` も既知であり、
// すべてのボディを丸ごと比較できる。
//
// This file holds the requests that are rejected. They are sent with `api.request`,
// because the typed client does not let an invalid request be written.
//
// A validation failure is answered by the default hook of @hono/zod-openapi: 400 with
// `{ success: false, error: { name: 'ZodError', message } }`, where `message` is the JSON
// of the issues. The tests assert the `code` and the `path` of every issue, and not the
// wording of its message, which belongs to Zod.
// このファイルには、拒否されるリクエストをまとめている。型付きクライアントでは不正な
// リクエストを記述できないため、`api.request` で送信する。
//
// 検証の失敗には、@hono/zod-openapi のデフォルトフックが応答する。400 とともに
// `{ success: false, error: { name: 'ZodError', message } }` が返り、`message` は issue の
// JSON 文字列である。テストでは各 issue の `code` と `path` を検証する。メッセージの文言は
// Zod に属するものなので、検証しない。
import { afterEach, beforeEach, describe, expect, it, vi } from 'vite-plus/test'

import { api } from '../__generated__/crud/src/index'
import { resetTasks } from '../__generated__/crud/src/store'

type ZodFailure = { success: boolean; error: { name: string; message: string } }

const NOW = '2026-01-02T03:04:05.000Z'

beforeEach(() => {
  vi.useFakeTimers()
  vi.setSystemTime(new Date(NOW))
  resetTasks()
})

afterEach(() => {
  vi.useRealTimers()
})

// POST /tasks.
// POST /tasks。
describe('create', () => {
  // title is required.
  // title は必須である。
  it('POST /api/tasks rejects a body with no title', async () => {
    const res = await api.request('/api/tasks', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({}),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toMatchObject([
      { code: 'invalid_type', path: ['title'] },
    ])
  })

  // One below minLength: 1.
  // minLength: 1 を 1 下回る。
  it('POST /api/tasks rejects an empty title', async () => {
    const res = await api.request('/api/tasks', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ title: '' }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toMatchObject([{ code: 'too_small', path: ['title'] }])
  })

  // One above maxLength: 200.
  // maxLength: 200 を 1 超える。
  it('POST /api/tasks rejects a title of 201 characters', async () => {
    const res = await api.request('/api/tasks', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ title: 'x'.repeat(201) }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toMatchObject([{ code: 'too_big', path: ['title'] }])
  })

  // A request body is already typed JSON, so nothing is coerced: the number 1 is not the string
  // "1".
  // リクエストボディは型付きの JSON であるため、coerce は行われない。
  // number の 1 は string の "1" ではない。
  it('POST /api/tasks rejects a title that is a number', async () => {
    const res = await api.request('/api/tasks', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ title: 1 }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toMatchObject([
      { code: 'invalid_type', path: ['title'] },
    ])
  })

  // The schema is not nullable.
  // スキーマは nullable ではない。
  it('POST /api/tasks rejects a title that is null', async () => {
    const res = await api.request('/api/tasks', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ title: null }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toMatchObject([
      { code: 'invalid_type', path: ['title'] },
    ])
  })

  // One above maxLength: 2000.
  // maxLength: 2000 を 1 超える。
  it('POST /api/tasks rejects a description of 2001 characters', async () => {
    const res = await api.request('/api/tasks', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ title: 'a', description: 'd'.repeat(2001) }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toMatchObject([
      { code: 'too_big', path: ['description'] },
    ])
  })

  // "nope" is not a member.
  // "nope" はメンバーではない。
  it('POST /api/tasks rejects a status outside the enum', async () => {
    const res = await api.request('/api/tasks', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ title: 'a', status: 'nope' }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toMatchObject([
      { code: 'invalid_value', path: ['status'] },
    ])
  })

  // The enum is case-sensitive.
  // enum は大文字小文字を区別する。
  it('POST /api/tasks rejects a status in upper case', async () => {
    const res = await api.request('/api/tasks', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ title: 'a', status: 'DONE' }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toMatchObject([
      { code: 'invalid_value', path: ['status'] },
    ])
  })

  // null is not the same as leaving the property out: the default does not apply.
  // null は、プロパティの省略とは異なる。デフォルトは適用されない。
  it('POST /api/tasks rejects a status that is null', async () => {
    const res = await api.request('/api/tasks', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ title: 'a', status: null }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toMatchObject([
      { code: 'invalid_value', path: ['status'] },
    ])
  })

  // One above maxItems: 10.
  // maxItems: 10 を 1 超える。
  it('POST /api/tasks rejects eleven tags', async () => {
    const res = await api.request('/api/tasks', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        title: 'a',
        tags: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toMatchObject([{ code: 'too_big', path: ['tags'] }])
  })

  // The issue path ends in the index of the element.
  // issue のパスは、要素のインデックスで終わる。
  it('POST /api/tasks rejects a tag that is a number', async () => {
    const res = await api.request('/api/tasks', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ title: 'a', tags: ['ok', 1] }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toMatchObject([
      { code: 'invalid_type', path: ['tags', 1] },
    ])
  })

  // Unlike a query parameter, a single value in a body is not wrapped into an array.
  // クエリパラメータと違い、ボディ内の単一値が配列に包まれることはない。
  it('POST /api/tasks rejects tags that are not an array', async () => {
    const res = await api.request('/api/tasks', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ title: 'a', tags: 'x' }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toMatchObject([{ code: 'invalid_type', path: ['tags'] }])
  })

  // Two invalid properties, two issues.
  // 不正なプロパティが2つあり、issue も2つ報告される。
  it('POST /api/tasks reports every property that fails', async () => {
    const res = await api.request('/api/tasks', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ title: '', status: 'nope' }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(JSON.parse(body.error.message)).toMatchObject([
      { code: 'too_small', path: ['title'] },
      { code: 'invalid_value', path: ['status'] },
    ])
  })

  // The body has to be an object.
  // ボディはオブジェクトでなければならない。
  it('POST /api/tasks rejects a body that is an array', async () => {
    const res = await api.request('/api/tasks', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '[]',
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toMatchObject([{ code: 'invalid_type', path: [] }])
  })

  // null is valid JSON, and not an object.
  // null は有効な JSON だが、オブジェクトではない。
  it('POST /api/tasks rejects a body that is null', async () => {
    const res = await api.request('/api/tasks', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: 'null',
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toMatchObject([{ code: 'invalid_type', path: [] }])
  })

  // A JSON string is not an object.
  // JSON の文字列は、オブジェクトではない。
  it('POST /api/tasks rejects a body that is a string', async () => {
    const res = await api.request('/api/tasks', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '"title"',
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toMatchObject([{ code: 'invalid_type', path: [] }])
  })

  // The body cannot be parsed at all, so the answer is plain text, not a validation error.
  // ボディがそもそもパースできないため、応答は検証エラーではなくプレーンテキストになる。
  it('POST /api/tasks rejects malformed JSON', async () => {
    const res = await api.request('/api/tasks', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{bad json',
    })
    expect(res.status).toBe(400)
    expect(await res.text()).toBe('Malformed JSON in request body')
  })

  // The body is required, and an empty one is not JSON.
  // ボディは必須であり、空のボディは JSON ではない。
  it('POST /api/tasks rejects an empty body', async () => {
    const res = await api.request('/api/tasks', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '',
    })
    expect(res.status).toBe(400)
    expect(await res.text()).toBe('Malformed JSON in request body')
  })

  // The spec declares application/json only, so text/plain is answered with 415.
  // 仕様が宣言しているのは application/json だけであるため、text/plain には 415 が返る。
  it('POST /api/tasks rejects a content type that is not JSON', async () => {
    const res = await api.request('/api/tasks', {
      method: 'POST',
      headers: { 'content-type': 'text/plain' },
      body: JSON.stringify({ title: 'a' }),
    })
    expect(res.status).toBe(415)
  })

  // A rejected request does not reach the handler.
  // 拒否されたリクエストは、ハンドラに到達しない。
  it('POST /api/tasks creates nothing when it rejects', async () => {
    const res = await api.request('/api/tasks', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ title: '' }),
    })
    expect(res.status).toBe(400)
    const list = await api.request('/api/tasks')
    expect(await list.json()).toStrictEqual({ tasks: [], total: 0 })
  })
})

// GET /tasks, with its query parameters limit, offset, cursor and status.
// GET /tasks と、そのクエリパラメータ limit・offset・cursor・status。
describe('list', () => {
  // One below the minimum of limit, 1.
  // limit の最小値 1 を 1 下回る。
  it('GET /api/tasks rejects limit=0', async () => {
    const res = await api.request('/api/tasks?limit=0')
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toMatchObject([{ code: 'too_small', path: ['limit'] }])
  })

  // One above the maximum of limit, 100.
  // limit の最大値 100 を 1 超える。
  it('GET /api/tasks rejects limit=101', async () => {
    const res = await api.request('/api/tasks?limit=101')
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toMatchObject([{ code: 'too_big', path: ['limit'] }])
  })

  // A fraction is not an integer.
  // 小数は整数ではない。
  it('GET /api/tasks rejects limit=1.5', async () => {
    const res = await api.request('/api/tasks?limit=1.5')
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toMatchObject([
      { code: 'invalid_type', path: ['limit'] },
    ])
  })

  // A word is not a number.
  // 単語は数値ではない。
  it('GET /api/tasks rejects limit=x', async () => {
    const res = await api.request('/api/tasks?limit=x')
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toMatchObject([
      { code: 'invalid_type', path: ['limit'] },
    ])
  })

  // An empty value is read as zero, which is below the minimum: the default of 20 does not
  // apply, because the parameter was sent.
  // 空の値は 0 として読まれ、最小値を下回る。パラメータ自体は送信されているため、
  // デフォルトの 20 は適用されない。
  it('GET /api/tasks rejects limit=', async () => {
    const res = await api.request('/api/tasks?limit=')
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toMatchObject([{ code: 'too_small', path: ['limit'] }])
  })

  // A scalar sent twice is an array on the wire, which a number rejects.
  // スカラーを2回送るとワイヤ上は配列になり、number として拒否される。
  it('GET /api/tasks rejects limit=1&limit=2', async () => {
    const res = await api.request('/api/tasks?limit=1&limit=2')
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toMatchObject([
      { code: 'invalid_type', path: ['limit'] },
    ])
  })

  // One below the minimum of offset, 0.
  // offset の最小値 0 を 1 下回る。
  it('GET /api/tasks rejects offset=-1', async () => {
    const res = await api.request('/api/tasks?offset=-1')
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toMatchObject([{ code: 'too_small', path: ['offset'] }])
  })

  // A word is not a number.
  // 単語は数値ではない。
  it('GET /api/tasks rejects offset=x', async () => {
    const res = await api.request('/api/tasks?offset=x')
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toMatchObject([
      { code: 'invalid_type', path: ['offset'] },
    ])
  })

  // One below the minimum of cursor, 0. The bound of an int64 is compared as a bigint.
  // cursor の最小値 0 を 1 下回る。int64 の境界値は bigint として比較される。
  it('GET /api/tasks rejects cursor=-1', async () => {
    const res = await api.request('/api/tasks?cursor=-1')
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toMatchObject([{ code: 'too_small', path: ['cursor'] }])
  })

  // A word cannot become a bigint.
  // 単語は bigint に変換できない。
  it('GET /api/tasks rejects cursor=x', async () => {
    const res = await api.request('/api/tasks?cursor=x')
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toMatchObject([
      { code: 'invalid_type', path: ['cursor'] },
    ])
  })

  // A fraction cannot become a bigint.
  // 小数は bigint に変換できない。
  it('GET /api/tasks rejects cursor=1.5', async () => {
    const res = await api.request('/api/tasks?cursor=1.5')
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toMatchObject([
      { code: 'invalid_type', path: ['cursor'] },
    ])
  })

  // One past the int64 maximum.
  // int64 の最大値を 1 超える。
  it('GET /api/tasks rejects cursor=9223372036854775808', async () => {
    const res = await api.request('/api/tasks?cursor=9223372036854775808')
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toMatchObject([{ code: 'too_big', path: ['cursor'] }])
  })

  // Outside the enum.
  // enum に含まれない値。
  it('GET /api/tasks rejects status=nope', async () => {
    const res = await api.request('/api/tasks?status=nope')
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toMatchObject([
      { code: 'invalid_value', path: ['status'] },
    ])
  })

  // The enum is case-sensitive.
  // enum は大文字小文字を区別する。
  it('GET /api/tasks rejects status=DONE', async () => {
    const res = await api.request('/api/tasks?status=DONE')
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toMatchObject([
      { code: 'invalid_value', path: ['status'] },
    ])
  })

  // The empty string is not a member.
  // 空文字列はメンバーではない。
  it('GET /api/tasks rejects status=', async () => {
    const res = await api.request('/api/tasks?status=')
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toMatchObject([
      { code: 'invalid_value', path: ['status'] },
    ])
  })

  // Three invalid parameters, three issues.
  // 不正なパラメータが3つあり、issue も3つ報告される。
  it('GET /api/tasks reports every query parameter that fails', async () => {
    const res = await api.request('/api/tasks?limit=0&offset=-1&cursor=x')
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(JSON.parse(body.error.message)).toMatchObject([
      { code: 'too_small', path: ['limit'] },
      { code: 'too_small', path: ['offset'] },
      { code: 'invalid_type', path: ['cursor'] },
    ])
  })
})

// GET /tasks/{taskId}.
// GET /tasks/{taskId}。
describe('read', () => {
  // The 404 is the one the spec declares, with its Error body, not the one of the router.
  // この 404 は仕様で宣言されたものであり、ルーターの 404 ではなく、Error 型のボディを伴う。
  it('GET /api/tasks/:taskId answers 404 for a task that does not exist', async () => {
    const res = await api.request('/api/tasks/999')
    expect(res.status).toBe(404)
    expect(await res.json()).toStrictEqual({ message: 'Task not found' })
  })

  // taskId is a string in the spec, so any text is a valid parameter; it just names no task.
  // taskId は仕様上 string であるため、どんな文字列も有効なパラメータである。
  // 単に該当するタスクがないだけである。
  it('GET /api/tasks/:taskId answers 404 for an id that is not a number', async () => {
    const res = await api.request('/api/tasks/abc')
    expect(res.status).toBe(404)
    expect(await res.json()).toStrictEqual({ message: 'Task not found' })
  })

  // Once deleted, the task is gone.
  // 削除されたタスクは、もう存在しない。
  it('GET /api/tasks/:taskId answers 404 for a deleted task', async () => {
    await api.request('/api/tasks', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ title: 'a' }),
    })
    await api.request('/api/tasks/1', { method: 'DELETE' })
    const res = await api.request('/api/tasks/1')
    expect(res.status).toBe(404)
    expect(await res.json()).toStrictEqual({ message: 'Task not found' })
  })
})

// PUT /tasks/{taskId}.
// PUT /tasks/{taskId}。
describe('update', () => {
  // The body is valid; the task is missing.
  // ボディは有効だが、タスクが存在しない。
  it('PUT /api/tasks/:taskId answers 404 for a task that does not exist', async () => {
    const res = await api.request('/api/tasks/999', {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ title: 'x' }),
    })
    expect(res.status).toBe(404)
    expect(await res.json()).toStrictEqual({ message: 'Task not found' })
  })

  // title is optional in UpdateTask, but when sent it still has minLength: 1.
  // UpdateTask の title は任意だが、送信された場合は minLength: 1 が適用される。
  it('PUT /api/tasks/:taskId rejects an empty title', async () => {
    await api.request('/api/tasks', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ title: 'a' }),
    })
    const res = await api.request('/api/tasks/1', {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ title: '' }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toMatchObject([{ code: 'too_small', path: ['title'] }])
  })

  // "nope" is not a member.
  // "nope" はメンバーではない。
  it('PUT /api/tasks/:taskId rejects a status outside the enum', async () => {
    await api.request('/api/tasks', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ title: 'a' }),
    })
    const res = await api.request('/api/tasks/1', {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ status: 'nope' }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toMatchObject([
      { code: 'invalid_value', path: ['status'] },
    ])
  })

  // One above maxItems: 10.
  // maxItems: 10 を 1 超える。
  it('PUT /api/tasks/:taskId rejects eleven tags', async () => {
    await api.request('/api/tasks', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ title: 'a' }),
    })
    const res = await api.request('/api/tasks/1', {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ tags: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'] }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toMatchObject([{ code: 'too_big', path: ['tags'] }])
  })

  // An invalid body for a task that does not exist is answered with 400, not 404: validation
  // runs before the handler.
  // 存在しないタスクに対する不正なボディには、404 ではなく 400 が返る。
  // 検証はハンドラより前に行われる。
  it('PUT /api/tasks/:taskId validates the body before it looks for the task', async () => {
    const res = await api.request('/api/tasks/999', {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ title: '' }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toMatchObject([{ code: 'too_small', path: ['title'] }])
  })

  // The body cannot be parsed at all.
  // ボディがそもそもパースできない。
  it('PUT /api/tasks/:taskId rejects malformed JSON', async () => {
    await api.request('/api/tasks', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ title: 'a' }),
    })
    const res = await api.request('/api/tasks/1', {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: '{bad',
    })
    expect(res.status).toBe(400)
    expect(await res.text()).toBe('Malformed JSON in request body')
  })

  // A rejected update leaves the task as it was, with no updatedAt.
  // 拒否された更新は、タスクを元のまま残す。updatedAt も設定されない。
  it('PUT /api/tasks/:taskId changes nothing when it rejects', async () => {
    await api.request('/api/tasks', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ title: 'a' }),
    })
    const res = await api.request('/api/tasks/1', {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ title: '' }),
    })
    expect(res.status).toBe(400)
    const after = await api.request('/api/tasks/1')
    expect(await after.json()).toStrictEqual({
      id: '1',
      title: 'a',
      status: 'pending',
      createdAt: NOW,
    })
  })
})

// DELETE /tasks/{taskId}.
// DELETE /tasks/{taskId}。
describe('delete', () => {
  // Nothing to delete.
  // 削除対象がない。
  it('DELETE /api/tasks/:taskId answers 404 for a task that does not exist', async () => {
    const res = await api.request('/api/tasks/999', { method: 'DELETE' })
    expect(res.status).toBe(404)
    expect(await res.json()).toStrictEqual({ message: 'Task not found' })
  })

  // Deleting is not idempotent in its answer: the first call answers 204, the second 404.
  // 削除の応答は冪等ではない。1回目は 204、2回目は 404 が返る。
  it('DELETE /api/tasks/:taskId answers 404 the second time', async () => {
    await api.request('/api/tasks', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ title: 'a' }),
    })
    const first = await api.request('/api/tasks/1', { method: 'DELETE' })
    expect(first.status).toBe(204)
    const res = await api.request('/api/tasks/1', { method: 'DELETE' })
    expect(res.status).toBe(404)
    expect(await res.json()).toStrictEqual({ message: 'Task not found' })
  })
})

// Requests that match no route. The answer is the plain 404 of the router, not the JSON one
// the spec declares.
// どのルートにも一致しないリクエスト。応答は、仕様で宣言された JSON の 404 ではなく、
// ルーターのプレーンな 404 になる。
describe('routing', () => {
  // The spec path "/" without the base path.
  // ベースパスなしの、仕様上のパス "/"。
  it('GET / is not routed', async () => {
    const res = await api.request('/', { method: 'GET' })
    expect(res.status).toBe(404)
    expect(await res.text()).toBe('404 Not Found')
  })

  // A route without the base path.
  // ベースパスなしのルート。
  it('GET /tasks is not routed', async () => {
    const res = await api.request('/tasks', { method: 'GET' })
    expect(res.status).toBe(404)
    expect(await res.text()).toBe('404 Not Found')
  })

  // The base path with a trailing slash.
  // 末尾にスラッシュを付けたベースパス。
  it('GET /api/ is not routed', async () => {
    const res = await api.request('/api/', { method: 'GET' })
    expect(res.status).toBe(404)
    expect(await res.text()).toBe('404 Not Found')
  })

  // A trailing slash makes it a different path.
  // 末尾のスラッシュがあると別のパスになる。
  it('GET /api/tasks/ is not routed', async () => {
    const res = await api.request('/api/tasks/', { method: 'GET' })
    expect(res.status).toBe(404)
    expect(await res.text()).toBe('404 Not Found')
  })

  // A trailing slash after the parameter.
  // パラメータの後ろにスラッシュがある。
  it('GET /api/tasks/1/ is not routed', async () => {
    const res = await api.request('/api/tasks/1/', { method: 'GET' })
    expect(res.status).toBe(404)
    expect(await res.text()).toBe('404 Not Found')
  })

  // The spec declares GET, PUT and DELETE for the path, not PATCH.
  // このパスに対して仕様が宣言しているのは GET・PUT・DELETE であり、PATCH は含まれない。
  it('PATCH /api/tasks/1 is not routed', async () => {
    const res = await api.request('/api/tasks/1', { method: 'PATCH' })
    expect(res.status).toBe(404)
    expect(await res.text()).toBe('404 Not Found')
  })

  // The spec declares GET and POST for the path, not DELETE.
  // このパスに対して仕様が宣言しているのは GET と POST であり、DELETE は含まれない。
  it('DELETE /api/tasks is not routed', async () => {
    const res = await api.request('/api/tasks', { method: 'DELETE' })
    expect(res.status).toBe(404)
    expect(await res.text()).toBe('404 Not Found')
  })

  // The spec declares GET only for the root.
  // ルートパスに対して仕様が宣言しているのは GET だけである。
  it('POST /api is not routed', async () => {
    const res = await api.request('/api', { method: 'POST' })
    expect(res.status).toBe(404)
    expect(await res.text()).toBe('404 Not Found')
  })
})
