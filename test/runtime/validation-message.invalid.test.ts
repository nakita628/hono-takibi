// Three ways an application can answer a validation failure of a generated route
// (cases/validation-message, generated from specs/validation-message.yaml with no custom
// message), one host each in hosts/validation-message-app-*.ts:
//
//   pattern 1  no hook            400 with the raw ZodError
//   pattern 2  `defaultHook`      422 with RFC 9457 Problem Details, for every route
//   pattern 3  per-route hook     422 with RFC 9457 Problem Details, for that route
//
// The three hosts register the same generated route, so whatever differs between them is
// the hook and nothing else.
//
// 生成されたルートの検証失敗に対して、アプリケーションが応答する3つの方法を検証する
// (cases/validation-message。specs/validation-message.yaml から、カスタムメッセージなしで
// 生成)。方法ごとに、hosts/validation-message-app-*.ts のホストを1つ用意している。
//
//   パターン 1  フックなし          400 と生の ZodError
//   パターン 2  `defaultHook`       422 と RFC 9457 の Problem Details(全ルート共通)
//   パターン 3  ルート単位のフック   422 と RFC 9457 の Problem Details(そのルートのみ)
//
// 3つのホストは同じ生成ルートを登録しているため、ホスト間の違いはフックだけである。
//
// This file holds the requests that are rejected.
// このファイルには、拒否されるリクエストをまとめている。
import { describe, expect, it } from 'vite-plus/test'

import appDefault from '../hosts/validation-message-app-default'
import appDefaultHook from '../hosts/validation-message-app-default-hook'
import appRouteHook from '../hosts/validation-message-app-route-hook'

type ZodFailure = { success: boolean; error: { name: string; message: string } }

// The app has no hook. @hono/zod-openapi answers a validation failure itself. The answer is
// 400 with { success: false, error: { name: "ZodError", message } }, where message is the
// JSON of the issues. The tests assert the code and the path of every issue, not the wording
// of its message, which belongs to Zod.
// アプリにフックはない。検証の失敗には @hono/zod-openapi 自身が応答する。
// 応答は 400 と { success: false, error: { name: "ZodError", message } } であり、
// message は issue の JSON 文字列である。テストでは各 issue の code と path を検証する。
// メッセージの文言は Zod に属するものなので、検証しない。
describe('pattern 1: no hook', () => {
  // One below minLength: 3.
  // minLength: 3 を 1 下回る。
  it('rejects a name of 2 characters', async () => {
    const res = await appDefault.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'ab', email: 'taro@example.com', age: 20 }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toMatchObject([{ code: 'too_small', path: ['name'] }])
  })

  // One above maxLength: 20.
  // maxLength: 20 を 1 超える。
  it('rejects a name of 21 characters', async () => {
    const res = await appDefault.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'a'.repeat(21), email: 'taro@example.com', age: 20 }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toMatchObject([{ code: 'too_big', path: ['name'] }])
  })

  // The empty string is present, and too short.
  // 空文字列は値として存在するが、短すぎる。
  it('rejects an empty name', async () => {
    const res = await appDefault.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: '', email: 'taro@example.com', age: 20 }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toMatchObject([{ code: 'too_small', path: ['name'] }])
  })

  // A request body is typed JSON, so nothing is coerced: the number 123 is not a string.
  // リクエストボディは型付きの JSON であるため、coerce は行われない。
  // number の 123 は string ではない。
  it('rejects a name that is a number', async () => {
    const res = await appDefault.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 123, email: 'taro@example.com', age: 20 }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toMatchObject([{ code: 'invalid_type', path: ['name'] }])
  })

  // null is a value of the wrong type, not a missing one.
  // null は欠落ではなく、型の誤った値である。
  it('rejects a name that is null', async () => {
    const res = await appDefault.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: null, email: 'taro@example.com', age: 20 }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toMatchObject([{ code: 'invalid_type', path: ['name'] }])
  })

  // name is required.
  // name は必須である。
  it('rejects a body with no name', async () => {
    const res = await appDefault.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'taro@example.com', age: 20 }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toMatchObject([{ code: 'invalid_type', path: ['name'] }])
  })

  // format: email.
  // format: email の検証。
  it('rejects an invalid email', async () => {
    const res = await appDefault.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'taro', email: 'bad', age: 20 }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toMatchObject([
      { code: 'invalid_format', path: ['email'] },
    ])
  })

  // The empty string is not an email address.
  // 空文字列はメールアドレスではない。
  it('rejects an empty email', async () => {
    const res = await appDefault.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'taro', email: '', age: 20 }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toMatchObject([
      { code: 'invalid_format', path: ['email'] },
    ])
  })

  // email is required.
  // email は必須である。
  it('rejects a body with no email', async () => {
    const res = await appDefault.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'taro', age: 20 }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toMatchObject([
      { code: 'invalid_type', path: ['email'] },
    ])
  })

  // One below minimum: 0.
  // minimum: 0 を 1 下回る。
  it('rejects an age of -1', async () => {
    const res = await appDefault.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'taro', email: 'taro@example.com', age: -1 }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toMatchObject([{ code: 'too_small', path: ['age'] }])
  })

  // One above maximum: 150.
  // maximum: 150 を 1 超える。
  it('rejects an age of 151', async () => {
    const res = await appDefault.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'taro', email: 'taro@example.com', age: 151 }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toMatchObject([{ code: 'too_big', path: ['age'] }])
  })

  // In range, and not an integer.
  // 範囲内だが整数ではない。
  it('rejects an age that is a fraction', async () => {
    const res = await appDefault.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'taro', email: 'taro@example.com', age: 1.5 }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toMatchObject([{ code: 'invalid_type', path: ['age'] }])
  })

  // Unlike a query parameter, a value in a body is not coerced: the string "20" is not a
  // number.
  // クエリパラメータと違い、ボディ内の値は coerce されない。文字列の "20" は number ではない。
  it('rejects an age that is a string', async () => {
    const res = await appDefault.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'taro', email: 'taro@example.com', age: '20' }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toMatchObject([{ code: 'invalid_type', path: ['age'] }])
  })

  // age is required.
  // age は必須である。
  it('rejects a body with no age', async () => {
    const res = await appDefault.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'taro', email: 'taro@example.com' }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toMatchObject([{ code: 'invalid_type', path: ['age'] }])
  })

  // Three invalid properties, three issues, in the order the schema declares them.
  // 不正なプロパティが3つあり、issue も3つ、スキーマの宣言順に報告される。
  it('reports every property that fails', async () => {
    const res = await appDefault.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'ab', email: 'bad', age: -1 }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toMatchObject([
      { code: 'too_small', path: ['name'] },
      { code: 'invalid_format', path: ['email'] },
      { code: 'too_small', path: ['age'] },
    ])
  })

  // All three properties are required.
  // 3つのプロパティはすべて必須である。
  it('reports every required property of an empty object', async () => {
    const res = await appDefault.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toMatchObject([
      { code: 'invalid_type', path: ['name'] },
      { code: 'invalid_type', path: ['email'] },
      { code: 'invalid_type', path: ['age'] },
    ])
  })

  // The body has to be an object. The issue has an empty path, the body itself.
  // ボディはオブジェクトでなければならない。issue のパスは空であり、ボディそのものを指す。
  it('rejects a body that is an array', async () => {
    const res = await appDefault.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([]),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toMatchObject([{ code: 'invalid_type', path: [] }])
  })

  // null is valid JSON, and not an object.
  // null は有効な JSON だが、オブジェクトではない。
  it('rejects a body that is null', async () => {
    const res = await appDefault.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(null),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toMatchObject([{ code: 'invalid_type', path: [] }])
  })

  // The body cannot be parsed, so validation never starts and no hook runs: the answer is the
  // plain 400 of Hono, whichever pattern the app uses.
  // ボディがパースできないため、検証は開始されず、フックも実行されない。
  // アプリがどのパターンを使っていても、応答は Hono のプレーンな 400 になる。
  it('rejects malformed JSON', async () => {
    const res = await appDefault.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{bad',
    })
    expect(res.status).toBe(400)
    expect(await res.text()).toBe('Malformed JSON in request body')
  })

  // The body is required, and an empty one is not JSON.
  // ボディは必須であり、空のボディは JSON ではない。
  it('rejects an empty body', async () => {
    const res = await appDefault.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '',
    })
    expect(res.status).toBe(400)
    expect(await res.text()).toBe('Malformed JSON in request body')
  })

  // The spec declares application/json only, so text/plain is answered with 415, before any
  // validation.
  // 仕様が宣言しているのは application/json だけであるため、
  // text/plain には検証より前に 415 が返る。
  it('rejects a content type that is not JSON', async () => {
    const res = await appDefault.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({ name: 'taro', email: 'taro@example.com', age: 20 }),
    })
    expect(res.status).toBe(415)
  })

  // /users declares POST only.
  // /users が宣言しているのは POST だけである。
  it('does not route a method the spec does not declare', async () => {
    const res = await appDefault.request('/users')
    expect(res.status).toBe(404)
  })
})

// The app has a defaultHook, which answers the validation failures of every route with RFC
// 9457 Problem Details. The answer is 422, and every detail is a message the hook wrote from
// the metadata of the issue: the generated schema carries no message of its own.
// アプリに defaultHook があり、すべてのルートの検証失敗に RFC 9457 の Problem Details で
// 応答する。応答は 422 であり、各 detail は、
// フックが issue のメタデータから組み立てたメッセージである。生成されたスキーマ自体は、
// メッセージを持たない。
describe('pattern 2: defaultHook', () => {
  // One below minLength: 3.
  // minLength: 3 を 1 下回る。
  it('rejects a name of 2 characters', async () => {
    const res = await appDefaultHook.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'ab', email: 'taro@example.com', age: 20 }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/name', detail: 'Must be at least 3 characters' }],
    })
  })

  // One above maxLength: 20.
  // maxLength: 20 を 1 超える。
  it('rejects a name of 21 characters', async () => {
    const res = await appDefaultHook.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'a'.repeat(21), email: 'taro@example.com', age: 20 }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/name', detail: 'Must be at most 20 characters' }],
    })
  })

  // The empty string is present, and too short.
  // 空文字列は値として存在するが、短すぎる。
  it('rejects an empty name', async () => {
    const res = await appDefaultHook.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: '', email: 'taro@example.com', age: 20 }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/name', detail: 'Must be at least 3 characters' }],
    })
  })

  // A request body is typed JSON, so nothing is coerced: the number 123 is not a string.
  // リクエストボディは型付きの JSON であるため、coerce は行われない。
  // number の 123 は string ではない。
  it('rejects a name that is a number', async () => {
    const res = await appDefaultHook.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 123, email: 'taro@example.com', age: 20 }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/name', detail: 'Expected string' }],
    })
  })

  // null is a value of the wrong type, not a missing one.
  // null は欠落ではなく、型の誤った値である。
  it('rejects a name that is null', async () => {
    const res = await appDefaultHook.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: null, email: 'taro@example.com', age: 20 }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/name', detail: 'Expected string' }],
    })
  })

  // name is required.
  // name は必須である。
  it('rejects a body with no name', async () => {
    const res = await appDefaultHook.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'taro@example.com', age: 20 }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/name', detail: 'This field is required' }],
    })
  })

  // format: email.
  // format: email の検証。
  it('rejects an invalid email', async () => {
    const res = await appDefaultHook.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'taro', email: 'bad', age: 20 }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/email', detail: 'Invalid email address' }],
    })
  })

  // The empty string is not an email address.
  // 空文字列はメールアドレスではない。
  it('rejects an empty email', async () => {
    const res = await appDefaultHook.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'taro', email: '', age: 20 }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/email', detail: 'Invalid email address' }],
    })
  })

  // email is required.
  // email は必須である。
  it('rejects a body with no email', async () => {
    const res = await appDefaultHook.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'taro', age: 20 }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/email', detail: 'This field is required' }],
    })
  })

  // One below minimum: 0.
  // minimum: 0 を 1 下回る。
  it('rejects an age of -1', async () => {
    const res = await appDefaultHook.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'taro', email: 'taro@example.com', age: -1 }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/age', detail: 'Must be at least 0' }],
    })
  })

  // One above maximum: 150.
  // maximum: 150 を 1 超える。
  it('rejects an age of 151', async () => {
    const res = await appDefaultHook.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'taro', email: 'taro@example.com', age: 151 }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/age', detail: 'Must be at most 150' }],
    })
  })

  // In range, and not an integer.
  // 範囲内だが整数ではない。
  it('rejects an age that is a fraction', async () => {
    const res = await appDefaultHook.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'taro', email: 'taro@example.com', age: 1.5 }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/age', detail: 'Expected int' }],
    })
  })

  // Unlike a query parameter, a value in a body is not coerced: the string "20" is not a
  // number.
  // クエリパラメータと違い、ボディ内の値は coerce されない。文字列の "20" は number ではない。
  it('rejects an age that is a string', async () => {
    const res = await appDefaultHook.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'taro', email: 'taro@example.com', age: '20' }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/age', detail: 'Expected number' }],
    })
  })

  // age is required.
  // age は必須である。
  it('rejects a body with no age', async () => {
    const res = await appDefaultHook.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'taro', email: 'taro@example.com' }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/age', detail: 'This field is required' }],
    })
  })

  // Three invalid properties, three issues, in the order the schema declares them.
  // 不正なプロパティが3つあり、issue も3つ、スキーマの宣言順に報告される。
  it('reports every property that fails', async () => {
    const res = await appDefaultHook.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'ab', email: 'bad', age: -1 }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [
        { pointer: '/name', detail: 'Must be at least 3 characters' },
        { pointer: '/email', detail: 'Invalid email address' },
        { pointer: '/age', detail: 'Must be at least 0' },
      ],
    })
  })

  // All three properties are required.
  // 3つのプロパティはすべて必須である。
  it('reports every required property of an empty object', async () => {
    const res = await appDefaultHook.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [
        { pointer: '/name', detail: 'This field is required' },
        { pointer: '/email', detail: 'This field is required' },
        { pointer: '/age', detail: 'This field is required' },
      ],
    })
  })

  // The body has to be an object. The issue has an empty path, the body itself.
  // ボディはオブジェクトでなければならない。issue のパスは空であり、ボディそのものを指す。
  it('rejects a body that is an array', async () => {
    const res = await appDefaultHook.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([]),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/', detail: 'Expected object' }],
    })
  })

  // null is valid JSON, and not an object.
  // null は有効な JSON だが、オブジェクトではない。
  it('rejects a body that is null', async () => {
    const res = await appDefaultHook.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(null),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/', detail: 'Expected object' }],
    })
  })

  // The body cannot be parsed, so validation never starts and no hook runs: the answer is the
  // plain 400 of Hono, whichever pattern the app uses.
  // ボディがパースできないため、検証は開始されず、フックも実行されない。
  // アプリがどのパターンを使っていても、応答は Hono のプレーンな 400 になる。
  it('rejects malformed JSON', async () => {
    const res = await appDefaultHook.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{bad',
    })
    expect(res.status).toBe(400)
    expect(await res.text()).toBe('Malformed JSON in request body')
  })

  // The body is required, and an empty one is not JSON.
  // ボディは必須であり、空のボディは JSON ではない。
  it('rejects an empty body', async () => {
    const res = await appDefaultHook.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '',
    })
    expect(res.status).toBe(400)
    expect(await res.text()).toBe('Malformed JSON in request body')
  })

  // The spec declares application/json only, so text/plain is answered with 415, before any
  // validation.
  // 仕様が宣言しているのは application/json だけであるため、
  // text/plain には検証より前に 415 が返る。
  it('rejects a content type that is not JSON', async () => {
    const res = await appDefaultHook.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({ name: 'taro', email: 'taro@example.com', age: 20 }),
    })
    expect(res.status).toBe(415)
  })

  // /users declares POST only.
  // /users が宣言しているのは POST だけである。
  it('does not route a method the spec does not declare', async () => {
    const res = await appDefaultHook.request('/users')
    expect(res.status).toBe(404)
  })
})

// The route has a hook of its own, which answers its validation failures with RFC 9457
// Problem Details. The answer is 422, and every detail is a message the hook wrote from the
// metadata of the issue: the generated schema carries no message of its own.
// ルートが専用のフックを持ち、そのルートの検証失敗に RFC 9457 の Problem Details で応答する。
// 応答は 422 であり、各 detail は、フックが issue のメタデータから組み立てたメッセージで
// ある。生成されたスキーマ自体は、メッセージを持たない。
describe('pattern 3: per-route hook', () => {
  // One below minLength: 3.
  // minLength: 3 を 1 下回る。
  it('rejects a name of 2 characters', async () => {
    const res = await appRouteHook.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'ab', email: 'taro@example.com', age: 20 }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/name', detail: 'Must be at least 3 characters' }],
    })
  })

  // One above maxLength: 20.
  // maxLength: 20 を 1 超える。
  it('rejects a name of 21 characters', async () => {
    const res = await appRouteHook.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'a'.repeat(21), email: 'taro@example.com', age: 20 }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/name', detail: 'Must be at most 20 characters' }],
    })
  })

  // The empty string is present, and too short.
  // 空文字列は値として存在するが、短すぎる。
  it('rejects an empty name', async () => {
    const res = await appRouteHook.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: '', email: 'taro@example.com', age: 20 }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/name', detail: 'Must be at least 3 characters' }],
    })
  })

  // A request body is typed JSON, so nothing is coerced: the number 123 is not a string.
  // リクエストボディは型付きの JSON であるため、coerce は行われない。
  // number の 123 は string ではない。
  it('rejects a name that is a number', async () => {
    const res = await appRouteHook.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 123, email: 'taro@example.com', age: 20 }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/name', detail: 'Expected string' }],
    })
  })

  // null is a value of the wrong type, not a missing one.
  // null は欠落ではなく、型の誤った値である。
  it('rejects a name that is null', async () => {
    const res = await appRouteHook.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: null, email: 'taro@example.com', age: 20 }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/name', detail: 'Expected string' }],
    })
  })

  // name is required.
  // name は必須である。
  it('rejects a body with no name', async () => {
    const res = await appRouteHook.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'taro@example.com', age: 20 }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/name', detail: 'This field is required' }],
    })
  })

  // format: email.
  // format: email の検証。
  it('rejects an invalid email', async () => {
    const res = await appRouteHook.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'taro', email: 'bad', age: 20 }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/email', detail: 'Invalid email address' }],
    })
  })

  // The empty string is not an email address.
  // 空文字列はメールアドレスではない。
  it('rejects an empty email', async () => {
    const res = await appRouteHook.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'taro', email: '', age: 20 }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/email', detail: 'Invalid email address' }],
    })
  })

  // email is required.
  // email は必須である。
  it('rejects a body with no email', async () => {
    const res = await appRouteHook.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'taro', age: 20 }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/email', detail: 'This field is required' }],
    })
  })

  // One below minimum: 0.
  // minimum: 0 を 1 下回る。
  it('rejects an age of -1', async () => {
    const res = await appRouteHook.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'taro', email: 'taro@example.com', age: -1 }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/age', detail: 'Must be at least 0' }],
    })
  })

  // One above maximum: 150.
  // maximum: 150 を 1 超える。
  it('rejects an age of 151', async () => {
    const res = await appRouteHook.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'taro', email: 'taro@example.com', age: 151 }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/age', detail: 'Must be at most 150' }],
    })
  })

  // In range, and not an integer.
  // 範囲内だが整数ではない。
  it('rejects an age that is a fraction', async () => {
    const res = await appRouteHook.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'taro', email: 'taro@example.com', age: 1.5 }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/age', detail: 'Expected int' }],
    })
  })

  // Unlike a query parameter, a value in a body is not coerced: the string "20" is not a
  // number.
  // クエリパラメータと違い、ボディ内の値は coerce されない。文字列の "20" は number ではない。
  it('rejects an age that is a string', async () => {
    const res = await appRouteHook.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'taro', email: 'taro@example.com', age: '20' }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/age', detail: 'Expected number' }],
    })
  })

  // age is required.
  // age は必須である。
  it('rejects a body with no age', async () => {
    const res = await appRouteHook.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'taro', email: 'taro@example.com' }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/age', detail: 'This field is required' }],
    })
  })

  // Three invalid properties, three issues, in the order the schema declares them.
  // 不正なプロパティが3つあり、issue も3つ、スキーマの宣言順に報告される。
  it('reports every property that fails', async () => {
    const res = await appRouteHook.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'ab', email: 'bad', age: -1 }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [
        { pointer: '/name', detail: 'Must be at least 3 characters' },
        { pointer: '/email', detail: 'Invalid email address' },
        { pointer: '/age', detail: 'Must be at least 0' },
      ],
    })
  })

  // All three properties are required.
  // 3つのプロパティはすべて必須である。
  it('reports every required property of an empty object', async () => {
    const res = await appRouteHook.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [
        { pointer: '/name', detail: 'This field is required' },
        { pointer: '/email', detail: 'This field is required' },
        { pointer: '/age', detail: 'This field is required' },
      ],
    })
  })

  // The body has to be an object. The issue has an empty path, the body itself.
  // ボディはオブジェクトでなければならない。issue のパスは空であり、ボディそのものを指す。
  it('rejects a body that is an array', async () => {
    const res = await appRouteHook.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([]),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/', detail: 'Expected object' }],
    })
  })

  // null is valid JSON, and not an object.
  // null は有効な JSON だが、オブジェクトではない。
  it('rejects a body that is null', async () => {
    const res = await appRouteHook.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(null),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/', detail: 'Expected object' }],
    })
  })

  // The body cannot be parsed, so validation never starts and no hook runs: the answer is the
  // plain 400 of Hono, whichever pattern the app uses.
  // ボディがパースできないため、検証は開始されず、フックも実行されない。
  // アプリがどのパターンを使っていても、応答は Hono のプレーンな 400 になる。
  it('rejects malformed JSON', async () => {
    const res = await appRouteHook.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{bad',
    })
    expect(res.status).toBe(400)
    expect(await res.text()).toBe('Malformed JSON in request body')
  })

  // The body is required, and an empty one is not JSON.
  // ボディは必須であり、空のボディは JSON ではない。
  it('rejects an empty body', async () => {
    const res = await appRouteHook.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '',
    })
    expect(res.status).toBe(400)
    expect(await res.text()).toBe('Malformed JSON in request body')
  })

  // The spec declares application/json only, so text/plain is answered with 415, before any
  // validation.
  // 仕様が宣言しているのは application/json だけであるため、
  // text/plain には検証より前に 415 が返る。
  it('rejects a content type that is not JSON', async () => {
    const res = await appRouteHook.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({ name: 'taro', email: 'taro@example.com', age: 20 }),
    })
    expect(res.status).toBe(415)
  })

  // /users declares POST only.
  // /users が宣言しているのは POST だけである。
  it('does not route a method the spec does not declare', async () => {
    const res = await appRouteHook.request('/users')
    expect(res.status).toBe(404)
  })
})
