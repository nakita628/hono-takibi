// The message extensions, one by one (cases/x-vendor-messages, generated from
// specs/x-vendor-messages.yaml). Every `x-*-message` keyword is exercised on its own:
// the value that breaks the rule is sent, and the message the client receives has to be
// the one the spec wrote for that rule, word for word.
//
//   /form             type, length, pattern, range, multipleOf, array size, enum,
//                     dependentRequired, arrow-function messages
//   /composition      x-anyOf-message, x-oneOf-message, x-not-message
//   /dictionary       x-propertyNames-message
//   /merged           x-allOf-message, as a text
//   /merged-arrow     x-allOf-message, as an arrow function
//   /payment          x-dependentRequired-message, x-dependentSchemas-message
//   /bounds           x-minimum-message, x-maximum-message and the exclusive ones
//   /basket           x-minContains-message, x-maxContains-message
//   /contains-default contains with no message extension
//   /write-only       writeOnly
//   /misc             x-enum-message, x-const-message, x-uniqueItems-message,
//                     x-contains-message, the object keywords, x-required-message
//   /strict-allof     x-unevaluatedProperties-message
//   /implication      x-implication-message
//
// メッセージ拡張を1つずつ検証する(cases/x-vendor-messages。
// specs/x-vendor-messages.yaml から生成)。すべての `x-*-message` キーワードを個別に
// 検証する。ルールに違反する値を送信し、クライアントが受け取るメッセージが、仕様で
// そのルールに対して書かれたものと一字一句一致することを確認する。
//
//   /form             型・長さ・パターン・範囲・multipleOf・配列サイズ・enum・
//                     dependentRequired・アロー関数によるメッセージ
//   /composition      x-anyOf-message・x-oneOf-message・x-not-message
//   /dictionary       x-propertyNames-message
//   /merged           文字列で指定した x-allOf-message
//   /merged-arrow     アロー関数で指定した x-allOf-message
//   /payment          x-dependentRequired-message・x-dependentSchemas-message
//   /bounds           x-minimum-message・x-maximum-message と、その exclusive 版
//   /basket           x-minContains-message・x-maxContains-message
//   /contains-default メッセージ拡張のない contains
//   /write-only       writeOnly
//   /misc             x-enum-message・x-const-message・x-uniqueItems-message・
//                     x-contains-message・オブジェクト系キーワード・x-required-message
//   /strict-allof     x-unevaluatedProperties-message
//   /implication      x-implication-message
//
// The host (hosts/x-vendor-messages-app-default.ts) has no hook, so @hono/zod-openapi
// answers a validation failure itself: 400 with
// `{ success: false, error: { name: 'ZodError', message } }`, where `message` is the JSON
// of the issues. The tests parse it and compare every issue whole: the `message` is the
// one the spec wrote, and the rest (`code`, `path`, `minimum`, ...) is what Zod reports
// about the rule that was broken.
//
// ホスト(hosts/x-vendor-messages-app-default.ts)はフックを持たないため、検証の失敗には
// @hono/zod-openapi 自身が応答する。400 とともに
// `{ success: false, error: { name: 'ZodError', message } }` が返り、`message` は issue の
// JSON 文字列である。テストではこれをパースし、各 issue を丸ごと比較する。`message` は
// 仕様に書かれたものであり、それ以外(`code`・`path`・`minimum` など)は、違反したルールに
// ついて Zod が報告する内容である。
//
// This file holds the requests that are rejected.
// このファイルには、拒否されるリクエストをまとめている。
import { describe, expect, it } from 'vite-plus/test'

import app from '../hosts/x-vendor-messages-app-default'

type ZodFailure = { success: boolean; error: { name: string; message: string } }

// Twelve properties are required. Each test of /form sends all twelve and changes the one it
// is about.
// 12 個のプロパティが必須である。/form に対する各テストでは、12 個すべてを送信したうえで、
// 検証対象の1つだけを変えている。
describe('form: a valid body', () => {
  // Seven properties break a rule each, and every one is answered with the message written for
  // that rule.
  // 7つのプロパティがそれぞれルールに違反しており、各ルール用に書かれたメッセージで応答される。
  it('reports every rule that is broken, each with its own message', async () => {
    const res = await app.request('/form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'ab',
        code: 'ABC',
        slug: 'Hello',
        age: -1,
        score: 1.3,
        count: 10,
        active: true,
        tags: [],
        pin: [1, 2],
        role: 'admin',
        priority: 1,
        quota: 5,
      }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      {
        origin: 'string',
        code: 'too_small',
        minimum: 3,
        inclusive: true,
        path: ['username'],
        message: 'username must be at least 3 characters',
      },
      {
        origin: 'string',
        code: 'too_small',
        minimum: 6,
        inclusive: true,
        exact: true,
        path: ['code'],
        message: 'code must be exactly 6 characters',
      },
      {
        origin: 'string',
        code: 'invalid_format',
        format: 'regex',
        pattern: '/^[a-z0-9-]+$/',
        path: ['slug'],
        message: 'slug must be lowercase alphanumeric with hyphens',
      },
      {
        origin: 'number',
        code: 'too_small',
        minimum: 0,
        inclusive: true,
        path: ['age'],
        message: 'age must be >= 0',
      },
      {
        origin: 'number',
        code: 'not_multiple_of',
        divisor: 0.5,
        path: ['score'],
        message: 'score must be a multiple of 0.5',
      },
      {
        origin: 'array',
        code: 'too_small',
        minimum: 1,
        inclusive: true,
        path: ['tags'],
        message: 'tags must contain at least 1 item',
      },
      {
        origin: 'array',
        code: 'too_small',
        minimum: 4,
        inclusive: true,
        exact: true,
        path: ['pin'],
        message: 'pin must contain exactly 4 digits',
      },
    ])
  })
})

// A value of the wrong type is answered with x-error-message, whatever constraints the
// property has besides.
// 型が誤っている値には、プロパティが他にどんな制約を持っていても、
// x-error-message で応答する。
describe('form: x-error-message, the message of the type', () => {
  // A string is expected.
  // string が期待されている。
  it('answers a username that is a number', async () => {
    const res = await app.request('/form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 42,
        code: 'ABC123',
        slug: 'hello-world',
        age: 25,
        score: 1.5,
        count: 10,
        active: true,
        tags: ['dev'],
        pin: [1, 2, 3, 4],
        role: 'admin',
        priority: 1,
        quota: 5,
      }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      {
        expected: 'string',
        code: 'invalid_type',
        path: ['username'],
        message: 'username must be a string',
      },
    ])
  })

  // An integer is expected; a body is not coerced.
  // integer が期待されている。ボディは coerce されない。
  it('answers an age that is a string', async () => {
    const res = await app.request('/form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'taro',
        code: 'ABC123',
        slug: 'hello-world',
        age: '25',
        score: 1.5,
        count: 10,
        active: true,
        tags: ['dev'],
        pin: [1, 2, 3, 4],
        role: 'admin',
        priority: 1,
        quota: 5,
      }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      {
        expected: 'number',
        code: 'invalid_type',
        path: ['age'],
        message: 'age must be an integer',
      },
    ])
  })

  // A fraction is a number, and not an integer.
  // 小数は number だが、integer ではない。
  it('answers an age that is a fraction', async () => {
    const res = await app.request('/form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'taro',
        code: 'ABC123',
        slug: 'hello-world',
        age: 25.5,
        score: 1.5,
        count: 10,
        active: true,
        tags: ['dev'],
        pin: [1, 2, 3, 4],
        role: 'admin',
        priority: 1,
        quota: 5,
      }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      {
        expected: 'int',
        format: 'safeint',
        code: 'invalid_type',
        path: ['age'],
        message: 'age must be an integer',
      },
    ])
  })

  // A number is expected.
  // number が期待されている。
  it('answers a score that is a string', async () => {
    const res = await app.request('/form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'taro',
        code: 'ABC123',
        slug: 'hello-world',
        age: 25,
        score: '1.5',
        count: 10,
        active: true,
        tags: ['dev'],
        pin: [1, 2, 3, 4],
        role: 'admin',
        priority: 1,
        quota: 5,
      }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      {
        expected: 'number',
        code: 'invalid_type',
        path: ['score'],
        message: 'score must be a number',
      },
    ])
  })

  // A boolean is expected.
  // boolean が期待されている。
  it('answers an active that is a string', async () => {
    const res = await app.request('/form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'taro',
        code: 'ABC123',
        slug: 'hello-world',
        age: 25,
        score: 1.5,
        count: 10,
        active: 'true',
        tags: ['dev'],
        pin: [1, 2, 3, 4],
        role: 'admin',
        priority: 1,
        quota: 5,
      }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      {
        expected: 'boolean',
        code: 'invalid_type',
        path: ['active'],
        message: 'active must be a boolean',
      },
    ])
  })

  // An array is expected.
  // array が期待されている。
  it('answers tags that are a string', async () => {
    const res = await app.request('/form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'taro',
        code: 'ABC123',
        slug: 'hello-world',
        age: 25,
        score: 1.5,
        count: 10,
        active: true,
        tags: 'dev',
        pin: [1, 2, 3, 4],
        role: 'admin',
        priority: 1,
        quota: 5,
      }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      { expected: 'array', code: 'invalid_type', path: ['tags'], message: 'tags must be an array' },
    ])
  })

  // An enum declares x-error-message for a value that is not a member.
  // enum では、メンバーでない値に対して x-error-message が使われる。
  it('answers a role outside its enum', async () => {
    const res = await app.request('/form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'taro',
        code: 'ABC123',
        slug: 'hello-world',
        age: 25,
        score: 1.5,
        count: 10,
        active: true,
        tags: ['dev'],
        pin: [1, 2, 3, 4],
        role: 'owner',
        priority: 1,
        quota: 5,
      }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      {
        code: 'invalid_value',
        values: ['admin', 'editor', 'viewer'],
        path: ['role'],
        message: 'role must be one of admin, editor, viewer',
      },
    ])
  })

  // The same for an integer enum.
  // integer の enum でも同様である。
  it('answers a priority outside its enum', async () => {
    const res = await app.request('/form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'taro',
        code: 'ABC123',
        slug: 'hello-world',
        age: 25,
        score: 1.5,
        count: 10,
        active: true,
        tags: ['dev'],
        pin: [1, 2, 3, 4],
        role: 'admin',
        priority: 4,
        quota: 5,
      }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      {
        code: 'invalid_union',
        errors: [
          [{ code: 'invalid_value', values: [1], path: [], message: 'Invalid input: expected 1' }],
          [{ code: 'invalid_value', values: [2], path: [], message: 'Invalid input: expected 2' }],
          [{ code: 'invalid_value', values: [3], path: [], message: 'Invalid input: expected 3' }],
        ],
        path: ['priority'],
        message: 'priority must be 1, 2, or 3',
      },
    ])
  })
})

// x-minLength-message, x-minItems-message and x-minimum-message.
// x-minLength-message・x-minItems-message・x-minimum-message。
describe('form: minimum length, items and value', () => {
  // One below minLength.
  // minLength を 1 下回る。
  it('x-minLength-message answers a username of 2 characters', async () => {
    const res = await app.request('/form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'ab',
        code: 'ABC123',
        slug: 'hello-world',
        age: 25,
        score: 1.5,
        count: 10,
        active: true,
        tags: ['dev'],
        pin: [1, 2, 3, 4],
        role: 'admin',
        priority: 1,
        quota: 5,
      }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      {
        origin: 'string',
        code: 'too_small',
        minimum: 3,
        inclusive: true,
        path: ['username'],
        message: 'username must be at least 3 characters',
      },
    ])
  })

  // One below minItems.
  // minItems を 1 下回る。
  it('x-minItems-message answers an empty list of tags', async () => {
    const res = await app.request('/form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'taro',
        code: 'ABC123',
        slug: 'hello-world',
        age: 25,
        score: 1.5,
        count: 10,
        active: true,
        tags: [],
        pin: [1, 2, 3, 4],
        role: 'admin',
        priority: 1,
        quota: 5,
      }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      {
        origin: 'array',
        code: 'too_small',
        minimum: 1,
        inclusive: true,
        path: ['tags'],
        message: 'tags must contain at least 1 item',
      },
    ])
  })

  // One below the minimum.
  // 最小値を 1 下回る。
  it('x-minimum-message answers an age of -1', async () => {
    const res = await app.request('/form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'taro',
        code: 'ABC123',
        slug: 'hello-world',
        age: -1,
        score: 1.5,
        count: 10,
        active: true,
        tags: ['dev'],
        pin: [1, 2, 3, 4],
        role: 'admin',
        priority: 1,
        quota: 5,
      }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      {
        origin: 'number',
        code: 'too_small',
        minimum: 0,
        inclusive: true,
        path: ['age'],
        message: 'age must be >= 0',
      },
    ])
  })
})

// x-maxLength-message, x-maxItems-message and x-maximum-message.
// x-maxLength-message・x-maxItems-message・x-maximum-message。
describe('form: maximum length, items and value', () => {
  // One above maxLength.
  // maxLength を 1 超える。
  it('x-maxLength-message answers a username of 17 characters', async () => {
    const res = await app.request('/form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'a'.repeat(17),
        code: 'ABC123',
        slug: 'hello-world',
        age: 25,
        score: 1.5,
        count: 10,
        active: true,
        tags: ['dev'],
        pin: [1, 2, 3, 4],
        role: 'admin',
        priority: 1,
        quota: 5,
      }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      {
        origin: 'string',
        code: 'too_big',
        maximum: 16,
        inclusive: true,
        path: ['username'],
        message: 'username must be at most 16 characters',
      },
    ])
  })

  // One above maxItems.
  // maxItems を 1 超える。
  it('x-maxItems-message answers six tags', async () => {
    const res = await app.request('/form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'taro',
        code: 'ABC123',
        slug: 'hello-world',
        age: 25,
        score: 1.5,
        count: 10,
        active: true,
        tags: ['1', '2', '3', '4', '5', '6'],
        pin: [1, 2, 3, 4],
        role: 'admin',
        priority: 1,
        quota: 5,
      }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      {
        origin: 'array',
        code: 'too_big',
        maximum: 5,
        inclusive: true,
        path: ['tags'],
        message: 'tags must contain at most 5 items',
      },
    ])
  })

  // One above the maximum.
  // 最大値を 1 超える。
  it('x-maximum-message answers an age of 121', async () => {
    const res = await app.request('/form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'taro',
        code: 'ABC123',
        slug: 'hello-world',
        age: 121,
        score: 1.5,
        count: 10,
        active: true,
        tags: ['dev'],
        pin: [1, 2, 3, 4],
        role: 'admin',
        priority: 1,
        quota: 5,
      }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      {
        origin: 'number',
        code: 'too_big',
        maximum: 120,
        inclusive: true,
        path: ['age'],
        message: 'age must be <= 120',
      },
    ])
  })
})

// x-length-message, for a string and for an array whose minimum and maximum are equal.
// x-length-message。最小値と最大値が等しい string と array に対して使われる。
describe('form: an exact length', () => {
  // One below the length.
  // 固定長を 1 下回る。
  it('answers a code of 5 characters', async () => {
    const res = await app.request('/form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'taro',
        code: 'ABC12',
        slug: 'hello-world',
        age: 25,
        score: 1.5,
        count: 10,
        active: true,
        tags: ['dev'],
        pin: [1, 2, 3, 4],
        role: 'admin',
        priority: 1,
        quota: 5,
      }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      {
        origin: 'string',
        code: 'too_small',
        minimum: 6,
        inclusive: true,
        exact: true,
        path: ['code'],
        message: 'code must be exactly 6 characters',
      },
    ])
  })

  // One above the length.
  // 固定長を 1 超える。
  it('answers a code of 7 characters', async () => {
    const res = await app.request('/form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'taro',
        code: 'ABC1234',
        slug: 'hello-world',
        age: 25,
        score: 1.5,
        count: 10,
        active: true,
        tags: ['dev'],
        pin: [1, 2, 3, 4],
        role: 'admin',
        priority: 1,
        quota: 5,
      }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      {
        origin: 'string',
        code: 'too_big',
        maximum: 6,
        inclusive: true,
        exact: true,
        path: ['code'],
        message: 'code must be exactly 6 characters',
      },
    ])
  })

  // One below the length.
  // 固定長を 1 下回る。
  it('answers a pin of 3 digits', async () => {
    const res = await app.request('/form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'taro',
        code: 'ABC123',
        slug: 'hello-world',
        age: 25,
        score: 1.5,
        count: 10,
        active: true,
        tags: ['dev'],
        pin: [1, 2, 3],
        role: 'admin',
        priority: 1,
        quota: 5,
      }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      {
        origin: 'array',
        code: 'too_small',
        minimum: 4,
        inclusive: true,
        exact: true,
        path: ['pin'],
        message: 'pin must contain exactly 4 digits',
      },
    ])
  })

  // One above the length.
  // 固定長を 1 超える。
  it('answers a pin of 5 digits', async () => {
    const res = await app.request('/form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'taro',
        code: 'ABC123',
        slug: 'hello-world',
        age: 25,
        score: 1.5,
        count: 10,
        active: true,
        tags: ['dev'],
        pin: [1, 2, 3, 4, 5],
        role: 'admin',
        priority: 1,
        quota: 5,
      }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      {
        origin: 'array',
        code: 'too_big',
        maximum: 4,
        inclusive: true,
        exact: true,
        path: ['pin'],
        message: 'pin must contain exactly 4 digits',
      },
    ])
  })
})

// x-pattern-message and x-multipleOf-message.
// x-pattern-message と x-multipleOf-message。
describe('form: pattern and multipleOf', () => {
  // The pattern allows lower-case letters, digits and hyphens.
  // パターンは、小文字の英字・数字・ハイフンを許容する。
  it('x-pattern-message answers a slug with upper-case letters', async () => {
    const res = await app.request('/form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'taro',
        code: 'ABC123',
        slug: 'Hello-World',
        age: 25,
        score: 1.5,
        count: 10,
        active: true,
        tags: ['dev'],
        pin: [1, 2, 3, 4],
        role: 'admin',
        priority: 1,
        quota: 5,
      }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      {
        origin: 'string',
        code: 'invalid_format',
        format: 'regex',
        pattern: '/^[a-z0-9-]+$/',
        path: ['slug'],
        message: 'slug must be lowercase alphanumeric with hyphens',
      },
    ])
  })

  // A space is not allowed.
  // 空白は許容されない。
  it('x-pattern-message answers a slug with a space', async () => {
    const res = await app.request('/form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'taro',
        code: 'ABC123',
        slug: 'hello world',
        age: 25,
        score: 1.5,
        count: 10,
        active: true,
        tags: ['dev'],
        pin: [1, 2, 3, 4],
        role: 'admin',
        priority: 1,
        quota: 5,
      }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      {
        origin: 'string',
        code: 'invalid_format',
        format: 'regex',
        pattern: '/^[a-z0-9-]+$/',
        path: ['slug'],
        message: 'slug must be lowercase alphanumeric with hyphens',
      },
    ])
  })

  // The pattern requires at least one character.
  // パターンは、1文字以上を要求する。
  it('x-pattern-message answers an empty slug', async () => {
    const res = await app.request('/form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'taro',
        code: 'ABC123',
        slug: '',
        age: 25,
        score: 1.5,
        count: 10,
        active: true,
        tags: ['dev'],
        pin: [1, 2, 3, 4],
        role: 'admin',
        priority: 1,
        quota: 5,
      }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      {
        origin: 'string',
        code: 'invalid_format',
        format: 'regex',
        pattern: '/^[a-z0-9-]+$/',
        path: ['slug'],
        message: 'slug must be lowercase alphanumeric with hyphens',
      },
    ])
  })

  // A number with multipleOf.
  // multipleOf を持つ number。
  it('x-multipleOf-message answers a score that is not a multiple of 0.5', async () => {
    const res = await app.request('/form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'taro',
        code: 'ABC123',
        slug: 'hello-world',
        age: 25,
        score: 1.3,
        count: 10,
        active: true,
        tags: ['dev'],
        pin: [1, 2, 3, 4],
        role: 'admin',
        priority: 1,
        quota: 5,
      }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      {
        origin: 'number',
        code: 'not_multiple_of',
        divisor: 0.5,
        path: ['score'],
        message: 'score must be a multiple of 0.5',
      },
    ])
  })

  // An integer with multipleOf.
  // multipleOf を持つ integer。
  it('x-multipleOf-message answers a count that is not a multiple of 5', async () => {
    const res = await app.request('/form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'taro',
        code: 'ABC123',
        slug: 'hello-world',
        age: 25,
        score: 1.5,
        count: 7,
        active: true,
        tags: ['dev'],
        pin: [1, 2, 3, 4],
        role: 'admin',
        priority: 1,
        quota: 5,
      }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      {
        origin: 'number',
        code: 'not_multiple_of',
        divisor: 5,
        path: ['count'],
        message: 'count must be a multiple of 5',
      },
    ])
  })
})

// tokenLabel is required when token is present.
// token が存在する場合、tokenLabel が必須となる。
describe('form: x-dependentRequired-message', () => {
  // The pointer names the property that is missing.
  // pointer は、欠落しているプロパティを指す。
  it('answers a token with no label', async () => {
    const res = await app.request('/form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'taro',
        code: 'ABC123',
        slug: 'hello-world',
        age: 25,
        score: 1.5,
        count: 10,
        active: true,
        tags: ['dev'],
        pin: [1, 2, 3, 4],
        role: 'admin',
        priority: 1,
        quota: 5,
        token: 'abc',
      }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      {
        code: 'custom',
        message: 'tokenLabel is required when token is provided',
        path: ['tokenLabel'],
      },
    ])
  })
})

// x-error-message and x-minimum-message may hold an arrow function, emitted as it is, which
// receives the issue.
// x-error-message と x-minimum-message にはアロー関数を指定できる。関数はそのまま出力され、
// issue を受け取る。
describe('form: messages written as an arrow function', () => {
  // The function returns a fixed text.
  // 関数は、固定の文字列を返す。
  it('an arrow function with no argument answers a nickname that is a number', async () => {
    const res = await app.request('/form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'taro',
        code: 'ABC123',
        slug: 'hello-world',
        age: 25,
        score: 1.5,
        count: 10,
        active: true,
        tags: ['dev'],
        pin: [1, 2, 3, 4],
        role: 'admin',
        priority: 1,
        quota: 5,
        nickname: 42,
      }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      {
        expected: 'string',
        code: 'invalid_type',
        path: ['nickname'],
        message: 'nickname is invalid',
      },
    ])
  })

  // The function reads the input of the issue, and tells a missing value from a wrong one.
  // 関数は issue の入力値を読み取り、値の欠落と型の誤りを区別する。
  it('an arrow function answers a missing quota', async () => {
    const res = await app.request('/form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'taro',
        code: 'ABC123',
        slug: 'hello-world',
        age: 25,
        score: 1.5,
        count: 10,
        active: true,
        tags: ['dev'],
        pin: [1, 2, 3, 4],
        role: 'admin',
        priority: 1,
      }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      { expected: 'number', code: 'invalid_type', path: ['quota'], message: 'quota is required' },
    ])
  })

  // The other branch of the same function.
  // 同じ関数の、もう一方の分岐。
  it('an arrow function answers a quota of the wrong type', async () => {
    const res = await app.request('/form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'taro',
        code: 'ABC123',
        slug: 'hello-world',
        age: 25,
        score: 1.5,
        count: 10,
        active: true,
        tags: ['dev'],
        pin: [1, 2, 3, 4],
        role: 'admin',
        priority: 1,
        quota: 'five',
      }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      {
        expected: 'number',
        code: 'invalid_type',
        path: ['quota'],
        message: 'quota must be an integer',
      },
    ])
  })

  // x-minimum-message interpolates the value that was sent.
  // x-minimum-message は、送信された値をメッセージに埋め込む。
  it('an arrow function writes the input into the message', async () => {
    const res = await app.request('/form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'taro',
        code: 'ABC123',
        slug: 'hello-world',
        age: 25,
        score: 1.5,
        count: 10,
        active: true,
        tags: ['dev'],
        pin: [1, 2, 3, 4],
        role: 'admin',
        priority: 1,
        quota: -7,
      }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      {
        origin: 'number',
        code: 'too_small',
        minimum: 0,
        inclusive: true,
        path: ['quota'],
        message: 'quota must be >= 0 (received: -7)',
      },
    ])
  })
})

// anyValue is required; oneValue and notString are optional.
// anyValue は必須であり、oneValue と notString は任意である。
describe('composition: x-anyOf-message, x-oneOf-message, x-not-message', () => {
  // Neither a string nor an integer.
  // string でも integer でもない。
  it('x-anyOf-message answers a boolean', async () => {
    const res = await app.request('/composition', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ anyValue: true }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      {
        code: 'invalid_union',
        errors: [
          [
            {
              expected: 'string',
              code: 'invalid_type',
              path: [],
              message: 'Invalid input: expected string, received boolean',
            },
          ],
          [
            {
              expected: 'number',
              code: 'invalid_type',
              path: [],
              message: 'Invalid input: expected number, received boolean',
            },
          ],
        ],
        path: ['anyValue'],
        message: 'anyValue must be a string or integer',
      },
    ])
  })

  // anyValue is required, and a missing value matches no branch.
  // anyValue は必須であり、値の欠落はどの分岐にも一致しない。
  it('x-anyOf-message answers a missing value', async () => {
    const res = await app.request('/composition', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      {
        code: 'invalid_union',
        errors: [
          [
            {
              expected: 'string',
              code: 'invalid_type',
              path: [],
              message: 'Invalid input: expected string, received undefined',
            },
          ],
          [
            {
              expected: 'number',
              code: 'invalid_type',
              path: [],
              message: 'Invalid input: expected number, received undefined',
            },
          ],
        ],
        path: ['anyValue'],
        message: 'anyValue must be a string or integer',
      },
    ])
  })

  // No branch matches.
  // どの分岐にも一致しない。
  it('x-oneOf-message answers a boolean', async () => {
    const res = await app.request('/composition', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ anyValue: 'ok', oneValue: true }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      {
        code: 'invalid_union',
        errors: [
          [
            {
              expected: 'string',
              code: 'invalid_type',
              path: [],
              message: 'Invalid input: expected string, received boolean',
            },
          ],
          [
            {
              expected: 'number',
              code: 'invalid_type',
              path: [],
              message: 'Invalid input: expected number, received boolean',
            },
          ],
        ],
        path: ['oneValue'],
        message: 'oneValue must match exactly one type',
      },
    ])
  })

  // The value matches the negated schema.
  // 値が、否定されたスキーマに一致している。
  it('x-not-message answers a string', async () => {
    const res = await app.request('/composition', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ anyValue: 'ok', notString: 'forbidden' }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      { code: 'custom', path: ['notString'], message: 'notString must not be a string' },
    ])
  })
})

// A map whose keys have to match a pattern.
// キーがパターンに一致しなければならないマップ。
describe('dictionary: x-propertyNames-message', () => {
  // The pointer names the key.
  // pointer は、該当のキーを指す。
  it('answers a key that starts with an upper-case letter', async () => {
    const res = await app.request('/dictionary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ BadKey: 'x' }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      {
        code: 'custom',
        path: ['BadKey'],
        message: 'keys must start with a lowercase letter and contain only [a-z0-9_]',
      },
    ])
  })

  // A key has to start with a lower-case letter.
  // キーは、小文字の英字で始まらなければならない。
  it('answers a key that starts with a digit', async () => {
    const res = await app.request('/dictionary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ '1key': 'x' }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      {
        code: 'custom',
        path: ['1key'],
        message: 'keys must start with a lowercase letter and contain only [a-z0-9_]',
      },
    ])
  })

  // Two of the three keys fail, and both are reported.
  // 3つのキーのうち2つが失敗し、両方が報告される。
  it('answers every key that fails', async () => {
    const res = await app.request('/dictionary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ BadKey: 'x', ok_key: 'y', 'Other-Key': 'z' }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      {
        code: 'custom',
        path: ['BadKey'],
        message: 'keys must start with a lowercase letter and contain only [a-z0-9_]',
      },
      {
        code: 'custom',
        path: ['Other-Key'],
        message: 'keys must start with a lowercase letter and contain only [a-z0-9_]',
      },
    ])
  })

  // The key is fine; additionalProperties requires a string.
  // キーは問題ないが、additionalProperties は string を要求する。
  it('rejects a value that is not a string', async () => {
    const res = await app.request('/dictionary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok_key: 1 }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      {
        expected: 'string',
        code: 'invalid_type',
        path: ['ok_key'],
        message: 'Invalid input: expected string, received number',
      },
    ])
  })
})

// An intersection has no issue of its own, so the message replaces the message of every issue
// its branches report, the messages the branches declare themselves included, and keeps the
// path of each.
// 交差型には固有の issue がない。そのためメッセージは、
// 各分岐が報告するすべての issue のメッセージを置き換える。
// 分岐自身が宣言しているメッセージも置き換えの対象である。各 issue のパスは保持される。
describe('merged: x-allOf-message as a text', () => {
  // The branch declares "name must be at least 3 chars"; x-allOf-message replaces it.
  // 分岐は "name must be at least 3 chars" を宣言しているが、
  // x-allOf-message がこれを置き換える。
  it('answers a name that fails the first branch', async () => {
    const res = await app.request('/merged', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'a', age: 25 }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      {
        origin: 'string',
        code: 'too_small',
        minimum: 3,
        inclusive: true,
        path: ['name'],
        message: 'merged validation failed',
      },
    ])
  })

  // Two issues, each under its own pointer.
  // 2件の issue が、それぞれ自身の pointer で報告される。
  it('answers both branches when both fail', async () => {
    const res = await app.request('/merged', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'a', age: -1 }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      {
        origin: 'string',
        code: 'too_small',
        minimum: 3,
        inclusive: true,
        path: ['name'],
        message: 'merged validation failed',
      },
      {
        origin: 'number',
        code: 'too_small',
        minimum: 0,
        inclusive: true,
        path: ['age'],
        message: 'merged validation failed',
      },
    ])
  })

  // The pointer of a missing property is kept as well.
  // 欠落しているプロパティの pointer も保持される。
  it('answers a missing name', async () => {
    const res = await app.request('/merged', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ age: 25 }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      {
        expected: 'string',
        code: 'invalid_type',
        path: ['name'],
        message: 'merged validation failed',
      },
    ])
  })

  // Both required properties are missing.
  // 必須プロパティが両方とも欠けている。
  it('answers an empty object', async () => {
    const res = await app.request('/merged', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      {
        expected: 'string',
        code: 'invalid_type',
        path: ['name'],
        message: 'merged validation failed',
      },
      {
        expected: 'number',
        code: 'invalid_type',
        path: ['age'],
        message: 'merged validation failed',
      },
    ])
  })
})

// The function receives each issue and returns its message.
// 関数は各 issue を受け取り、そのメッセージを返す。
describe('merged-arrow: x-allOf-message as an arrow function', () => {
  // Each issue gets a message of its own.
  // issue ごとに異なるメッセージが生成される。
  it('writes a message from the path of each issue', async () => {
    const res = await app.request('/merged-arrow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'a', age: -1 }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      {
        origin: 'string',
        code: 'too_small',
        minimum: 3,
        inclusive: true,
        path: ['name'],
        message: 'merged failed at name',
      },
      {
        origin: 'number',
        code: 'too_small',
        minimum: 0,
        inclusive: true,
        path: ['age'],
        message: 'merged failed at age',
      },
    ])
  })

  // One branch fails.
  // 1つの分岐だけが失敗する。
  it('writes a message for a single issue', async () => {
    const res = await app.request('/merged-arrow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'taro', age: -1 }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      {
        origin: 'number',
        code: 'too_small',
        minimum: 0,
        inclusive: true,
        path: ['age'],
        message: 'merged failed at age',
      },
    ])
  })
})

// billing_zip is required when credit_card is present, and credit_card then has to be 16
// digits.
// credit_card が存在する場合、billing_zip が必須となり、
// credit_card は 16 桁でなければならない。
describe('payment: x-dependentRequired-message and x-dependentSchemas-message', () => {
  // The pointer names the property that is missing.
  // pointer は、欠落しているプロパティを指す。
  it('x-dependentRequired-message answers a credit card with no billing zip', async () => {
    const res = await app.request('/payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ method: 'cc', credit_card: '4111111111111111' }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      {
        code: 'custom',
        message: 'billing_zip is required when credit_card is provided',
        path: ['billing_zip'],
      },
    ])
  })

  // The schema that applies when credit_card is present. The pointer is the object itself.
  // credit_card が存在する場合に適用されるスキーマ。pointer は、オブジェクト自身を指す。
  it('x-dependentSchemas-message answers a credit card that is not 16 digits', async () => {
    const res = await app.request('/payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ method: 'cc', credit_card: '1234', billing_zip: '12345' }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      { code: 'custom', path: [], message: 'credit_card must be 16 digits when provided' },
    ])
  })

  // Two rules are broken, and both are reported.
  // 2つのルールに違反しており、両方が報告される。
  it('answers both when the card is malformed and the zip is missing', async () => {
    const res = await app.request('/payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ method: 'cc', credit_card: '1234' }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      {
        code: 'custom',
        message: 'billing_zip is required when credit_card is provided',
        path: ['billing_zip'],
      },
      { code: 'custom', path: [], message: 'credit_card must be 16 digits when provided' },
    ])
  })

  // method is required.
  // method は必須である。
  it('rejects a payment with no method', async () => {
    const res = await app.request('/payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      {
        expected: 'string',
        code: 'invalid_type',
        path: ['method'],
        message: 'Invalid input: expected string, received undefined',
      },
    ])
  })
})

// score has an inclusive minimum and an exclusive maximum; ratio the other way round. Each of
// the four bounds has a message of its own.
// score は、下限が inclusive・上限が exclusive である。ratio はその逆である。
// 4つの境界それぞれに、専用のメッセージがある。
describe('bounds: inclusive and exclusive bounds', () => {
  // Below the inclusive minimum.
  // inclusive の最小値を下回る。
  it('x-minimum-message answers a score below 0', async () => {
    const res = await app.request('/bounds', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ score: -1, ratio: 0.5 }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      {
        origin: 'number',
        code: 'too_small',
        minimum: 0,
        inclusive: true,
        path: ['score'],
        message: 'score must be >= 0',
      },
    ])
  })

  // The exclusive maximum itself.
  // exclusive の最大値そのもの。
  it('x-exclusiveMaximum-message answers a score of 100', async () => {
    const res = await app.request('/bounds', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ score: 100, ratio: 0.5 }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      {
        origin: 'number',
        code: 'too_big',
        maximum: 100,
        inclusive: false,
        path: ['score'],
        message: 'score must be < 100',
      },
    ])
  })

  // The exclusive minimum itself.
  // exclusive の最小値そのもの。
  it('x-exclusiveMinimum-message answers a ratio of 0', async () => {
    const res = await app.request('/bounds', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ score: 50, ratio: 0 }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      {
        origin: 'number',
        code: 'too_small',
        minimum: 0,
        inclusive: false,
        path: ['ratio'],
        message: 'ratio must be > 0',
      },
    ])
  })

  // Above the inclusive maximum.
  // inclusive の最大値を超える。
  it('x-maximum-message answers a ratio above 1', async () => {
    const res = await app.request('/bounds', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ score: 50, ratio: 1.5 }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      {
        origin: 'number',
        code: 'too_big',
        maximum: 1,
        inclusive: true,
        path: ['ratio'],
        message: 'ratio must be <= 1',
      },
    ])
  })

  // One issue each.
  // それぞれ1件の issue。
  it('answers both properties when both are out of bounds', async () => {
    const res = await app.request('/bounds', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ score: 100, ratio: 0 }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      {
        origin: 'number',
        code: 'too_big',
        maximum: 100,
        inclusive: false,
        path: ['score'],
        message: 'score must be < 100',
      },
      {
        origin: 'number',
        code: 'too_small',
        minimum: 0,
        inclusive: false,
        path: ['ratio'],
        message: 'ratio must be > 0',
      },
    ])
  })
})

// Between 2 and 5 of the items have to be premium.
// 要素のうち、2〜5 個が premium でなければならない。
describe('basket: x-minContains-message and x-maxContains-message', () => {
  // One below minContains.
  // minContains を 1 下回る。
  it('x-minContains-message answers one premium item', async () => {
    const res = await app.request('/basket', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: [{ kind: 'premium' }, { kind: 'basic' }] }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      { code: 'custom', message: 'must include at least 2 premium items', path: ['items'] },
    ])
  })

  // Nothing can match in an empty array.
  // 空配列では、一致する要素が存在しえない。
  it('x-minContains-message answers an empty basket', async () => {
    const res = await app.request('/basket', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: [] }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      { code: 'custom', message: 'must include at least 2 premium items', path: ['items'] },
    ])
  })

  // One above maxContains.
  // maxContains を 1 超える。
  it('x-maxContains-message answers six premium items', async () => {
    const res = await app.request('/basket', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: [
          { kind: 'premium' },
          { kind: 'premium' },
          { kind: 'premium' },
          { kind: 'premium' },
          { kind: 'premium' },
          { kind: 'premium' },
        ],
      }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      { code: 'custom', message: 'must include at most 5 premium items', path: ['items'] },
    ])
  })
})

// With no x-*-message the issue carries the message of Zod.
// x-*-message を指定しない場合、issue には Zod のメッセージが入る。
describe('contains-default: contains with no message extension', () => {
  // contains alone means at least one match.
  // contains 単独の場合、1つ以上の一致が必要である。
  it('answers tags with no matching item', async () => {
    const res = await app.request('/contains-default', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tags: ['a', 'b'], scores: [95, 99, 80], ints: [1, 2, 3] }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      { code: 'custom', path: ['tags'], message: 'Invalid input' },
    ])
  })

  // minContains: 2.
  // minContains: 2 の検証。
  it('answers scores with one matching item', async () => {
    const res = await app.request('/contains-default', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tags: ['special', 'a', 'b'], scores: [95, 10], ints: [1, 2, 3] }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      { code: 'custom', path: ['scores'], message: 'Invalid input' },
    ])
  })

  // Nothing can match in an empty array.
  // 空配列では、一致する要素が存在しえない。
  it('answers scores that are empty', async () => {
    const res = await app.request('/contains-default', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tags: ['special', 'a', 'b'], scores: [], ints: [1, 2, 3] }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      { code: 'custom', path: ['scores'], message: 'Invalid input' },
    ])
  })

  // maxContains: 3.
  // maxContains: 3 の検証。
  it('answers ints with four matching items', async () => {
    const res = await app.request('/contains-default', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tags: ['special', 'a', 'b'],
        scores: [95, 99, 80],
        ints: [1, 2, 3, 4],
      }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      { code: 'custom', path: ['ints'], message: 'Invalid input' },
    ])
  })
})

// writeOnly is documentation: it does not change what a request may hold.
// writeOnly はドキュメント上の情報であり、リクエストに含められる内容は変わらない。
describe('write-only: writeOnly', () => {
  // password is required.
  // password は必須である。
  it('rejects a body with no password', async () => {
    const res = await app.request('/write-only', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'taro' }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      {
        expected: 'string',
        code: 'invalid_type',
        path: ['password'],
        message: 'Invalid input: expected string, received undefined',
      },
    ])
  })
})

// A string enum and a string const.
// string の enum と const。
describe('misc: x-enum-message and x-const-message', () => {
  // A string that is not a member.
  // メンバーでない string。
  it('x-enum-message answers a color outside the enum', async () => {
    const res = await app.request('/misc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        color: 'purple',
        kind: 'admin',
        tags: ['a', 'b'],
        sized: ['premium', 'basic'],
        namespaced: { a: '1' },
        prefixed: { x_one: 'ok' },
        payload: 'hello',
      }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      {
        code: 'invalid_value',
        values: ['red', 'green', 'blue'],
        path: ['color'],
        message: 'color must be one of red, green, blue',
      },
    ])
  })

  // color declares x-error-message as well, "color must be a string", and it is never used: an
  // enum is emitted as one check, which a value of the wrong type fails like a value outside
  // the enum does.
  // color は x-error-message("color must be a string")も宣言しているが、これは使われない。
  // enum は単一の検証として生成されるため、型が誤っている値も、
  // enum に含まれない値と同じ検証で失敗する。
  it('x-enum-message answers a color that is not a string too', async () => {
    const res = await app.request('/misc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        color: 1,
        kind: 'admin',
        tags: ['a', 'b'],
        sized: ['premium', 'basic'],
        namespaced: { a: '1' },
        prefixed: { x_one: 'ok' },
        payload: 'hello',
      }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      {
        code: 'invalid_value',
        values: ['red', 'green', 'blue'],
        path: ['color'],
        message: 'color must be one of red, green, blue',
      },
    ])
  })

  // kind is const: admin.
  // kind は const: admin である。
  it('x-const-message answers another value', async () => {
    const res = await app.request('/misc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        color: 'red',
        kind: 'user',
        tags: ['a', 'b'],
        sized: ['premium', 'basic'],
        namespaced: { a: '1' },
        prefixed: { x_one: 'ok' },
        payload: 'hello',
      }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      {
        code: 'invalid_value',
        values: ['admin'],
        path: ['kind'],
        message: 'kind must be exactly "admin"',
      },
    ])
  })
})

// Array keywords.
// 配列のキーワード。
describe('misc: x-uniqueItems-message and x-contains-message', () => {
  // The pointer ends in the index of the second occurrence.
  // pointer は、2回目の出現位置のインデックスで終わる。
  it('x-uniqueItems-message answers a duplicate', async () => {
    const res = await app.request('/misc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        color: 'red',
        kind: 'admin',
        tags: ['a', 'a'],
        sized: ['premium', 'basic'],
        namespaced: { a: '1' },
        prefixed: { x_one: 'ok' },
        payload: 'hello',
      }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      { code: 'custom', path: ['tags', 1], message: 'tags must contain unique values' },
    ])
  })

  // Two values repeat, and both repetitions are reported.
  // 2つの値が重複しており、両方の重複が報告される。
  it('x-uniqueItems-message answers every duplicate', async () => {
    const res = await app.request('/misc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        color: 'red',
        kind: 'admin',
        tags: ['a', 'b', 'a', 'b'],
        sized: ['premium', 'basic'],
        namespaced: { a: '1' },
        prefixed: { x_one: 'ok' },
        payload: 'hello',
      }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      { code: 'custom', path: ['tags', 2], message: 'tags must contain unique values' },
      { code: 'custom', path: ['tags', 3], message: 'tags must contain unique values' },
    ])
  })

  // sized has to hold "premium" at least once.
  // sized は、"premium" を1つ以上含まなければならない。
  it('x-contains-message answers a list with no matching item', async () => {
    const res = await app.request('/misc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        color: 'red',
        kind: 'admin',
        tags: ['a', 'b'],
        sized: ['basic', 'standard'],
        namespaced: { a: '1' },
        prefixed: { x_one: 'ok' },
        payload: 'hello',
      }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      { code: 'custom', message: 'sized must contain at least one premium tag', path: ['sized'] },
    ])
  })

  // Nothing can match in an empty array.
  // 空配列では、一致する要素が存在しえない。
  it('x-contains-message answers an empty list', async () => {
    const res = await app.request('/misc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        color: 'red',
        kind: 'admin',
        tags: ['a', 'b'],
        sized: [],
        namespaced: { a: '1' },
        prefixed: { x_one: 'ok' },
        payload: 'hello',
      }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      { code: 'custom', message: 'sized must contain at least one premium tag', path: ['sized'] },
    ])
  })
})

// minProperties, additionalProperties and patternProperties.
// minProperties・additionalProperties・patternProperties。
describe('misc: the object keywords', () => {
  // One below minProperties.
  // minProperties を 1 下回る。
  it('x-minProperties-message answers an empty object', async () => {
    const res = await app.request('/misc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        color: 'red',
        kind: 'admin',
        tags: ['a', 'b'],
        sized: ['premium', 'basic'],
        namespaced: {},
        prefixed: { x_one: 'ok' },
        payload: 'hello',
      }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      { code: 'custom', path: ['namespaced'], message: 'namespaced must have at least 1 property' },
    ])
  })

  // additionalProperties: false makes the object strict.
  // additionalProperties: false により、オブジェクトは厳格になる。
  it('x-additionalProperties-message answers an unknown key', async () => {
    const res = await app.request('/misc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        color: 'red',
        kind: 'admin',
        tags: ['a', 'b'],
        sized: ['premium', 'basic'],
        namespaced: { a: '1', d: '4' },
        prefixed: { x_one: 'ok' },
        payload: 'hello',
      }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      {
        code: 'unrecognized_keys',
        keys: ['d'],
        path: ['namespaced'],
        message: 'namespaced contains an unrecognized key',
      },
    ])
  })

  // namespaced declares three properties and allows no other, so a fourth key is always an
  // unknown one. x-maxProperties-message cannot be reached at run time; that the generator
  // emits it is checked in the source tests.
  // namespaced は3つのプロパティを宣言し、それ以外を許容しない。そのため、
  // 4つ目のキーは必ず未知のキーになる。x-maxProperties-message には実行時に到達できないため、
  // 生成器がこれを出力していることは、source のテストで確認している。
  it('x-additionalProperties-message answers a fourth key before x-maxProperties-message can', async () => {
    const res = await app.request('/misc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        color: 'red',
        kind: 'admin',
        tags: ['a', 'b'],
        sized: ['premium', 'basic'],
        namespaced: { a: '1', b: '2', c: '3', d: '4' },
        prefixed: { x_one: 'ok' },
        payload: 'hello',
      }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      {
        code: 'unrecognized_keys',
        keys: ['d'],
        path: ['namespaced'],
        message: 'namespaced contains an unrecognized key',
      },
    ])
  })

  // The pointer holds the key that failed.
  // pointer には、失敗したキーが含まれる。
  it('x-patternProperties-message answers an x_ key that is not a string', async () => {
    const res = await app.request('/misc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        color: 'red',
        kind: 'admin',
        tags: ['a', 'b'],
        sized: ['premium', 'basic'],
        namespaced: { a: '1' },
        prefixed: { x_one: 42 },
        payload: 'hello',
      }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      {
        expected: 'string',
        code: 'invalid_type',
        path: ['prefixed', 'x_one'],
        message: 'x_ keys must be strings',
      },
    ])
  })
})

// A missing value and a value of the wrong type have a message each.
// 値の欠落と型の誤りには、それぞれ専用のメッセージがある。
describe('misc: x-required-message and x-error-message', () => {
  // The message for a missing value.
  // 値が欠落している場合のメッセージ。
  it('x-required-message answers a missing payload', async () => {
    const res = await app.request('/misc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        color: 'red',
        kind: 'admin',
        tags: ['a', 'b'],
        sized: ['premium', 'basic'],
        namespaced: { a: '1' },
        prefixed: { x_one: 'ok' },
      }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      {
        expected: 'string',
        code: 'invalid_type',
        path: ['payload'],
        message: 'payload is required',
      },
    ])
  })

  // The message for the wrong type.
  // 型が誤っている場合のメッセージ。
  it('x-error-message answers a payload that is a number', async () => {
    const res = await app.request('/misc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        color: 'red',
        kind: 'admin',
        tags: ['a', 'b'],
        sized: ['premium', 'basic'],
        namespaced: { a: '1' },
        prefixed: { x_one: 'ok' },
        payload: 123,
      }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      {
        expected: 'string',
        code: 'invalid_type',
        path: ['payload'],
        message: 'payload must be a string',
      },
    ])
  })

  // null is present, so it is a value of the wrong type, not a missing one.
  // null は値として存在するため、欠落ではなく型の誤りである。
  it('x-error-message answers a payload that is null', async () => {
    const res = await app.request('/misc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        color: 'red',
        kind: 'admin',
        tags: ['a', 'b'],
        sized: ['premium', 'basic'],
        namespaced: { a: '1' },
        prefixed: { x_one: 'ok' },
        payload: null,
      }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      {
        expected: 'string',
        code: 'invalid_type',
        path: ['payload'],
        message: 'payload must be a string',
      },
    ])
  })
})

// unevaluatedProperties: false on an allOf: only the properties the branches declare are
// allowed.
// allOf に対する unevaluatedProperties: false。各分岐が宣言したプロパティだけが許容される。
describe('strict-allof: x-unevaluatedProperties-message', () => {
  // The pointer names the unknown property.
  // pointer は、未知のプロパティを指す。
  it('answers an unknown property', async () => {
    const res = await app.request('/strict-allof', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: 'a', name: 'b', stray: 'x' }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      { code: 'custom', path: ['stray'], message: 'Unknown field — only id and name are allowed.' },
    ])
  })

  // Two unknown properties.
  // 未知のプロパティが2つ。
  it('answers every unknown property', async () => {
    const res = await app.request('/strict-allof', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: 'a', name: 'b', stray: 'x', other: 'y' }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      { code: 'custom', path: ['stray'], message: 'Unknown field — only id and name are allowed.' },
      { code: 'custom', path: ['other'], message: 'Unknown field — only id and name are allowed.' },
    ])
  })

  // name is required by the second branch.
  // name は、2つ目の分岐で必須とされている。
  it('rejects a body with no name', async () => {
    const res = await app.request('/strict-allof', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: 'a' }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      {
        expected: 'string',
        code: 'invalid_type',
        path: ['name'],
        message: 'Invalid input: expected string, received undefined',
      },
    ])
  })
})

// If hasLicense is true, licenseNumber is required. The spec writes it as anyOf [not {
// hasLicense: true }, required: licenseNumber], and the generator recognises the implication.
// hasLicense が true の場合、licenseNumber が必須となる。
// 仕様では anyOf [not { hasLicense: true }, required: licenseNumber] と記述されており、
// 生成器はこれを含意として認識する。
describe('implication: x-implication-message', () => {
  // The antecedent is true and the consequent does not hold. The pointer is the object itself.
  // 前件が真であり、後件が成立していない。pointer は、オブジェクト自身を指す。
  it('answers a license with no number', async () => {
    const res = await app.request('/implication', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ hasLicense: true }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      {
        code: 'invalid_union',
        errors: [
          [{ code: 'custom', path: [], message: 'Invalid input' }],
          [{ code: 'custom', path: [], message: 'Invalid input' }],
        ],
        path: [],
        message: 'licenseNumber is required when hasLicense is true',
      },
    ])
  })

  // The types of the properties are checked as well as the implication.
  // 含意だけでなく、各プロパティの型も検証される。
  it('rejects a hasLicense that is not a boolean', async () => {
    const res = await app.request('/implication', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ hasLicense: 'not-a-bool', licenseNumber: 'L-001' }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      {
        expected: 'boolean',
        code: 'invalid_type',
        path: ['hasLicense'],
        message: 'Invalid input: expected boolean, received string',
      },
    ])
  })
})

// What is checked before the schema.
// スキーマより前に検証される内容。
describe('request body', () => {
  // The body cannot be parsed, so validation never starts: the answer is the plain 400 of Hono.
  // ボディがパースできないため、検証は開始されない。応答は、Hono のプレーンな 400 になる。
  it('rejects malformed JSON', async () => {
    const res = await app.request('/form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{bad',
    })
    expect(res.status).toBe(400)
    expect(await res.text()).toBe('Malformed JSON in request body')
  })

  // The body has to be an object.
  // ボディはオブジェクトでなければならない。
  it('rejects a body that is an array', async () => {
    const res = await app.request('/form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([]),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toStrictEqual([
      {
        expected: 'object',
        code: 'invalid_type',
        path: [],
        message: 'Invalid input: expected object, received array',
      },
    ])
  })

  // The spec declares POST only.
  // 仕様が宣言しているのは POST だけである。
  it('does not route GET', async () => {
    const res = await app.request('/form')
    expect(res.status).toBe(404)
    expect(await res.text()).toBe('404 Not Found')
  })
})
