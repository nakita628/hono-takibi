// Every validation keyword with its message extension (cases/typespec-validation,
// generated from specs/typespec-validation.yaml, which is compiled from TypeSpec), run
// against the host in hosts/typespec-validation-app.ts.
//
// A constraint keyword has a message extension of its own: `x-minLength-message` for
// `minLength`, `x-pattern-message` for `pattern`, and so on. `x-error-message` is the
// message of the type or format itself. So one property can carry several messages, and
// the one a client receives says which rule was broken.
//
//   POST /users     every string, number, boolean, array and null pattern
//   POST /products  const of each primitive type
//   PUT  /settings  minProperties / maxProperties
//   POST /orders    a nested object behind a $ref
//
// The host answers a validation failure with 422 and RFC 9457 Problem Details, whose
// `errors` list holds, for every issue, the `pointer` to the value and the `detail`, the
// message of the issue.
//
// すべての検証キーワードと、そのメッセージ拡張の検証(cases/typespec-validation。
// TypeSpec からコンパイルした specs/typespec-validation.yaml から生成)。
// hosts/typespec-validation-app.ts のホストに対して実行する。
//
// 制約キーワードは、それぞれ専用のメッセージ拡張を持つ。`minLength` には
// `x-minLength-message`、`pattern` には `x-pattern-message` という具合である。
// `x-error-message` は、型やフォーマットそのものに対するメッセージである。そのため、
// 1つのプロパティが複数のメッセージを持つことができ、クライアントが受け取るメッセージから、
// どのルールに違反したかが分かる。
//
//   POST /users     string・number・boolean・array・null の全パターン
//   POST /products  各プリミティブ型の const
//   PUT  /settings  minProperties / maxProperties
//   POST /orders    $ref の先にあるネストしたオブジェクト
//
// ホストは、検証の失敗に 422 と RFC 9457 の Problem Details で応答する。その `errors` には、
// issue ごとに、値への `pointer` と、issue のメッセージである `detail` が含まれる。
//
// This file holds the requests that are accepted.
// このファイルには、受理されるリクエストをまとめている。
import { describe, expect, it } from 'vite-plus/test'

import app from '../hosts/typespec-validation-app'

// name, email, role, status, tags, score and level are required; every other property is
// optional. Each test below sends these seven and adds or changes the property it is about.
// name・email・role・status・tags・score・level は必須であり、
// それ以外のプロパティはすべて任意である。以下の各テストでは、この7つを送信したうえで、
// 検証対象のプロパティを追加・変更している。
describe('POST /users: the required properties', () => {
  // Nothing optional is sent.
  // 任意プロパティは、何も送信していない。
  it('accepts a body with the required properties alone', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'taro',
        email: 'taro@example.com',
        role: 'admin',
        status: 'active',
        tags: ['dev'],
        score: 95.5,
        level: 50,
      }),
    })
    expect(res.status).toBe(201)
    expect(await res.json()).toStrictEqual({ id: 1, name: 'taro', email: 'taro@example.com' })
  })
})

// x-minLength-message and x-maxLength-message.
// x-minLength-message と x-maxLength-message。
describe('POST /users: name, minLength 2 and maxLength 50', () => {
  // Exactly minLength.
  // ちょうど minLength の長さ。
  it('accepts a name of 2 characters', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'ab',
        email: 'taro@example.com',
        role: 'admin',
        status: 'active',
        tags: ['dev'],
        score: 95.5,
        level: 50,
      }),
    })
    expect(res.status).toBe(201)
    expect(await res.json()).toStrictEqual({ id: 1, name: 'ab', email: 'taro@example.com' })
  })

  // Exactly maxLength.
  // ちょうど maxLength の長さ。
  it('accepts a name of 50 characters', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'a'.repeat(50),
        email: 'taro@example.com',
        role: 'admin',
        status: 'active',
        tags: ['dev'],
        score: 95.5,
        level: 50,
      }),
    })
    expect(res.status).toBe(201)
    expect(await res.json()).toStrictEqual({
      id: 1,
      name: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      email: 'taro@example.com',
    })
  })

  // Two characters, six bytes in UTF-8.
  // 2文字(UTF-8 では 6 バイト)。
  it('counts characters, not bytes', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: '太郎',
        email: 'taro@example.com',
        role: 'admin',
        status: 'active',
        tags: ['dev'],
        score: 95.5,
        level: 50,
      }),
    })
    expect(res.status).toBe(201)
    expect(await res.json()).toStrictEqual({ id: 1, name: '太郎', email: 'taro@example.com' })
  })
})

// minLength equals maxLength, which is emitted as a fixed length with x-length-message.
// minLength と maxLength が等しい場合、x-length-message 付きの固定長として生成される。
describe('POST /users: code, exactly 6 characters', () => {
  // The one length allowed.
  // 許容される唯一の長さ。
  it('accepts a code of 6 characters', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'taro',
        email: 'taro@example.com',
        role: 'admin',
        status: 'active',
        tags: ['dev'],
        score: 95.5,
        level: 50,
        code: 'ABC123',
      }),
    })
    expect(res.status).toBe(201)
    expect(await res.json()).toStrictEqual({ id: 1, name: 'taro', email: 'taro@example.com' })
  })
})

// email, uuid and uri.
// email・uuid・uri。
describe('POST /users: formats with x-error-message', () => {
  // requestId is optional.
  // requestId は任意である。
  it('accepts a valid UUID', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'taro',
        email: 'taro@example.com',
        role: 'admin',
        status: 'active',
        tags: ['dev'],
        score: 95.5,
        level: 50,
        requestId: '01890a5d-ac96-7b4e-b1c2-3d4e5f6a7b8c',
      }),
    })
    expect(res.status).toBe(201)
    expect(await res.json()).toStrictEqual({ id: 1, name: 'taro', email: 'taro@example.com' })
  })

  // website is optional.
  // website は任意である。
  it('accepts a valid URL', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'taro',
        email: 'taro@example.com',
        role: 'admin',
        status: 'active',
        tags: ['dev'],
        score: 95.5,
        level: 50,
        website: 'https://example.com',
      }),
    })
    expect(res.status).toBe(201)
    expect(await res.json()).toStrictEqual({ id: 1, name: 'taro', email: 'taro@example.com' })
  })
})

// x-pattern-message. The pattern asks for an upper-case letter, a digit and at least 8
// characters.
// x-pattern-message。パターンは、大文字・数字・8文字以上を要求する。
describe('POST /users: password, a pattern', () => {
  // An upper-case letter, a digit, 9 characters.
  // 大文字・数字を含む 9 文字。
  it('accepts a password that matches', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'taro',
        email: 'taro@example.com',
        role: 'admin',
        status: 'active',
        tags: ['dev'],
        score: 95.5,
        level: 50,
        password: 'Hunter2pw',
      }),
    })
    expect(res.status).toBe(201)
    expect(await res.json()).toStrictEqual({ id: 1, name: 'taro', email: 'taro@example.com' })
  })

  // The shortest match.
  // 最短の一致。
  it('accepts a password of exactly 8 characters', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'taro',
        email: 'taro@example.com',
        role: 'admin',
        status: 'active',
        tags: ['dev'],
        score: 95.5,
        level: 50,
        password: 'Hunter2p',
      }),
    })
    expect(res.status).toBe(201)
    expect(await res.json()).toStrictEqual({ id: 1, name: 'taro', email: 'taro@example.com' })
  })
})

// A property with no constraint at all still has a type, and x-error-message is the message
// of that type.
// 制約のないプロパティにも型はあり、x-error-message はその型に対するメッセージである。
describe('POST /users: base types with x-error-message', () => {
  // Any string.
  // 任意の string。
  it('accepts a nickname', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'taro',
        email: 'taro@example.com',
        role: 'admin',
        status: 'active',
        tags: ['dev'],
        score: 95.5,
        level: 50,
        nickname: 'taro-chan',
      }),
    })
    expect(res.status).toBe(201)
    expect(await res.json()).toStrictEqual({ id: 1, name: 'taro', email: 'taro@example.com' })
  })

  // No minLength.
  // minLength の指定がない。
  it('accepts an empty nickname', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'taro',
        email: 'taro@example.com',
        role: 'admin',
        status: 'active',
        tags: ['dev'],
        score: 95.5,
        level: 50,
        nickname: '',
      }),
    })
    expect(res.status).toBe(201)
    expect(await res.json()).toStrictEqual({ id: 1, name: 'taro', email: 'taro@example.com' })
  })

  // Zero is a number, and a value, not an absence.
  // 0 は number であり、欠落ではなく値である。
  it('accepts a score of zero', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'taro',
        email: 'taro@example.com',
        role: 'admin',
        status: 'active',
        tags: ['dev'],
        score: 0,
        level: 50,
      }),
    })
    expect(res.status).toBe(201)
    expect(await res.json()).toStrictEqual({ id: 1, name: 'taro', email: 'taro@example.com' })
  })

  // score has no minimum.
  // score に最小値はない。
  it('accepts a negative score', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'taro',
        email: 'taro@example.com',
        role: 'admin',
        status: 'active',
        tags: ['dev'],
        score: -1.5,
        level: 50,
      }),
    })
    expect(res.status).toBe(201)
    expect(await res.json()).toStrictEqual({ id: 1, name: 'taro', email: 'taro@example.com' })
  })

  // false is a boolean, and a value, not an absence.
  // false は boolean であり、欠落ではなく値である。
  it('accepts agreed: false', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'taro',
        email: 'taro@example.com',
        role: 'admin',
        status: 'active',
        tags: ['dev'],
        score: 95.5,
        level: 50,
        agreed: false,
      }),
    })
    expect(res.status).toBe(201)
    expect(await res.json()).toStrictEqual({ id: 1, name: 'taro', email: 'taro@example.com' })
  })
})

// An enum of three values, and an enum of one, which is emitted as a literal.
// 3つの値を持つ enum と、リテラルとして生成される、値が1つだけの enum。
describe('POST /users: role and status, enums', () => {
  // Another member of the enum.
  // enum の別のメンバー。
  it('accepts the role user', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'taro',
        email: 'taro@example.com',
        role: 'user',
        status: 'active',
        tags: ['dev'],
        score: 95.5,
        level: 50,
      }),
    })
    expect(res.status).toBe(201)
    expect(await res.json()).toStrictEqual({ id: 1, name: 'taro', email: 'taro@example.com' })
  })

  // The last member of the enum.
  // enum の最後のメンバー。
  it('accepts the role guest', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'taro',
        email: 'taro@example.com',
        role: 'guest',
        status: 'active',
        tags: ['dev'],
        score: 95.5,
        level: 50,
      }),
    })
    expect(res.status).toBe(201)
    expect(await res.json()).toStrictEqual({ id: 1, name: 'taro', email: 'taro@example.com' })
  })
})

// x-minimum-message and x-maximum-message.
// x-minimum-message と x-maximum-message。
describe('POST /users: age, minimum 0 and maximum 150', () => {
  // Exactly the minimum.
  // ちょうど最小値。
  it('accepts an age of 0', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'taro',
        email: 'taro@example.com',
        role: 'admin',
        status: 'active',
        tags: ['dev'],
        score: 95.5,
        level: 50,
        age: 0,
      }),
    })
    expect(res.status).toBe(201)
    expect(await res.json()).toStrictEqual({ id: 1, name: 'taro', email: 'taro@example.com' })
  })

  // Exactly the maximum.
  // ちょうど最大値。
  it('accepts an age of 150', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'taro',
        email: 'taro@example.com',
        role: 'admin',
        status: 'active',
        tags: ['dev'],
        score: 95.5,
        level: 50,
        age: 150,
      }),
    })
    expect(res.status).toBe(201)
    expect(await res.json()).toStrictEqual({ id: 1, name: 'taro', email: 'taro@example.com' })
  })
})

// x-error-message is an arrow function that reads the issue; x-minimum-message and
// x-maximum-message answer the range.
// x-error-message は、issue を読み取るアロー関数である。範囲については、
// x-minimum-message と x-maximum-message が応答する。
describe('POST /users: level, three messages on one property', () => {
  // Exactly the minimum.
  // ちょうど最小値。
  it('accepts a level of 1', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'taro',
        email: 'taro@example.com',
        role: 'admin',
        status: 'active',
        tags: ['dev'],
        score: 95.5,
        level: 1,
      }),
    })
    expect(res.status).toBe(201)
    expect(await res.json()).toStrictEqual({ id: 1, name: 'taro', email: 'taro@example.com' })
  })

  // Exactly the maximum.
  // ちょうど最大値。
  it('accepts a level of 100', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'taro',
        email: 'taro@example.com',
        role: 'admin',
        status: 'active',
        tags: ['dev'],
        score: 95.5,
        level: 100,
      }),
    })
    expect(res.status).toBe(201)
    expect(await res.json()).toStrictEqual({ id: 1, name: 'taro', email: 'taro@example.com' })
  })
})

// x-error-message on a number with multipleOf.
// multipleOf を持つ number に対する x-error-message。
describe('POST /users: rating, multipleOf 0.5', () => {
  // 4.5 is nine times 0.5.
  // 4.5 は 0.5 の 9 倍である。
  it('accepts a multiple of 0.5', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'taro',
        email: 'taro@example.com',
        role: 'admin',
        status: 'active',
        tags: ['dev'],
        score: 95.5,
        level: 50,
        rating: 4.5,
      }),
    })
    expect(res.status).toBe(201)
    expect(await res.json()).toStrictEqual({ id: 1, name: 'taro', email: 'taro@example.com' })
  })

  // Zero is a multiple of every number.
  // 0 はあらゆる数の倍数である。
  it('accepts zero', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'taro',
        email: 'taro@example.com',
        role: 'admin',
        status: 'active',
        tags: ['dev'],
        score: 95.5,
        level: 50,
        rating: 0,
      }),
    })
    expect(res.status).toBe(201)
    expect(await res.json()).toStrictEqual({ id: 1, name: 'taro', email: 'taro@example.com' })
  })

  // 3 is six times 0.5.
  // 3 は 0.5 の 6 倍である。
  it('accepts a whole number', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'taro',
        email: 'taro@example.com',
        role: 'admin',
        status: 'active',
        tags: ['dev'],
        score: 95.5,
        level: 50,
        rating: 3,
      }),
    })
    expect(res.status).toBe(201)
    expect(await res.json()).toStrictEqual({ id: 1, name: 'taro', email: 'taro@example.com' })
  })
})

// x-minItems-message and x-maxItems-message.
// x-minItems-message と x-maxItems-message。
describe('POST /users: tags, minItems 1 and maxItems 10', () => {
  // Exactly maxItems.
  // ちょうど maxItems の要素数。
  it('accepts ten tags', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'taro',
        email: 'taro@example.com',
        role: 'admin',
        status: 'active',
        tags: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
        score: 95.5,
        level: 50,
      }),
    })
    expect(res.status).toBe(201)
    expect(await res.json()).toStrictEqual({ id: 1, name: 'taro', email: 'taro@example.com' })
  })
})

// minItems equals maxItems, which is emitted as a fixed length with x-length-message.
// minItems と maxItems が等しい場合、x-length-message 付きの固定長として生成される。
describe('POST /users: coordinates, exactly 2 items', () => {
  // The one length allowed.
  // 許容される唯一の長さ。
  it('accepts two coordinates', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'taro',
        email: 'taro@example.com',
        role: 'admin',
        status: 'active',
        tags: ['dev'],
        score: 95.5,
        level: 50,
        coordinates: [35.6762, 139.6503],
      }),
    })
    expect(res.status).toBe(201)
    expect(await res.json()).toStrictEqual({ id: 1, name: 'taro', email: 'taro@example.com' })
  })
})

// x-error-message on an array and on null.
// array と null に対する x-error-message。
describe('POST /users: favoriteNumbers and deletedAt', () => {
  // An array with no length constraint.
  // 長さの制約がない配列。
  it('accepts a list of integers', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'taro',
        email: 'taro@example.com',
        role: 'admin',
        status: 'active',
        tags: ['dev'],
        score: 95.5,
        level: 50,
        favoriteNumbers: [1, 2, 3],
      }),
    })
    expect(res.status).toBe(201)
    expect(await res.json()).toStrictEqual({ id: 1, name: 'taro', email: 'taro@example.com' })
  })

  // No minItems.
  // minItems の指定がない。
  it('accepts an empty list', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'taro',
        email: 'taro@example.com',
        role: 'admin',
        status: 'active',
        tags: ['dev'],
        score: 95.5,
        level: 50,
        favoriteNumbers: [],
      }),
    })
    expect(res.status).toBe(201)
    expect(await res.json()).toStrictEqual({ id: 1, name: 'taro', email: 'taro@example.com' })
  })

  // type: null accepts null and nothing else.
  // type: null は、null だけを受理する。
  it('accepts null for deletedAt', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'taro',
        email: 'taro@example.com',
        role: 'admin',
        status: 'active',
        tags: ['dev'],
        score: 95.5,
        level: 50,
        deletedAt: null,
      }),
    })
    expect(res.status).toBe(201)
    expect(await res.json()).toStrictEqual({ id: 1, name: 'taro', email: 'taro@example.com' })
  })
})

// A const of each primitive type, with x-error-message.
// 各プリミティブ型の const と、x-error-message。
describe('POST /products: const', () => {
  // enabled is optional.
  // enabled は任意である。
  it('accepts the constants', async () => {
    const res = await app.request('/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'product', priority: 1 }),
    })
    expect(res.status).toBe(201)
    expect(await res.json()).toStrictEqual({ id: 1, type: 'product' })
  })

  // enabled is const: true.
  // enabled は const: true である。
  it('accepts the optional constant', async () => {
    const res = await app.request('/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'product', priority: 1, enabled: true }),
    })
    expect(res.status).toBe(201)
    expect(await res.json()).toStrictEqual({ id: 1, type: 'product' })
  })
})

// x-minProperties-message and x-maxProperties-message. The pointer of the issue is "/", the
// object itself.
// x-minProperties-message と x-maxProperties-message。issue の pointer は、
// オブジェクト自身を指す "/" になる。
describe('PUT /settings: minProperties 1 and maxProperties 20', () => {
  // Exactly minProperties.
  // ちょうど minProperties の個数。
  it('accepts one setting', async () => {
    const res = await app.request('/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ theme: 'dark' }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ theme: 'dark' })
  })

  // Two properties.
  // プロパティが2つ。
  it('accepts both declared settings', async () => {
    const res = await app.request('/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ theme: 'dark', locale: 'ja' }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ theme: 'dark', locale: 'ja' })
  })
})

// productName, quantity and address are required.
// productName・quantity・address は必須である。
describe('POST /orders: the top-level properties', () => {
  // address is a $ref to the Address schema.
  // address は Address スキーマへの $ref である。
  it('accepts an order with its address', async () => {
    const res = await app.request('/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productName: 'Widget',
        quantity: 1,
        address: { street: '1-2-3', city: 'Tokyo', zip: '100-0001' },
      }),
    })
    expect(res.status).toBe(201)
    expect(await res.json()).toStrictEqual({ id: 1, productName: 'Widget', quantity: 1 })
  })

  // Exactly maxLength.
  // ちょうど maxLength の長さ。
  it('accepts a productName of 100 characters', async () => {
    const res = await app.request('/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productName: 'a'.repeat(100),
        quantity: 1,
        address: { street: '1-2-3', city: 'Tokyo', zip: '100-0001' },
      }),
    })
    expect(res.status).toBe(201)
    expect(await res.json()).toStrictEqual({
      id: 1,
      productName:
        'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      quantity: 1,
    })
  })
})

// The pointer of an issue holds the whole path, /address/<property>.
// issue の pointer は、/address/<プロパティ> という完全なパスになる。
describe('POST /orders: the properties of the address', () => {
  // An unknown property of the nested object is stripped.
  // ネストしたオブジェクトの未知のプロパティは、取り除かれる。
  it('drops a property the address does not declare', async () => {
    const res = await app.request('/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productName: 'Widget',
        quantity: 1,
        address: { street: '1-2-3', city: 'Tokyo', zip: '100-0001', country: 'JP' },
      }),
    })
    expect(res.status).toBe(201)
    expect(await res.json()).toStrictEqual({ id: 1, productName: 'Widget', quantity: 1 })
  })
})
