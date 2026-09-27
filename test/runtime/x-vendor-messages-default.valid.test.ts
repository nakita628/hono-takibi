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
// This file holds the requests that are accepted.
// このファイルには、受理されるリクエストをまとめている。
import { describe, expect, it } from 'vite-plus/test'

import app from '../hosts/x-vendor-messages-app-default'

// Twelve properties are required. Each test of /form sends all twelve and changes the one it
// is about.
// 12 個のプロパティが必須である。/form に対する各テストでは、12 個すべてを送信したうえで、
// 検証対象の1つだけを変えている。
describe('form: a valid body', () => {
  // Every value is inside its range.
  // すべての値が範囲内にある。
  it('accepts a body that satisfies every rule', async () => {
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
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
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
    })
  })
})

// x-minLength-message, x-minItems-message and x-minimum-message.
// x-minLength-message・x-minItems-message・x-minimum-message。
describe('form: minimum length, items and value', () => {
  // Exactly minLength.
  // ちょうど minLength の長さ。
  it('accepts a username of 3 characters', async () => {
    const res = await app.request('/form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'abc',
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
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      username: 'abc',
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
    })
  })

  // Exactly the minimum.
  // ちょうど最小値。
  it('accepts an age of 0', async () => {
    const res = await app.request('/form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'taro',
        code: 'ABC123',
        slug: 'hello-world',
        age: 0,
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
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      username: 'taro',
      code: 'ABC123',
      slug: 'hello-world',
      age: 0,
      score: 1.5,
      count: 10,
      active: true,
      tags: ['dev'],
      pin: [1, 2, 3, 4],
      role: 'admin',
      priority: 1,
      quota: 5,
    })
  })
})

// x-maxLength-message, x-maxItems-message and x-maximum-message.
// x-maxLength-message・x-maxItems-message・x-maximum-message。
describe('form: maximum length, items and value', () => {
  // Exactly maxLength.
  // ちょうど maxLength の長さ。
  it('accepts a username of 16 characters', async () => {
    const res = await app.request('/form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'a'.repeat(16),
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
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      username: 'aaaaaaaaaaaaaaaa',
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
    })
  })

  // Exactly maxItems.
  // ちょうど maxItems の要素数。
  it('accepts five tags', async () => {
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
        tags: ['1', '2', '3', '4', '5'],
        pin: [1, 2, 3, 4],
        role: 'admin',
        priority: 1,
        quota: 5,
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      username: 'taro',
      code: 'ABC123',
      slug: 'hello-world',
      age: 25,
      score: 1.5,
      count: 10,
      active: true,
      tags: ['1', '2', '3', '4', '5'],
      pin: [1, 2, 3, 4],
      role: 'admin',
      priority: 1,
      quota: 5,
    })
  })

  // Exactly the maximum.
  // ちょうど最大値。
  it('accepts an age of 120', async () => {
    const res = await app.request('/form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'taro',
        code: 'ABC123',
        slug: 'hello-world',
        age: 120,
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
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      username: 'taro',
      code: 'ABC123',
      slug: 'hello-world',
      age: 120,
      score: 1.5,
      count: 10,
      active: true,
      tags: ['dev'],
      pin: [1, 2, 3, 4],
      role: 'admin',
      priority: 1,
      quota: 5,
    })
  })
})

// x-pattern-message and x-multipleOf-message.
// x-pattern-message と x-multipleOf-message。
describe('form: pattern and multipleOf', () => {
  // Zero is a multiple of every number.
  // 0 はあらゆる数の倍数である。
  it('accepts a score of 0', async () => {
    const res = await app.request('/form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'taro',
        code: 'ABC123',
        slug: 'hello-world',
        age: 25,
        score: 0,
        count: 10,
        active: true,
        tags: ['dev'],
        pin: [1, 2, 3, 4],
        role: 'admin',
        priority: 1,
        quota: 5,
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      username: 'taro',
      code: 'ABC123',
      slug: 'hello-world',
      age: 25,
      score: 0,
      count: 10,
      active: true,
      tags: ['dev'],
      pin: [1, 2, 3, 4],
      role: 'admin',
      priority: 1,
      quota: 5,
    })
  })
})

// Every member is accepted.
// すべてのメンバーが受理される。
describe('form: enums', () => {
  // The second member.
  // 2番目のメンバー。
  it('accepts the role editor', async () => {
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
        role: 'editor',
        priority: 1,
        quota: 5,
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      username: 'taro',
      code: 'ABC123',
      slug: 'hello-world',
      age: 25,
      score: 1.5,
      count: 10,
      active: true,
      tags: ['dev'],
      pin: [1, 2, 3, 4],
      role: 'editor',
      priority: 1,
      quota: 5,
    })
  })

  // The last member.
  // 最後のメンバー。
  it('accepts the role viewer', async () => {
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
        role: 'viewer',
        priority: 1,
        quota: 5,
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      username: 'taro',
      code: 'ABC123',
      slug: 'hello-world',
      age: 25,
      score: 1.5,
      count: 10,
      active: true,
      tags: ['dev'],
      pin: [1, 2, 3, 4],
      role: 'viewer',
      priority: 1,
      quota: 5,
    })
  })

  // The second member.
  // 2番目のメンバー。
  it('accepts the priority 2', async () => {
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
        priority: 2,
        quota: 5,
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
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
      priority: 2,
      quota: 5,
    })
  })

  // The last member.
  // 最後のメンバー。
  it('accepts the priority 3', async () => {
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
        priority: 3,
        quota: 5,
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
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
      priority: 3,
      quota: 5,
    })
  })
})

// tokenLabel is required when token is present.
// token が存在する場合、tokenLabel が必須となる。
describe('form: x-dependentRequired-message', () => {
  // Both are present.
  // 両方が存在する。
  it('accepts a token with its label', async () => {
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
        tokenLabel: 'primary',
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
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
      token: 'abc',
      tokenLabel: 'primary',
      quota: 5,
    })
  })

  // The dependency goes one way.
  // 依存関係は一方向である。
  it('accepts a label with no token', async () => {
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
        tokenLabel: 'primary',
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
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
      tokenLabel: 'primary',
      quota: 5,
    })
  })
})

// x-error-message and x-minimum-message may hold an arrow function, emitted as it is, which
// receives the issue.
// x-error-message と x-minimum-message にはアロー関数を指定できる。関数はそのまま出力され、
// issue を受け取る。
describe('form: messages written as an arrow function', () => {
  // nickname is optional.
  // nickname は任意である。
  it('accepts a nickname', async () => {
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
        nickname: 'taro-chan',
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
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
      nickname: 'taro-chan',
      quota: 5,
    })
  })

  // Exactly the minimum.
  // ちょうど最小値。
  it('accepts a quota of 0', async () => {
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
        quota: 0,
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
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
      quota: 0,
    })
  })
})

// anyValue is required; oneValue and notString are optional.
// anyValue は必須であり、oneValue と notString は任意である。
describe('composition: x-anyOf-message, x-oneOf-message, x-not-message', () => {
  // The string branch.
  // string 側の分岐。
  it('anyOf accepts a string', async () => {
    const res = await app.request('/composition', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ anyValue: 'hello' }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ anyValue: 'hello' })
  })

  // The integer branch.
  // integer 側の分岐。
  it('anyOf accepts an integer', async () => {
    const res = await app.request('/composition', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ anyValue: 42 }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ anyValue: 42 })
  })

  // The string branch.
  // string 側の分岐。
  it('oneOf accepts a string', async () => {
    const res = await app.request('/composition', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ anyValue: 'ok', oneValue: 'text' }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ anyValue: 'ok', oneValue: 'text' })
  })

  // The integer branch.
  // integer 側の分岐。
  it('oneOf accepts an integer', async () => {
    const res = await app.request('/composition', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ anyValue: 'ok', oneValue: 1 }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ anyValue: 'ok', oneValue: 1 })
  })

  // Anything but a string.
  // string 以外であれば、何でもよい。
  it('not accepts a number', async () => {
    const res = await app.request('/composition', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ anyValue: 'ok', notString: 42 }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ anyValue: 'ok', notString: 42 })
  })

  // null is not a string.
  // null は string ではない。
  it('not accepts null', async () => {
    const res = await app.request('/composition', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ anyValue: 'ok', notString: null }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ anyValue: 'ok', notString: null })
  })
})

// A map whose keys have to match a pattern.
// キーがパターンに一致しなければならないマップ。
describe('dictionary: x-propertyNames-message', () => {
  // Lower-case letters, digits and underscores.
  // 小文字の英字・数字・アンダースコア。
  it('accepts keys that match the pattern', async () => {
    const res = await app.request('/dictionary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok_key: 'x', another1: 'y' }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ ok_key: 'x', another1: 'y' })
  })

  // No key, nothing to check.
  // キーがなければ、検証する対象もない。
  it('accepts an empty object', async () => {
    const res = await app.request('/dictionary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({})
  })
})

// An intersection has no issue of its own, so the message replaces the message of every issue
// its branches report, the messages the branches declare themselves included, and keeps the
// path of each.
// 交差型には固有の issue がない。そのためメッセージは、
// 各分岐が報告するすべての issue のメッセージを置き換える。
// 分岐自身が宣言しているメッセージも置き換えの対象である。各 issue のパスは保持される。
describe('merged: x-allOf-message as a text', () => {
  // The wrapper passes a valid value through unchanged.
  // ラッパーは、有効な値をそのまま通過させる。
  it('accepts a body that satisfies both branches', async () => {
    const res = await app.request('/merged', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'taro', age: 25 }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ name: 'taro', age: 25 })
  })
})

// The function receives each issue and returns its message.
// 関数は各 issue を受け取り、そのメッセージを返す。
describe('merged-arrow: x-allOf-message as an arrow function', () => {
  // The function is not called for a valid value.
  // 有効な値に対しては、関数は呼び出されない。
  it('accepts a body that satisfies both branches', async () => {
    const res = await app.request('/merged-arrow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'taro', age: 25 }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ name: 'taro', age: 25 })
  })
})

// billing_zip is required when credit_card is present, and credit_card then has to be 16
// digits.
// credit_card が存在する場合、billing_zip が必須となり、
// credit_card は 16 桁でなければならない。
describe('payment: x-dependentRequired-message and x-dependentSchemas-message', () => {
  // Nothing depends on method.
  // method に依存するルールはない。
  it('accepts a payment with no credit card', async () => {
    const res = await app.request('/payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ method: 'cash' }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ method: 'cash' })
  })

  // Sixteen digits, and the dependent property is present.
  // 16 桁であり、依存先のプロパティも存在する。
  it('accepts a credit card with its billing zip', async () => {
    const res = await app.request('/payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ method: 'cc', credit_card: '4111111111111111', billing_zip: '12345' }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      method: 'cc',
      credit_card: '4111111111111111',
      billing_zip: '12345',
    })
  })
})

// score has an inclusive minimum and an exclusive maximum; ratio the other way round. Each of
// the four bounds has a message of its own.
// score は、下限が inclusive・上限が exclusive である。ratio はその逆である。
// 4つの境界それぞれに、専用のメッセージがある。
describe('bounds: inclusive and exclusive bounds', () => {
  // minimum: 0 and maximum: 1 are inclusive.
  // minimum: 0 と maximum: 1 は、範囲に含まれる。
  it('accepts the inclusive bounds themselves', async () => {
    const res = await app.request('/bounds', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ score: 0, ratio: 1 }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ score: 0, ratio: 1 })
  })

  // Just below exclusiveMaximum: 100 and just above exclusiveMinimum: 0.
  // exclusiveMaximum: 100 をわずかに下回り、exclusiveMinimum: 0 をわずかに超える値。
  it('accepts values just inside the exclusive bounds', async () => {
    const res = await app.request('/bounds', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ score: 99.999, ratio: 0.001 }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ score: 99.999, ratio: 0.001 })
  })
})

// Between 2 and 5 of the items have to be premium.
// 要素のうち、2〜5 個が premium でなければならない。
describe('basket: x-minContains-message and x-maxContains-message', () => {
  // Exactly minContains.
  // ちょうど minContains の個数。
  it('accepts two premium items', async () => {
    const res = await app.request('/basket', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: [{ kind: 'premium' }, { kind: 'premium' }] }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ items: [{ kind: 'premium' }, { kind: 'premium' }] })
  })

  // Exactly maxContains.
  // ちょうど maxContains の個数。
  it('accepts five premium items', async () => {
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
        ],
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      items: [
        { kind: 'premium' },
        { kind: 'premium' },
        { kind: 'premium' },
        { kind: 'premium' },
        { kind: 'premium' },
      ],
    })
  })

  // Seven items, two of them premium.
  // 要素は7つあり、そのうち premium は2つである。
  it('counts the premium items only', async () => {
    const res = await app.request('/basket', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: [
          { kind: 'premium' },
          { kind: 'basic' },
          { kind: 'basic' },
          { kind: 'basic' },
          { kind: 'basic' },
          { kind: 'basic' },
          { kind: 'premium' },
        ],
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      items: [
        { kind: 'premium' },
        { kind: 'basic' },
        { kind: 'basic' },
        { kind: 'basic' },
        { kind: 'basic' },
        { kind: 'basic' },
        { kind: 'premium' },
      ],
    })
  })
})

// With no x-*-message the issue carries the message of Zod.
// x-*-message を指定しない場合、issue には Zod のメッセージが入る。
describe('contains-default: contains with no message extension', () => {
  // tags hold "special", scores hold two values of 90 or more, ints hold three integers.
  // tags は "special" を含み、scores は 90 以上の値を2つ含み、ints は整数を3つ含む。
  it('accepts a body that satisfies every contains', async () => {
    const res = await app.request('/contains-default', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tags: ['special', 'a', 'b'], scores: [95, 99, 80], ints: [1, 2, 3] }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      tags: ['special', 'a', 'b'],
      scores: [95, 99, 80],
      ints: [1, 2, 3],
    })
  })

  // Two integers and two fractions: two matches, within 2 to 3.
  // 整数が2つ、小数が2つ。一致するのは2つであり、2〜3 の範囲内である。
  it('counts the matching items only', async () => {
    const res = await app.request('/contains-default', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tags: ['special', 'a', 'b'],
        scores: [95, 99, 80],
        ints: [1, 2, 1.5, 2.5],
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      tags: ['special', 'a', 'b'],
      scores: [95, 99, 80],
      ints: [1, 2, 1.5, 2.5],
    })
  })
})

// writeOnly is documentation: it does not change what a request may hold.
// writeOnly はドキュメント上の情報であり、リクエストに含められる内容は変わらない。
describe('write-only: writeOnly', () => {
  // A writeOnly property is sent like any other.
  // writeOnly のプロパティも、他と同じように送信できる。
  it('accepts a password', async () => {
    const res = await app.request('/write-only', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'taro', password: 'secret' }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ name: 'taro', password: 'secret' })
  })
})

// Seven properties are required. Each test of /misc sends all seven and changes the one it is
// about.
// 7つのプロパティが必須である。/misc に対する各テストでは、7つすべてを送信したうえで、
// 検証対象の1つだけを変えている。
describe('misc: a valid body', () => {
  // Every value is valid.
  // すべての値が有効である。
  it('accepts a body that satisfies every rule', async () => {
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
        payload: 'hello',
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      color: 'red',
      kind: 'admin',
      tags: ['a', 'b'],
      sized: ['premium', 'basic'],
      namespaced: { a: '1' },
      prefixed: { x_one: 'ok' },
      payload: 'hello',
    })
  })
})

// A string enum and a string const.
// string の enum と const。
describe('misc: x-enum-message and x-const-message', () => {
  // blue is a member.
  // blue はメンバーである。
  it('accepts another member of the enum', async () => {
    const res = await app.request('/misc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        color: 'blue',
        kind: 'admin',
        tags: ['a', 'b'],
        sized: ['premium', 'basic'],
        namespaced: { a: '1' },
        prefixed: { x_one: 'ok' },
        payload: 'hello',
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      color: 'blue',
      kind: 'admin',
      tags: ['a', 'b'],
      sized: ['premium', 'basic'],
      namespaced: { a: '1' },
      prefixed: { x_one: 'ok' },
      payload: 'hello',
    })
  })
})

// Array keywords.
// 配列のキーワード。
describe('misc: x-uniqueItems-message and x-contains-message', () => {
  // Nothing can repeat in an empty array.
  // 空配列では、重複が起こりえない。
  it('accepts an empty list of unique tags', async () => {
    const res = await app.request('/misc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        color: 'red',
        kind: 'admin',
        tags: [],
        sized: ['premium', 'basic'],
        namespaced: { a: '1' },
        prefixed: { x_one: 'ok' },
        payload: 'hello',
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      color: 'red',
      kind: 'admin',
      tags: [],
      sized: ['premium', 'basic'],
      namespaced: { a: '1' },
      prefixed: { x_one: 'ok' },
      payload: 'hello',
    })
  })
})

// minProperties, additionalProperties and patternProperties.
// minProperties・additionalProperties・patternProperties。
describe('misc: the object keywords', () => {
  // namespaced declares a, b and c.
  // namespaced は a・b・c を宣言している。
  it('accepts three properties, the maxProperties', async () => {
    const res = await app.request('/misc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        color: 'red',
        kind: 'admin',
        tags: ['a', 'b'],
        sized: ['premium', 'basic'],
        namespaced: { a: '1', b: '2', c: '3' },
        prefixed: { x_one: 'ok' },
        payload: 'hello',
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      color: 'red',
      kind: 'admin',
      tags: ['a', 'b'],
      sized: ['premium', 'basic'],
      namespaced: { a: '1', b: '2', c: '3' },
      prefixed: { x_one: 'ok' },
      payload: 'hello',
    })
  })

  // Only keys that start with x_ have to be strings.
  // string でなければならないのは、x_ で始まるキーだけである。
  it('patternProperties leaves a key that does not match alone', async () => {
    const res = await app.request('/misc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        color: 'red',
        kind: 'admin',
        tags: ['a', 'b'],
        sized: ['premium', 'basic'],
        namespaced: { a: '1' },
        prefixed: { other: 1 },
        payload: 'hello',
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      color: 'red',
      kind: 'admin',
      tags: ['a', 'b'],
      sized: ['premium', 'basic'],
      namespaced: { a: '1' },
      prefixed: { other: 1 },
      payload: 'hello',
    })
  })
})

// A missing value and a value of the wrong type have a message each.
// 値の欠落と型の誤りには、それぞれ専用のメッセージがある。
describe('misc: x-required-message and x-error-message', () => {
  // The empty string is present, and a string.
  // 空文字列は値として存在し、string でもある。
  it('accepts an empty payload', async () => {
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
        payload: '',
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      color: 'red',
      kind: 'admin',
      tags: ['a', 'b'],
      sized: ['premium', 'basic'],
      namespaced: { a: '1' },
      prefixed: { x_one: 'ok' },
      payload: '',
    })
  })
})

// unevaluatedProperties: false on an allOf: only the properties the branches declare are
// allowed.
// allOf に対する unevaluatedProperties: false。各分岐が宣言したプロパティだけが許容される。
describe('strict-allof: x-unevaluatedProperties-message', () => {
  // id comes from the first branch and name from the second.
  // id は1つ目の分岐、name は2つ目の分岐で宣言されている。
  it('accepts the properties the branches declare', async () => {
    const res = await app.request('/strict-allof', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: 'a', name: 'b' }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ id: 'a', name: 'b' })
  })
})

// If hasLicense is true, licenseNumber is required. The spec writes it as anyOf [not {
// hasLicense: true }, required: licenseNumber], and the generator recognises the implication.
// hasLicense が true の場合、licenseNumber が必須となる。
// 仕様では anyOf [not { hasLicense: true }, required: licenseNumber] と記述されており、
// 生成器はこれを含意として認識する。
describe('implication: x-implication-message', () => {
  // The consequent holds.
  // 後件が成立している。
  it('accepts a license with its number', async () => {
    const res = await app.request('/implication', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ hasLicense: true, licenseNumber: 'L-001' }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ hasLicense: true, licenseNumber: 'L-001' })
  })

  // The antecedent is false, so the implication holds whatever else is sent.
  // 前件が偽であるため、他に何を送っても含意は成立する。
  it('accepts no license', async () => {
    const res = await app.request('/implication', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ hasLicense: false }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ hasLicense: false })
  })

  // hasLicense is absent, so the antecedent is false.
  // hasLicense が存在しないため、前件は偽である。
  it('accepts an empty object', async () => {
    const res = await app.request('/implication', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({})
  })

  // The implication goes one way.
  // 含意は一方向である。
  it('accepts a number with no license', async () => {
    const res = await app.request('/implication', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ licenseNumber: 'L-001' }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ licenseNumber: 'L-001' })
  })
})
