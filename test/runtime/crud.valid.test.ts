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
// This file holds the requests that are accepted. They go through hono/testing's
// `testClient`, the typed client, wherever the types allow the request to be written.
// このファイルには、受理されるリクエストをまとめている。型の上で記述できるリクエストは、
// 型付きクライアントである hono/testing の `testClient` 経由で送信する。
import { testClient } from 'hono/testing'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vite-plus/test'

import { api } from '../__generated__/crud/src/index'
import { resetTasks } from '../__generated__/crud/src/store'

const client = testClient(api)

const NOW = '2026-01-02T03:04:05.000Z'

beforeEach(() => {
  vi.useFakeTimers()
  vi.setSystemTime(new Date(NOW))
  resetTasks()
})

afterEach(() => {
  vi.useRealTimers()
})

/**
 * Creates a task through the API, as the setup of a test about something else.
 * API 経由でタスクを作成する。別の事柄を検証するテストの前準備として使う。
 */
async function create(json: {
  title: string
  description?: string
  status?: 'pending' | 'in_progress' | 'done'
  tags?: string[]
}) {
  const res = await client.api.tasks.$post({ json })
  expect(res.status).toBe(201)
}

// GET /.
// GET /。
describe('health check', () => {
  // The root route of the spec, "/", is served at the base path itself.
  // 仕様のルートパス "/" は、ベースパスそのもので提供される。
  it('GET /api answers the health check', async () => {
    const res = await client.api.$get()
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ message: 'Crude CRUD API is running' })
  })
})

// POST /tasks.
// POST /tasks。
describe('create', () => {
  // title is the only required property. status is not sent, so its default, pending, applies.
  // 必須プロパティは title だけである。status は送信していないため、
  // デフォルトの pending が適用される。
  it('POST /api/tasks creates a task from a title alone', async () => {
    const res = await client.api.tasks.$post({ json: { title: 'first' } })
    expect(res.status).toBe(201)
    expect(await res.json()).toStrictEqual({
      id: '1',
      title: 'first',
      status: 'pending',
      createdAt: NOW,
    })
  })

  // Every optional property is kept as sent.
  // 任意プロパティは、すべて送信したとおりに保持される。
  it('POST /api/tasks creates a task with every property', async () => {
    const res = await client.api.tasks.$post({
      json: { title: 'full', description: 'd', status: 'done', tags: ['x', 'y'] },
    })
    expect(res.status).toBe(201)
    expect(await res.json()).toStrictEqual({
      id: '1',
      title: 'full',
      description: 'd',
      status: 'done',
      tags: ['x', 'y'],
      createdAt: NOW,
    })
  })

  // The second task of a test gets the id "2".
  // テスト内で2番目に作成したタスクの id は "2" になる。
  it('POST /api/tasks numbers tasks in the order they are created', async () => {
    await create({ title: 'first' })
    const res = await client.api.tasks.$post({ json: { title: 'second' } })
    expect(res.status).toBe(201)
    expect(await res.json()).toStrictEqual({
      id: '2',
      title: 'second',
      status: 'pending',
      createdAt: NOW,
    })
  })

  // The JSON body is UTF-8: Japanese text and an emoji come back unchanged.
  // JSON ボディは UTF-8 である。日本語や絵文字も、変化せずに返ってくる。
  it('POST /api/tasks keeps multi-byte text', async () => {
    const res = await client.api.tasks.$post({ json: { title: 'タスク 🔥' } })
    expect(res.status).toBe(201)
    expect(await res.json()).toStrictEqual({
      id: '1',
      title: 'タスク 🔥',
      status: 'pending',
      createdAt: NOW,
    })
  })

  // Exactly maxLength: 200.
  // ちょうど maxLength: 200 の長さ。
  it('POST /api/tasks accepts a title of 200 characters', async () => {
    const title = 'x'.repeat(200)
    const res = await client.api.tasks.$post({ json: { title } })
    expect(res.status).toBe(201)
    expect(await res.json()).toStrictEqual({ id: '1', title, status: 'pending', createdAt: NOW })
  })

  // Exactly minLength: 1.
  // ちょうど minLength: 1 の長さ。
  it('POST /api/tasks accepts a title of one character', async () => {
    const res = await client.api.tasks.$post({ json: { title: 'x' } })
    expect(res.status).toBe(201)
    expect(await res.json()).toStrictEqual({
      id: '1',
      title: 'x',
      status: 'pending',
      createdAt: NOW,
    })
  })

  // Exactly maxLength: 2000.
  // ちょうど maxLength: 2000 の長さ。
  it('POST /api/tasks accepts a description of 2000 characters', async () => {
    const description = 'd'.repeat(2000)
    const res = await client.api.tasks.$post({ json: { title: 'a', description } })
    expect(res.status).toBe(201)
    expect(await res.json()).toStrictEqual({
      id: '1',
      title: 'a',
      description,
      status: 'pending',
      createdAt: NOW,
    })
  })

  // Exactly maxItems: 10.
  // ちょうど maxItems: 10 の要素数。
  it('POST /api/tasks accepts ten tags', async () => {
    const tags = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    const res = await client.api.tasks.$post({ json: { title: 'a', tags } })
    expect(res.status).toBe(201)
    expect(await res.json()).toStrictEqual({
      id: '1',
      title: 'a',
      status: 'pending',
      tags,
      createdAt: NOW,
    })
  })

  // An empty array is a value, not an absence: it is kept.
  // 空配列は値であって欠落ではない。そのまま保持される。
  it('POST /api/tasks accepts an empty list of tags', async () => {
    const res = await client.api.tasks.$post({ json: { title: 'a', tags: [] } })
    expect(res.status).toBe(201)
    expect(await res.json()).toStrictEqual({
      id: '1',
      title: 'a',
      status: 'pending',
      tags: [],
      createdAt: NOW,
    })
  })

  // Every member of the enum.
  // enum のすべてのメンバー。
  it('POST /api/tasks accepts each status', async () => {
    const pending = await client.api.tasks.$post({ json: { title: 'a', status: 'pending' } })
    expect(await pending.json()).toStrictEqual({
      id: '1',
      title: 'a',
      status: 'pending',
      createdAt: NOW,
    })
    const inProgress = await client.api.tasks.$post({
      json: { title: 'b', status: 'in_progress' },
    })
    expect(await inProgress.json()).toStrictEqual({
      id: '2',
      title: 'b',
      status: 'in_progress',
      createdAt: NOW,
    })
    const done = await client.api.tasks.$post({ json: { title: 'c', status: 'done' } })
    expect(await done.json()).toStrictEqual({ id: '3', title: 'c', status: 'done', createdAt: NOW })
  })

  // An unknown property is stripped by the schema, and a client cannot choose the id: the task
  // is created as "1", not as "zzz".
  // 未知のプロパティはスキーマによって取り除かれる。クライアントが id を指定することもできず、
  // タスクは "zzz" ではなく "1" として作成される。
  it('POST /api/tasks drops a property the spec does not declare', async () => {
    const res = await api.request('/api/tasks', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ title: 'a', extra: 1, id: 'zzz' }),
    })
    expect(res.status).toBe(201)
    expect(await res.json()).toStrictEqual({
      id: '1',
      title: 'a',
      status: 'pending',
      createdAt: NOW,
    })
  })

  // "application/json; charset=utf-8" is JSON.
  // "application/json; charset=utf-8" も JSON である。
  it('POST /api/tasks accepts a content type with a charset', async () => {
    const res = await api.request('/api/tasks', {
      method: 'POST',
      headers: { 'content-type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ title: 'a' }),
    })
    expect(res.status).toBe(201)
    expect(await res.json()).toStrictEqual({
      id: '1',
      title: 'a',
      status: 'pending',
      createdAt: NOW,
    })
  })
})

// GET /tasks, with its query parameters limit, offset, cursor and status.
// GET /tasks と、そのクエリパラメータ limit・offset・cursor・status。
describe('list', () => {
  // total is zero, and tasks is an empty array rather than absent.
  // total は 0 になり、tasks は省略されず空配列になる。
  it('GET /api/tasks answers an empty list when there is no task', async () => {
    const res = await client.api.tasks.$get({ query: {} })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ tasks: [], total: 0 })
  })

  // No query parameter is sent, so the defaults limit: 20 and offset: 0 apply.
  // クエリパラメータを送信していないため、デフォルトの limit: 20・offset: 0 が適用される。
  it('GET /api/tasks lists the tasks in the order they were created', async () => {
    await create({ title: 'a' })
    await create({ title: 'b' })
    const res = await client.api.tasks.$get({ query: {} })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      tasks: [
        { id: '1', title: 'a', status: 'pending', createdAt: NOW },
        { id: '2', title: 'b', status: 'pending', createdAt: NOW },
      ],
      total: 2,
    })
  })

  // total counts the tasks that match the filter, not all tasks.
  // total は、全タスクではなく、フィルターに一致したタスクの件数である。
  it('GET /api/tasks filters by status', async () => {
    await create({ title: 'a', status: 'pending' })
    await create({ title: 'b', status: 'done' })
    await create({ title: 'c', status: 'done' })
    const res = await client.api.tasks.$get({ query: { status: 'done' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      tasks: [
        { id: '2', title: 'b', status: 'done', createdAt: NOW },
        { id: '3', title: 'c', status: 'done', createdAt: NOW },
      ],
      total: 2,
    })
  })

  // A filter that matches nothing is not an error.
  // 一致するタスクがないフィルターは、エラーではない。
  it('GET /api/tasks answers an empty list when no task matches the status', async () => {
    await create({ title: 'a' })
    const res = await client.api.tasks.$get({ query: { status: 'in_progress' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ tasks: [], total: 0 })
  })

  // limit arrives in the handler as the number 1, its minimum. total still counts every task.
  // limit は、最小値である number の 1 としてハンドラに届く。total は引き続き全件数を表す。
  it('GET /api/tasks with limit=1 answers the first task only', async () => {
    await create({ title: 'a' })
    await create({ title: 'b' })
    await create({ title: 'c' })
    const res = await client.api.tasks.$get({ query: { limit: '1' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      tasks: [{ id: '1', title: 'a', status: 'pending', createdAt: NOW }],
      total: 3,
    })
  })

  // 100 is the maximum of limit.
  // 100 は limit の最大値である。
  it('GET /api/tasks with limit=100 is accepted', async () => {
    await create({ title: 'a' })
    const res = await client.api.tasks.$get({ query: { limit: '100' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      tasks: [{ id: '1', title: 'a', status: 'pending', createdAt: NOW }],
      total: 1,
    })
  })

  // offset arrives as a number: as the text "1" it would have been concatenated, not added.
  // offset は number として届く。文字列の "1" のままであれば、
  // 加算ではなく文字列連結になってしまう。
  it('GET /api/tasks with offset=1 skips the first task', async () => {
    await create({ title: 'a' })
    await create({ title: 'b' })
    await create({ title: 'c' })
    const res = await client.api.tasks.$get({ query: { offset: '1' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      tasks: [
        { id: '2', title: 'b', status: 'pending', createdAt: NOW },
        { id: '3', title: 'c', status: 'pending', createdAt: NOW },
      ],
      total: 3,
    })
  })

  // Zero is the minimum of offset, and a value, not an absence.
  // 0 は offset の最小値であり、欠落ではなく値である。
  it('GET /api/tasks with offset=0 skips nothing', async () => {
    await create({ title: 'a' })
    const res = await client.api.tasks.$get({ query: { offset: '0' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      tasks: [{ id: '1', title: 'a', status: 'pending', createdAt: NOW }],
      total: 1,
    })
  })

  // offset has no maximum. total is unchanged.
  // offset に最大値はない。total は変わらない。
  it('GET /api/tasks with an offset past the end answers an empty page', async () => {
    await create({ title: 'a' })
    const res = await client.api.tasks.$get({ query: { offset: '999' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ tasks: [], total: 1 })
  })

  // limit=1 and offset=1 select the second of three tasks.
  // limit=1 と offset=1 により、3件のうち2番目のタスクが選ばれる。
  it('GET /api/tasks with limit and offset answers the page between', async () => {
    await create({ title: 'a' })
    await create({ title: 'b' })
    await create({ title: 'c' })
    const res = await client.api.tasks.$get({ query: { limit: '1', offset: '1' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      tasks: [{ id: '2', title: 'b', status: 'pending', createdAt: NOW }],
      total: 3,
    })
  })

  // cursor is an int64 and arrives as the bigint 0n, its minimum. Every id is greater.
  // cursor は int64 であり、最小値である bigint の 0n として届く。
  // すべての id がこれより大きい。
  it('GET /api/tasks with cursor=0 answers every task', async () => {
    await create({ title: 'a' })
    await create({ title: 'b' })
    const res = await client.api.tasks.$get({ query: { cursor: '0' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      tasks: [
        { id: '1', title: 'a', status: 'pending', createdAt: NOW },
        { id: '2', title: 'b', status: 'pending', createdAt: NOW },
      ],
      total: 2,
    })
  })

  // Only the tasks whose id is greater than the cursor. The handler compares bigints, which it
  // can only do because the cursor arrived as one.
  // id が cursor より大きいタスクだけが返る。ハンドラは bigint 同士を比較しており、
  // それは cursor が bigint として届いているからこそ可能である。
  it('GET /api/tasks with a cursor answers the tasks after it', async () => {
    await create({ title: 'a' })
    await create({ title: 'b' })
    await create({ title: 'c' })
    const res = await client.api.tasks.$get({ query: { cursor: '1' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      tasks: [
        { id: '2', title: 'b', status: 'pending', createdAt: NOW },
        { id: '3', title: 'c', status: 'pending', createdAt: NOW },
      ],
      total: 2,
    })
  })

  // 9007199254740993 is 2^53 + 1. As a number it would round to 2^53; as a bigint it is exact,
  // and greater than every id.
  // 9007199254740993 は 2^53 + 1 である。number では 2^53 に丸められるが、
  // bigint なら正確に保持され、すべての id より大きい。
  it('GET /api/tasks with a cursor past Number.MAX_SAFE_INTEGER is exact', async () => {
    await create({ title: 'a' })
    const res = await client.api.tasks.$get({ query: { cursor: '9007199254740993' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ tasks: [], total: 0 })
  })

  // 9223372036854775807 is 2^63 - 1.
  // 9223372036854775807 は 2^63 - 1 である。
  it('GET /api/tasks with the largest int64 cursor is accepted', async () => {
    await create({ title: 'a' })
    const res = await client.api.tasks.$get({ query: { cursor: '9223372036854775807' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ tasks: [], total: 0 })
  })

  // status, cursor, offset and limit together: of the pending tasks after id 1, skip one and
  // take one.
  // status・cursor・offset・limit をすべて同時に指定する。id 1 より後の pending タスクのうち、
  // 1件を飛ばして1件を取得する。
  it('GET /api/tasks combines every query parameter', async () => {
    await create({ title: 'a', status: 'pending' })
    await create({ title: 'b', status: 'pending' })
    await create({ title: 'c', status: 'done' })
    await create({ title: 'd', status: 'pending' })
    const res = await client.api.tasks.$get({
      query: { status: 'pending', cursor: '1', offset: '1', limit: '1' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      tasks: [{ id: '4', title: 'd', status: 'pending', createdAt: NOW }],
      total: 2,
    })
  })

  // An undeclared parameter is neither rejected nor passed on.
  // 宣言されていないパラメータは、拒否もされず、ハンドラにも渡されない。
  it('GET /api/tasks ignores a query parameter the spec does not declare', async () => {
    await create({ title: 'a' })
    const res = await api.request('/api/tasks?unknown=1')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      tasks: [{ id: '1', title: 'a', status: 'pending', createdAt: NOW }],
      total: 1,
    })
  })
})

// GET /tasks/{taskId}.
// GET /tasks/{taskId}。
describe('read', () => {
  // taskId is declared through a $ref to #/components/parameters/TaskId.
  // taskId は #/components/parameters/TaskId への $ref で宣言されている。
  it('GET /api/tasks/:taskId answers the task', async () => {
    await create({ title: 'a', tags: ['t'] })
    const res = await client.api.tasks[':taskId'].$get({ param: { taskId: '1' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      id: '1',
      title: 'a',
      status: 'pending',
      tags: ['t'],
      createdAt: NOW,
    })
  })
})

// PUT /tasks/{taskId}.
// PUT /tasks/{taskId}。
describe('update', () => {
  // Only status changes. title is kept, and updatedAt is set.
  // 変わるのは status だけである。title は保持され、updatedAt が設定される。
  it('PUT /api/tasks/:taskId changes the property that is sent', async () => {
    await create({ title: 'a' })
    const res = await client.api.tasks[':taskId'].$put({
      param: { taskId: '1' },
      json: { status: 'done' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      id: '1',
      title: 'a',
      status: 'done',
      createdAt: NOW,
      updatedAt: NOW,
    })
  })

  // Every property of UpdateTask is optional, and all of them may be sent.
  // UpdateTask のプロパティはすべて任意であり、すべてを同時に送信することもできる。
  it('PUT /api/tasks/:taskId changes every property at once', async () => {
    await create({ title: 'a' })
    const res = await client.api.tasks[':taskId'].$put({
      param: { taskId: '1' },
      json: { title: 'new', description: 'd', status: 'in_progress', tags: ['t'] },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      id: '1',
      title: 'new',
      description: 'd',
      status: 'in_progress',
      tags: ['t'],
      createdAt: NOW,
      updatedAt: NOW,
    })
  })

  // No property is required, so {} is valid. Nothing changes but updatedAt.
  // 必須プロパティがないため、{} は有効である。updatedAt 以外は何も変わらない。
  it('PUT /api/tasks/:taskId accepts an empty object', async () => {
    await create({ title: 'a' })
    const res = await client.api.tasks[':taskId'].$put({ param: { taskId: '1' }, json: {} })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      id: '1',
      title: 'a',
      status: 'pending',
      createdAt: NOW,
      updatedAt: NOW,
    })
  })

  // An empty array is a value: it replaces the tags rather than leaving them.
  // 空配列は値である。タグはそのまま残るのではなく、空配列で置き換えられる。
  it('PUT /api/tasks/:taskId replaces the tags with an empty list', async () => {
    await create({ title: 'a', tags: ['t'] })
    const res = await client.api.tasks[':taskId'].$put({
      param: { taskId: '1' },
      json: { tags: [] },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      id: '1',
      title: 'a',
      status: 'pending',
      tags: [],
      createdAt: NOW,
      updatedAt: NOW,
    })
  })

  // The update is stored, not just echoed.
  // 更新内容は、応答として返るだけでなく、保存されている。
  it('PUT /api/tasks/:taskId is visible to the next GET', async () => {
    await create({ title: 'a' })
    await client.api.tasks[':taskId'].$put({ param: { taskId: '1' }, json: { title: 'new' } })
    const res = await client.api.tasks[':taskId'].$get({ param: { taskId: '1' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      id: '1',
      title: 'new',
      status: 'pending',
      createdAt: NOW,
      updatedAt: NOW,
    })
  })
})

// DELETE /tasks/{taskId}.
// DELETE /tasks/{taskId}。
describe('delete', () => {
  // 204 carries no content.
  // 204 はボディを持たない。
  it('DELETE /api/tasks/:taskId answers 204 with no body', async () => {
    await create({ title: 'a' })
    const res = await client.api.tasks[':taskId'].$delete({ param: { taskId: '1' } })
    expect(res.status).toBe(204)
    expect(await res.text()).toBe('')
  })

  // The other task stays.
  // もう一方のタスクは残る。
  it('DELETE /api/tasks/:taskId removes the task from the list', async () => {
    await create({ title: 'a' })
    await create({ title: 'b' })
    await client.api.tasks[':taskId'].$delete({ param: { taskId: '1' } })
    const res = await client.api.tasks.$get({ query: {} })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      tasks: [{ id: '2', title: 'b', status: 'pending', createdAt: NOW }],
      total: 1,
    })
  })
})
